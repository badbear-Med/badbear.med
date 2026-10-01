/* Catálogo de la rotación. Los originales se conservan en el repositorio. */
(() => {
  "use strict";
  const categories = { documentos: "Abrir documento", audios: "Escuchar audio", videos: "Ver video" };
  const catalogURL = new URL("rotacion-dr-sotelo/materiales.json", document.baseURI);
  fetch(catalogURL).then(response => {
    if (!response.ok) throw new Error("Catalog unavailable");
    return response.json();
  }).then(catalog => {
    for (const [category, action] of Object.entries(categories)) {
      const container = document.getElementById("sotelo-" + category);
      const entries = Array.isArray(catalog[category]) ? catalog[category] : [];
      const resources = [];
      for (const entry of entries) {
        if (!entry || typeof entry.titulo !== "string" || typeof entry.archivo !== "string") continue;
        let url;
        try { url = new URL(entry.archivo, catalogURL); } catch { continue; }
        if (!["https:", "http:"].includes(url.protocol)) continue;
        const link = document.createElement("a");
        link.className = "bb-sotelo-item";
        link.href = url.href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        const title = document.createElement("strong");
        title.textContent = entry.titulo;
        link.appendChild(title);
        if (typeof entry.descripcion === "string" && entry.descripcion.trim()) {
          const description = document.createElement("p");
          description.textContent = entry.descripcion;
          link.appendChild(description);
        }
        const label = document.createElement("span");
        label.textContent = action + " →";
        link.appendChild(label);
        resources.push(link);
      }
      if (container && resources.length) container.replaceChildren(...resources);
    }
  }).catch(() => {
    // Los avisos de preparación siguen disponibles si el catálogo no responde.
  });
})();
