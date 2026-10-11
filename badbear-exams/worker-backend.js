/* BADBEAR.EXAMS — Worker backend. Deploy to badbear-exams-api only after configuring ADMIN_API_TOKEN as a Cloudflare secret. R2 bindings: APORTES, PUBLICADOS; D1: DB; TURNSTILE_SECRET_KEY. */
const SITE="https://wajomea.group", MAX=10*1024*1024, LIMIT=12*1024*1024;
const json=(value,status=200,origin="")=>Response.json(value,{status,headers:{"Cache-Control":"no-store","Vary":"Origin",...(origin===SITE?{"Access-Control-Allow-Origin":SITE}:{})}});
const bad=(message,status,origin)=>json({error:message},status,origin);
async function equal(a,b){const enc=new TextEncoder();const [x,y]=await Promise.all([crypto.subtle.digest("SHA-256",enc.encode(a)),crypto.subtle.digest("SHA-256",enc.encode(b))]);let diff=0;const aa=new Uint8Array(x),bb=new Uint8Array(y);for(let i=0;i<aa.length;i++)diff|=aa[i]^bb[i];return diff===0}
async function admin(req,env){const authorization=req.headers.get("Authorization")||"";if(!env.ADMIN_API_TOKEN||!authorization.startsWith("Bearer "))return false;return equal(authorization.slice(7),env.ADMIN_API_TOKEN)}
function sniff(b){if(b.length>4&&b[0]===37&&b[1]===80&&b[2]===68&&b[3]===70&&b[4]===45)return["application/pdf","pdf"];if(b.length>7&&[137,80,78,71,13,10,26,10].every((v,i)=>b[i]===v))return["image/png","png"];if(b.length>2&&b[0]===255&&b[1]===216&&b[2]===255)return["image/jpeg","jpg"];return null}
const field=(data,key,n)=>{const x=data.get(key);return typeof x==="string"?x.trim().slice(0,n):""};
async function turnstile(token,req,env){if(!token||!env.TURNSTILE_SECRET_KEY)return false;const f=new FormData();f.set("secret",env.TURNSTILE_SECRET_KEY);f.set("response",token);const ip=req.headers.get("CF-Connecting-IP");if(ip)f.set("remoteip",ip);try{const r=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",body:f,signal:AbortSignal.timeout(8000)});const x=await r.json();return x.success===true&&x.hostname==="wajomea.group"}catch{return false}}
async function rate(req,env){const ip=req.headers.get("CF-Connecting-IP");if(!ip)return false;const hash=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(ip));const id=Array.from(new Uint8Array(hash),x=>x.toString(16).padStart(2,"0")).join("");const window=Math.floor(Date.now()/600000);try{const result=await env.DB.prepare("INSERT INTO limites_aportes (identificador, ventana, intentos) VALUES (?, ?, 1) ON CONFLICT(identificador, ventana) DO UPDATE SET intentos=intentos+1 WHERE intentos<3 RETURNING intentos").bind(id,window).first();return !!result}catch{return false}}
async function upload(req,env,origin){if(!env.DB||!env.APORTES||!env.TURNSTILE_SECRET_KEY)return bad("Servicio no disponible",503,origin);
const size=Number(req.headers.get("Content-Length"));if(size>LIMIT)return bad("Solicitud demasiado grande",413,origin);
const ct=req.headers.get("Content-Type")||"";if(!ct.startsWith("multipart/form-data"))return bad("Se requiere formulario",415,origin);
if(!(await rate(req,env)))return bad("Límite de intentos alcanzado",429,origin);
let data;try{const bytes=await req.arrayBuffer();if(bytes.byteLength>LIMIT)return bad("Solicitud demasiado grande",413,origin);data=await new Request(req.url,{method:"POST",headers:{"Content-Type":ct},body:bytes}).formData()}catch{return bad("Formulario inválido",400,origin)}
if(!(await turnstile(field(data,"cf-turnstile-response",4096),req,env)))return bad("Verificación Turnstile fallida",403,origin);
const course=field(data,"course",120),faculty=field(data,"faculty",120),university=field(data,"university",120),teacher=field(data,"teacher",120),cycle=field(data,"cycle",40),yearText=field(data,"year",4),year=Number(yearText),type=field(data,"type",20),contributor=field(data,"contributor",80),notes=field(data,"notes",600);
if(!course||!/^[0-9]{4}$/.test(yearText)||year<2022||year>2026||!["Parcial","Final","Práctica","Otros"].includes(type)||data.get("permission")===null)return bad("Datos incompletos o inválidos",400,origin);
const file=data.get("file");if(!(file instanceof File)||!file.size||file.size>MAX)return bad("Archivo inválido o mayor de 10 MB",400,origin);
const bytes=new Uint8Array(await file.arrayBuffer()),kind=sniff(bytes);if(!kind)return bad("Solo PDF, PNG o JPG",415,origin);
const digest=await crypto.subtle.digest("SHA-256",bytes);
const fingerprint=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,"0")).join("");
// Check already registered files before writing to the private bucket.
const prior=await env.DB.prepare("SELECT examen_id FROM huellas_examenes WHERE sha256=?").bind(fingerprint).first();
if(prior)return bad("Este archivo ya fue enviado anteriormente. Referencia: "+prior.examen_id,409,origin);
const key="pendientes/"+crypto.randomUUID()+"."+kind[1];await env.APORTES.put(key,bytes,{httpMetadata:{contentType:kind[0]},customMetadata:{estado:"pendiente"}});
try{
let cid=null;if(contributor){const c=await env.DB.prepare("INSERT INTO colaboradores (seudonimo,mostrar_credito) VALUES (?,0)").bind(contributor).run();cid=c.meta.last_row_id}
const c=await env.DB.prepare("INSERT INTO cursos (nombre,facultad,universidad,ciclo) VALUES (?,?,?,?)").bind(course,faculty||null,university||null,cycle||null).run();
const e=await env.DB.prepare("INSERT INTO examenes (curso_id,colaborador_id,titulo,anio,tipo,archivo_privado,estado,observaciones,docente,periodo) VALUES (?,?,?,?,?,?,'pendiente',?,?,?)").bind(c.meta.last_row_id,cid,course,year,type,key,notes||null,teacher||null,cycle||null).run();
try{
 await env.DB.prepare("INSERT INTO huellas_examenes (sha256,examen_id) VALUES (?,?)").bind(fingerprint,e.meta.last_row_id).run();
}catch(error){
 if(String(error).includes("UNIQUE")){await env.DB.prepare("DELETE FROM examenes WHERE id=? AND estado='pendiente'").bind(e.meta.last_row_id).run().catch(()=>{});await env.APORTES.delete(key).catch(()=>{});return bad("Este archivo ya está registrado en la biblioteca.",409,origin)}
 throw error;
}
return json({ok:true,mensaje:"Recibido, pendiente de revisión",referencia:String(e.meta.last_row_id)},201,origin)
}catch(e){await env.APORTES.delete(key).catch(()=>{});return bad("Error al registrar examen",500,origin)}
}
async function list(req,env,origin){const rows=await env.DB.prepare("SELECT e.id,e.titulo,e.anio,e.tipo,e.estado,e.creado_en,e.docente AS teacher,e.periodo AS cycle,c.nombre AS course,c.facultad,c.universidad AS university,co.seudonimo AS contributor FROM examenes e JOIN cursos c ON c.id=e.curso_id LEFT JOIN colaboradores co ON co.id=e.colaborador_id ORDER BY e.id DESC LIMIT 100").all();return json({items:rows.results||[]},200,origin)}
async function review(req,env,origin){const data=await req.json().catch(()=>null),id=Number(data?.id),action=data?.action,reason=String(data?.reason||"").slice(0,500);
if(!Number.isSafeInteger(id)||id<=0||!["aprobar","rechazar"].includes(action))return bad("Datos inválidos",400,origin);
const e=await env.DB.prepare("SELECT id,archivo_privado,archivo_publicado,estado FROM examenes WHERE id=?").bind(id).first();
if(!e)return bad("Examen no encontrado",404,origin);if(e.estado!=="pendiente")return bad("Examen ya revisado",409,origin);
const status=action==="aprobar"?"aprobado":"rechazado";
if(action==="aprobar"){
 const obj=await env.APORTES.get(e.archivo_privado);if(!obj)return bad("Archivo pendiente no encontrado",409,origin);
 // Do not publish if private material has not been manually inspected for permissions, PII and safety.
 const target="aprobados/"+id+"/"+e.archivo_privado.split("/").pop();
 await env.PUBLICADOS.put(target,obj.body,{httpMetadata:obj.httpMetadata});
 const result=await env.DB.prepare("UPDATE examenes SET estado='aprobado',archivo_publicado=?,revisado_en=CURRENT_TIMESTAMP WHERE id=? AND estado='pendiente'").bind(target,id).run();
 if(!result.meta.changes){await env.PUBLICADOS.delete(target);return bad("Cambio simultáneo",409,origin)}
}else{await env.DB.prepare("UPDATE examenes SET estado='rechazado',revisado_en=CURRENT_TIMESTAMP WHERE id=? AND estado='pendiente'").bind(id).run()}
await env.DB.prepare("INSERT INTO revisiones (examen_id,accion,administrador,motivo) VALUES (?,?,?,?)").bind(id,status,"Administrador BADBEAR.EXAMS",reason||null).run();
return json({ok:true,estado:status},200,origin)
}
async function publicList(env,origin){const rows=await env.DB.prepare("SELECT e.id,e.titulo,e.anio,e.tipo,e.docente AS teacher,e.periodo AS cycle,c.nombre AS course,c.facultad,c.universidad AS university FROM examenes e JOIN cursos c ON c.id=e.curso_id WHERE e.estado='aprobado' AND e.archivo_publicado IS NOT NULL ORDER BY e.id DESC LIMIT 200").all();return json({items:rows.results||[]},200,origin)}

