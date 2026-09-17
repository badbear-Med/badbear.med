(() => {
  "use strict";
  const app = document.getElementById("infecto-tema-app");
  const temas = Array.isArray(window.BADBEAR_INFECTO_TEMAS) ? window.BADBEAR_INFECTO_TEMAS : [];
  const id = new URLSearchParams(window.location.search).get("t");
  const tema = temas.find(t => t.id === id) || temas[0];
  if(!app || !tema) return;

  document.title = `${tema.titulo} | Infectología | BADBEAR.MED`;
  const leidos = new Set(JSON.parse(localStorage.getItem("badbear_infecto_leidos") || "[]"));
  const actual = temas.findIndex(t => t.id === tema.id);
  const anterior = temas[(actual - 1 + temas.length) % temas.length];
  const siguiente = temas[(actual + 1) % temas.length];

  app.innerHTML = `
    <div class="tema-breadcrumb">
      <a href="../index.html">BADBEAR.MED</a><span>›</span><a href="index.html">Infectología</a><span>›</span><strong>${tema.titulo}</strong>
    </div>
    <section class="tema-hero">
      <div class="tema-icon">${tema.icono}</div>
      <div><span>${tema.area.toUpperCase()} · INFECTOLOGÍA</span><h1>${tema.titulo}</h1><p>${tema.descripcion}</p></div>
    </section>
    <div class="tema-layout">
      <div>
        <section class="tema-card">
          <h2>Ruta de estudio</h2>
          <p>Esta página ya tiene una ubicación estable dentro del curso. El contenido académico detallado puede integrarse progresivamente sin cambiar la navegación.</p>
          <ul>
            <li>Definiciones y conceptos esenciales.</li>
            <li>Etiología y factores de riesgo.</li>
            <li>Fisiopatología y presentación clínica.</li>
            <li>Diagnóstico y diagnóstico diferencial.</li>
            <li>Tratamiento, prevención y seguimiento.</li>
            <li>Puntos de alta rentabilidad para evaluación.</li>
          </ul>
        </section>
        <section class="tema-card">
          <h2>Recursos del tema</h2>
          <p>El sistema está listo para recibir resumen, banco de preguntas, examen histórico, PDF, video y audio específicos de <strong>${tema.titulo}</strong>.</p>
          <div class="tema-empty">Contenido académico específico en integración. La estructura y las rutas ya están activas.</div>
        </section>
        <section class="tema-note">
          <h3>BADBEAR.MED FIJA:</h3>
          <p>Cuando se incorpore el contenido definitivo, este bloque concentrará los conceptos de mayor rentabilidad clínica y de examen del tema.</p>
        </section>
      </div>
      <aside class="tema-side">
        <h3>Navegación</h3>
        <a href="tema.html?t=${anterior.id}">← ${anterior.titulo}</a>
        <a href="index.html#temas">Todos los temas</a>
        <a href="tema.html?t=${siguiente.id}">${siguiente.titulo} →</a>
        <a href="banco-preguntas.html">Banco de preguntas</a>
        <a href="modulo.html?m=pdf">PDF</a>
        <a href="modulo.html?m=audios">Audios</a>
        <button id="tema-complete" class="tema-complete ${leidos.has(tema.id) ? "hecho" : ""}">${leidos.has(tema.id) ? "✓ Tema revisado" : "Marcar como revisado"}</button>
      </aside>
    </div>
  `;

  document.getElementById("tema-complete")?.addEventListener("click", (e) => {
    if(leidos.has(tema.id)) leidos.delete(tema.id); else leidos.add(tema.id);
    localStorage.setItem("badbear_infecto_leidos", JSON.stringify([...leidos]));
    e.currentTarget.classList.toggle("hecho", leidos.has(tema.id));
    e.currentTarget.textContent = leidos.has(tema.id) ? "✓ Tema revisado" : "Marcar como revisado";
  });
})();
