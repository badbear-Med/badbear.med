(() => {
  "use strict";
  const temas=Array.isArray(window.BADBEAR_PATOLOGIA_TEMAS)?window.BADBEAR_PATOLOGIA_TEMAS:[];
  const grid=document.getElementById("pat-temas"),buscar=document.getElementById("pat-buscar"),filtro=document.getElementById("pat-filtro");
  const total=document.getElementById("pat-total-temas"),areasEl=document.getElementById("pat-total-areas"),completados=document.getElementById("pat-completados"),porcentaje=document.getElementById("pat-porcentaje");
  const norm=t=>String(t||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  const leidos=new Set(JSON.parse(localStorage.getItem("badbear_patologia_leidos")||"[]"));
  function stats(){const areas=new Set(temas.map(t=>t.area));if(total)total.textContent=temas.length;if(areasEl)areasEl.textContent=areas.size;if(completados)completados.textContent=leidos.size;if(porcentaje)porcentaje.textContent=`${temas.length?Math.round(leidos.size/temas.length*100):0}%`}
  function filtros(){if(!filtro)return;[...new Set(temas.map(t=>t.area))].sort().forEach(area=>{const o=document.createElement("option");o.value=area;o.textContent=area;filtro.appendChild(o)})}
  function card(t){const a=document.createElement("a");a.className="pat-topic";a.href=`tema.html?t=${encodeURIComponent(t.id)}`;a.innerHTML=`<div class="pat-topic-top"><div class="pat-topic-icon">${t.icono}</div><span class="pat-topic-area">${t.area}</span></div><h3>${t.titulo}</h3><p>${t.descripcion}</p><footer>${leidos.has(t.id)?"✓ Revisado":"Abrir tema →"}</footer>`;return a}
  function render(){if(!grid)return;const q=norm(buscar?.value),area=filtro?.value||"todos";const lista=temas.filter(t=>(!q||norm(`${t.titulo} ${t.descripcion} ${t.area}`).includes(q))&&(area==="todos"||t.area===area));grid.innerHTML="";lista.forEach(t=>grid.appendChild(card(t)));if(!lista.length){const d=document.createElement("div");d.className="sin-temas";d.textContent="No hay temas que coincidan con la búsqueda.";grid.appendChild(d)}}
  filtros();stats();buscar?.addEventListener("input",render);filtro?.addEventListener("change",render);render();
})();
