import { $,call,post,message,availability,table,busy } from "./core.js?v=20261011-colornotas1";
let token="",items=[],emailToken="";const sessionKey="badbear-campus-portal-session",profileKey="badbear-campus-portal-profile";try{token=sessionStorage.getItem(sessionKey)||""}catch(_){}
const fragment=new URLSearchParams(location.hash.slice(1));
if(fragment.has("acceso")){
  const candidate=fragment.get("acceso")||"";history.replaceState(null,"",location.pathname+location.search);
  if(/^[a-f0-9]{64}$/.test(candidate)){emailToken=candidate;$("email-finish").hidden=false;$("entry").hidden=true}else message("El enlace es inválido. Solicita uno nuevo.","error");
}
function clear() { try{sessionStorage.removeItem(sessionKey);sessionStorage.removeItem(profileKey)}catch(_){} $("campus-progress-count").textContent="Inicia sesión para consultar tu avance.";$("campus-progress-fill").style.width="0%";$("campus-progress-status").textContent="";token="";items=[];$("grades").replaceChildren();$("grades-private-area").hidden=true;$("student-name").textContent="";$("student-code").textContent="";$("results").hidden=true;$("entry").hidden=false; }
function render() {
  const data=items.filter(x=>!$("course").value||x.curso===$("course").value);$("grades").replaceChildren();
  if(!data.length){const p=document.createElement("p");p.className="empty";p.textContent="Todavía no hay resultados publicados para esta selección.";$("grades").append(p);return}
  $("grades").append(table([{key:"curso",label:"Curso"},{key:"periodo",label:"Periodo"},{key:"evaluacion",label:"Evaluación"},{key:"nota",label:"Resultado"},{key:"fecha",label:"Fecha"}],data,"Tus evaluaciones publicadas"));
}
async function loadStudyProgress(){
 $("campus-progress-status").textContent="Consultando avance…";
 try {const data=await call("/api/progreso/cirugia",token);
 const ids=new Set((data.clases||[]).filter(id=>/^(?:sabatina-0[1-4]|seminario-0[1-7]|taller-0[1-2]|teoria-(?:0[1-9]|1[01]))$/.test(id)));
 const total=24,done=ids.size;$("campus-progress-count").textContent=done+" de "+total+" clases estudiadas";$("campus-progress-fill").style.width=Math.round(done/total*100)+"%";$("campus-progress-status").textContent="Progreso actualizado";
 }catch(error){$("campus-progress-count").textContent="Consulta el avance en el aula de Cirugía General.";$("campus-progress-status").textContent="Avance no disponible";}
}
async function load() {
  try {let data;try{data=await call("/api/mi-perfil",token)}catch(error){if(error.status!==404)throw error;let perfil=null;try{perfil=JSON.parse(sessionStorage.getItem(profileKey)||"null")}catch(_){}if(perfil?.codigo&&perfil?.nombre)data={alumno:perfil};else {const legacy=await call("/api/mis-resultados",token);data={alumno:legacy.alumno}}}items=[];$("campus-results-count").textContent="—";$("grades-private-area").hidden=true;$("student-name").textContent=data.alumno.nombre;$("student-code").textContent="Código: "+data.alumno.codigo;
    const previous=$("course").value;$("course").replaceChildren(new Option("Todos los cursos",""));for(const course of [...new Set(items.map(x=>x.curso))].sort())$("course").append(new Option(course,course));if(items.some(x=>x.curso===previous))$("course").value=previous;
    $("entry").hidden=true;$("results").hidden=false;await loadStudyProgress();message("Sesión activa. Solicita tus calificaciones cuando quieras consultarlas.","success");
  }catch(error){if(error.status===401)clear();throw error;}
}
async function requestGrades(){const data=await call("/api/mis-resultados",token);items=data.items;$("campus-results-count").textContent=String(items.length);const previous=$("course").value;$("course").replaceChildren(new Option("Todos los cursos",""));for(const curso of [...new Set(items.map(x=>x.curso))].sort())$("course").append(new Option(curso,curso));if(items.some(x=>x.curso===previous))$("course").value=previous;$("grades-private-area").hidden=false;render();message("Calificaciones disponibles en tu sesión privada.","success")}
$("request-grades").addEventListener("click",()=>busy(requestGrades));
$("login").addEventListener("submit",event=>{event.preventDefault();busy(async()=>{
  message("Verificando tu acceso…");const data=await post("/api/login","",{codigo:$("codigo").value.trim(),password:$("password").value});$("password").value="";token=data.token;try{sessionStorage.setItem(sessionKey,token);sessionStorage.setItem(profileKey,JSON.stringify(data.alumno))}catch(_){}await load();
})});
$("activation").addEventListener("submit",event=>{event.preventDefault();busy(async()=>{
  if($("new-password").value!==$("repeat-password").value)throw Error("Las contraseñas no coinciden.");
  const codigo=$("activation-code").value.trim();message("Activando tu cuenta…");await post("/api/activar","",{codigo,activacion:$("invite").value.trim(),password:$("new-password").value});
  $("activation").reset();$("activation-details").open=false;$("codigo").value=codigo;$("password").focus();message("Cuenta activada. Ya puedes iniciar sesión.","success");
})});
$("email-request").addEventListener("submit",event=>{event.preventDefault();busy(async()=>{
  const data=await post("/api/correo/solicitar","",{codigo:$("email-code").value.trim()});message(data.mensaje,"success");
})});
function clearEmailLink(){emailToken="";$("email-confirm").reset();$("email-finish").hidden=true;$("entry").hidden=false}
$("email-confirm").addEventListener("submit",event=>{event.preventDefault();busy(async()=>{
  if(!emailToken)throw Error("Solicita un nuevo enlace por correo.");if($("email-password").value!==$("email-repeat").value)throw Error("Las contraseñas no coinciden.");
  const data=await post("/api/correo/confirmar","",{token:emailToken,password:$("email-password").value});clearEmailLink();$("codigo").value=data.codigo;$("password").focus();message(data.mensaje,"success");
})});
$("email-cancel").addEventListener("click",()=>{clearEmailLink();message("Puedes solicitar otro enlace desde «Activa o recupera tu cuenta por correo».")});
$("logout").addEventListener("click",()=>busy(async()=>{try{await post("/api/logout",token,{})}finally{clear();message("Sesión cerrada.")}}));
$("refresh").addEventListener("click",()=>busy(requestGrades));$("course").addEventListener("change",render);
function selectCampusSection(section){
  const target=[...document.querySelectorAll(".student-tabs button")].find(button=>button.dataset.section===section);
  if(!target||$("results").hidden)return false;
  document.querySelectorAll(".student-tabs button").forEach(button=>button.classList.toggle("selected",button===target));
  document.querySelectorAll(".tab-section").forEach(view=>view.hidden=view.dataset.view!==section);
  $("results").scrollIntoView({behavior:"smooth",block:"start"});
  return true;
}
document.querySelectorAll(".student-tabs button").forEach(button=>button.addEventListener("click",()=>selectCampusSection(button.dataset.section)));
document.querySelectorAll("[data-campus-section]").forEach(link=>link.addEventListener("click",event=>{
  const section=link.dataset.campusSection;
  if(selectCampusSection(section))event.preventDefault();
}));
if(token&&!emailToken){load().catch(()=>{message("Vuelve a iniciar sesión para continuar.","error")})}
availability();
