(() => {
  "use strict";

  const body = document.body;
  if (!body) return;

  function detectarCurso() {
    if (body.dataset.courseId) return body.dataset.courseId;

    const partes = location.pathname.split("/").filter(Boolean);
    if (!partes.length) return "";

    const archivo = partes[partes.length - 1] || "";
    if (/\.[a-z0-9]+$/i.test(archivo)) {
      return partes[partes.length - 2] || "";
    }
    return archivo;
  }

  const courseId = detectarCurso();
  if (!courseId || courseId === "badbear.med") return;

  const logo = `../assets/logos/cursos/${courseId}/logo.png`;

  function normalizarSrc(valor) {
    try {
      return new URL(valor, location.href).pathname.toLowerCase();
    } catch (_) {
      return (valor || "").toLowerCase();
    }
  }

  function asegurarFavicon(src) {
    let link = document.querySelector('link[data-bb-course-favicon]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      link.setAttribute("data-bb-course-favicon", "");
      document.head.appendChild(link);
    }
    link.href = src;
  }

  function limpiarTextoPanda(nodo) {
    if (!nodo) return;
    nodo.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE && child.textContent) {
        child.textContent = child.textContent
          .replace(/ðŸ¼/g, "")
          .replace(/\s{2,}/g, " ");
      }
    });
  }

  function obtenerBrand() {
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
        brand = header.querySelector(
          "a[href='../index.html'],a[href='index.html'],a"
        );
      }
    }
    return brand;
  }

