(() => {
"use strict";
const unidades=[
["Cirugía cardiovascular y de tórax",["Tuberculosis pulmonar"]],
["Anestesiología",[]],
["Cirugía de cabeza y cuello",[]],
["Técnicas quirúrgicas",[]],
["Cirugía plástica",[]]
];
const cont=document.getElementById("programa-unidades");
if(!cont)return;
unidades.forEach(([nombre,titulos],u)=>{
 const section=document.createElement("section");section.className="unit";
 const h=document.createElement("h2");h.textContent=`Unidad ${u+1} · ${nombre}`;section.appendChild(h);
 const grid=document.createElement("div");grid.className="class-grid";
 for(let i=0;i<5;i++){
  const article=document.createElement("article");article.className="class-card";
  const cod=document.createElement("div");cod.className="class-code";cod.textContent=`BATIMIX-U${u+1}-C${i+1}`;article.appendChild(cod);
  const title=document.createElement("h3");title.textContent=titulos[i]||`Clase ${i+1} · Tema por definir`;article.appendChild(title);
  const desc=document.createElement("p");desc.textContent="Recursos: teoría · audio · video · PPT · PDF.";article.appendChild(desc);
  if(u===0&&i===0){const link=document.createElement("a");link.href="clases/u1-c1-tuberculosis.html";link.textContent="Entrar a la clase";article.appendChild(link)}
  else{const p=document.createElement("span");p.className="pending";p.textContent="Pendiente de desarrollo";article.appendChild(p)}
  grid.appendChild(article);
 }
 section.appendChild(grid);cont.appendChild(section);
});
})();