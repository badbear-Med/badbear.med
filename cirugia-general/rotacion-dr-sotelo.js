/* Catálogo de la rotación. Los originales se conservan en el repositorio. */
(() => {
  "use strict";
  const categories = { documentos: "Abrir documento", audios: "Escuchar audio", videos: "Ver video" };
  const catalogURL = new URL("rotacion-dr-sotelo/materiales.json?v=20261002-material1", document.baseURI);
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
        if (category === "audios") {
          const card = document.createElement("article");
          card.className = "bb-sotelo-item";
          const title = document.createElement("strong");
          title.textContent = entry.titulo;
          const description = document.createElement("p");
          description.textContent = entry.descripcion || "";
          const player = document.createElement("audio");
          player.controls = true;
          player.preload = "none";
          player.src = url.href;
          player.setAttribute("aria-label", entry.titulo);
          player.style.width = "100%";
          const download = document.createElement("a");
          download.href = url.href;
          download.download = "";
          download.textContent = "Descargar audio MP3";
          card.append(title, description, player, download);
          if (typeof entry.original_manifest === "string") {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = "Descargar original M4A";
            const status = document.createElement("p");
            status.setAttribute("role", "status");
            status.setAttribute("aria-live", "polite");
            button.addEventListener("click", async () => {
              button.disabled = true;
              status.textContent = "Preparando el audio original…";
              let objectURL;
              try {
                const manifestURL = new URL(entry.original_manifest, catalogURL);
                const response = await fetch(manifestURL);
                if (!response.ok) throw new Error("Manifest");
                const manifest = await response.json();
                if (!Array.isArray(manifest.parts) || !manifest.parts.length) throw new Error("Parts");
                const buffers = [];
                for (let i = 0; i < manifest.parts.length; i++) {
                  const partURL = new URL(manifest.parts[i], manifestURL);
                  if (partURL.origin !== manifestURL.origin) throw new Error("Origin");
                  const part = await fetch(partURL);
                  if (!part.ok) throw new Error("Download");
                  buffers.push(await part.arrayBuffer());
                  status.textContent = "Preparando el audio original: " + (i + 1) + "/" + manifest.parts.length;
                }
                const blob = new Blob(buffers, { type: "audio/mp4" });
                if (blob.size !== manifest.size_bytes) throw new Error("Size");
                objectURL = URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.href = objectURL;
                anchor.download = manifest.filename;
                document.body.appendChild(anchor);
                anchor.click();
                anchor.remove();
                status.textContent = "Audio original preparado.";
                setTimeout(() => URL.revokeObjectURL(objectURL), 60000);
              } catch {
                if (objectURL) URL.revokeObjectURL(objectURL);
                status.textContent = "No se pudo descargar el original. Puedes usar el enlace MP3 e intentarlo nuevamente.";
              } finally {
                button.disabled = false;
              }
            });
            card.append(button, status);
          }
          resources.push(card);
          continue;
        }
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
