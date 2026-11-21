import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {join,relative} from 'node:path';
import worker from '../worker.js';
const SITE='https://wajomea.group', TOKEN='a'.repeat(64), COOKIE='__Secure-badbear-campus='+TOKEN;
function req(path,options={}) {return new Request(new URL(path,SITE),{headers:{Accept:'text/html',...options.headers},...Object.fromEntries(Object.entries(options).filter(([key])=>key!=='headers'))});}
function environment(status=200) {
  return {CAMPUS_API:{async fetch(request){assert.equal(request.headers.get('Authorization'),'Bearer '+TOKEN);assert.equal(request.headers.get('Origin'),SITE);return Response.json(status===200?{alumno:{codigo:'001',nombre:'Alumno de prueba'}}:{error:'Sesión finalizada'},{status})}}};
}
test('direct course, exam, book and PDF links cannot fetch origin without a valid Campus session',async t=>{
  let calls=0;t.mock.method(globalThis,'fetch',async()=>{calls++;return new Response('private')});
  for(const path of ['/badbear-med.html','/psiquiatria/banco-avanzado.html','/badbear-books/index.html','/app.html?page=badbear-med.html']) {
    const response=await worker.fetch(req(path),environment());assert.equal(response.status,303);assert.match(response.headers.get('Location'),/^https:\/\/wajomea.group\/badbear-campus\/index.html\?next=/);
  }
  for(const path of ['/psiquiatria/pdfs/clase.pdf','/cirugia-batimix/anestesiologia-datos.js','https://media.wajomea.group/curso/audio.mp3']) {
    assert.equal((await worker.fetch(req(path,{headers:{Accept:'*/*'}}),environment())).status,401);
  }
  assert.equal(calls,0);
});
test('the public entrance and login dependencies stay reachable without public course assets',async t=>{
  t.mock.method(globalThis,'fetch',async()=>new Response('bootstrap'));
  for(const path of ['/','/index.html','/badbear-campus/index.html','/badbear-campus/student.js','/assets/js/campus-session.js'])assert.equal((await worker.fetch(req(path),environment())).status,200);
  assert.equal((await worker.fetch(req('/badbear-campus/aula-batimix.js',{headers:{Accept:'*/*'}}),environment())).status,401);
  assert.equal((await worker.fetch(req('https://media.wajomea.group/index.html'),environment())).status,303);
});
test('a real validated session grants access without forwarding its credentials to the static origin',async t=>{
  let reached=false;
  t.mock.method(globalThis,'fetch',async request=>{
    reached=true;assert.equal(request.headers.get('Cookie'),null);assert.equal(request.headers.get('Authorization'),null);
    assert.equal(request.headers.get('Range'),'bytes=0-1023');
    return new Response('private',{status:206,headers:{'Content-Range':'bytes 0-6/7','Set-Cookie':'origin=1'}});
  });
  const response=await worker.fetch(req('/clase.pdf',{headers:{Cookie:COOKIE,Authorization:'Bearer private',Range:'bytes=0-1023'}}),environment());
  assert.equal(response.status,206);assert.equal(reached,true);assert.equal(response.headers.get('Set-Cookie'),null);assert.match(response.headers.get('Cache-Control'),/no-store/);assert.equal(await response.text(),'private');
});
test('sessions are rechecked on every request and identity failures never expose content',async t=>{
  t.mock.method(globalThis,'fetch',async()=>new Response('private'));
  const env=environment();const request=req('/badbear-med.html',{headers:{Cookie:COOKIE}});
  assert.equal((await worker.fetch(request,env)).status,200);
  env.CAMPUS_API=environment(401).CAMPUS_API;
  assert.equal((await worker.fetch(request,env)).status,303);
  env.CAMPUS_API.fetch=async()=>{throw Error('offline')};
  assert.equal((await worker.fetch(request,env)).status,503);
  assert.equal((await worker.fetch(request,{})).status,503);
});
test('the session bridge requires a validated token, rejects CSRF and clears its protected cookie',async()=>{
  const post=(body,origin=SITE)=>req('/__campus/session',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(body)});
  assert.equal((await worker.fetch(post({token:TOKEN},'https://foreign.invalid'),environment())).status,403);
  assert.equal((await worker.fetch(post({token:'fake'}),environment())).status,401);
  assert.equal((await worker.fetch(post({token:TOKEN}),environment(401))).status,401);
  assert.equal((await worker.fetch(post({token:TOKEN,extra:'x'.repeat(600)}),environment())).status,413);
  const response=await worker.fetch(post({token:TOKEN}),environment());
  assert.equal(response.status,200);assert.equal((await response.json()).gateway,true);
  const cookie=response.headers.get('Set-Cookie');
  for(const required of ['HttpOnly','Secure','SameSite=Strict','Domain=wajomea.group'])assert.ok(cookie.includes(required));
  const logout=await worker.fetch(req('/__campus/session',{method:'DELETE',headers:{Origin:SITE}}),environment());
  assert.match(logout.headers.get('Set-Cookie'),/Max-Age=0/);
});
test('ambiguous cookies, arbitrary hosts and unvalidated file uploads do not bypass access',async()=>{
  assert.equal((await worker.fetch(req('/badbear-med.html',{headers:{Cookie:COOKIE+'; '+COOKIE}}),environment())).status,303);
  assert.equal((await worker.fetch(req('https://foreign.invalid/badbear-med.html'),environment())).status,404);
  assert.equal((await worker.fetch(req('/index.html',{method:'POST',body:'data'}),environment())).status,405);
});
test('every published HTML content page includes the common guard before any course code',()=>{
  const root=new URL('../../',import.meta.url).pathname;
  let count=0;
  function inspect(dir){for(const entry of readdirSync(dir,{withFileTypes:true})){
    if(entry.name.startsWith('.')||entry.name==='node_modules')continue;
    const path=join(dir,entry.name);
    if(entry.isDirectory())inspect(path);
    else if(path.endsWith('.html')){
      const name=relative(root,path).replaceAll('\\','/');
      if(['index.html','badbear-campus/index.html'].includes(name))continue;
      const content=readFileSync(path,'utf8');
      const scripts=[...content.matchAll(/<script\b[^>]*>/gi)];
      assert.match(scripts[0]?.[0]||'',/campus-access\.js/,name);
      assert.match(content,/campus-access\.css/,name);
      assert.doesNotMatch(content,/<script[^>]+src=["'][^"']*(?:course-lock|acceso)(?:-config)?\.js/i,name);
      count++;
    }
  }}
  inspect(root);assert.ok(count>=267);
});
