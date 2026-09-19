(() => {
"use strict";
const p=new URLSearchParams(location.search),id=p.get("c")||"",data=(window.BADBEAR_CG_TOPICS||{})[id],r=(window.BADBEAR_CG_RESOURCES||{})[id]||{pdfs:[],audios:[],videos:[],playlist:{url:""}};
const e=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
if(!data){document.getElementById("cg-hero").innerHTML="<h1>Clase no encontrada</h1>";return}
document.title=data.title+" | BADBEAR.MED";document.getElementById("bc-title").textContent=data.title;
document.getElementById("cg-hero").innerHTML=`<div><span class="cg-kicker">${e(data.tag)} · CIRUGÍA GENERAL</span><h1>${e(data.title)}</h1><p>${e(data.subtitle)}</p>${data.notice?`<div class="cg-notice">${e(data.notice)}</div>`:""}</div>`;
let toc=[],parts=[];
(data.sections||[]).forEach((s,i)=>{
 const sid="sec-"+(i+1);
 toc.push(`<a href="#${sid}">${i+1}. ${e(String(s.title||"").replace(/^\d+\.\s*/,""))}</a>`);
 const paras=(s.paragraphs||[]).map(x=>`<p>${e(x)}</p>`).join("");
 const bullets=(s.bullets||[]).length?`<div class="cg-keybox"><h3>Puntos que debes dominar</h3><ul>${s.bullets.map(x=>`<li>${e(x)}</li>`).join("")}</ul></div>`:"";
 const clinical=s.clinical?`<div class="cg-clinical"><strong>Cómo razonarlo en clínica:</strong><p>${e(s.clinical)}</p></div>`:"";
 parts.push(`<section id="${sid}" class="cg-section cg-section-rich"><span class="cg-num">${String(i+1).padStart(2,"0")}</span><h2>${e(s.title)}</h2><div class="cg-rich-text">${paras}</div>${bullets}${clinical}<div class="cg-fija"><strong>BADBEAR.MED FIJA:</strong> ${e(s.fija||"")}</div></section>`);
});
document.getElementById("cg-content").innerHTML=parts.join("")+`<section class="cg-final"><span>REPASO FINAL</span><h2>BADBEAR.MED FIJA — Integración de la clase</h2><p>No memorices los bloques de forma aislada. Para cada patología identifica: anatomía relevante → fisiopatología → presentación clínica → diagnóstico → dato que cambia la conducta → tratamiento → complicaciones. Ese orden convierte teoría en razonamiento quirúrgico.</p></section>`;
document.getElementById("cg-toc").innerHTML=toc.join("");
const pdfs=(r.pdfs||[]).length?r.pdfs.map(x=>`<article class="cg-resource-card"><span class="cg-type">PDF</span><h3>${e(x.title)}</h3><a href="${encodeURI(x.file)}" target="_blank">Abrir PDF</a></article>`).join(""):`<article class="cg-resource-card cg-placeholder"><span class="cg-type">PDF</span><h3>PDF pendiente</h3></article>`;
const aud=(r.audios||[]).length?r.audios.map(x=>`<article class="cg-resource-card"><span class="cg-type">AUDIO</span><h3>${e(x.title)}</h3><audio controls preload="metadata" src="${encodeURI(x.file)}"></audio></article>`).join(""):`<article class="cg-resource-card cg-placeholder"><span class="cg-type">AUDIO</span><h3>Espacio preparado para audio</h3><p>Cuando agreguemos el audio de esta clase aparecerá aquí con reproductor.</p></article>`;
const vid=(r.videos||[]).length?r.videos.map(x=>`<article class="cg-resource-card"><span class="cg-type">VIDEO</span><h3>${e(x.title)}</h3><a href="${e(x.url)}" target="_blank">Ver video</a></article>`).join(""):`<article class="cg-resource-card cg-placeholder"><span class="cg-type">VIDEO</span><h3>Espacio preparado para videos</h3><p>Los enlaces de YouTube aparecerán aquí sin modificar la teoría.</p></article>`;
document.getElementById("bb-class-resources").innerHTML=`<div class="cg-resource-head"><span>RECURSOS PARA ESTUDIAR</span><h2>PDF, audio y videos de la clase</h2><p>La teoría extensa queda separada de sus recursos para seguir incorporando material sin perder organización.</p></div><h3 class="cg-resource-title">PDF</h3><div class="cg-resource-grid">${pdfs}</div><h3 class="cg-resource-title">Audios</h3><div class="cg-resource-grid">${aud}</div><h3 class="cg-resource-title">Videos</h3><div class="cg-resource-grid">${vid}</div>`;
document.getElementById("cg-playlist").innerHTML=(r.playlist&&r.playlist.url)?`<a class="cg-playlist-btn" href="${e(r.playlist.url)}" target="_blank">Abrir playlist →</a>`:`<div class="cg-playlist-pending">Playlist pendiente de enlace. El espacio ya está reservado.</div>`;
})();