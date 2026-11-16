(() => {
"use strict";
const cabezaCuello=window.BATIMIX_CABEZA_CUELLO||[];
const torax=window.BATIMIX_TORAX||[];
const plastica=window.BATIMIX_PLASTICA||[];
const unidades=[
["Cirugía cardiovascular y de tórax",["Tuberculosis pulmonar"]],
["Anestesiología",[]],
["Cirugía de cabeza y cuello",[]],
["Técnicas quirúrgicas",[]],
["Cirugía plástica",[]]
];
const anestesia=window.BATIMIX_ANESTESIOLOGIA;
const cont=document.getElementById("programa-unidades");
if(!cont)return;

function encabezado(tag,txt){
 const e=document.createElement(tag);e.textContent=txt;return e;
}
function hacerAnestesiologia(section){
 if(!anestesia?.secciones?.length){
  section.appendChild(encabezado("p","Programa de Anestesiología pendiente de carga."));return;
 }
 const intro=encabezado("p","2 secciones · 4 clases teóricas · 11 seminarios. Cada apartado dispondrá de PPT, audio, video de YouTube y material extra.");
 intro.className="bat-anest-intro";section.appendChild(intro);
 for(const grupo of anestesia.secciones){
  const block=document.createElement("section");block.className="bat-anest-section";
  const head=encabezado("h3",grupo.nombre+" · "+grupo.items.length+(grupo.id==="teoria"?" clases":" seminarios"));block.appendChild(head);
  const grid=document.createElement("div");grid.className="class-grid";
  for(const item of grupo.items){
   const article=document.createElement("article");article.className="class-card";
   const cod=encabezado("div",item.id);cod.className="class-code";article.appendChild(cod);
   article.appendChild(encabezado("h4",(grupo.id==="teoria"?"Clase ":"Seminario ")+item.numero+" · "+item.titulo));
   const resources=encabezado("p","PPT · Audio · Video de YouTube · Material extra");article.appendChild(resources);
   const original=encabezado("p","Material de referencia identificado: "+item.archivoReferencia);original.className="bat-anest-filename";article.appendChild(original);
   const extraLinked=Boolean(item.recursos?.extra);
   const state=encabezado("span",extraLinked?"Enlace de material extra configurado":"Material extra pendiente de subir");
   state.className="pending";article.appendChild(state);
   const theoryPages={
    "BATIMIX-U2-T01":"clases/u2-t01-conceptos-basicos-anestesia.html",
    "BATIMIX-U2-T02":"clases/u2-t02-oxigenoterapia-relajantes-neuromusculares.html",
    "BATIMIX-U2-T03":"clases/u2-t03-monitorizacion-ventilacion-epidural.html",
    "BATIMIX-U2-T04":"clases/u2-t04-anestesia-general-endovenosa.html"
   };
   if(theoryPages[item.id]){
    const theory=document.createElement("a");
    theory.href=theoryPages[item.id];
    theory.textContent="Leer teoría médica completa";
    theory.style.marginRight="8px";
    article.appendChild(theory);
   }
   const link=document.createElement("a");link.href="../badbear-campus/aula-batimix.html?unidad=2&recurso="+encodeURIComponent(item.id);link.textContent="Ver los 4 recursos";article.appendChild(link);
   grid.appendChild(article);
  }
  block.appendChild(grid);section.appendChild(block);
 }
}
unidades.forEach(([nombre,titulos],u)=>{
 const section=document.createElement("section");section.className="unit";
 if(u===2)section.id="cabeza-y-cuello";
 if(u===4)section.id="cirugia-plastica";
 section.appendChild(encabezado("h2",`Unidad ${u+1} · ${nombre}`));
 const bank=encabezado("a","BADBEAR.REALES · Banco de preguntas");
 bank.href="banco-las-reales.html?unidad="+(u+1)+"#banco";
 section.appendChild(bank);
 if(u===1){hacerAnestesiologia(section);cont.appendChild(section);return}
 const grid=document.createElement("div");grid.className="class-grid";
 const clases=u===0?torax:u===2?cabezaCuello:u===4?plastica:[];
 for(let i=0;i<(u===2?clases.length:Math.max(5,clases.length));i++){
  const id=`BATIMIX-U${u+1}-C${i+1}`;
  const clase=clases[i];
  const article=document.createElement("article");article.className="class-card";
  const cod=encabezado("div",id);cod.className="class-code";article.appendChild(cod);
  const titulo=clase?.titulo||titulos[i]||`Clase ${i+1} · Tema por definir`;
  article.appendChild(encabezado("h3",clase?.tipo==="Seminario"?`Seminario · ${titulo}`:titulo));
  article.appendChild(encabezado("p","Recursos: teoría · audio · video · PPT · PDF."));
  if(clase?.teoria){const link=document.createElement("a");link.href=clase.teoria;link.textContent="Leer teoría completa";article.appendChild(link)}
  else{const p=encabezado("span","Pendiente de desarrollo");p.className="pending";article.appendChild(p)}
  grid.appendChild(article);
 }
 section.appendChild(grid);cont.appendChild(section);
});
})();
