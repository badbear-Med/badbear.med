(() => {
  "use strict";

  const all = window.BADBEAR_INFECTOLOGIA_RECURSOS_TEMA || {};
  const topicId = new URLSearchParams(location.search).get("t");
  if (!topicId || !all[topicId]) return;

  const res = all[topicId];
  const main = document.querySelector("main");
  if (!main || document.querySelector("#bb-topic-resources")) return;

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[c]));

  function prettyName(value) {
    let s = String(value || "")
      .replace(/^\s*\d+(?:[._-]\d+)?[._-]*/, "")
      .replace(/_/g, " ")
      .replace(/\b(?:PPT|PPRT|MP3)\b/gi, "")
      .replace(/\s+/g, " ")
      .trim();

    const rules = [
      [/Microbiology and Antibiotics Survival Manual/i, "Microbiolog\u00eda y antibi\u00f3ticos: gu\u00eda cl\u00ednica"],
      [/Antiviral Clinical Guide/i, "Antivirales: gu\u00eda cl\u00ednica"],
      [/Systemic Antifungal Pharmacology/i, "Antif\u00fangicos sist\u00e9micos: farmacolog\u00eda"],
      [/HIV AIDS Master Class/i, "VIH/SIDA: bases y cl\u00ednica"],
      [/Gu.a de VIH y TARGA/i, "VIH/SIDA: TARGA e infecciones oportunistas"],
      [/Brucelosis Monograf.a Cl.nica/i, "Brucelosis: monograf\u00eda cl\u00ednica"],
      [/Ofidismo Clinical Masterclass/i, "Ofidismo: clase cl\u00ednica"],
      [/Gu.a GEAIP/i, "Enfermedad diarreica aguda: gu\u00eda cl\u00ednica"],
      [/Mononucleosis Clinical Essentials/i, "Mononucleosis infecciosa: puntos esenciales"],
      [/Febrile Patient Clinical Guide/i, "Paciente febril: gu\u00eda cl\u00ednica"],
      [/Manual Cl.nico de Arbovirosis Emergentes/i, "Arbovirosis emergentes: manual cl\u00ednico"]
    ];

    for (const [pattern, replacement] of rules) {
      if (pattern.test(s)) return replacement;
    }
    return s;
  }

  function youtubeId(url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
      return u.searchParams.get("v") || "";
    } catch {
      return "";
    }
  }

  const pdfHtml = res.pdfs.length ? res.pdfs.map(x => `
    <article class="bb-topic-resource-card">
      <span class="bb-resource-type">PDF</span>
      <h3>${esc(prettyName(x.nombre))}</h3>
      <a href="${encodeURI(x.archivo)}" target="_blank" rel="noopener">Abrir PDF</a>
    </article>`).join("") : `<div class="bb-topic-empty">A\u00fan no hay PDF asociado a este tema.</div>`;

  const audioHtml = res.audios.length ? res.audios.map(x => `
    <article class="bb-topic-resource-card">
      <span class="bb-resource-type">AUDIO</span>
      <h3>${esc(prettyName(x.nombre))}</h3>
      <audio controls preload="metadata" src="${encodeURI(x.archivo)}"></audio>
    </article>`).join("") : `<div class="bb-topic-empty">A\u00fan no hay audio asociado a este tema.</div>`;

  const ytHtml = res.youtube.length ? res.youtube.map(x => {
    const id = youtubeId(x.url);
    return `
      <article class="bb-topic-resource-card">
        ${id ? `<img class="bb-topic-thumb" src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="">` : ""}
        <span class="bb-resource-type">YOUTUBE</span>
        <h3>${esc(x.titulo)}</h3>
        <a href="${esc(x.url)}" target="_blank" rel="noopener">Ver video</a>
      </article>`;
  }).join("") : `<div class="bb-topic-empty">A\u00fan no hay video enlazado espec\u00edficamente a este tema.</div>`;

  const section = document.createElement("section");
  section.id = "bb-topic-resources";
  section.className = "bb-topic-resources";
  section.innerHTML = `
    <div class="bb-topic-resources-head">
      <div>
        <span class="bb-resource-kicker">BADBEAR.MED \u00b7 MATERIAL DEL TEMA</span>
        <h2>Recursos para estudiar</h2>
        <p>PDF, audios y videos relacionados con este tema.</p>
      </div>
      <a class="bb-playlist-link" href="${esc(all._playlist || "#")}" target="_blank" rel="noopener">Playlist completa</a>
    </div>

    <div class="bb-resource-subsection">
      <h3>PDF</h3>
      <div class="bb-topic-resource-grid">${pdfHtml}</div>
    </div>

    <div class="bb-resource-subsection">
      <h3>Audios</h3>
      <div class="bb-topic-resource-grid">${audioHtml}</div>
    </div>

    <div class="bb-resource-subsection">
      <h3>Videos</h3>
      <div class="bb-topic-resource-grid">${ytHtml}</div>
    </div>
  `;

  main.appendChild(section);
})();
