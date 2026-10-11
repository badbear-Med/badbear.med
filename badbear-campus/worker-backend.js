/* BADBEAR.CAMPUS: private D1 binding DB; secrets ADMIN_API_TOKEN and PASSWORD_PEPPER. */
const SITE = "https://wajomea.group";
const encoder = new TextEncoder();
const now = () => Math.floor(Date.now() / 1000);
const hex = bytes => Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, "0")).join("");
const random = () => hex(crypto.getRandomValues(new Uint8Array(32)));
const digest = async text => hex(await crypto.subtle.digest("SHA-256", encoder.encode(text)));
class Problem extends Error { constructor(message, status = 400) { super(message); this.status = status; } }
function response(data, status, origin) {
  return Response.json(data, { status, headers: {
    "Cache-Control": "no-store, private", "Vary": "Origin", "X-Content-Type-Options": "nosniff",
    ...(origin === SITE ? { "Access-Control-Allow-Origin": SITE } : {})
  }});
}
function bearer(req) { return (req.headers.get("Authorization") || "").match(/^Bearer ([a-zA-Z0-9_-]{32,256})$/)?.[1] || ""; }
async function equal(a, b) {
  const x = await digest(a), y = await digest(b);
  let diff = 0; for (let i = 0; i < x.length; i++) diff |= x.charCodeAt(i) ^ y.charCodeAt(i);
  return diff === 0;
}
async function administrator(req, env) {
  if (!env.ADMIN_API_TOKEN || !bearer(req) || !await equal(bearer(req), env.ADMIN_API_TOKEN)) {
    throw new Problem("Credencial administrativa incorrecta.", 401);
  }
}
async function readJSON(req) {
  if (!(req.headers.get("Content-Type") || "").startsWith("application/json")) throw new Problem("Se requiere JSON.", 415);
  // Enforce the limit while reading, including requests without Content-Length.
  if (Number(req.headers.get("Content-Length")) > 512000) throw new Problem("La lista supera el tamaño permitido.", 413);
  const reader = req.body?.getReader(); if (!reader) throw new Problem("Solicitud vacía.");
  const chunks = []; let size = 0;
  for (;;) { const {value, done} = await reader.read(); if (done) break; size += value.length;
    if (size > 512000) { await reader.cancel(); throw new Problem("La lista supera el tamaño permitido.", 413); } chunks.push(value); }
  const bytes = new Uint8Array(size); let offset = 0; for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  try { const value = JSON.parse(new TextDecoder().decode(bytes));
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(); return value;
  } catch { throw new Problem("Datos inválidos."); }
}
function label(value, name, max = 120) {
  if (typeof value !== "string") throw new Problem("Falta " + name + ".");
  const text = value.trim().normalize("NFC");
  if (!text || text.length > max || /[\u0000-\u001f\u007f]/u.test(text)) throw new Problem(name + " inválido.");
  return text;
}
function code(value) {
  const text = label(value, "código del alumno", 40).toUpperCase();
  if (!/^[A-Z0-9][A-Z0-9_-]{1,39}$/.test(text)) throw new Problem("Código inválido: usa entre 2 y 40 letras, números, guiones o guiones bajos.");
  return text;
}
function password(value) {
  if (typeof value !== "string" || value.length < 12 || value.length > 128) throw new Problem("La contraseña debe tener entre 12 y 128 caracteres.");
  return value;
}
async function passwordHash(value, salt, env) {
  // A secret pepper prevents offline guessing with a leaked database alone.
  const pepper = await crypto.subtle.importKey("raw", encoder.encode(env.PASSWORD_PEPPER), {name:"HMAC", hash:"SHA-256"}, false, ["sign"]);
  const input = await crypto.subtle.sign("HMAC", pepper, encoder.encode(value));
  const key = await crypto.subtle.importKey("raw", input, "PBKDF2", false, ["deriveBits"]);
  return hex(await crypto.subtle.deriveBits({name:"PBKDF2", hash:"SHA-256", salt:encoder.encode(salt), iterations:100000}, key, 256));
}
async function rate(req, env, codigo) {
  const ip = req.headers.get("CF-Connecting-IP") || "unknown";
  const window = Math.floor(now() / 900);
  for (const [id, limit] of [["ip:" + ip, 30], ["account:" + codigo, 8]]) {
    const result = await env.DB.prepare("INSERT INTO campus_limites(identificador,ventana,intentos) VALUES (?,?,1) ON CONFLICT(identificador,ventana) DO UPDATE SET intentos=intentos+1 WHERE intentos<? RETURNING intentos")
      .bind(await digest(id), window, limit).first();
    if (!result) throw new Problem("Demasiados intentos. Vuelve a intentarlo en 15 minutos.", 429);
  }
}
async function session(req, env) {
  const token = bearer(req); if (!token) throw new Problem("Inicia sesión para consultar tus resultados.", 401);
  const user = await env.DB.prepare("SELECT a.codigo,a.nombre FROM campus_sesiones s JOIN campus_alumnos a ON a.codigo=s.codigo WHERE s.token_hash=? AND s.expira>? AND a.activo=1")
    .bind(await digest(token), now()).first();
  if (!user) throw new Problem("La sesión terminó. Inicia sesión nuevamente.", 401);
  return user;
}
function rows(input) {
  if (!Array.isArray(input) || !input.length || input.length > 200) throw new Problem("La lista debe contener entre 1 y 200 resultados.");
  const keys = new Set(), names = new Map();
  return input.map((row, index) => {
    try {
      const item = {codigo:code(row.codigo), nombre:label(row.nombre,"nombre",160), curso:label(row.curso,"curso"), periodo:label(row.periodo,"periodo",40), evaluacion:label(row.evaluacion,"evaluación"), fecha:label(row.fecha,"fecha",10)};
      if (!/^\d{4}-\d{2}-\d{2}$/.test(item.fecha) || Number.isNaN(Date.parse(item.fecha)) || new Date(item.fecha).toISOString().slice(0,10) !== item.fecha) throw new Problem("Fecha inválida: usa AAAA-MM-DD.");
      const raw = typeof row.nota === "string" ? row.nota.trim().replace(",", ".") : row.nota;
      if ((typeof raw !== "string" && typeof raw !== "number") || raw === "" || !/^\d{1,2}(?:\.\d{1,2})?$/.test(String(raw))) throw new Problem("Nota inválida.");
      item.nota = Number(raw); if (item.nota < 0 || item.nota > 20) throw new Problem("La nota debe estar entre 0 y 20.");
      const key = JSON.stringify([item.codigo,item.curso,item.periodo,item.evaluacion]);
      if (keys.has(key)) throw new Problem("Resultado duplicado para el mismo alumno y evaluación."); keys.add(key);
      if (names.has(item.codigo) && names.get(item.codigo) !== item.nombre) throw new Problem("El mismo código tiene nombres diferentes."); names.set(item.codigo,item.nombre);
      return item;
    } catch (error) { throw new Problem("Fila " + (index + 2) + ": " + (error instanceof Problem ? error.message : "datos incompletos.")); }
  });
}
async function preview(input, env) {
  const items = rows(input), data = JSON.stringify(items);
  const conflicts = await env.DB.prepare("SELECT a.codigo,a.nombre,json_extract(j.value,'$.nombre') AS importado FROM json_each(?) j JOIN campus_alumnos a ON a.codigo=json_extract(j.value,'$.codigo') WHERE a.nombre<>json_extract(j.value,'$.nombre') GROUP BY a.codigo")
    .bind(data).all();
  if (conflicts.results.length) throw new Problem("Los nombres no coinciden con alumnos registrados: " + conflicts.results.map(x=>x.codigo).join(", ") + ". Corrige la lista antes de publicar.", 409);
  const prior = await env.DB.prepare("SELECT r.codigo,r.curso,r.periodo,r.evaluacion,r.nota AS anterior,json_extract(j.value,'$.nota') AS nueva FROM json_each(?) j JOIN campus_resultados r ON r.codigo=json_extract(j.value,'$.codigo') AND r.curso=json_extract(j.value,'$.curso') AND r.periodo=json_extract(j.value,'$.periodo') AND r.evaluacion=json_extract(j.value,'$.evaluacion')")
    .bind(data).all();
  return {items, total:items.length, alumnos:new Set(items.map(x=>x.codigo)).size, existentes:prior.results};
}
async function importResults(body, env) {
  const check = await preview(body.items, env);
  if (check.existentes.length && body.reemplazar !== true) throw new Problem("La lista incluye resultados ya publicados. Revisa y autoriza su actualización.", 409);
  // One D1 transaction: readers see either the previous list or the complete new list.
  // Name conflicts are also guarded by a trigger in schema.sql, including concurrent imports.
  const data = JSON.stringify(check.items);
  await env.DB.batch([
    env.DB.prepare("INSERT INTO campus_alumnos(codigo,nombre) SELECT DISTINCT json_extract(value,'$.codigo'),json_extract(value,'$.nombre') FROM json_each(?) WHERE 1 ON CONFLICT(codigo) DO UPDATE SET nombre=excluded.nombre").bind(data),
    env.DB.prepare("INSERT INTO campus_resultados(codigo,curso,periodo,evaluacion,nota,fecha) SELECT json_extract(value,'$.codigo'),json_extract(value,'$.curso'),json_extract(value,'$.periodo'),json_extract(value,'$.evaluacion'),json_extract(value,'$.nota'),json_extract(value,'$.fecha') FROM json_each(?) WHERE 1 ON CONFLICT(codigo,curso,periodo,evaluacion) " + (body.reemplazar === true ? "DO UPDATE SET nota=excluded.nota,fecha=excluded.fecha,actualizado_en=strftime('%Y-%m-%dT%H:%M:%fZ','now')" : "DO UPDATE SET nota=CASE WHEN campus_resultados.nota=excluded.nota AND campus_resultados.fecha=excluded.fecha THEN campus_resultados.nota ELSE NULL END")).bind(data),
    env.DB.prepare("INSERT INTO campus_auditoria(accion,detalle) VALUES ('publicar_lista',?)").bind(JSON.stringify({total:check.total,reemplazar:body.reemplazar===true,codigos:[...new Set(check.items.map(x=>x.codigo))]}))
  ]);
  return {ok:true,publicados:check.total,alumnos:check.alumnos};
}
export default {
  async fetch(req, env, ctx) {
    const origin = req.headers.get("Origin") || "", path = new URL(req.url).pathname;
    try {
      if (origin && origin !== SITE) throw new Problem("Origen no permitido.", 403);
      if (req.method === "OPTIONS") return new Response(null, {status:204,headers:{
        "Access-Control-Allow-Origin":SITE,"Access-Control-Allow-Methods":"GET, POST, OPTIONS",
        "Access-Control-Allow-Headers":"Authorization, Content-Type","Access-Control-Max-Age":"600","Vary":"Origin"
      }});
      if (req.method === "GET" && path === "/api/health") {
        let ready = false; if (env.DB && env.ADMIN_API_TOKEN?.length>=32 && env.PASSWORD_PEPPER?.length>=32) {
          try { ready = !!await env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='campus_auditoria'").first(); } catch {}
        }
        return response({servicio:"BADBEAR.CAMPUS",estado:ready?"operativo":"pendiente de conexión"},ready?200:503,origin);
      }
      if (!env.DB || env.ADMIN_API_TOKEN?.length < 32 || !env.ADMIN_API_TOKEN || env.PASSWORD_PEPPER?.length < 32 || !env.PASSWORD_PEPPER) throw new Problem("El portal está pendiente de conexión. Inténtalo más tarde.", 503);
      if (req.method === "POST" && origin !== SITE) throw new Problem("Origen no permitido.", 403);
      if (path.startsWith("/api/admin/")) {
        await administrator(req,env);
        if (req.method === "GET" && path === "/api/admin/alumnos") {
          const users = await env.DB.prepare("SELECT a.codigo,a.nombre,a.activo,CASE WHEN a.password_hash IS NULL THEN 0 ELSE 1 END AS activado,COUNT(r.codigo) AS resultados FROM campus_alumnos a LEFT JOIN campus_resultados r ON r.codigo=a.codigo GROUP BY a.codigo ORDER BY a.nombre").all();
          return response({items:users.results},200,origin);
        }
        if (req.method === "POST" && path === "/api/admin/vista-previa") return response(await preview((await readJSON(req)).items,env),200,origin);
        if (req.method === "POST" && path === "/api/admin/publicar") return response(await importResults(await readJSON(req),env),200,origin);
        if (req.method === "POST" && path === "/api/admin/invitacion") {
          const body = await readJSON(req), codigo = code(body.codigo);
          const user = await env.DB.prepare("SELECT codigo,password_hash FROM campus_alumnos WHERE codigo=? AND activo=1").bind(codigo).first();
          if (!user) throw new Problem("Alumno no registrado.",404);
          if (user.password_hash && body.restablecer !== true) throw new Problem("La cuenta ya está activa. Autoriza el restablecimiento si el alumno perdió su acceso.",409);
          const token = random(), expires = now()+86400;
          await env.DB.batch([
            env.DB.prepare("UPDATE campus_alumnos SET invitacion_hash=?,invitacion_expira=? WHERE codigo=?").bind(await digest(token),expires,codigo),
            env.DB.prepare("DELETE FROM campus_sesiones WHERE codigo=?").bind(codigo),
            env.DB.prepare("INSERT INTO campus_auditoria(accion,detalle) VALUES ('generar_invitacion',?)").bind(JSON.stringify({codigo,restablecer:body.restablecer===true}))
          ]);
          return response({codigo,activacion:token,expira:new Date(expires*1000).toISOString()},200,origin);
        }
      }
      if (req.method === "POST" && (path === "/api/activar" || path === "/api/login")) {
        const body = await readJSON(req), codigo = code(body.codigo), pass = password(body.password);
        await rate(req,env,codigo);
        const user = await env.DB.prepare("SELECT * FROM campus_alumnos WHERE codigo=? AND activo=1").bind(codigo).first();
        if (path === "/api/activar") {
          const token = typeof body.activacion === "string" ? body.activacion.trim() : "";
          if (!user || !/^[a-f0-9]{64}$/.test(token) || !user.invitacion_hash || user.invitacion_expira<=now() || !await equal(await digest(token),user.invitacion_hash)) throw new Problem("Código de activación inválido o vencido.",401);
          const salt = random(), hash = await passwordHash(pass,salt,env);
          const updated = await env.DB.prepare("UPDATE campus_alumnos SET password_hash=?,salt=?,invitacion_hash=NULL,invitacion_expira=NULL WHERE codigo=? AND invitacion_hash=? AND invitacion_expira>? RETURNING codigo")
            .bind(hash,salt,codigo,user.invitacion_hash,now()).first();
          if (!updated) throw new Problem("El código ya fue utilizado o venció.",409);
          await env.DB.prepare("DELETE FROM campus_sesiones WHERE codigo=?").bind(codigo).run();
          return response({ok:true,mensaje:"Cuenta activada. Ya puedes iniciar sesión."},200,origin);
        }
        const calculated = await passwordHash(pass,user?.salt||"badbear-campus-dummy-salt",env);
        if (!user?.password_hash || !await equal(calculated,user.password_hash)) throw new Problem("Código o contraseña incorrectos.",401);
        const token = random(), expires = now()+28800;
        await env.DB.prepare("INSERT INTO campus_sesiones(token_hash,codigo,expira) VALUES (?,?,?)").bind(await digest(token),codigo,expires).run();
        if (ctx?.waitUntil) ctx.waitUntil(env.DB.batch([
          env.DB.prepare("DELETE FROM campus_sesiones WHERE expira<?").bind(now()),
          env.DB.prepare("DELETE FROM campus_limites WHERE ventana<?").bind(Math.floor(now()/900)-2)
        ]).catch(()=>{}));
        return response({token,alumno:{codigo:user.codigo,nombre:user.nombre},expira:expires},200,origin);
      }
      if (req.method === "GET" && path === "/api/mis-resultados") {
        const user = await session(req,env);
        // Student ID comes only from the authenticated session, never a query parameter.
        const result = await env.DB.prepare("SELECT curso,periodo,evaluacion,nota,fecha,actualizado_en FROM campus_resultados WHERE codigo=? ORDER BY periodo DESC,fecha DESC,curso,evaluacion").bind(user.codigo).all();
        return response({alumno:user,items:result.results},200,origin);
      }
      if (req.method === "POST" && path === "/api/logout") {
        await session(req,env); await env.DB.prepare("DELETE FROM campus_sesiones WHERE token_hash=?").bind(await digest(bearer(req))).run();
        return response({ok:true},200,origin);
      }
      throw new Problem("Ruta no disponible.",404);
    } catch (error) {
      return response({error:error instanceof Problem?error.message:"No se completó la operación. Revisa los datos e inténtalo nuevamente."},error instanceof Problem?error.status:500,origin);
    }
  }
};