function asegurarLogoCabecera(src) {
  const brand = obtenerBrand();
  if (!brand) return null;

  brand.classList.add("bb-auto-brand");
  limpiarTextoPanda(brand);

  let img = brand.querySelector("[data-bb-course-logo], .bb-auto-course-logo, img");

  if (!img) {
    img = document.createElement("img");
    brand.prepend(img);
  }

  img.classList.add("bb-auto-course-logo");
  img.setAttribute("data-bb-course-logo", "");
  img.alt = `Logo ${courseId} BADBEAR.MED`;
  img.src = src;

  // IMPORTANTE: borrar cualquier otro logo o panda dentro de la marca
  const todasLasImagenes = Array.from(brand.querySelectorAll("img"));
  todasLasImagenes.forEach((item) => {
    if (item !== img) item.remove();
  });

  return img;
}
  function limpiarPandasGenericosEnCabecera(src, logoCabecera) {
    const header = document.querySelector("header");
    if (!header) return;

    const logoActual = normalizarSrc(src);

    Array.from(header.querySelectorAll("img")).forEach((img) => {
      if (img === logoCabecera) return;
      if (img.closest(".bb-auto-hero-logo")) return;

      const ruta = normalizarSrc(img.getAttribute("src") || "");
      const esMismoLogo = ruta.endsWith(`/assets/logos/cursos/${courseId}/logo.png`) || ruta === logoActual;
      if (esMismoLogo) return;

      const esGenerico =
        ruta.includes("badbear") ||
        ruta.includes("logo") ||
        ruta.includes("panda") ||
        ruta.includes("/principal/");

      if (esGenerico) {
        img.remove();
      }
    });

    // TambiÃ©n limpia emojis panda residuales en nodos cercanos.
    limpiarTextoPanda(header);
  }

  function asegurarHero(src) {
    const visual = document.querySelector([
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
    ].join(","));

    if (!visual) return;

    if (visual.matches("img")) {
      visual.src = src;
      visual.classList.add("bb-auto-hero-logo");
      return;
    }

    let img = visual.querySelector(".bb-auto-hero-logo, [data-bb-course-logo]");

    if (!img) {
      visual.textContent = "";
      img = document.createElement("img");
      img.className = "bb-auto-hero-logo";
      img.alt = `Logo ${courseId} BADBEAR.MED`;
      visual.appendChild(img);
    }

    img.src = src;
  }

  function asegurarSello(src) {
    let sello = document.getElementById("bb-course-watermark");

    if (!sello) {
      sello = document.createElement("img");
      sello.id = "bb-course-watermark";
      sello.alt = "";
      sello.setAttribute("aria-hidden", "true");
      document.body.appendChild(sello);
    }

    sello.src = src;
  }

  function limpiarSellosLegacy() {
    if (courseId !== "cirugia-pediatrica") return;

    const elementos = Array.from(document.querySelectorAll("body *"));

    elementos.forEach((el) => {
      try {
        const normal = getComputedStyle(el);
        const before = getComputedStyle(el, "::before");
        const after = getComputedStyle(el, "::after");

        const bgNormal = (normal.backgroundImage || "").toLowerCase();
        const bgBefore = (before.backgroundImage || "").toLowerCase();
        const bgAfter = (after.backgroundImage || "").toLowerCase();

        const esLegacy = (bg) => {
          if (!bg || bg === "none") return false;
          const pareceLogo =
            bg.includes("badbear") ||
            bg.includes("logo") ||
            bg.includes("marca");
          const esLogoActual =
            bg.includes("/assets/logos/cursos/cirugia-pediatrica/logo.png");
          return pareceLogo && !esLogoActual;
        };

        if (esLegacy(bgNormal)) el.classList.add("bb-hide-legacy-bg");
        if (esLegacy(bgBefore)) el.classList.add("bb-hide-legacy-before");
        if (esLegacy(bgAfter)) el.classList.add("bb-hide-legacy-after");
      } catch (_) {}
    });
  }

  function aplicar(src) {
    document.documentElement.style.setProperty(
      "--bb-watermark-image",
      `url("${src}")`
    );

    document.querySelectorAll("[data-bb-course-logo]").forEach((img) => {
      img.src = src;
    });

    asegurarFavicon(src);
    const logoCabecera = asegurarLogoCabecera(src);
    limpiarPandasGenericosEnCabecera(src, logoCabecera);
    asegurarHero(src);
    asegurarSello(src);

    requestAnimationFrame(() => {
      limpiarPandasGenericosEnCabecera(src, logoCabecera);
      limpiarSellosLegacy();
      setTimeout(() => {
        limpiarPandasGenericosEnCabecera(src, logoCabecera);
        limpiarSellosLegacy();
      }, 250);
    });
  }

  const prueba = new Image();
  prueba.onload = () => aplicar(logo);
  prueba.src = logo;
})();
/* BADBEAR.MED - LIMPIEZA RECURSIVA PANDA V8 */
(() => {
  "use strict";

  function limpiarPandaCabecera() {
    const header = document.querySelector("header");
    if (!header) return;

    const walker = document.createTreeWalker(
      header,
      NodeFilter.SHOW_TEXT
    );

    const nodos = [];
    let nodo;

    while ((nodo = walker.nextNode())) {
      nodos.push(nodo);
    }

    nodos.forEach((texto) => {
      if (!texto.nodeValue) return;

      const limpio = texto.nodeValue
        .replace(/ðŸ¼/g, "")
        .replace(/\s{2,}/g, " ");

      if (limpio !== texto.nodeValue) {
        texto.nodeValue = limpio;
      }
    });

    header.querySelectorAll("span, i, b, strong").forEach((el) => {
      const contenido = (el.textContent || "").trim();
      if (contenido === "ðŸ¼") {
        el.remove();
      }
    });
  }

  limpiarPandaCabecera();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", limpiarPandaCabecera, { once: true });
  }

  requestAnimationFrame(() => {
    limpiarPandaCabecera();
    setTimeout(limpiarPandaCabecera, 150);
    setTimeout(limpiarPandaCabecera, 500);
  });

  const header = document.querySelector("header");
  if (header) {
    const observer = new MutationObserver(() => limpiarPandaCabecera());
    observer.observe(header, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }
})();

