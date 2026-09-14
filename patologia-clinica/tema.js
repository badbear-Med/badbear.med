(() => {
  "use strict";
  const app=document.getElementById("pat-tema-app");
  const temas=Array.isArray(window.BADBEAR_PATOLOGIA_TEMAS)?window.BADBEAR_PATOLOGIA_TEMAS:[];
  const id=new URLSearchParams(location.search).get("t");
  const tema=temas.find(t=>t.id===id)||temas[0];
  if(!app||!tema)return;
  document.title=`${tema.titulo} | Patología Clínica | BADBEAR.MED`;
  const leidos=new Set(JSON.parse(localStorage.getItem("badbear_patologia_leidos")||"[]"));
  const i=temas.findIndex(t=>t.id===tema.id),ant=temas[(i-1+temas.length)%temas.length],sig=temas[(i+1)%temas.length];
  app.innerHTML=`
    <div class="tema-breadcrumb"><a href="../index.html">BADBEAR.MED</a><span>›</span><a href="index.html">Patología Clínica</a><span>›</span><strong>${tema.area}</strong></div>
    <section class="tema-hero"><div class="tema-icon">${tema.icono}</div><div><span>${tema.area.toUpperCase()}</span><h1>${tema.titulo}</h1><p>${tema.descripcion}</p></div></section>
    <div class="tema-layout"><div>
      <section class="tema-card"><h2>Ruta de interpretación</h2><ul><li>Identificar la prueba, unidad y rango de referencia del laboratorio.</li><li>Reconocer el patrón principal de alteración.</li><li>Correlacionar resultados relacionados antes de interpretar un valor aislado.</li><li>Plantear diagnósticos diferenciales y causas preanalíticas cuando corresponda.</li><li>Integrar el resultado con clínica, antecedentes y otras pruebas.</li><li>Definir qué estudio confirmatorio o de seguimiento aporta mayor valor.</li></ul></section>
      <section class="tema-card"><h2>Recursos del tema</h2><p>La estructura está preparada para incorporar cuadros de valores de referencia, algoritmos diagnósticos, ejemplos de laboratorio, preguntas de examen, PDF, audio y video.</p><p class="tema-warning">Los rangos de referencia deben mostrarse con la fuente y el laboratorio o método cuando sea relevante; no se asumirán como universales.</p></section>
      <section class="tema-note"><h3>BADBEAR.MED FIJA:</h3><p>Este bloque concentrará patrones de laboratorio, asociaciones diagnósticas, fórmulas, algoritmos y errores frecuentes de alta rentabilidad para examen.</p></section>
    </div><aside class="tema-side"><h3>Navegación</h3><a href="tema.html?t=${ant.id}">← ${ant.titulo}</a><a href="index.html#temas">Todos los temas</a><a href="tema.html?t=${sig.id}">${sig.titulo} →</a><a href="modulo.html?m=preguntas">Banco de preguntas</a><a href="modulo.html?m=examenes">Exámenes pasados</a><a href="modulo.html?m=pdf">PDF</a><a href="modulo.html?m=videos">Videos</a><a href="modulo.html?m=audios">Audios</a><button id="tema-complete" class="tema-complete ${leidos.has(tema.id)?"hecho":""}">${leidos.has(tema.id)?"✓ Tema revisado":"Marcar como revisado"}</button></aside></div>`;
  document.getElementById("tema-complete")?.addEventListener("click",e=>{if(leidos.has(tema.id))leidos.delete(tema.id);else leidos.add(tema.id);localStorage.setItem("badbear_patologia_leidos",JSON.stringify([...leidos]));e.currentTarget.classList.toggle("hecho",leidos.has(tema.id));e.currentTarget.textContent=leidos.has(tema.id)?"✓ Tema revisado":"Marcar como revisado"});
})();
