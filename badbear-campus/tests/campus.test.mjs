import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import worker from '../worker-backend.js';
import { parseCSV } from '../csv.js';

class D1 {
  constructor() { this.db=new DatabaseSync(':memory:');this.db.exec(readFileSync(new URL('../schema.sql',import.meta.url),'utf8')); }
  prepare(sql) { const stmt=this.db.prepare(sql); let values=[];return {
    bind(...args){values=args;return this},
    async first(){return stmt.get(...values)||null},
    async all(){return {results:stmt.all(...values)}},
    async run(){const result=stmt.run(...values);return {meta:{changes:Number(result.changes),last_row_id:Number(result.lastInsertRowid)}}}
  }; }
  async batch(statements) { this.db.exec('BEGIN');try{const result=[];for(const stmt of statements)result.push(await stmt.run());this.db.exec('COMMIT');return result}catch(error){this.db.exec('ROLLBACK');throw error} }
}
const ADMIN='a'.repeat(64),env=()=>({DB:new D1(),ADMIN_API_TOKEN:ADMIN,PASSWORD_PEPPER:'p'.repeat(64)});
const row=(codigo,nombre,nota='16')=>({codigo,nombre,curso:'Fisiología',periodo:'2026-II',evaluacion:'Primer parcial',nota,fecha:'2026-10-10'});
async function request(e,path,{method='GET',token='',body,origin='https://wajomea.group',ip='192.0.2.1'}={}) {
  const req=new Request('https://example.invalid'+path,{method,headers:{Origin:origin,'CF-Connecting-IP':ip,...(token?{Authorization:'Bearer '+token}:{}),...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})});
  const response=await worker.fetch(req,e);return {status:response.status,headers:response.headers,data:await response.json()};
}
const admin=(e,path,body)=>request(e,'/api/admin/'+path,{token:ADMIN,...(body?{method:'POST',body}:{})});
async function activate(e,codigo,pass='A long secure phrase 123') {
  const invitation=await admin(e,'invitacion',{codigo});assert.equal(invitation.status,200);
  const activation=await request(e,'/api/activar',{method:'POST',body:{codigo,password:pass,activacion:invitation.data.activacion}});assert.equal(activation.status,200);
  const login=await request(e,'/api/login',{method:'POST',body:{codigo,password:pass}});assert.equal(login.status,200);return {token:login.data.token,invitation:invitation.data.activacion};
}
test('health fails closed until database and secrets are configured',async()=>{
  assert.equal((await request({},'/api/health')).status,503);
  assert.equal((await request(env(),'/api/health')).data.estado,'operativo');
});
test('admin authorization and CORS reject foreign origins',async()=>{
  const e=env();assert.equal((await request(e,'/api/admin/alumnos')).status,401);
  assert.equal((await request(e,'/api/admin/alumnos',{token:'b'.repeat(64)})).status,401);
  assert.equal((await request(e,'/api/admin/alumnos',{token:ADMIN,origin:'https://evil.invalid'})).status,403);
  const r=await admin(e,'alumnos');assert.equal(r.status,200);assert.equal(r.headers.get('Cache-Control'),'no-store, private');assert.equal(r.headers.get('Access-Control-Allow-Origin'),'https://wajomea.group');
  const preflight=await worker.fetch(new Request('https://example.invalid/api/login',{method:'OPTIONS',headers:{Origin:'https://wajomea.group'}}),e);assert.equal(preflight.status,204);
  assert.equal((await request(e,'/api/login',{method:'POST',origin:'',body:{codigo:'A1',password:'long enough password'}})).status,403);
});
test('preview does not write; imports validate complete lists and reject invalid grades or duplicate identities',async()=>{
  const e=env(),items=[row('001','Alumno Uno'),row('002','Alumno Dos','0')];
  assert.equal((await admin(e,'vista-previa',{items})).status,200);assert.equal((await admin(e,'alumnos')).data.items.length,0);
  assert.equal((await admin(e,'publicar',{items:[...items,{...row('003','Alumno Tres'),nota:''}]})).status,400);
  assert.equal((await admin(e,'alumnos')).data.items.length,0);
  assert.equal((await admin(e,'publicar',{items:[items[0],items[0]]})).status,400);
  assert.equal((await admin(e,'publicar',{items:[items[0],{...items[0],nombre:'Otro',evaluacion:'Final'}]})).status,400);
  assert.equal((await admin(e,'publicar',{items:[{...items[0],fecha:'2026-02-30'}]})).status,400);
  assert.equal((await admin(e,'publicar',{items:[{...items[0],nota:'21'}]})).status,400);
  const publish=await admin(e,'publicar',{items});assert.equal(publish.status,200);assert.equal(publish.data.publicados,2);
  assert.equal((await admin(e,'publicar',{items:[row('001','Otro nombre')]})).status,409);
});
test('only authenticated student grades are returned even with another student code in the URL',async()=>{
  const e=env();await admin(e,'publicar',{items:[row('001','Alumno Uno','16'),row('002','Alumno Dos','19')]});
  const alice=await activate(e,'001'),bob=await activate(e,'002');
  assert.equal((await request(e,'/api/mis-resultados?codigo=002')).status,401);
  const a=await request(e,'/api/mis-resultados?codigo=002',{token:alice.token});assert.equal(a.status,200);assert.equal(a.data.alumno.codigo,'001');assert.equal(a.data.items[0].nota,16);assert.equal(JSON.stringify(a.data).includes('Alumno Dos'),false);
  const b=await request(e,'/api/mis-resultados',{token:bob.token});assert.equal(b.data.items[0].nota,19);
  assert.equal((await request(e,'/api/login',{method:'POST',body:{codigo:'001',password:'wrong password 12345'}})).status,401);
  assert.equal((await request(e,'/api/activar',{method:'POST',body:{codigo:'001',password:'new password phrase 123',activacion:alice.invitation}})).status,401);
  assert.equal(e.DB.db.prepare('SELECT token_hash FROM campus_sesiones WHERE codigo=?').get('001').token_hash===alice.token,false);
  assert.equal((await request(e,'/api/logout',{method:'POST',token:alice.token,body:{}})).status,200);
  assert.equal((await request(e,'/api/mis-resultados',{token:alice.token})).status,401);
});
test('activation requires issued identity-specific code; expired and replaced invitations fail',async()=>{
  const e=env();await admin(e,'publicar',{items:[row('001','Alumno Uno'),row('002','Alumno Dos')]});
  const first=await admin(e,'invitacion',{codigo:'001'});
  assert.equal((await request(e,'/api/activar',{method:'POST',body:{codigo:'002',password:'long phrase password',activacion:first.data.activacion}})).status,401);
  const next=await admin(e,'invitacion',{codigo:'001'});
  assert.equal((await request(e,'/api/activar',{method:'POST',body:{codigo:'001',password:'long phrase password',activacion:first.data.activacion}})).status,401);
  e.DB.db.prepare('UPDATE campus_alumnos SET invitacion_expira=0 WHERE codigo=?').run('001');
  assert.equal((await request(e,'/api/activar',{method:'POST',body:{codigo:'001',password:'long phrase password',activacion:next.data.activacion}})).status,401);
});
test('grade corrections require explicit consent, preserve identity and log previous grades',async()=>{
  const e=env();await admin(e,'publicar',{items:[row('001','Alumno Uno')]});
  const check=await admin(e,'vista-previa',{items:[row('001','Alumno Uno','18')]});assert.equal(check.data.existentes[0].anterior,16);
  assert.equal((await admin(e,'publicar',{items:[row('001','Alumno Uno','18')]})).status,409);
  assert.equal((await admin(e,'publicar',{items:[row('001','Alumno Uno','18')],reemplazar:true})).status,200);
  const log=JSON.parse(e.DB.db.prepare("SELECT detalle FROM campus_auditoria WHERE accion='corregir_resultado'").get().detalle);assert.equal(log.nota_anterior,16);assert.equal(log.nota_nueva,18);
  assert.throws(()=>e.DB.db.prepare('UPDATE campus_alumnos SET nombre=? WHERE codigo=?').run('Otro nombre','001'));
});
test('D1 batch rolls back partial imports on constraint failure',async()=>{
  const e=env();e.DB.db.exec("CREATE TRIGGER fail_test BEFORE INSERT ON campus_resultados WHEN NEW.codigo='002' BEGIN SELECT RAISE(ABORT,'test failure'); END;");
  assert.equal((await admin(e,'publicar',{items:[row('001','Alumno Uno'),row('002','Alumno Dos')]})).status,500);
  assert.equal((await admin(e,'alumnos')).data.items.length,0);
  assert.equal(e.DB.db.prepare('SELECT COUNT(*) n FROM campus_resultados').get().n,0);
});
test('expiry, inactive account and password recovery revoke student sessions',async()=>{
  const e=env();await admin(e,'publicar',{items:[row('001','Alumno Uno')]});const user=await activate(e,'001');
  assert.equal((await admin(e,'invitacion',{codigo:'001'})).status,409);
  const reset=await admin(e,'invitacion',{codigo:'001',restablecer:true});assert.equal(reset.status,200);assert.equal((await request(e,'/api/mis-resultados',{token:user.token})).status,401);
  assert.equal((await request(e,'/api/activar',{method:'POST',body:{codigo:'001',password:'a different long password',activacion:reset.data.activacion}})).status,200);
  assert.equal((await request(e,'/api/login',{method:'POST',body:{codigo:'001',password:'A long secure phrase 123'}})).status,401);
  const login=await request(e,'/api/login',{method:'POST',body:{codigo:'001',password:'a different long password'}});assert.equal(login.status,200);
  e.DB.db.exec('UPDATE campus_sesiones SET expira=0');assert.equal((await request(e,'/api/mis-resultados',{token:login.data.token})).status,401);
});
test('account login rate limit is atomic and independent of student existence',async()=>{
  const e=env();for(let i=0;i<8;i++)assert.equal((await request(e,'/api/login',{method:'POST',body:{codigo:'001',password:'long invalid password'}})).status,401);
  assert.equal((await request(e,'/api/login',{method:'POST',body:{codigo:'001',password:'long invalid password'}})).status,429);
});
test('CSV preserves leading zero codes, accents, quoted delimiters and zero grades',()=>{
  const header='codigo,nombre,curso,periodo,evaluacion,nota,fecha\r\n';
  const parsed=parseCSV('\uFEFF'+header+'001,"Alumno, Uno",Fisiología,2026-II,Parcial,0,2026-10-10\r\n');assert.equal(parsed[0].codigo,'001');assert.equal(parsed[0].nombre,'Alumno, Uno');assert.equal(parsed[0].nota,'0');
  const semi=parseCSV('codigo;nombre;curso;periodo;evaluacion;nota;fecha\n002;Alumno Dos;Fisiología;2026-II;Final;16,5;2026-10-10');assert.equal(semi[0].nota,'16,5');
  assert.throws(()=>parseCSV(header+'001,"unfinished'),/sin cerrar/);
  assert.throws(()=>parseCSV(header+'001,Alumno Uno'),/columnas incorrecto/);
  assert.throws(()=>parseCSV('codigo,codigo,curso,periodo,evaluacion,nota,fecha\n001,A,F,P,E,1,2026-10-10'),/columnas/);
});
