(() => {
  "use strict";
  const temas = Array.isArray(window.BADBEAR_PARASITO_TEMAS) ? window.BADBEAR_PARASITO_TEMAS : [];
  const grid = document.getElementById("par-temas");
  const buscar = document.getElementById("par-buscar");
  const filtro = document.getElementById("par-filtro");
  const totalTemas = document.getElementById("par-total-temas");
  const totalAreas = document.getElementById("par-total-areas");
  const completados = document.getElementById("par-completados");
  const porcentaje = document.getElementById("par-porcentaje");
  const normalizar = txt => String(txt || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const leidos = new Set(JSON.parse(localStorage.getItem("badbear_parasito_leidos") || "[]"));
  function estadisticas(){
    const areas = new Set(temas.map(t => t.area));
    if(totalTemas) totalTemas.textContent = temas.length;
    if(totalAreas) totalAreas.textContent = areas.size;
    if(completados) completados.textContent = leidos.size;
    if(porcentaje) porcentaje.textContent = `${temas.length ? Math.round((leidos.size / temas.length) * 100) : 0}%`;
  }
  function poblarFiltro(){
    if(!filtro) return;
    [...new Set(temas.map(t => t.area))].sort().forEach(area => {
      const op = document.createElement("option"); op.value = area; op.textContent = area; filtro.appendChild(op);
    });
  }
  function tarjeta(t){
    const a = document.createElement("a"); a.className = "par-topic"; a.href = `tema.html?t=${encodeURIComponent(t.id)}`;
    a.innerHTML = `<div class="par-topic-top"><div class="par-topic-icon">${t.icono}</div><span class="par-topic-area">${t.area}</span></div><h3>${t.titulo}</h3><p>${t.descripcion}</p><footer>${leidos.has(t.id) ? "✓ Revisado" : "Abrir tema →"}</footer>`;
    return a;
  }
  function render(){
    if(!grid) return;
    const q = normalizar(buscar?.value), area = filtro?.value || "todos";
    const filtrados = temas.filter(t => (!q || normalizar(`${t.titulo} ${t.descripcion} ${t.area}`).includes(q)) && (area === "todos" || t.area === area));
    grid.innerHTML = ""; filtrados.forEach(t => grid.appendChild(tarjeta(t)));
    if(!filtrados.length){const d=document.createElement("div");d.className="sin-temas";d.textContent="No hay temas que coincidan con la búsqueda.";grid.appendChild(d)}
  }
  poblarFiltro(); estadisticas(); buscar?.addEventListener("input",render); filtro?.addEventListener("change",render); render();
})();
