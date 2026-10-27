(()=>{
"use strict";
const db=window.FIJAS_ECOS_DATA, $=id=>document.getElementById(id);
if(!db||!Array.isArray(db.cases)||!Array.isArray(db.fields)||!Array.isArray(db.stages)){$("ecos-station").textContent="No se pudieron cargar los casos.";return}
const cases=db.cases, fields=db.fields, stages=db.stages, byId=Object.fromEntries(fields.map(f=>[f.id,f]));
const KEY="bb_fijas_ecos_v2_20261026", OLD_KEY="bb_fijas_ecos_v1_20261026";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const nl=s=>esc(s).replace(/\n/g,"<br>");
let state={answers:{},unlocked:{},views:{},done:{}},current=0,storageOK=true;
try{
 let data=JSON.parse(localStorage.getItem(KEY)||"null");
 if(!data){const old=JSON.parse(localStorage.getItem(OLD_KEY)||"null");if(old?.answers&&typeof old.answers==="object")data={answers:old.answers,unlocked:{},views:{},done:{}}}
 if(data&&data.answers&&typeof data.answers==="object")state={answers:data.answers,unlocked:data.unlocked||{},views:data.views||{},done:data.done||{}};
}catch(e){storageOK=false}
function store(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){storageOK=false;$("ecos-saved-label").textContent="El navegador no permite guardar; mantén abierta la página"}}
function answer(cid,fid){return String(state.answers[cid]?.[fid]??"")}
function stageDone(cid,i){return stages[i].fields.every(fid=>answer(cid,fid).trim().length>0)}
function filled(cid){return fields.filter(f=>answer(cid,f.id).trim().length>0).length}
function allFinished(){return cases.filter(c=>state.done[c.id]).length}
const total=fields.length*cases.length;
function renderNav(){
 $("ecos-case-nav").innerHTML=cases.map((c,i)=>{
  const finished=!!state.done[c.id],n=filled(c.id);
  return '<button type="button" data-nav="'+i+'" class="'+(finished?"complete":"")+'" aria-current="'+(current===i?"true":"false")+'"><span>Estación '+String(i+1).padStart(2,"0")+'</span><span class="ecos-status">'+(finished?"✓ corregido":n+"/"+fields.length)+'</span></button>';
 }).join("");
}
function counters(){
 const n=cases.reduce((sum,c)=>sum+filled(c.id),0);
 $("ecos-case-count").textContent=cases.length+" casos disponibles";
 $("ecos-completed-count").textContent=allFinished()+" de "+cases.length+" casos corregidos";
 $("ecos-progress-text").textContent=allFinished()+" / "+cases.length+" corregidos";
 $("ecos-progress-fill").style.width=(100*allFinished()/cases.length)+"%";
 renderNav();
}
function scrollCase(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){$("ecos-station").scrollIntoView({block:"start"})}else{$("ecos-station").scrollIntoView({behavior:"smooth",block:"start"})}}
function stageTabs(cid){
 const unlocked=Math.min(3,Number(state.unlocked[cid]||0));
 return '<div class="ecos-stage-tabs" aria-label="Etapas del caso">'+stages.map((s,i)=>
  '<button type="button" data-stage="'+i+'" '+(i>unlocked?'disabled':'')+' '+(Number(state.views[cid]||0)===i?'aria-current="step"':'')+'>'+esc(s.title)+'</button>'
 ).join("")+'</div>';
}
function fieldsHTML(cid,ids){
 return ids.map(fid=>{
  const f=byId[fid];
  return '<div class="ecos-field"><label for="ecos-'+fid+'">'+esc(f.label)+'</label><small>'+esc(f.hint||"")+'</small><textarea id="ecos-'+fid+'" data-field="'+esc(fid)+'" rows="4" placeholder="Escribe tu respuesta. Si aún no sabes, escribe «No sé»...">'+esc(answer(cid,fid))+'</textarea></div>';
 }).join("");
}
function resultButton(){return '<button type="button" class="ecos-btn primary" id="ecos-finish-case">Terminar este caso y ver su corrección completa</button>'}
function renderStation(){
 const c=cases[current], cid=c.id;
 if(state.done[cid]){renderResult();return}
 const stage=Math.min(Number(state.views[cid]||0),Number(state.unlocked[cid]||0),3),info=stages[stage];
 const results=stage>=2?'<section class="ecos-revealed-studies"><h3>Resultados del estudio clínico</h3><p class="ecos-small">Estos datos estaban ocultos hasta que completaras la selección y justificación de tus exámenes.</p><div class="ecos-stem">'+nl(c.extra||"No se aportaron resultados de pruebas en este caso; no debes inventarlos.")+'</div></section>':"";
 $("ecos-station").innerHTML='<div class="ecos-station-card"><span class="ecos-station-kicker">ESTACIÓN '+String(current+1).padStart(2,"0")+' DE '+cases.length+' · CASO PARA INFERIR</span><h2>'+esc(c.title)+'</h2><div class="ecos-stem">'+nl(c.stem)+'</div>'+stageTabs(cid)+'<div class="ecos-stage-head"><h3>'+esc(info.title)+'</h3><p>'+esc(info.description)+'</p></div>'+results+fieldsHTML(cid,info.fields)+'<div class="ecos-stage-actions">'+(stage>0?'<button type="button" class="ecos-btn secondary" data-back-stage>← Etapa anterior</button>':'')+(stage<3?'<button type="button" class="ecos-btn primary" id="ecos-stage-continue" '+(!stageDone(cid,stage)?'disabled':'')+'>'+(stage===0?'Continuar a exámenes →':stage===1?'Ver resultados e interpretar →':'Continuar a manejo y tratamiento →')+'</button>':resultButton())+'</div><p class="ecos-small">Las respuestas se guardan automáticamente. La corrección completa aparece solo cuando termines este caso.</p></div>';
 $("ecos-prev").disabled=current===0;
 $("ecos-next").disabled=current===cases.length-1;
 updateAction();
 counters();
}
function updateAction(){
 const c=cases[current],s=Number(state.views[c.id]||0);
 const b=$("ecos-stage-continue")||$("ecos-finish-case");
 if(!b)return;
 b.disabled=!stageDone(c.id,s);
 b.title=b.disabled?"Completa los apartados de esta etapa para avanzar (puedes escribir «No sé»).":"";
}
function finishStage(){
 const cid=cases[current].id,st=Number(state.views[cid]||0);
 if(!stageDone(cid,st)){alert("Completa los apartados de esta etapa; si no conoces una respuesta, escribe «No sé».");return}
 if(st>=3){state.done[cid]=true;store();renderResult();scrollCase();return}
 state.unlocked[cid]=Math.max(Number(state.unlocked[cid]||0),st+1);
 state.views[cid]=st+1;store();renderStation();scrollCase();
}
function loadSolutions(){
 if(window.FIJAS_ECOS_SOLUCIONES)return Promise.resolve();
 return new Promise((resolve,reject)=>{const s=document.createElement("script");s.src="fijas-para-ecos-soluciones.js?v=20261026-2";s.onload=resolve;s.onerror=reject;document.body.appendChild(s)})
}
async function renderResult(){
 const c=cases[current],cid=c.id;
 $("ecos-station").innerHTML='<div class="ecos-station-card"><h2>Corrección del caso '+(current+1)+'</h2><p>Cargando el solucionario individual…</p></div>';
 $("ecos-prev").disabled=current===0;
 $("ecos-next").disabled=current===cases.length-1;
 try{await loadSolutions()}catch(e){
  $("ecos-station").innerHTML='<div class="ecos-station-card"><h2>El caso se ha guardado</h2><p>No se pudo cargar el solucionario. Comprueba tu conexión.</p><button type="button" class="ecos-btn primary" id="ecos-retry-load">Reintentar carga de respuestas</button></div>';
  $("ecos-retry-load").addEventListener("click",renderResult);counters();return;
 }
 if(!state.done[cid]||cases[current]?.id!==cid)return;
 const key=window.FIJAS_ECOS_SOLUCIONES?.[cid]||{};
 $("ecos-station").innerHTML='<div class="ecos-station-card ecos-case-result"><span class="ecos-station-kicker">ESTACIÓN '+String(current+1).padStart(2,"0")+' · CASO FINALIZADO</span><h2>'+esc(c.title)+'</h2><p class="ecos-result-intro"><strong>Ya puedes revisar este caso.</strong> Compara lo que escribiste en cada etapa con la respuesta razonada. Los demás casos mantienen ocultas sus soluciones hasta que los completes.</p><div class="ecos-btn-row"><button type="button" class="ecos-btn secondary" id="ecos-print-case">Imprimir la corrección</button><button type="button" class="ecos-btn danger" id="ecos-retry-case">Volver a resolver este caso</button>'+(current+1<cases.length?'<button type="button" class="ecos-btn primary" id="ecos-go-next">Siguiente caso →</button>':'')+'</div>'+stages.map((s)=>{
  return '<section class="ecos-result-section"><h3>'+esc(s.title)+'</h3>'+(s.id==="interpretar"?'<div class="ecos-stem"><strong>Resultados del caso:</strong><br>'+nl(c.extra||"No se proporcionaron estudios.")+'</div>':"")+s.fields.map(fid=>{
   const f=byId[fid];
   return '<div class="ecos-result-field"><h4>'+esc(f.label)+'</h4><div class="ecos-compare"><div class="self"><h4>Tu respuesta</h4><p>'+nl(answer(cid,fid))+'</p></div><div class="model"><h4>Respuesta modelo y razonamiento</h4><p>'+nl(key[fid]||"Pendiente de validación editorial.")+'</p></div></div></div>';
  }).join("")+'</section>';
 }).join("")+'</div>';
 $("ecos-print-case")?.addEventListener("click",()=>window.print());
 $("ecos-retry-case")?.addEventListener("click",()=>resetCase(cid));
 $("ecos-go-next")?.addEventListener("click",()=>{current++;renderStation();scrollCase()});
 counters();
}
function resetCase(cid){
 if(!window.confirm("¿Volver a resolver esta estación? Se perderán únicamente las respuestas de este caso."))return;
 delete state.answers[cid];delete state.unlocked[cid];delete state.views[cid];delete state.done[cid];
 store();renderStation();scrollCase();
}
$("ecos-case-nav").addEventListener("click",e=>{
 const b=e.target.closest("button[data-nav]");if(!b)return;
 current=Number(b.dataset.nav);renderStation();scrollCase();
});
$("ecos-station").addEventListener("input",e=>{
 const t=e.target.closest("textarea[data-field]");if(!t)return;
 const cid=cases[current].id;
 if(state.done[cid])return;
 state.answers[cid] ||= {};
 state.answers[cid][t.dataset.field]=t.value;store();updateAction();counters();
});
$("ecos-station").addEventListener("click",e=>{
 const b=e.target.closest("button");if(!b)return;
 const cid=cases[current].id;
 if(b.hasAttribute("data-stage")){const s=Number(b.dataset.stage);if(s<=Number(state.unlocked[cid]||0)){state.views[cid]=s;store();renderStation()}return}
 if(b.hasAttribute("data-back-stage")){state.views[cid]=Math.max(0,Number(state.views[cid]||0)-1);store();renderStation();return}
 if(b.id==="ecos-stage-continue"||b.id==="ecos-finish-case")finishStage();
});
$("ecos-prev").addEventListener("click",()=>{if(current>0){current--;renderStation();scrollCase()}});
$("ecos-next").addEventListener("click",()=>{if(current<cases.length-1){current++;renderStation();scrollCase()}});
if(!storageOK)$("ecos-saved-label").textContent="Guardado local deshabilitado";
renderStation();
})();