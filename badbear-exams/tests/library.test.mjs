import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const source=readFileSync(new URL('../library.js',import.meta.url),'utf8');
const flush=()=>new Promise(resolve=>setImmediate(resolve));
const fixture=[{id:'first',course:'Fisiología',title:'Parcial de fisiología',university:'UNFV',facultad:'Medicina',teacher:'Docente A',anio:2026,type:'Parcial'},{id:'second',course:'Cirugía General',title:'Examen final',university:'UNFV',facultad:'Medicina',anio:2025,type:'Final'}];
function page(fileFetch=async()=>({ok:true,blob:async()=>({type:'application/pdf'})}),catalogue=fixture){
  class Element{
    constructor(tag){this.tag=tag;this.children=[];this.events={};this.value='';this.hidden=false;this.open=false;this.style={};this.attrs={};this.textContent='';const classes=new Set();this.classList={add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x)};}
    append(...children){this.children.push(...children);}
    replaceChildren(...children){this.children=children;}
    setAttribute(name,value){this.attrs[name]=value;}
    addEventListener(type,handler){(this.events[type]??=[]).push(handler);}
    async fire(type){for(const handler of this.events[type]||[])await handler({preventDefault(){}});}
    showModal(){this.open=true;}
    close(){this.open=false;this.fire('close');}
  }
  const elements=new Map([...html.matchAll(/id="([^"]+)"/g)].map(m=>[m[1],new Element(m[1])]));
  const documentEvents={},windowEvents={},requests=[],created=[],revoked=[];
  const document={getElementById:id=>{assert.ok(elements.has(id),id);return elements.get(id)},createElement:tag=>new Element(tag),addEventListener:(type,fn)=>{documentEvents[type]=fn},fullscreenEnabled:true,fullscreenElement:null};
  document.documentElement={async requestFullscreen(){document.fullscreenElement=this;documentEvents.fullscreenchange?.();}};
  document.exitFullscreen=async()=>{document.fullscreenElement=null;documentEvents.fullscreenchange?.();};
  const sandbox={document,window:{addEventListener:(type,fn)=>{windowEvents[type]=fn}},AbortController,AbortSignal,setTimeout,clearTimeout,URL:{createObjectURL(blob){const url='blob:document-'+created.length;created.push({url,blob});return url},revokeObjectURL:url=>revoked.push(url)},Option:class extends Element{constructor(text,value){super('option');this.textContent=text;this.value=value}},fetch:async(url,options)=>{requests.push({url,options});return url.endsWith('/api/examenes')?{ok:true,json:async()=>({items:catalogue})}:fileFetch(url,options)},console};
  vm.runInNewContext(source,sandbox);
  return {elements,requests,created,revoked,windowEvents,document,async ready(){await flush();await flush()},async open(index=0){await elements.get('exam-list').children[index].children.at(-1).fire('click')},async close(){await elements.get('reader-close').fire('click')}};
}
test('catalogue keeps documents out of cards and filters by accents, year and evaluation',async()=>{
  const p=page();await p.ready();const list=p.elements.get('exam-list');assert.equal(list.children.length,2);
  assert.equal(list.children[0].children.at(-1).textContent,'Leer examen');
  p.elements.get('q').value='fisiologia';await p.elements.get('q').fire('input');assert.equal(list.children.length,1);
  p.elements.get('q').value='';p.elements.get('year').value='2025';await p.elements.get('year').fire('input');assert.equal(list.children.length,1);assert.equal(list.children[0].children[1].children[0].textContent,'Examen final');
  p.elements.get('type').value='Parcial';await p.elements.get('type').fire('input');assert.equal(list.children.length,0);assert.equal(p.elements.get('empty').hidden,false);
});
test('a PDF opens in the shared reader, closes, reopens on the first click and releases every URL',async()=>{
  const p=page();await p.ready();await p.open();assert.equal(p.elements.get('exam-reader').open,true);
  let viewer=p.elements.get('reader-content').children[0];assert.equal(viewer.tag,'iframe');assert.match(viewer.src,/#toolbar=1/);assert.equal(viewer.title,'Examen: Parcial de fisiología');
  await p.close();assert.equal(p.elements.get('reader-content').children.length,0);assert.deepEqual(p.revoked,['blob:document-0']);
  await p.open();assert.equal(p.created.length,2);assert.equal(p.elements.get('reader-content').children.length,1);
  await p.open(1);assert.equal(p.elements.get('reader-title').textContent,'Examen final');assert.equal(p.elements.get('reader-content').children.length,1);
  await p.close();assert.deepEqual(p.revoked,['blob:document-0','blob:document-1','blob:document-2']);
});
test('closing or replacing a pending request cannot revive the previous document',async()=>{
  const resolve=[];const p=page((url,options)=>new Promise(done=>resolve.push({done,options})));await p.ready();
  const old=p.open();await flush();await p.close();assert.equal(resolve[0].options.signal.aborted,true);
  const current=p.open(1);await flush();resolve[1].done({ok:true,blob:async()=>({type:'application/pdf'})});await current;
  resolve[0].done({ok:true,blob:async()=>({type:'application/pdf'})});await old;
  assert.equal(p.created.length,1);assert.equal(p.elements.get('reader-title').textContent,'Examen final');assert.equal(p.elements.get('reader-content').children.length,1);await p.close();
});
test('image zoom resets between documents and unsupported formats show an error without a viewer',async()=>{
  let mime='image/png';const p=page(async()=>({ok:true,blob:async()=>({type:mime})}));await p.ready();await p.open();
  assert.equal(p.elements.get('image-zoom-label').hidden,false);p.elements.get('image-zoom').value='200';await p.elements.get('image-zoom').fire('change');assert.equal(p.elements.get('reader-content').children[0].style.width,'200%');await p.close();
  mime='text/html';await p.open();assert.equal(p.elements.get('reader-content').children.length,0);assert.equal(p.elements.get('image-zoom').value,'fit');assert.equal(p.elements.get('image-zoom-label').hidden,true);assert.match(p.elements.get('reader-status').textContent,/formato/);await p.close();
});
test('leaving the page closes the reader and releases its document',async()=>{
  const p=page();await p.ready();await p.open();p.windowEvents.pagehide();assert.equal(p.elements.get('exam-reader').open,false);assert.equal(p.elements.get('reader-content').children.length,0);assert.equal(p.revoked.length,1);
});
test('fullscreen uses the document root and closing the reader leaves fullscreen',async()=>{
  const p=page();await p.ready();await p.open();await p.elements.get('reader-fullscreen').fire('click');assert.equal(p.document.fullscreenElement,p.document.documentElement);assert.equal(p.elements.get('reader-fullscreen').textContent,'Salir de pantalla completa');await p.close();assert.equal(p.document.fullscreenElement,null);
});
test('the deployed API fields supply titles and evaluation filters without repeating course names',async()=>{
  const p=page(undefined,[{id:1,titulo:'Fisiología',course:'Fisiología',tipo:'Parcial',anio:2026,facultad:'Medicina'}]);await p.ready();const card=p.elements.get('exam-list').children[0];assert.equal(card.children[1].children[0].textContent,'Fisiología');assert.equal(card.children[1].children[1].hidden,true);assert.match(card.children[1].children[2].textContent,/Parcial/);p.elements.get('type').value='Final';await p.elements.get('type').fire('input');assert.equal(p.elements.get('exam-list').children.length,0);
});
test('when browser fullscreen is unavailable the reader expands within the page and restores cleanly',async()=>{
  const p=page();await p.ready();await p.open();p.document.documentElement.requestFullscreen=async()=>{throw Error('Fullscreen unavailable')};await p.elements.get('reader-fullscreen').fire('click');assert.equal(p.elements.get('exam-reader').classList.contains('expanded'),true);assert.equal(p.elements.get('reader-fullscreen').textContent,'Restaurar tamaño');await p.elements.get('reader-fullscreen').fire('click');assert.equal(p.elements.get('exam-reader').classList.contains('expanded'),false);await p.close();
});
