import { $,call,post,message,availability,table,busy } from "./core.js?v=20261011-correo1";
import { parseCSV,parseContactsCSV } from "./csv.js?v=20261011-correo1";
import { centralBridge } from "../administracion/bridge.js?v=20261011-central1";
let token="",checked=null,contactsChecked=null;
let reportConnection=()=>{};
const cols=[{key:"codigo",label:"Código"},{key:"nombre",label:"Alumno"},{key:"curso",label:"Curso"},{key:"periodo",label:"Periodo"},{key:"evaluacion",label:"Evaluación"},{key:"nota",label:"Resultado"},{key:"fecha",label:"Fecha"}];
function clearPreview(){checked=null;$("preview-area").hidden=true;$("preview-table").replaceChildren();$("existing").replaceChildren();$("replace").checked=false}
function clearInvitation(){$("invitation").hidden=true;$("invitation-code").textContent=""}
function clearContacts(){contactsChecked=null;$("contacts-area").hidden=true;$("contacts-table").replaceChildren();$("contacts-replace").checked=false}
function disconnect(){token="";clearPreview();clearContacts();clearInvitation();$("student").replaceChildren(new Option("Selecciona un alumno",""));$("file").value="";$("contacts-file").value="";$("email-status").textContent="";$("reset").checked=false;$("workspace").hidden=true;$("connection").hidden=false;reportConnection(false)}
async function mailStatus(){
  try {const data=await call("/api/admin/correos/estado",token);let text=data.configurado&&data.esquema?"Envío por correo configurado · "+data.remitente:"Envío por correo pendiente de configuración. Registra los correos y completa Configurar-Correo.ps1.";
    text+=" · Solicitudes de envío: "+data.enviados_hoy+"/"+data.limite_diario+" hoy y "+data.enviados_mes+"/"+data.limite_mensual+" este mes.";
    if(data.ultimo_envio){const last=data.ultimo_envio;text+=" Último envío: "+last.estado+(last.motivo?" ("+last.motivo+")":"")+". Aceptado significa recibido por el proveedor; revisa su panel para confirmar entrega."}
    $("email-status").textContent=text;
  }catch(error){if(error.status!==404)throw error;$("email-status").textContent="Actualiza el servicio de Campus para habilitar los correos."}
}
let managedStudents=[];
function drawManagedStudents(){const q=$("manage-search").value.trim().toLowerCase(),previous=$("manage-student").value;const select=$("manage-student");select.replaceChildren(new Option("Seleccionar alumno",""));for(const row of managedStudents.filter(x=>(x.codigo+" "+x.nombre).toLowerCase().includes(q)))select.append(new Option(row.nombre+" · "+row.codigo,row.codigo));if(managedStudents.some(x=>x.codigo===previous))select.value=previous;}
async function showManagedStudent(){const student=managedStudents.find(x=>x.codigo===$("manage-student").value);$("manage-form").hidden=!student;$("manage-grades").hidden=!student;if(!student)return;
 const fullname=student.nombre.trim().split(/\s+/);$("manage-code").value=student.codigo;$("manage-first").value=student.nombres||fullname.slice(0,Math.max(1,fullname.length-2)).join(" ");$("manage-last").value=student.apellidos||fullname.slice(Math.max(1,fullname.length-2)).join(" ");$("manage-email").value=student.correo||"";$("manage-dni").value=student.dni||"";$("manage-phone").value=student.celular||"";
 const grades=await call("/api/admin/notas?codigo="+encodeURIComponent(student.codigo),token);const list=$("manage-grade-list");list.replaceChildren();
 for(const grade of grades.items){const line=document.createElement("div");line.style.cssText="border:1px solid #dbe5ed;border-radius:9px;padding:12px;margin:9px 0";const title=document.createElement("strong");title.textContent=grade.curso+" · "+grade.periodo+" · "+grade.evaluacion;const input=document.createElement("input");input.type="number";input.min="0";input.max="20";input.step="0.01";input.value=grade.nota??"";input.setAttribute("aria-label","Nota de "+grade.evaluacion);const date=document.createElement("input");date.type="date";date.value=grade.fecha;const save=document.createElement("button");save.type="button";save.textContent="Guardar nota";save.addEventListener("click",()=>action(async()=>{if(!confirm("¿Confirmas corregir esta nota?"))return;await post("/api/admin/nota/editar",token,{codigo:student.codigo,curso:grade.curso,periodo:grade.periodo,evaluacion:grade.evaluacion,nota:input.value,fecha:date.value});message("Nota actualizada.","success")}));line.append(title,input,date,save);list.append(line)}
 if(!grades.items.length)list.textContent="Sin evaluaciones publicadas.";}
