/* Public catalogue and one shared document reader. */
(() => {
  "use strict";
  const $=id=>document.getElementById(id);
  const API="https://badbear-exams-api.wajomea-group.workers.dev";
  const list=$("exam-list"),empty=$("empty"),count=$("count"),dialog=$("exam-reader"),content=$("reader-content"),status=$("reader-status"),fullscreen=$("reader-fullscreen");
  const filters=["q","university","faculty","teacher","year","type"].map($);
  const fullscreenRoot=document.documentElement;
  let exams=[],objectUrl="",request=null,generation=0,image=null,ownsFullscreen=false;
  const norm=s=>String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  const metadata=e=>[e.university,e.faculty,e.teacher?"Docente: "+e.teacher:"",e.year,e.type].filter(Boolean).join(" · ");
  function release(){
    generation++;
    if(request){request.abort();request=null;}
    content.replaceChildren();image=null;
    if(objectUrl){URL.revokeObjectURL(objectUrl);objectUrl="";}
    $("image-zoom").value="fit";$("image-zoom-label").hidden=true;
  }
  async function openExam(exam){
    release();const turn=generation;
    $("reader-title").textContent=exam.title||exam.course||"Examen";
    $("reader-meta").textContent=metadata(exam);
    status.textContent="Cargando documento…";
    if(!dialog.open)dialog.showModal();
    const controller=new AbortController();request=controller;
    const timer=setTimeout(()=>controller.abort(),30000);
    try{
      const url=exam.id?API+"/api/examenes/archivo?id="+encodeURIComponent(exam.id):exam.file;
      const response=await fetch(url,{mode:"cors",credentials:"omit",signal:controller.signal});
      if(!response.ok)throw Error("El archivo no está disponible en este momento.");
      const blob=await response.blob();
      if(turn!==generation||!dialog.open)return;
      if(!["application/pdf","image/png","image/jpeg"].includes(blob.type))throw Error("El formato del archivo no admite lectura en línea.");
      objectUrl=URL.createObjectURL(blob);
      const viewer=document.createElement(blob.type==="application/pdf"?"iframe":"img");
      if(blob.type==="application/pdf"){
        viewer.src=objectUrl+"#toolbar=1&navpanes=0&view=FitH";
        viewer.title="Examen: "+(exam.title||exam.course||"documento");
        viewer.className="pdf-document";
        status.textContent="Usa los controles del PDF para cambiar de página y ajustar el zoom.";
      }else{
        viewer.src=objectUrl;viewer.alt=exam.title||exam.course||"Imagen del examen";viewer.className="image-document";image=viewer;
        $("image-zoom-label").hidden=false;
        status.textContent="Puedes ampliar la imagen y desplazarte por el documento.";
      }
      content.append(viewer);
    }catch(error){
      if(turn!==generation||!dialog.open)return;
      status.textContent=controller.signal.aborted?"La carga tardó demasiado. Cierra el visor y vuelve a abrir el examen.":"No se pudo abrir el examen. "+error.message;
    }finally{
      clearTimeout(timer);
      if(request===controller)request=null;
    }
  }
  function render(){
    const [q,university,faculty,teacher,year,type]=filters;
    const filtered=exams.filter(e=>(!q.value||norm([e.course,e.title,e.faculty,e.university,e.teacher,e.notes].join(" ")).includes(norm(q.value)))&&(!faculty.value||norm(e.faculty).includes(norm(faculty.value)))&&(!university.value||norm(e.university).includes(norm(university.value)))&&(!teacher.value||norm(e.teacher).includes(norm(teacher.value)))&&(!year.value||String(e.year)===year.value)&&(!type.value||e.type===type.value));
    list.replaceChildren();
    for(const exam of filtered){
      const card=document.createElement("article");card.className="exam";
      const mark=document.createElement("span");mark.className="exam-mark";mark.textContent="EX";mark.setAttribute("aria-hidden","true");
      const copy=document.createElement("div");copy.className="exam-copy";
      const title=document.createElement("h3");title.textContent=exam.title||exam.course||"Examen";
      const course=document.createElement("p");course.className="exam-course";
      course.textContent=norm(exam.title||exam.course)===norm(exam.course)?"":exam.course||"";
      course.hidden=!course.textContent;
      const meta=document.createElement("p");meta.className="exam-meta";meta.textContent=metadata(exam);
      copy.append(title,course,meta);card.append(mark,copy);
      const readable=exam.id||(typeof exam.file==="string"&&exam.file.startsWith("./archivos/"));
      if(readable){
        const button=document.createElement("button");button.className="btn read-exam";button.type="button";button.textContent="Leer examen";
        button.setAttribute("aria-haspopup","dialog");button.setAttribute("aria-label","Leer examen: "+(exam.title||exam.course||"documento"));
        button.addEventListener("click",()=>openExam(exam));card.append(button);
      }
      list.append(card);
    }
    count.textContent=filtered.length===1?"1 examen disponible":filtered.length+" exámenes disponibles";
    empty.hidden=filtered.length!==0;
    $("empty-title").textContent=exams.length?"No encontramos coincidencias":"Aún no hay exámenes publicados";
    $("empty-detail").textContent=exams.length?"Prueba con otros filtros o palabras clave.":"Los exámenes aparecerán aquí después de su revisión y aprobación.";
  }
  async function load(){
    const retry=$("retry-catalog");retry.hidden=true;count.textContent="Cargando catálogo…";
    try{
      const response=await fetch(API+"/api/examenes",{cache:"no-store",mode:"cors",credentials:"omit",signal:AbortSignal.timeout(20000)});
      if(!response.ok)throw Error("Catálogo no disponible");
      const data=await response.json();
      exams=Array.isArray(data.items)?data.items.map(e=>({...e,title:e.titulo??e.title??"",type:e.tipo??e.type??"",year:e.anio??e.year,faculty:e.facultad??e.faculty??""})):[];
      const select=$("year"),previous=select.value;
      const years=[...new Set([...exams.map(e=>String(e.year||"")).filter(Boolean),"2026","2025","2024","2023","2022"])].sort((a,b)=>Number(b)-Number(a));
      select.replaceChildren(new Option("Todos los años",""));for(const year of years)select.append(new Option(year,year));select.value=previous;
      render();
    }catch{
      count.textContent="No se pudo cargar la biblioteca. Inténtalo nuevamente.";retry.hidden=false;empty.hidden=false;
      $("empty-title").textContent="No pudimos conectar con el catálogo";
      $("empty-detail").textContent="Puedes reintentar la carga en unos momentos.";
    }
  }
  $("reader-close").addEventListener("click",()=>dialog.close());
  dialog.addEventListener("close",()=>{release();if(ownsFullscreen&&document.fullscreenElement===fullscreenRoot)document.exitFullscreen().catch(()=>{});ownsFullscreen=false;});
  dialog.addEventListener("cancel",release);
  $("image-zoom").addEventListener("change",()=>{if(!image)return;const zoom=$("image-zoom").value;image.style.width=zoom==="fit"?"100%":zoom+"%";image.style.maxWidth=zoom==="fit"?"100%":"none";});
  fullscreen.hidden=!document.fullscreenEnabled||typeof fullscreenRoot.requestFullscreen!=="function";
  fullscreen.addEventListener("click",async()=>{try{if(document.fullscreenElement===fullscreenRoot)await document.exitFullscreen();else{await fullscreenRoot.requestFullscreen();if(dialog.open)ownsFullscreen=true;else await document.exitFullscreen();}}catch{status.textContent="Este navegador no permite pantalla completa aquí. Puedes seguir leyendo en el visor.";}});
  document.addEventListener("fullscreenchange",()=>{const active=document.fullscreenElement===fullscreenRoot;fullscreen.textContent=active?"Salir de pantalla completa":"Pantalla completa";if(!active)ownsFullscreen=false;});
  window.addEventListener("pagehide",()=>{if(dialog.open)dialog.close();release();});
  filters.forEach(filter=>filter.addEventListener("input",render));
  $("retry-catalog").addEventListener("click",load);
  load();
})();
