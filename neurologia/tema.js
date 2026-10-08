(() => {
  "use strict";
  const app = document.getElementById("neuro-tema-app");
  const temas = Array.isArray(window.BADBEAR_NEURO_TEMAS) ? window.BADBEAR_NEURO_TEMAS : [];
  const contenidos = window.BADBEAR_NEURO_CONTENIDOS || {};
  const recursos = window.BADBEAR_NEURO_RECURSOS || {};
  const id = new URLSearchParams(window.location.search).get("t");
  const tema = temas.find(t => t.id === id) || temas[0];
  if(!app || !tema) return;

  document.title = `${tema.titulo} | Neurología | BADBEAR.MED`;
  const leidos = new Set(JSON.parse(localStorage.getItem("badbear_neuro_leidos") || "[]"));
  const actual = temas.findIndex(t => t.id === tema.id);
  const anterior = temas[(actual - 1 + temas.length) % temas.length];
  const siguiente = temas[(actual + 1) % temas.length];
  const desarrollo = contenidos[tema.id];
  const recurso = recursos[tema.id] || {};
  const visuales = (window.BADBEAR_NEURO_VISUAL || {})[tema.id] || [];

  const tabs = [
    ["teoria","Desarrollo teórico"],
    ["audio","Audio"],
    ["pdf","PDF"],
    ["video","Video"],
    ["extra","Material extra"],
    ["bankeos","Bankeos"],
    ["fijas","BADBEAR.MED FIJA"]
  ];

  const visualGallery = visuales.length ? `
    <section class="source-visual-section">
      <div class="source-visual-head">
        <div><span>MATERIAL DOCENTE ORIGINAL</span><h2>Galería visual de la unidad</h2></div>
        <p>Las figuras se han seleccionado por su utilidad anatómica, fisiopatológica, clínica o radiológica. Cada tarjeta conserva la página exacta del PDF fuente.</p>
      </div>
      <div class="source-visual-grid">
        ${visuales.map(v => `
          <article class="source-page-card">
            <button class="source-page-preview" type="button" data-pdf="${recurso.pdf || ""}" data-page="${v.page}" aria-label="Abrir página ${v.page}">
              <div class="source-page-placeholder">
                <strong>PÁGINA ${v.page}</strong>
                <span>${v.title}</span>
                <small>Clic para visualizar la lámina original</small>
              </div>
            </button>
            <div class="source-page-copy">
              <h3>${v.title}</h3>
              <p>${v.note}</p>
              <span>Fuente: ${recurso.nombre || recurso.pdf || "material docente"} · p. ${v.page}</span>
            </div>
          </article>`).join("")}
      </div>
    </section>` : "";

  const audioItems = Array.isArray(recurso.audios) ? recurso.audios : [];

  const audioPanel = audioItems.length ? `
    <div class="neuro-audio-list">
      ${audioItems.map((a, index) => `
        <article class="neuro-audio-card">
          <div class="neuro-audio-badge">AUDIO</div>
          <div class="neuro-audio-copy">
            <span>AUDIO DE CLASE · NEUROLOGÍA</span>
            <h3>${a.titulo}</h3>
            <p>${a.descripcion || "Audio correspondiente a esta unidad."}</p>
            <audio
              controls
              preload="metadata"
              src="${a.src}"
              data-title="${a.titulo}"
              aria-label="Reproducir ${a.titulo}"
            ></audio>
            <small>Al pulsar Play, este audio pasa al reproductor global de WAJOMEA.GROUP y continúa aunque cambies de sección.</small>
          </div>
        </article>
      `).join("")}
    </div>` : `
    <div class="resource-placeholder">
      <b>Audio de clase</b>
      <p>Esta unidad todavía no tiene un audio compatible sincronizado.</p>
    </div>`;

  const pdfCard = recurso.pdf ? `
    <div class="source-resource-card">
      <div class="source-resource-icon">PDF</div>
      <div>
        <span>${recurso.fuente || "Material extra"}</span>
        <h3>${recurso.nombre || recurso.pdf.split("/").pop()}</h3>
        <p>PDF docente correspondiente a esta unidad.</p>
        <div class="pdf-actions">
          <a href="#visor-pdf-neurologia" class="neuro-view-pdf">Ver PDF aquí ↓</a>
          <a href="${recurso.pdf}" download>Descargar PDF</a>
        </div>
      </div>
      <span class="sync-badge">PDF de la unidad</span>
    </div>
    <div class="pdf-embed-wrap" id="visor-pdf-neurologia">
      <iframe src="${recurso.pdf}#view=FitH" title="${recurso.nombre || "PDF de la unidad"}" loading="lazy"></iframe>
    </div>` : `
    <div class="resource-placeholder"><b>PDF</b><p>Esta unidad no tiene un PDF independiente dentro del ZIP recibido.</p></div>`;

  app.innerHTML = `
    <div class="tema-breadcrumb">
      <a href="../index.html">BADBEAR.MED</a><span>›</span><a href="index.html">Neurología</a><span>›</span><strong>${tema.titulo}</strong>
    </div>
    <section class="tema-hero">
      <div class="tema-icon">${tema.icono}</div>
      <div><span>${tema.numero ? "UNIDAD "+tema.numero+" · " : "UNIDAD 0 · "}${tema.area.toUpperCase()} · NEUROLOGÍA · BUILD 20261003-V2</span><h1>${tema.titulo}</h1><p>${tema.descripcion}</p></div>
    </section>

    <nav class="resource-tabs" aria-label="Recursos de la unidad">
      ${tabs.map(([key,label],i)=>`<button class="resource-tab ${i===0?"active":""}" data-tab="${key}">${label}</button>`).join("")}
    </nav>

    <div class="tema-layout">
      <div>
        <section class="tab-panel active" data-panel="teoria">
          ${desarrollo || `<section class="tema-card"><h2>Desarrollo teórico</h2><div class="tema-empty">Desarrollo académico específico en integración.</div></section>`}
          ${visualGallery}
        </section>

        <section class="tab-panel" data-panel="audio">
          ${audioPanel}
        </section>

        <section class="tab-panel" data-panel="pdf">
          ${pdfCard}
        </section>

        <section class="tab-panel" data-panel="video">
          <div class="resource-placeholder"><b>Video / YouTube</b><p>Espacio preparado para el enlace o reproductor correspondiente a esta unidad.</p></div>
        </section>

        <section class="tab-panel" data-panel="extra">
          ${pdfCard}
          <div class="material-note"><b>Uso académico del material</b><p>El desarrollo teórico de arriba fue construido a partir de este documento, conservando su organización, terminología y énfasis. Los gráficos e imágenes del PDF se integrarán como figuras ampliables al sincronizar los archivos binarios del material.</p></div>
        </section>

        <section class="tab-panel" data-panel="bankeos">
          <div class="resource-placeholder"><b>Bankeos reales</b><p>Solo se incorporarán preguntas provenientes de evaluaciones, bancos o material identificable. Las preguntas creadas por BADBEAR.MED permanecerán diferenciadas.</p></div>
        </section>

        <section class="tab-panel" data-panel="fijas">
          <div class="resource-placeholder fija-placeholder"><b>BADBEAR.MED FIJA reales</b><p>Los puntos FIJA ya aparecen dentro del desarrollo cuando están sustentados por el material fuente. Esta pestaña quedará como concentrado de los enfatizados por docente o bankeo.</p></div>
        </section>
      </div>

      <aside class="tema-side">
        <h3>Navegación</h3>
        <a href="tema-v2.html?t=${anterior.id}">← ${anterior.titulo}</a>
        <a href="index.html#temas">Todos los temas</a>
        <a href="tema-v2.html?t=${siguiente.id}">${siguiente.titulo} →</a>
        <hr>
        <a href="banco.html">Banco de preguntas</a>
        <a href="modulo.html?m=pdf">Biblioteca PDF</a>
        <a href="modulo.html?m=audios">Audios</a>
        <button id="tema-complete" class="tema-complete ${leidos.has(tema.id) ? "hecho" : ""}">${leidos.has(tema.id) ? "✓ Tema revisado" : "Marcar como revisado"}</button>
      </aside>
    </div>

    <div class="image-modal" id="image-modal" aria-hidden="true">
      <button class="image-modal-close" type="button" aria-label="Cerrar imagen">×</button>
      <div class="image-modal-content"></div>
    </div>
  `;

  document.querySelectorAll(".resource-tab").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll(".resource-tab").forEach(x => x.classList.toggle("active", x === btn));
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.toggle("active", p.dataset.panel === btn.dataset.tab));
  }));

  const modal = document.getElementById("image-modal");
  const pageButtons = document.querySelectorAll(".source-page-preview");
  pageButtons.forEach(btn => btn.addEventListener("click", () => {
    const pdf = btn.dataset.pdf;
    const page = btn.dataset.page;
    if(!modal || !modalContent || !pdf) return;
    modalContent.innerHTML = `<div class="pdf-page-modal"><div class="pdf-page-toolbar"><strong>Página ${page} · material docente</strong><a href="${pdf}#page=${page}" target="_blank" rel="noopener">Abrir PDF ↗</a></div><iframe src="${pdf}#page=${page}&view=FitH" title="Página ${page} del material docente"></iframe></div>`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
  }));
  const modalContent = modal?.querySelector(".image-modal-content");
  document.querySelectorAll(".zoomable").forEach(fig => fig.addEventListener("click", () => {
    if(!modal || !modalContent) return;
    modalContent.innerHTML = fig.innerHTML;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
  }));
  function closeModal(){
    modal?.classList.remove("open");
    modal?.setAttribute("aria-hidden","true");
    if(modalContent) modalContent.innerHTML = "";
  }
  modal?.querySelector(".image-modal-close")?.addEventListener("click", closeModal);
  modal?.addEventListener("click", e => { if(e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

  document.getElementById("tema-complete")?.addEventListener("click", (e) => {
    if(leidos.has(tema.id)) leidos.delete(tema.id); else leidos.add(tema.id);
    localStorage.setItem("badbear_neuro_leidos", JSON.stringify([...leidos]));
    e.currentTarget.classList.toggle("hecho", leidos.has(tema.id));
    e.currentTarget.textContent = leidos.has(tema.id) ? "✓ Tema revisado" : "Marcar como revisado";
  });
})();