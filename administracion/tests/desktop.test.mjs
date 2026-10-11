import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

// Exercise the real desktop script with a small DOM adapter; APIs are synthetic.
function desktop(hash=''){
  class Element {
    constructor(){this.children=[];this.dataset={};this.attributes={};this.handlers={};this.value='';this.hidden=false;const set=new Set();this.classList={toggle:(name,on)=>on?set.add(name):set.delete(name),contains:name=>set.has(name)};}
    addEventListener(name,fn){this.handlers[name]=fn}setAttribute(k,v){this.attributes[k]=v}removeAttribute(k){delete this.attributes[k]}focus(){}
    append(el){this.children.push(el);el.parent=this}replaceChildren(...els){this.children=els}remove(){if(this.parent)this.parent.children=this.parent.children.filter(x=>x!==this)}
    fire(type){return this.handlers[type]?.({preventDefault(){}})}
  }
  const html=readFileSync(new URL('../index.html',import.meta.url),'utf8'),els=new Map();
  for(const match of html.matchAll(/\bid="([^"]+)"/g))els.set(match[1],new Element());
  const navs=[...html.matchAll(/data-view="([^"]+)"/g)].map(m=>{const el=new Element();el.dataset.view=m[1];return el});
  const jumps=[...html.matchAll(/data-jump="([^"]+)"/g)].map(m=>{const el=new Element();el.dataset.jump=m[1];return el});
  els.get('hub').hidden=true;els.get('email').value='admin@example.invalid';
  const requests=[],handlers={},location={hash,origin:'https://wajomea.group'};
  const document={getElementById:id=>els.get(id),querySelectorAll:s=>s==='[data-view]'?navs:[...navs,...jumps],createElement(){const el=new Element();el.messages=[];el.contentWindow={postMessage:(data,origin)=>el.messages.push({data,origin})};return el}};
  let pending=null;
  const setup={ready:true,omitCampus:false};
  const fetch=async(url,options)=>{requests.push({url,key:options.headers?.Authorization,body:options.body});if(pending)await pending;
    if(url.endsWith('/api/health'))return{ok:true,async json(){return{acceso_unificado:setup.ready}}};
    const login=url.endsWith('/api/admin/login'),data=login?JSON.parse(options.body):{};
    return{ok:login?data.email==='admin@example.invalid'&&data.password==='test-password':options.headers.Authorization==='Bearer test-campus',async json(){return{error:'Correo o contraseña incorrectos.',items:[],...(login?{ok:true,token:'test-exams',...(!setup.omitCampus?{campus_token:'test-campus'}:{})}:{})}}}
  };
  const context=vm.createContext({document,window:{addEventListener:(type,fn)=>handlers[type]=fn},location,history:{pushState(_s,_t,value){location.hash=value}},fetch,AbortSignal,console});
  vm.runInContext(readFileSync(new URL('../admin.js',import.meta.url),'utf8'),context);
  return{els,requests,handlers,location,setup,async login(key){els.get('credential').value=key;await els.get('login').fire('submit')},show(area){navs.find(x=>x.dataset.view===area).fire('click')},frame(area){return els.get('view-'+area).children[0]},hold(p){pending=p}};
}

test('one login connects both areas and only their matching frames receive their session',async()=>{
  const d=desktop();await d.login('invalid');assert.equal(d.els.get('hub').hidden,true);assert.match(d.els.get('login-status').textContent,/incorrectos/);
  await d.login('test-password');assert.equal(d.els.get('hub').hidden,false);assert.equal(d.els.get('credential').value,'');
  for(const area of ['campus','examenes']){
    d.show(area);const f=d.frame(area),event={origin:d.location.origin,source:f.contentWindow,data:{area,type:'WG_ADMIN_READY'}};
    d.handlers.message({...event,origin:'https://foreign.invalid'});d.handlers.message({...event,source:{}});assert.equal(f.messages.length,0);
    d.handlers.message(event);assert.equal(f.messages.length,1);assert.equal(f.messages[0].data.credential,area==='campus'?'test-campus':'test-exams');
    assert.equal(JSON.stringify(f.messages).includes('test-password'),false);
  }
  const logins=d.requests.filter(r=>r.body);
  assert.equal(logins.length,2);assert.ok(logins.every(r=>r.url==='https://badbear-campus-api.wajomea-group.workers.dev/api/admin/login'));
});
test('switching areas preserves drafts; a child disconnect closes and clears the whole desktop',async()=>{
  const d=desktop();await d.login('test-password');d.show('campus');const f=d.frame('campus');f.unsavedDraft='preview';
  d.show('examenes');d.show('campus');assert.equal(d.frame('campus'),f);assert.equal(d.frame('campus').unsavedDraft,'preview');
  const event={origin:d.location.origin,source:f.contentWindow,data:{area:'campus',type:'WG_ADMIN_STATUS',connected:false}};d.handlers.message(event);
  assert.equal(d.els.get('hub').hidden,true);assert.equal(d.els.get('view-campus').children.length,0);assert.equal(d.els.get('view-examenes').children.length,0);
  d.handlers.message({...event,data:{area:'campus',type:'WG_ADMIN_READY'}});assert.equal(f.messages.length,0);
});
test('deep links open their requested area after the same login; unexpected hashes show the overview',async()=>{
  for(const area of ['campus','examenes']){
    const d=desktop('#'+area);await d.login('test-password');assert.ok(d.frame(area));
    assert.equal(d.requests[2].key,'Bearer test-campus');
    d.location.hash='#__proto__';d.handlers.hashchange();assert.equal(d.els.get('view-inicio').hidden,false);
    d.els.get('logout').fire('click');assert.equal(d.els.get('hub').hidden,true);
  }
});
test('an outdated backend or missing Campus session cannot open the desktop',async()=>{
  const d=desktop();d.setup.ready=false;await d.login('test-password');assert.equal(d.requests.length,1);assert.equal(d.els.get('hub').hidden,true);assert.match(d.els.get('login-status').textContent,/activación/);
  d.setup.ready=true;d.setup.omitCampus=true;await d.login('test-password');assert.equal(d.els.get('hub').hidden,true);assert.match(d.els.get('login-status').textContent,/válida/);
});
test('leaving during pending login prevents login transmission and desktop reopening',async()=>{
  const d=desktop();let resolve;d.hold(new Promise(r=>resolve=r));const attempt=d.login('test-password');
  d.handlers.pagehide();resolve();await attempt;assert.equal(d.els.get('hub').hidden,true);assert.equal(d.els.get('entry').hidden,false);assert.equal(d.requests.length,1);
});
