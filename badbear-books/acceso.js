(() => {
  'use strict';
  const script = document.currentScript;
  const home = new URL('../index.html', script.src).href;
  const storageKey = 'badbear_books_access_v1';
  const config = window.BADBEAR_BOOKS_ACCESS || {};
  const expected = String(config.hash || '').toLowerCase();
  const configured = /^[a-f0-9]{64}$/.test(expected);
  let checking = false;
  const authorized = () => {
    try { return configured && sessionStorage.getItem(storageKey) === expected; }
    catch (_) { return false; }
  };
  const forget = () => { try { sessionStorage.removeItem(storageKey); } catch (_) {} };
  const remember = () => { try { sessionStorage.setItem(storageKey, expected); } catch (_) {} };

  function grant() {
    const root = document.documentElement;
    root.classList.remove('books-access-pending');
    root.classList.add('books-access-granted');
    document.getElementById('books-access')?.remove();
    document.getElementById('books-access-loading')?.remove();
    if (!document.getElementById('books-close-access')) {
      const close = document.createElement('button');
      close.id = 'books-close-access'; close.type = 'button';
      close.textContent = 'Cerrar acceso a Libros';
      close.addEventListener('click', () => {
        forget(); root.classList.add('books-access-pending');
        root.classList.remove('books-access-granted'); location.reload();
      });
      document.body.appendChild(close);
    }
    document.dispatchEvent(new Event('books-access-granted'));
  }

  function lock() {
    document.documentElement.classList.add('books-access-pending');
    document.documentElement.classList.remove('books-access-granted');
    document.getElementById('books-close-access')?.remove();
    document.getElementById('books-access-loading')?.remove();
    if (document.getElementById('books-access')) return;
    const panel = document.createElement('main');
    panel.id = 'books-access';
    panel.innerHTML = `
      <section class="books-access-card" aria-labelledby="books-access-title">
        <div class="books-access-brand"><span>BADBEAR.<b>BOOKS</b></span><small>UNA PUBLICACIÓN DE WAJOMEA.GROUP</small></div>
        <span class="books-access-badge">BIBLIOTECA · ACCESO CON CLAVE</span>
        <h1 id="books-access-title">Bienvenido a nuestra biblioteca</h1>
        <p>Ingresa la clave de acceso proporcionada por WAJOMEA.GROUP para leer nuestras publicaciones.</p>
        <form id="books-access-form">
          <label for="books-access-password">Clave de acceso</label>
          <div class="books-access-field"><input id="books-access-password" name="password" type="password" autocomplete="current-password" autocapitalize="none" spellcheck="false" required><button id="books-access-toggle" type="button" aria-label="Mostrar clave" aria-pressed="false">Ver</button></div>
          <button id="books-access-submit" type="submit">Entrar a BADBEAR.BOOKS <span aria-hidden="true">→</span></button>
          <p id="books-access-error" role="alert" aria-live="polite"></p>
        </form>
        <div class="books-access-footer"><p>Tu acceso se mantiene durante esta sesión del navegador.</p><a href="${home}">← Volver a WAJOMEA.GROUP</a></div>
      </section>`;
    document.body.appendChild(panel);
    const form = panel.querySelector('#books-access-form');
    const input = panel.querySelector('#books-access-password');
    const toggle = panel.querySelector('#books-access-toggle');
    const submit = panel.querySelector('#books-access-submit');
    const error = panel.querySelector('#books-access-error');
    if (!configured) {
      submit.disabled = true; input.disabled = true; toggle.disabled = true;
      error.textContent = 'El acceso no está disponible en este momento. Recarga la página para intentarlo nuevamente.';
      return;
    }
    toggle.addEventListener('click', () => {
      const show = input.type === 'password'; input.type = show ? 'text' : 'password';
      toggle.textContent = show ? 'Ocultar' : 'Ver';
      toggle.setAttribute('aria-label', show ? 'Ocultar clave' : 'Mostrar clave');
      toggle.setAttribute('aria-pressed', String(show)); input.focus();
    });
    input.addEventListener('input', () => { error.textContent = ''; });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (checking) return;
      error.textContent = '';
      if (!input.value) { error.textContent = 'Escribe la clave de acceso.'; input.focus(); return; }
      checking = true; submit.disabled = true; submit.textContent = 'Verificando…';
      try {
        if (!window.crypto?.subtle) throw new Error('verification-unavailable');
        const bytes = new TextEncoder().encode(input.value);
        const digest = await crypto.subtle.digest('SHA-256', bytes);
        const entered = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
        if (entered === expected) {
          remember(); input.value = ''; grant();
          document.querySelector('#books-page h1')?.focus({preventScroll:true});
        } else { error.textContent = 'Clave incorrecta. Revisa e inténtalo nuevamente.'; input.select(); }
      } catch (_) {
        error.textContent = 'No se pudo verificar la clave. Inténtalo desde la página en línea o Live Server.';
      } finally { checking = false; submit.disabled = false; submit.textContent = 'Entrar a BADBEAR.BOOKS →'; }
    });
    input.focus({preventScroll:true});
  }

  function start() { if (authorized()) grant(); else { forget(); lock(); } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
  window.addEventListener('pageshow', event => { if (event.persisted) start(); });
})();
