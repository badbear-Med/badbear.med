(() => {
  'use strict';
  const key = 'bb-books-wajomeismo-v1';
  const safeRead = name => { try { return JSON.parse(localStorage.getItem(name)); } catch (_) { return null; } };
  const safeWrite = (name, value) => { try { localStorage.setItem(name, JSON.stringify(value)); return true; } catch (_) { return false; } };
  const record = safeRead(key);
  const valid = record && Number.isInteger(record.chapter) && record.chapter >= 0 && record.chapter <= 20;
  const fileFor = chapter => chapter === 0 ? 'prologo.html' : `capitulo-${String(chapter).padStart(2, '0')}.html`;
  document.querySelectorAll('[data-resume]').forEach(link => {
    if (valid) { link.href = fileFor(record.chapter); link.hidden = false; link.textContent = `Continuar: ${record.chapter === 0 ? 'prólogo' : 'capítulo ' + record.chapter}`; }
  });
  const article = document.querySelector('.chapter');
  if (!article) return;
  const number = Number(document.body.dataset.chapter);
  const status = document.getElementById('read-status');
  let size = safeRead(key + '-size');
  if (!Number.isFinite(size)) size = 19;
  size = Math.max(16, Math.min(26, size));
  const applySize = () => {
    document.documentElement.style.setProperty('--reading-size', size + 'px');
    document.querySelector('[data-font="-1"]').disabled = size <= 16;
    document.querySelector('[data-font="1"]').disabled = size >= 26;
  };
  applySize();
  document.querySelectorAll('[data-font]').forEach(button => button.addEventListener('click', () => {
    size = Math.max(16, Math.min(26, size + Number(button.dataset.font)));
    applySize(); safeWrite(key + '-size', size); status.textContent = `Texto: ${size} px`;
  }));
  const paper = document.getElementById('paper');
  const tone = safeRead(key + '-paper');
  paper.value = tone === 'warm' ? 'warm' : 'light';
  document.body.dataset.paper = paper.value;
  paper.addEventListener('change', () => { document.body.dataset.paper = paper.value; safeWrite(key + '-paper', paper.value); });
  const menu = document.querySelector('.chapter-menu');
  const narrow = window.matchMedia('(max-width: 760px)');
  const updateMenu = () => { menu.open = !narrow.matches; };
  updateMenu(); narrow.addEventListener('change', updateMenu);
  const remember = () => {
    const rect = article.getBoundingClientRect();
    const total = Math.max(1, article.offsetHeight - window.innerHeight + 120);
    const progress = Math.max(0, Math.min(100, Math.round((120 - rect.top) / total * 100)));
    const saved = safeWrite(key, {chapter:number, progress});
    document.querySelector('[data-progress]').style.width = progress + '%';
    status.textContent = saved ? `Capítulo guardado · ${progress}%` : `Lectura · ${progress}%`;
  };
  let queued = false;
  window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(() => { remember(); queued = false; }); } }, {passive:true});
  remember();
})();
