(() => {
  "use strict";

  const data = window.BADBEAR_INFECTO_RECURSOS || {pdfs:[], audios:[], playlist:""};
  const youtube = window.BADBEAR_INFECTO_YOUTUBE || [];

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[c]));

  function prettyResourceName(value) {
    return String(value || "")
      .replace(/^\s*\d+(?:[._-]\d+)?[._-]*/, "")
      .replace(/_/g, " ")
      .replace(/\b(?:PPT|PPRT|MP3)\b/gi, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function youtubeId(url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
      if (u.pathname.includes("/shorts/")) return u.pathname.split("/shorts/")[1].split("/")[0];
      return u.searchParams.get("v") || "";
    } catch { return ""; }
  }

  function youtubeThumb(url) {
    const id = youtubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
  }

  function renderPDF(filter="") {
    const grid = document.querySelector("#pdf-grid");
    const items = data.pdfs.filter(x => x.nombre.toLowerCase().includes(filter.toLowerCase()));
    document.querySelector("#pdf-count").textContent = `${data.pdfs.length} archivo(s) disponibles`;
    grid.innerHTML = items.length ? items.map(x => `
      <article class="bb-resource-card">
        <div class="meta">PDF</div>
        <h3>${esc(prettyResourceName(x.nombre))}</h3>
        <a href="${encodeURI(x.archivo)}" target="_blank" rel="noopener">Abrir PDF</a>
      </article>`).join("") : `<div class="bb-empty">No hay PDFs que coincidan con la b\u00fasqueda.</div>`;
  }

  function renderAudio(filter="") {
    const grid = document.querySelector("#audio-grid");
    const items = data.audios.filter(x => x.nombre.toLowerCase().includes(filter.toLowerCase()));
    document.querySelector("#audio-count").textContent = `${data.audios.length} audio(s) disponibles`;
    grid.innerHTML = items.length ? items.map(x => `
      <article class="bb-resource-card">
        <div class="meta">AUDIO</div>
        <h3>${esc(prettyResourceName(x.nombre))}</h3>
        <audio controls preload="metadata" src="${encodeURI(x.archivo)}"></audio>
      </article>`).join("") : `<div class="bb-empty">No hay audios que coincidan con la b\u00fasqueda.</div>`;
  }

  function renderYoutube(filter="") {
    const grid = document.querySelector("#youtube-grid");
    const items = youtube.filter(x => `${x.titulo || ""} ${x.tema || ""}`.toLowerCase().includes(filter.toLowerCase()));
    document.querySelector("#youtube-count").textContent = `${youtube.length} video(s) enlazados`;
    grid.innerHTML = items.length ? items.map(x => {
      const thumb = youtubeThumb(x.url);
      return `
      <article class="bb-resource-card">
        ${thumb ? `<img class="bb-youtube-thumb" src="${thumb}" alt="">` : ""}
        <div class="meta">YOUTUBE \u00b7 ${esc(x.tema || "Infectolog\u00eda")}</div>
        <h3>${esc(x.titulo || "Video de Infectolog\u00eda")}</h3>
        <a href="${esc(x.url)}" target="_blank" rel="noopener">Ver en YouTube</a>
      </article>`;
    }).join("") : `<div class="bb-empty">A\u00fan no hay enlaces de YouTube registrados.</div>`;
  }

  function youtubePlaylistEmbed(url) {
    if (!url) return "";
    try {
      const u = new URL(url);
      const list = u.searchParams.get("list");
      return list ? `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(list)}` : "";
    } catch { return ""; }
  }

  function renderPlaylist() {
    const box = document.querySelector("#playlist-box");
    const embed = youtubePlaylistEmbed(data.playlist);
    if (embed) {
      box.innerHTML = `<iframe src="${embed}" allowfullscreen loading="lazy"></iframe><p><a href="${esc(data.playlist)}" target="_blank" rel="noopener">Abrir playlist en YouTube</a></p>`;
    } else if (data.playlist) {
      box.innerHTML = `<p><a href="${esc(data.playlist)}" target="_blank" rel="noopener">Abrir playlist del curso</a></p>`;
    } else {
      box.innerHTML = `<p>A\u00fan falta registrar la URL de la playlist.</p>`;
    }
  }

  document.querySelectorAll(".bb-tabs button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".bb-tabs button").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".bb-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      document.querySelector(`#panel-${btn.dataset.tab}`).classList.add("active");
    });
  });

  document.querySelector("#pdf-search").addEventListener("input", e => renderPDF(e.target.value));
  document.querySelector("#audio-search").addEventListener("input", e => renderAudio(e.target.value));
  document.querySelector("#youtube-search").addEventListener("input", e => renderYoutube(e.target.value));

  renderPDF();
  renderAudio();
  renderYoutube();
  renderPlaylist();
})();
