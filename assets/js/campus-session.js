const KEY = "badbear-campus-portal-session";
const PROFILE = "badbear-campus-portal-profile";
const API = "https://badbear-campus-api.wajomea-group.workers.dev";
const pending = new Map();
let channel;
try { channel = new BroadcastChannel("badbear-campus-session-v1"); } catch {}
function ownToken() { try { return sessionStorage.getItem(KEY) || ""; } catch { return ""; } }
export function saveToken(token) {
  if (!/^[a-f0-9]{64}$/.test(token)) throw Error("Sesión inválida.");
  sessionStorage.setItem(KEY, token);
}
export function forgetToken(broadcast = false) {
  try { sessionStorage.removeItem(KEY); sessionStorage.removeItem(PROFILE); } catch {}
  if (broadcast) channel?.postMessage({type:"logout"});
}
channel?.addEventListener("message", event => {
  const data = event.data || {};
  if (data.type === "request" && ownToken()) channel.postMessage({type:"response",id:data.id,token:ownToken()});
  if (data.type === "response" && pending.has(data.id) && /^[a-f0-9]{64}$/.test(data.token)) pending.get(data.id)(data.token);
  if (data.type === "logout") { forgetToken(); window.dispatchEvent(new Event("campus-session-ended")); }
});
export async function readToken() {
  const token = ownToken();
  if (token || !channel) return token;
  return new Promise(resolve => {
    const id = crypto.randomUUID();
    const finish = token => { if (!pending.has(id)) return; pending.delete(id); if (token) saveToken(token); resolve(token); };
    pending.set(id, finish);
    channel.postMessage({type:"request",id});
    setTimeout(() => finish(""), 400);
  });
}
export async function validateSession(token) {
  if (!/^[a-f0-9]{64}$/.test(token || "")) throw Object.assign(Error("Inicia sesión en BADBEAR.CAMPUS."), {status:401});
  const reply = await fetch(API + "/api/mi-perfil", {headers:{Authorization:"Bearer " + token},credentials:"omit",cache:"no-store",signal:AbortSignal.timeout(12000)});
  if (!reply.ok) throw Object.assign(Error(reply.status === 401 ? "Tu sesión terminó. Ingresa nuevamente a Campus." : "No se pudo validar la sesión de Campus."), {status:reply.status});
  const data = await reply.json();
  if (!data.alumno?.codigo || !data.alumno?.nombre) throw Error("No se recibió una identidad válida de Campus.");
  return data.alumno;
}
export function safeDestination(raw, base = location.href) {
  if (!raw) return null;
  try {
    const target = new URL(raw, base);
    const here = new URL(base);
    if (target.username || target.password || target.protocol !== "https:" || (target.origin !== here.origin && target.origin !== "https://media.wajomea.group")) return null;
    if (/\/badbear-campus\/(?:index\.html)?$/.test(target.pathname)) return null;
    return target;
  } catch { return null; }
}
export async function connectGateway(token) {
  const reply = await fetch("/__campus/session", {method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({token}),signal:AbortSignal.timeout(12000)});
  // GitHub Pages can serve the new interface before the Cloudflare route is activated.
  if ([404,405].includes(reply.status)) return false;
  if (!reply.ok) throw Error("No se pudo habilitar el acceso protegido. Vuelve a ingresar a Campus.");
  const data = await reply.json();
  return data.gateway === true;
}
export async function disconnectGateway() {
  await fetch("/__campus/session", {method:"DELETE",credentials:"same-origin",signal:AbortSignal.timeout(10000)});
}
