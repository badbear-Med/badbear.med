const FILES = {
  "visual-1.jpg": {
    "bytes": 45908,
    "sha": "91fe315583a41bca31e6073b17a0e8d33e8fc280538ba14334716da2da3adb0d",
    "type": "image/jpeg"
  },
  "visual-2.jpg": {
    "bytes": 46916,
    "sha": "e25b23c9b88943fc6e4eba09b6b83769bc59948445bc272ead709aca9a1b52d6",
    "type": "image/jpeg"
  },
  "visual-3.jpg": {
    "bytes": 38617,
    "sha": "3a59c0b7f301641e595d02e8930078060274ce262fc24511683145b785b51a7b",
    "type": "image/jpeg"
  },
  "visual-4.jpg": {
    "bytes": 58693,
    "sha": "6ac30690366504685e9cf8c8539ecf9b4d8fa75f857ff4e8ce2c0dba2daa8fb9",
    "type": "image/jpeg"
  },
  "visual-5.jpg": {
    "bytes": 40350,
    "sha": "95f0dd93581d7bc1555ebf4fc7d2e66340230bebee7e4f2e9dbe5b4f9edda9fc",
    "type": "image/jpeg"
  },
  "visual-7.jpg": {
    "bytes": 56184,
    "sha": "a82b0c792e98792b290222b611c205d286fb3f05fe96c90ebba7c2bdd3692947",
    "type": "image/jpeg"
  },
  "visual-8.jpg": {
    "bytes": 36153,
    "sha": "854af4ee487ad98d617d6ad43f9fd2e9f5dcdbd97a4cab7535b87a1f3422d378",
    "type": "image/jpeg"
  },
  "visual-9.jpg": {
    "bytes": 44940,
    "sha": "dda896630e6b086a7abd3b2537731e3ec70b410dbfbffce79ce0cdb96113e77e",
    "type": "image/jpeg"
  },
  "visual-10.jpg": {
    "bytes": 35348,
    "sha": "98770498cae42a17fcade22056445dff8af11dab09d285a1a5976918be2123dc",
    "type": "image/jpeg"
  },
  "visual-11.jpg": {
    "bytes": 51785,
    "sha": "0f917732c26f74a7b94ea7fa9bc540ec74eac68e1b21966d6bfc0c673a8b8a3f",
    "type": "image/jpeg"
  },
  "visual-12.jpg": {
    "bytes": 54961,
    "sha": "e7547e0409b37dac54033096bd725524cc17c41f28cc837f95182584c30f344f",
    "type": "image/jpeg"
  },
  "visual-13.jpg": {
    "bytes": 49844,
    "sha": "41c5c9bb283f9d86e359b17bcd4c65d1adbec733c58e993a8f46bf4d4d961e05",
    "type": "image/jpeg"
  },
  "visual-14.jpg": {
    "bytes": 88388,
    "sha": "d84e0c69ace9b569cbafaf5745f903a5c75074abea191f09e7d4b44509c57b2a",
    "type": "image/jpeg"
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
