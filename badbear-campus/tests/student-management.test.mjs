import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
import worker from '../worker-backend.js';

class D1 {
  constructor() { this.db=new DatabaseSync(':memory:');this.db.exec(readFileSync(new URL('../schema.sql',import.meta.url),'utf8')); for(const file of readdirSync(new URL('../migrations/',import.meta.url)).sort()) this.db.exec(readFileSync(new URL('../migrations/'+file,import.meta.url),'utf8')); }
  prepare(sql) { const stmt=this.db.prepare(sql); let values=[];return {
    bind(...args){values=args;return this},
    async first(){return stmt.get(...values)||null},
    async all(){return {results:stmt.all(...values)}},
    async run(){const result=stmt.run(...values);return {meta:{changes:Number(result.changes),last_row_id:Number(result.lastInsertRowid)}}}
  }; }
  async batch(statements) { this.db.exec('BEGIN');try{const result=[];for(const stmt of statements)result.push(await stmt.run());this.db.exec('COMMIT');return result}catch(error){this.db.exec('ROLLBACK');throw error} }
}
const ADMIN='a'.repeat(64),env=()=>({DB:new D1(),ADMIN_API_TOKEN:ADMIN,PASSWORD_PEPPER:'p'.repeat(64),EXAMS_AUTH:{async fetch(req){assert.equal(new URL(req.url).pathname,'/health');return Response.json({servicio:'BADBEAR.EXAMS'})}}});
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
const student = (codigo='001', extra={}) => ({codigo,nombre:'Muñoz de la Cruz, María José',correo:'maria@example.invalid',dni:'00123456',celular:'+51 999 123 456',activo:true,...extra});
const read=(e,codigo='001')=>e.DB.db.prepare('SELECT * FROM campus_alumnos WHERE codigo=?').get(codigo);

test('only authenticated administrators from the Campus origin can change the roster',async()=>{
  const e=env();
  for(const path of ['crear','ficha','acceso','retirar','restaurar']) {
    assert.equal((await request(e,'/api/admin/alumnos/'+path,{method:'POST',body:student()})).status,401);
    assert.equal((await request(e,'/api/admin/alumnos/'+path,{method:'POST',token:ADMIN,body:student(),origin:'https://foreign.invalid'})).status,403);
  }
  assert.equal((await admin(e,'alumnos/crear',student())).status,200);
  const login=await activate(e,'001');
  assert.equal((await request(e,'/api/admin/alumnos/retirar',{method:'POST',token:login.token,body:{codigo:'001'}})).status,401);
  assert.equal(read(e).activo,1);
});

test('create and edit preserve codes, complete names, grades and verified email status correctly',async()=>{
  const e=env();
  assert.equal((await request(e,'/api/health')).data.gestion_alumnos,true);
  assert.equal((await admin(e,'alumnos/crear',student())).status,200);
  assert.equal(read(e).codigo,'001');
  e.DB.db.prepare('UPDATE campus_alumnos SET correo_verificado=1 WHERE codigo=?').run('001');
  e.DB.db.exec("INSERT INTO campus_resultados(codigo,curso,periodo,evaluacion,nota,fecha) VALUES('001','Cirugía','2026','Parcial',17,'2026-11-21')");
  assert.equal((await admin(e,'alumnos/ficha',student('001',{nombre:'Muñoz de la Cruz, María José del Pilar'}))).status,200);
  assert.equal(read(e).nombre,'Muñoz de la Cruz, María José del Pilar');
  assert.equal(read(e).nombres,null);
  assert.equal(read(e).correo_verificado,1);
  assert.equal(e.DB.db.prepare('SELECT nota FROM campus_resultados').get().nota,17);
  assert.equal((await admin(e,'alumnos/ficha',student('001',{correo:'NUEVO@example.invalid'}))).status,200);
  assert.equal(read(e).correo,'nuevo@example.invalid');
  assert.equal(read(e).correo_verificado,0);
  const roster=await admin(e,'alumnos');
  assert.equal(roster.data.gestion_alumnos,true);
  assert.equal(roster.data.items[0].resultados,1);
  assert.equal(roster.data.items[0].retirado_en,null);
  assert.equal((await admin(e,'nota/editar',{codigo:'001',curso:'Cirugía',periodo:'2026',evaluacion:'Parcial',nota:'18',fecha:'2026-11-21'})).status,200);
});

