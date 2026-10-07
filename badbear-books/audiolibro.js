/* Lectura automática por fragmentos; se activa después del acceso y un clic. */
(() => {
  'use strict';
  let initialized = false;
  function initialize() {
    if (initialized) return;
    initialized = true;
    const article = document.querySelector('.chapter');
    const tools = document.querySelector('.reader-tools');
    if (!article || !tools) return;
    const panel = document.createElement('section');
    panel.id = 'audiolibro'; panel.className = 'audiobook';
    panel.setAttribute('aria-labelledby', 'audiobook-title');
    panel.innerHTML = `<div class="audio-heading"><div><p class="eyebrow">LEE O ESCUCHA · BADBEAR.BOOKS</p><h2 id="audiobook-title">Audiolibro</h2></div><span class="audio-badge">Lectura automática</span></div>
      <div class="audio-options"><label>Contenido<select id="audio-scope"><option value="original">Texto original</option><option value="all">Capítulo completo</option><option value="growth">Desarrollo y aplicación</option></select></label><label>Voz en español<select id="audio-voice"><option value="">Voz del dispositivo</option></select></label><label>Velocidad<select id="audio-rate"><option value="0.75">0,75×</option><option value="1" selected>1×</option><option value="1.25">1,25×</option><option value="1.5">1,5×</option></select></label></div>
      <div class="audio-buttons"><button type="button" id="audio-play">▶ Escuchar capítulo</button><button type="button" id="audio-pause" disabled>Ⅱ Pausar</button><button type="button" id="audio-stop" disabled>■ Detener</button></div>
      <div class="audio-navigation"><button type="button" id="audio-prev" aria-label="Fragmento anterior">←</button><label for="audio-seek">Posición de escucha<input type="range" id="audio-seek" min="0" max="0" value="0" step="1"></label><button type="button" id="audio-next" aria-label="Fragmento siguiente">→</button></div>
      <output id="audio-status" role="status" aria-live="polite">Elige el contenido y pulsa Escuchar capítulo.</output><p id="audio-preview" class="audio-preview"></p><p class="audio-note">La voz depende de las opciones de tu dispositivo. Mantén esta página abierta durante la escucha. El punto de escucha se guarda en este navegador.</p>`;
    tools.insertAdjacentElement('afterend', panel);
    const $ = id => panel.querySelector('#' + id);
    const play = $('audio-play'), pause = $('audio-pause'), stop = $('audio-stop');
    const scope = $('audio-scope'), voice = $('audio-voice'), rate = $('audio-rate');
    const seek = $('audio-seek'), status = $('audio-status'), preview = $('audio-preview');
    const previous = $('audio-prev'), next = $('audio-next');
    const synth = window.speechSynthesis;
    if (!synth || typeof window.SpeechSynthesisUtterance !== 'function') {
      panel.querySelectorAll('button,select,input').forEach(control => { control.disabled = true; });
      status.textContent = 'Este navegador no dispone de lectura en voz alta. Prueba desde otro navegador o dispositivo.';
      return;
    }
    const book = document.body.dataset.book || 'wajomeismo-puro';
    const key = `bb-audio-v1-${book}-${document.body.dataset.chapter}`;
    const read = name => { try { return JSON.parse(localStorage.getItem(name)); } catch (_) { return null; } };
    const write = (name, value) => { try { localStorage.setItem(name, JSON.stringify(value)); } catch (_) {} };
    const original = article.querySelector(':scope > .book-text');
    const growth = article.querySelector('.chapter-expansion');
    if (!growth) scope.querySelector('[value="growth"]').remove();
    let chunks = [], index = 0, offset = 0, state = 'idle', generation = 0, utterance = null;
    let voices = [];
    const saved = read(key);
    if (saved && ['original', 'all', 'growth'].includes(saved.scope) && (saved.scope !== 'growth' || growth)) scope.value = saved.scope;
    const savedRate = read('bb-audio-rate');
    if ([0.75, 1, 1.25, 1.5].includes(savedRate)) rate.value = String(savedRate);
    function loadVoices() {
      const selected = voice.value || read('bb-audio-voice') || '';
      voices = synth.getVoices().filter(item => /^es(?:-|_|$)/i.test(item.lang));
      voice.replaceChildren();
      const base = document.createElement('option'); base.value = ''; base.textContent = voices.length ? 'Elegir automáticamente' : 'Español del dispositivo'; voice.appendChild(base);
      voices.forEach(item => { const option = document.createElement('option'); option.value = item.voiceURI; option.textContent = `${item.name} (${item.lang})`; voice.appendChild(option); });
      if (voices.some(item => item.voiceURI === selected)) voice.value = selected;
    }
    loadVoices(); synth.addEventListener?.('voiceschanged', loadVoices);
    function fragments(text) {
      const words = text.replace(/\s+/g, ' ').trim().split(' ');
      const output = []; let current = '';
      for (const word of words) {
        if (current && (current.length + word.length > 240 || (current.length > 110 && /[.!?…]$/.test(current)))) { output.push(current); current = ''; }
        current += (current ? ' ' : '') + word;
      }
      if (current.trim()) output.push(current.trim());
      return output;
    }
    function buildChunks() {
      const heading = article.querySelector('h1')?.textContent || '';
      const text = element => element?.innerText || '';
      const parts = [heading];
      if (scope.value !== 'growth') parts.push(text(original));
      if (scope.value !== 'original' && growth) parts.push(text(growth));
      chunks = fragments(parts.join('\n'));
      seek.max = String(Math.max(0, chunks.length - 1));
    }
    function remember() { write(key, {scope: scope.value, index, offset}); }
    function render(message) {
      seek.value = String(index);
      const active = state === 'playing';
      play.disabled = active || !chunks.length;
      play.textContent = state === 'paused' ? '▶ Reanudar' : index || offset ? '▶ Continuar escucha' : '▶ Escuchar capítulo';
      pause.disabled = !active; stop.disabled = state === 'idle' && index === 0 && offset === 0;
      previous.disabled = index === 0; next.disabled = index >= chunks.length - 1;
      preview.textContent = chunks[index] || '';
      seek.setAttribute('aria-valuetext', `Fragmento ${index + 1} de ${chunks.length}`);
      status.textContent = `${message || (active ? 'Escuchando' : state === 'paused' ? 'En pausa' : 'Listo para escuchar')} · Fragmento ${index + 1} de ${chunks.length}`;
    }
    function cancel() { generation++; synth.cancel(); utterance = null; }
    function speak() {
      if (!chunks.length) return;
      const token = ++generation;
      state = 'playing';
      // Cancel/restart makes pause portable even when native resume is unreliable.
      synth.cancel(); synth.resume();
      const start = offset;
      utterance = new window.SpeechSynthesisUtterance(chunks[index].slice(start));
      utterance.lang = 'es-ES'; utterance.rate = Number(rate.value);
      utterance.voice = voices.find(item => item.voiceURI === voice.value) || voices.find(item => item.default) || voices[0] || null;
      utterance.onboundary = event => {
        if (token !== generation || state !== 'playing') return;
        if (event.name === 'word' && Number.isFinite(event.charIndex)) offset = Math.min(chunks[index].length - 1, start + event.charIndex);
        remember();
      };
      utterance.onend = () => {
        if (token !== generation || state !== 'playing') return;
        if (index + 1 < chunks.length) { index++; offset = 0; remember(); speak(); }
        else { cancel(); state = 'idle'; index = 0; offset = 0; remember(); render('Lectura terminada'); }
      };
      utterance.onerror = event => {
        if (token !== generation) return;
        state = 'paused'; render(event.error === 'not-allowed' ? 'Pulsa Reanudar para permitir el audio' : 'La voz no pudo continuar. Elige otra voz y pulsa Reanudar');
      };
      render(); remember();
      try { synth.speak(utterance); } catch (_) { state = 'paused'; render('No se pudo iniciar la voz. Elige otra voz e inténtalo'); }
    }
    function move(position) {
      const playing = state === 'playing'; cancel();
      index = Math.max(0, Math.min(chunks.length - 1, position)); offset = 0;
      state = playing ? 'playing' : 'paused'; remember();
      if (playing) speak(); else render();
    }
    buildChunks();
    if (saved && Number.isInteger(saved.index) && saved.index >= 0 && saved.index < chunks.length) {
      index = saved.index;
      if (Number.isInteger(saved.offset)) offset = Math.max(0, Math.min(chunks[index].length - 1, saved.offset));
    }
    render(saved && (index || offset) ? 'Punto de escucha recuperado' : undefined);
    play.addEventListener('click', speak);
    pause.addEventListener('click', () => { cancel(); state = 'paused'; remember(); render(); });
    stop.addEventListener('click', () => { cancel(); state = 'idle'; index = 0; offset = 0; remember(); render('Escucha detenida'); });
    previous.addEventListener('click', () => move(index - 1)); next.addEventListener('click', () => move(index + 1));
    seek.addEventListener('input', () => { seek.setAttribute('aria-valuetext', `Fragmento ${Number(seek.value) + 1} de ${chunks.length}`); });
    seek.addEventListener('change', () => move(Number(seek.value)));
    scope.addEventListener('change', () => { cancel(); state = 'idle'; index = 0; offset = 0; buildChunks(); remember(); render('Contenido cambiado'); });
    rate.addEventListener('change', () => { write('bb-audio-rate', Number(rate.value)); if (state === 'playing') { cancel(); speak(); } });
    voice.addEventListener('change', () => { write('bb-audio-voice', voice.value); if (state === 'playing') { cancel(); speak(); } });
    window.addEventListener('pagehide', () => { remember(); cancel(); state = 'paused'; });
    window.addEventListener('pageshow', event => { if (event.persisted) render('Escucha en pausa'); });
    document.addEventListener('click', event => { if (event.target.closest?.('#books-close-access')) { cancel(); state = 'paused'; } });
    if (location.hash === '#audiolibro') { panel.scrollIntoView(); play.focus({preventScroll: true}); }
  }
  if (document.documentElement.classList.contains('books-access-granted')) initialize();
  else document.addEventListener('books-access-granted', initialize, {once: true});
})();
