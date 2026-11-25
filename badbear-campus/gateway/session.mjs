const COOKIE = "__Host-badbear-campus";
const CAMPUS_HOME = "/badbear-campus/index.html";
const PROFILE_PATH = "/__campus/profile";
const PHOTO_PATH = PROFILE_PATH + "/photo";
const PHOTO_LIMIT = 2 * 1024 * 1024;
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

const ACCOUNT_STYLE = ":root{color-scheme:dark;--ink:#edf6ff;--muted:#a8c0da;--accent:#7de8f2;--line:#8cbfe533}\n*{box-sizing:border-box}\nbody{margin:0;min-height:100svh;color:var(--ink);background:radial-gradient(ellipse at 84% 24%,#16445e 0%,transparent 55%),radial-gradient(ellipse at 13% 92%,#253867 0%,transparent 56%),#081628;font:1rem/1.55 system-ui,sans-serif}\na{color:inherit;text-decoration:none}\nbutton,summary{font:inherit}\n:focus-visible{outline:3px solid var(--accent);outline-offset:4px}\n.top{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1rem clamp(1rem,5vw,5rem);border-bottom:1px solid var(--line);background:#09172be8}\n.brand{display:inline-flex;align-items:center;gap:.65rem;font-weight:800;letter-spacing:.025em;white-space:nowrap}\n.brand img{width:2.4rem;height:2.4rem;border-radius:.6rem}\n.brand span{color:var(--accent)}\ndetails{position:relative}\nsummary{display:flex;align-items:center;gap:.6rem;cursor:pointer;list-style:none;white-space:nowrap}\nsummary::-webkit-details-marker{display:none}\nsummary::after{content:\"\";width:.43rem;height:.43rem;border:solid currentColor;border-width:0 2px 2px 0;transform:translateY(-2px) rotate(45deg)}\ndetails[open] summary::after{transform:translateY(2px) rotate(225deg)}\n.menu{position:absolute;inset-inline-end:0;top:calc(100% + .45rem);min-width:11rem;padding:.3rem;border:1px solid var(--line);border-radius:.85rem;background:#102743;box-shadow:0 1rem 2rem #02091277}\n.menu a{display:block;padding:.55rem .7rem;border-radius:.5rem;white-space:nowrap}\n.menu a:hover,.menu a[aria-current=\"page\"]{background:#224366}\nmain{position:relative;isolation:isolate;display:grid;align-items:center;min-height:calc(100svh - 77px);overflow:hidden;padding:clamp(2rem,7vw,7rem) clamp(1rem,8vw,9rem)}\n.watermark{position:absolute;z-index:-1;inset-inline-end:clamp(-9rem,3vw,4rem);width:clamp(20rem,53vw,53rem);opacity:.18;pointer-events:none;filter:drop-shadow(0 0 4rem #60ddea88)}\n.card{width:min(100%,44rem);padding:clamp(1.2rem,4vw,3rem);background:linear-gradient(150deg,#102a48f5,#0a1d33f7);border:1px solid var(--line);border-radius:1.5rem;box-shadow:0 2rem 5rem #030a1766}\nh1{margin:0 0 1.35rem;font-size:clamp(2rem,6vw,3.75rem);letter-spacing:-.055em;line-height:1.05}\n.identity{display:flex;align-items:center;gap:clamp(.75rem,3vw,1.4rem);padding:1rem 0 1.4rem;border-block:1px solid var(--line)}\n.initials{display:grid;place-items:center;flex:none;width:clamp(3.3rem,9vw,5rem);aspect-ratio:1;border-radius:1rem;background:linear-gradient(145deg,#7ce8f1,#83a7ff);color:#092541;font-size:clamp(1.1rem,3vw,1.8rem);font-weight:850}\n.identity dl,.student-code{margin:0;min-width:0}\ndt{color:var(--muted);font-size:.85rem;font-weight:650}\ndd{margin:0;font-size:clamp(1.1rem,3vw,1.55rem);font-weight:720;overflow-wrap:anywhere}\n.student-code{padding:1.1rem 0;border-bottom:1px solid var(--line)}\n.student-code dd{color:var(--accent);font-variant-numeric:tabular-nums}\n.actions{display:flex;flex-wrap:wrap;gap:.65rem;margin-top:1.4rem}\n.action,.confirm,summary{padding:.55rem .85rem;border:1px solid var(--line);border-radius:.65rem;font-weight:700}\n.action:hover,summary:hover{background:#21476b}\n.confirm{background:#acecf4;color:#0b2340;cursor:pointer}\n@media(max-width:420px){.brand{font-size:.78rem;letter-spacing:0}.brand img{width:1.8rem;height:1.8rem}summary{padding:.4rem .58rem}.top{gap:.5rem}}\n@media(prefers-reduced-motion:no-preference){.card{animation:arrive .35s ease-out both}@keyframes arrive{from{opacity:0;transform:translateY(.55rem)}to{opacity:1;transform:translateY(0)}}}\n.profile-avatar{position:relative;overflow:hidden}.profile-avatar img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}\n.profile-settings{margin-top:1.5rem;padding:1rem 0;border-block:1px solid var(--line)}.profile-settings h2{margin:0;font-size:1.1rem}.profile-settings p{color:var(--muted)}.profile-settings form{display:flex;flex-wrap:wrap;align-items:center;gap:.6rem;margin:.5rem 0}.profile-settings input{max-width:100%;font:inherit}.profile-settings button{cursor:pointer}";

