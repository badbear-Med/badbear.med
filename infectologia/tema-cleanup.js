(() => {
  "use strict";

  function hideCardByHeading(text) {
    document.querySelectorAll("h1,h2,h3,h4,strong").forEach(el => {
      if (el.textContent.trim() !== text) return;
      let box = el.parentElement;
      if (!box) return;
      const candidate = box.closest("section,article,.card,.topic-card,.study-card,.panel") || box;
      candidate.style.display = "none";
    });
  }

  function hidePlaceholderFija() {
    document.querySelectorAll("main *").forEach(el => {
      const t = (el.textContent || "").trim();
      if (!t.includes("BADBEAR.MED FIJA:")) return;
      if (!t.includes("contenido definitivo")) return;
      let box = el;
      for (let i = 0; i < 3 && box.parentElement; i++, box = box.parentElement) {
        const parentText = (box.textContent || "").trim();
        if (parentText.includes("contenido definitivo") && parentText.length < 500) {
          box.style.display = "none";
          break;
        }
      }
    });
  }

  function run() {
    hideCardByHeading("Ruta de estudio");
    hideCardByHeading("Recursos del tema");
    hidePlaceholderFija();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once:true });
  } else {
    run();
  }

  // Run once more after dynamic theory/resources render.
  setTimeout(run, 250);
})();
