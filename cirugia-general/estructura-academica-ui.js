document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("bb-cg-academic-structure");
  const groups = window.BADBEAR_CG_ACADEMIC_STRUCTURE || [];
  if (!root || !groups.length) return;

  const resourceDefs = [
    ["pdf", "PDF BADBEAR.MED", "📄"],
    ["ppt", "PPT", "📊"],
    ["audio", "Audio", "🎧"],
    ["video", "YouTube", "▶"]
  ];

  const makeResource = (item, key, label, icon) => {
    const url = item.resources && item.resources[key];
    if (url) {
      return '<a class="bb-cg-resource is-ready" href="' + url + '" target="_blank" rel="noopener">' +
        '<span>' + icon + '</span>' + label + '</a>';
    }
    return '<span class="bb-cg-resource is-pending" title="Recurso pendiente de cargar">' +
      '<span>' + icon + '</span>' + label + '<small>Pendiente</small></span>';
  };

  root.innerHTML = groups.map(group => {
    const cards = group.items.map(item => {
      const study = item.study
        ? '<a class="bb-cg-study-link" href="' + item.study + '">Abrir contenido desarrollado →</a>'
        : '<span class="bb-cg-study-link disabled">Contenido por incorporar</span>';

      return '<article class="bb-cg-academic-card ' + item.status + '">' +
        '<div class="bb-cg-academic-top">' +
          '<span class="bb-cg-academic-label">' + item.label + '</span>' +
          '<span class="bb-cg-status ' + item.status + '">' + item.statusText + '</span>' +
        '</div>' +
        '<h4>' + item.title + '</h4>' +
        '<div class="bb-cg-resource-grid">' +
          resourceDefs.map(def => makeResource(item, def[0], def[1], def[2])).join("") +
        '</div>' +
        study +
      '</article>';
    }).join("");

    return '<section class="bb-cg-academic-group" id="bb-cg-' + group.id + '">' +
      '<div class="bb-cg-academic-group-head">' +
        '<div><span>PROGRAMA ACADÉMICO</span><h3>' + group.title + '</h3><p>' + group.subtitle + '</p></div>' +
        '<strong>' + group.items.length + ' ' + (group.items.length === 1 ? 'unidad' : 'unidades') + '</strong>' +
      '</div>' +
      '<div class="bb-cg-academic-grid">' + cards + '</div>' +
    '</section>';
  }).join("");
});