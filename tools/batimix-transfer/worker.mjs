const FILES = {"catalogo-trimed.pdf":{"bytes":7528239,"sha":"1937afde0d8d90a4cc641aa9d3758e23d2bc6bcc7ea3391376a60aa392920c56","type":"application/pdf"}};
const PUBLIC_KEY = "MCowBQYDK2VwAyEAnhWR4Q8LB+nX/dsjVujRVEWlxWinFUjZXxibURek5DY=";
const EXPIRES = 1795394732107;
const PREFIX = "batimix/instrumentacion/";
const bytes = text => Uint8Array.from(atob(text), char => char.charCodeAt(0));
export default {
  async fetch(request, env) {
    const name = new URL(request.url).pathname.slice(1);
    if (Date.now() > EXPIRES) return new Response(null, {status: 410});
    if (request.method !== "PUT" || !Object.hasOwn(FILES, name)) return new Response(null, {status: 404});
    const file = FILES[name];
    const proof = request.headers.get("X-Batimix-Signature") || "";
    if (!/^[A-Za-z0-9+/]{86}==$/.test(proof)) return new Response(null, {status: 403});
    const key = await crypto.subtle.importKey("spki", bytes(PUBLIC_KEY), "Ed25519", false, ["verify"]);
    if (!await crypto.subtle.verify("Ed25519", key, bytes(proof), new TextEncoder().encode(name+":"+file.sha))) return new Response(null, {status: 403});
    if (Number(request.headers.get("Content-Length")) !== file.bytes) return new Response(null, {status: 400});
    try {
      const object = await env.MEDIA.put(PREFIX + name, request.body, {
        sha256: file.sha, onlyIf: {etagDoesNotMatch:"*"}, httpMetadata: {contentType:file.type},
      });
      if (!object) {
        const existing = await env.MEDIA.head(PREFIX + name);
        if (!existing || existing.size !== file.bytes || existing.checksums.toJSON().sha256 !== file.sha) return new Response(null,{status:409});
      }
      return new Response(null,{status:204});
    } catch {
      return new Response(null,{status:422});
    }
  },
};
