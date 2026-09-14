(() => {
  "use strict";
  const temas=Array.isArray(window.BADBEAR_BATIMIX_TEMAS)?window.BADBEAR_BATIMIX_TEMAS:[];
  const grid=document.getElementById("bat-temas"),buscar=document.getElementById("bat-buscar"),filtro=document.getElementById("bat-filtro");
  const totalTemas=document.getElementById("bat-total-temas"),totalAreas=document.getElementById("bat-total-areas"),completados=document.getElementById("bat-completados"),porcentaje=document.getElementById("bat-porcentaje");
  const normalizar=t=>String(t||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  const leidos=new Set(JSON.parse(localStorage.getItem("badbear_batimix_leidos")||"[]"));
  function stats(){const areas=new Set(temas.map(t=>t.area));if(totalTemas)totalTemas.textContent=temas.length;if(totalAreas)totalAreas.textContent=areas.size;if(completados)completados.textContent=leidos.size;if(porcentaje)porcentaje.textContent=`${temas.length?Math.round(leidos.size/temas.length*100):0}%`}
  function filtros(){if(!filtro)return;[...new Set(temas.map(t=>t.area))].sort().forEach(a=>{const o=document.createElement("option");o.value=a;o.textContent=a;filtro.appendChild(o)})}
  function card(t){const a=document.createElement("a");a.className="bat-topic";a.href=`tema.html?t=${encodeURIComponent(t.id)}`;a.innerHTML=`<div class="bat-topic-top"><div class="bat-topic-icon">${t.icono}</div><span class="bat-topic-area">${t.area}</span></div><h3>${t.titulo}</h3><p>${t.descripcion}</p><footer>${leidos.has(t.id)?"✓ Revisado":"Abrir tema →"}</footer>`;return a}
  function render(){if(!grid)return;const q=normalizar(buscar?.value),area=filtro?.value||"todos";const f=temas.filter(t=>(!q||normalizar(`${t.titulo} ${t.descripcion} ${t.area}`).includes(q))&&(area==="todos"||t.area===area));grid.innerHTML="";f.forEach(t=>grid.appendChild(card(t)));if(!f.length){const d=document.createElement("div");d.className="sin-temas";d.textContent="No hay temas que coincidan con la búsqueda.";grid.appendChild(d)}}
  filtros();stats();buscar?.addEventListener("input",render);filtro?.addEventListener("change",render);render();
})();
