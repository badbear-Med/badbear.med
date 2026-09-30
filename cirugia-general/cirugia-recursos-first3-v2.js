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
  const videos = (r.videos || []).filter(x => x.url && window.BADBEAR_CG_VIDEO_URL(x.url)).map(x => `<article class="cg-resource-card"><span class="cg-type">VIDEO</span><h3>${e(x.title)}</h3><a href="${e(x.url)}" target="_blank" rel="noopener">${/youtu/i.test(x.url) ? "Ver video en YouTube" : "Abrir video"}</a></article>`).join("");
  const content = grid("PDF", files(r.pdfs, "PDF", "Abrir PDF")) + grid("PPT / diapositivas", files(r.slides, "PPT", "Abrir diapositivas")) + grid("Audio de la clase", audios) + grid("Video de la clase", videos);
  element.hidden = !content && !r.videoIssue;
  element.className = "cg-resources";
  element.innerHTML = element.hidden ? "" : `<div class="cg-resource-head"><span>RECURSOS PARA ESTUDIAR</span><h2>Material de la clase</h2></div>${content}${r.videoIssue ? `<p class="cg-notice" role="status">${e(r.videoIssue)}</p>` : ""}`;
};
const element = document.getElementById("bb-class-resources");
if (element && element.dataset.classId) window.BADBEAR_CG_RENDER_RESOURCES(element.dataset.classId, element);
})();
