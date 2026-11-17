import "../assets/js/courses.js";

const courses = new Map(globalThis.BADBEAR_COURSES.map(({id, nombre}) => [id, nombre]));
const encoder = new TextEncoder();
const toBase64Url = data => btoa(String.fromCharCode(...new Uint8Array(data)))
  .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const encode = object => toBase64Url(encoder.encode(JSON.stringify(object)));
const meetingDuration = 4 * 60 * 60;
const tokenDuration = 5 * 60;

function der(tag, bytes) {
  const size = bytes.length;
  const length = size < 128 ? [size] : size < 256 ? [0x81, size] : [0x82, size >> 8, size & 255];
  return Uint8Array.of(tag, ...length, ...bytes);
}

function keyBytes(pem) {
  const match = pem.match(/^-----BEGIN (PRIVATE KEY|RSA PRIVATE KEY)-----\s*([\s\S]+?)\s*-----END \1-----$/);
  if (!match) throw new Error("Invalid PEM");
  const bytes = Uint8Array.from(atob(match[2].replace(/\s/g, "")), char => char.charCodeAt(0));
  if (match[1] === "PRIVATE KEY") return bytes;
  // Wrap PKCS#1 in a PKCS#8 PrivateKeyInfo structure for Web Crypto.
  const rsaEncryption = [0x30, 0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01, 0x05, 0x00];
  return der(0x30, [0x02, 0x01, 0x00, ...rsaEncryption, ...der(0x04, bytes)]);
}

export function createLiveAccess({ Problem, session, readJSON, now, digest, random }) {
  let previousPem;
  let signingKey;

  function configuration(env) {
    const app = env.JAAS_APP_ID?.trim();
    const kid = env.JAAS_KEY_ID?.trim();
    const pem = env.JAAS_PRIVATE_KEY?.trim();
    if (!app || !/^vpaas-magic-cookie-[a-z0-9-]{8,80}$/i.test(app) ||
        !kid?.startsWith(app + "/") || !/^[A-Za-z0-9_-]{1,100}$/.test(kid.slice(app.length + 1)) || !pem) {
      throw new Problem("Las clases en vivo están pendientes de habilitación.", 503);
    }
    let hosts;
    try {
      hosts = JSON.parse(env.CAMPUS_LIVE_HOSTS || "null");
      if (!hosts || typeof hosts !== "object" || Array.isArray(hosts)) throw new Error();
    } catch {
      throw new Problem("La configuración de anfitriones está pendiente de revisión.", 503);
    }
    return { app, kid, pem, hosts };
  }

  async function token(config, user, room, moderator, time) {
    try {
      if (!signingKey || previousPem !== config.pem) {
        signingKey = crypto.subtle.importKey("pkcs8", keyBytes(config.pem),
          {name: "RSASSA-PKCS1-v1_5", hash: "SHA-256"}, false, ["sign"]);
        previousPem = config.pem;
      }
      const key = await signingKey;
      const content = encode({ alg: "RS256", typ: "JWT", kid: config.kid }) + "." + encode({
        aud: "jitsi",
        iss: "chat",
        sub: config.app,
        room: room.sala,
        iat: time,
        nbf: time - 10,
        exp: Math.min(time + tokenDuration, room.expira),
        context: { user: {
          id: await digest("campus-clases-en-vivo:" + user.codigo),
          name: user.nombre,
          moderator: moderator ? "true" : "false"
        } }
      });
      const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, encoder.encode(content));
      return { appId: config.app, sala: room.sala, esAnfitrion: moderator, jwt: content + "." + toBase64Url(signature) };
    } catch {
      throw new Problem("No se pudo emitir el acceso a la sala. Revisa la configuración de JaaS.", 503);
    }
  }

  async function getRoom(db, course, time) {
    return db.prepare("SELECT sala, anfitrion, abierta, expira FROM campus_reuniones WHERE curso=? AND expira>?")
      .bind(course, time).first();
  }

  return async function liveAccess(req, env, course, action) {
    if (!courses.has(course)) throw new Problem("Curso no disponible.", 404);
    const user = await session(req, env);
    const config = configuration(env);
    const hostCodes = [config.hosts[course], config.hosts["*"]];
    const canHost = hostCodes.some(list => Array.isArray(list) && list.includes(user.codigo));
    const db = env.DB;
    const time = now();
    let room = await getRoom(db, course, time);

    if (req.method === "GET" && !action) {
      return {
        curso: courses.get(course),
        nombre: user.nombre,
        puedeIniciar: canHost,
        esAnfitrion: canHost && room?.anfitrion === user.codigo,
        estado: room ? (room.abierta ? "abierta" : "preparando") : "sin-reunion"
      };
    }
    if (req.method !== "POST") throw new Problem("Ruta no disponible.", 404);

    if (action === "iniciar") {
      if (!canHost) throw new Problem("Solo un anfitrión asignado puede iniciar la reunión.", 403);
      if (!room) {
        const candidate = { sala: "campus-" + course + "-" + random().slice(0, 32), expira: time + meetingDuration };
        const access = await token(config, user, candidate, true, time);
        room = await db.prepare(
          "INSERT INTO campus_reuniones(curso,sala,anfitrion,abierta,expira) VALUES (?,?,?,0,?) " +
          "ON CONFLICT(curso) DO UPDATE SET sala=excluded.sala,anfitrion=excluded.anfitrion,abierta=0,expira=excluded.expira " +
          "WHERE campus_reuniones.expira<=? RETURNING sala,anfitrion,abierta,expira"
        ).bind(course, candidate.sala, user.codigo, candidate.expira, time).first();
        if (room) return access;
        room = await getRoom(db, course, now());
      }
      if (room?.anfitrion !== user.codigo) throw new Problem("Otro anfitrión ya inició una reunión en este curso.", 409);
      return token(config, user, room, true, now());
    }

    if (action === "entrar") {
      if (!room?.abierta) throw new Problem("El anfitrión todavía no ha abierto la sala.", 409);
      if (room.anfitrion === user.codigo && !canHost) throw new Problem("Tu permiso de anfitrión cambió.", 403);
      return token(config, user, room, room.anfitrion === user.codigo, time);
    }

    if (action === "abrir" || action === "cerrar") {
      if (!canHost || room?.anfitrion !== user.codigo) throw new Problem("Solo el anfitrión de esta reunión puede gestionarla.", 403);
      const { sala } = await readJSON(req);
      if (sala !== room.sala) throw new Problem("La reunión ya cambió. Actualiza el aula.", 409);
      const query = action === "abrir"
        ? "UPDATE campus_reuniones SET abierta=1 WHERE curso=? AND sala=? AND anfitrion=? AND expira>? RETURNING sala"
        : "DELETE FROM campus_reuniones WHERE curso=? AND sala=? AND anfitrion=? AND expira>? RETURNING sala";
      const updated = await db.prepare(query).bind(course, sala, user.codigo, now()).first();
      if (!updated) throw new Problem("La reunión ya terminó o cambió.", 409);
      return { ok: true };
    }
    throw new Problem("Ruta no disponible.", 404);
  };
}
