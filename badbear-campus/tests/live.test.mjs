import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash, generateKeyPairSync, verify } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import worker from "../worker-backend.js";

const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
const origin = "https://wajomea.group";
const room = "/api/en-vivo/cirugia-batimix";
const app = "vpaas-magic-cookie-11111111111111111111111111111111";
const tokens = Object.fromEntries(["HOST", "OTHER", "GUEST", "INACTIVE"].map((code, i) => [code, String(i).repeat(64)]));

function setup(type = "pkcs8") {
  const sql = new DatabaseSync(":memory:");
  for (const file of ["schema.sql", "migrations/0007_clases_en_vivo.sql"]) {
    sql.exec(readFileSync(new URL("../" + file, import.meta.url), "utf8"));
  }
  const expiry = Math.floor(Date.now() / 1000) + 1000;
  for (const [code, token] of Object.entries(tokens)) {
    sql.prepare("INSERT INTO campus_alumnos(codigo,nombre,activo) VALUES (?,?,?)").run(code, "Cuenta " + code, Number(code !== "INACTIVE"));
    sql.prepare("INSERT INTO campus_sesiones(token_hash,codigo,expira) VALUES (?,?,?)")
      .run(createHash("sha256").update(token).digest("hex"), code, expiry);
  }
  const DB = { prepare(query) {
    const statement = sql.prepare(query);
    return { bind(...parameters) { return { async first() { return statement.get(...parameters) ?? null; } }; } };
  } };
  return { sql, env: {
    DB, ADMIN_API_TOKEN: "a".repeat(64), PASSWORD_PEPPER: "b".repeat(64),
    JAAS_APP_ID: app, JAAS_KEY_ID: app + "/test", JAAS_PRIVATE_KEY: privateKey.export({ type, format: "pem" })
  } };
}

async function request(env, path, user, body, site = origin) {
  const req = new Request("https://example.invalid" + path, {
    method: body ? "POST" : "GET",
    headers: { Origin: site, ...(user ? { Authorization: "Bearer " + tokens[user] } : {}), "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  const response = await worker.fetch(req, env);
  assert.match(response.headers.get("cache-control"), /no-store/);
  return { status: response.status, body: await response.json() };
}

function claims(access, moderator, name) {
  const [header, payload, signature] = access.jwt.split(".");
  assert.equal(verify("RSA-SHA256", Buffer.from(header + "." + payload), publicKey, Buffer.from(signature, "base64url")), true);
  const decoded = JSON.parse(Buffer.from(payload, "base64url"));
  assert.equal(decoded.context.user.name, name);
  assert.equal(decoded.context.user.moderator, moderator);
  assert.equal(decoded.room, access.sala);
  assert.equal(decoded.sub, app);
  assert.ok(decoded.exp - decoded.iat <= 300);
  assert.equal(decoded.context.user.email, undefined);
}

test("anfitrión abre la sala, invitado identificado entra y solo el anfitrión la cierra", async () => {
  const { env } = setup();
  assert.equal((await request(env, room)).status, 401);
  assert.equal((await request(env, room, "INACTIVE")).status, 401);
  assert.equal((await request(env, room, "GUEST", undefined, "https://foreign.invalid")).status, 403);
  assert.equal((await request(env, room + "/iniciar", "INACTIVE", {moderator: true})).status, 401);
  assert.equal((await request(env, room + "/iniciar", undefined, {})).status, 401);
  assert.equal((await request(env, room, "GUEST")).body.puedeIniciar, true);
  assert.equal((await request(env, room + "/entrar", "GUEST", {})).status, 409);
  const started = await request(env, room + "/iniciar", "HOST", {});
  assert.equal(started.status, 200);
  claims(started.body, "true", "Cuenta HOST");
  const preparing = (await request(env, room, "GUEST")).body;
  assert.equal(preparing.estado, "preparando");
  assert.equal(preparing.puedeIniciar, false);
  assert.equal((await request(env, room + "/entrar", "GUEST", {})).status, 409);
  assert.equal((await request(env, room + "/abrir", "OTHER", { sala: started.body.sala })).status, 403);
  assert.equal((await request(env, room + "/abrir", "HOST", { sala: "otra" })).status, 409);
  assert.equal((await request(env, room + "/abrir", "HOST", { sala: started.body.sala })).status, 200);
  const guest = await request(env, room + "/entrar", "GUEST", { moderator: true, nombre: "Falso" });
  assert.equal(guest.status, 200);
  claims(guest.body, "false", "Cuenta GUEST");
  assert.equal((await request(env, room + "/iniciar", "OTHER", {})).status, 409);
  assert.equal((await request(env, room + "/cerrar", "GUEST", { sala: started.body.sala })).status, 403);
  assert.equal((await request(env, room + "/cerrar", "HOST", { sala: started.body.sala })).status, 200);
  assert.equal((await request(env, room + "/entrar", "GUEST", {})).status, 409);
  const next = await request(env, room + "/iniciar", "GUEST", {});
  assert.equal(next.status, 200);
  claims(next.body, "true", "Cuenta GUEST");
  assert.notEqual(next.body.sala, started.body.sala);
});

test("el catálogo completo tiene salas independientes y se acepta una clave PKCS#1", async () => {
  const { env, sql } = setup("pkcs1");
  for (const {id, nombre} of globalThis.BADBEAR_COURSES) {
    const result = await request(env, "/api/en-vivo/" + id, "GUEST");
    assert.equal(result.status, 200);
    assert.equal(result.body.curso, nombre);
    assert.equal(result.body.estado, "sin-reunion");
    assert.equal(result.body.puedeIniciar, true);
  }
  assert.equal((await request(env, "/api/en-vivo/no-existe", "HOST")).status, 404);
  const jobs = await Promise.all([
    request(env, room + "/iniciar", "HOST", {}),
    request(env, room + "/iniciar", "OTHER", {})
  ]);
  assert.deepEqual(jobs.map(r => r.status).sort(), [200, 409]);
  assert.equal(sql.prepare("SELECT COUNT(*) AS total FROM campus_reuniones").get().total, 1);
  const thesis = await request(env, "/api/en-vivo/tesis-1/iniciar", "HOST", {});
  assert.equal(thesis.status, 200);
  claims(thesis.body, "true", "Cuenta HOST");
  assert.notEqual(thesis.body.sala, jobs.find(r => r.status === 200).body.sala);
});

test("si falta la clave o es inválida, se bloquea la emisión y nunca se crea una sala", async () => {
  const { env, sql } = setup();
  assert.equal((await request({...env, JAAS_PRIVATE_KEY: ""}, room, "HOST")).status, 503);
  assert.equal((await request({...env, JAAS_PRIVATE_KEY: "inválida"}, room + "/iniciar", "HOST", {})).status, 503);
  assert.equal(sql.prepare("SELECT COUNT(*) AS total FROM campus_reuniones").get().total, 0);
});
