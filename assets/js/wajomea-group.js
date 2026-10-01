/* Conserva los marcadores de la antigua portada médica. */
(() => {
  const medicalSections = new Set(["#cursos", "#recursos", "#proyecto"]);
  function preserveMedicalLink() {
    if (!medicalSections.has(window.location.hash)) return;
    const destination = new URL("badbear-med.html", window.location.href);
    destination.hash = window.location.hash;
    window.location.replace(destination.href);
  }
  preserveMedicalLink();
  window.addEventListener("hashchange", preserveMedicalLink);
})();
