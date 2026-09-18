
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
      sessionStorage.removeItem(storageKey);
      location.reload();
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

  if (sessionStorage.getItem(storageKey) === hash) {
    unlock();
    return;
  }

  function showLock(){
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
      <p class="bb-lock-note">La autorización se mantiene durante esta sesión del navegador.</p>
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
          sessionStorage.setItem(storageKey, hash);
          unlock();
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showLock, {once:true});
  } else {
    showLock();
  }
})();
