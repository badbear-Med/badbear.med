const SESSION = "__Host-campus-pilot";
const CAMPUS_ORIGIN = "https://wajomea.group";
const FILES = new Map([
  ["/med", ["prueba-campus/med.html", "text/html; charset=utf-8"]],
  ["/material.pdf", ["prueba-campus/material.pdf", "application/pdf"]],
  ["/audio.mp3", ["prueba-campus/audio.mp3", "audio/mpeg"]],
]);

function reply(body, status = 200, headers = {}) {
  return new Response(body, {status, headers: {
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    ...headers,
  }});
}

function page(body, status = 200) {
  return reply('<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Prueba de BADBEAR.CAMPUS</title><main><h1>Prueba de BADBEAR.CAMPUS</h1>' + body + '</main></html>', status, {
    "Content-Type": "text/html; charset=utf-8",
    "Content-Security-Policy": "default-src 'none'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
  });
}

function cookie(token = "", age = 0) {
  return SESSION + "=" + token + "; Path=/; Max-Age=" + age + "; HttpOnly; Secure; SameSite=Lax";
}

function tokenFrom(request) {
  return (request.headers.get("Cookie") || "").split(";").map(value => value.trim())
    .find(value => value.startsWith(SESSION + "="))?.slice(SESSION.length + 1) || "";
}

function campus(env, path, init) {
  return env.CAMPUS.fetch(new Request("https://badbear-campus-api.wajomea-group.workers.dev" + path, init));
}

function authorization(token) {
  return {Authorization: "Bearer " + token, Origin: CAMPUS_ORIGIN};
}

function loginPage(message = "", status = 200) {
  return page(message + '<form method="post" action="/login"><label>Código de alumno <input name="codigo" autocomplete="username" required maxlength="40"></label><label> Contraseña <input name="password" type="password" autocomplete="current-password" required maxlength="256"></label><button>Entrar</button></form>', status);
}

async function login(request, env) {
  if (!/^application\/x-www-form-urlencoded(?:;|$)/i.test(request.headers.get("Content-Type") || "")) {
    return reply("Formato no admitido.", 415);
  }
  // Bound the form before parsing it, including requests without Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return reply("Formulario requerido.", 400);
  const decoder = new TextDecoder();
  let size = 0;
  let form = "";
  for (;;) {
    const {done, value} = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 8192) {
      await reader.cancel();
      return reply("Formulario demasiado grande.", 413);
    }
    form += decoder.decode(value, {stream: true});
  }
  const fields = new URLSearchParams(form + decoder.decode());
  const headers = {"Content-Type": "application/json", Origin: CAMPUS_ORIGIN};
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) headers["CF-Connecting-IP"] = ip;
  const result = await campus(env, "/api/login", {
    method: "POST", headers,
    body: JSON.stringify({codigo: fields.get("codigo"), password: fields.get("password")}),
  });
  if (result.status === 401) return loginPage("<p>Revisa el código y la contraseña.</p>", 401);
  if (result.status === 429) return loginPage("<p>Espera antes de volver a intentarlo.</p>", 429);
  if (!result.ok) return reply("Campus no pudo iniciar la sesión.", 503);
  const {token} = await result.json();
  if (typeof token !== "string" || !/^[a-zA-Z0-9_-]{32,256}$/.test(token)) return reply("Sesión no disponible.", 503);
  return reply(null, 303, {Location: "/", "Set-Cookie": cookie(token, 28800)});
}

async function serveFile(request, bucket, [key, type]) {
  const partial = request.headers.get("Range") && request.method === "GET";
  const object = request.method === "HEAD" ? await bucket.head(key) :
    await bucket.get(key, partial ? {range: request.headers} : undefined);
  if (!object) return reply("Archivo de prueba no disponible.", 404);
  const headers = {"Content-Type": type, "Accept-Ranges": "bytes"};
  if (type.startsWith("text/html")) {
    headers["Content-Security-Policy"] = "default-src 'none'; style-src 'unsafe-inline'; img-src 'self' data:; base-uri 'none'; frame-ancestors 'none'";
  }
  const range = partial && object.range;
  if (range && range.offset !== undefined && range.length !== undefined) {
    headers["Content-Range"] = "bytes " + range.offset + "-" + (range.offset + range.length - 1) + "/" + object.size;
    headers["Content-Length"] = String(range.length);
    return reply(object.body, 206, headers);
  }
  headers["Content-Length"] = String(object.size);
  return reply(request.method === "HEAD" ? null : object.body, 200, headers);
}

export default {
  async fetch(request, env) {
    try {
      const {origin, pathname} = new URL(request.url);
      const token = tokenFrom(request);
      if (request.method === "POST") {
        if (request.headers.get("Origin") !== origin) return reply("Origen no permitido.", 403);
        if (pathname === "/login") return await login(request, env);
        if (pathname === "/logout") {
          if (token) {
            const result = await campus(env, "/api/logout", {method: "POST", headers: authorization(token)});
            if (!result.ok && result.status !== 401) return reply("No se pudo cerrar la sesión.", 503);
          }
          return reply(null, 303, {Location: "/login", "Set-Cookie": cookie()});
        }
      }
      if (request.method !== "GET" && request.method !== "HEAD") return reply("Método no permitido.", 405);
      if (pathname === "/login") return loginPage();
      if (pathname !== "/" && !FILES.has(pathname)) return reply("Ruta inexistente.", 404);
      if (!token) return reply(null, 303, {Location: "/login"});
      const result = await campus(env, "/api/sesion", {headers: authorization(token)});
      if (result.status === 401) return reply(null, 303, {Location: "/login", "Set-Cookie": cookie()});
      if (!result.ok) return reply("Validación de Campus no disponible.", 503);
      if (pathname === "/") return page('<ul><li><a href="/med">Página médica</a></li><li><a href="/material.pdf">Material en PDF</a></li><li><a href="/audio.mp3">Pista de audio</a></li></ul><form method="post" action="/logout"><button>Cerrar sesión</button></form>');
      return await serveFile(request, env.PILOT_ASSETS, FILES.get(pathname));
    } catch {
      return reply("La prueba de Campus no está disponible.", 503);
    }
  },
};
