/* Compatibilidad de enlaces antiguos: todo el contenido académico entra por BADBEAR.CAMPUS. */
(() => {
  const protectedSections = new Set(["#cursos", "#recursos", "#proyecto"]);
  if (!protectedSections.has(window.location.hash)) return;
  window.location.replace(new URL("badbear-campus/index.html", window.location.href).href);
})();
