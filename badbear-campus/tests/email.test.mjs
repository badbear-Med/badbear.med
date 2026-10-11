import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import worker from '../worker-backend.js';
import {parseContactsCSV} from '../csv.js';

const source=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
class D1 {
  constructor(mail=true){this.db=new DatabaseSync(':memory:');this.db.exec(source('schema.sql'));this.db.exec(source('migrations/0001_estados_resultados.sql'));if(mail)this.migrate()}
  migrate(){this.db.exec(source('migrations/0002_acceso_correo.sql'))}
  prepare(sql){const stmt=this.db.prepare(sql);let args=[];return {bind(...values){args=values;return this},async first(){return stmt.get(...args)||null},async all(){return {results:stmt.all(...args)}},async run(){return {meta:{changes:Number(stmt.run(...args).changes)}}}}}
  async batch(statements){this.db.exec('BEGIN');try{const out=[];for(const s of statements)out.push(await s.run());this.db.exec('COMMIT');return out}catch(error){this.db.exec('ROLLBACK');throw error}}
}
const ADMIN='a'.repeat(64),KEY='re_'+'test'.repeat(8),SITE='https://wajomea.group',PASS='My test password 123';
const environment=mail=>({DB:new D1(mail),ADMIN_API_TOKEN:ADMIN,PASSWORD_PEPPER:'p'.repeat(64),RESEND_API_KEY:KEY,CAMPUS_EMAIL_FROM:'campus@notifications.example.invalid'});
async function request(env,path,{body,token='',origin=SITE,ip='192.0.2.10',background=true}={}){
  const jobs=[];const ctx=background?{waitUntil:p=>jobs.push(p)}:undefined;
  const reply=await worker.fetch(new Request('https://example.invalid'+path,{method:body?'POST':'GET',headers:{Origin:origin,'CF-Connecting-IP':ip,...(body?{'Content-Type':'application/json'}:{}),...(token?{Authorization:'Bearer '+token}:{})},...(body?{body:JSON.stringify(body)}:{})}),env,ctx);
  const data=await reply.json();await Promise.all(jobs);return {status:reply.status,data};
}
const admin=(e,path,body)=>request(e,'/api/admin/'+path,{body,token:ADMIN});
function student(e,codigo='001',correo='student1@example.invalid'){e.DB.db.prepare('INSERT INTO campus_alumnos(codigo,nombre,correo) VALUES (?,?,?)').run(codigo,'Alumno '+codigo,correo)}
function provider(t){const messages=[];t.mock.method(globalThis,'fetch',async(url,options)=>{
  assert.equal(url,'https://api.resend.com/emails');assert.equal(options.redirect,'manual');assert.equal(options.headers.Authorization,'Bearer '+KEY);
  messages.push(JSON.parse(options.body));return Response.json({id:'mail-'+messages.length});
});return messages}
const mailToken=message=>message.text.match(/#acceso=([a-f0-9]{64})/)[1];
const ask=(e,codigo='001',extra={})=>request(e,'/api/correo/solicitar',{body:{codigo,...extra}});
const complete=(e,token,password=PASS)=>request(e,'/api/correo/confirmar',{body:{token,password}});
const login=(e,password=PASS)=>request(e,'/api/login',{body:{codigo:'001',password}});

test('email migration preserves existing accounts, grades, sessions and manual invitations',()=>{
  const e=environment(false),db=e.DB.db;
  db.exec("INSERT INTO campus_alumnos(codigo,nombre,password_hash,salt,invitacion_hash,invitacion_expira) VALUES ('001','Alumno','hash','salt','invitation',9999999999); INSERT INTO campus_sesiones VALUES ('session','001',9999999999); INSERT INTO campus_resultados(codigo,curso,periodo,evaluacion,nota,estado,fecha) VALUES ('001','Fisiología 1','2026-2','Primer examen',0,'','2026-10-10')");
  const user={...db.prepare('SELECT * FROM campus_alumnos').get()},grades=db.prepare('SELECT * FROM campus_resultados').all(),sessions=db.prepare('SELECT * FROM campus_sesiones').all();e.DB.migrate();
  const upgraded={...db.prepare('SELECT * FROM campus_alumnos').get()};assert.equal(upgraded.correo,null);assert.equal(upgraded.correo_verificado,0);delete upgraded.correo;delete upgraded.correo_verificado;
  assert.deepEqual(upgraded,user);assert.deepEqual(db.prepare('SELECT * FROM campus_resultados').all(),grades);assert.deepEqual(db.prepare('SELECT * FROM campus_sesiones').all(),sessions);
});
test('private email rosters validate complete lists, preserve codes and require reviewed replacements',async()=>{
  const e=environment();student(e,'001',null);student(e,'002',null);
  const items=parseContactsCSV('\ufeffcódigo;correo\n001; Student1@Example.invalid \n002;student2@example.invalid');assert.equal(items[0].codigo,'001');
  const preview=await admin(e,'correos/vista-previa',{items});assert.equal(preview.status,200);assert.equal(preview.data.items[0].correo,'student1@example.invalid');assert.equal(e.DB.db.prepare('SELECT correo FROM campus_alumnos WHERE codigo=?').get('001').correo,null);
  assert.equal((await request(e,'/api/admin/correos',{body:{items}})).status,401);
  assert.equal((await admin(e,'correos',{items})).status,200);
  for(const bad of [[{codigo:'003',correo:'third@example.invalid'}],[{codigo:'001',correo:'bad'}],[{codigo:'001',correo:'same@example.invalid'},{codigo:'002',correo:'same@example.invalid'}],[{codigo:'002',correo:'student1@example.invalid'}]])assert.notEqual((await admin(e,'correos',{items:bad})).status,200);
  const replacement=[{codigo:'001',correo:'new@example.invalid'}];assert.equal((await admin(e,'correos',{items:replacement})).status,409);
  assert.equal((await admin(e,'correos',{items:replacement,reemplazar:true})).status,200);
  assert.equal((await admin(e,'correos/estado')).data.configurado,true);
  assert.equal((await request(e,'/api/admin/correos/estado')).status,401);
  assert.throws(()=>parseContactsCSV('codigo,correo,extra\n001,a@example.invalid,x'));
});
test('only registered emails receive links and public responses never disclose account existence or delivery details',async t=>{
  const e=environment();student(e);const messages=provider(t);
  const known=await ask(e,'001',{correo:'attacker@example.invalid'}),unknown=await ask(e,'099'),inactive=await ask(e,'002');
  assert.equal(known.status,200);assert.deepEqual(known,unknown);assert.deepEqual(known,inactive);
  assert.equal(messages.length,1);assert.deepEqual(messages[0].to,['student1@example.invalid']);assert.equal(JSON.stringify(known).includes('student1'),false);assert.equal(JSON.stringify(known).includes(mailToken(messages[0])),false);
  assert.equal(e.DB.db.prepare('SELECT password_hash FROM campus_alumnos').get().password_hash,null);
  const dump=JSON.stringify(e.DB.db.prepare('SELECT * FROM campus_correo_tokens').all());assert.equal(dump.includes(mailToken(messages[0])),false);
  assert.equal((await request(e,'/api/correo/solicitar',{body:{codigo:'001'},origin:'https://foreign.invalid'})).status,403);
  assert.equal((await ask({...e,RESEND_API_KEY:''})).status,503);
});
test('email activation creates a password, verifies the email, consumes the link and keeps other students private',async t=>{
  const e=environment();student(e);student(e,'002','student2@example.invalid');const messages=provider(t);
  await ask(e);const token=mailToken(messages[0]);assert.equal((await complete(e,token,'short')).status,400);
  assert.equal((await complete(e,token)).status,200);assert.equal(e.DB.db.prepare('SELECT correo_verificado FROM campus_alumnos WHERE codigo=?').get('001').correo_verificado,1);
  assert.equal((await complete(e,token)).status,401);const session=await login(e);assert.equal(session.status,200);
  const result=await request(e,'/api/mis-resultados?codigo=002',{token:session.data.token});assert.equal(result.data.alumno.codigo,'001');assert.equal(result.data.items.length,0);
});
test('recovery preserves the current login until confirmation, then revokes all older sessions and links',async t=>{
  const e=environment();student(e);const messages=provider(t);await ask(e);await complete(e,mailToken(messages[0]));const old=await login(e);
  const clock=Date.now();t.mock.method(Date,'now',()=>clock+121000);await ask(e);const recovery=mailToken(messages[1]);
  assert.equal((await request(e,'/api/mis-resultados',{token:old.data.token})).status,200);assert.equal((await login(e)).status,200);
  assert.equal((await complete(e,recovery,'My replacement password 456')).status,200);
  assert.equal((await request(e,'/api/mis-resultados',{token:old.data.token})).status,401);assert.equal((await login(e)).status,401);assert.equal((await login(e,'My replacement password 456')).status,200);
  assert.equal((await complete(e,recovery)).status,401);
});
test('links expire, cannot be reassigned to another email and permit only one simultaneous completion',async t=>{
  const e=environment();student(e);const messages=provider(t);await ask(e);const expired=mailToken(messages[0]);const clock=Date.now();t.mock.method(Date,'now',()=>clock+1801000);
  assert.equal((await complete(e,expired)).status,401);await ask(e);const token=mailToken(messages[1]);
  assert.equal((await admin(e,'correos',{items:[{codigo:'001',correo:'new@example.invalid'}],reemplazar:true})).status,200);assert.equal((await complete(e,token)).status,401);
  t.mock.method(Date,'now',()=>clock+1922000);await ask(e);const fresh=mailToken(messages[2]);
  const outcomes=await Promise.all([complete(e,fresh),complete(e,fresh,'Another valid password 567')]);assert.equal(outcomes.filter(x=>x.status===200).length,1);assert.equal(e.DB.db.prepare('SELECT COUNT(*) AS n FROM campus_correo_tokens').get().n,0);
});
test('provider redirects and failures are not followed and do not invalidate older usable links',async t=>{
  const e=environment();student(e);const messages=provider(t);await ask(e);const valid=mailToken(messages[0]);const clock=Date.now();t.mock.method(Date,'now',()=>clock+121000);
  const log=[];t.mock.method(console,'error',(...args)=>log.push(args.join(' ')));
  t.mock.method(globalThis,'fetch',async(url,options)=>{assert.equal(options.redirect,'manual');return Response.json({id:'redirect',key:KEY},{status:302,headers:{Location:'https://foreign.invalid'}})});
  const result=await ask(e);assert.equal(result.status,200);assert.equal(JSON.stringify(result).includes(KEY),false);assert.equal(log.join('').includes(KEY),false);
  assert.equal(e.DB.db.prepare('SELECT COUNT(*) AS n FROM campus_correo_tokens').get().n,1);assert.equal((await complete(e,valid)).status,200);
  assert.equal((await admin(e,'correos/estado')).data.ultimo_envio.motivo,'HTTP_302');
});
test('daily and monthly budgets are atomic across simultaneous requests and cannot overrun',async t=>{
  const e=environment();student(e);student(e,'002','student2@example.invalid');const messages=provider(t);const time=Math.floor(Date.now()/1000),day=Math.floor(time/86400),month=Number(new Date(time*1000).toISOString().slice(0,7).replace('-',''));
  e.DB.db.prepare("INSERT INTO campus_correo_limites VALUES ('envios:dia',?,89)").run(day);e.DB.db.prepare("INSERT INTO campus_correo_limites VALUES ('envios:mes',?,100)").run(month);
  await Promise.all([ask(e,'001'),ask(e,'002')]);assert.equal(messages.length,1);let status=(await admin(e,'correos/estado')).data;assert.equal(status.enviados_hoy,90);assert.equal(status.enviados_mes,101);
  t.mock.method(Date,'now',()=>Date.UTC(2030,0,1));const newDay=Math.floor(Date.now()/86400000),newMonth=203001;
  e.DB.db.prepare("INSERT INTO campus_correo_limites VALUES ('envios:mes',?,2700)").run(newMonth);await ask(e,'001');status=(await admin(e,'correos/estado')).data;assert.equal(status.enviados_hoy,0);assert.equal(status.enviados_mes,2700);assert.equal(messages.length,1);assert.ok(newDay>day);
});
test('transient mail failures retry with the same idempotency key and reserve the budget only once',async t=>{
  const e=environment();student(e);const requests=[];
  t.mock.method(globalThis,'setTimeout',callback=>{callback();return 0});
  t.mock.method(globalThis,'fetch',async(url,options)=>{requests.push(options);if(requests.length<3)throw Error('temporary connection failure');return Response.json({id:'accepted'})});
  assert.equal((await ask(e)).status,200);assert.equal(requests.length,3);assert.equal(new Set(requests.map(x=>x.headers['Idempotency-Key'])).size,1);assert.equal(new Set(requests.map(x=>x.body)).size,1);
  const status=(await admin(e,'correos/estado')).data;assert.equal(status.enviados_hoy,1);assert.equal(status.ultimo_envio.estado,'aceptado');
});
test('repeated requests are throttled independently from normal student login',async t=>{
  const e=environment();student(e);const messages=provider(t);await ask(e);await complete(e,mailToken(messages[0]));
  const generic=(await ask(e)).data;for(let i=0;i<8;i++)assert.deepEqual((await ask(e)).data,generic);
  assert.equal(messages.length,1);assert.equal((await login(e)).status,200);
});
