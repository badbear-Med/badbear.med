(() => {
  "use strict";
  const temas = Array.isArray(window.BADBEAR_NEURO_TEMAS) ? window.BADBEAR_NEURO_TEMAS : [];
  const grid = document.getElementById("neuro-temas");
  const buscar = document.getElementById("neuro-buscar");
  const filtro = document.getElementById("neuro-filtro");
  const totalTemas = document.getElementById("neuro-total-temas");
  const totalAreas = document.getElementById("neuro-total-areas");
  const completados = document.getElementById("neuro-completados");
  const porcentaje = document.getElementById("neuro-porcentaje");

  const normalizar = (txt) => String(txt || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const leidos = new Set(JSON.parse(localStorage.getItem("badbear_neuro_leidos") || "[]"));

  function actualizarEstadisticas(){
    const areas = new Set(temas.map(t => t.area));
    if(totalTemas) totalTemas.textContent = temas.length;
    if(totalAreas) totalAreas.textContent = areas.size;
    if(completados) completados.textContent = leidos.size;
    if(porcentaje) porcentaje.textContent = `${temas.length ? Math.round((leidos.size/temas.length)*100) : 0}%`;
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
    a.className = "neuro-topic";
    a.href = `tema.html?t=${encodeURIComponent(t.id)}`;
    a.innerHTML = `
      <div class="neuro-topic-top">
        <div class="neuro-topic-icon">${t.icono}</div>
        <span class="neuro-topic-area">${t.area}</span>
      </div>
      <h3>${t.titulo}</h3>
      <p>${t.descripcion}</p>
      <footer>${leidos.has(t.id) ? "✓ Revisado" : "Abrir tema →"}</footer>
    `;
    return a;
  }

  function render(){
    if(!grid) return;
    const q = normalizar(buscar?.value);
    const area = filtro?.value || "todos";
    const filtrados = temas.filter(t => {
      const texto = normalizar(`${t.titulo} ${t.descripcion} ${t.area}`);
      return (!q || texto.includes(q)) && (area === "todos" || t.area === area);
    });
    grid.innerHTML = "";
    filtrados.forEach(t => grid.appendChild(tarjeta(t)));
    if(!filtrados.length){
      const vacio = document.createElement("div");
      vacio.className = "sin-temas";
      vacio.textContent = "No hay temas que coincidan con la búsqueda.";
      grid.appendChild(vacio);
    }
  }

  poblarFiltro();
  actualizarEstadisticas();
  buscar?.addEventListener("input", render);
  filtro?.addEventListener("change", render);
  render();
})();