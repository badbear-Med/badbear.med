(() => {
  "use strict";
  const script = document.currentScript;
  const course = script && script.dataset ? (script.dataset.course || "") : "";
  const cfg = window.BADBEAR_COURSE_LOCK || {};
  document.documentElement.classList.add("bb-course-lock-pending");

  if (!course || !cfg.hash) {
    document.documentElement.classList.remove("bb-course-lock-pending");
    return;
  }

  const storageKey = "badbear_course_unlock_" + course;
  const hash = String(cfg.hash || "").toLowerCase();

  // La sesión del curso debe compartirse entre el aula y las clases abiertas
  // con noopener. Una cookie de sesión no depende de la pestaña ni del opener.
  // El nombre sigue separado por curso y el valor caduca al cambiar la clave.
  function sharedAccess(){
    const prefix = encodeURIComponent(storageKey) + "=";
    try {
      const entry = document.cookie.split(";").map(s => s.trim()).find(s => s.startsWith(prefix));
      return entry ? decodeURIComponent(entry.slice(prefix.length)) : null;
    } catch (_) { return null; }
  }

  function saveSharedAccess(value){
    try {
      document.cookie = encodeURIComponent(storageKey) + "=" + encodeURIComponent(value)
        + "; Path=/; SameSite=Lax" + (location.protocol === "https:" ? "; Secure" : "");
    } catch (_) {}
  }

  function tabAccess(){
    try { return sessionStorage.getItem(storageKey); } catch (_) { return null; }
  }

  function saveTabAccess(value){
    try {
      if (value === null) sessionStorage.removeItem(storageKey);
      else sessionStorage.setItem(storageKey, value);
    } catch (_) {}
  }

  function hasAccess(){
    const shared = sharedAccess();
    return shared === null ? tabAccess() === hash : shared === hash;
  }

  // Migrar accesos ya concedidos sin volver a pedir la contraseña. Un cierre
  // explícito deja una marca que impide restaurar permisos de otra pestaña.
  if (sharedAccess() === null && tabAccess() === hash) saveSharedAccess(hash);

  let channel;
  try { channel = new BroadcastChannel(storageKey); } catch (_) {}
  function notifyAccessChange(){
    try { channel?.postMessage("access-changed"); } catch (_) {}
  }

  function prettyCourse(slug){
    return slug.split("-").map(w => w ? w.charAt(0).toUpperCase() + w.slice(1) : w).join(" ");
  }

  async function sha256(text){
    const data = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2,"0")).join("");
  }

  function addCloseButton(){
    if (document.querySelector(".bb-lock-close")) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "bb-lock-close";
    btn.textContent = "Cerrar acceso";
    btn.addEventListener("click", () => {
      saveTabAccess(null);
      saveSharedAccess("closed");
      notifyAccessChange();
      syncAccess();
    });
    document.documentElement.appendChild(btn);
  }

  function unlock(){
    document.documentElement.classList.remove("bb-course-lock-pending");
    document.documentElement.classList.remove("bb-course-locked");
    const overlay = document.querySelector(".bb-lock-overlay");
    if (overlay) overlay.remove();
    addCloseButton();
  }

  function showLock(){
    if (document.querySelector(".bb-lock-overlay")) return;
    document.querySelector(".bb-lock-close")?.remove();
    document.documentElement.classList.remove("bb-course-lock-pending");
    document.documentElement.classList.add("bb-course-locked");

    const overlay = document.createElement("div");
    overlay.className = "bb-lock-overlay";

    const card = document.createElement("section");
    card.className = "bb-lock-card";
    card.setAttribute("role","dialog");
    card.setAttribute("aria-modal","true");
    card.setAttribute("aria-label","Acceso restringido");
    card.innerHTML = `
      <div class="bb-lock-brand"><span>BADBEAR.</span><span class="med">MED</span></div>
      <span class="bb-lock-badge">ACCESO RESTRINGIDO</span>
      <h1>${prettyCourse(course)}</h1>
      <p>Ingresa la clave para acceder al contenido de este curso.</p>
      <div class="bb-lock-field">
        <label for="bb-lock-password">Clave de acceso</label>
        <div class="bb-lock-row">
          <input id="bb-lock-password" type="password" autocomplete="current-password" placeholder="Escribe la clave">
          <button id="bb-lock-toggle" type="button">Ver</button>
        </div>
        <button id="bb-lock-submit" class="bb-lock-submit" type="button">Desbloquear</button>
        <p id="bb-lock-error" class="bb-lock-error" aria-live="polite"></p>
      </div>
      <p class="bb-lock-note">Un solo acceso para el curso y sus clases, también en otras pestañas, durante esta sesión del navegador. Usa «Cerrar acceso» para finalizarlo.</p>
    `;

    overlay.appendChild(card);
    document.documentElement.appendChild(overlay);

    const input = card.querySelector("#bb-lock-password");
    const toggle = card.querySelector("#bb-lock-toggle");
    const submit = card.querySelector("#bb-lock-submit");
    const error = card.querySelector("#bb-lock-error");

    toggle.addEventListener("click", () => {
      const showing = input.type === "text";
      input.type = showing ? "password" : "text";
      toggle.textContent = showing ? "Ver" : "Ocultar";
      input.focus();
    });

    async function attempt(){
      const value = input.value;
      if (!value) {
        error.textContent = "Ingresa la clave.";
        input.focus();
        return;
      }

      submit.disabled = true;
      submit.textContent = "Verificando...";

      try {
        const enteredHash = await sha256(value);
        if (enteredHash === hash) {
          saveTabAccess(hash);
          saveSharedAccess(hash);
          input.value = "";
          unlock();
          notifyAccessChange();
        } else {
          error.textContent = "Clave incorrecta.";
          input.select();
        }
      } catch (e) {
        error.textContent = "No se pudo verificar la clave.";
      } finally {
        submit.disabled = false;
        submit.textContent = "Desbloquear";
      }
    }

    submit.addEventListener("click", attempt);
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") attempt();
    });

    setTimeout(() => input.focus(), 30);
  }

  function syncAccess(){
    if (hasAccess()) {
      unlock();
    } else {
      saveTabAccess(null);
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", syncAccess, {once:true});
      } else {
        showLock();
      }
    }
  }
  channel?.addEventListener("message", event => {
    if (event.data === "access-changed") syncAccess();
  });
  window.addEventListener("pageshow", syncAccess);
  window.addEventListener("focus", syncAccess);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") syncAccess();
  });
  syncAccess();
})();

