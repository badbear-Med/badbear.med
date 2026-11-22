import { $, call, post } from "./core.js";

const selector = $("live-course");
const refreshButton = $("live-refresh");
const enterButton = $("live-enter");
const endButton = $("live-end");
const exitButton = $("live-exit");
const recordButton = $("live-record");
const recordHelp = $("live-record-help");
const status = $("live-status");
const mount = $("live-meeting");
const signIn = $("live-sign-in");
const identity = $("live-identity");
const requested = new URLSearchParams(location.search).get("curso");
const courses = globalThis.BADBEAR_COURSES;
const meetingOrigin = "https://8x8.vc";
const sessionKey = "badbear-campus-portal-session";
let state;
let api;
let access;
let loadedApp;
let sdk;
let busy = false;
let closedToCampus = false;
let joined = false;
let recording = false;
let selectingCapture = false;
let recorder;
let downloadUrl;
const download = $("live-record-download");

for (const { id, nombre } of courses) selector.add(new Option(nombre, id));
if (courses.some(course => course.id === requested)) selector.value = requested;

function message(text, error = false) {
  status.textContent = text;
  status.dataset.error = String(error);
}

function sessionToken() {
  try {
    return sessionStorage.getItem(sessionKey) || "";
  } catch {
    return "";
  }
}

function endpoint(action = "") {
  return "/api/en-vivo/" + selector.value + (action ? "/" + action : "");
}

function controls() {
  selector.disabled = refreshButton.disabled = busy || Boolean(api);
  enterButton.hidden = !state || Boolean(api) ||
    !(state.esAnfitrion || state.estado === "abierta" ||
      (state.puedeIniciar && state.estado === "sin-reunion"));
  enterButton.disabled = busy;
  enterButton.textContent = state?.estado === "sin-reunion" ? "Iniciar reunión" :
    state?.esAnfitrion ? "Volver como anfitrión" : "Entrar como invitado";
  endButton.hidden = !api || !access?.esAnfitrion || closedToCampus;
  exitButton.hidden = !api;
  const canRecord = Boolean(api && joined && access?.esAnfitrion);
  recordButton.hidden = recordHelp.hidden = !canRecord;
  recordButton.disabled = busy || selectingCapture;
  recordButton.textContent = recording ? "Detener grabación local" : "Grabar en este equipo";
  endButton.disabled = exitButton.disabled = busy || recording || selectingCapture;
}

function report(error) {
  if (error.status === 401) {
    signIn.hidden = false;
    message("Inicia sesión con tu cuenta de BADBEAR.CAMPUS.");
    return;
  }
  message(error.status === 404 ? "Las clases en vivo están pendientes de habilitación." : error.message, true);
}

async function refresh() {
  if (busy || api) return;
  state = undefined;
  identity.hidden = true;
  const token = sessionToken();
  signIn.hidden = Boolean(token);
  if (!token) {
    message("Inicia sesión con tu cuenta de BADBEAR.CAMPUS.");
    controls();
    return;
  }
  busy = true;
  controls();
  message("Consultando la sala…");
  try {
    state = await call(endpoint(), token);
    identity.textContent = "Sesión iniciada como " + state.nombre;
    identity.hidden = false;
    message({
      "sin-reunion": state.puedeIniciar ? "Puedes iniciar una reunión ahora." : "El anfitrión todavía no ha iniciado una reunión.",
      preparando: state.esAnfitrion ? "Tu reunión está en preparación." : "El anfitrión está preparando la reunión.",
      abierta: "Hay una reunión abierta."
    }[state.estado]);
  } catch (error) {
    report(error);
  } finally {
    busy = false;
    controls();
  }
}

function loadSDK(appId) {
  if (loadedApp === appId) return Promise.resolve();
  sdk?.remove();
  sdk = document.createElement("script");
  sdk.src = meetingOrigin + "/" + appId + "/external_api.js";
  sdk.referrerPolicy = "no-referrer";
  return new Promise((resolve, reject) => {
    const finish = () => {
      clearTimeout(timeout);
      sdk.onload = sdk.onerror = null;
    };
    const fail = () => {
      finish();
      sdk.remove();
      loadedApp = undefined;
      reject(new Error("No se pudo cargar Jitsi. Vuelve a intentarlo."));
    };
    const timeout = setTimeout(fail, 12000);
    sdk.onerror = fail;
    sdk.onload = () => {
      if (typeof window.JitsiMeetExternalAPI !== "function") return fail();
      finish();
      loadedApp = appId;
      resolve();
    };
    document.head.append(sdk);
  });
}

