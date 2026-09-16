(() => {
  "use strict";

  function findNavCard() {
    const heads = [...document.querySelectorAll("h1,h2,h3,h4,strong,b")];
    const heading = heads.find(el => (el.textContent || "").trim() === "Navegación");
    if (!heading) return null;

    let node = heading;
    while (node && node !== document.body) {
      const text = (node.textContent || "").replace(/\s+/g, " ").trim();
      if (
        text.includes("Navegación") &&
        text.includes("Todos los temas") &&
        text.includes("Marcar como revisado") &&
        node.children &&
        node.children.length >= 2
      ) {
        return node;
      }
      node = node.parentElement;
    }
    return heading.parentElement;
  }

  function hasVisibleChild(el) {
    if (!el) return false;
    return [...el.children].some(child => {
      const s = getComputedStyle(child);
      return s.display !== "none" && s.visibility !== "hidden";
    });
  }

  function reflow() {
    const theory = document.querySelector("#bb-topic-theory");
    if (!theory || document.querySelector(".bb-study-layout")) return;

    const resources = document.querySelector("#bb-topic-resources");
    const navCard = findNavCard();
    const parent = theory.parentElement;
    if (!parent) return;

    const oldNavParent = navCard ? navCard.parentElement : null;

    const layout = document.createElement("div");
    layout.className = "bb-study-layout";

    const left = document.createElement("div");
    left.className = "bb-study-main";

    const side = document.createElement("aside");
    side.className = "bb-study-sidebar";
    side.setAttribute("aria-label", "Navegación del tema");

    parent.insertBefore(layout, theory);
    layout.appendChild(left);
    layout.appendChild(side);

    left.appendChild(theory);
    if (resources) left.appendChild(resources);
    if (navCard) side.appendChild(navCard);

    if (!navCard) {
      side.style.display = "none";
      layout.style.gridTemplateColumns = "1fr";
    }

    // Oculta el contenedor viejo si solo quedaron bloques ya ocultos/vacíos.
    if (oldNavParent && oldNavParent !== parent && oldNavParent !== side) {
      setTimeout(() => {
        if (!hasVisibleChild(oldNavParent)) {
          oldNavParent.style.display = "none";
        }
      }, 50);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(reflow, 350), {once:true});
  } else {
    setTimeout(reflow, 350);
  }

  setTimeout(reflow, 900);
})();
