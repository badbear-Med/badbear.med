(() => {
  "use strict";
  const cfg=window.BADBEAR_LAS_REALES_CONFIG||{};
  const enc=window.BADBEAR_LAS_REALES_ENCRYPTED||null;
  const expectedHash=String(cfg.accessHash||"").toLowerCase();
  const progressKey="badbear_infectologia_las_reales_progress_v3";
  const accessCard=document.querySelector("#access-card"), protectedContent=document.querySelector("#protected-content"),
        form=document.querySelector("#access-form"), input=document.querySelector("#access-key"),
        msg=document.querySelector("#access-msg"), toggle=document.querySelector("#toggle-key"),
        lockAgain=document.querySelector("#lock-again"), app=document.querySelector("#reales-app");
  let data=null,list=[],current=0,filter="ALL",failedOnly=false,shuffled=false;

  const b64bytes=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  async function sha256Hex(text){const d=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(text));return[...new Uint8Array(d)].map(b=>b.toString(16).padStart(2,"0")).join("")}
  async function deriveKeys(password,salt,iterations){
    const base=await crypto.subtle.importKey("raw",new TextEncoder().encode(password),"PBKDF2",false,["deriveBits"]);
    const bits=await crypto.subtle.deriveBits({name:"PBKDF2",salt,iterations,hash:"SHA-1"},base,512);
    const all=new Uint8Array(bits);
    return {
      aesKey:await crypto.subtle.importKey("raw",all.slice(0,32),{name:"AES-CBC"},false,["decrypt"]),
      hmacKey:await crypto.subtle.importKey("raw",all.slice(32,64),{name:"HMAC",hash:"SHA-256"},false,["verify"])
    };
  }
  async function decryptPayload(password){
    if(!enc)throw new Error("No se encontro el paquete cifrado.");
    const salt=b64bytes(enc.salt),iv=b64bytes(enc.iv),cipher=b64bytes(enc.ciphertext),mac=b64bytes(enc.hmac);
    const k=await deriveKeys(password,salt,Number(enc.iterations||150000));
    const signed=new Uint8Array(iv.length+cipher.length);signed.set(iv,0);signed.set(cipher,iv.length);
    if(!await crypto.subtle.verify("HMAC",k.hmacKey,mac,signed))throw new Error("Clave incorrecta o contenido alterado.");
    const plain=await crypto.subtle.decrypt({name:"AES-CBC",iv},k.aesKey,cipher);
    return JSON.parse(new TextDecoder("utf-8").decode(plain));
  }
  function getProgress(){try{return JSON.parse(localStorage.getItem(progressKey)||"{}")}catch{return{}}}
  function saveProgress(p){localStorage.setItem(progressKey,JSON.stringify(p))}
  function shuffleCopy(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  function stats(){const p=getProgress(),ids=new Set(data.preguntas.map(q=>q.id)),e=Object.entries(p).filter(([id])=>ids.has(id));return{answered:e.length,correct:e.filter(([,v])=>v.correcta).length,wrong:e.filter(([,v])=>v.correcta===false).length,pending:data.total-e.length}}
  function buildList(){const p=getProgress();let b=data.preguntas.filter(q=>filter==="ALL"||q.bloque===filter);if(failedOnly)b=b.filter(q=>p[q.id]&&p[q.id].correcta===false);list=shuffled?shuffleCopy(b):[...b];current=Math.min(current,Math.max(0,list.length-1))}
  function renderShell(){
    const blocks=[...new Set(data.preguntas.map(q=>q.bloque))],s=stats();
    app.innerHTML=`<section class="reales-dashboard">
      <div class="reales-stat"><strong>${data.total}</strong><span>Preguntas reales</span></div>
      <div class="reales-stat"><strong>${s.answered}</strong><span>Respondidas</span></div>
      <div class="reales-stat ok"><strong>${s.correct}</strong><span>Correctas</span></div>
      <div class="reales-stat bad"><strong>${s.wrong}</strong><span>Falladas</span></div>
      <div class="reales-stat"><strong>${s.pending}</strong><span>Pendientes</span></div>
    </section>
    <section class="reales-controls">
      <select id="reales-filter"><option value="ALL">Todos los bloques</option>${blocks.map(b=>`<option value="${esc(b)}">${esc(b.replace(/^BLOQUE DE /,""))}</option>`).join("")}</select>
      <button id="reales-failed" type="button">Solo falladas</button>
      <button id="reales-shuffle" type="button">Modo aleatorio</button>
      <button id="reales-reset" type="button" class="danger-lite">Reiniciar progreso</button>
    </section><section id="reales-question"></section>`;
    document.querySelector("#reales-filter").value=filter;
    document.querySelector("#reales-filter").addEventListener("change",e=>{filter=e.target.value;current=0;buildList();renderQuestion()});
    document.querySelector("#reales-failed").addEventListener("click",e=>{failedOnly=!failedOnly;e.currentTarget.classList.toggle("active",failedOnly);current=0;buildList();renderQuestion()});
    document.querySelector("#reales-shuffle").addEventListener("click",e=>{shuffled=!shuffled;e.currentTarget.classList.toggle("active",shuffled);current=0;buildList();renderQuestion()});
    document.querySelector("#reales-reset").addEventListener("click",()=>{if(confirm("\u00bfReiniciar todo el progreso?")){localStorage.removeItem(progressKey);current=0;renderShell();buildList();renderQuestion()}});
  }
  function refreshStats(){const s=stats(),c=document.querySelectorAll(".reales-stat strong");if(c.length>=5){c[0].textContent=data.total;c[1].textContent=s.answered;c[2].textContent=s.correct;c[3].textContent=s.wrong;c[4].textContent=s.pending}}
  function renderQuestion(){
    const host=document.querySelector("#reales-question");if(!list.length){host.innerHTML='<div class="reales-empty">No hay preguntas para este filtro.</div>';return}
    const q=list[current],p=getProgress(),saved=p[q.id]||null;
    host.innerHTML=`<article class="real-question-card">
      <div class="real-question-top"><div><span class="real-block">${esc(q.bloque.replace(/^BLOQUE DE /,""))}</span>${q.caso?`<span class="real-case">${esc(q.caso)}</span>`:""}</div><strong>${current+1} / ${list.length}</strong></div>
      <div class="real-number">Pregunta ${esc(q.id)}</div><h3>${esc(q.pregunta)}</h3>
      <div class="real-options">${q.opciones.map(o=>{let cls="real-option";if(saved){if(o.id===q.respuesta)cls+=" correct";if(o.id===saved.seleccion&&saved.seleccion!==q.respuesta)cls+=" wrong";cls+=" locked"}return`<button class="${cls}" type="button" data-option="${esc(o.id)}"><span>${esc(o.id.toUpperCase())}</span><b>${esc(o.texto)}</b></button>`}).join("")}</div>
      ${saved?`<div class="real-feedback">${saved.correcta?'<strong class="feedback-ok">Correcta.</strong>':'<strong class="feedback-bad">Incorrecta.</strong>'}<span>Respuesta: <b>${esc(q.respuesta.toUpperCase())}</b></span></div>
      <section class="badbear-fija"><div class="badbear-fija-title">BADBEAR.MED FIJA:</div><p>${esc(q.fija)}</p></section>`:""}
      <div class="real-nav"><button id="real-prev" type="button" ${current===0?"disabled":""}>\u2190 Anterior</button><button id="real-next" type="button" ${current===list.length-1?"disabled":""}>Siguiente \u2192</button></div>
    </article>`;
    host.querySelectorAll(".real-option").forEach(btn=>btn.addEventListener("click",()=>{const latest=getProgress();if(latest[q.id])return;const s=btn.dataset.option;latest[q.id]={seleccion:s,correcta:s===q.respuesta};saveProgress(latest);refreshStats();renderQuestion()}));
    document.querySelector("#real-prev").addEventListener("click",()=>{if(current>0){current--;renderQuestion()}});
    document.querySelector("#real-next").addEventListener("click",()=>{if(current<list.length-1){current++;renderQuestion()}});
  }
  async function unlock(password){data=await decryptPayload(password);accessCard.hidden=true;protectedContent.hidden=false;renderShell();buildList();renderQuestion()}
  form.addEventListener("submit",async e=>{e.preventDefault();msg.textContent="Verificando...";msg.className="access-msg";try{if(await sha256Hex(input.value)!==expectedHash)throw new Error("Clave incorrecta.");const pw=input.value;await unlock(pw);input.value="";msg.textContent=""}catch(err){msg.textContent=err?.message||"No se pudo abrir.";msg.className="access-msg error";input.select()}});
  toggle.addEventListener("click",()=>{const show=input.type==="text";input.type=show?"password":"text";toggle.textContent=show?"Ver":"Ocultar";input.focus()});
  lockAgain.addEventListener("click",()=>{data=null;list=[];app.innerHTML="";protectedContent.hidden=true;accessCard.hidden=false;input.value="";msg.textContent="";input.focus()});
})();