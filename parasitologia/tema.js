(() => {
  "use strict";
  const app = document.getElementById("par-tema-app");
  const temas = Array.isArray(window.BADBEAR_PARASITO_TEMAS) ? window.BADBEAR_PARASITO_TEMAS : [];
  const id = new URLSearchParams(location.search).get("t");
  const tema = temas.find(t => t.id === id) || temas[0];
  if(!app || !tema) return;
  document.title = `${tema.titulo} | Parasitología | BADBEAR.MED`;
  const leidos = new Set(JSON.parse(localStorage.getItem("badbear_parasito_leidos") || "[]"));
  const i = temas.findIndex(t => t.id === tema.id), ant = temas[(i - 1 + temas.length) % temas.length], sig = temas[(i + 1) % temas.length];

  app.innerHTML = `
    <div class="tema-breadcrumb"><a href="../index.html">BADBEAR.MED</a><span>›</span><a href="index.html">Parasitología</a><span>›</span><strong>${tema.area}</strong></div>
    <section class="tema-hero"><div class="tema-icon">${tema.icono}</div><div><span>${tema.area.toUpperCase()}</span><h1>${tema.titulo}</h1><p>${tema.descripcion}</p></div></section>
    <div class="tema-layout">
      <div>
        <section class="tema-card"><h2>Ruta de estudio</h2><ul><li>Agente etiológico y morfología.</li><li>Ciclo biológico y forma infectante.</li><li>Epidemiología y mecanismos de transmisión.</li><li>Patogenia y manifestaciones clínicas.</li><li>Diagnóstico parasitológico, inmunológico o molecular cuando corresponda.</li><li>Tratamiento y prevención.</li><li>Diferenciales y complicaciones de alta rentabilidad.</li></ul></section>
        <section class="tema-card"><h2>Recursos del tema</h2><p>La estructura está preparada para incorporar resúmenes amplios, esquemas de ciclos biológicos, imágenes microscópicas reales, técnicas diagnósticas, banco de preguntas, exámenes, PDF, videos y audios.</p></section>
        <section class="tema-note"><h3>BADBEAR.MED FIJA:</h3><p>Este bloque reunirá la forma infectante, muestra diagnóstica, hallazgo microscópico, técnica clave, tratamiento de elección y complicaciones que más se confunden en examen.</p></section>
        <p class="tema-source">Temario organizado a partir de los temas de Parasitología trabajados dentro del proyecto BADBEAR.MED; no se presenta como índice oficial de un único libro.</p>
      </div>
      <aside class="tema-side"><h3>Navegación</h3><a href="tema.html?t=${ant.id}">← ${ant.titulo}</a><a href="index.html#temas">Todos los temas</a><a href="tema.html?t=${sig.id}">${sig.titulo} →</a><a href="modulo.html?m=preguntas">Banco de preguntas</a><a href="modulo.html?m=examenes">Exámenes pasados</a><a href="modulo.html?m=pdf">PDF</a><a href="modulo.html?m=videos">Videos</a><a href="modulo.html?m=audios">Audios</a><button id="tema-complete" class="tema-complete ${leidos.has(tema.id) ? "hecho" : ""}">${leidos.has(tema.id) ? "✓ Tema revisado" : "Marcar como revisado"}</button></aside>
    </div>`;

  document.getElementById("tema-complete")?.addEventListener("click", e => {
    if(leidos.has(tema.id)) leidos.delete(tema.id); else leidos.add(tema.id);
    localStorage.setItem("badbear_parasito_leidos", JSON.stringify([...leidos]));
    e.currentTarget.classList.toggle("hecho", leidos.has(tema.id));
    e.currentTarget.textContent = leidos.has(tema.id) ? "✓ Tema revisado" : "Marcar como revisado";
  });
})();
