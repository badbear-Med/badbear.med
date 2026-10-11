import { $,call,post,message,availability,table,busy } from "./core.js?v=20261011-campus2";
import { parseCSV } from "./csv.js";
import { centralBridge } from "../administracion/bridge.js?v=20261011-central1";
let token="",checked=null;
let reportConnection=()=>{};
const cols=[{key:"codigo",label:"Código"},{key:"nombre",label:"Alumno"},{key:"curso",label:"Curso"},{key:"periodo",label:"Periodo"},{key:"evaluacion",label:"Evaluación"},{key:"nota",label:"Resultado"},{key:"fecha",label:"Fecha"}];
function clearPreview(){checked=null;$("preview-area").hidden=true;$("preview-table").replaceChildren();$("existing").replaceChildren();$("replace").checked=false}
function clearInvitation(){$("invitation").hidden=true;$("invitation-code").textContent=""}
function disconnect(){token="";clearPreview();clearInvitation();$("student").replaceChildren(new Option("Selecciona un alumno",""));$("file").value="";$("reset").checked=false;$("workspace").hidden=true;$("connection").hidden=false;reportConnection(false)}
async function students(){const data=await call("/api/admin/alumnos",token);$("student").replaceChildren(new Option("Selecciona un alumno",""));for(const item of data.items)$("student").append(new Option(item.nombre+" · "+item.codigo+(item.activado?" · Activo":" · Por activar"),item.codigo))}
async function action(fn){await busy(async()=>{try{await fn()}catch(error){if(error.status===401)disconnect();throw error}})}
function connect(key){return action(async()=>{token=key.trim();$("admin-token").value="";try{await students();$("connection").hidden=true;$("workspace").hidden=false;reportConnection(true);message("Administración conectada.","success")}catch(error){disconnect();throw error}})}
$("connect").addEventListener("submit",event=>{event.preventDefault();connect($("admin-token").value)});
$("disconnect").addEventListener("click",()=>{disconnect();message("Administración cerrada.")});
$("file").addEventListener("change",clearPreview);
$("preview").addEventListener("click",()=>action(async()=>{
  clearPreview();const file=$("file").files[0];if(!file||!file.name.toLowerCase().endsWith(".csv"))throw Error("Selecciona un archivo CSV UTF-8.");if(file.size>512000)throw Error("El archivo supera 500 KB.");
  message("Revisando la lista…");let text;try{text=new TextDecoder("utf-8",{fatal:true}).decode(await file.arrayBuffer())}catch{throw Error("Guarda el archivo como CSV UTF-8 para conservar los nombres y acentos.")}
  checked=await post("/api/admin/vista-previa",token,{items:parseCSV(text)});$("summary").textContent=checked.total+" resultados · "+checked.alumnos+" alumnos. Revisa los datos antes de publicar.";
  $("preview-table").append(table(cols,checked.items,"Vista previa de la lista"));$("replace-label").hidden=!checked.existentes.length;
  if(checked.existentes.length)$("existing").append(table([{key:"codigo",label:"Código"},{key:"curso",label:"Curso"},{key:"periodo",label:"Periodo"},{key:"evaluacion",label:"Evaluación"},{key:"anterior",label:"Resultado anterior"},{key:"nueva",label:"Resultado nuevo"}],checked.existentes,"Resultados existentes que se actualizarán"));
  $("preview-area").hidden=false;message("Lista validada. Aún no se ha publicado.","success");
}));
$("publish").addEventListener("click",()=>action(async()=>{
  if(!checked)throw Error("Revisa la lista primero.");if(checked.existentes.length&&!$("replace").checked)throw Error("Autoriza la actualización de los resultados existentes.");
  if(!confirm("¿Publicar "+checked.total+" resultados para "+checked.alumnos+" alumnos?"))return;
  message("Publicando resultados…");const result=await post("/api/admin/publicar",token,{items:checked.items,reemplazar:$("replace").checked});clearPreview();$("file").value="";message(result.publicados+" resultados publicados.","success");await students();
}));
$("student").addEventListener("change",clearInvitation);$("reload-students").addEventListener("click",()=>action(students));
$("invite").addEventListener("click",()=>action(async()=>{
  clearInvitation();const codigo=$("student").value;if(!codigo)throw Error("Selecciona un alumno.");
  if($("reset").checked&&!confirm("¿Generar un código de recuperación para este alumno? Sus sesiones actuales se cerrarán."))return;
  const data=await post("/api/admin/invitacion",token,{codigo,restablecer:$("reset").checked});$("invitation-label").textContent="Código de activación para el alumno "+data.codigo+":";$("invitation-code").textContent=data.activacion;$("invitation-expiry").textContent="Vence: "+new Date(data.expira).toLocaleString("es-PE",{timeZone:"America/Lima"})+" (hora de Perú).";$("invitation").hidden=false;$("reset").checked=false;message("Código generado. Entrégalo únicamente al alumno correspondiente.","success");
}));
reportConnection=centralBridge("campus",{connect,disconnect});
window.addEventListener("pagehide",disconnect);availability();
