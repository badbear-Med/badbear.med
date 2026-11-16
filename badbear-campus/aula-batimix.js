(()=>{
"use strict";
const anesthesia=window.BATIMIX_ANESTESIOLOGIA;
const anestSections=anesthesia?.secciones||[];
const anestItems=anestSections.flatMap(s=>s.items);
const completeTheory={
 "BATIMIX-U2-T01":{
  href:"../cirugia-batimix/clases/u2-t01-conceptos-basicos-anestesia.html",
  name:"Clase 1",
  description:"Conceptos básicos, anestesia inhalatoria y espinal: fundamentos, circuitos, farmacocinética y técnicas neuroaxiales."
 },
 "BATIMIX-U2-T02":{
  href:"../cirugia-batimix/clases/u2-t02-oxigenoterapia-relajantes-neuromusculares.html",
  name:"Clase 2",
  description:"Oxigenoterapia y relajantes neuromusculares: unión neuromuscular, TOF, reversión, insuficiencia respiratoria y dispositivos de oxígeno."
 },
 "BATIMIX-U2-T03":{
  href:"../cirugia-batimix/clases/u2-t03-monitorizacion-ventilacion-epidural.html",
  name:"Clase 3",
  description:"Monitorización, ventilación mecánica y anestesia epidural: capnografía, ECG, PEEP, ventilación protectora, farmacología neuroaxial, seguridad y casos."
 },
 "BATIMIX-U2-T04":{
  href:"../cirugia-batimix/clases/u2-t04-anestesia-general-endovenosa.html",
  name:"Clase 4",
  description:"Anestesia general endovenosa I y II: hipnóticos IV, opioides, TIVA, TCI, dosis orientativas, monitorización, casos y complicaciones."
 }
};
const cabezaCuello=window.BATIMIX_CABEZA_CUELLO||[];
const torax=window.BATIMIX_TORAX||[];
const units=[
{name:"Cirugía cardiovascular y de tórax",titles:torax.map(clase=>clase.titulo),color:"#b94414",tint:"#fff0e6"},
{name:"Anestesiología",titles:[],color:"#087c59",tint:"#e3f9ed"},
{name:"Cirugía de cabeza y cuello",titles:cabezaCuello.map(clase=>clase.titulo),color:"#b52d59",tint:"#ffe9f0"},
{name:"Técnicas quirúrgicas",titles:[],color:"#836000",tint:"#fff4c8"},
{name:"Cirugía plástica",titles:[],color:"#2459c4",tint:"#e8f0ff"}
];
const lessonName=(u,i)=>units[u].titles[i]||"Tema por definir";
const lessonId=(u,i)=>"BATIMIX-U"+(u+1)+"-C"+(i+1);
const key="badbear_batimix_campus_studied_v1";
const lessonCount=u=>u===0?Math.max(5,torax.length):u===1?anestItems.length:u===2?cabezaCuello.length:5;
const TOTAL=units.reduce((count,_,u)=>count+lessonCount(u),0);
const known=new Set(units.flatMap((unit,u)=>u===1?anestItems.map(i=>i.id):Array.from({length:lessonCount(u)},(_,i)=>lessonId(u,i))));
let studied;try{studied=new Set(JSON.parse(localStorage.getItem(key)||"[]"))}catch{studied=new Set()}
for(let i=1;i<=4;i++){
 const old=lessonId(1,i-1),target="BATIMIX-U2-T"+String(i).padStart(2,"0");
 if(studied.has(old))studied.add(target);
}
const tabs=document.getElementById("unit-tabs"),content=document.getElementById("unit-content"),progress=document.getElementById("progress-label"),fill=document.getElementById("progress-fill");
if(!tabs||!content)return;
const params=new URLSearchParams(window.location.search);
const deepLink=params.get("recurso");
const requestedUnit=Number(params.get("unidad"));
let selected=anestItems.some(i=>i.id===deepLink)?1
 :cabezaCuello.some(i=>i.id===deepLink)?2
 :torax.some(i=>i.id===deepLink)?0
 :Number.isInteger(requestedUnit)&&requestedUnit>=1&&requestedUnit<=units.length?requestedUnit-1:0;

const text=(tag,value,cls)=>{
 const element=document.createElement(tag);element.textContent=value;
 if(cls)element.className=cls;return element
};
/* El único elemento <audio> vive fuera de los paneles que se reemplazan al navegar.
   Cambiar a PPT, PDF, video, material extra o incluso de unidad no lo destruye. */
const globalPlayer=document.getElementById("batimix-global-player");
const globalAudio=document.getElementById("batimix-global-audio");
const globalTitle=document.getElementById("batimix-player-title");
const globalClose=document.getElementById("batimix-player-close");
let currentAudioUrl="";
function selectGlobalAudio(item,url){
 if(!globalPlayer||!globalAudio||!globalTitle)return;
 const name=(completeTheory[item.id]?.name||(item.teoria?"Clase ":"Seminario ")+item.numero)+" · "+item.titulo;
 // No modificar src ni invocar load() si el mismo audio ya se estaba escuchando.
 if(currentAudioUrl!==url){
  globalAudio.pause();
  globalAudio.src=url;
  currentAudioUrl=url;
  globalAudio.load();
 }
 globalTitle.textContent=name;
 globalPlayer.hidden=false;
 document.body.classList.add("has-batimix-global-player");
}
if(globalClose&&globalAudio&&globalPlayer){
 globalClose.addEventListener("click",()=>{
  globalAudio.pause();
  globalAudio.removeAttribute("src");
  globalAudio.load();
  currentAudioUrl="";
  globalPlayer.hidden=true;
  document.body.classList.remove("has-batimix-global-player");
 });
}
function countStudy(u){
 return u===1?anestItems.filter(i=>studied.has(i.id)).length:
 Array.from({length:lessonCount(u)},(_,i)=>lessonId(u,i)).filter(id=>studied.has(id)).length;
}
function progressUpdate(){
 const done=units.reduce((n,_,u)=>n+countStudy(u),0);
 progress.textContent=done+" de "+TOTAL+" apartados estudiados";
 fill.style.width=(done/TOTAL*100)+"%";
 [...tabs.children].forEach((tab,u)=>{
  const limit=lessonCount(u);
  const completed=countStudy(u);
  tab.querySelector("small").textContent=completed+" de "+limit+" estudiados";
  tab.style.setProperty("--unit-progress",completed/limit*100+"%");
 });
}
function studyControls(header,id,theoryLink){
 const actions=document.createElement("div");actions.className="lesson-actions";
 if(theoryLink)actions.appendChild(theoryLink);
 const check=document.createElement("label");check.className="check-label";
 const input=document.createElement("input");input.type="checkbox";input.checked=studied.has(id);
 input.addEventListener("change",()=>{
  if(input.checked)studied.add(id);else studied.delete(id);
  try{localStorage.setItem(key,JSON.stringify([...studied]))}catch(e){}
  progressUpdate();
 });
 check.append(input,document.createTextNode("Marcar como estudiada"));
 const toggle=document.createElement("button");toggle.type="button";toggle.textContent="Ver recursos";toggle.setAttribute("aria-expanded","false");
 actions.append(toggle,check);header.appendChild(actions);
 return toggle;
}
function resourcePanel(article,header,item=null,theoryLink=null){
 const id=item?.id||article.dataset.lessonId;
 const toggle=studyControls(header,id,theoryLink);
 const resources=document.createElement("section");resources.className="resources";resources.hidden=true;resources.id=id+"-recursos";
 toggle.setAttribute("aria-controls",resources.id);
 const tabsRes=document.createElement("div");tabsRes.className="resource-tabs";
 const pane=document.createElement("div");pane.className="resource-pane";
 const hasChapterResources=Boolean(item&&(item.teoria||cabezaCuello.includes(item)));
 const theory=hasChapterResources
  ?(item.teoria?{href:item.teoria,name:item.tipo==="Seminario"?"Seminario":"Clase "+item.numero,description:item.descripcion}:null)
  :completeTheory[item?.id];
 const hasFullTheory=Boolean(theory);
 const mediaTypes=[hasChapterResources?"PPT en PDF":"PPT","Audio","Video YouTube","Material extra"];
 const types=item
  ?(hasFullTheory||hasChapterResources?["Teoría completa",...mediaTypes]:mediaTypes)
  :["Teoría","Audio","Video","Diapositivas","PDF adicional"];
 const themeTypes=item
  ?(hasFullTheory||hasChapterResources?["theory","slides","audio","video","extra"]:["slides","audio","video","extra"])
  :["theory","audio","video","slides","extra"];
 const keys=["ppt","audio","youtube","extra"];
 function displayResource(n){
  pane.replaceChildren();
  [...tabsRes.children].forEach((button,k)=>button.setAttribute("aria-pressed",String(k===n)));
  const desc=document.createElement("p");
  if(hasFullTheory&&n===0){
   desc.textContent=theory.description;
   pane.appendChild(desc);
   const link=document.createElement("a");
   link.className="anesthesia-theory-link";
   link.href=theory.href;
   link.target="_blank";
   link.rel="noopener noreferrer";
   link.textContent=item?.tipo==="Seminario"?"Abrir teoría completa del seminario":"Abrir teoría completa de la "+theory.name;
   pane.appendChild(link);
   return;
  }
  if(item){
   if(hasChapterResources&&!hasFullTheory&&n===0){
    desc.textContent="Teoría pendiente de publicación.";
    pane.appendChild(desc);
    return;
   }
   const resourceIndex=hasFullTheory||hasChapterResources?n-1:n;
   const resourceUrl=item.recursos?.[keys[resourceIndex]];
   const fileHint=resourceIndex===3&&item.archivoReferencia?"Material identificado en el listado: "+item.archivoReferencia+
    ". Formato original: "+item.formatoReferencia.toUpperCase()+".":"";
   if(typeof resourceUrl==="string"&&resourceUrl.trim()){
    const urlBase=resourceUrl.split("?")[0].split("#")[0].toLowerCase();
    const isAudio=resourceIndex===1&&/\.(mp3|m4a|aac|ogg|oga|wav|webm)$/.test(urlBase);
    const isPowerPoint=/\.(ppt|pptx|pps|ppsx)$/.test(urlBase);
    const isPdf=urlBase.endsWith(".pdf");
    const youtubeMatch=resourceIndex===2
     ?resourceUrl.match(/^https:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})(?:[/?#].*)?$/i)
     :null;
    if(isAudio){
     // El audio nunca se inserta en pane: pane.replaceChildren() detendría la reproducción.
     selectGlobalAudio(item,resourceUrl);
     desc.textContent="Este audio se controla desde el reproductor general fijo en la parte inferior de la página. Puedes abrir PPT, PDF, material extra o cambiar de clase sin interrumpirlo. Pulsa Reproducir en la barra inferior.";
     pane.appendChild(desc);
     const button=document.createElement("button");
     button.type="button";
     button.className="anesthesia-select-global-audio";
     button.textContent="Seleccionar este audio en el reproductor general";
     button.addEventListener("click",()=>selectGlobalAudio(item,resourceUrl));
     pane.appendChild(button);
     const link=document.createElement("a");
     link.className="anesthesia-original-link";
     link.href=resourceUrl;
     link.target="_blank";
     link.rel="noopener noreferrer";
     link.textContent="Abrir archivo de audio directamente";
     pane.appendChild(link);
    }else if(youtubeMatch){
     desc.textContent="Reproduce la clase directamente en BADBEAR.CAMPUS. Si el canal no permite insertar el video, ábrelo en YouTube.";
     pane.appendChild(desc);
     const frame=document.createElement("iframe");
     frame.className="anesthesia-youtube-viewer";
     frame.src="https://www.youtube-nocookie.com/embed/"+youtubeMatch[1];
     frame.title="Video YouTube · "+item.titulo;
     frame.loading="lazy";
     frame.setAttribute("allowfullscreen","");
     frame.setAttribute("allow","accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
     frame.setAttribute("referrerpolicy","strict-origin-when-cross-origin");
     pane.appendChild(frame);
     const actions=document.createElement("div");
     actions.className="anesthesia-viewer-actions";
     const link=document.createElement("a");
     link.className="resource-link";
     link.href=resourceUrl;
     link.target="_blank";
     link.rel="noopener noreferrer";
     link.textContent="Ver directamente en YouTube";
     actions.appendChild(link);
     pane.appendChild(actions);
    }else if(isPowerPoint||isPdf){
     desc.textContent=isPowerPoint
      ?"Presentación en línea: consulta las diapositivas sin descargar el archivo. El visor funciona mediante Microsoft Office Web Viewer."
      :resourceIndex===0
       ?"Presentación de la clase en formato PDF. Consulta las diapositivas directamente dentro del aula."
       :"Documento PDF: consulta el material directamente dentro del aula.";
     pane.appendChild(desc);
     const viewerUrl=isPowerPoint
      ?"https://view.officeapps.live.com/op/embed.aspx?src="+encodeURIComponent(resourceUrl)
      :resourceUrl+"#toolbar=1&navpanes=0";
     const frame=document.createElement("iframe");
     frame.className="anesthesia-embedded-viewer";
     frame.src=viewerUrl;
     frame.title="Visor de "+types[n]+" · "+item.titulo;
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
  }else{desc.textContent=types[n]+" pendiente de publicación. No existe todavía un archivo o enlace oficial para este recurso.";pane.appendChild(desc)}
 }
 types.forEach((name,n)=>{
  const button=document.createElement("button");button.type="button";button.textContent=name;button.dataset.format=themeTypes[n];button.addEventListener("click",()=>displayResource(n));tabsRes.appendChild(button);
 });
 resources.append(tabsRes,pane);displayResource(0);
 toggle.addEventListener("click",()=>{
  resources.hidden=!resources.hidden;toggle.textContent=resources.hidden?"Ver recursos":"Ocultar recursos";
  toggle.setAttribute("aria-expanded",String(!resources.hidden));
 });
 article.appendChild(resources);
 if(item&&deepLink===item.id){article.classList.add("lesson-linked");resources.hidden=false;toggle.textContent="Ocultar recursos";toggle.setAttribute("aria-expanded","true");}
}
function lessonHeader(article,type,number,title,status,published){
 const header=text("div","","lesson-header");
 const summary=text("div","","lesson-summary");
 const copy=text("div","","lesson-copy");
 const ordinal=text("span",String(number).padStart(2,"0"),"lesson-number");
 ordinal.setAttribute("aria-hidden","true");
 copy.append(text("p",type,"lesson-label"),text("h4",title));
 copy.appendChild(text("span",status,"lesson-meta"+(published?" is-published":"")));
 summary.append(ordinal,copy);
 header.appendChild(summary);
 article.appendChild(header);
 return header;
}

function renderAnesthesia(){
 for(const section of anestSections){
  const group=text("section","","anesthesia-group");
  group.appendChild(text("h4",section.nombre+" · "+section.items.length+(section.id==="teoria"?" clases":" seminarios"),"anesthesia-group-title"));
  const list=text("div","","lesson-list");
  for(const item of section.items){
   const article=text("article","","lesson anesthesia-lesson");
   article.id=item.id;
   const theory=completeTheory[item.id];
   const count=Object.values(item.recursos||{}).filter(Boolean).length;
   const header=lessonHeader(article,section.id==="teoria"?"Clase":"Seminario",item.numero,item.titulo,
     count?count+(count===1?" recurso disponible":" recursos disponibles"):"Recursos pendientes",Boolean(count));
   const theoryLink=theory?text("a","Leer teoría completa","anesthesia-theory-link"):null;
   if(theoryLink){
    theoryLink.href=theory.href;
    theoryLink.target="_blank";
    theoryLink.rel="noopener noreferrer";
   }
   resourcePanel(article,header,item,theoryLink);
   list.appendChild(article);
  }
  group.appendChild(list);
  content.appendChild(group);
 }
}

function renderRegular(){
 const list=text("div","","lesson-list");
 for(let i=0;i<lessonCount(selected);i++){
  const u=selected,id=lessonId(u,i);
  const clase=(u===0?torax:u===2?cabezaCuello:[])[i];
  const article=text("article","","lesson");
  article.dataset.lessonId=id;
  article.id=id;
  const theoryHref=clase?.teoria;
  const status=theoryHref?"Teoría publicada":"Contenido pendiente";
  const header=lessonHeader(article,clase?.tipo||"Clase",i+1,lessonName(u,i),status,Boolean(theoryHref));
  const theoryLink=theoryHref?text("a","Leer teoría completa","anesthesia-theory-link"):null;
  if(theoryLink)theoryLink.href=theoryHref;
  resourcePanel(article,header,clase,theoryLink);
  list.appendChild(article);
 }
 content.appendChild(list);
}

function activateUnit(index,focus=false){
 selected=index;
 render();
 if(focus)tabs.children[index].focus();
}

function render(){
 tabs.replaceChildren();
 units.forEach((unit,u)=>{
  const b=text("button","","unit-tab");
  b.type="button";
  b.style.setProperty("--accent",unit.color);
  b.style.setProperty("--tint",unit.tint);
  b.setAttribute("role","tab");
  b.setAttribute("aria-selected",String(u===selected));
  b.id="batimix-unit-"+(u+1);
  b.tabIndex=u===selected?0:-1;
  b.setAttribute("aria-controls","unit-content");
  b.append(text("span","Unidad "+(u+1),"unit-number"),text("strong",unit.name,"unit-name"),text("small","","unit-progress"));
  b.addEventListener("click",()=>activateUnit(u,true));
  b.addEventListener("keydown",event=>{
   const destinations={ArrowLeft:(u+units.length-1)%units.length,ArrowRight:(u+1)%units.length,Home:0,End:units.length-1};
   if(!Object.hasOwn(destinations,event.key))return;
   event.preventDefault();
   activateUnit(destinations[event.key],true);
  });
  tabs.appendChild(b);
 });
 const unit=units[selected];
 content.replaceChildren();
 content.setAttribute("aria-labelledby",tabs.children[selected].id);
 content.style.setProperty("--accent",unit.color);
 content.style.setProperty("--tint",unit.tint);
 const banner=text("div","","unit-banner");
 const description=text("div","","unit-banner-copy");
 const count=lessonCount(selected);
 const seminars=selected===0?torax.filter(item=>item.tipo==="Seminario").length:0;
 const totalLabel=selected===1?"4 clases teóricas y 11 seminarios"
  :seminars?`${count-seminars} clases y ${seminars} ${seminars===1?"seminario":"seminarios"}`:count+" clases";
 description.append(text("h3",unit.name),text("p",totalLabel));
 const bankLink=text("a","BADBEAR.REALES","unit-bank");
 bankLink.id="quiz-start";
 bankLink.setAttribute("aria-label","BADBEAR.REALES · "+unit.name);
 bankLink.href="../cirugia-batimix/banco-las-reales.html?unidad="+(selected+1)+"#banco";
 banner.append(description,bankLink);
 content.appendChild(banner);
 if(selected===1)renderAnesthesia();else renderRegular();
 progressUpdate();
}
render();
})();
