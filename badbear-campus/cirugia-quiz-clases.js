(()=>{
"use strict";
const root=document.getElementById("cg-quiz-app");
const banks=window.BADBEAR_CG_SECTION_BANKS||[], groups=window.BADBEAR_CG_CLASSES||[];
if(!root||banks.length!==4)return;
const sectionSelect=document.getElementById("cg-quiz-topic"),form=document.getElementById("cg-quiz-form"),
 status=document.getElementById("cg-quiz-status"),results=document.getElementById("cg-quiz-results"),start=document.getElementById("cg-quiz-start");
if(!sectionSelect||!form||!status||!results||!start)return;
const create=(tag,cl,t)=>{const x=document.createElement(tag);if(cl)x.className=cl;if(t!==undefined)x.textContent=t;return x};
const clsLabel=create("label","","Clase"),clsSelect=create("select");clsLabel.htmlFor="cg-quiz-class";clsSelect.id="cg-quiz-class";clsSelect.setAttribute("aria-label","Seleccionar clase");
const controls=start.parentNode;controls.insertBefore(clsLabel,start);controls.insertBefore(clsSelect,start);
sectionSelect.replaceChildren();banks.forEach(b=>{const o=new Option(b.title+" · "+b.questions.length+" preguntas",b.id);sectionSelect.add(o)});
let chosen=[],corrected=false;
function updateClasses(){
 const section=banks.find(b=>b.id===sectionSelect.value)||banks[0],meta=groups.find(g=>g.id===section.id),items=meta?.ids||[];
 clsSelect.replaceChildren(new Option("Todas las clases de la sección · 80 preguntas",""));
 items.forEach(cls=>{
  const count=section.questions.filter(q=>q.classId===cls.id).length;
  const o=new Option(cls.label+" · "+cls.name+(count?" · "+count+" preguntas":" · pendiente"),cls.id);
  o.disabled=!count||cls.status==="missing";clsSelect.add(o);
 });
 status.textContent=section.title+": "+section.questions.length+" casos clínicos disponibles. Selecciona una clase o practica la sección completa.";
 form.hidden=true;results.replaceChildren();
}
sectionSelect.addEventListener("change",updateClasses);
clsSelect.addEventListener("change",()=>{const section=banks.find(b=>b.id===sectionSelect.value);const n=section.questions.filter(q=>!clsSelect.value||q.classId===clsSelect.value).length;status.textContent=n+" preguntas disponibles para la selección. Pulsa Iniciar práctica.";form.hidden=true;results.replaceChildren()});
function shuffleQuestion(q){const arr=q.options.map((text,i)=>({text,i}));arr.sort(()=>Math.random()-.5);return {...q,options:arr.map(x=>x.text),answer:arr.findIndex(x=>x.i===q.answer)}}
function launch(){
 const section=banks.find(b=>b.id===sectionSelect.value),id=clsSelect.value;
 chosen=section.questions.filter(q=>!id||q.classId===id).map(shuffleQuestion);corrected=false;
 form.replaceChildren();results.replaceChildren();
 if(!chosen.length){status.textContent="Aún no hay preguntas aprobadas para esta clase.";form.hidden=true;return}
 chosen.forEach((q,i)=>{
  const f=create("fieldset","cgq-question"),legend=create("legend","",String(i+1)+". "+q.stem);f.append(legend);
  q.options.forEach((option,j)=>{const l=create("label","cgq-option"),input=create("input");input.type="radio";input.name="cgq"+i;input.value=String(j);l.append(input,create("span","",String.fromCharCode(65+j)+". "+option));f.append(l)});
  form.append(f)
 });
 const button=create("button","cgq-submit","Corregir práctica");button.type="submit";form.append(button);
 form.hidden=false;status.textContent="Responde las "+chosen.length+" preguntas. Las claves y fundamentos aparecen al corregir.";
 form.scrollIntoView({behavior:"smooth",block:"start"});
}
start.addEventListener("click",launch);
form.addEventListener("submit",ev=>{
 ev.preventDefault();if(corrected||!chosen.length)return;
 const answers=chosen.map((q,i)=>form.querySelector('input[name="cgq'+i+'"]:checked'));
 const remaining=answers.filter(a=>!a).length;if(remaining){status.textContent="Faltan "+remaining+" respuestas. Completa la práctica para corregir.";return}
 corrected=true;let points=0;
 chosen.forEach((q,i)=>{
  const valid=Number(answers[i].value)===q.answer;if(valid)points++;
  const field=form.querySelectorAll("fieldset")[i];field.classList.add(valid?"cgq-right":"cgq-wrong");
  field.querySelectorAll("input").forEach(input=>input.disabled=true);
  const exp=create("div","cgq-explain",(valid?"Correcto. ":"Incorrecto. ")+"Clave: "+String.fromCharCode(65+q.answer)+". "+q.options[q.answer]+". "+q.explanation);
  field.append(exp);
 });
 results.replaceChildren(create("div","cgq-score",points+" / "+chosen.length+" correctas · "+Math.round(100*points/chosen.length)+"%"),create("p","","Evaluación formativa, no equivale a una calificación oficial."));
 form.querySelector(".cgq-submit").disabled=true;status.textContent="Práctica corregida. Revisa la explicación clínica debajo de cada pregunta.";
 results.scrollIntoView({behavior:"smooth",block:"center"});
});
updateClasses();
})();