function accountPage(title, content, currentPath) {
  const nonce = crypto.randomUUID();
  const profileCurrent = currentPath === PROFILE_PATH ? ' aria-current="page"' : '';
  return new Response(`<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title} · BADBEAR.CAMPUS</title>
  <link rel="icon" href="/dermatologia/badbear_logo.png">
  <style nonce="${nonce}">${ACCOUNT_STYLE}</style>
</head>
<body>
  <header class="top">
    <a class="brand" href="${CAMPUS_HOME}"><img src="/dermatologia/badbear_logo.png" alt=""><div>BADBEAR.<span>CAMPUS</span></div></a>
    <details>
      <summary>Mi cuenta</summary>
      <nav class="menu" aria-label="Cuenta de Campus">
        <a href="${PROFILE_PATH}"${profileCurrent}>Mi perfil</a>
        <a href="${LOGOUT_PATH}">Cerrar sesión</a>
      </nav>
    </details>
  </header>
  <main>
    <img class="watermark" src="/assets/img/wajomea-wg-logo.svg" alt="" aria-hidden="true">
    <section class="card" aria-labelledby="account-title">
      <h1 id="account-title">${title}</h1>
      ${content}
    </section>
  </main>
</body>
</html>`, {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": `default-src 'none'; img-src 'self'; style-src 'nonce-${nonce}'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'`,
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

async function photoKey(code) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(code)));
  return "campus-profile/" + Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2,"0")).join("");
}

async function readPhotoForm(request) {
  const type = request.headers.get("Content-Type") || "";
  if (!/^multipart\/form-data\s*;/i.test(type) || !request.body) return null;
  const buffer = new Uint8Array(PHOTO_LIMIT + 8192);
  const reader = request.body.getReader();
  let size = 0;
  for (;;) {
    const {done, value} = await reader.read();
    if (done) break;
    if (size + value.byteLength > buffer.length) {
      await reader.cancel();
      return null;
    }
    buffer.set(value, size);
    size += value.byteLength;
  }
  try {
    return await new Response(buffer.subarray(0, size), {headers: {"Content-Type": type}}).formData();
  } catch {
    return null;
  }
}

async function photoType(file) {
  if (!file || typeof file === "string" || file.size < 12 || file.size > PHOTO_LIMIT) return "";
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const matches = (offset, signature) => signature.every((byte, i) => bytes[offset + i] === byte);
  if (matches(0, [255, 216, 255])) return "image/jpeg";
  if (matches(0, [137, 80, 78, 71, 13, 10, 26, 10])) return "image/png";
  if (matches(0, [82, 73, 70, 70]) && matches(8, [87, 69, 66, 80])) return "image/webp";
  return "";
}

async function managePhoto(request, url, bucket, key) {
  if (!bucket) return response(503);
  if (request.method === "GET") {
    const object = await bucket.get(key);
    const type = object?.httpMetadata?.contentType;
    if (!["image/jpeg", "image/png", "image/webp"].includes(type)) return response(404);
    return new Response(object.body, {headers: {
      "Content-Type": type, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff",
      "Cross-Origin-Resource-Policy": "same-origin",
    }});
  }

  if (request.headers.get("Origin") !== url.origin) return response(403);
  const form = await readPhotoForm(request);
  let status = "invalid";
  if (form?.get("action") === "remove") {
    await bucket.delete(key);
    status = "removed";
  } else {
    const file = form?.get("photo");
    const type = await photoType(file);
    if (type) {
      await bucket.put(key, await file.arrayBuffer(), {httpMetadata: {contentType: type}});
      status = "saved";
    }
  }
  return response(303, {Location: PROFILE_PATH + "?photo=" + status});
}

