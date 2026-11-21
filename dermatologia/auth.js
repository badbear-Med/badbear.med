(() => {
  function cargarMejorasMoviles() {
    if (!document.querySelector('link[data-bb-mobile="1"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "mobile-fixes.css?v=3";
      link.dataset.bbMobile = "1";
      document.head.appendChild(link);
    }
  }

  function prepararMenuMovil() {
    const header = document.querySelector(".bb-header");
    const nav = header && header.querySelector(".nav-principal");
    if (!header || !nav || header.querySelector(".bb-mobile-menu-btn")) return;

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "bb-mobile-menu-btn";
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-label", "Abrir menú de navegación");
    boton.innerHTML = "☰ <span>Menú</span>";

    boton.addEventListener("click", () => {
      const abierto = header.classList.toggle("bb-menu-abierto");
      boton.setAttribute("aria-expanded", abierto ? "true" : "false");
      boton.innerHTML = abierto ? "✕ <span>Cerrar</span>" : "☰ <span>Menú</span>";
    });

    nav.querySelectorAll("a").forEach(enlace => {
      enlace.addEventListener("click", () => {
        header.classList.remove("bb-menu-abierto");
        boton.setAttribute("aria-expanded", "false");
        boton.innerHTML = "☰ <span>Menú</span>";
      });
    });

    header.insertBefore(boton, nav);
  }


  const start = () => {
    cargarMejorasMoviles();
    prepararMenuMovil();
  };
  const ready = window.BADBEAR_CAMPUS_ACCESS?.ready;
  if (!ready) return;
  ready.then(allowed => {
    if (!allowed) return;
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",start,{once:true});
    else start();
  });
})();
