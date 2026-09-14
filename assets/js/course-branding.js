(() => {
  "use strict";

  const body = document.body;
  if (!body) return;

  const candidatos = [
    body.dataset.courseLogo,
    body.dataset.courseLogoAlt,
    body.dataset.courseLogoFallback
  ].filter(Boolean);

  if (!candidatos.length) return;

  function aplicar(src) {
    document.documentElement.style.setProperty("--bb-watermark-image", `url("${src}")`);

    document.querySelectorAll("[data-bb-course-logo]").forEach((img) => {
      img.src = src;
    });

    document.querySelectorAll("link[data-bb-course-favicon]").forEach((link) => {
      link.href = src;
    });
  }

  function probar(indice) {
    if (indice >= candidatos.length) return;
    const src = candidatos[indice];
    const prueba = new Image();
    prueba.onload = () => aplicar(src);
    prueba.onerror = () => probar(indice + 1);
    prueba.src = src;
  }

  probar(0);
})();