const questionId=req=>Number(new URL(req.url).searchParams.get("examen_id"));
async function questions(req,env,origin,isAdmin){
 const id=questionId(req);
 if(!Number.isSafeInteger(id)||id<1)return bad("Examen inválido",400,origin);
 const exam=await env.DB.prepare("SELECT estado FROM examenes WHERE id=?").bind(id).first();
 if(!exam)return bad("Examen no encontrado",404,origin);
 if(!isAdmin&&exam.estado!=="aprobado")return bad("Examen aún no publicado",404,origin);
 const sql=isAdmin
 ?"SELECT * FROM preguntas_examen WHERE examen_id=? ORDER BY numero"
 :"SELECT id,examen_id,numero,enunciado,alternativa_a,alternativa_b,alternativa_c,alternativa_d,alternativa_e,correcta,explicacion,bibliografia FROM preguntas_examen WHERE examen_id=? AND estado='publicada' ORDER BY numero";
 const rows=await env.DB.prepare(sql).bind(id).all();
 return json({items:rows.results||[]},200,origin)
}
async function saveQuestion(req,env,origin){
 const x=await req.json().catch(()=>null);if(!x)return bad("JSON inválido",400,origin);
 const id=Number(x.examen_id),number=Number(x.numero),answer=String(x.correcta||"").trim().toUpperCase(),state=String(x.estado||"borrador");
 const fields=["enunciado","alternativa_a","alternativa_b","alternativa_c","alternativa_d","alternativa_e","explicacion","bibliografia"];
 const values=fields.map(k=>String(x[k]||"").trim());
 if(!Number.isSafeInteger(id)||id<1||!Number.isSafeInteger(number)||number<1||number>300||!["borrador","publicada"].includes(state)||!["A","B","C","D","E"].includes(answer)||values.some((v,i)=>v.length>(i===0?4000:i===6?6000:1500))||values.slice(0,4).some(v=>!v)||!values[6]||(answer==="E"&&!values[5]))return bad("Pregunta incompleta o inválida",400,origin);
 const exam=await env.DB.prepare("SELECT estado FROM examenes WHERE id=?").bind(id).first();if(!exam)return bad("Examen no encontrado",404,origin);
 if(state==="publicada"&&exam.estado!=="aprobado")return bad("Primero aprueba el examen original",409,origin);
 await env.DB.prepare("INSERT INTO preguntas_examen (examen_id,numero,enunciado,alternativa_a,alternativa_b,alternativa_c,alternativa_d,alternativa_e,correcta,explicacion,bibliografia,estado) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(examen_id,numero) DO UPDATE SET enunciado=excluded.enunciado,alternativa_a=excluded.alternativa_a,alternativa_b=excluded.alternativa_b,alternativa_c=excluded.alternativa_c,alternativa_d=excluded.alternativa_d,alternativa_e=excluded.alternativa_e,correcta=excluded.correcta,explicacion=excluded.explicacion,bibliografia=excluded.bibliografia,estado=excluded.estado,actualizado_en=CURRENT_TIMESTAMP").bind(id,number,...values.slice(0,6),answer,values[6],values[7],state).run();
 return json({ok:true,estado:state},200,origin)
}

