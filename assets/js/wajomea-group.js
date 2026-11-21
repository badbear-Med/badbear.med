/* Entradas de la portada y compatibilidad de enlaces académicos. */
(() => {
  const protectedSections = new Set(["#cursos", "#recursos", "#proyecto"]);
  if (protectedSections.has(window.location.hash)) {
    window.location.replace(new URL("badbear-campus/index.html", window.location.href).href);
    return;
  }

  const toggle = document.getElementById("wg-projects-toggle");
  const projects = document.getElementById("proyectos");
  const label = document.getElementById("wg-projects-cta");
  if (!toggle || !projects || !label) return;

  function setOpen(open) {
    projects.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    label.textContent = open ? "Ocultar proyectos" : "Ver proyectos";
  }

  function scrollToProjects() {
    projects.scrollIntoView({block:"start", behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
  }

  toggle.addEventListener("click", () => {
    const open = projects.hidden;
    setOpen(open);
    if (open) scrollToProjects();
  });

  for (const link of document.querySelectorAll('a[href="#proyectos"], a[href="#universo-badbear"]')) {
    link.addEventListener("click", () => {
      setOpen(true);
      scrollToProjects();
    });
  }
  function followHash() {
    if (["#proyectos", "#universo-badbear"].includes(window.location.hash)) {
      setOpen(true);
      scrollToProjects();
    }
  }
  window.addEventListener("hashchange", followHash);
  followHash();
})();
