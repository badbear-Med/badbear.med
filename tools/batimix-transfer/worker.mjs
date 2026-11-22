const FILES = {
  "mesa.jpg": {
    "bytes": 143756,
    "sha": "02114bcb3852f1c93422d3ca273d2ee9227b00ca88a8f684562d559f12d5c317",
    "type": "image/jpeg"
  },
  "arevalo-14.mp4": {
    "bytes": 21380330,
    "sha": "b6f716081f26dba63b458a06ea37e8bb84ac1e341cbe36292f44a571603c958a",
    "type": "video/mp4"
  },
  "arevalo-13.mp4": {
    "bytes": 32819573,
    "sha": "5b9169cb914a27a4e4f293b863bc6f3fab386aeb6be384d63298b6bd6e4df1f0",
    "type": "video/mp4"
  },
  "arevalo-12.mp4": {
    "bytes": 49256963,
    "sha": "29e52d5f812dc92584466b006d45b4d9122112c8b721f4aca28173753f2f1807",
    "type": "video/mp4"
  },
  "arevalo-11.mp4": {
    "bytes": 46162345,
    "sha": "ee65d20d15567f5afe3ec0adba57aab1dee2da65b6ba7a27b8a78f4da738f653",
    "type": "video/mp4"
  },
  "arevalo-10.mp4": {
    "bytes": 19706525,
    "sha": "0cef103b1799b39c5e5ddc63a284ef3de8c4caede4992ff9446668a457bdd265",
    "type": "video/mp4"
  },
  "arevalo-9.mp4": {
    "bytes": 45286674,
    "sha": "e2c9b28e904ccbd54258c2ab0794331ee2e3fd619e0535f080ec764c82483296",
    "type": "video/mp4"
  },
  "arevalo-8.mp4": {
    "bytes": 48515361,
    "sha": "ddfa9bd9c14b12e8be31824b275a75c2c258b71109f559841119c7cb27a9830c",
    "type": "video/mp4"
  },
  "arevalo-7.mp4": {
    "bytes": 31116864,
    "sha": "511c0d27dbc90feaadbc3a07253dfedfd0cc70a02a5a9d3b4ea09e651e9921f9",
    "type": "video/mp4"
  },
  "arevalo-5.mp4": {
    "bytes": 56538047,
    "sha": "6515b52559ba87f8654753452631566f4d1e2d44df26702e6ada4e6ba1a3444c",
    "type": "video/mp4"
  },
  "arevalo-4.mp4": {
    "bytes": 69394565,
    "sha": "db3477b5b996527b1a297394d0209197e3a1dd2c7f7cc5f88f8e3aabef4f4fa6",
    "type": "video/mp4"
  },
  "arevalo-3.mp4": {
    "bytes": 16428510,
    "sha": "f34d9e511e55c1a91b769c3d2c6ff001a86727fd3b593f32c352c89e83561213",
    "type": "video/mp4"
  },
  "arevalo-2.mp4": {
    "bytes": 15603789,
    "sha": "89b240f55fb28bc8bfd9d0553d6c1c27e6da7a34fbf4115788f16342a22141d6",
    "type": "video/mp4"
  },
  "arevalo-1.mp4": {
    "bytes": 36165734,
    "sha": "7033aea15f8b30dcf502db4bf9a6640c8a3c1b2f28ee27059434bcb7d8b881f7",
    "type": "video/mp4"
  }
};
const PUBLIC_KEY = "MCowBQYDK2VwAyEAse04A0lvU8IFTlpEDfSkVDyOTk7urNqyW6zdVkFOey4=";
const EXPIRES = 1795378220295;
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
