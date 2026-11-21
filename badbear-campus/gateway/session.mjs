const COOKIE = "__Host-badbear-campus";
const CAMPUS_HOME = "/badbear-campus/index.html";
const PROFILE_PATH = "/__campus/profile";
const LOGOUT_PATH = "/__campus/logout";
const SESSION_PATH = "/__campus/session";
const TOKEN = /^[a-zA-Z0-9_-]{32,256}$/;

function sessionCookie(token = "", age = 0) {
  return `${COOKIE}=${token}; Path=/; Max-Age=${age}; HttpOnly; Secure; SameSite=Lax`;
}

function response(status, headers = {}) {
  return new Response(null, {status, headers: {"Cache-Control": "private, no-store", ...headers}});
}

function readCookie(request) {
  const cookies = (request.headers.get("Cookie") || "").split(";");
  const raw = cookies.map(value => value.trim()).find(value => value.startsWith(COOKIE + "="));
  const token = raw?.slice(COOKIE.length + 1) ?? "";
  return TOKEN.test(token) ? token : "";
}

async function validate(campus, token) {
  if (!TOKEN.test(token)) return 401;
  const result = await campus.fetch("https://badbear-campus-api.wajomea-group.workers.dev/api/mi-perfil", {
    headers: {Authorization: "Bearer " + token},
    redirect: "manual",
  });
  await result.body?.cancel();
  return result.status === 200 || result.status === 401 ? result.status : 503;
}

function accountPage(title, content) {
  return new Response(`<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${title} · BADBEAR.CAMPUS</title><main><h1>${title}</h1>${content}<p><a href="${CAMPUS_HOME}">Volver a Campus</a></p></main></html>`, {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": "default-src 'none'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",
      "Referrer-Policy": "same-origin",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function escapeHtml(value) {
  const escapes = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"};
  return String(value ?? "").replace(/[&<>"']/g, character => escapes[character]);
}

function loginRedirect() {
  return response(303, {Location: CAMPUS_HOME, "Set-Cookie": sessionCookie()});
}

async function accountRoute(request, campus, url) {
  const token = readCookie(request);
  const headers = {Authorization: "Bearer " + token, Origin: url.origin};
  const isLogout = url.pathname === LOGOUT_PATH;
  if (isLogout && request.method === "POST") {
    if (request.headers.get("Origin") !== url.origin) return response(403);
    if (!token) return loginRedirect();
    const result = await campus.fetch("https://badbear-campus-api.wajomea-group.workers.dev/api/logout", {method: "POST", headers, redirect: "manual"});
    await result.body?.cancel();
    return result.ok || result.status === 401 ? loginRedirect() : response(503);
  }
  if (request.method !== "GET") return response(405, {Allow: isLogout ? "GET, POST" : "GET"});
  if (!token) return loginRedirect();
  const result = await campus.fetch("https://badbear-campus-api.wajomea-group.workers.dev/api/mi-perfil", {headers, redirect: "manual"});
  if (!result.ok || isLogout) {
    await result.body?.cancel();
    if (result.status === 401) return loginRedirect();
    if (!result.ok) return response(503);
    return accountPage("Cerrar sesión", `<form method="post" action="${LOGOUT_PATH}"><button type="submit">Confirmar cierre de sesión</button></form>`);
  }
  const {alumno} = await result.json();
  if (!alumno) return response(503);
  return accountPage("Mi perfil", `<dl><dt>Nombre</dt><dd>${escapeHtml(alumno.nombre)}</dd><dt>Código de alumno</dt><dd>${escapeHtml(alumno.codigo)}</dd></dl><p><a href="${LOGOUT_PATH}">Cerrar sesión</a></p>`);
}

export async function campusGate(request, campus, isPublicPath) {
  const url = new URL(request.url);

  try {
    if (url.pathname === PROFILE_PATH || url.pathname === LOGOUT_PATH) return await accountRoute(request, campus, url);
    if (url.pathname === SESSION_PATH) {
      if (request.headers.get("Origin") !== url.origin) return response(403);
      if (request.method === "DELETE") return response(204, {"Set-Cookie": sessionCookie()});
      if (request.method !== "POST") return response(405, {Allow: "POST, DELETE"});

      const token = (request.headers.get("Authorization") || "").replace(/^Bearer /, "");
      const status = await validate(campus, token);
      if (status !== 200) return response(status);
      return response(204, {"Set-Cookie": sessionCookie(token, 28800)});
    }

    if ((request.method === "GET" || request.method === "HEAD") && isPublicPath(url.pathname)) return null;
    const status = await validate(campus, readCookie(request));
    if (status === 200) return null;
    if (status !== 401 || (request.method !== "GET" && request.method !== "HEAD")) return response(status);
    return loginRedirect();
  } catch {
    return response(503);
  }
}
