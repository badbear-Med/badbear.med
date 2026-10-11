import {test} from 'node:test';
import assert from 'node:assert/strict';
import {centralBridge} from '../bridge.js';

function browser(embedded=true){
  const saved={window:globalThis.window,location:globalThis.location,document:globalThis.document};
  const messages=[],handlers=new Map(),classes=[];
  const parent={postMessage(data,origin){messages.push({data,origin})}};
  const window={parent,addEventListener(name,handler){handlers.set(name,handler)}};
  if(!embedded)window.parent=window;
  globalThis.window=window;globalThis.location={origin:'https://wajomea.group',search:embedded?'?panel=central':''};
  globalThis.document={body:{classList:{add(name){classes.push(name)}}}};
  return{parent,messages,handlers,classes,restore(){for(const key of Object.keys(saved)){if(saved[key]===undefined)delete globalThis[key];else globalThis[key]=saved[key]}}};
}
test('embedded panel announces readiness and reports status only to its own origin',()=>{
  const b=browser();try{
    const report=centralBridge('campus',{connect(){},disconnect(){}});
    assert.deepEqual(b.classes,['central-panel']);
    assert.deepEqual(b.messages[0],{data:{type:'WG_ADMIN_READY',area:'campus'},origin:'https://wajomea.group'});
    report(true);assert.deepEqual(b.messages[1].data,{type:'WG_ADMIN_STATUS',area:'campus',connected:true});
    report('true');assert.equal(b.messages[2].data.connected,false);
  }finally{b.restore()}
});
test('only the same-origin parent may connect or disconnect the matching area',()=>{
  const b=browser();try{
    const calls=[];centralBridge('campus',{connect:key=>calls.push(key),disconnect:()=>calls.push('disconnect')});
    const handler=b.handlers.get('message');
    const event={origin:'https://wajomea.group',source:b.parent,data:{type:'WG_ADMIN_CONNECT',area:'campus',credential:'test-only-key'}};
    handler({...event,origin:'https://foreign.invalid'});handler({...event,source:{}});handler({...event,data:{...event.data,area:'examenes'}});handler({...event,data:{...event.data,credential:123}});handler({...event,data:null});
    assert.deepEqual(calls,[]);handler(event);assert.deepEqual(calls,['test-only-key']);
    handler({...event,data:{type:'WG_ADMIN_DISCONNECT',area:'campus'}});assert.deepEqual(calls,['test-only-key','disconnect']);
  }finally{b.restore()}
});
test('standalone administration installs no parent credential bridge',()=>{
  const b=browser(false);try{const report=centralBridge('campus',{connect(){throw Error('unexpected')},disconnect(){}});report(true);assert.equal(b.handlers.size,0);assert.equal(b.messages.length,0);assert.equal(b.classes.length,0)}finally{b.restore()}
});
