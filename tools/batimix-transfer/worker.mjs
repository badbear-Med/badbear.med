const authorizationHash = "03d97eca9f45ae746a80da42ce077a700b6faa644f7efea296b17bb049035d9d";
const pageHashes = {
  "p-01.jpg": "00300521f78f097df9bbe5be9fa9fb17387bdaca2a5bb280a0f4120c83e32095",
  "p-02.jpg": "84d870f37a656373437503ec17423618cc2d74320956fefcfb028aea976f3fab",
  "p-03.jpg": "acc4183d2e593bf2327f73d63cd3501e7b98e320685b2c2043dd7787829fa7bc",
  "p-04.jpg": "d0a801189f25623c600cf0e96478621554080882364173513da7c0e33fa459cc",
  "p-05.jpg": "e5419eb18da89993c0cd2a2293ab4a7fdd9498631c47bf997e4f9c5f9de5edbe",
  "p-06.jpg": "269d08b4e1980cb1e9b971ceb459caa039ee1ed069db232f470d831590a7957b",
  "p-07.jpg": "c4ddb4c89d8035c9ae8d3104b6c0cce686d0443fbb2ea72a009e73374831a9bf",
  "p-08.jpg": "e394f785eb63dfe7407902321ffcdd11b30e0c7df3be1cf49d05c5af731378bf",
  "p-09.jpg": "a6f2b1f95104a84b2b130cd30f96f10f1a87f01f6331df6d995216da088a0ba7",
  "p-10.jpg": "1c7ce0e89de71b2aa8080129660d618f1c698871f64609515cefe872427edb80",
  "p-11.jpg": "c6df5c5380f432bc34d832ea5b42d01c43a2aa80665d4785f66c31f083facb7a",
  "p-12.jpg": "fd558a5af944ab8b8e6dfded99ca3546f87684f588600d0601af86eb06b5e439",
  "p-13.jpg": "d916f344ba8846fd9d0c631a5f7e2905b911c50245d2dd254c9a947234354f2b",
  "p-14.jpg": "f678f02d15eb2981f22ed4d58bd608ef0e5b12d8ddcbe53529defb66ea500817",
  "p-15.jpg": "943d2517f516e137669b55b150332e9fedb57393a6875304cecfc9f7122aaf04",
  "p-16.jpg": "e960d324eadd9cb36cbc70cd04d72c76fd53e2600b865fa81ed83839a399a225",
  "p-17.jpg": "9e35e613b685975d653310db323e8da49780cc72a72ef4985b2a4aea6c7bbfc9",
  "p-18.jpg": "729ff2f4806ffd32f28a5a93ea1fd256fd6d2064481b0bfdb31706ef853a7664",
  "p-19.jpg": "e259b7f9c2335ea504a0119e21dc2383b29fa1cddddc7a44f2a8298a1c816fa5",
  "p-20.jpg": "e293b3d33d8b549c97e3d19e496fef16a88656df62463c4954a57b4f081f5984"
};

async function sha256(bytes) {
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

export default {
  async fetch(request, env) {
    const page = new URL(request.url).pathname.slice(1);
    const hash = Object.hasOwn(pageHashes, page) ? pageHashes[page] : null;
    const authorization = request.headers.get("Authorization") ?? "";
    if (request.method !== "PUT" || !hash ||
        !crypto.subtle.timingSafeEqual(
          new TextEncoder().encode(await sha256(new TextEncoder().encode(authorization))),
          new TextEncoder().encode(authorizationHash)
        )) {
      return new Response(null, {status: 404});
    }
    const length = Number(request.headers.get("Content-Length"));
    if (!Number.isInteger(length) || length < 1 || length > 180000) {
      return new Response(null, {status: 413});
    }
    const bytes = await request.arrayBuffer();
    if (bytes.byteLength !== length || await sha256(bytes) !== hash) {
      return new Response(null, {status: 422});
    }
    await env.MATERIAL.put("batimix/banqueoreal-tec-qx/" + page, bytes, {
      httpMetadata: {contentType: "image/jpeg"},
    });
    return new Response(null, {status: 204});
  },
};