async function accountRoute(request, campus, url, bucket) {
  const token = readCookie(request);
  const headers = {Authorization: "Bearer " + token, Origin: url.origin};
  const isLogout = url.pathname === LOGOUT_PATH;
  const isPhoto = url.pathname === PHOTO_PATH;
  if (isLogout && request.method === "POST") {
    if (request.headers.get("Origin") !== url.origin) return response(403);
    if (!token) return loginRedirect();
    const result = await campus.fetch("https://badbear-campus-api.wajomea-group.workers.dev/api/logout", {method: "POST", headers, redirect: "manual"});
    await result.body?.cancel();
    return result.ok || result.status === 401 ? loginRedirect() : response(503);
  }
  if (request.method !== "GET" && !(isPhoto && request.method === "POST")) return response(405, {Allow: isLogout || isPhoto ? "GET, POST" : "GET"});
  if (!token) return loginRedirect();
  const result = await campus.fetch("https://badbear-campus-api.wajomea-group.workers.dev/api/mi-perfil", {headers, redirect: "manual"});
  if (!result.ok || isLogout) {
    await result.body?.cancel();
    if (result.status === 401) return loginRedirect();
    if (!result.ok) return response(503);
    return accountPage("Cerrar sesión", `<form class="actions" method="post" action="${LOGOUT_PATH}"><button class="confirm" type="submit">Confirmar cierre de sesión</button><a class="action" href="${PROFILE_PATH}">Volver a mi perfil</a></form>`, LOGOUT_PATH);
  }
  const {alumno} = await result.json();
  if (!alumno?.codigo) return response(503);
  const key = await photoKey(alumno.codigo);
  if (isPhoto) return managePhoto(request, url, bucket, key);
  const hasPhoto = Boolean(await bucket?.head(key));
  const photoNotice = new Map([
    ["saved", "Guardaste tu foto de perfil."],
    ["removed", "Quitaste tu foto de perfil."],
    ["invalid", "Selecciona una imagen JPG, PNG o WebP de hasta 2 MB."],
  ]).get(url.searchParams.get("photo"));
  const photoSettings = bucket ? `
    <section class="profile-settings" aria-labelledby="photo-title">
      <h2 id="photo-title">Foto de perfil</h2>
      <p id="photo-help">JPG, PNG o WebP. Hasta 2 MB.</p>
      ${photoNotice ? `<p role="status">${photoNotice}</p>` : ""}
      <form method="post" action="${PHOTO_PATH}" enctype="multipart/form-data">
        <input type="file" name="photo" aria-label="Seleccionar foto de perfil" aria-describedby="photo-help" accept="image/jpeg,image/png,image/webp" required>
        <button class="confirm" type="submit">${hasPhoto ? "Cambiar foto" : "Subir foto"}</button>
      </form>
      ${hasPhoto ? `<form method="post" action="${PHOTO_PATH}" enctype="multipart/form-data"><button class="action" type="submit" name="action" value="remove">Quitar foto</button></form>` : ""}
    </section>` : "";
  const initials = String(alumno.nombre ?? "").trim().split(/\s+/u).slice(0, 2)
    .map(word => Array.from(word)[0] ?? "").join("").toLocaleUpperCase("es");
  return accountPage("Mi perfil", `
    <div class="identity">
      <span class="initials profile-avatar" aria-hidden="true">${escapeHtml(initials)}${hasPhoto ? `<img src="${PHOTO_PATH}" alt="">` : ""}</span>
      <dl><dt>Nombre completo</dt><dd>${escapeHtml(alumno.nombre)}</dd></dl>
    </div>
    <dl class="student-code"><dt>Código de alumno</dt><dd>${escapeHtml(alumno.codigo)}</dd></dl>
    ${photoSettings}
    <div class="actions"><a class="action" href="${CAMPUS_HOME}">Volver a Campus</a><a class="action" href="/badbear-med.html">Ir a BADBEAR.MED</a></div>`, PROFILE_PATH);
}

export async function campusGate(request, campus, isPublicPath, bucket) {
  const url = new URL(request.url);

  try {
    if ([PROFILE_PATH, LOGOUT_PATH, PHOTO_PATH].includes(url.pathname)) return await accountRoute(request, campus, url, bucket);
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
