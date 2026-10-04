(() => {
"use strict";
const all=Array.isArray(window.BADBEAR_NEURO_BANCO)?window.BADBEAR_NEURO_BANCO:[];
const temas=Array.isArray(window.BADBEAR_NEURO_TEMAS)?window.BADBEAR_NEURO_TEMAS:[];
const list=document.getElementById("bank-list"), unit=document.getElementById("unit-filter"), diff=document.getElementById("difficulty-filter");
let answers=JSON.parse(localStorage.getItem("bb_neuro_bank_answers")||"{}");
let errors=new Set(JSON.parse(localStorage.getItem("bb_neuro_bank_errors")||"[]"));
let subset=null, errorMode=false;
const map=Object.fromEntries(temas.map(t=>[t.id,t]));
temas.forEach(t=>{const o=document.createElement("option");o.value=t.id;o.textContent=`Unidad ${t.numero} · ${t.titulo}`;unit.appendChild(o);});
function save(){localStorage.setItem("bb_neuro_bank_answers",JSON.stringify(answers));localStorage.setItem("bb_neuro_bank_errors",JSON.stringify([...errors]));}
function stats(){const ids=Object.keys(answers);const ok=ids.filter(id=>answers[id]===true).length;document.getElementById("stat-total").textContent=all.length;document.getElementById("stat-score").textContent=ids.length?Math.round(ok/ids.length*100)+"%":"0%";document.getElementById("stat-errors").textContent=errors.size;}
function visible(){let arr=subset||all;if(errorMode)arr=arr.filter(x=>errors.has(x.id));if(unit.value!=="all")arr=arr.filter(x=>x.u===unit.value);if(diff.value!=="all")arr=arr.filter(x=>x.d===diff.value);return arr;}
function render(){
 const arr=visible(); list.innerHTML="";
 if(!arr.length){list.innerHTML='<div class="empty-bank">No hay preguntas para este filtro.</div>';stats();return;}
 arr.forEach((q,i)=>{
  const card=document.createElement("article");card.className="q-card"+(answers[q.id]!==undefined?" answered":"");card.dataset.id=q.id;
  const tema=map[q.u]||{numero:"?",titulo:q.u};
  card.innerHTML=`<div class="q-head"><div class="q-tags"><span class="q-tag">Unidad ${tema.numero} · ${tema.titulo}</span><span class="q-tag level">${q.d}</span></div><span class="q-tag">PREGUNTA BADBEAR.MED</span></div>
  <h2>${i+1}. ${q.s}</h2><div class="q-options">${q.o.map((x,j)=>`<button class="q-option" data-i="${j}"><span class="q-letter">${String.fromCharCode(65+j)}.</span><span>${x}</span></button>`).join("")}</div>
  <div class="q-explanation"><div class="q-result"></div><div class="q-summary"><b>Explicación:</b> ${q.e}</div><div class="q-enam"><b>Punto tipo ENAM:</b> ${q.p.replace(/^Punto tipo ENAM:\s*/,"")}</div><div class="q-reasons">${q.r.map((x,j)=>`<div class="q-reason"><b>${String.fromCharCode(65+j)}.</b> ${x}</div>`).join("")}</div><div class="q-source">Pregunta creada por BADBEAR.MED para entrenamiento clínico. No corresponde a un ENAM oficial salvo que se indique explícitamente.</div></div>`;
  list.appendChild(card);
  if(answers[q.id]!==undefined)paint(card,q,answers[q.id+"_choice"]);
 });
 stats();
}
function paint(card,q,choice){card.classList.add("answered");const btns=[...card.querySelectorAll(".q-option")];btns.forEach((b,j)=>{b.disabled=true;b.classList.toggle("correct",j===q.a);b.classList.toggle("wrong",j===choice&&choice!==q.a);b.classList.toggle("dim",j!==q.a&&j!==choice);});const ok=choice===q.a;card.querySelector(".q-result").textContent=ok?"✓ Correcto":"✗ Incorrecto · respuesta: "+String.fromCharCode(65+q.a); }
list.addEventListener("click",e=>{const b=e.target.closest(".q-option");if(!b||b.disabled)return;const card=b.closest(".q-card"),id=Number(card.dataset.id),q=all.find(x=>x.id===id),choice=Number(b.dataset.i),ok=choice===q.a;answers[id]=ok;answers[id+"_choice"]=choice;if(ok)errors.delete(id);else errors.add(id);save();paint(card,q,choice);stats();});
unit.addEventListener("change",()=>{subset=null;render();});diff.addEventListener("change",()=>{subset=null;render();});
document.getElementById("random-20").addEventListener("click",()=>{errorMode=false;subset=[...all].sort(()=>Math.random()-.5).slice(0,20);unit.value="all";diff.value="all";render();window.scrollTo({top:0,behavior:"smooth"});});
document.getElementById("errors-only").addEventListener("click",()=>{subset=null;errorMode=!errorMode;render();});
document.getElementById("reset-bank").addEventListener("click",()=>{if(!confirm("¿Reiniciar respuestas y errores guardados?"))return;answers={};errors=new Set();save();render();});
render();
})();