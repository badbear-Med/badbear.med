const SESSION = "__Host-campus-pilot";
const CAMPUS_ORIGIN = "https://wajomea.group";
const FILES = new Map([
  ["/material.pdf", ["prueba-campus/material.pdf", "application/pdf"]],
  ["/audio.mp3", ["prueba-campus/audio.mp3", "audio/mpeg"]],
]);

// Keep the original page paths so relative links, scripts and styles resolve.
const MED_PATHS = new Set([
  "/app.html", "/badbear-music/catalog.js",
  "/badbear-med.html", "/style.css", "/script.js", "/badbear-campus/clases-en-vivo.css",
  "/dermatologia/badbear_logo.png",
]);

const CARDIO_PDF = "/cardiologia/material-piloto.pdf";
const CARDIO_PDF_ORIGIN = "https://media.wajomea.group/badbear-med/cardiologia/pdf/material-extra/arritmias-cardiacas.pdf";

function isMedPath(path) {
  return MED_PATHS.has(path) || path.startsWith("/assets/") || path.startsWith("/cardiologia/");
}

async function serveMed(request) {
  const url = new URL(request.url);
  const upstreamUrl = new URL(CAMPUS_ORIGIN);
  upstreamUrl.pathname = url.pathname;
  upstreamUrl.search = url.search;
  const range = request.headers.get("Range");
  const upstream = await fetch(url.pathname === CARDIO_PDF ? CARDIO_PDF_ORIGIN : upstreamUrl, {
    method: request.method, redirect: "manual", headers: range ? {Range: range} : undefined,
  });
  if (upstream.status >= 300 && upstream.status < 400) {
    const location = upstream.headers.get("Location");
    await upstream.body?.cancel();
    if (!location) return reply("La página de origen no está disponible.", 502);
    const target = new URL(location, upstreamUrl);
    if (target.origin !== CAMPUS_ORIGIN || !isMedPath(target.pathname)) {
      return reply("La página de origen está fuera del piloto.", 502);
    }
    return reply(null, upstream.status, {Location: target.pathname + target.search});
  }
  const headers = {};
  for (const name of ["Content-Type", "Content-Security-Policy", "Cross-Origin-Resource-Policy", "Accept-Ranges", "Content-Range"]) {
    const value = upstream.headers.get(name);
    if (value) headers[name] = value;
  }
  const response = reply(upstream.body, upstream.status, headers);
  if (url.pathname === "/cardiologia/index.html" && upstream.ok && request.method === "GET") {
    return new HTMLRewriter().on('a[href="' + CARDIO_PDF_ORIGIN + '"]', {
      element(link) { link.setAttribute("href", CARDIO_PDF); },
    }).transform(response);
  }
  return response;
}

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
    "Referrer-Policy": "same-origin",
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
      if (pathname === "/index.html") return reply(null, 303, {Location: "/"});
      if (pathname !== "/" && pathname !== "/med" && !FILES.has(pathname) && !isMedPath(pathname)) return reply("Ruta inexistente.", 404);
      if (!token) return reply(null, 303, {Location: "/login"});
      // The deployed Campus API already validates the session on this route.
      // Use only the status. The profile is never returned to the browser.
      const result = await campus(env, "/api/mi-perfil", {headers: authorization(token)});
      await result.body?.cancel();
      if (result.status === 401) return reply(null, 303, {Location: "/login", "Set-Cookie": cookie()});
      if (!result.ok) return reply("Validación de Campus no disponible.", 503);
      if (pathname === "/") return page('<ul><li><a href="/med">Página médica</a></li><li><a href="/material.pdf">Material en PDF</a></li><li><a href="/audio.mp3">Pista de audio</a></li></ul><form method="post" action="/logout"><button>Cerrar sesión</button></form>');
      if (pathname === "/med") return reply(null, 303, {Location: "/badbear-med.html"});
      if (isMedPath(pathname)) return await serveMed(request);
      return await serveFile(request, env.PILOT_ASSETS, FILES.get(pathname));
    } catch {
      return reply("La prueba de Campus no está disponible.", 503);
    }
  },
};
