(() => {
  "use strict";
  const app = document.getElementById("neuro-tema-app");
  const temas = Array.isArray(window.BADBEAR_NEURO_TEMAS) ? window.BADBEAR_NEURO_TEMAS : [];
  const contenidos = window.BADBEAR_NEURO_CONTENIDOS || {};
  const id = new URLSearchParams(window.location.search).get("t");
  const tema = temas.find(t => t.id === id) || temas[0];
  if(!app || !tema) return;

  document.title = `${tema.titulo} | Neurología | BADBEAR.MED`;
  const leidos = new Set(JSON.parse(localStorage.getItem("badbear_neuro_leidos") || "[]"));
  const actual = temas.findIndex(t => t.id === tema.id);
  const anterior = temas[(actual - 1 + temas.length) % temas.length];
  const siguiente = temas[(actual + 1) % temas.length];
  const desarrollo = contenidos[tema.id];

  const tabs = [
    ["teoria","Desarrollo teórico"],
    ["audio","Audio"],
    ["pdf","PDF"],
    ["video","Video"],
    ["extra","Material extra"],
    ["bankeos","Bankeos"],
    ["fijas","BADBEAR.MED FIJA"]
  ];

  app.innerHTML = `
    <div class="tema-breadcrumb">
      <a href="../index.html">BADBEAR.MED</a><span>›</span><a href="index.html">Neurología</a><span>›</span><strong>${tema.titulo}</strong>
    </div>
    <section class="tema-hero">
      <div class="tema-icon">${tema.icono}</div>
      <div><span>${tema.numero ? "UNIDAD "+tema.numero+" · " : ""}${tema.area.toUpperCase()} · NEUROLOGÍA</span><h1>${tema.titulo}</h1><p>${tema.descripcion}</p></div>
    </section>

    <nav class="resource-tabs" aria-label="Recursos de la unidad">
      ${tabs.map(([key,label],i)=>`<button class="resource-tab ${i===0?"active":""}" data-tab="${key}">${label}</button>`).join("")}
    </nav>

    <div class="tema-layout">
      <div>
        <section class="tab-panel active" data-panel="teoria">
          ${desarrollo || `
            <section class="tema-card">
              <h2>Desarrollo teórico</h2>
              <p>Esta unidad está preparada para crecer progresivamente. Aquí se integrarán anatomía, fisiopatología, clínica, diagnóstico, tratamiento, organizadores, imágenes y correlación clínica.</p>
              <div class="tema-empty">Desarrollo académico específico en integración.</div>
            </section>
          `}
        </section>

        <section class="tab-panel" data-panel="audio"><div class="resource-placeholder"><b>Audio de clase</b><p>Se incorporará aquí cuando sea subido. Permanecerá asociado exclusivamente a esta unidad.</p></div></section>
        <section class="tab-panel" data-panel="pdf"><div class="resource-placeholder"><b>PDF de clase</b><p>Espacio reservado para el PDF principal o la presentación convertida a PDF.</p></div></section>
        <section class="tab-panel" data-panel="video"><div class="resource-placeholder"><b>Video / YouTube</b><p>Espacio para el enlace o reproductor correspondiente a esta unidad.</p></div></section>
        <section class="tab-panel" data-panel="extra"><div class="resource-placeholder"><b>Material extra</b><p>PDF complementarios, guías, artículos, atlas, algoritmos y recursos visuales vinculados con el tema.</p></div></section>
        <section class="tab-panel" data-panel="bankeos"><div class="resource-placeholder"><b>Bankeos reales</b><p>Solo se incorporarán preguntas provenientes de evaluaciones, bancos o material identificable. Las preguntas creadas por BADBEAR.MED se mantendrán diferenciadas.</p></div></section>
        <section class="tab-panel" data-panel="fijas"><div class="resource-placeholder fija-placeholder"><b>BADBEAR.MED FIJA reales</b><p>Este espacio reunirá puntos enfatizados por el docente, repetidos en clase o documentados en bankeos. No se mezclarán con perlas creadas únicamente por nosotros.</p></div></section>
      </div>

      <aside class="tema-side">
        <h3>Navegación</h3>
        <a href="tema.html?t=${anterior.id}">← ${anterior.titulo}</a>
        <a href="index.html#temas">Todos los temas</a>
        <a href="tema.html?t=${siguiente.id}">${siguiente.titulo} →</a>
        <hr>
        <a href="modulo.html?m=preguntas">Banco de preguntas</a>
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