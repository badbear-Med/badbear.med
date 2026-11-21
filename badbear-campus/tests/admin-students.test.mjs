import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {setupStudents} from '../admin-students.js';
import {table} from '../core.js';

// Small DOM adapter: exercises the real table renderer and event handlers without browser packages.
class Element {
  constructor(tag='div'){this.tagName=tag;this.children=[];this.value='';this.checked=false;this.hidden=false;this.listeners={};this.classList={add(){}};}
  append(...children){this.children.push(...children);}
  replaceChildren(...children){this.children=[...children];}
  setAttribute(key,value){this[key]=value;}
  addEventListener(event,fn){this.listeners[event]=fn;}
  reset(){}
  scrollIntoView(){}
  focus(){this.focused=true;}
  querySelectorAll(selector){const parts=selector.split(' ');let nodes=[this];for(const part of parts){nodes=nodes.flatMap(node=>{const result=[];function visit(n){for(const child of n.children){if(child.tagName===part)result.push(child);visit(child)}}visit(node);return result})}return nodes;}
  querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
}
function fixture(t,{grades=async()=>({items:[]})}={}) {
  const html=readFileSync(new URL('../admin.html',import.meta.url),'utf8');
  const elements=new Map([...html.matchAll(/id="(manage-[^"]+)"/g)].map(match=>[match[1],new Element()]));
  const $=id=>{assert.ok(elements.has(id),'HTML control exists: '+id);return elements.get(id)};
  const oldConfirm=globalThis.confirm;globalThis.confirm=()=>true;
  t.after(()=>{globalThis.confirm=oldConfirm});
  const oldDocument=globalThis.document,oldOption=globalThis.Option;
  globalThis.document={createElement:tag=>new Element(tag)};
  globalThis.Option=class extends Element{constructor(text,value){super('option');this.textContent=text;this.value=value}};
  t.after(()=>{globalThis.document=oldDocument;globalThis.Option=oldOption});
  let students=[{codigo:'001',nombre:'García de la Cruz, María',correo:'maria@example.invalid',activo:1},{codigo:'002',nombre:'Alumno retirado',activo:0,retirado_en:'2026-11-21'}];
  const posts=[],messages=[],pending=[];
  const manager=setupStudents({$,table,call:grades,getToken:()=> 'admin-session',getStudents:()=>students,
    action:fn=>{const promise=Promise.resolve().then(fn);pending.push(promise);return promise},
    post:async(path,token,body)=>{posts.push({path,token,body});if(path.endsWith('/crear'))students.push({...body,activo:body.activo?1:0});else if(path.endsWith('/acceso'))students[0].activo=body.activo?1:0;return {ok:true}},
    reload:async()=>manager.render(),message:(...args)=>messages.push(args)});
  const fire=async(id,event='click')=>{$(id).listeners[event]({preventDefault(){}});await Promise.all(pending.splice(0))};
  return {$,manager,posts,messages,fire};
}

test('a failed grade request cannot prevent editing a student profile',async t=>{
  const f=fixture(t,{grades:async()=>{throw Object.assign(Error('Servicio de notas no disponible'),{status:503})}});
  f.manager.render();f.$('manage-student').value='001';await f.fire('manage-student','change');
  assert.equal(f.$('manage-form').hidden,false);
  assert.equal(f.$('manage-name').value,'García de la Cruz, María');
  assert.equal(f.$('manage-code').readOnly,true);
  assert.match(f.$('manage-grade-list').textContent,/continuar editando/);
  f.$('manage-name').value='García de la Cruz, María del Carmen';await f.fire('manage-form','submit');
  assert.equal(f.posts[0].path,'/api/admin/alumnos/ficha');
  assert.equal(f.posts[0].body.nombre,'García de la Cruz, María del Carmen');
  assert.equal(f.posts[0].token,'admin-session');
});

test('individual creation and access changes submit the selected profile with explicit access state',async t=>{
  const f=fixture(t);f.manager.render();await f.fire('manage-add');
  assert.equal(f.$('manage-code').readOnly,false);
  f.$('manage-code').value='003';f.$('manage-name').value='Nuevo, Alumno';f.$('manage-new-access').checked=false;
  await f.fire('manage-form','submit');
  assert.equal(f.posts[0].path,'/api/admin/alumnos/crear');assert.equal(f.posts[0].body.activo,false);
  f.$('manage-student').value='001';await f.fire('manage-student','change');await f.fire('manage-access');
  assert.deepEqual(f.posts[1].body,{codigo:'001',activo:false});
  assert.equal(f.posts[1].path,'/api/admin/alumnos/acceso');
});

test('search and retired filter operate on the correct rows and preserve edit actions',async t=>{
  const f=fixture(t);f.manager.render();
  assert.match(f.$('manage-total').textContent,/1 alumnos/);
  f.$('manage-search').value='maria@example.invalid';await f.fire('manage-search','input');
  const button=f.$('manage-list').querySelector('tbody button');assert.equal(button['aria-label'],'Modificar datos de García de la Cruz, María');
  button.listeners.click();await new Promise(resolve=>setImmediate(resolve));
  assert.equal(f.$('manage-student').value,'001');
  f.$('manage-search').value='';f.$('manage-show-retired').checked=true;await f.fire('manage-show-retired','change');
  assert.match(f.$('manage-total').textContent,/2 alumnos/);
  f.$('manage-student').value='002';await f.fire('manage-student','change');
  assert.equal(f.$('manage-restore').hidden,false);assert.equal(f.$('manage-access').hidden,true);
  await f.fire('manage-restore');assert.equal(f.posts.at(-1).path,'/api/admin/alumnos/restaurar');
});

test('old backend explains the update requirement for unsupported access controls',async t=>{
  const f=fixture(t);f.manager.render(false);assert.equal(f.$('manage-service-status').hidden,false);
  await f.fire('manage-add');f.$('manage-code').value='003';f.$('manage-name').value='Nuevo, Alumno';f.$('manage-new-access').checked=false;
  await assert.rejects(f.fire('manage-form','submit'),/Actualizar-Campus/);
  assert.equal(f.posts.length,0);
  f.manager.clear();assert.equal(f.$('manage-form').hidden,true);assert.equal(f.$('manage-list').children.length,0);
});


test('clearing fields and replacing the full name saves through the deployed legacy roster endpoint',async t=>{
  const f=fixture(t);f.manager.render(false);f.$('manage-student').value='001';await f.fire('manage-student','change');
  for(const [button,field] of [['manage-clear-name','manage-name'],['manage-clear-email','manage-email'],['manage-clear-dni','manage-dni'],['manage-clear-phone','manage-phone']]) {
    assert.equal(f.$(field).readOnly,false);assert.equal(f.$(field).disabled,false);
    await f.fire(button);assert.equal(f.$(field).value,'');assert.equal(f.$(field).focused,true);
  }
  f.$('manage-name').value='García de la Cruz, María del Carmen';
  await f.fire('manage-form','submit');
  assert.deepEqual(f.posts[0],{path:'/api/admin/alumnos/importar',token:'admin-session',body:{items:[{codigo:'001',nombre:'García de la Cruz, María del Carmen',correo:'',dni:'',telefono:''}]}});
  assert.equal(f.messages.at(-1)[0],'Ficha actualizada.');
});