$("manage-search").addEventListener("input",drawManagedStudents);
$("manage-student").addEventListener("change",()=>action(showManagedStudent));
$("manage-form").addEventListener("submit",event=>{event.preventDefault();action(async()=>{const item={codigo:$("manage-code").value,nombres:$("manage-first").value,apellidos:$("manage-last").value,correo:$("manage-email").value,dni:$("manage-dni").value,celular:$("manage-phone").value};if(!confirm("¿Guardar los cambios de la ficha del alumno?"))return;await post("/api/admin/alumnos/ficha",token,item);$("manage-status").textContent="Ficha actualizada.";await students();$("manage-student").value=item.codigo;await showManagedStudent()})});
async function students(){const data=await call("/api/admin/alumnos",token);managedStudents=data.items;drawManagedStudents();$("student").replaceChildren(new Option("Selecciona un alumno",""));for(const item of data.items)$("student").append(new Option(item.nombre+" · "+item.codigo+(item.activado?" · Activo":" · Por activar")+(item.correo?" · Con correo":" · Sin correo"),item.codigo));await mailStatus()}
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
$("contacts-file").addEventListener("change",clearContacts);
$("contacts-preview").addEventListener("click",()=>action(async()=>{
  clearContacts();const file=$("contacts-file").files[0];if(!file||!file.name.toLowerCase().endsWith(".csv"))throw Error("Selecciona un CSV UTF-8 de códigos y correos.");if(file.size>512000)throw Error("El archivo supera 500 KB.");
  let text;try{text=new TextDecoder("utf-8",{fatal:true}).decode(await file.arrayBuffer())}catch{throw Error("Guarda el archivo como CSV UTF-8.")}
  contactsChecked=await post("/api/admin/correos/vista-previa",token,{items:parseContactsCSV(text)});
  $("contacts-summary").textContent=contactsChecked.total+" alumnos · "+contactsChecked.cambios.length+" correos existentes se cambiarán. Comprueba cada alumno y su correo antes de guardar.";
  $("contacts-table").append(table([{key:"codigo",label:"Código"},{key:"nombre",label:"Alumno"},{key:"correo_anterior",label:"Correo anterior"},{key:"correo",label:"Correo registrado"}],contactsChecked.items,"Vista previa de correos"));
  $("contacts-replace-label").hidden=!contactsChecked.cambios.length;$("contacts-area").hidden=false;message("Correos revisados. Aún no se han guardado ni enviado mensajes.","success");
}));
$("contacts-save").addEventListener("click",()=>action(async()=>{
  if(!contactsChecked)throw Error("Revisa los correos primero.");if(contactsChecked.cambios.length&&!$("contacts-replace").checked)throw Error("Autoriza el cambio de los correos existentes.");
  if(!confirm("¿Guardar los correos revisados de "+contactsChecked.total+" alumnos? Estos correos permitirán activar o recuperar sus cuentas."))return;
  const data=await post("/api/admin/correos",token,{items:contactsChecked.items,reemplazar:$("contacts-replace").checked});clearContacts();$("contacts-file").value="";await students();message(data.registrados+" correos guardados. Los alumnos podrán solicitar su enlace desde el portal cuando el envío esté configurado.","success");
}));
$("email-refresh").addEventListener("click",()=>action(mailStatus));
$("invite").addEventListener("click",()=>action(async()=>{
  clearInvitation();const codigo=$("student").value;if(!codigo)throw Error("Selecciona un alumno.");
  if($("reset").checked&&!confirm("¿Generar un código de recuperación para este alumno? Sus sesiones actuales se cerrarán."))return;
  const data=await post("/api/admin/invitacion",token,{codigo,restablecer:$("reset").checked});$("invitation-label").textContent="Código de activación para el alumno "+data.codigo+":";$("invitation-code").textContent=data.activacion;$("invitation-expiry").textContent="Vence: "+new Date(data.expira).toLocaleString("es-PE",{timeZone:"America/Lima"})+" (hora de Perú).";$("invitation").hidden=false;$("reset").checked=false;message("Código generado. Entrégalo únicamente al alumno correspondiente.","success");
}));
reportConnection=centralBridge("campus",{connect,disconnect});
window.addEventListener("pagehide",disconnect);availability();
