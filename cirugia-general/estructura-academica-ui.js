document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("bb-cg-academic-structure");
  const groups = window.BADBEAR_CG_ACADEMIC_STRUCTURE || [];
  if (!root || !groups.length) return;

  const esc = s => String(s || "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  const linkResource = (url,label,icon,pendingText="Pendiente") =>
    url
      ? '<a class="bb-cg-resource is-ready" href="' + esc(url) + '" target="_blank" rel="noopener"><span>' + icon + '</span><b>' + label + '</b></a>'
      : '<span class="bb-cg-resource is-pending"><span>' + icon + '</span><b>' + label + '</b><small>' + pendingText + '</small></span>';

  const audioResource = url => {
    if (!url) {
      return '<div class="bb-cg-audio-box pending"><div class="bb-cg-audio-label"><span>🎧</span><b>Audio</b><small>Pendiente</small></div></div>';
    }
    const type = /\.m4a(?:$|\?)/i.test(url) ? 'audio/mp4' : /\.mp3(?:$|\?)/i.test(url) ? 'audio/mpeg' : '';
    const source = type
      ? '<source src="' + esc(url) + '" type="' + type + '">'
      : '<source src="' + esc(url) + '">';
    return '<div class="bb-cg-audio-box">' +
      '<div class="bb-cg-audio-label"><span>🎧</span><b>Audio de la clase</b><a class="bb-cg-audio-open" href="' + esc(url) + '" target="_blank" rel="noopener">Abrir audio ↗</a></div>' +
      '<audio controls preload="metadata">' + source + 'Tu navegador no pudo reproducir este audio.</audio>' +
      '</div>';
  };

  const videoResource = url => {
    const valid = window.BADBEAR_CG_VIDEO_URL(url);
    if (valid) return '<a class="bb-cg-resource bb-cg-video is-ready" href="' + esc(valid) + '" target="_blank" rel="noopener"><span>▶</span><b>Ver video</b></a>';
    return '<span class="bb-cg-resource bb-cg-video is-pending"><span>▶</span><b>' + (url ? 'Video no disponible' : 'Video / YouTube') + '</b><small>' + (url ? 'Enlace incompleto' : 'Pendiente') + '</small></span>';
  };

  root.innerHTML = groups.map(group => {
    const cards = group.items.map(item => {
      const r = item.resources || {};
      const statusText = r.video && !window.BADBEAR_CG_VIDEO_URL(r.video) ? item.statusText.replace(" + video", "") : item.statusText;

      return '<article class="bb-cg-academic-card ' + esc(item.status) + '">' +
        '<div class="bb-cg-academic-top"><span class="bb-cg-academic-label">' + esc(item.label) + '</span><span class="bb-cg-status ' + esc(item.status) + '">' + esc(statusText) + '</span></div>' +
        '<h4>' + esc(item.title) + '</h4>' +
        '<div class="bb-cg-resource-grid">' +
          linkResource(item.study,"Ver desarrollo teórico","📘","Pendiente") +
          linkResource(r.pdf,"PDF BADBEAR.MED","📄","Pendiente") +
          linkResource(r.ppt,"PPT / diapositivas","📊","Pendiente") +
          videoResource(r.video) +
        '</div>' +
        audioResource(r.audio) +
      '</article>';
    }).join("");

    return '<section class="bb-cg-academic-group" id="bb-cg-' + esc(group.id) + '">' +
      '<div class="bb-cg-academic-group-head"><div><span>NUEVO SEGMENTO · RECURSOS</span><h3>' + esc(group.title) + '</h3><p>' + esc(group.subtitle) + '</p></div><strong>' + group.items.length + ' unidades</strong></div>' +
      '<div class="bb-cg-academic-grid">' + cards + '</div></section>';
  }).join("");
});