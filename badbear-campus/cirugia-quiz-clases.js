(()=>{
"use strict";
const root=document.getElementById("cg-quiz-app");
const banks=window.BADBEAR_CG_SECTION_BANKS||[],groups=window.BADBEAR_CG_CLASSES||[];
if(!root||banks.length!==4)return;
const sectionSelect=document.getElementById("cg-quiz-topic"),form=document.getElementById("cg-quiz-form"),
status=document.getElementById("cg-quiz-status"),results=document.getElementById("cg-quiz-results"),start=document.getElementById("cg-quiz-start");
if(!sectionSelect||!form||!status||!results||!start)return;
const el=(tag,cls,t)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(t!==undefined)x.textContent=t;return x};
const clsLabel=el("label","","Clase"),clsSelect=el("select");clsLabel.htmlFor="cg-quiz-class";clsSelect.id="cg-quiz-class";clsSelect.setAttribute("aria-label","Seleccionar clase");
start.parentNode.insertBefore(clsLabel,start);start.parentNode.insertBefore(clsSelect,start);
sectionSelect.replaceChildren();
banks.forEach(b=>sectionSelect.add(new Option(b.title+" · "+b.questions.length+" preguntas",b.id)));
let chosen=[],position=0,points=0,answers=[],ready=false;
function updateClasses(){
 const section=banks.find(b=>b.id===sectionSelect.value)||banks[0],meta=groups.find(g=>g.id===section.id);
 clsSelect.replaceChildren(new Option("Todas las clases de la sección · "+section.questions.length+" preguntas",""));
 (meta?.ids||[]).forEach(cls=>{
   const count=section.questions.filter(q=>q.classId===cls.id).length;
   const o=new Option(cls.label+" · "+cls.name+(count?" · "+count+" preguntas":" · pendiente"),cls.id);
   o.disabled=!count||cls.status==="missing";clsSelect.add(o);
 });
 reset();
 status.textContent=section.title+": "+section.questions.length+" casos clínicos disponibles. Elige una clase e inicia la práctica.";
}
function reset(){chosen=[];position=0;points=0;answers=[];ready=false;form.hidden=true;form.replaceChildren();results.replaceChildren();}
sectionSelect.addEventListener("change",updateClasses);
clsSelect.addEventListener("change",()=>{reset();const b=banks.find(x=>x.id===sectionSelect.value),n=b.questions.filter(q=>!clsSelect.value||q.classId===clsSelect.value).length;status.textContent=n+" preguntas disponibles. Pulsa Iniciar práctica."});
function shuffle(q){
 const a=q.options.map((text,i)=>({text,i}));
 for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
 return {...q,options:a.map(x=>x.text),answer:a.findIndex(x=>x.i===q.answer)};
}
function score(){
 results.replaceChildren();
 const answered=answers.length,percent=answered?Math.round(points/answered*100):0;
 const top=el("div","cgq-score");
 top.append(el("span","", "Pregunta "+Math.min(position+1,chosen.length)+" / "+chosen.length+" · Respondidas: "+answered+" · Aciertos: "+points+" · Precisión: "+percent+"%"));
 const track=el("div","cgq-progress-track"),fill=el("div","cgq-progress-fill");
 fill.style.width=(chosen.length?answered/chosen.length*100:0)+"%";
 track.setAttribute("role","progressbar");track.setAttribute("aria-label","Avance del banco");track.setAttribute("aria-valuemin","0");track.setAttribute("aria-valuemax",String(chosen.length));track.setAttribute("aria-valuenow",String(answered));
 track.append(fill);top.append(track);results.append(top);
}
function launch(){
 const section=banks.find(b=>b.id===sectionSelect.value)||banks[0];
 chosen=section.questions.filter(q=>!clsSelect.value||q.classId===clsSelect.value).map(shuffle);
 position=0;points=0;answers=[];ready=true;
 if(!chosen.length){reset();status.textContent="Aún no hay preguntas disponibles para esta clase.";return;}
 form.hidden=false;render();root.scrollIntoView({behavior:"smooth",block:"start"});
}
function render(){
 if(!ready)return;
 form.replaceChildren();score();
 if(position>=chosen.length){
  const finish=el("div","cgq-finish");
  finish.append(el("h3","","Práctica completada"),el("p","",points+" respuestas correctas de "+chosen.length+". Este es un entrenamiento formativo, no una nota oficial."));
  const review=el("div","cgq-review");
  answers.forEach((a,i)=>{const q=chosen[i],item=el("details","cgq-review-item");item.append(el("summary","",(i+1)+". "+(a.correct?"Correcta":"Incorrecta")+" — "+q.stem));const d=el("p","", "Elegiste: "+q.options[a.selected]+". Correcta: "+q.options[q.answer]+". "+(q.explanation||"Revisa la justificación clínica de esta respuesta."));item.append(d);review.append(item)});
  finish.append(review);form.append(finish);status.textContent="Terminaste el banco. Revisa tus respuestas o inicia nuevamente.";return;
 }
 const q=chosen[position],field=el("fieldset","cgq-question"),legend=el("legend","",(position+1)+". "+q.stem);
 field.append(legend);
 q.options.forEach((option,j)=>{
  const label=el("label","cgq-option"),input=el("input");input.type="radio";input.name="cgq-current";input.value=String(j);
  label.append(input,el("span","",String.fromCharCode(65+j)+". "+option));field.append(label);
 });
 form.append(field);status.textContent="Selecciona una alternativa. Se mostrará la respuesta correcta, el fundamento clínico y BADBEAR.MED FIJA.";
 field.querySelector("input")?.focus({preventScroll:true});
}
start.addEventListener("click",launch);
form.addEventListener("change",ev=>{
 const input=ev.target;if(!ready||position>=chosen.length||!(input instanceof HTMLInputElement)||input.name!=="cgq-current")return;
 if(form.querySelector(".cgq-feedback"))return;
 const q=chosen[position],selected=Number(input.value),correct=selected===q.answer;
 answers.push({selected,correct});if(correct)points++;
 const field=form.querySelector("fieldset");field.classList.add(correct?"cgq-right":"cgq-wrong");
 field.querySelectorAll("input").forEach(x=>x.disabled=true);
 field.querySelectorAll(".cgq-option").forEach((label,j)=>{
  if(j===q.answer)label.classList.add("cgq-correct-option");
  else if(j===selected)label.classList.add("cgq-incorrect-option");
 });
 const feedback=el("div","cgq-feedback cgq-explain");feedback.setAttribute("role","status");
 feedback.append(el("strong","",correct?"¡Correcto!":"Respuesta incorrecta"));
 if(!correct)feedback.append(el("p","", "Tu elección: "+String.fromCharCode(65+selected)+". "+q.options[selected]+". No corresponde a la respuesta más adecuada para los datos del caso."));
 feedback.append(el("p","", "Respuesta correcta: "+String.fromCharCode(65+q.answer)+". "+q.options[q.answer]+"."));
 feedback.append(el("p","cgq-reason","Fundamento clínico: "+(q.explanation||"Revisar el razonamiento diagnóstico y terapéutico del caso.")));
 feedback.append(el("p","cgq-fija","BADBEAR.MED FIJA: "+(q.explanation||"Identifica el dato decisivo del caso clínico antes de elegir el manejo.")));
 field.append(feedback);
 const next=el("button","cgq-next",position===chosen.length-1?"Finalizar y ver resultados":"Siguiente pregunta →");
 next.type="button";next.addEventListener("click",()=>{position++;render();form.scrollIntoView({behavior:"smooth",block:"start"})},{once:true});
 form.append(next);score();
 status.textContent="Respuesta "+answers.length+" de "+chosen.length+" registrada. Lee el argumento y continúa cuando estés listo.";
});
updateClasses();
})();