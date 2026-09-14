(() => {
  "use strict";
  const temas = Array.isArray(window.BADBEAR_TRAUMA_TEMAS) ? window.BADBEAR_TRAUMA_TEMAS : [];
  const grid = document.getElementById("trauma-temas");
  const buscar = document.getElementById("trauma-buscar");
  const filtro = document.getElementById("trauma-filtro");
  const totalTemas = document.getElementById("trauma-total-temas");
  const totalAreas = document.getElementById("trauma-total-areas");
  const completados = document.getElementById("trauma-completados");
  const porcentaje = document.getElementById("trauma-porcentaje");
  const normalizar = txt => String(txt || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const leidos = new Set(JSON.parse(localStorage.getItem("badbear_trauma_leidos") || "[]"));

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
      const op = document.createElement("option");
      op.value = area;
      op.textContent = area;
      filtro.appendChild(op);
    });
  }

  function tarjeta(t){
    const a = document.createElement("a");
    a.className = "trauma-topic";
    a.href = `tema.html?t=${encodeURIComponent(t.id)}`;
    a.innerHTML = `
      <div class="trauma-topic-top">
        <div class="trauma-topic-icon">${t.icono}</div>
        <span class="trauma-topic-area">Clase ${t.clase} · ${t.area}</span>
      </div>
      <h3>${t.titulo}</h3>
      <p>${t.descripcion}</p>
      <footer>${leidos.has(t.id) ? "✓ Revisado" : "Abrir clase →"}</footer>`;
    return a;
  }

  function render(){
    if(!grid) return;
    const q = normalizar(buscar?.value);
    const area = filtro?.value || "todos";
    const filtrados = temas.filter(t => {
      const texto = normalizar(`${t.titulo} ${t.descripcion} ${t.area} clase ${t.clase}`);
      return (!q || texto.includes(q)) && (area === "todos" || t.area === area);
    });
    grid.innerHTML = "";
    filtrados.forEach(t => grid.appendChild(tarjeta(t)));
    if(!filtrados.length){
      const vacio = document.createElement("div");
      vacio.className = "sin-temas";
      vacio.textContent = "No hay clases que coincidan con la búsqueda.";
      grid.appendChild(vacio);
    }
  }

  poblarFiltro();
  estadisticas();
  buscar?.addEventListener("input", render);
  filtro?.addEventListener("change", render);
  render();
})();
