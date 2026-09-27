(()=>{"use strict";
const ALL=window.TESIS_PLANCHAS_REALES||[];
let pool=[...ALL],index=0,selected=null,answers=new Map();
const $=id=>document.getElementById(id),L=["A","B","C","D","E"];
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a}
function current(){return pool[index]}
function stats(){const vals=[...answers.values()];$("realDone").textContent=vals.length;$("realRight").textContent=vals.filter(x=>x.correct).length;$("realProgress").textContent=pool.length?(index+1)+" / "+pool.length:"0 / 0"}
function render(){
 const q=current(); selected=null;
 if(!q){$("realStem").textContent="No hay preguntas en esta selección.";$("realOptions").innerHTML="";return}
 $("realBadge").textContent="REAL";
 $("realSourceLabel").textContent=(q.source==="BANQUEO"?"Banqueo Tesis I · Parcial":q.source==="EX2023"?"Examen parcial Tesis I · 2023 · corroborado en varios archivos":"Plancha complementaria")+" · "+q.topic;
 $("realStem").textContent=q.stem;
 const box=$("realOptions");box.innerHTML="";
 q.options.forEach((o,i)=>{const b=document.createElement("button");b.className="real-option";b.innerHTML="<strong>"+L[i]+".</strong> "+o;b.onclick=()=>{if(answers.has(q.id))return;selected=i;[...box.children].forEach(x=>x.classList.remove("selected"));b.classList.add("selected")};box.appendChild(b)});
 $("realFeedback").classList.remove("show");
 const prev=answers.get(q.id);if(prev){selected=prev.choice;show(q,prev.choice,true)}
 stats();
}
function show(q,choice,restored=false){
 [...$("realOptions").children].forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add("correct");if(i===choice&&i!==q.answer)b.classList.add("wrong")});
 const ok=choice===q.answer;
 $("realResult").textContent=ok?"Respuesta correcta · "+L[q.answer]+". "+q.options[q.answer]:"Respuesta incorrecta · Clave original: "+L[q.answer]+". "+q.options[q.answer];
 $("realResult").className=ok?"ok":"bad";
 $("realExplanation").textContent=q.explanation;
 $("realTheory").textContent=q.theory;
 $("realRationales").innerHTML=q.rationales.map((r,i)=>'<div class="real-rat"><strong>'+L[i]+'. '+(i===q.answer?"Clave original":"")+'</strong> '+r+'</div>').join("");
 $("realFija").innerHTML="<strong>BADBEAR.MED FIJA:</strong>"+q.fija;
 $("realKeyNote").textContent=q.keyNote||"Clave original del material real.";
 $("realFeedback").classList.add("show");
 $("realFeedback").scrollIntoView({behavior:"smooth",block:"nearest"});
 if(!restored){answers.set(q.id,{choice,correct:ok});stats()}
}
$("realCheck").onclick=()=>{const q=current();if(!q||selected===null||answers.has(q.id))return;show(q,selected)};
$("realNext").onclick=()=>{if(index<pool.length-1){index++;render()}};
$("realPrev").onclick=()=>{if(index>0){index--;render()}};
$("realShuffle").onclick=()=>{pool=shuffle([...pool]);index=0;render()};
$("realReset").onclick=()=>{answers.clear();index=0;render()};
$("realSource").onchange=e=>{const v=e.target.value;pool=v==="all"?[...ALL]:ALL.filter(q=>q.source===v);index=0;render()};
render();
})();