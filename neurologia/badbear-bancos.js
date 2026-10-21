(()=>{
"use strict";
const qs=window.BADBEAR_BANCOS_ORIGINALES?.questions||[];
const $=id=>document.getElementById(id);
const src=$("bb-source"),typ=$("bb-type"),status=$("bb-status"),list=$("bb-list"),pages=$("bb-pages");
const KEY="badbear_bancos_originales_v1";
let answers={};try{answers=JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch(e){answers={}}
let page=0;const per=8;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm=s=>String(s??"").trim().replace(/\s+/g," ").toLocaleLowerCase("es");
const answerIndex=q=>q.clave==null?-1:q.alternativas.findIndex(x=>norm(x)===norm(q.clave));
const sourceNames=[...new Set(qs.map(q=>q.fuente))];
for(const name of sourceNames){const o=document.createElement("option");o.value=name;o.textContent=name;src.append(o)}
function filtered(){return qs.filter(q=>(src.value==="all"||q.fuente===src.value)&&(typ.value==="all"||(typ.value==="choice"?(q.tipo==="choice"&&q.alternativas.length>1):!(q.tipo==="choice"&&q.alternativas.length>1)))&&(status.value==="all"||(status.value==="done"?answers[q.id]!==undefined:answers[q.id]===undefined)))}
function counts(){const answered=qs.filter(q=>answers[q.id]!==undefined),grad=answered.filter(q=>q.tipo==="choice"&&q.alternativas.length>1&&answerIndex(q)>=0),correct=grad.filter(q=>Number(answers[q.id])===answerIndex(q)).length;$("bb-total").textContent=qs.length+" preguntas";$("bb-progress").textContent=answered.length+" respondidas";$("bb-score").textContent=correct+" / "+grad.length+" aciertos calificables"}
function explain(q){let lines=String(q.explicacion||"La fuente no incluye explicación clínica desarrollada.");let ci=answerIndex(q);
if(q.tipo==="choice"&&q.alternativas.length>1&&ci>=0){
lines+="\n\nANÁLISIS DE LAS ALTERNATIVAS:\n";
q.alternativas.forEach((opt,i)=>{const why=q.razonesAlternativas?.[i];lines+=String.fromCharCode(65+i)+". "+(why||((i===ci?"CORRECTA según la clave histórica: ":"No es la respuesta indicada por la clave histórica: ")+opt+". La justificación médica específica de esta opción está pendiente de revisión editorial."))+"\n"});
}else if(q.tipo==="choice"&&ci<0){lines+="\n\nEsta pregunta no tiene una clave única comprobada; no se penaliza la respuesta. Para decidir se requieren datos adicionales o validar el examen original."}
else{lines+="\n\nEn respuesta libre, compara los elementos esenciales de tu contestación con la clave mostrada. La plataforma no califica automáticamente respuestas escritas por coincidencia de palabras."}
return lines}
function render(){const all=filtered(),slice=all.slice(page*per,(page+1)*per);
list.innerHTML=slice.map((q,i)=>{const v=answers[q.id],done=v!==undefined,isChoice=q.tipo==="choice"&&q.alternativas.length>1,ci=answerIndex(q),valid=isChoice&&ci>=0,selected=isChoice?Number(v):-1,good=valid&&selected===ci;
const opts=isChoice?q.alternativas.map((o,j)=>'<button class="bb-option'+(done?(valid&&j===ci?' correct':valid&&j===selected&&selected!==ci?' wrong':''):'')+'" type="button" data-choose="'+j+'"'+(done?' disabled':'')+'><b>'+String.fromCharCode(65+j)+'.</b> '+esc(o)+(done&&valid&&j===ci?' <strong>✓ CORRECTA</strong>':done&&valid&&j===selected&&j!==ci?' <strong>✗ TU RESPUESTA</strong>':'')+'</button>').join(""):'<textarea class="bb-response" placeholder="Escribe aquí tu respuesta antes de corregir..."'+(done?' disabled':'')+'>'+esc(done?v:"")+'</textarea>';
const result=isChoice?(valid?(good?'✓ RESPUESTA CORRECTA':'✗ RESPUESTA INCORRECTA'):'CLAVE NO CONFIRMADA · SIN CALIFICACIÓN'):'RESPUESTA ABIERTA · COMPARACIÓN GUIADA';
return '<article class="bb-card'+(done?' done':'')+(done&&valid?(good?' is-correct':' is-wrong'):'')+'" data-id="'+esc(q.id)+'"><span class="bb-meta">'+esc(q.fuente)+' · PREGUNTA '+(qs.indexOf(q)+1)+'</span><h2>'+esc(q.enunciado)+'</h2>'+opts+(q.tipo==="open-image"?'<p class="bb-note">Esta pregunta requiere una imagen que aún no está vinculada; la corrección debe verificarse contra el original.</p>':'')+'<div class="bb-actions">'+(!done?'<button class="bb-submit" type="button" data-submit>Corregir mi respuesta</button>':'<button class="bb-submit" type="button" data-edit>Volver a intentar</button>')+'</div><div class="bb-result"><div class="bb-result-status'+(valid?(good?' result-green':' result-red'):' result-neutral')+'">'+esc(result)+'</div><p><strong>Clave del examen:</strong> '+esc(q.clave??"No confirmada en el documento")+'</p><h3>Explicación y razonamiento clínico</h3><div class="bb-reasoning">'+esc(explain(q))+'</div></div></article>'}).join("")||'<p class="bb-note">No hay preguntas para este filtro.</p>';
const pagesN=Math.ceil(all.length/per);pages.innerHTML=pagesN>1?'<button id="bb-prev"'+(page===0?' disabled':'')+'>← Anterior</button><span>Página '+(page+1)+' de '+pagesN+'</span><button id="bb-next"'+(page>=pagesN-1?' disabled':'')+'>Siguiente →</button>':'';
$("bb-prev")?.addEventListener("click",()=>{page--;render()});$("bb-next")?.addEventListener("click",()=>{page++;render()});counts()}
list.addEventListener("click",ev=>{const button=ev.target.closest("button");if(!button)return;const card=button.closest(".bb-card");if(!card)return;const q=qs.find(x=>x.id===card.dataset.id);if(!q)return;
if(button.hasAttribute("data-choose")){card.querySelectorAll(".bb-option").forEach(el=>el.classList.remove("selected"));button.classList.add("selected");return}
if(button.hasAttribute("data-edit")){delete answers[q.id];localStorage.setItem(KEY,JSON.stringify(answers));render();return}
if(!button.hasAttribute("data-submit"))return;
const isChoice=q.tipo==="choice"&&q.alternativas.length>1;const val=isChoice?card.querySelector(".bb-option.selected")?.dataset.choose:card.querySelector("textarea")?.value;
if(val===undefined||val===null||!String(val).trim()){alert("Primero selecciona una alternativa o escribe una respuesta.");return}
answers[q.id]=val;localStorage.setItem(KEY,JSON.stringify(answers));render();
});
for(const el of [src,typ,status])el.addEventListener("change",()=>{page=0;render()});render();
})();