export default{async fetch(req,env){const path=new URL(req.url).pathname,origin=req.headers.get("Origin")||"";
try{
 if(path==="/health")return json({servicio:"BADBEAR.EXAMS",estado:[env.DB,env.APORTES,env.PUBLICADOS,env.TURNSTILE_SECRET_KEY].every(Boolean)?"operativo":"configuracion_incompleta",conexiones:{base_de_datos:!!env.DB,aportes_privados:!!env.APORTES,examenes_publicados:!!env.PUBLICADOS,turnstile:!!env.TURNSTILE_SECRET_KEY}},200,origin);
 if(req.method==="GET"&&path==="/api/examenes")return await publicList(env,origin);
 if(req.method==="GET"&&path==="/api/preguntas")return await questions(req,env,origin,false);
 if(req.method==="GET"&&path==="/api/examenes/archivo"){
  const id=Number(new URL(req.url).searchParams.get("id"));
  if(!Number.isSafeInteger(id)||id<1)return bad("Identificador inválido",400,origin);
  const entry=await env.DB.prepare("SELECT archivo_publicado FROM examenes WHERE id=? AND estado='aprobado'").bind(id).first();
  if(!entry?.archivo_publicado)return bad("Documento no disponible",404,origin);
  const object=await env.PUBLICADOS.get(entry.archivo_publicado);
  if(!object)return bad("Archivo no encontrado",404,origin);
  const mime=object.httpMetadata?.contentType||"application/octet-stream";
  return new Response(object.body,{headers:{"Content-Type":mime,"Content-Disposition":"attachment; filename=badbear-exams-"+id+(mime==="application/pdf"?".pdf":mime==="image/png"?".png":".jpg"),"X-Content-Type-Options":"nosniff","Cache-Control":"public, max-age=300",...(origin===SITE?{"Access-Control-Allow-Origin":SITE}:{})}});
 }
 if(origin!==SITE)return bad("Origen no autorizado",403,origin);
 if(req.method==="OPTIONS")return new Response(null,{status:204,headers:{"Access-Control-Allow-Origin":SITE,"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Authorization","Access-Control-Max-Age":"600"}});
 if(path==="/api/aportes"&&req.method==="POST")return await upload(req,env,origin);
 if(path==="/api/examenes"&&req.method==="GET")return await publicList(env,origin);
 if(path.startsWith("/api/admin/")){
  if(!(await admin(req,env)))return bad("No autorizado",401,origin);
  if(path==="/api/admin/examenes"&&req.method==="GET")return await list(req,env,origin);
  if(path==="/api/admin/preguntas"&&req.method==="GET")return await questions(req,env,origin,true);
  if(path==="/api/admin/preguntas"&&req.method==="POST")return await saveQuestion(req,env,origin);
  if(path==="/api/admin/archivo"&&req.method==="GET"){
   const id=Number(new URL(req.url).searchParams.get("id"));
   if(!Number.isSafeInteger(id)||id<1)return bad("Identificador inválido",400,origin);
   const row=await env.DB.prepare("SELECT archivo_privado FROM examenes WHERE id=?").bind(id).first();
   if(!row?.archivo_privado)return bad("Archivo no encontrado",404,origin);
   const object=await env.APORTES.get(row.archivo_privado);
   if(!object)return bad("Archivo no disponible",404,origin);
   return new Response(object.body,{headers:{"Content-Type":object.httpMetadata?.contentType||"application/octet-stream","Content-Disposition":"attachment; filename=examen-"+id,"Cache-Control":"no-store","Access-Control-Allow-Origin":SITE}});
  }
  if(path==="/api/admin/revisar"&&req.method==="POST")return await review(req,env,origin);
 }
 return bad("Ruta no encontrada",404,origin)
}catch(e){return bad("Error del servicio",500,origin)}
}};