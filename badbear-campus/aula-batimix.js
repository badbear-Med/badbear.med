(()=>{
"use strict";
const anesthesia=window.BATIMIX_ANESTESIOLOGIA;
const anestSections=anesthesia?.secciones||[];
const anestItems=anestSections.flatMap(s=>s.items);
const units=[
{name:"Cirugía cardiovascular y de tórax",titles:["Tuberculosis pulmonar"],color:"#f28a36",tint:"#fff1e5"},
{name:"Anestesiología",titles:[],color:"#17a776",tint:"#eaf9f2"},
{name:"Cirugía de cabeza y cuello",titles:[],color:"#ea6178",tint:"#fff0f2"},
{name:"Técnicas quirúrgicas",titles:[],color:"#eab52f",tint:"#fff8db"},
{name:"Cirugía plástica",titles:[],color:"#4288db",tint:"#edf5ff"}
];
const lessonName=(u,i)=>units[u].titles[i]||"Tema por definir";
const lessonId=(u,i)=>"BATIMIX-U"+(u+1)+"-C"+(i+1);
const key="badbear_batimix_campus_studied_v1";
const TOTAL=20+anestItems.length;
const known=new Set(units.flatMap((unit,u)=>u===1?anestItems.map(i=>i.id):Array.from({length:5},(_,i)=>lessonId(u,i))));
let studied;try{studied=new Set(JSON.parse(localStorage.getItem(key)||"[]"))}catch{studied=new Set()}
for(let i=1;i<=4;i++){
 const old=lessonId(1,i-1),target="BATIMIX-U2-T"+String(i).padStart(2,"0");
 if(studied.has(old))studied.add(target);
}
const tabs=document.getElementById("unit-tabs"),content=document.getElementById("unit-content"),progress=document.getElementById("progress-label"),fill=document.getElementById("progress-fill"),qu=document.getElementById("quiz-unit"),ql=document.getElementById("quiz-lesson");
if(!tabs||!content||!qu||!ql)return;
const params=new URLSearchParams(window.location.search);
const deepLink=params.get("recurso");
let selected=params.get("unidad")==="2"||anestItems.some(i=>i.id===deepLink)?1:0;

const text=(tag,value,cls)=>{
 const element=document.createElement(tag);element.textContent=value;
 if(cls)element.className=cls;return element
};
function countStudy(u){
 return u===1?anestItems.filter(i=>studied.has(i.id)).length:
 Array.from({length:5},(_,i)=>lessonId(u,i)).filter(id=>studied.has(id)).length;
}
function progressUpdate(){
 const done=units.reduce((n,_,u)=>n+countStudy(u),0);
 progress.textContent=done+" de "+TOTAL+" apartados estudiados";
 fill.style.width=(done/TOTAL*100)+"%";
 [...tabs.children].forEach((tab,u)=>{
  const limit=u===1?anestItems.length:5;
  tab.querySelector("small").textContent=countStudy(u)+" de "+limit+" estudiados";
 });
}
function studyControls(article,id){
 const actions=document.createElement("div");actions.className="lesson-actions";
 const check=document.createElement("label");check.className="check-label";
 const input=document.createElement("input");input.type="checkbox";input.checked=studied.has(id);
 input.addEventListener("change",()=>{
  if(input.checked)studied.add(id);else studied.delete(id);
  try{localStorage.setItem(key,JSON.stringify([...studied]))}catch(e){}
  progressUpdate();
 });
 check.append(input,document.createTextNode("Marcar como estudiada"));actions.appendChild(check);
 const toggle=document.createElement("button");toggle.type="button";toggle.textContent="Ver recursos en el campus";toggle.setAttribute("aria-expanded","false");
 actions.appendChild(toggle);article.appendChild(actions);
 return toggle;
}
function resourcePanel(article,available,anestItem=null){
 const toggle=studyControls(article,anestItem?anestItem.id:article.dataset.lessonId);
 const resources=document.createElement("section");resources.className="resources";resources.hidden=true;
 const tabsRes=document.createElement("div");tabsRes.className="resource-tabs";
 const pane=document.createElement("div");pane.className="resource-pane";
 const isAnest=Boolean(anestItem);
 const hasFullTheory=isAnest&&anestItem.id==="BATIMIX-U2-T01";
 const types=isAnest
  ?(hasFullTheory?["Teoría completa","PPT","Audio","Video YouTube","Material extra"]:["PPT","Audio","Video YouTube","Material extra"])
  :["Teoría","Audio","Video","Diapositivas","PDF adicional"];
 if(hasFullTheory)tabsRes.classList.add("anesthesia-tabs-with-theory");
 const keys=["ppt","audio","youtube","extra"];
 function displayResource(n){
  pane.replaceChildren();
  [...tabsRes.children].forEach((button,k)=>button.setAttribute("aria-selected",String(k===n)));
  const desc=document.createElement("p");
  if(hasFullTheory&&n===0){
   desc.textContent="Clase 1 desarrollada: conceptos básicos, anestesia inhalatoria y espinal, con explicación extensa, cuadros comparativos y aplicación clínica.";
   pane.appendChild(desc);
   const link=document.createElement("a");
   link.className="anesthesia-theory-link";
   link.href="../cirugia-batimix/clases/u2-t01-conceptos-basicos-anestesia.html";
   link.textContent="Abrir teoría completa de la Clase 1";
   pane.appendChild(link);
   return;
  }
  if(isAnest){
   const resourceIndex=hasFullTheory?n-1:n;
   const resourceUrl=anestItem.recursos?.[keys[resourceIndex]];
   const fileHint=resourceIndex===3?"Material identificado en el listado: "+anestItem.archivoReferencia+
    ". Formato original: "+anestItem.formatoReferencia.toUpperCase()+".":"";
   if(typeof resourceUrl==="string"&&resourceUrl.trim()){
    const urlBase=resourceUrl.split("?")[0].split("#")[0].toLowerCase();
    const isPowerPoint=/\.(ppt|pptx|pps|ppsx)$/.test(urlBase);
    const isPdf=urlBase.endsWith(".pdf");
    if(isPowerPoint||isPdf){
     desc.textContent=isPowerPoint
      ?"Presentación en línea: consulta las diapositivas sin descargar el archivo. El visor funciona mediante Microsoft Office Web Viewer."
      :"Documento PDF: consulta el material directamente dentro del aula.";
     pane.appendChild(desc);
     const viewerUrl=isPowerPoint
      ?"https://view.officeapps.live.com/op/embed.aspx?src="+encodeURIComponent(resourceUrl)
      :resourceUrl+"#toolbar=1&navpanes=0";
     const frame=document.createElement("iframe");
     frame.className="anesthesia-embedded-viewer";
     frame.src=viewerUrl;
     frame.title="Visor de "+types[n]+" · "+anestItem.titulo;
     frame.loading="lazy";
     frame.setAttribute("allowfullscreen","");
     frame.setAttribute("allow","fullscreen");
     pane.appendChild(frame);
     const actions=document.createElement("div");
     actions.className="anesthesia-viewer-actions";
     const expand=document.createElement("a");
     expand.className="resource-link";
     expand.href=viewerUrl;
     expand.target="_blank";
     expand.rel="noopener noreferrer";
     expand.textContent="Abrir visor en otra pestaña";
     actions.appendChild(expand);
     const original=document.createElement("a");
     original.className="anesthesia-original-link";
     original.href=resourceUrl;
     original.target="_blank";
     original.rel="noopener noreferrer";
     original.textContent="Descargar original ("+(isPowerPoint?"PPTX":"PDF")+")";
     actions.appendChild(original);
     pane.appendChild(actions);
     if(isPowerPoint){
      pane.appendChild(text("p","Si Microsoft no logra mostrar la presentación, utiliza el enlace para abrir el visor en otra pestaña. La visualización depende del servicio externo.","anesthesia-viewer-note"));
     }
    }else{
     desc.textContent="Recurso disponible para este apartado.";pane.appendChild(desc);
     const link=document.createElement("a");link.className="resource-link";link.href=resourceUrl;
     link.textContent="Abrir "+types[n];if(/^https?:\/\//i.test(resourceUrl)){link.target="_blank";link.rel="noopener noreferrer"}
     pane.appendChild(link);
    }
   }else{desc.textContent=types[n]+" pendiente de vinculación. "+fileHint;pane.appendChild(desc)}
  }else if(available&&n===0){
   desc.textContent="Introducción teórica publicada en BADBEAR.MED. El capítulo ampliado está en preparación.";pane.appendChild(desc);
   const link=document.createElement("a");link.className="resource-link";link.href="../cirugia-batimix/clases/u1-c1-tuberculosis.html";link.textContent="Leer teoría en BADBEAR.MED ↗";pane.appendChild(link);
  }else{desc.textContent=types[n]+" pendiente de publicación. No existe todavía un archivo o enlace oficial para este recurso.";pane.appendChild(desc)}
 }
 types.forEach((name,n)=>{
  const button=document.createElement("button");button.type="button";button.textContent=name;button.addEventListener("click",()=>displayResource(n));tabsRes.appendChild(button);
 });
 resources.append(tabsRes,pane);displayResource(0);
 toggle.addEventListener("click",()=>{
  resources.hidden=!resources.hidden;toggle.textContent=resources.hidden?"Ver recursos en el campus":"Ocultar recursos";
  toggle.setAttribute("aria-expanded",String(!resources.hidden));
 });
 article.appendChild(resources);
 if(isAnest&&deepLink===anestItem.id){resources.hidden=false;toggle.textContent="Ocultar recursos";toggle.setAttribute("aria-expanded","true");}
}
function renderAnesthesia(){
 const intro=text("p","2 secciones · "+anestItems.length+" apartados · 4 recursos por apartado: PPT, audio, video de YouTube y material extra.","intro");
 content.appendChild(intro);
 for(const section of anestSections){
  const group=document.createElement("section");group.className="anesthesia-group";
  group.appendChild(text("h4",section.nombre+" · "+section.items.length+(section.id==="teoria"?" clases":" seminarios"),"anesthesia-group-title"));
  for(const item of section.items){
   const article=document.createElement("article");article.className="lesson anesthesia-lesson";article.id=item.id;
   const type=section.id==="teoria"?"CLASE":"SEMINARIO";
   article.appendChild(text("h4",type+" "+String(item.numero).padStart(2,"0")+" · "+item.titulo));
   article.appendChild(text("p",(item.id==="BATIMIX-U2-T01"?"Teoría completa + ":"")+"PPT + audio + video de YouTube + material extra.","lesson-meta"));
   article.appendChild(text("p","Archivo de referencia: "+item.archivoReferencia+(item.recursos?.extra?" · Enlace configurado":" · Pendiente de subir"),"anesthesia-file-name"));
   if(item.id==="BATIMIX-U2-T01"){
    const theoryLink=document.createElement("a");
    theoryLink.href="../cirugia-batimix/clases/u2-t01-conceptos-basicos-anestesia.html";
    theoryLink.className="anesthesia-theory-link";
    theoryLink.textContent="Leer teoría médica completa · Clase 1";
    article.appendChild(theoryLink);
   }
   resourcePanel(article,false,item);
   group.appendChild(article);
  }
  content.appendChild(group);
 }
}
function renderRegular(){
 const p=text("p","5 clases · 5 recursos por clase: teoría, audio, video, diapositivas y PDF adicional.","intro");
 content.appendChild(p);
 for(let i=0;i<5;i++){
  const u=selected,id=lessonId(u,i),available=u===0&&i===0;
  const article=document.createElement("article");article.className="lesson";article.dataset.lessonId=id;
  article.appendChild(text("h4","CLASE "+String(i+1).padStart(2,"0")+" · "+lessonName(u,i)));
  article.appendChild(text("p","Teoría + audio + video + PPT + PDF extra"+(available?" · Teoría inicial disponible":" · Pendiente de contenido"),"lesson-meta"));
  resourcePanel(article,available);
  content.appendChild(article);
 }
}
function render(){
 tabs.replaceChildren();
 units.forEach((unit,u)=>{
  const b=document.createElement("button");b.type="button";b.className="unit-tab";
  b.style.setProperty("--accent",unit.color);b.style.setProperty("--tint",unit.tint);
  b.setAttribute("role","tab");b.setAttribute("aria-selected",String(u===selected));
  b.id="batimix-unit-"+(u+1);b.setAttribute("aria-controls","unit-content");
  b.textContent="Unidad "+(u+1)+" · "+unit.name;b.appendChild(document.createElement("small"));
  b.addEventListener("click",()=>{selected=u;render()});tabs.appendChild(b);
 });
 content.replaceChildren();
 content.appendChild(text("h3","Unidad "+(selected+1)+" · "+units[selected].name));
 if(selected===1)renderAnesthesia();else renderRegular();
 progressUpdate();
}
units.forEach((unit,u)=>{const opt=document.createElement("option");opt.value=u;opt.textContent="Unidad "+(u+1)+" · "+unit.name;qu.appendChild(opt)});
function quizUpdate(){
 ql.replaceChildren();
 const u=Number(qu.value);
 if(u===1){
  for(const group of anestSections)for(const item of group.items){
   const opt=document.createElement("option");opt.value=item.id;
   opt.textContent=(group.id==="teoria"?"Clase ":"Seminario ")+item.numero+" · "+item.titulo;ql.appendChild(opt)
  }
 }else for(let i=0;i<5;i++){
  const opt=document.createElement("option");opt.value=i;opt.textContent="Clase "+(i+1)+" · "+lessonName(u,i);ql.appendChild(opt)
 }
}
qu.value=String(selected);qu.addEventListener("change",quizUpdate);quizUpdate();
document.getElementById("quiz-start").addEventListener("click",()=>{
 document.getElementById("quiz-status").textContent="El banco de preguntas de esta clase o seminario todavía no está publicado. No se generarán preguntas ficticias ni resultados de evaluación.";
});
render();
})();