/* BADBEAR.MED - DETECTOR PSEUDOELEMENTO PANDA V12 */
(() => {
  "use strict";

  function contienePanda(content) {
    if (!content || content === "none" || content === "normal") return false;

    const limpio = String(content).replace(/^["']|["']$/g, "");
    return Array.from(limpio).some((ch) => ch.codePointAt(0) === 0x1F43C);
  }

  function limpiarPseudoelementosPanda() {
    const header = document.querySelector("header");
    if (!header) return;

    const elementos = [header, ...header.querySelectorAll("*")];

    elementos.forEach((el) => {
      try {
        const before = getComputedStyle(el, "::before").content;
        const after = getComputedStyle(el, "::after").content;

        if (contienePanda(before)) {
          el.classList.add("bb-no-panda-before");
        }

        if (contienePanda(after)) {
          el.classList.add("bb-no-panda-after");
        }
      } catch (_) {}
    });
  }

  limpiarPseudoelementosPanda();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", limpiarPseudoelementosPanda, {
      once: true
    });
  }

  requestAnimationFrame(() => {
    limpiarPseudoelementosPanda();
    setTimeout(limpiarPseudoelementosPanda, 100);
    setTimeout(limpiarPseudoelementosPanda, 400);
  });

  const header = document.querySelector("header");
  if (header) {
    const observer = new MutationObserver(limpiarPseudoelementosPanda);
    observer.observe(header, {
      childList: true,
      subtree: true,
      attributes: true
    });
  }
})();

/* BADBEAR.MED - LIMPIEZA GRAFICA CABECERA V13 */
(() => {
  "use strict";

  function getBrandRoot() {
    const header = document.querySelector("header");
    if (!header) return null;

    const courseLogo = header.querySelector(
      '[data-bb-course-logo], .bb-auto-course-logo'
    );
    if (!courseLogo) return null;

    let node = courseLogo.parentElement;

    while (node && node !== header) {
      const text = (node.textContent || "").replace(/\s+/g, " ").trim();

      if (/BADBEAR/i.test(text)) {
        return { root: node, logo: courseLogo };
      }

      node = node.parentElement;
    }

    return { root: courseLogo.parentElement || header, logo: courseLogo };
  }

  function isCourseLogo(el, logo) {
    return el === logo || el.contains?.(logo) || logo.contains?.(el);
  }

  function hideSecondaryGraphic(el) {
    el.style.setProperty("display", "none", "important");
    el.style.setProperty("visibility", "hidden", "important");
    el.setAttribute("aria-hidden", "true");
  }

  function limpiar() {
    const result = getBrandRoot();
    if (!result) return;

    const { root, logo } = result;

    // 1) Elimina cualquier imagen/SVG/icono adicional dentro de la marca.
    root.querySelectorAll(
      'img,svg,picture,object,canvas,[role="img"]'
    ).forEach((el) => {
      if (!isCourseLogo(el, logo)) {
        hideSecondaryGraphic(el);
      }
    });

    // 2) Elimina pequeÃ±os elementos con imagen de fondo.
    root.querySelectorAll("*").forEach((el) => {
      if (isCourseLogo(el, logo)) return;

      try {
        const cs = getComputedStyle(el);
        const bg = cs.backgroundImage || "none";
        const rect = el.getBoundingClientRect();

        if (
          bg !== "none" &&
          rect.width > 0 &&
          rect.height > 0 &&
          rect.width <= 90 &&
          rect.height <= 90
        ) {
          el.style.setProperty("background-image", "none", "important");
        }
      } catch (_) {}
    });

    // 3) Borra cualquier nodo textual de panda si reaparece.
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT
    );

    const textNodes = [];
    let n;
    while ((n = walker.nextNode())) textNodes.push(n);

    textNodes.forEach((textNode) => {
      if (!textNode.nodeValue) return;
      textNode.nodeValue = textNode.nodeValue
        .replace(/ðŸ¼/g, "")
        .replace(/\s{2,}/g, " ");
    });

    // 4) Mantiene visible el logo especÃ­fico del curso.
    logo.style.removeProperty("visibility");
    logo.style.setProperty("display", "block", "important");
  }

  function ejecutarVariasVeces() {
    limpiar();
    requestAnimationFrame(limpiar);
    setTimeout(limpiar, 100);
    setTimeout(limpiar, 350);
    setTimeout(limpiar, 900);
  }

  ejecutarVariasVeces();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ejecutarVariasVeces, {
      once: true
    });
  }

  const header = document.querySelector("header");
  if (header) {
    let bloqueado = false;

    const observer = new MutationObserver(() => {
      if (bloqueado) return;
      bloqueado = true;

      requestAnimationFrame(() => {
        limpiar();
        bloqueado = false;
      });
    });

    observer.observe(header, {
      childList: true,
      subtree: true,
      attributes: true
    });
  }
})();