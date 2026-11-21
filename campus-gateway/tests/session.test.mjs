import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
function session(fetch) {
  const storage=new Map();
  const sandbox={fetch,URL,AbortSignal,Map,Promise,Error,setTimeout,crypto,Event,location:{href:'https://wajomea.group/badbear-campus/index.html'},sessionStorage:{getItem:key=>storage.get(key),setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)}};
  const source=readFileSync(new URL('../../assets/js/campus-session.js',import.meta.url),'utf8').replaceAll('export ','');
  vm.runInNewContext(source+'\n globalThis.access={readToken,saveToken,forgetToken,validateSession,safeDestination,connectGateway};',sandbox);
  return {api:sandbox.access,storage};
}
test('a stored token or profile is never treated as authorization without server verification',async()=>{
  let calls=0;const s=session(async(url,options)=>{
    calls++;assert.equal(options.credentials,'omit');assert.equal(options.cache,'no-store');
    assert.equal(options.headers.Authorization,'Bearer '+'a'.repeat(64));
    return Response.json(calls===1?{alumno:{codigo:'001',nombre:'Alumno'}}:{error:'revoked'},{status:calls===1?200:401});
  });
  s.api.saveToken('a'.repeat(64));s.storage.set('badbear-campus-portal-profile',JSON.stringify({codigo:'forged',nombre:'Forged'}));
  assert.equal((await s.api.validateSession(await s.api.readToken())).codigo,'001');
  await assert.rejects(s.api.validateSession(await s.api.readToken()),error=>error.status===401);
  assert.equal(calls,2);
});
test('missing sessions, malformed identities and identity outages fail closed',async()=>{
  const s=session(async()=>Response.json({alumno:{nombre:'Incomplete'}}));
  await assert.rejects(s.api.validateSession('fake'),error=>error.status===401);
  await assert.rejects(s.api.validateSession('a'.repeat(64)),/identidad válida/);
  const offline=session(async()=>{throw Error('offline')});
  await assert.rejects(offline.api.validateSession('a'.repeat(64)),/offline/);
});
test('the return destination cannot send the user or their login to an arbitrary origin',()=>{
  const s=session(()=>{});
  for(const value of ['https://evil.invalid/','//evil.invalid/','javascript:alert(1)','https://user:pass@wajomea.group/','http://wajomea.group/','/badbear-campus/index.html?next=x'])assert.equal(s.api.safeDestination(value),null,value);
  assert.equal(s.api.safeDestination('/psiquiatria/banco-avanzado.html#pregunta').pathname,'/psiquiatria/banco-avanzado.html');
  assert.equal(s.api.safeDestination('https://media.wajomea.group/clase.pdf').hostname,'media.wajomea.group');
});
test('the new login can precede gateway deployment, but an active gateway failure is not ignored',async()=>{
  const legacy=session(async()=>new Response('',{status:405}));assert.equal(await legacy.api.connectGateway('a'.repeat(64)),false);
  const active=session(async()=>Response.json({gateway:true}));assert.equal(await active.api.connectGateway('a'.repeat(64)),true);
  const offline=session(async()=>new Response('',{status:503}));await assert.rejects(offline.api.connectGateway('a'.repeat(64)),/acceso protegido/);
});