async function toggleRecording() {
  if (!api || !joined || !access?.esAnfitrion || busy || selectingCapture) return;
  if (recording) {
    if (recorder?.state === "recording") recorder.stop();
    return;
  }
  if (!navigator.mediaDevices?.getDisplayMedia || typeof MediaRecorder === "undefined" || typeof AudioContext === "undefined") {
    message("Este navegador no admite la grabación local. Abre Campus en Chrome o Edge de escritorio.", true);
    return;
  }
  const meeting = api;
  let display, microphone, mixer;
  const release = () => {
    for (const stream of [display, microphone, mixer?.destination.stream]) {
      stream?.getTracks().forEach(track => track.stop());
    }
    if (mixer) void mixer.context.close().catch(() => {});
  };
  selectingCapture = true;
  controls();
  try {
    display = await navigator.mediaDevices.getDisplayMedia({video: true, audio: true, preferCurrentTab: true});
    if (api !== meeting) { release(); return; }
    if (!display.getAudioTracks().length) throw new Error("Selecciona la pestaña de Clases en vivo y marca Compartir audio de la pestaña.");
    microphone = await navigator.mediaDevices.getUserMedia({audio: true});
    if (api !== meeting || display.getVideoTracks()[0]?.readyState !== "live") { release(); return; }

    const context = new AudioContext();
    mixer = {context, destination: context.createMediaStreamDestination()};
    for (const stream of [display, microphone]) {
      context.createMediaStreamSource(stream).connect(mixer.destination);
    }
    await context.resume();
    if (api !== meeting || display.getVideoTracks()[0]?.readyState !== "live") { release(); return; }
    const capture = new MediaStream([...display.getVideoTracks(), ...mixer.destination.stream.getAudioTracks()]);
    const local = new MediaRecorder(capture);
    const chunks = [];
    let failed = false;
    local.addEventListener("dataavailable", event => { if (event.data.size) chunks.push(event.data); });
    local.addEventListener("error", () => { failed = true; });
    local.addEventListener("stop", () => {
      release();
      if (recorder === local) recorder = undefined;
      recording = false;
      if (!failed && chunks.length) {
        if (downloadUrl) URL.revokeObjectURL(downloadUrl);
        const mime = local.mimeType || chunks[0].type || "video/webm";
        downloadUrl = URL.createObjectURL(new Blob(chunks, {type: mime}));
        download.href = downloadUrl;
        download.download = "clase-campus-" + new Date().toISOString().replace(/[:.]/g, "-") + (mime.includes("mp4") ? ".mp4" : ".webm");
        download.hidden = false;
        message("Grabación lista. Pulsa Descargar grabación para guardar el archivo.");
      } else {
        message("El navegador no pudo generar el archivo de grabación.", true);
      }
      controls();
    });
    display.getVideoTracks()[0].addEventListener("ended", () => {
      if (local.state !== "inactive") local.stop();
    }, {once: true});
    local.start(1000);
    recorder = local;
    recording = true;
    message("Grabación local en curso. El micrófono local también se está grabando.");
  } catch (error) {
    release();
    const denied = ["NotAllowedError", "AbortError"].includes(error.name);
    message(denied ? "Grabación cancelada o permiso denegado. Autoriza la pestaña y el micrófono para continuar." : error.message, true);
  } finally {
    selectingCapture = false;
    controls();
  }
}

function leave() {
  if (recorder && recorder.state !== "inactive") recorder.stop();
  joined = false;
  const previous = api;
  api = access = undefined;
  closedToCampus = false;
  previous?.dispose();
  mount.replaceChildren();
  mount.hidden = true;
  controls();
}

async function openMeeting() {
  if (busy || !state) return;
  busy = true;
  controls();
  message("Abriendo la videollamada…");
  try {
    const action = state.puedeIniciar && (state.esAnfitrion || state.estado === "sin-reunion") ? "iniciar" : "entrar";
    access = await post(endpoint(action), sessionToken(), {});
    await loadSDK(access.appId);
    mount.hidden = false;
    const meeting = new window.JitsiMeetExternalAPI("8x8.vc", {
      parentNode: mount,
      width: "100%",
      height: "100%",
      roomName: access.appId + "/" + access.sala,
      jwt: access.jwt,
      lang: "es",
      configOverwrite: {
        prejoinConfig: { hideDisplayName: true },
        readOnlyName: true,
        startWithAudioMuted: true,
        startWithVideoMuted: true
      }
    });
    api = meeting;
    access = { sala: access.sala, esAnfitrion: access.esAnfitrion };
    meeting.getIFrame().title = "Videollamada de " + state.curso;
    meeting.addListener("videoConferenceJoined", async () => {
      if (api !== meeting) return;
      joined = true;
      controls();
      try {
        if (access.esAnfitrion) await post(endpoint("abrir"), sessionToken(), { sala: access.sala });
        if (api === meeting && !selectingCapture && !recording) message("Estás en la reunión.");
      } catch (error) {
        if (api === meeting) report(error);
      }
    });
    meeting.addListener("readyToClose", () => {
      if (api !== meeting) return;
      leave();
      void refresh();
    });
    meeting.addListener("errorOccurred", () => {
      if (api === meeting) message("Revisa el mensaje que muestra Jitsi en la videollamada.", true);
    });
    message("Completa el ingreso en Jitsi.");
  } catch (error) {
    leave();
    report(error);
  } finally {
    busy = false;
    controls();
  }
}

async function endMeeting() {
  if (busy || !api || !access?.esAnfitrion) return;
  busy = true;
  controls();
  try {
    const meeting = api;
    await post(endpoint("cerrar"), sessionToken(), { sala: access.sala });
    if (api === meeting) {
      closedToCampus = true;
      meeting.executeCommand("endConference");
    }
    message("La sala del Campus está cerrada a nuevas entradas. Jitsi finalizará la llamada si esa opción está habilitada.");
  } catch (error) {
    report(error);
  } finally {
    busy = false;
    controls();
    if (!api) void refresh();
  }
}

selector.addEventListener("change", refresh);
refreshButton.addEventListener("click", refresh);
enterButton.addEventListener("click", openMeeting);
recordButton.addEventListener("click", toggleRecording);
endButton.addEventListener("click", endMeeting);
exitButton.addEventListener("click", () => { leave(); void refresh(); });
void refresh();
