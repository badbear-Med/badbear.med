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
 parts.push(`<section id="${sid}" class="cg-section cg-section-rich"><span class="cg-num">${String(i+1).padStart(2,"0")}</span><h2>${e(s.title)}</h2><div class="cg-rich-text">${paras}</div>${bullets}${clinical}<div class="cg-fija"><strong>BADBEAR.MED FIJA:</strong> ${e(s.fija||"")}</div></section>` + (window.BADBEAR_CG_FIGURE_HTML?window.BADBEAR_CG_FIGURE_HTML(id,i+1):""));
});
document.getElementById("cg-content").innerHTML=parts.join("")+`<section class="cg-final"><span>REPASO FINAL</span><h2>BADBEAR.MED FIJA — Integración de la clase</h2><p>No memorices los bloques de forma aislada. Para cada patología identifica: anatomía relevante → fisiopatología → presentación clínica → diagnóstico → dato que cambia la conducta → tratamiento → complicaciones. Ese orden convierte teoría en razonamiento quirúrgico.</p></section>`;
document.getElementById("cg-toc").innerHTML=toc.join("");
if(window.BADBEAR_CG_RENDER_PDF_FIGURES){requestAnimationFrame(()=>window.BADBEAR_CG_RENDER_PDF_FIGURES());}
window.BADBEAR_CG_RENDER_RESOURCES(id, document.getElementById("bb-class-resources"));
const playlistSection = document.getElementById("cg-playlist-section");
if (playlistSection) {
  const url = r.playlist && r.playlist.url;
  playlistSection.hidden = !url;
  document.getElementById("cg-playlist").innerHTML = url ? '<a class="cg-playlist-btn" href="' + e(url) + '" target="_blank" rel="noopener">Abrir playlist →</a>' : "";
}
})();