(()=>{"use strict";
const all=window.TESIS_S8_QUESTIONS||[];let pool=[...all],idx=0,selected=null,answered=new Map();
const $=id=>document.getElementById(id), letters=["A","B","C","D","E"];
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a}
function current(){return pool[idx]}
function stats(){const arr=[...answered.values()],done=arr.length,right=arr.filter(x=>x.correct).length;$("done").textContent=done;$("right").textContent=right;$("pct").textContent=done?Math.round(right*100/done)+"%":"0%";$("progressBar").style.width=(pool.length?((idx+1)/pool.length*100):0)+"%";$("total").textContent=pool.length;renderSummary()}
function renderSummary(){const box=$("classResults");box.innerHTML="";for(let c=1;c<=7;c++){const entries=[...answered.entries()].filter(([id])=>id.startsWith("C"+c+"Q")).map(([,v])=>v);const r=entries.filter(x=>x.correct).length;const d=entries.length;const el=document.createElement("div");el.innerHTML="Clase "+String(c).padStart(2,"0")+"<strong>"+r+"/"+d+"</strong>";box.appendChild(el)}$("summary").classList.toggle("show",answered.size>0)}
function render(){const q=current();if(!q){$("quizCard").innerHTML="<h2>No hay preguntas para este filtro.</h2>";return}selected=null;$("qClass").textContent="CLASE "+String(q.classNo).padStart(2,"0")+" · "+q.topic;$("qNum").textContent=(idx+1)+" / "+pool.length;$("stem").textContent=q.stem;const ops=$("options");ops.innerHTML="";q.options.forEach((o,i)=>{const b=document.createElement("button");b.className="option";b.innerHTML="<strong>"+letters[i]+".</strong> "+o;b.onclick=()=>{if(answered.has(q.id))return;selected=i;[...ops.children].forEach(x=>x.classList.remove("selected"));b.classList.add("selected")};ops.appendChild(b)});$("feedback").classList.remove("show");const prev=answered.get(q.id);if(prev){selected=prev.choice;showFeedback(q,prev.choice,true)}stats()}
function showFeedback(q,choice,restored=false){const children=[...$("options").children];children.forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add("correct");if(i===choice&&i!==q.answer)b.classList.add("wrong")});const ok=choice===q.answer;$("feedbackHead").textContent=ok?"Respuesta correcta":"Respuesta incorrecta";$("feedbackHead").className="feedback-head "+(ok?"ok":"bad");$("explanation").textContent=q.explanation;$("rationales").innerHTML=q.rationales.map((r,i)=>'<div class="rat"><strong>'+letters[i]+'. '+(i===q.answer?"Correcta":"")+'</strong> '+r+'</div>').join("");$("fija").innerHTML="<strong>BADBEAR.MED FIJA:</strong>"+q.fija;$("feedback").classList.add("show");if(!restored){answered.set(q.id,{choice,correct:ok});stats()}}
$("checkBtn").onclick=()=>{const q=current();if(selected===null||answered.has(q.id))return;showFeedback(q,selected)};
$("nextBtn").onclick=()=>{if(idx<pool.length-1){idx++;render()}};
$("prevBtn").onclick=()=>{if(idx>0){idx--;render()}};
$("shuffleBtn").onclick=()=>{pool=shuffle([...pool]);idx=0;render()};
$("resetBtn").onclick=()=>{answered.clear();idx=0;render()};
$("classFilter").onchange=e=>{const v=e.target.value;pool=v==="all"?[...all]:all.filter(q=>String(q.classNo)===v);idx=0;render()};
render();
})();