import {campusGate} from "./session.mjs";

const HOME = "https://wajomea.group";
const CAMPUS = "/badbear-campus/index.html";
const ACCOUNT_CSS_PATH = "/__campus/account.css";
const ACCOUNT_CSS = ".bb-campus-account{box-sizing:border-box;position:relative;z-index:1000;display:flex;justify-content:flex-end;padding:.35rem clamp(.75rem,4vw,3rem);background:#0d203d;color:#fff;font:600 .875rem/1.4 system-ui,sans-serif}\n.bb-campus-account details{position:relative}\n.bb-campus-account summary{display:flex;align-items:center;gap:.55rem;cursor:pointer;list-style:none;padding:.38rem .7rem;border:1px solid #527197;border-radius:.55rem;color:#fff}\n.bb-campus-account summary::-webkit-details-marker{display:none}\n.bb-campus-account summary::after{content:\"\";width:.42rem;height:.42rem;border:solid currentColor;border-width:0 1.5px 1.5px 0;transform:rotate(45deg);margin-top:-.2rem}\n.bb-campus-account details[open] summary::after{transform:rotate(225deg);margin-top:.2rem}\n.bb-campus-account summary:hover{background:#203b62}\n.bb-campus-account-panel{position:absolute;inset-inline-end:0;min-width:10.5rem;margin-top:.35rem;padding:.3rem;background:#fff;border:1px solid #d6e0ee;border-radius:.55rem;box-shadow:0 .5rem 1.4rem #0d203d33}\n.bb-campus-account-panel a{display:block;padding:.5rem .65rem;border-radius:.3rem;color:#152c4d;text-decoration:none;white-space:nowrap}\n.bb-campus-account-panel a:hover,.bb-campus-account-panel a:focus-visible{background:#eaf1fa}\n.bb-campus-account :focus-visible{outline:2px solid #428df0;outline-offset:2px}";
const ACCOUNT_MENU = "<div class=\"bb-campus-account\"><details><summary>Mi cuenta</summary><div class=\"bb-campus-account-panel\" role=\"navigation\" aria-label=\"Cuenta de Campus\"><a href=\"/__campus/profile\" target=\"_top\">Mi perfil</a><a href=\"/__campus/logout\" target=\"_top\">Cerrar sesión</a></div></details></div>";
const PUBLIC = new Set([
  "/", "/index.html", "/badbear-campus/", CAMPUS,
  "/badbear-campus/student.js", "/badbear-campus/core.js", "/badbear-campus/results.js",
  "/badbear-campus/campus.css", "/badbear-campus/student-portal.css", "/badbear-campus/campus-vivid.css",
  "/dermatologia/badbear_logo.png", "/assets/css/clean-navigation.css",
  "/assets/css/wajomea-group.css", "/assets/css/wajomea-cinematic.css",
  "/assets/js/wajomea-group.js", "/assets/js/wajomea-video.js", "/assets/js/wajomea-shell-entry.js",
  "/assets/img/wajomea-wg-logo.svg", "/assets/video/wajomea-portada-30s.mp4",
  "/assets/icons/proyectos/neon_music_wave_badge.png", "/assets/icons/proyectos/neon_open_book_badge.png",
  "/assets/icons/proyectos/neon_code_badge_icon.png", "/assets/icons/proyectos/neon_sigma_math_emblem.png",
  "/assets/icons/proyectos/neon_clipboard_checklist_badge.png", "/assets/icons/proyectos/neon_atom_lightbulb_badge.png",
]);

function reply(status, headers = {}) {
  return new Response(null, {status, headers: {"Cache-Control": "private, no-store", ...headers}});
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.wajomea.group") {
      url.host = new URL(HOME).host;
      return reply(308, {Location: url.href});
    }
    if (url.origin !== HOME) return reply(421);

    const guard = await campusGate(request, env.CAMPUS, path => PUBLIC.has(path), env.LARGE_ASSETS);
    if (guard) return guard;
    if (request.method !== "GET" && request.method !== "HEAD") return reply(405, {Allow: "GET, HEAD"});

    if (url.pathname === ACCOUNT_CSS_PATH) {
      return new Response(request.method === "HEAD" ? null : ACCOUNT_CSS, {
        headers: {"Content-Type": "text/css; charset=utf-8", "Cache-Control": "private, no-store"},
      });
    }

    try {
      const path = decodeURIComponent(url.pathname).slice(1);
      const match = /^cirugia-batimix\/media\/instrumentacion\/(catalogo-trimed\.pdf|mesa\.jpg|arevalo-(?:[1-5]|[7-9]|1[0-4])\.mp4|visual-(?:[1-5]|[7-9]|1[0-4])\.jpg)$/.exec(path);
      const stored = env.LARGE_ASSETS_MANIFEST?.[path];
      const file = path === "tesis-1/material/examen-final-tesis-i.pdf" ? {key: "tesis-1/examen-final-tesis-i.pdf"} : match ? {key: "batimix/instrumentacion/" + match[1]} :
        stored && /^campus-site\/[a-f0-9]{64}$/.test(stored.key) ? stored : null;
      if (file) {
        const head = request.method === "HEAD";
        const range = request.headers.get("Range");
        const object = head ? await env.LARGE_ASSETS.head(file.key) :
          await env.LARGE_ASSETS.get(file.key, range ? {range: request.headers} : undefined);
        if (!object) return reply(404);
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("Cache-Control", "private, no-store");
        headers.set("X-Content-Type-Options", "nosniff");
        headers.set("Accept-Ranges", "bytes");
        const part = !head && range && object.range;
        if (part && Number.isInteger(part.offset) && Number.isInteger(part.length)) {
          headers.set("Content-Range", `bytes ${part.offset}-${part.offset + part.length - 1}/${object.size}`);
          headers.set("Content-Length", String(part.length));
          return new Response(object.body, {status: 206, headers});
        }
        headers.set("Content-Length", String(object.size));
        return new Response(head ? null : object.body, {headers});
      }
      const assetUrl = new URL(url);
      if (assetUrl.pathname.endsWith("/")) assetUrl.pathname += "index.html";
      const asset = await env.SITE_ASSETS.fetch(new Request(assetUrl, request));
      const headers = new Headers(asset.headers);
      if (asset.status >= 300 && asset.status < 400 && headers.has("Location")) {
        const target = new URL(headers.get("Location"), url);
        if (target.origin !== HOME) {
          await asset.body?.cancel();
          return reply(502);
        }
      }
      if (assetUrl.pathname === CAMPUS && request.method === "GET" && asset.ok) {
        headers.delete("Content-Length");
        headers.delete("ETag");
        headers.set("Cache-Control", "private, no-store");
        return new HTMLRewriter().on("head", {
          element(head) { head.prepend('<meta name="campus-gateway" content="enabled">', {html: true}); },
        }).transform(new Response(asset.body, {status: asset.status, headers}));
      }
      headers.set("Cache-Control", "private, no-store");
      if (!PUBLIC.has(url.pathname) && request.method === "GET" && asset.status === 200 &&
          /^text\/html(?:;|$)/i.test(headers.get("Content-Type") || "")) {
        headers.delete("Content-Length");
        headers.delete("ETag");
        return new HTMLRewriter()
          .on("head", {element(head) {
            head.append(`<link rel="stylesheet" href="${ACCOUNT_CSS_PATH}">`, {html: true});
          }})
          .on("body", {element(body) {
            body.prepend(ACCOUNT_MENU, {html: true});
          }})
          .transform(new Response(asset.body, {status: asset.status, headers}));
      }
      return new Response(asset.body, {status: asset.status, headers});
    } catch {
      return reply(503);
    }
  },
};
