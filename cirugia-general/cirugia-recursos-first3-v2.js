(() => {
"use strict";
const e = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fileURL = s => e(encodeURI(s));
const grid = (title, cards) => cards ? `<h3 class="cg-resource-title">${title}</h3><div class="cg-resource-grid">${cards}</div>` : "";
window.BADBEAR_CG_RENDER_RESOURCES = function(id, element) {
  if (!element) return;
  const r = (window.BADBEAR_CG_RESOURCES || {})[id] || {};
  const files = (items, type, label) => (items || []).filter(x => x.file).map(x => `<article class="cg-resource-card"><span class="cg-type">${type}</span><h3>${e(x.title)}</h3><a href="${fileURL(x.file)}" target="_blank" rel="noopener">${label}</a></article>`).join("");
  const audios = (r.audios || []).filter(x => x.file).map(x => `<article class="cg-resource-card"><span class="cg-type">AUDIO</span><h3>${e(x.title)}</h3><audio controls preload="metadata" src="${fileURL(x.file)}"></audio><a href="${fileURL(x.file)}" target="_blank" rel="noopener">Abrir audio</a></article>`).join("");
  const youtubeId = value => {
    try {
      const u = new URL(value, document.baseURI);
      const h = u.hostname.toLowerCase().replace(/^www\./,"");
      let id = "";
      if (h === "youtu.be") id = u.pathname.split("/")[1] || "";
      else if (h === "youtube.com" || h === "m.youtube.com" || h === "youtube-nocookie.com") {
        if (u.pathname === "/watch") id = u.searchParams.get("v") || "";
        else if (/^\\/(embed|shorts|live)\\//.test(u.pathname)) id = u.pathname.split("/")[2] || "";
      }
      return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : "";
    } catch { return ""; }
  };
  const videos = (r.videos || []).filter(x => x.url).map(x => {
    const id = youtubeId(x.url);
    if (id) return `<article class="cg-resource-card cg-video-card" style="grid-column:1/-1"><span class="cg-type">VIDEO DE LA CLASE</span><h3>${e(x.title)}</h3><iframe src="https://www.youtube.com/embed/${id}?origin=https%3A%2F%2Fwajomea.group" title="${e(x.title)}" style="display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:12px" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></article>`;
    const u = fileURL(x.url);
    return `<article class="cg-resource-card"><span class="cg-type">VIDEO</span><h3>${e(x.title)}</h3><video controls playsinline preload="metadata" style="width:100%;max-width:100%" src="${u}"></video></article>`;
  }).join("");
  const content = grid("PDF", files(r.pdfs, "PDF", "Abrir PDF")) + grid("PPT / diapositivas", files(r.slides, "PPT", "Abrir diapositivas")) + grid("Audio de la clase", audios) + grid("Video de la clase", videos);
  element.hidden = !content && !r.videoIssue;
  element.className = "cg-resources";
  element.innerHTML = element.hidden ? "" : `<div class="cg-resource-head"><span>RECURSOS PARA ESTUDIAR</span><h2>Material de la clase</h2></div>${content}${r.videoIssue ? `<p class="cg-notice" role="status">${e(r.videoIssue)}</p>` : ""}`;
};
const element = document.getElementById("bb-class-resources");
if (element && element.dataset.classId) window.BADBEAR_CG_RENDER_RESOURCES(element.dataset.classId, element);
})();
