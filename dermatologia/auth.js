(function () {
  "use strict";

  const BB_AUTH_KEY = "badbear_med_access_until";
  const BB_AUTH_HOURS = 24;
  const BB_AUTH_SALT = "bbmed-derma-2026|";
  const BB_AUTH_HASH = "5e5511c1bac11dd3fc863a68fecf6e458b76ff5cbf1ae5c8542e936b29669e30";

  const ahora = () => Date.now();
  const vigente = () => Number(localStorage.getItem(BB_AUTH_KEY) || 0) > ahora();
  const nombrePagina = () => (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const esInicio = () => nombrePagina() === "" || nombrePagina() === "index.html";
  const esShell = () => nombrePagina() === "estudio.html";
  const estaEmbebida = () => window.self !== window.top;

  const estilo = document.createElement("style");
  estilo.textContent = `
    html.bb-auth-pendiente body{visibility:hidden!important}
    .bb-auth-logout{position:fixed;right:18px;bottom:18px;z-index:99999;border:1px solid #d8dee9;background:#111827;color:#fff;border-radius:999px;padding:10px 14px;font:800 12px/1 system-ui,-apple-system,Segoe UI,sans-serif;box-shadow:0 8px 24px rgba(17,24,39,.18);cursor:pointer}
    .bb-auth-logout:hover{background:#2458ff}
    .bb-login-page{min-height:100vh;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at 18% 15%,rgba(36,88,255,.12),transparent 32%),radial-gradient(circle at 82% 10%,rgba(255,90,54,.12),transparent 28%),#f5f7fb;font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#111827}
    .bb-login-card{width:min(440px,100%);background:#fff;border:1px solid #e2e8f0;border-radius:28px;padding:34px;box-shadow:0 24px 70px rgba(17,24,39,.12);position:relative;overflow:hidden}
    .bb-login-card:before{content:"";position:absolute;left:0;top:0;right:0;height:6px;background:linear-gradient(90deg,#2458ff,#ff5a36,#ffc928)}
    .bb-login-brand{display:flex;align-items:center;gap:14px;margin-bottom:28px}
    .bb-login-brand img{width:58px;height:58px;object-fit:contain;border-radius:50%;background:#fff}
    .bb-login-brand h1{margin:0;font-size:27px;line-height:1;font-weight:950;letter-spacing:-.8px;color:#111827}
    .bb-login-brand h1 span{color:#2458ff}.bb-login-brand p{margin:5px 0 0;color:#667085;font-size:13px;font-weight:700}
    .bb-login-badge{display:inline-flex;align-items:center;gap:7px;border-radius:999px;background:#fff7cc;color:#7a5800;padding:7px 11px;font-size:11px;font-weight:900;letter-spacing:.55px;margin-bottom:14px}
    .bb-login-card h2{font-size:28px;line-height:1.15;margin:0 0 10px;color:#111827}.bb-login-card>.bb-login-text{margin:0 0 22px;color:#667085;line-height:1.65;font-size:14px}
    .bb-login-label{display:block;font-size:12px;font-weight:900;color:#111827;margin:0 0 8px}
    .bb-login-wrap{position:relative}.bb-login-input{width:100%;box-sizing:border-box;border:1.5px solid #cfd8e6;border-radius:14px;padding:14px 46px 14px 14px;font-size:15px;font-weight:700;outline:none;background:#fff;color:#111827}.bb-login-input:focus{border-color:#2458ff;box-shadow:0 0 0 4px rgba(36,88,255,.1)}
    .bb-login-eye{position:absolute;right:10px;top:50%;transform:translateY(-50%);border:0;background:transparent;cursor:pointer;font-size:18px;padding:7px}
    .bb-login-submit{width:100%;border:0;border-radius:14px;background:#2458ff;color:#fff;font-size:14px;font-weight:900;padding:14px 18px;margin-top:14px;cursor:pointer;box-shadow:0 10px 24px rgba(36,88,255,.22)}.bb-login-submit:hover{background:#173ac8}.bb-login-submit:disabled{opacity:.65;cursor:wait}
    .bb-login-error{min-height:20px;margin:10px 0 0;color:#d94325;font-size:12px;font-weight:800}.bb-login-foot{margin-top:24px;padding-top:18px;border-top:1px solid #eef2f7;color:#98a2b3;font-size:11px;line-height:1.5;text-align:center}
    @media(max-width:560px){.bb-login-card{padding:28px 22px;border-radius:22px}.bb-login-card h2{font-size:24px}.bb-auth-logout{right:12px;bottom:12px}}
  `;
  document.head.appendChild(estilo);
  document.documentElement.classList.add("bb-auth-pendiente");

  function destinoActual() {
    const nombre = location.pathname.split("/").pop() || "index.html";
    return nombre + location.search + location.hash;
  }

  function destinoShell(pagina) {
    return `estudio.html?page=${encodeURIComponent(pagina || "index.html")}`;
  }

  function irAlAcceso() {
    let objetivo = destinoActual();
    if (esShell()) {
      objetivo = new URLSearchParams(location.search).get("page") || "index.html";
    }
    const next = encodeURIComponent(objetivo);
    location.replace(`index.html?bbnext=${next}`);
  }

  function quitarBloqueoVisual() {
    document.documentElement.classList.remove("bb-auth-pendiente");
  }

  function cargarMejorasMoviles() {
    if (!document.querySelector('link[data-bb-mobile="1"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "mobile-fixes.css?v=3";
      link.dataset.bbMobile = "1";
      document.head.appendChild(link);
    }
  }

  function prepararMenuMovil() {
    const header = document.querySelector(".bb-header");
    const nav = header && header.querySelector(".nav-principal");
    if (!header || !nav || header.querySelector(".bb-mobile-menu-btn")) return;

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "bb-mobile-menu-btn";
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-label", "Abrir menú de navegación");
    boton.innerHTML = "☰ <span>Menú</span>";

    boton.addEventListener("click", () => {
      const abierto = header.classList.toggle("bb-menu-abierto");
      boton.setAttribute("aria-expanded", abierto ? "true" : "false");
      boton.innerHTML = abierto ? "✕ <span>Cerrar</span>" : "☰ <span>Menú</span>";
    });

    nav.querySelectorAll("a").forEach(enlace => {
      enlace.addEventListener("click", () => {
        header.classList.remove("bb-menu-abierto");
        boton.setAttribute("aria-expanded", "false");
        boton.innerHTML = "☰ <span>Menú</span>";
      });
    });

    header.insertBefore(boton, nav);
  }

  function agregarCerrarSesion() {
    if (document.getElementById("bb-auth-logout")) return;
    const boton = document.createElement("button");
    boton.id = "bb-auth-logout";
    boton.className = "bb-auth-logout";
    boton.type = "button";
    boton.textContent = "🔒 Cerrar sesión";
    boton.addEventListener("click", () => {
      localStorage.removeItem(BB_AUTH_KEY);
      location.replace("index.html?bbcerrado=1");
    });
    document.body.appendChild(boton);
  }

  async function sha256Hex(texto) {
    const data = new TextEncoder().encode(texto);
    const buffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
  }

  function pantallaAcceso() {
    document.title = "BADBEAR.MED | Acceso privado";
    document.body.innerHTML = `
      <main class="bb-login-page">
        <section class="bb-login-card" aria-labelledby="bb-login-title">
          <div class="bb-login-brand">
            <img src="badbear_logo.png" alt="Logo BADBEAR.MED">
            <div><h1>BADBEAR<span>.MED</span></h1><p>Dermatología</p></div>
          </div>
          <span class="bb-login-badge">🔐 ACCESO PRIVADO</span>
          <h2 id="bb-login-title">Ingresa a la plataforma</h2>
          <p class="bb-login-text">Escribe la clave de acceso proporcionada por BADBEAR.MED para continuar.</p>
          <form id="bb-login-form" autocomplete="off">
            <label class="bb-login-label" for="bb-login-clave">Clave de acceso</label>
            <div class="bb-login-wrap">
              <input id="bb-login-clave" class="bb-login-input" type="password" autocomplete="current-password" autocapitalize="none" spellcheck="false" required autofocus>
              <button id="bb-login-eye" class="bb-login-eye" type="button" aria-label="Mostrar u ocultar clave">👁</button>
            </div>
            <button id="bb-login-submit" class="bb-login-submit" type="submit">INGRESAR</button>
            <div id="bb-login-error" class="bb-login-error" role="alert" aria-live="polite"></div>
          </form>
          <div class="bb-login-foot">Proyecto BADBEAR.MED · WAJOMEA.GROUP<br>Sesión autorizada por 24 horas en este navegador.</div>
        </section>
      </main>`;

    quitarBloqueoVisual();

    const form = document.getElementById("bb-login-form");
    const input = document.getElementById("bb-login-clave");
    const error = document.getElementById("bb-login-error");
    const submit = document.getElementById("bb-login-submit");
    const eye = document.getElementById("bb-login-eye");

    eye.addEventListener("click", () => {
      input.type = input.type === "password" ? "text" : "password";
      input.focus();
    });

    form.addEventListener("submit", async (evento) => {
      evento.preventDefault();
      error.textContent = "";
      submit.disabled = true;
      submit.textContent = "VERIFICANDO…";
      try {
        if (!window.crypto || !window.crypto.subtle) throw new Error("crypto-no-disponible");
        const candidata = input.value.trim();
        const hash = await sha256Hex(BB_AUTH_SALT + candidata);
        if (hash === BB_AUTH_HASH) {
          localStorage.setItem(BB_AUTH_KEY, String(ahora() + BB_AUTH_HOURS * 60 * 60 * 1000));
          const params = new URLSearchParams(location.search);
          const next = params.get("bbnext");
          const pagina = next && !/^https?:/i.test(next) && !next.startsWith("//") ? next : "index.html";
          location.replace(destinoShell(pagina));
          return;
        }
        error.textContent = "Clave incorrecta. Verifica e inténtalo nuevamente.";
        input.select();
      } catch (e) {
        error.textContent = "No se pudo verificar la clave. Abre la página mediante GitHub Pages o Live Server.";
      } finally {
        submit.disabled = false;
        submit.textContent = "INGRESAR";
      }
    });
  }

  if (vigente()) {
    if (estaEmbebida()) {
      quitarBloqueoVisual();
      return;
    }

    if (!esShell()) {
      location.replace(destinoShell(destinoActual()));
      return;
    }

    cargarMejorasMoviles();
    quitarBloqueoVisual();
    const iniciarUI = () => {
      prepararMenuMovil();
      agregarCerrarSesion();
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciarUI, { once: true });
    else iniciarUI();
    return;
  }

  localStorage.removeItem(BB_AUTH_KEY);

  if (!esInicio()) {
    irAlAcceso();
    return;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", pantallaAcceso, { once: true });
  else pantallaAcceso();
})();