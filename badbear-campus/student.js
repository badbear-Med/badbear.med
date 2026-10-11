import { $,call,post,message,availability,table,busy } from "./core.js";
let token="",items=[];
function clear() { token="";items=[];$("grades").replaceChildren();$("student-name").textContent="";$("student-code").textContent="";$("results").hidden=true;$("entry").hidden=false; }
function render() {
  const data=items.filter(x=>!$("course").value||x.curso===$("course").value);$("grades").replaceChildren();
  if(!data.length){const p=document.createElement("p");p.className="empty";p.textContent="Todavía no hay resultados publicados para esta selección.";$("grades").append(p);return}
  $("grades").append(table([{key:"curso",label:"Curso"},{key:"periodo",label:"Periodo"},{key:"evaluacion",label:"Evaluación"},{key:"nota",label:"Nota / 20"},{key:"fecha",label:"Fecha"}],data,"Tus evaluaciones publicadas"));
}
async function load() {
  try {const data=await call("/api/mis-resultados",token);items=data.items;$("student-name").textContent=data.alumno.nombre;$("student-code").textContent="Código: "+data.alumno.codigo;
    const previous=$("course").value;$("course").replaceChildren(new Option("Todos los cursos",""));for(const course of [...new Set(items.map(x=>x.curso))].sort())$("course").append(new Option(course,course));if(items.some(x=>x.curso===previous))$("course").value=previous;
    $("entry").hidden=true;$("results").hidden=false;render();message("Resultados actualizados.","success");
  }catch(error){if(error.status===401)clear();throw error;}
}
$("login").addEventListener("submit",event=>{event.preventDefault();busy(async()=>{
  message("Verificando tu acceso…");const data=await post("/api/login","",{codigo:$("codigo").value.trim(),password:$("password").value});$("password").value="";token=data.token;await load();
})});
$("activation").addEventListener("submit",event=>{event.preventDefault();busy(async()=>{
  if($("new-password").value!==$("repeat-password").value)throw Error("Las contraseñas no coinciden.");
  const codigo=$("activation-code").value.trim();message("Activando tu cuenta…");await post("/api/activar","",{codigo,activacion:$("invite").value.trim(),password:$("new-password").value});
  $("activation").reset();$("activation-details").open=false;$("codigo").value=codigo;$("password").focus();message("Cuenta activada. Ya puedes iniciar sesión.","success");
})});
$("logout").addEventListener("click",()=>busy(async()=>{try{await post("/api/logout",token,{})}finally{clear();message("Sesión cerrada.")}}));
$("refresh").addEventListener("click",()=>busy(load));$("course").addEventListener("change",render);
window.addEventListener("pagehide",clear);availability();
