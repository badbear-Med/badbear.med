(() => {
  "use strict";
  const app = document.getElementById("trauma-tema-app");
  const temas = Array.isArray(window.BADBEAR_TRAUMA_TEMAS) ? window.BADBEAR_TRAUMA_TEMAS : [];
  const id = new URLSearchParams(window.location.search).get("t");
  const tema = temas.find(t => t.id === id) || temas[0];
  if(!app || !tema) return;

  document.title = `Clase ${tema.clase}: ${tema.titulo} | Traumatología | BADBEAR.MED`;
  const leidos = new Set(JSON.parse(localStorage.getItem("badbear_trauma_leidos") || "[]"));
  const actual = temas.findIndex(t => t.id === tema.id);
  const anterior = temas[(actual - 1 + temas.length) % temas.length];
  const siguiente = temas[(actual + 1) % temas.length];

  app.innerHTML = `
    <div class="tema-breadcrumb">
      <a href="../index.html">BADBEAR.MED</a><span>›</span><a href="index.html">Traumatología y Ortopedia</a><span>›</span><strong>Clase ${tema.clase}</strong>
    </div>
    <section class="tema-hero">
      <div class="tema-icon">${tema.icono}</div>
      <div><span>CLASE ${tema.clase} · ${tema.area.toUpperCase()}</span><h1>${tema.titulo}</h1><p>${tema.descripcion}</p></div>
    </section>
    <div class="tema-layout">
      <div>
        <section class="tema-card">
          <h2>Ruta de estudio de la clase</h2>
          <p>Esta sección sigue la organización del <strong>TEXTO TRAUMATOLOGIA 2026</strong>. El desarrollo académico se incorporará respetando el orden real de las clases del curso.</p>
          <ul>
            <li>Conceptos y anatomía funcional necesarios para la clase.</li>
            <li>Mecanismo de lesión o fisiopatología.</li>
            <li>Clasificación cuando corresponda.</li>
            <li>Clínica y examen físico.</li>
            <li>Radiología y otros métodos diagnósticos.</li>
            <li>Tratamiento médico, ortopédico o quirúrgico.</li>
            <li>Complicaciones y puntos de alta rentabilidad para examen.</li>
          </ul>
        </section>
        <section class="tema-card">
          <h2>Recursos de la clase</h2>
          <p>La ruta ya está preparada para incorporar el resumen completo, imágenes radiológicas, banco de preguntas, exámenes pasados, PDF, video y audio correspondientes a la Clase ${tema.clase}.</p>
        </section>
        <section class="tema-note">
          <h3>BADBEAR.MED FIJA:</h3>
          <p>Este bloque concentrará las clasificaciones, signos radiológicos, pruebas clínicas y decisiones terapéuticas de mayor rentabilidad de esta clase.</p>
        </section>
        <p class="tema-source">Estructura temática basada en TEXTO TRAUMATOLOGIA 2026, guía del curso de Ortopedia y Traumatología.</p>
      </div>
      <aside class="tema-side">
        <h3>Navegación</h3>
        <a href="tema.html?t=${anterior.id}">← Clase ${anterior.clase}: ${anterior.titulo}</a>
        <a href="index.html#temas">Todas las clases</a>
        <a href="tema.html?t=${siguiente.id}">Clase ${siguiente.clase}: ${siguiente.titulo} →</a>
        <a href="modulo.html?m=preguntas">Banco de preguntas</a>
        <a href="modulo.html?m=examenes">Exámenes pasados</a>
        <a href="modulo.html?m=pdf">PDF</a>
        <a href="modulo.html?m=videos">Videos</a>
        <a href="modulo.html?m=audios">Audios</a>
        <button id="tema-complete" class="tema-complete ${leidos.has(tema.id) ? "hecho" : ""}">${leidos.has(tema.id) ? "✓ Clase revisada" : "Marcar como revisada"}</button>
      </aside>
    </div>`;

  document.getElementById("tema-complete")?.addEventListener("click", e => {
    if(leidos.has(tema.id)) leidos.delete(tema.id); else leidos.add(tema.id);
    localStorage.setItem("badbear_trauma_leidos", JSON.stringify([...leidos]));
    e.currentTarget.classList.toggle("hecho", leidos.has(tema.id));
    e.currentTarget.textContent = leidos.has(tema.id) ? "✓ Clase revisada" : "Marcar como revisada";
  });
})();
