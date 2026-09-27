(()=>{"use strict";
const L=["A","B","C","D","E"];
const real=(window.TESIS_PLANCHAS_REALES||[]).map(q=>({id:q.id,src:"REAL",topic:q.topic,stem:q.stem,options:q.options,answer:q.answer,explanation:q.explanation,theory:q.theory,fija:q.fija,rationales:q.rationales}));
const prob=(window.TESIS_PREGUNTAS_PROBABLES||[]).map(q=>({id:q.id,src:"ENTRENAMIENTO",topic:q.t,stem:q.s,options:q.o,answer:q.a,explanation:q.e,theory:q.th,fija:q.f,rationales:q.r}));
const byId={};[...real,...prob].forEach(q=>byId[q.id]=q);
const ids={
"1":["B01","B02","B03","B04","B05","B06","B07","B08","B09","B10","B11","B12","B13","B14","B15","B16","B17","B18","B19","B20"],
"2":["E01","E02","E03","E04","E05","E06","E07","E08","E09","E10","E11","E12","E13","E14","E15","E16","E17","E18","E19","E20"],
"3":["C01","C02","C04","C07","C08","P01","P02","P03","P04","P05","P06","P07","P08","P09","P10","P11","P12","P13","P14","P15"],
"final":["B01","B03","B05","B06","B09","B10","B13","B16","B17","B20","E01","E03","E04","E06","E10","E11","E12","E14","E16","E20","P16","P17","P18","P19","P20","P21","P22","P23","P24","P25","P26","P27","P28","P29","P30","P31","P32","P33","P34","P35"]
};
const meta={
"1":{title:"Examen 01 · Plancha real",desc:"20 preguntas reales del Banqueo Tesis I · Parcial."},
"2":{title:"Examen 02 · Parcial 2023",desc:"20 preguntas reales del Examen Parcial de Tesis I · 2023."},
"3":{title:"Examen 03 · Integración",desc:"20 preguntas: plancha complementaria real + preguntas nuevas de alta probabilidad."},
"final":{title:"Examen final · Acumulativo",desc:"40 preguntas acumulativas: 20 reales y 20 de entrenamiento de alta dificultad."}
};
const key=new URLSearchParams(location.search).get("exam")||"1";
const config=meta[key]||meta["1"];
const questions=(ids[key]||ids["1"]).map(x=>byId[x]).filter(Boolean);
const $=id=>document.getElementById(id);let idx=0,finished=false;const answers=new Array(questions.length).fill(null);const start=Date.now();
$("examTitle").textContent=config.title;$("examDesc").textContent=config.desc+" La corrección completa se habilita al finalizar.";$("totalQ").textContent=questions.length;
function sourceLabel(q){return q.src==="REAL"?"PREGUNTA REAL":"ENTRENAMIENTO · ALTA PROBABILIDAD"}
function answeredCount(){return answers.filter(x=>x!==null).length}
function renderNav(){const n=$("qNav");n.innerHTML="";questions.forEach((q,i)=>{const b=document.createElement("button");b.textContent=i+1;if(answers[i]!==null)b.classList.add("done");if(i===idx&&!finished)b.classList.add("current");b.onclick=()=>{if(!finished){idx=i;render()}};n.appendChild(b)})}
function render(){const q=questions[idx];$("answeredQ").textContent=answeredCount();$("qSource").textContent=sourceLabel(q)+" · "+q.topic;$("qCount").textContent=(idx+1)+" / "+questions.length;$("qStem").textContent=q.stem;const box=$("qOptions");box.innerHTML="";q.options.forEach((o,i)=>{const b=document.createElement("button");b.className="sim-option"+(answers[idx]===i?" selected":"");b.innerHTML="<strong>"+L[i]+".</strong> "+o;b.onclick=()=>{if(finished)return;answers[idx]=i;render()};box.appendChild(b)});renderNav()}
$("prevQ").onclick=()=>{if(idx>0){idx--;render()}};$("nextQ").onclick=()=>{if(idx<questions.length-1){idx++;render()}};
$("finishExam").onclick=()=>{if(finished)return;const missing=questions.length-answeredCount();const msg=missing?("Tienes "+missing+" pregunta(s) sin responder. ¿Deseas finalizar de todos modos?"):"¿Deseas finalizar el examen y ver la corrección?";if(!confirm(msg))return;finish()};
function finish(){finished=true;$("examState").textContent="Finalizado";$("examArea").style.display="none";const right=questions.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0);const pct=Math.round(right*100/questions.length);const note=(right*20/questions.length).toFixed(1);$("scorePct").textContent=pct+"%";$("scoreText").textContent=right+" correctas de "+questions.length+" · Nota referencial: "+note+" / 20 · Tiempo: "+$("timer").textContent;const list=$("reviewList");list.innerHTML="";questions.forEach((q,i)=>{const ok=answers[i]===q.answer;const card=document.createElement("article");card.className="review-card";const user=answers[i]===null?"Sin responder":L[answers[i]]+". "+q.options[answers[i]];card.innerHTML='<div class="review-status '+(ok?'ok':'bad')+'">'+(ok?'CORRECTA':'INCORRECTA')+' · Pregunta '+(i+1)+'</div><h3>'+q.stem+'</h3><div class="review-answer"><strong>Tu respuesta:</strong> '+user+'</div><div class="review-answer"><strong>Correcta:</strong> '+L[q.answer]+'. '+q.options[q.answer]+'</div><div class="review-answer"><strong>Explicación:</strong> '+q.explanation+'</div><div class="review-theory"><strong>Explicación teórica:</strong><br>'+q.theory+'</div><div class="review-rats">'+q.rationales.map((x,j)=>'<div class="review-rat"><strong>'+L[j]+'. '+(j===q.answer?'Correcta':'')+'</strong> '+x+'</div>').join("")+'</div><div class="review-fija"><strong>BADBEAR.MED FIJA:</strong><br>'+q.fija+'</div>';list.appendChild(card)});$("resultBox").classList.add("show");$("resultBox").scrollIntoView({behavior:"smooth",block:"start"})}
setInterval(()=>{if(finished)return;const s=Math.floor((Date.now()-start)/1000),m=Math.floor(s/60),r=s%60;$("timer").textContent=String(m).padStart(2,"0")+":"+String(r).padStart(2,"0")},1000);
render();
})();