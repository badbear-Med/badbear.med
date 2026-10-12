(()=>{
const root=document.getElementById("cg-quiz-app");
const banks=window.BADBEAR_CG_QUIZ_DATA;
if(!root||!Array.isArray(banks))return;
const sel=document.getElementById("cg-quiz-topic"),form=document.getElementById("cg-quiz-form"),status=document.getElementById("cg-quiz-status"),results=document.getElementById("cg-quiz-results"),start=document.getElementById("cg-quiz-start");
let active=null,checked=false;
const E=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n};
banks.forEach(b=>{const opt=E("option","",b.title+" · "+b.questions.length+" preguntas");opt.value=b.id;sel.append(opt)});
function launch(){
 active=banks.find(b=>b.id===sel.value)||banks[0];checked=false;form.replaceChildren();results.replaceChildren();status.textContent="Responde las 20 preguntas y presiona Corregir examen. No se muestran las claves antes de finalizar.";
 active.questions.forEach((q,i)=>{
  const field=E("fieldset","cgq-question");field.dataset.qid=q.id;const legend=E("legend","",String(i+1)+". "+q.stem);field.append(legend);
  q.options.forEach((option,j)=>{const label=E("label","cgq-option");const input=document.createElement("input");input.type="radio";input.name="q"+i;input.value=String(j);label.append(input,E("span","",String.fromCharCode(65+j)+". "+option));field.append(label)});
  form.append(field)
 });
 const submit=E("button","cgq-submit","Corregir examen");submit.type="submit";form.append(submit);form.hidden=false;form.querySelector("input")?.focus({preventScroll:true});
}
start.addEventListener("click",launch);
form.addEventListener("submit",event=>{
 event.preventDefault();if(!active||checked)return;
 const selected=active.questions.map((q,i)=>form.querySelector('input[name="q'+i+'"]:checked'));
 if(selected.some(x=>!x)){status.textContent="Faltan "+selected.filter(x=>!x).length+" preguntas por responder. Completa las 20 antes de corregir.";return}
 checked=true;let points=0;results.replaceChildren();
 active.questions.forEach((q,i)=>{
  const given=Number(selected[i].value),correct=given===q.answer;if(correct)points++;
  const field=form.querySelectorAll("fieldset")[i];field.classList.add(correct?"cgq-right":"cgq-wrong");field.querySelectorAll("input").forEach(input=>input.disabled=true);
  const explain=E("div","cgq-explain",(correct?"Correcto. ":"Incorrecto. ")+ "Respuesta: "+String.fromCharCode(65+q.answer)+". "+q.options[q.answer]+". "+q.explanation);field.append(explain);
 });
 const score=E("div","cgq-score",points+" / "+active.questions.length+" correctas · "+Math.round(points*100/active.questions.length)+"%");
 results.append(score,E("p","","Práctica formativa tipo ENAM: este puntaje no constituye una nota oficial de BADBEAR.CAMPUS."));
 form.querySelector(".cgq-submit").disabled=true;
 status.textContent="Examen corregido. Revisa los fundamentos de cada pregunta y selecciona otro tema para volver a practicar.";
 results.scrollIntoView({behavior:"smooth",block:"center"});
});
})();
