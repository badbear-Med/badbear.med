/* Catálogo de la rotación. Los originales se conservan en el repositorio. */
(() => {
  "use strict";
  const categories = { documentos: "Abrir documento", audios: "Escuchar audio", videos: "Ver video" };
  const catalogURL = new URL("rotacion-dr-sotelo/materiales.json?v=20261008-r2-sotelo1", document.baseURI);
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


/* BB_SOTELO_PRINT_SELECTOR_V1 */
(() => {
  "use strict";
  const topics = [
    [1,"Intususcepción intestinal en adultos"],
    [2,"CD4: qué es y qué indica en la práctica clínica"],
    [3,"Cadenas ganglionares en tomografía: normalidad y neoplasia"],
    [4,"Gangrena de Fournier"],
    [5,"Fístulas anorrectales: anatomía, clasificación y tratamiento"],
    [6,"Signo de Infante Díaz y evaluación de irritación peritoneal"],
    [7,"Neoplasias del colon: nombre completo y distribución por segmentos"],
    [8,"Tratamiento del cáncer de colon según zona y estadio"],
    [9,"Coledocolitiasis: métodos endoscópicos de extracción y manejo"],
    [10,"Aumento del cáncer colorrectal, especialmente en jóvenes"],
    [11,"Tomografía, resonancia y elección de imagen en patología biliar"],
    [12,"Bezoares y tricobezoar gástrico"],
    [13,"Incisiones de laparotomía y Rockey-Davis"],
    [14,"Apendicitis y laparoscopia"],
    [15,"Colangitis, colecistitis, Tokio y síndrome de Mirizzi"],
    [16,"Proteína C reactiva (PCR): producción e interpretación"],
    [17,"Marcadores hepáticos y serología de hepatitis B"],
    [18,"Trastornos de coagulación en el paciente ictérico"],
    [19,"Quistes hepáticos: diagnóstico, intervención y postoperatorio"],
    [20,"Absceso anorrectal: drenaje, fístula y sospecha de Fournier"],
    [21,"Enfermedad pilonidal: quiste, seno, absceso y tratamiento"],
    [22,"Síndrome de Chilaiditi: signo radiológico, clínica y manejo"]
  ];
  const box = document.getElementById("sotelo-print-topics");
  const count = document.getElementById("sotelo-print-count");
  const go = document.getElementById("sotelo-print-go");
  if (!box || !count || !go) return;

  const selected = () => [...box.querySelectorAll('input[type="checkbox"]:checked')].map(i => i.value);
  const update = () => {
    const n = selected().length;
    count.textContent = n + (n === 1 ? " seleccionado" : " seleccionados");
    go.disabled = n === 0;
    go.textContent = n ? `Preparar impresión (${n})` : "Preparar impresión";
  };

  const frag = document.createDocumentFragment();
  topics.forEach(([n,title]) => {
    const label = document.createElement("label");
    label.className = "bb-sotelo-print-topic";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = String(n);
    input.addEventListener("change", update);
    const num = document.createElement("strong");
    num.textContent = "TEMA " + String(n).padStart(2,"0");
    const text = document.createElement("span");
    text.textContent = title;
    label.append(input,num,text);
    frag.appendChild(label);
  });
  box.appendChild(frag);

  document.getElementById("sotelo-print-all")?.addEventListener("click", () => {
    box.querySelectorAll('input[type="checkbox"]').forEach(i => i.checked = true);
    update();
  });
  document.getElementById("sotelo-print-none")?.addEventListener("click", () => {
    box.querySelectorAll('input[type="checkbox"]').forEach(i => i.checked = false);
    update();
  });
  go.addEventListener("click", () => {
    const ids = selected();
    if (!ids.length) return;
    const url = new URL("rotacion-dr-sotelo/imprimir-temas.html", document.baseURI);
    url.searchParams.set("temas", ids.join(","));
    window.open(url.href, "_blank", "noopener");
  });
  update();
})();