test('invalid input and duplicate identities fail without partially saving a profile',async()=>{
  const e=env();
  for(const extra of [{nombre:''},{dni:'123'},{correo:'incorrecto'},{celular:'abc'},{activo:'false'},{codigo:'!'},{nombre:'A'.repeat(221)}]) {
    assert.equal((await admin(e,'alumnos/crear',student('001',extra))).status,400,JSON.stringify(extra));
  }
  assert.equal((await admin(e,'alumnos/crear',student())).status,200);
  assert.equal((await admin(e,'alumnos/crear',student())).status,409);
  assert.equal((await admin(e,'alumnos/crear',student('002',{correo:'otro@example.invalid'}))).status,409);
  assert.equal(read(e,'002'),undefined);
  assert.equal((await admin(e,'alumnos/crear',student('002',{correo:'otro@example.invalid',dni:'87654321',activo:false}))).status,200);
  assert.equal(read(e,'002').activo,0);
  assert.equal((await admin(e,'alumnos/ficha',student('002',{correo:'maria@example.invalid',dni:'87654321',nombre:'NO GUARDAR'}))).status,409);
  assert.notEqual(read(e,'002').nombre,'NO GUARDAR');
});

test('blocking invalidates sessions, invitations and email links; enabling cannot revive an old session',async()=>{
  const e=env();await admin(e,'alumnos/crear',student());
  const login=await activate(e,'001');
  await admin(e,'invitacion',{codigo:'001',reiniciar:true});
  e.DB.db.exec("INSERT INTO campus_correo_tokens(token_hash,codigo,correo,expira) VALUES('old-mail','001','maria@example.invalid',9999999999)");
  assert.equal((await admin(e,'alumnos/acceso',{codigo:'001',activo:false})).status,200);
  assert.equal(read(e).activo,0);assert.equal(read(e).invitacion_hash,null);
  for(const name of ['campus_sesiones','campus_correo_tokens'])assert.equal(e.DB.db.prepare('SELECT count(*) AS total FROM '+name).get().total,0);
  assert.equal((await request(e,'/api/mis-resultados',{token:login.token})).status,401);
  assert.equal((await admin(e,'invitacion',{codigo:'001'})).status,404);
  assert.equal((await admin(e,'alumnos/acceso',{codigo:'001',activo:true})).status,200);
  assert.equal((await request(e,'/api/mis-resultados',{token:login.token})).status,401);
});

test('retirement preserves academic history, survives imports and restores with access blocked',async()=>{
  const e=env();await admin(e,'alumnos/crear',student());
  e.DB.db.exec("INSERT INTO campus_notes(id,codigo,title,created_at) VALUES('note','001','Mi apunte',1)");
  assert.equal((await admin(e,'alumnos/retirar',{codigo:'001'})).status,200);
  assert.ok(read(e).retirado_en);assert.equal(read(e).activo,0);
  assert.equal((await admin(e,'alumnos/acceso',{codigo:'001',activo:true})).status,409);
  assert.equal((await admin(e,'alumnos/importar',{items:[{...student(),telefono:'999123456'}]})).status,200);
  assert.equal(read(e).activo,0);assert.ok(read(e).retirado_en);
  assert.throws(()=>e.DB.db.exec("UPDATE campus_alumnos SET activo=1 WHERE codigo='001'"),/Restaura/);
  assert.equal((await admin(e,'alumnos/restaurar',{codigo:'001'})).status,200);
  assert.equal(read(e).retirado_en,null);assert.equal(read(e).activo,0);
  assert.equal(e.DB.db.prepare('SELECT title FROM campus_notes').get().title,'Mi apunte');
  assert.equal((await admin(e,'alumnos/acceso',{codigo:'001',activo:true})).status,200);
  assert.equal(read(e).activo,1);
});

test('an incomplete deployment gives an actionable response instead of silently ignoring changes',async()=>{
  const e=env();
  e.DB.db.exec('DROP TRIGGER campus_alumno_retirado_bloqueado; DROP INDEX campus_padron_estado; ALTER TABLE campus_alumnos DROP COLUMN retirado_en');
  assert.equal((await admin(e,'alumnos')).data.gestion_alumnos,false);
  const create=await admin(e,'alumnos/crear',student());
  assert.equal(create.status,503);assert.match(create.data.error,/Actualizar-Campus/);
});

test('audit failure rolls back the student write',async()=>{
  const e=env();e.DB.db.exec("CREATE TRIGGER fail_audit BEFORE INSERT ON campus_auditoria BEGIN SELECT RAISE(ABORT,'audit unavailable'); END");
  assert.equal((await admin(e,'alumnos/crear',student())).status,500);
  assert.equal(read(e),undefined);
});
