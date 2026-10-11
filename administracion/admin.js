const areas={campus:{label:"Campus",title:"Campus · Alumnos y resultados",api:"https://badbear-campus-api.wajomea-group.workers.dev/api/admin/alumnos",page:"../badbear-campus/admin.html?panel=central&v=20261011-central1"},examenes:{label:"Exámenes",title:"Exámenes · Biblioteca y aportes",api:"https://badbear-exams-api.wajomea-group.workers.dev/api/admin/examenes",page:"../badbear-exams/admin.html?panel=central&v=20261011-central1"}};
const by=id=>document.getElementById(id),frames=new Map(),credentials=new Map();
const hasArea=key=>Object.hasOwn(areas,key);
let open=false,revision=0;
function areaChoice(){const key=by("area").value,exam=key==="examenes";by("username").value="Administrador Campus";by("username").disabled=exam;by("email-group").hidden=!exam;by("email").required=exam;by("email").disabled=!exam;by("credential-label").textContent=exam?"Contraseña del administrador":"Credencial administrativa de Campus";}
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
by("area").addEventListener("change",()=>{by("credential").value="";areaChoice()});
by("login").addEventListener("submit",async event=>{
  event.preventDefault();const area=by("area").value;let key=by("credential").value;if(area==="campus")key=key.trim();if(!key||!hasArea(area))return;const attempt=++revision;
  by("enter").disabled=true;by("login-status").textContent="Verificando tu acceso…";
  try{
    if(area==="examenes"){
      const result=await fetch("https://badbear-exams-api.wajomea-group.workers.dev/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:by("email").value.trim(),password:key}),credentials:"omit",cache:"no-store",signal:AbortSignal.timeout(20000)});
      const session=await result.json().catch(()=>({}));if(!result.ok)throw Error(session.error||"No se pudo iniciar sesión.");if(typeof session.token!=="string"||!session.token)throw Error("No se recibió una sesión válida.");key=session.token;
    }
    const response=await fetch(areas[area].api,{headers:{Authorization:"Bearer "+key},credentials:"omit",cache:"no-store",signal:AbortSignal.timeout(20000)});
    const data=await response.json().catch(()=>({}));if(!response.ok)throw Error(data.error||"No se pudo verificar la credencial.");
    if(attempt!==revision)return;
    credentials.set(area,key);open=true;badge(area,true);by("credential").value="";by("login-status").textContent="";by("entry").hidden=true;by("hub").hidden=false;
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
    if(event.data.connected!==true)credentials.delete(area);
  }
});
document.querySelectorAll("[data-view],[data-jump]").forEach(button=>button.addEventListener("click",()=>show(button.dataset.view||button.dataset.jump)));
by("logout").addEventListener("click",close);
window.addEventListener("hashchange",()=>show(location.hash.slice(1),{updateHash:false}));
window.addEventListener("pagehide",close);
const initial=location.hash.slice(1);if(hasArea(initial))by("area").value=initial;areaChoice();
