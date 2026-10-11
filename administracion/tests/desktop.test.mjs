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
  els.get('area').value='campus';els.get('hub').hidden=true;
  const requests=[],handlers={},location={hash,origin:'https://wajomea.group'};
  const document={getElementById:id=>els.get(id),querySelectorAll:s=>s==='[data-view]'?navs:[...navs,...jumps],createElement(){const el=new Element();el.messages=[];el.contentWindow={postMessage:(data,origin)=>el.messages.push({data,origin})};return el}};
  let pending=null;
  const fetch=async(url,options)=>{requests.push({url,key:options.headers.Authorization,body:options.body});if(pending)await pending;const login=url.endsWith('/api/admin/login');const data=login?JSON.parse(options.body):{};return{ok:login?data.email==='admin@example.invalid'&&data.password==='test-password':options.headers.Authorization==='Bearer test-campus'||options.headers.Authorization==='Bearer test-exams',async json(){return{error:'Credencial incorrecta.',items:[],...(login?{token:'test-exams'}:{})}}}};
  const context=vm.createContext({document,window:{addEventListener:(type,fn)=>handlers[type]=fn},location,history:{pushState(_s,_t,value){location.hash=value}},fetch,AbortSignal,console});
  vm.runInContext(readFileSync(new URL('../admin.js',import.meta.url),'utf8'),context);
  return{els,requests,handlers,location,async login(key){els.get('credential').value=key;await els.get('login').fire('submit')},show(area){navs.find(x=>x.dataset.view===area).fire('click')},frame(area){return els.get('view-'+area).children[0]},hold(p){pending=p}};
}
test('desktop validates before entering and routes the credential only to the matching area and window',async()=>{
  const d=desktop();await d.login('invalid');assert.equal(d.els.get('hub').hidden,true);assert.match(d.els.get('login-status').textContent,/incorrecta/);
  await d.login('test-campus');assert.equal(d.els.get('hub').hidden,false);assert.equal(d.els.get('credential').value,'');
  d.show('campus');const f=d.frame('campus');const event={origin:'https://wajomea.group',source:f.contentWindow,data:{area:'campus',type:'WG_ADMIN_READY'}};
  d.handlers.message({...event,origin:'https://foreign.invalid'});d.handlers.message({...event,source:{}});assert.equal(f.messages.length,0);
  d.handlers.message(event);assert.equal(f.messages.length,1);assert.equal(f.messages[0].data.credential,'test-campus');
  d.show('examenes');const e=d.frame('examenes');d.handlers.message({origin:'https://wajomea.group',source:e.contentWindow,data:{area:'examenes',type:'WG_ADMIN_READY'}});assert.equal(e.messages.length,0);
});
test('switching areas preserves each frame, while disconnect and global logout discard credentials',async()=>{
  const d=desktop();await d.login('test-campus');d.show('campus');const f=d.frame('campus');f.unsavedDraft='preview';
  d.show('examenes');d.show('campus');assert.equal(d.frame('campus'),f);assert.equal(d.frame('campus').unsavedDraft,'preview');
  const event={origin:d.location.origin,source:f.contentWindow,data:{area:'campus',type:'WG_ADMIN_STATUS',connected:false}};d.handlers.message(event);
  d.handlers.message({...event,data:{area:'campus',type:'WG_ADMIN_READY'}});assert.equal(f.messages.length,0);
  d.els.get('logout').fire('click');assert.equal(d.els.get('hub').hidden,true);assert.equal(d.els.get('view-campus').children.length,0);assert.equal(d.els.get('view-examenes').children.length,0);
  d.handlers.message({...event,data:{area:'campus',type:'WG_ADMIN_READY'}});assert.equal(f.messages.length,0);
});
test('exam deep link sends password only to the exam login and passes the session token to its panel',async()=>{
  const d=desktop('#examenes');assert.equal(d.els.get('area').value,'examenes');d.els.get('email').value='admin@example.invalid';await d.login('test-password');assert.match(d.requests[0].url,/badbear-exams-api.*login/);assert.equal(d.requests[1].key,'Bearer test-exams');const frame=d.frame('examenes');assert.ok(frame);
  d.handlers.message({origin:d.location.origin,source:frame.contentWindow,data:{type:'WG_ADMIN_READY',area:'examenes'}});assert.equal(frame.messages[0].data.credential,'test-exams');assert.equal(JSON.stringify(frame.messages).includes('test-password'),false);
  d.location.hash='#__proto__';d.handlers.hashchange();assert.equal(d.els.get('view-inicio').hidden,false);
});
test('leaving the page during pending authentication cannot reopen the desktop',async()=>{
  const d=desktop();let resolve;d.hold(new Promise(r=>resolve=r));const attempt=d.login('test-campus');
  d.handlers.pagehide();resolve();await attempt;assert.equal(d.els.get('hub').hidden,true);assert.equal(d.els.get('entry').hidden,false);
});
