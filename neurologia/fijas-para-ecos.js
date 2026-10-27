(()=>{
"use strict";
const db=window.FIJAS_ECOS_DATA;
const $=id=>document.getElementById(id);
if(!db||!Array.isArray(db.cases)||!Array.isArray(db.fields)){$("ecos-station").textContent="No se pudieron cargar los casos.";return}
const cases=db.cases,fields=db.fields,KEY="bb_fijas_ecos_v1_20261026";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let state={answers:{},finished:false};let current=0;let canStore=true;
try{const saved=JSON.parse(localStorage.getItem(KEY)||"null");if(saved&&saved.answers&&typeof saved.answers==="object"){state={answers:saved.answers,finished:!!saved.finished}}}catch(e){canStore=false}
const answer=(caseId,fieldId)=>String(state.answers[caseId]?.[fieldId]??"");
const completedCount=caseId=>fields.filter(f=>answer(caseId,f.id).trim().length>0).length;
const completeCases=()=>cases.filter(c=>completedCount(c.id)===fields.length).length;
const filledTotal=()=>cases.reduce((n,c)=>n+completedCount(c.id),0);
const total=cases.length*fields.length;
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){canStore=false;$("ecos-saved-label").textContent="Guardado local no disponible; no cierres esta pestaña"}}
function navRender(){
 const container=$("ecos-case-nav");
 container.innerHTML=cases.map((c,i)=>{const done=completedCount(c.id)===fields.length;return '<button type="button" data-nav="'+i+'" class="'+(done?"complete":"")+'" aria-current="'+(i===current?"true":"false")+'"><span>Estación '+String(i+1).padStart(2,"0")+'</span><span class="ecos-status">'+(done?"✓ completa":completedCount(c.id)+"/"+fields.length)+"</span></button>"}).join("");
}
function updateCounters(){
 const n=filledTotal(),pct=Math.round(100*n/total);
 $("ecos-case-count").textContent=cases.length+" casos clínicos";
 $("ecos-completed-count").textContent=completeCases()+" de "+cases.length+" estaciones completas";
 $("ecos-progress-text").textContent=pct+" %";
 $("ecos-progress-fill").style.width=pct+"%";
 $("ecos-finish-count").textContent=n+" / "+total+" apartados respondidos";
 $("ecos-finish-button").disabled=n!==total || state.finished;
 navRender();
}
function renderStation(){
 const c=cases[current];
 $("ecos-station").innerHTML='<div class="ecos-station-card"><span class="ecos-station-kicker">ESTACIÓN '+String(current+1).padStart(2,"0")+' DE '+cases.length+' · CASO CLÍNICO SIN DIAGNÓSTICO ANUNCIADO</span><h2>'+esc(c.title)+'</h2><div class="ecos-stem">'+esc(c.stem)+'</div>'+(c.extra?'<details class="ecos-extra"><summary>Ver resultados de estudios para interpretar (no son respuestas)</summary><p>'+esc(c.extra)+'</p></details>':"")+'<p class="ecos-instructions">Responde con tus palabras. No se mostrarán claves de ningún caso hasta entregar TODO el simulacro.</p><div class="ecos-fields">'+fields.map(f=>'<div class="ecos-field"><label for="field-'+esc(f.id)+'">'+esc(f.label)+'</label><small>'+esc(f.hint)+'</small><textarea id="field-'+esc(f.id)+'" data-field="'+esc(f.id)+'" rows="4" placeholder="Escribe aquí tu razonamiento clínico…">'+esc(answer(c.id,f.id))+'</textarea></div>').join("")+'</div><p class="ecos-small">Guardado automático por dispositivo. Puedes cambiar de estación sin perder lo escrito.</p></div>';
 $("ecos-prev").disabled=current===0;
 $("ecos-next").disabled=current===cases.length-1;
 updateCounters();
}
function showWorkspace(){
 $("ecos-workspace").hidden=false;
 $("ecos-finish-section").hidden=false;
 $("ecos-results").hidden=true;
 renderStation();
}
async function showResults(){
 $("ecos-workspace").hidden=true;
 $("ecos-finish-section").hidden=true;
 const out=$("ecos-results");out.hidden=false;
 out.innerHTML='<h2>Preparando el solucionario completo…</h2>';
 if(!window.FIJAS_ECOS_SOLUCIONES){
   try{await new Promise((resolve,reject)=>{const s=document.createElement("script");s.src="fijas-para-ecos-soluciones.js?v=20261026-1";s.onload=resolve;s.onerror=reject;document.body.appendChild(s)})}
   catch(e){out.innerHTML='<h2>No se pudo cargar el solucionario.</h2><p>Revisa la conexión y vuelve a cargar la página. Tu entrega está guardada.</p>';return}
 }
 const sols=window.FIJAS_ECOS_SOLUCIONES||{};
 out.innerHTML='<div class="ecos-results-head"><h2>Simulacro finalizado — Solucionario y comparación</h2><p>Ya completaste las '+cases.length+' estaciones. A continuación se muestra lo que escribiste frente a la respuesta modelo de cada apartado. <strong>No hay nota automática:</strong> la redacción clínica se valora por razonamiento, no por coincidencia literal.</p><div class="ecos-btn-row"><button type="button" class="ecos-btn secondary" id="ecos-print">Imprimir / guardar comparación</button><button type="button" class="ecos-btn danger" id="ecos-reset">Reiniciar simulacro completo</button></div></div>'+cases.map((c,i)=>'<article class="ecos-result-card"><span class="ecos-station-kicker">ESTACIÓN '+String(i+1).padStart(2,"0")+'</span><h3>'+esc(c.title)+'</h3>'+fields.map(f=>'<section class="ecos-result-field"><h4>'+esc(f.label)+'</h4><div class="ecos-compare"><div class="self"><h4>Tu respuesta</h4><p>'+esc(answer(c.id,f.id))+'</p></div><div class="model"><h4>Respuesta modelo y razonamiento</h4><p>'+esc(sols[c.id]?.[f.id]||"Apartado pendiente de revisión editorial.")+'</p></div></div></section>').join("")+'</article>').join("");
 $("ecos-print")?.addEventListener("click",()=>window.print());
 $("ecos-reset")?.addEventListener("click",resetAll);
 window.scrollTo({top:0,behavior:"smooth"});
}
function resetAll(){if(!window.confirm("¿Reiniciar TODO el simulacro? Se eliminarán las respuestas guardadas de estas estaciones."))return;state={answers:{},finished:false};current=0;save();showWorkspace();window.scrollTo({top:0,behavior:"smooth"})}
$("ecos-case-nav").addEventListener("click",e=>{const b=e.target.closest("button[data-nav]");if(!b||state.finished)return;current=Number(b.dataset.nav);renderStation();$("ecos-station").scrollIntoView({behavior:"smooth",block:"start"})});
$("ecos-station").addEventListener("input",e=>{const t=e.target.closest("textarea[data-field]");if(!t||state.finished)return;const c=cases[current];if(!state.answers[c.id])state.answers[c.id]={};state.answers[c.id][t.dataset.field]=t.value;save();updateCounters()});
$("ecos-prev").addEventListener("click",()=>{if(current>0){current--;renderStation();$("ecos-station").scrollIntoView({behavior:"smooth",block:"start"})}});
$("ecos-next").addEventListener("click",()=>{if(current<cases.length-1){current++;renderStation();$("ecos-station").scrollIntoView({behavior:"smooth",block:"start"})}});
$("ecos-finish-button").addEventListener("click",()=>{if(filledTotal()!==total){alert("Debes completar todos los apartados antes de finalizar. Puedes escribir «No sé» donde necesites.");return}if(!window.confirm("¿Entregar las "+cases.length+" estaciones y mostrar el solucionario completo?"))return;state.finished=true;save();showResults()});
if(!canStore)$("ecos-saved-label").textContent="Tu navegador impide guardar respuestas localmente";
if(state.finished)showResults();else showWorkspace();
})();