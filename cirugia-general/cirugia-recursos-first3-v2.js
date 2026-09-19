(() => {
"use strict";
const h=document.getElementById("bb-class-resources");if(!h)return;
const r=(window.BADBEAR_CG_RESOURCES||{})[h.dataset.classId||""];if(!r)return;
const e=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pdf=(r.pdfs||[]).map(x=>`<article class="cg-resource-card"><span class="cg-type">PDF</span><h3>${e(x.title)}</h3><a href="${encodeURI(x.file)}" target="_blank">Abrir PDF</a></article>`).join("");
h.className="cg-resources";h.innerHTML=`<div class="cg-resource-head"><span>RECURSOS PARA ESTUDIAR</span><h2>Material de esta clase</h2><p>El desarrollo original se conserva. Aquí solo agregamos recursos.</p></div><h3 class="cg-resource-title">PDF</h3><div class="cg-resource-grid">${pdf}</div><h3 class="cg-resource-title">Audios</h3><div class="cg-resource-grid"><article class="cg-resource-card"><span class="cg-type">AUDIO</span><h3>Espacio preparado para audio</h3><p>Cuando subamos el audio aparecerá aquí.</p></article></div><h3 class="cg-resource-title">Videos</h3><div class="cg-resource-grid"><article class="cg-resource-card"><span class="cg-type">VIDEO</span><h3>Espacio preparado para videos</h3><p>Los enlaces aparecerán aquí.</p></article></div>`;
})();