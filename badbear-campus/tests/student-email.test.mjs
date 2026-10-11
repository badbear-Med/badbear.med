import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

function page(hash='') {
  const elements=new Map(),events={},requests=[],messages=[],historyCalls=[];let pending;
  const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
  for(const match of html.matchAll(/id="([^"]+)"/g)) {
    assert.equal(elements.has(match[1]),false);
    elements.set(match[1],{value:'',hidden:/^(email-finish|results)$/.test(match[1]),handlers:{},textContent:'',addEventListener(type,fn){this.handlers[type]=fn},replaceChildren(){},append(){},reset(){this.wasReset=true},focus(){this.focused=true}});
  }
  const location={hash,pathname:'/badbear-campus/index.html',search:''};
  const sandbox={location,URLSearchParams,history:{replaceState(...args){historyCalls.push(args);location.hash=''}},window:{addEventListener(type,fn){events[type]=fn}},$:id=>{assert.ok(elements.has(id),id);return elements.get(id)},message:(text,kind)=>messages.push({text,kind}),availability:()=>{},busy:fn=>pending=fn().catch(error=>messages.push({text:error.message,kind:'error'})),post:async(path,key,body)=>{requests.push({path,key,body});return path.endsWith('/confirmar')?{codigo:'001',mensaje:'Contraseña guardada'}:{mensaje:'Si tu código tiene un correo registrado, recibirás un enlace'}},call:()=>{},table:()=>{},console};
  const source=readFileSync(new URL('../student.js',import.meta.url),'utf8').replace(/^import .*;\n/,'');vm.runInNewContext(source,sandbox);
  return {elements,events,requests,messages,historyCalls,location,async submit(id){elements.get(id).handlers.submit({preventDefault(){}});await pending},click(id){elements.get(id).handlers.click()}};
}
test('email request sends only the student code, never a self-selected recovery address',async()=>{
  const p=page();p.elements.get('email-code').value='001';await p.submit('email-request');assert.equal(p.requests.length,1);assert.equal(p.requests[0].path,'/api/correo/solicitar');assert.deepEqual(JSON.parse(JSON.stringify(p.requests[0].body)),{codigo:'001'});
});
test('the email link is removed from the URL and consumed only when matching passwords are submitted',async()=>{
  const token='b'.repeat(64),p=page('#acceso='+token);assert.equal(p.location.hash,'');assert.equal(p.historyCalls.length,1);assert.equal(p.elements.get('entry').hidden,true);assert.equal(p.elements.get('email-finish').hidden,false);assert.equal(p.requests.length,0);
  p.elements.get('email-password').value='My password 123';p.elements.get('email-repeat').value='Different password';await p.submit('email-confirm');assert.equal(p.requests.length,0);
  p.elements.get('email-repeat').value='My password 123';await p.submit('email-confirm');assert.equal(p.requests[0].body.token,token);assert.equal(p.elements.get('email-finish').hidden,true);assert.equal(p.elements.get('codigo').value,'001');assert.equal(p.elements.get('password').focused,true);
  await p.submit('email-confirm');assert.equal(p.requests.length,1);
});
test('invalid links and leaving the page discard email credentials without submitting passwords',async()=>{
  const invalid=page('#acceso=bad');assert.equal(invalid.location.hash,'');assert.match(invalid.messages[0].text,/inválido/);
  const p=page('#acceso='+'c'.repeat(64));p.events.pagehide();await p.submit('email-confirm');assert.equal(p.requests.length,0);assert.equal(p.elements.get('email-finish').hidden,true);
});
