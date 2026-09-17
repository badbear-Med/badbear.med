(() => {
  "use strict";

  const modules = [
    ["teoria","📚","Teoría"],
    ["resumenes","📖","Resúmenes"],
    ["preguntas","🧠","Banco"],
    ["examenes","📝","Exámenes"],
    ["pdf","📄","PDF"],
    ["videos","🎥","Videos"],
    ["audios","🎧","Audios"],
    ["progreso","📊","Progreso"]
  ];

  const p = new URLSearchParams(location.search);
  const current = p.get("m") || "teoria";

  const temas =
    window.BADBEAR_INFECTOLOGIA_TEMAS ||
    window.BADBEAR_INFECTO_TEMAS ||
    window.INFECTOLOGIA_TEMAS ||
    [];

  const recursos = window.BADBEAR_INFECTO_RECURSOS || {pdfs:[],audios:[],playlist:""};
  const youtube = window.BADBEAR_INFECTO_YOUTUBE || [];

  const root = document.querySelector("#module-root");
  const nav = document.querySelector("#module-nav");
  const mobileNav = document.querySelector("#bb-mobile-nav");
  const menuBtn = document.querySelector("#bb-menu-btn");

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  const pretty = s => String(s||"")
    .replace(/^\s*\d+(?:[._-]\d+)?[._-]*/,"")
    .replace(/_/g," ")
    .replace(/\b(?:PPT|PPRT|MP3)\b/gi,"")
    .replace(/\s+/g," ")
    .trim();

  const ytId = url => {
    try {
      const u = new URL(url);
      return u.hostname.includes("youtu.be") ? u.pathname.slice(1) : (u.searchParams.get("v") || "");
    } catch {
      return "";
    }
  };

  const moduleLinks = modules.map(([id,ic,label]) =>
    `<a href="modulo.html?m=${id}" class="${current===id?"active":""}"><span>${ic}</span><span>${label}</span></a>`
  ).join("");

  nav.innerHTML = moduleLinks;
  mobileNav.innerHTML =
    moduleLinks +
    `<a href="las-reales.html">🔐 LAS REALES</a>` +
    `<a href="index.html">🏠 Temas</a>` +
    `<a href="../index.html">← Portal</a>`;

  menuBtn.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!open));
    mobileNav.hidden = open;
  });

  function hero(title,desc){
    return `<section class="bb-hero">
      <div class="bb-kicker">Medicina · Infectología · BADBEAR.MED</div>
      <h1>${title}</h1>
      <p>${desc}</p>
    </section>`;
  }

  function topicCards(action="Abrir tema"){
    if(!temas.length){
      return `<div class="bb-empty"><strong>Temario no cargado</strong>Recarga con Ctrl+F5.</div>`;
    }
    return `<div class="bb-grid">${
      temas.map(t => `<a class="bb-card" href="tema.html?t=${encodeURIComponent(t.id)}">
        <span class="tag">${esc(t.area||t.categoria||"Infectología")}</span>
        <h3>${esc(t.titulo||t.nombre)}</h3>
        <p>${esc(t.descripcion||"Abrir contenido del tema.")}</p>
        <span class="go">${action} →</span>
      </a>`).join("")
    }</div>`;
  }

  function renderTeoria(){
    root.innerHTML =
      hero("Teoría","Los 13 capítulos desarrollados del cuaderno de Infectología, con explicación clínica, farmacología y BADBEAR.MED FIJA.") +
      `<section class="bb-panel">
        <h2>Temario desarrollado</h2>
        <p class="lead">Cada tema abre su capítulo completo y, debajo, sus PDF, audios y videos relacionados.</p>
        ${topicCards("Estudiar capítulo")}
      </section>`;
  }

  function renderResumenes(){
    root.innerHTML =
      hero("Resúmenes","Repaso rápido de los 13 temas del curso.") +
      `<section class="bb-panel">
        <h2>Repaso por tema</h2>
        <p class="lead">Abre el capítulo correspondiente para revisar cuadros, asociaciones y BADBEAR.MED FIJA.</p>
        ${topicCards("Abrir repaso")}
      </section>`;
  }

  function renderPreguntas(){
    root.innerHTML =
      hero("Banco de preguntas","El banco general y BADBEAR.MED · LAS REALES se mantienen separados.") +
      `<section class="bb-panel">
        <h2>Práctica de Infectología</h2>
        <p class="lead">El banco convencional irá aquí. LAS REALES permanece en su zona protegida.</p>
        <div class="bb-actions">
          <a class="btn danger" href="las-reales.html">BADBEAR.MED · LAS REALES</a>
          <a class="btn light" href="modulo.html?m=teoria">Repasar teoría</a>
        </div>
        <div class="bb-empty" style="margin-top:18px">
          <strong>Banco general preparado</strong>
          Las preguntas generales se incorporarán aquí por tema sin mezclarlas con LAS REALES.
        </div>
      </section>`;
  }

  function renderExamenes(){
    root.innerHTML =
      hero("Exámenes pasados","Archivo histórico separado del Banco general y de LAS REALES.") +
      `<section class="bb-panel">
        <h2>Exámenes históricos</h2>
        <p class="lead">No se inventan exámenes que no hayan sido proporcionados.</p>
        <div class="bb-empty">
          <strong>Aún no hay exámenes pasados cargados</strong>
          Cuando agregues PDF, fotografías o transcripciones, aparecerán aquí organizados por fecha, bloque y tema.
        </div>
        <div class="bb-note"><b>BADBEAR.MED:</b> LAS REALES seguirá en su zona privada.</div>
      </section>`;
  }

  function renderPdf(){
    root.innerHTML =
      hero("Biblioteca PDF",`${recursos.pdfs.length} PDF de Infectología disponibles.`) +
      `<section class="bb-panel">
        <h2>PDF del curso</h2>
        <p class="lead">Material incorporado al repositorio.</p>
        <div class="bb-grid">${
          recursos.pdfs.map(x=>`<article class="bb-resource-card">
            <div class="type">PDF</div>
            <h3>${esc(pretty(x.nombre))}</h3>
            <a class="btn" href="${encodeURI(x.archivo)}" target="_blank" rel="noopener">Abrir PDF</a>
          </article>`).join("") || `<div class="bb-empty">No hay PDF registrados.</div>`
        }</div>
      </section>`;
  }

  function renderVideos(){
    root.innerHTML =
      hero("Videos",`${youtube.length} videos enlazados y playlist general.`) +
      `<section class="bb-panel">
        <h2>YouTube</h2>
        <p class="lead">Los videos se abren desde YouTube y no ocupan espacio pesado en el repositorio.</p>
        <div class="bb-actions">
          ${recursos.playlist ? `<a class="btn primary" href="${esc(recursos.playlist)}" target="_blank" rel="noopener">Abrir playlist completa</a>` : ""}
        </div>
        <div class="bb-grid" style="margin-top:18px">${
          youtube.map(x=>{
            const id=ytId(x.url);
            return `<article class="bb-resource-card bb-youtube">
              ${id?`<img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="">`:""}
              <div class="type">YOUTUBE · ${esc(x.tema||"Infectología")}</div>
              <h3>${esc(x.titulo||"Video")}</h3>
              <a class="btn" href="${esc(x.url)}" target="_blank" rel="noopener">Ver video</a>
            </article>`;
          }).join("") || `<div class="bb-empty">No hay videos registrados.</div>`
        }</div>
      </section>`;
  }

  function renderAudios(){
    root.innerHTML =
      hero("Audios",`${recursos.audios.length} audios disponibles para repaso.`) +
      `<section class="bb-panel">
        <h2>Audio-clases</h2>
        <p class="lead">Reproduce directamente los audios optimizados.</p>
        <div class="bb-grid">${
          recursos.audios.map(x=>`<article class="bb-resource-card">
            <div class="type">AUDIO</div>
            <h3>${esc(pretty(x.nombre))}</h3>
            <audio controls preload="metadata" src="${encodeURI(x.archivo)}"></audio>
          </article>`).join("") || `<div class="bb-empty">No hay audios registrados.</div>`
        }</div>
      </section>`;
  }

  function renderProgreso(){
    const key="badbear_infecto_leidos";
    let reviewed=[];
    try{
      reviewed=JSON.parse(localStorage.getItem(key)||"[]");
      if(!Array.isArray(reviewed)) reviewed=[];
    }catch{reviewed=[];}

    const total=temas.length || 13;
    const done=new Set(reviewed).size;
    const pct=total ? Math.round(done/total*100) : 0;

    root.innerHTML =
      hero("Progreso","Seguimiento local de los temas marcados como revisados en este navegador.") +
      `<section class="bb-panel">
        <div class="bb-stats">
          <div class="bb-stat"><strong>${total}</strong><span>Temas</span></div>
          <div class="bb-stat"><strong>${done}</strong><span>Revisados</span></div>
          <div class="bb-stat"><strong>${pct}%</strong><span>Progreso</span></div>
          <div class="bb-stat"><strong>${Math.max(0,total-done)}</strong><span>Pendientes</span></div>
        </div>
        <div class="bb-progress"><span style="width:${pct}%"></span></div>
        <p class="lead">El progreso se guarda localmente en este navegador.</p>
        ${topicCards("Abrir tema")}
      </section>`;
  }

  const renders = {
    teoria:renderTeoria,
    resumenes:renderResumenes,
    preguntas:renderPreguntas,
    examenes:renderExamenes,
    pdf:renderPdf,
    videos:renderVideos,
    audios:renderAudios,
    progreso:renderProgreso
  };

  (renders[current] || renderTeoria)();
})();
