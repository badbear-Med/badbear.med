document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("bb-cg-academic-structure");
  const groups = window.BADBEAR_CG_ACADEMIC_STRUCTURE || [];
  if (!root || !groups.length) return;

  const esc = s => String(s || "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  const linkResource = (url,label,icon) =>
    url
      ? '<a class="bb-cg-resource is-ready" href="' + esc(url) + '" target="_blank" rel="noopener"><span>' + icon + '</span><b>' + label + '</b></a>'
      : '<span class="bb-cg-resource is-pending"><span>' + icon + '</span><b>' + label + '</b><small>Pendiente</small></span>';

  const audioResource = url =>
    url
      ? '<div class="bb-cg-audio-box"><div class="bb-cg-audio-label"><span>🎧</span><b>Audio de la clase</b></div><audio controls preload="none" src="' + esc(url) + '"></audio></div>'
      : '<div class="bb-cg-audio-box pending"><div class="bb-cg-audio-label"><span>🎧</span><b>Audio</b><small>Pendiente</small></div></div>';

  const videoResource = url =>
    url
      ? '<a class="bb-cg-resource bb-cg-video is-ready" href="' + esc(url) + '" target="_blank" rel="noopener"><span>▶</span><b>Ver video</b></a>'
      : '<span class="bb-cg-resource bb-cg-video is-pending"><span>▶</span><b>Video / YouTube</b><small>Pendiente</small></span>';

  root.innerHTML = groups.map(group => {
    const cards = group.items.map(item => {
      const r = item.resources || {};
      const study = item.study
        ? '<a class="bb-cg-study-link" href="' + esc(item.study) + '">Abrir desarrollo teórico anterior →</a>'
        : '<span class="bb-cg-study-link disabled">Sin desarrollo teórico anterior asociado</span>';

      return '<article class="bb-cg-academic-card ' + esc(item.status) + '">' +
        '<div class="bb-cg-academic-top"><span class="bb-cg-academic-label">' + esc(item.label) + '</span><span class="bb-cg-status ' + esc(item.status) + '">' + esc(item.statusText) + '</span></div>' +
        '<h4>' + esc(item.title) + '</h4>' +
        '<div class="bb-cg-resource-grid">' +
          linkResource(r.pdf,"PDF BADBEAR.MED","📄") +
          linkResource(r.ppt,"PPT / diapositivas","📊") +
          videoResource(r.video) +
        '</div>' +
        audioResource(r.audio) +
        study +
      '</article>';
    }).join("");

    return '<section class="bb-cg-academic-group" id="bb-cg-' + esc(group.id) + '">' +
      '<div class="bb-cg-academic-group-head"><div><span>NUEVO SEGMENTO · RECURSOS</span><h3>' + esc(group.title) + '</h3><p>' + esc(group.subtitle) + '</p></div><strong>' + group.items.length + ' unidades</strong></div>' +
      '<div class="bb-cg-academic-grid">' + cards + '</div></section>';
  }).join("");
});