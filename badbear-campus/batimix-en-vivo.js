(() => {
  "use strict";

  const origin = "https://8x8.vc";
  const form = document.getElementById("live-entry");
  const roomField = document.getElementById("live-room");
  const tokenField = document.getElementById("live-token");
  const joinButton = document.getElementById("live-join");
  const leaveButton = document.getElementById("live-leave");
  const status = document.getElementById("live-status");
  const container = document.getElementById("live-meeting");
  let meeting;
  let script;
  let loadedTenant;

  function setStatus(message, error = false) {
    status.textContent = message;
    status.dataset.error = String(error);
  }

  function readClaims(token) {
    const parts = token.split(".");
    if (parts.length !== 3 || parts.some(part => !/^[A-Za-z0-9_-]+$/.test(part))) {
      throw new Error("Pega un JWT generado en JaaS Console.");
    }

    let claims;
    try {
      const payload = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
      const bytes = Uint8Array.from(payload, char => char.charCodeAt(0));
      claims = JSON.parse(new TextDecoder().decode(bytes));
    } catch {
      throw new Error("El JWT tiene un formato inválido.");
    }

    // These checks provide feedback only. JaaS verifies the signature and permissions.
    if (typeof claims?.sub !== "string" ||
        !/^vpaas-magic-cookie-[a-z0-9-]{8,80}$/i.test(claims.sub) ||
        claims.aud !== "jitsi" || claims.iss !== "chat" || typeof claims.room !== "string") {
      throw new Error("El token debe pertenecer a una cuenta de Jitsi JaaS.");
    }

    const now = Math.floor(Date.now() / 1000);
    if (!Number.isFinite(claims.exp) || claims.exp <= now) {
      throw new Error("El token está vencido. Genera uno nuevo en JaaS Console.");
    }
    if (Number.isFinite(claims.nbf) && claims.nbf > now + 60) {
      throw new Error("El token todavía no está vigente. Revisa su horario de activación.");
    }
    return claims;
  }

  function loadJaas(tenant) {
    if (loadedTenant === tenant && typeof window.JitsiMeetExternalAPI === "function") {
      return Promise.resolve();
    }
    script?.remove();
    script = document.createElement("script");
    script.src = origin + "/" + tenant + "/external_api.js";
    script.referrerPolicy = "no-referrer";

    return new Promise((resolve, reject) => {
      const fail = () => {
        window.clearTimeout(timeout);
        script.onload = script.onerror = null;
        script.remove();
        loadedTenant = undefined;
        reject(new Error("No se pudo cargar Jitsi JaaS. Verifica la conexión y vuelve a intentarlo."));
      };
      const timeout = window.setTimeout(fail, 12000);
      script.onerror = fail;
      script.onload = () => {
        if (typeof window.JitsiMeetExternalAPI !== "function") {
          fail();
          return;
        }
        window.clearTimeout(timeout);
        script.onload = script.onerror = null;
        loadedTenant = tenant;
        resolve();
      };
      document.head.appendChild(script);
    });
  }

  function closeMeeting() {
    const active = meeting;
    meeting = undefined;
    active?.dispose();
    container.replaceChildren();
    container.hidden = true;
    leaveButton.hidden = true;
    joinButton.disabled = false;
    roomField.disabled = false;
    tokenField.disabled = false;
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (joinButton.disabled) return;

    const room = roomField.value.trim();
    const token = tokenField.value.trim();

    if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/.test(room)) {
      setStatus("Escribe un nombre de sala válido.", true);
      roomField.focus();
      return;
    }

    let claims;
    try {
      claims = readClaims(token);
      if (claims.context?.room?.regex !== true && claims.room !== "*" &&
          claims.room.toLowerCase() !== room.toLowerCase()) {
        throw new Error("El token autoriza otra sala. Revisa el nombre o genera un token para esta reunión.");
      }
    } catch (error) {
      setStatus(error.message, true);
      tokenField.focus();
      return;
    }

    tokenField.value = "";
    joinButton.disabled = true;
    roomField.disabled = true;
    tokenField.disabled = true;
    setStatus("Cargando el panel de Jitsi…");

    try {
      await loadJaas(claims.sub);
      container.hidden = false;
      const api = new window.JitsiMeetExternalAPI("8x8.vc", {
        roomName: claims.sub + "/" + room,
        jwt: token,
        parentNode: container,
        width: "100%",
        height: "100%",
        configOverwrite: { startWithAudioMuted: true, startWithVideoMuted: true }
      });
      meeting = api;
      const iframe = api.getIFrame();
      iframe.title = "Videollamada de BATIMIX en Jitsi JaaS";
      leaveButton.hidden = false;
      setStatus("Panel de Jitsi abierto. Completa el ingreso en la videollamada.");
      api.addListener("videoConferenceJoined", () => {
        if (meeting === api) setStatus("Estás en la sala. Usa los controles de Jitsi para presentar.");
      });
      api.addListener("errorOccurred", () => {
        if (meeting === api) setStatus("Jitsi informó un problema. Revisa el mensaje en la videollamada.", true);
      });
      api.addListener("readyToClose", () => {
        if (meeting !== api) return;
        closeMeeting();
        setStatus("Saliste de la sala de prueba.");
        joinButton.focus();
      });
    } catch (error) {
      closeMeeting();
      setStatus(loadedTenant ? "No se pudo abrir la videollamada. Revisa el token y vuelve a intentarlo." : error.message, true);
      tokenField.focus();
    }
  });

  leaveButton.addEventListener("click", () => {
    closeMeeting();
    setStatus("Cerraste la videollamada.");
    joinButton.focus();
  });
})();
