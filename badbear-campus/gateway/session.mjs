const COOKIE = "__Host-badbear-campus";
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

export async function campusGate(request, campus, isPublicPath) {
  const url = new URL(request.url);

  try {
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
    return response(303, {Location: "/badbear-campus/index.html", "Set-Cookie": sessionCookie()});
  } catch {
    return response(503);
  }
}
