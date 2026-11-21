const SITE = "https://wajomea.group";
const COOKIE = "__Secure-badbear-campus";
const publicFiles = new Set([
  "/", "/index.html", "/badbear-campus/", "/badbear-campus/index.html",
  "/assets/css/wajomea-group.css", "/assets/css/wajomea-cinematic.css", "/assets/css/clean-navigation.css",
  "/assets/js/wajomea-group.js", "/assets/js/wajomea-video.js", "/assets/js/wajomea-shell-entry.js",
  "/assets/js/campus-session.js", "/assets/js/campus-access.js", "/assets/css/campus-access.css",
  "/assets/img/wajomea-wg-logo.svg", "/assets/video/wajomea-portada-30s.mp4", "/dermatologia/badbear_logo.png",
  "/badbear-campus/student.js", "/badbear-campus/core.js", "/badbear-campus/results.js",
  "/badbear-campus/campus.css", "/badbear-campus/student-portal.css", "/badbear-campus/campus-vivid.css",
  "/favicon.ico", "/robots.txt"
]);
const headers = {"Cache-Control":"no-store, private", "Referrer-Policy":"no-referrer", "X-Content-Type-Options":"nosniff", "Vary":"Cookie"};
function json(data, status = 200, extra = {}) { return Response.json(data,{status,headers:{...headers,...extra}}); }
function cookie(token, age) { return COOKIE + "=" + token + "; Domain=wajomea.group; Path=/; Max-Age=" + age + "; Secure; HttpOnly; SameSite=Strict"; }
function readCookie(request) {
  const matches = (request.headers.get("Cookie") || "").split(";").map(x=>x.trim()).filter(x=>x.startsWith(COOKIE+"="));
  if (matches.length !== 1) return "";
  const value = matches[0].slice(COOKIE.length+1);
  return /^[a-f0-9]{64}$/.test(value) ? value : "";
}
async function identity(token, env) {
  if (!token) return null;
  if (!env.CAMPUS_API?.fetch) throw Error("missing-binding");
  const response = await env.CAMPUS_API.fetch(new Request("https://badbear-campus-api.wajomea-group.workers.dev/api/mi-perfil",{
    headers:{Origin:SITE,Authorization:"Bearer "+token},redirect:"manual",signal:AbortSignal.timeout(10000)
  }));
  if (response.status === 401) return null;
  if (!response.ok) throw Error("identity-unavailable");
  const data = await response.json();
  if (!data.alumno?.codigo || !data.alumno?.nombre) throw Error("invalid-identity");
  return data.alumno;
}
function denied(request, url) {
  if ((request.method === "GET" || request.method === "HEAD") && (request.headers.get("Accept") || "").includes("text/html")) {
    const login = new URL("/badbear-campus/index.html", SITE);
    login.searchParams.set("next", url.origin === SITE ? url.pathname+url.search : url.href);
    return new Response(null,{status:303,headers:{...headers,Location:login.href}});
  }
  return json({error:"Inicia sesión en BADBEAR.CAMPUS para acceder."},401);
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!["wajomea.group","media.wajomea.group"].includes(url.hostname)) return json({error:"Dominio no permitido."},404);
    if (url.protocol !== "https:") { url.protocol="https:";return Response.redirect(url.href,308); }
    if (url.origin === SITE && url.pathname === "/__campus/status") return json({gateway:true,version:"20261121-campus-only1"});
    if (url.origin === SITE && url.pathname === "/__campus/session") {
      if (!["GET","POST","DELETE"].includes(request.method)) return json({error:"Método no permitido."},405);
      if (request.method !== "GET" && request.headers.get("Origin") !== SITE) return json({error:"Origen no permitido."},403);
      if (request.method === "DELETE") return json({ok:true,gateway:true},200,{"Set-Cookie":cookie("",0)});
      let token = readCookie(request);
      if (request.method === "POST") {
        if (!(request.headers.get("Content-Type") || "").startsWith("application/json")) return json({error:"Se requiere JSON."},415);
        const reader = request.body?.getReader();
        if (!reader) return json({error:"Datos inválidos."},400);
        let text = "";
        const decoder = new TextDecoder();
        let size = 0;
        for (;;) {
          const {value,done} = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > 512) { await reader.cancel(); return json({error:"Solicitud demasiado grande."},413); }
          text += decoder.decode(value,{stream:true});
        }
        text += decoder.decode();
        try { token = JSON.parse(text).token; } catch { return json({error:"Datos inválidos."},400); }
        if (typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token)) return json({error:"Sesión inválida."},401);
      }
      try {
        const alumno = await identity(token,env);
        if (!alumno) return json({error:"Inicia sesión en Campus."},401,{"Set-Cookie":cookie("",0)});
        return json({gateway:true,alumno},200,request.method === "POST" ? {"Set-Cookie":cookie(token,28800)} : {});
      } catch { return json({error:"No se pudo verificar tu sesión. Inténtalo nuevamente."},503); }
    }
    const isPublic = url.origin === SITE && publicFiles.has(url.pathname);
    if (!isPublic) {
      try { if (!await identity(readCookie(request),env)) return denied(request,url); }
      catch { return json({error:"La verificación de Campus no está disponible."},503); }
    }
    if (!["GET","HEAD"].includes(request.method)) return json({error:"Método no permitido."},405);
    // A Worker Route continues to the existing GitHub Pages / R2 origin, without invoking itself.
    const outgoingHeaders = new Headers(request.headers);
    outgoingHeaders.delete("Cookie");outgoingHeaders.delete("Authorization");
    const originResponse = await fetch(new Request(request,{headers:outgoingHeaders}),{redirect:"manual"});
    const responseHeaders = new Headers(originResponse.headers);
    responseHeaders.delete("Set-Cookie");
    if (!isPublic) for (const [key,value] of Object.entries(headers)) responseHeaders.set(key,value);
    return new Response(originResponse.body,{status:originResponse.status,statusText:originResponse.statusText,headers:responseHeaders});
  }
};
