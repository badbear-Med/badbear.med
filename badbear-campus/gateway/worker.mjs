import {campusGate} from "./session.mjs";

const HOME = "https://wajomea.group";
const CAMPUS = "/badbear-campus/index.html";
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

    const guard = await campusGate(request, env.CAMPUS, path => PUBLIC.has(path));
    if (guard) return guard;
    if (request.method !== "GET" && request.method !== "HEAD") return reply(405, {Allow: "GET, HEAD"});

    try {
      const asset = await env.SITE_ASSETS.fetch(request);
      const headers = new Headers(asset.headers);
      if (asset.status >= 300 && asset.status < 400 && headers.has("Location")) {
        const target = new URL(headers.get("Location"), url);
        if (target.origin !== HOME) {
          await asset.body?.cancel();
          return reply(502);
        }
      }
      if (url.pathname === CAMPUS && request.method === "GET" && asset.ok) {
        headers.delete("Content-Length");
        headers.delete("ETag");
        headers.set("Cache-Control", "private, no-store");
        return new HTMLRewriter().on("head", {
          element(head) { head.prepend('<meta name="campus-gateway" content="enabled">', {html: true}); },
        }).transform(new Response(asset.body, {status: asset.status, headers}));
      }
      headers.set("Cache-Control", "private, no-store");
      return new Response(asset.body, {status: asset.status, headers});
    } catch {
      return reply(503);
    }
  },
};
