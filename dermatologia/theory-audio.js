(function(){
  "use strict";

  const catalogo = window.BADBEAR_DERMATOLOGIA;
  if(!catalogo || !Array.isArray(catalogo.temas)){
    console.warn("BADBEAR.MED: no se encontró contenido-dermatologia.js");
    return;
  }

  const TEMAS = catalogo.temas;
  const DISPONIBLES = TEMAS.filter(t => !!t.audio);
  const CLAVE_ESTADO = "badbear_derma_audio_estado";
  const CLAVE_COMPLETADOS = "badbear_derma_audios_completados";
  const embebido = window.self !== window.top && new URLSearchParams(location.search).get("bbembed") === "1";

  function leerEstado(){
    try{
      const raw = localStorage.getItem(CLAVE_ESTADO);
      return raw ? JSON.parse(raw) : null;
    }catch(e){ return null; }
  }

  function leerCompletados(){
    try{
      const valor = JSON.parse(localStorage.getItem(CLAVE_COMPLETADOS));
      return Array.isArray(valor) ? valor : [];
    }catch(e){ return []; }
  }

  function formato(segundos){
    if(!Number.isFinite(segundos)) return "0:00";
    const m = Math.floor(segundos / 60);
    const s = Math.floor(segundos % 60).toString().padStart(2,"0");
    return `${m}:${s}`;
  }

  function temaPorId(id){
    return TEMAS.find(t => Number(t.id) === Number(id)) || null;
  }

  function indiceDisponiblePorTemaId(id){
    return DISPONIBLES.findIndex(t => Number(t.id) === Number(id));
  }

  function iniciar(){
    if(embebido || document.getElementById("bb-study-audio") || !DISPONIBLES.length) return;

    const estilo = document.createElement("style");
    estilo.textContent = `
      body.bb-study-audio-activo{padding-bottom:118px!important}
      body.bb-study-audio-activo .bb-auth-logout{bottom:126px!important}
      .bb-study-audio{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:99990;width:min(980px,calc(100% - 28px));background:#111827;color:#fff;border:1px solid rgba(255,255,255,.12);border-radius:20px;box-shadow:0 18px 55px rgba(17,24,39,.3);padding:12px 14px;font-family:Arial,Helvetica,sans-serif}
      .bb-study-audio-grid{display:grid;grid-template-columns:minmax(210px,1.35fr) auto minmax(210px,1fr) minmax(180px,.8fr);gap:12px;align-items:center}
      .bb-study-meta{min-width:0}.bb-study-kicker{display:block;color:#ffc928;font-size:9px;font-weight:900;letter-spacing:.8px;margin-bottom:3px}.bb-study-title{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:13px;font-weight:900}.bb-study-sub{display:block;margin-top:3px;color:#aab4c3;font-size:10px}
      .bb-study-controls{display:flex;gap:7px;align-items:center}.bb-study-btn{width:36px;height:36px;border:0;border-radius:50%;display:grid;place-items:center;background:#263244;color:#fff;font-size:14px;cursor:pointer}.bb-study-btn.bb-play{width:42px;height:42px;background:#fff;color:#111827;font-size:17px}
      .bb-study-progress{display:grid;grid-template-columns:auto minmax(90px,1fr) auto;gap:7px;align-items:center;color:#aab4c3;font-size:9px}.bb-study-progress input{width:100%;accent-color:#2458ff}
      .bb-study-options{display:grid;grid-template-columns:minmax(0,1fr) 68px;gap:7px;align-items:center}.bb-study-options select{min-width:0;border:1px solid #364152;border-radius:10px;background:#1f2937;color:#fff;padding:8px 9px;font-size:10px;font-weight:700}.bb-study-options option:disabled{color:#7c8796}.bb-study-speed{width:68px}
      @media(max-width:760px){
        body.bb-study-audio-activo{padding-bottom:158px!important}
        body.bb-study-audio-activo .bb-auth-logout{bottom:166px!important}
        .bb-study-audio{bottom:8px;width:calc(100% - 16px);padding:10px;border-radius:16px}
        .bb-study-audio-grid{grid-template-columns:1fr auto;gap:8px 10px}
        .bb-study-meta{grid-column:1/2}.bb-study-controls{grid-column:2/3;grid-row:1/2}.bb-study-progress{grid-column:1/-1}.bb-study-options{grid-column:1/-1}
        .bb-study-title{font-size:12px}.bb-study-sub{display:none}.bb-study-btn{width:32px;height:32px}.bb-study-btn.bb-play{width:38px;height:38px}
      }
    `;
    document.head.appendChild(estilo);

    const contenedor = document.createElement("section");
    contenedor.id = "bb-study-audio";
    contenedor.className = "bb-study-audio";
    contenedor.setAttribute("aria-label","Audio de estudio persistente");
    contenedor.innerHTML = `
      <div class="bb-study-audio-grid">
        <div class="bb-study-meta">
          <span class="bb-study-kicker">🎧 AUDIO DE ESTUDIO · ${DISPONIBLES.length}/${catalogo.totalTemas} DISPONIBLES</span>
          <strong id="bb-study-title" class="bb-study-title"></strong>
          <span class="bb-study-sub">Continúa sonando mientras cambias de sección</span>
        </div>
        <div class="bb-study-controls">
          <button id="bb-study-prev" class="bb-study-btn" type="button" aria-label="Audio anterior">◀</button>
          <button id="bb-study-play" class="bb-study-btn bb-play" type="button" aria-label="Reproducir o pausar">▶</button>
          <button id="bb-study-next" class="bb-study-btn" type="button" aria-label="Audio siguiente">▶</button>
        </div>
        <div class="bb-study-progress">
          <span id="bb-study-current">0:00</span>
          <input id="bb-study-range" type="range" min="0" max="100" value="0" aria-label="Progreso del audio">
          <span id="bb-study-total">0:00</span>
        </div>
        <div class="bb-study-options">
          <select id="bb-study-track" aria-label="Tema de audio"></select>
          <select id="bb-study-speed" class="bb-study-speed" aria-label="Velocidad">
            <option value="0.75">0.75x</option><option value="1" selected>1x</option><option value="1.25">1.25x</option><option value="1.5">1.5x</option><option value="1.75">1.75x</option><option value="2">2x</option>
          </select>
        </div>
      </div>
      <audio id="bb-study-media" preload="metadata"></audio>
    `;
    document.body.appendChild(contenedor);
    document.body.classList.add("bb-study-audio-activo");

    const media = document.getElementById("bb-study-media");
    const titulo = document.getElementById("bb-study-title");
    const play = document.getElementById("bb-study-play");
    const prev = document.getElementById("bb-study-prev");
    const next = document.getElementById("bb-study-next");
    const rango = document.getElementById("bb-study-range");
    const actual = document.getElementById("bb-study-current");
    const total = document.getElementById("bb-study-total");
    const selector = document.getElementById("bb-study-track");
    const velocidad = document.getElementById("bb-study-speed");

    TEMAS.forEach(t=>{
      const op = document.createElement("option");
      op.value = String(t.id);
      op.textContent = `${String(t.id).padStart(2,"0")}. ${t.titulo}${t.audio ? "" : " · audio pendiente"}`;
      op.disabled = !t.audio;
      selector.appendChild(op);
    });

    let indiceDisponible = 0;
    let completados = new Set(leerCompletados());
    let ultimoGuardado = -1;

    function temaActual(){ return DISPONIBLES[indiceDisponible]; }

    function guardar(reproduciendo = !media.paused){
      const t = temaActual();
      localStorage.setItem(CLAVE_ESTADO, JSON.stringify({
        temaId:t?.id || 1,
        indice:indiceDisponible,
        tiempo:media.currentTime || 0,
        volumen:media.volume,
        velocidad:media.playbackRate,
        reproduciendo:!!reproduciendo,
        actualizadoEn:Date.now()
      }));
    }

    function emitirEstado(){
      const t = temaActual();
      window.postMessage({
        type:"bb-audio-state",
        temaId:t?.id || null,
        titulo:t?.titulo || "",
        tiempo:media.currentTime || 0,
        duracion:media.duration || 0,
        reproduciendo:!media.paused
      }, location.origin);
    }

    function actualizarMediaSession(){
      const t = temaActual();
      if(!t || !("mediaSession" in navigator)) return;
      try{
        navigator.mediaSession.metadata = new MediaMetadata({
          title:t.titulo,
          artist:"BADBEAR.MED · Dermatología",
          album:"Audio de estudio"
        });
      }catch(e){}
    }

    function cargarPorIndice(nuevoIndice, tiempo=0){
      indiceDisponible = (nuevoIndice + DISPONIBLES.length) % DISPONIBLES.length;
      const t = temaActual();
      media.src = t.audio;
      titulo.textContent = `${String(t.id).padStart(2,"0")} · ${t.titulo}`;
      selector.value = String(t.id);
      play.textContent = "▶";
      rango.value = "0";
      actual.textContent = "0:00";
      total.textContent = "0:00";
      actualizarMediaSession();
      if(tiempo > 0){
        media.addEventListener("loadedmetadata",()=>{
          if(tiempo < media.duration) media.currentTime = tiempo;
        },{once:true});
      }
    }

    function cargarPorTemaId(temaId, tiempo=0){
      const idx = indiceDisponiblePorTemaId(temaId);
      if(idx < 0) return false;
      cargarPorIndice(idx, tiempo);
      return true;
    }

    async function reproducir(){
      try{
        await media.play();
        play.textContent = "❚❚";
        guardar(true);
        emitirEstado();
      }catch(e){ play.textContent = "▶"; }
    }

    function pausar(){
      media.pause();
      play.textContent = "▶";
      guardar(false);
      emitirEstado();
    }

    async function reproducirTema(temaId){
      if(!cargarPorTemaId(temaId)) return false;
      await reproducir();
      return true;
    }

    window.BADBEAR_AUDIO_API = {
      playTopic:reproducirTema,
      pause:pausar,
      play:reproducir,
      getState:()=>leerEstado(),
      getCatalog:()=>catalogo
    };

    play.addEventListener("click",()=> media.paused ? reproducir() : pausar());
    prev.addEventListener("click",()=>{ guardar(); cargarPorIndice(indiceDisponible-1); reproducir(); });
    next.addEventListener("click",()=>{ guardar(); cargarPorIndice(indiceDisponible+1); reproducir(); });

    selector.addEventListener("change",()=>{
      const temaId = Number(selector.value);
      if(!temaPorId(temaId)?.audio) return;
      guardar();
      cargarPorTemaId(temaId);
      reproducir();
    });

    velocidad.addEventListener("change",()=>{
      media.playbackRate = Number(velocidad.value) || 1;
      guardar();
    });

    rango.addEventListener("input",()=>{
      if(media.duration) media.currentTime = (Number(rango.value)/100) * media.duration;
    });

    media.addEventListener("play",()=>{ play.textContent="❚❚"; guardar(true); emitirEstado(); });
    media.addEventListener("pause",()=>{ play.textContent="▶"; guardar(false); emitirEstado(); });
    media.addEventListener("loadedmetadata",()=> total.textContent=formato(media.duration));
    media.addEventListener("timeupdate",()=>{
      actual.textContent = formato(media.currentTime);
      total.textContent = formato(media.duration);
      if(media.duration) rango.value = String((media.currentTime/media.duration)*100);
      const s = Math.floor(media.currentTime);
      if(s > 0 && s % 5 === 0 && s !== ultimoGuardado){
        ultimoGuardado = s;
        guardar();
        emitirEstado();
      }
    });

    media.addEventListener("ended",()=>{
      const t = temaActual();
      if(t){
        completados.add(t.id);
        localStorage.setItem(CLAVE_COMPLETADOS, JSON.stringify([...completados]));
      }
      cargarPorIndice(indiceDisponible+1);
      reproducir();
    });

    window.addEventListener("beforeunload",()=>guardar());

    window.addEventListener("message", e=>{
      if(e.origin !== location.origin || !e.data || typeof e.data !== "object") return;
      if(e.data.type === "bb-audio-play-topic") reproducirTema(Number(e.data.temaId));
      if(e.data.type === "bb-audio-toggle") media.paused ? reproducir() : pausar();
      if(e.data.type === "bb-audio-request-state") emitirEstado();
    });

    if("mediaSession" in navigator){
      try{
        navigator.mediaSession.setActionHandler("play",reproducir);
        navigator.mediaSession.setActionHandler("pause",pausar);
        navigator.mediaSession.setActionHandler("previoustrack",()=>{cargarPorIndice(indiceDisponible-1);reproducir();});
        navigator.mediaSession.setActionHandler("nexttrack",()=>{cargarPorIndice(indiceDisponible+1);reproducir();});
      }catch(e){}
    }

    const estado = leerEstado();
    if(estado){
      let cargado = false;
      if(estado.temaId) cargado = cargarPorTemaId(Number(estado.temaId), Number(estado.tiempo)||0);
      if(!cargado && Number.isInteger(estado.indice) && DISPONIBLES[estado.indice]){
        cargarPorIndice(estado.indice, Number(estado.tiempo)||0);
        cargado = true;
      }
      if(typeof estado.volumen === "number") media.volume = Math.min(1,Math.max(0,estado.volumen));
      if(typeof estado.velocidad === "number"){
        media.playbackRate = estado.velocidad;
        velocidad.value = String(estado.velocidad);
      }
      if(!cargado) cargarPorIndice(0);
    }else{
      cargarPorIndice(0);
    }
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded",iniciar,{once:true});
  else iniciar();
})();
