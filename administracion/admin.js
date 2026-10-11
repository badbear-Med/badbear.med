const areas={campus:{label:"Campus",title:"Campus · Alumnos y resultados",api:"https://badbear-campus-api.wajomea-group.workers.dev/api/admin/alumnos",page:"../badbear-campus/admin.html?panel=central&v=20261011-unificado1"},examenes:{label:"Exámenes",title:"Exámenes · Biblioteca y aportes",api:"https://badbear-exams-api.wajomea-group.workers.dev/api/admin/examenes",page:"../badbear-exams/admin.html?panel=central&v=20261011-unificado1"}};
const by=id=>document.getElementById(id),frames=new Map(),credentials=new Map();
const hasArea=key=>Object.hasOwn(areas,key);
let open=false,revision=0;
function badge(area,connected){const dot=by(area+"-badge");dot.classList.toggle("connected",connected);dot.setAttribute("aria-label",connected?"Conectado":"Sin conectar");dot.title=connected?"Conectado":"Sin conectar";}
function close(){revision++;open=false;credentials.clear();for(const [area,frame] of frames){frame.src="about:blank";frame.remove();by("view-"+area).replaceChildren();}frames.clear();for(const area of Object.keys(areas))badge(area,false);by("hub").hidden=true;by("entry").hidden=false;by("credential").value="";by("login-status").textContent="Escritorio cerrado.";by("hub-status").textContent="";}
function show(view,{updateHash=true,focus=true}={}){
  if(!open)return;if(view!=="inicio"&&!hasArea(view))view="inicio";
  for(const key of ["inicio",...Object.keys(areas)])by("view-"+key).hidden=key!==view;
  document.querySelectorAll("[data-view]").forEach(x=>{const active=x.dataset.view===view;x.classList.toggle("active",active);if(active)x.setAttribute("aria-current","page");else x.removeAttribute("aria-current");});
  by("view-title").textContent=view==="inicio"?"Mi escritorio":areas[view].title;
  if(view!=="inicio"&&!frames.has(view)){
    const frame=document.createElement("iframe");frame.title="Administración de "+areas[view].label;frame.referrerPolicy="no-referrer";frame.src=areas[view].page;
    // Existing panels keep their own authenticated API calls and retain state while hidden.
    frames.set(view,frame);by("view-"+view).append(frame);
  }
  if(updateHash&&location.hash!=="#"+view)history.pushState(null,"","#"+view);
  if(focus)by("view-title").focus({preventScroll:true});
}
by("login").addEventListener("submit",async event=>{
  event.preventDefault();const password=by("credential").value,email=by("email").value.trim();if(!password||!email)return;const attempt=++revision;
  by("enter").disabled=true;by("login-status").textContent="Verificando tu acceso…";
  try{
    const health=await fetch("https://badbear-campus-api.wajomea-group.workers.dev/api/health",{credentials:"omit",cache:"no-store",signal:AbortSignal.timeout(20000)});
    const info=await health.json().catch(()=>({}));if(!health.ok||info.acceso_unificado!==true)throw Error("El acceso único de Campus está pendiente de activación. Actualiza el servicio para continuar.");
    if(attempt!==revision)return;
    const result=await fetch("https://badbear-campus-api.wajomea-group.workers.dev/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password}),credentials:"omit",cache:"no-store",signal:AbortSignal.timeout(20000)});
    const session=await result.json().catch(()=>({}));if(!result.ok)throw Error(session.error||"No se pudo iniciar sesión.");
    if(session.ok!==true||typeof session.token!=="string"||!session.token||typeof session.campus_token!=="string"||!session.campus_token)throw Error("No se recibió una sesión válida.");
    if(attempt!==revision)return;
    by("credential").value="";
    const response=await fetch(areas.campus.api,{headers:{Authorization:"Bearer "+session.campus_token},credentials:"omit",cache:"no-store",signal:AbortSignal.timeout(20000)});
    const data=await response.json().catch(()=>({}));if(!response.ok)throw Error(data.error||"No se pudo verificar la credencial.");
    if(attempt!==revision)return;
    credentials.set("campus",session.campus_token);credentials.set("examenes",session.token);open=true;badge("campus",true);badge("examenes",true);by("login-status").textContent="";by("entry").hidden=true;by("hub").hidden=false;
    show(hasArea(location.hash.slice(1))?location.hash.slice(1):"inicio");
  }catch(error){by("login-status").textContent=error.name==="TimeoutError"||error.name==="TypeError"?"No se pudo conectar. Comprueba tu conexión e inténtalo de nuevo.":error.message;}
  finally{by("enter").disabled=false;}
});
window.addEventListener("message",event=>{
  if(!open||event.origin!==location.origin||!event.data||typeof event.data!=="object")return;
  const area=event.data.area,frame=frames.get(area);if(!hasArea(area)||!frame||event.source!==frame.contentWindow)return;
  if(event.data.type==="WG_ADMIN_READY"&&credentials.has(area))frame.contentWindow.postMessage({type:"WG_ADMIN_CONNECT",area,credential:credentials.get(area)},location.origin);
  if(event.data.type==="WG_ADMIN_STATUS"){
    badge(area,event.data.connected===true);
    if(event.data.connected!==true){close();by("login-status").textContent="La conexión administrativa se cerró. Vuelve a iniciar sesión para abrir ambas áreas.";}
  }
});
document.querySelectorAll("[data-view],[data-jump]").forEach(button=>button.addEventListener("click",()=>show(button.dataset.view||button.dataset.jump)));
by("logout").addEventListener("click",close);
window.addEventListener("hashchange",()=>show(location.hash.slice(1),{updateHash:false}));
window.addEventListener("pagehide",close);
