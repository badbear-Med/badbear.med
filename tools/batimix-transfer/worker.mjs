const FILES = {"examen-final-tesis-i.pdf":{"bytes":120766,"sha":"7beecd0b56617c17da3f2ca5b0ad14435a0dcdc4186cf1f37a565230a86a245c","type":"application/pdf"}};
const PUBLIC_KEY = "MCowBQYDK2VwAyEA4+HlgFzJ80i8YHUqmTFl3c7VvHCF82+08/2Hwch/CWA=";
const EXPIRES = 1795451681308;
const PREFIX = "tesis-1/";
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
