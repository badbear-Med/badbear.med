(()=>{"use strict";
const ALL=window.TESIS_PREGUNTAS_PROBABLES||[];let pool=[...ALL],idx=0,selected=null,answers=new Map();const L=["A","B","C","D","E"],$=id=>document.getElementById(id);
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a}
function stats(){const v=[...answers.values()];$("probDone").textContent=v.length;$("probRight").textContent=v.filter(x=>x.ok).length;$("probProgress").textContent=pool.length?(idx+1)+" / "+pool.length:"0 / 0"}
function render(){const q=pool[idx];selected=null;if(!q){$("probStem").textContent="No hay preguntas para este filtro.";$("probOptions").innerHTML="";return}$("probTopicLabel").textContent=q.t.toUpperCase();$("probStem").textContent=q.s;const box=$("probOptions");box.innerHTML="";q.o.forEach((o,i)=>{const b=document.createElement("button");b.className="real-option";b.innerHTML="<strong>"+L[i]+".</strong> "+o;b.onclick=()=>{if(answers.has(q.id))return;selected=i;[...box.children].forEach(x=>x.classList.remove("selected"));b.classList.add("selected")};box.appendChild(b)});$("probFeedback").classList.remove("show");const old=answers.get(q.id);if(old){selected=old.choice;show(q,old.choice,true)}stats()}
function show(q,choice,restore=false){[...$("probOptions").children].forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add("correct");if(i===choice&&i!==q.a)b.classList.add("wrong")});const ok=choice===q.a;$("probResult").textContent=ok?"Respuesta correcta · "+L[q.a]+". "+q.o[q.a]:"Respuesta incorrecta · Correcta: "+L[q.a]+". "+q.o[q.a];$("probResult").className=ok?"ok":"bad";$("probExplanation").textContent=q.e;$("probTheory").textContent=q.th;$("probRationales").innerHTML=q.r.map((x,i)=>'<div class="real-rat"><strong>'+L[i]+'. '+(i===q.a?"Correcta":"")+'</strong> '+x+'</div>').join("");$("probFija").innerHTML="<strong>BADBEAR.MED FIJA:</strong>"+q.f;$("probFeedback").classList.add("show");$("probFeedback").scrollIntoView({behavior:"smooth",block:"nearest"});if(!restore){answers.set(q.id,{choice,ok});stats()}}
$("probCheck").onclick=()=>{const q=pool[idx];if(!q||selected===null||answers.has(q.id))return;show(q,selected)};
$("probNext").onclick=()=>{if(idx<pool.length-1){idx++;render()}};
$("probPrev").onclick=()=>{if(idx>0){idx--;render()}};
$("probShuffle").onclick=()=>{pool=shuffle([...pool]);idx=0;render()};
$("probReset").onclick=()=>{answers.clear();idx=0;render()};
$("probTopic").onchange=e=>{const v=e.target.value;pool=v==="all"?[...ALL]:ALL.filter(q=>q.t===v);idx=0;render()};
render();
})();