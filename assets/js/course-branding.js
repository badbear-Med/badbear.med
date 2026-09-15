(() => {
  "use strict";

  const body = document.body;
  if (!body) return;

  function detectarCurso() {
    if (body.dataset.courseId) return body.dataset.courseId;

    const partes = location.pathname
      .split("/")
      .filter(Boolean);

    if (!partes.length) return "";

    let ultimo = partes[partes.length - 1] || "";
    if (/\.[a-z0-9]+$/i.test(ultimo)) {
      ultimo = partes[partes.length - 2] || "";
    }

    return ultimo === "badbear.med" ? "" : ultimo;
  }

  const courseId = detectarCurso();
  if (!courseId) return;

  const candidatos = [
    body.dataset.courseLogo,
    `../assets/logos/cursos/${courseId}/logo.png`,
    body.dataset.courseLogoAlt,
    body.dataset.courseLogoFallback,
    "../dermatologia/badbear_logo.png"
  ].filter(Boolean);

  const unicos = [...new Set(candidatos)];

  function favicon(src) {
    let link = document.querySelector("link[data-bb-course-favicon]");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      link.setAttribute("data-bb-course-favicon", "");
      document.head.appendChild(link);
    }
    link.href = src;
  }

  function logoCabecera(src) {
    const selectores = [
      "[data-bb-brand]",
      ".cardio-brand",
      ".infecto-brand",
      ".nefro-brand",
      ".neuro-brand",
      ".psiq-brand",
      ".neumo-brand",
      ".trauma-brand",
      ".cxg-brand",
      ".batimix-brand",
      ".pato-brand",
      ".para-brand",
      ".fisio-brand",
      ".interna-brand",
      ".gastro-brand",
      ".marca"
    ];

    let brand = document.querySelector(selectores.join(","));

    if (!brand) {
      const header = document.querySelector("header");
      if (header) {
        brand = header.querySelector("a[href='../index.html'],a[href='index.html'],a");
      }
    }

    if (!brand) return;

    brand.classList.add("bb-auto-brand");

    let img = brand.querySelector("[data-bb-course-logo],.bb-auto-course-logo");
    if (!img) {
      img = document.createElement("img");
      img.className = "bb-auto-course-logo";
      img.setAttribute("data-bb-course-logo", "");
      img.alt = `Logo ${courseId} BADBEAR.MED`;
      brand.prepend(img);
    }

    img.src = src;
  }

  function logoHero(src) {
    const selectores = [
      "[data-bb-course-hero-logo]",
      ".cardio-visual",
      ".infecto-visual",
      ".nefro-visual",
      ".neuro-visual",
      ".psiq-visual",
      ".neumo-visual",
      ".trauma-visual",
      ".cxg-visual",
      ".batimix-visual",
      ".pato-visual",
      ".para-visual",
      ".fisio-visual",
      ".interna-visual",
      ".gastro-visual"
    ];

    const visual = document.querySelector(selectores.join(","));
    if (!visual) return;

    if (visual.matches("img")) {
      visual.src = src;
      return;
    }

    let img = visual.querySelector(".bb-auto-hero-logo");
    if (!img) {
      visual.textContent = "";
      img = document.createElement("img");
      img.className = "bb-auto-hero-logo";
      img.alt = `Emblema ${courseId} BADBEAR.MED`;
      visual.appendChild(img);
    }

    img.src = src;
  }

  function aplicar(src) {
    document.documentElement.style.setProperty(
      "--bb-watermark-image",
      `url("${src}")`
    );

    document.querySelectorAll("[data-bb-course-logo]").forEach((img) => {
      img.src = src;
    });

    favicon(src);
    logoCabecera(src);
    logoHero(src);
  }

  function probar(indice) {
    if (indice >= unicos.length) return;

    const src = unicos[indice];
    const prueba = new Image();

    prueba.onload = () => aplicar(src);
    prueba.onerror = () => probar(indice + 1);
    prueba.src = src;
  }

  probar(0);
})();