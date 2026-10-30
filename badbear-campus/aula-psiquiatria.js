(() => {
 "use strict";
 const classes = Array.isArray(window.BADBEAR_PSIQUIATRIA_CLASES) ? window.BADBEAR_PSIQUIATRIA_CLASES : [];
 const list = document.getElementById("psiq-class-list");
 const content = document.getElementById("psiq-class-content");
 const search = document.getElementById("psiq-class-search");
 const count = document.getElementById("psiq-class-count");
 const progressLabel = document.getElementById("psiq-progress-label");
 const progressFill = document.getElementById("psiq-progress-fill");
 const player = document.getElementById("psiq-global-player");
 const audio = document.getElementById("psiq-global-audio");
 const playerTitle = document.getElementById("psiq-global-player-title");
 const playerClose = document.getElementById("psiq-global-player-close");
 if (!list || !content || !classes.length) return;

 const progressKey = "badbear_psiquiatria_clases_estudiadas_v1";
 let studied;
 try {
  const saved = JSON.parse(localStorage.getItem(progressKey) || "[]");
  studied = new Set(Array.isArray(saved) ? saved.filter(id => classes.some(c => c.id === id)) : []);
 } catch (_) { studied = new Set(); }
 const params = new URLSearchParams(window.location.search);
 const requested = params.get("clase");
 let current = classes.find(c => c.id === requested) || classes[0];
 let currentAudioUrl = "";

 const labels = [
  {key:"teoria",title:"Teoría completa"},
  {key:"ppt",title:"PPT / diapositivas"},
  {key:"audio",title:"Audio"},
  {key:"youtube",title:"Video YouTube"},
  {key:"extra",title:"Material extra"}
 ];

 function node(tag, value, cls) {
  const el = document.createElement(tag);
  if (value !== undefined && value !== null) el.textContent = String(value);
  if (cls) el.className = cls;
  return el;
 }
 function link(href, title, cls) {
  const el = node("a", title, cls || "psiq-resource-link");
  el.href = href;
  el.target = "_self";
  return el;
 }
 function theoryReader(item, url, panel) {
  panel.appendChild(node("p", "La teoría completa se lee en una pestaña nueva, a pantalla completa.", "psiq-resource-description"));
  const anchor = link(new URL(url, document.baseURI).href, "Abrir teoría completa ↗", "psiq-resource-link");
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  panel.appendChild(anchor);
 }
 function normalize(str) {
  return String(str || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
 }
 function updateProgress() {
  if(count) count.textContent = classes.length + " clases";
  if(progressLabel) progressLabel.textContent = studied.size + " de " + classes.length + " estudiadas";
  if(progressFill) progressFill.style.width = (100 * studied.size / classes.length) + "%";
 }
 function saveProgress() {
  try { localStorage.setItem(progressKey, JSON.stringify([...studied])); } catch (_) {}
  updateProgress();
 }
 function setGlobalAudio(item, url) {
  if (!player || !audio || !playerTitle) return;
  if (currentAudioUrl !== url) {
   audio.pause();
   audio.src = url;
   currentAudioUrl = url;
   audio.load();
  }
  playerTitle.textContent = "Clase " + item.numero + " · " + item.titulo;
  player.hidden = false;
  document.body.classList.add("psiq-audio-active");
 }
 if(playerClose && audio && player) {
  playerClose.addEventListener("click", () => {
   audio.pause();
   audio.removeAttribute("src");
   audio.load();
   currentAudioUrl = "";
   player.hidden = true;
   document.body.classList.remove("psiq-audio-active");
  });
 }

 function renderList() {
  list.replaceChildren();
  const term = normalize(search?.value);
  let found = 0;
  classes.forEach(item => {
   if(term && !normalize(item.numero + " " + item.titulo + " " + item.area).includes(term)) return;
   found++;
   const button = node("button", null, "psiq-class-nav-item");
   button.type = "button";
   button.setAttribute("aria-current", item.id === current.id ? "true" : "false");
   const n = node("span", String(item.numero).padStart(2, "0"), "psiq-class-nav-num");
   const title = node("span", item.titulo, "psiq-class-nav-title");
   button.append(n, title);
   if(studied.has(item.id)) button.appendChild(node("span", "✓", "psiq-class-nav-done"));
   button.addEventListener("click", () => selectClass(item.id));
   list.appendChild(button);
  });
  if(!found) list.appendChild(node("p", "No se encontraron clases con ese nombre.", "psiq-pending"));
 }

 function pending(container, type) {
  container.appendChild(node("p", "La " + type + " de esta clase todavía no está publicada. Su ubicación ya está preparada para vincular el material cuando se reciba.", "psiq-pending"));
 }
 function renderResource(item, key, panel) {
  panel.replaceChildren();
  const value = key === "teoria" ? item.teoria : item.recursos?.[key];
  if(typeof value !== "string" || !value.trim()) {
   pending(panel, labels.find(x => x.key === key)?.title.toLowerCase() || "sección");
   return;
  }
  const raw = value.trim();
  if(key === "teoria") {
   theoryReader(item, raw, panel);
   return;
  }
  if(key === "audio") {
   setGlobalAudio(item, raw);
   panel.appendChild(node("p", "Escucha desde la barra de reproducción general, situada en la parte inferior. Puedes cambiar a diapositivas, PDF u otra clase sin interrumpir la grabación.", "psiq-resource-description"));
   const choose = node("button", "Seleccionar esta grabación en el reproductor general", "psiq-select-audio");
   choose.type = "button";
   choose.addEventListener("click", () => setGlobalAudio(item, raw));
   panel.appendChild(choose);
   panel.appendChild(link(raw, "Abrir archivo de audio", "psiq-resource-secondary-link"));
   return;
  }
  if(key === "youtube") {
   const match = raw.match(/^(?:https:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=)([A-Za-z0-9_-]{11})(?:[&#?/].*)?$/i);
   if(match) {
    const frame = node("iframe", null, "psiq-video-frame");
    frame.src = "https://www.youtube-nocookie.com/embed/" + match[1];
    frame.title = "Clase " + item.numero + " · " + item.titulo;
    frame.loading = "lazy";
    frame.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share");
    frame.setAttribute("allowfullscreen", "");
    panel.appendChild(frame);
   }
   panel.appendChild(link(raw, "Ver video en YouTube"));
   return;
  }
  const base = raw.split("?")[0].split("#")[0].toLowerCase();
  const pdf = base.endsWith(".pdf");
  const ppt = /\.(ppt|pptx|pps|ppsx)$/.test(base);
  if(pdf || ppt) {
   panel.appendChild(node("p", pdf ? "Visualiza el archivo PDF dentro del aula mientras escuchas el audio." : "Visualiza la presentación mediante Microsoft Office Web Viewer.", "psiq-resource-description"));
   const frame = node("iframe", null, "psiq-document-frame");
   frame.src = ppt ? "https://view.officeapps.live.com/op/embed.aspx?src=" + encodeURIComponent(raw) : raw + "#toolbar=1&navpanes=0";
   frame.title = labels.find(x=>x.key===key).title + " · " + item.titulo;
   frame.loading = "lazy";
   panel.appendChild(frame);
   panel.appendChild(link(raw, "Abrir archivo original en esta pestaña"));
   return;
  }
  panel.appendChild(link(raw, "Abrir " + labels.find(x => x.key === key).title));
 }

 function renderCurrent() {
  content.replaceChildren();
  const crumb = node("p", "PSIQUIATRÍA · CLASE " + String(current.numero).padStart(2,"0") + " DE " + classes.length, "psiq-current-eyebrow");
  const title = node("h2", current.titulo);
  const description = node("p", current.descripcion, "psiq-current-description");
  const tag = node("span", current.area, "psiq-current-category");
  const header = node("div", null, "psiq-current-header");
  header.append(crumb, title, description, tag);
  content.appendChild(header);
  const actions = node("div", null, "psiq-class-actions");
  const done = node("button", studied.has(current.id) ? "✓ Clase estudiada" : "Marcar como estudiada", "psiq-study-button");
  done.type = "button";
  done.addEventListener("click", () => {
   if(studied.has(current.id)) studied.delete(current.id); else studied.add(current.id);
   saveProgress();
   done.textContent = studied.has(current.id) ? "✓ Clase estudiada" : "Marcar como estudiada";
   done.setAttribute("aria-pressed", String(studied.has(current.id)));
   renderList();
  });
  done.setAttribute("aria-pressed", String(studied.has(current.id)));
  actions.appendChild(done);
  content.appendChild(actions);
  const navTabs = node("div", null, "psiq-resource-tabs");
  navTabs.setAttribute("role", "tablist");
  navTabs.setAttribute("aria-label", "Recursos de la Clase " + current.numero);
  const panel = node("div", null, "psiq-resource-panel");
  labels.forEach((label, idx) => {
   const tab = node("button", label.title, "psiq-resource-tab");
   tab.type = "button";
   tab.setAttribute("role", "tab");
   tab.setAttribute("aria-selected", String(idx === 0));
   tab.addEventListener("click", () => {
    if (label.key === "teoria" && typeof current.teoria === "string" && current.teoria.trim()) {
     window.open(new URL(current.teoria.trim(), document.baseURI).href, "_blank", "noopener,noreferrer");
    }
    [...navTabs.children].forEach(btn => btn.setAttribute("aria-selected", String(btn === tab)));
    renderResource(current, label.key, panel);
   });
   navTabs.appendChild(tab);
  });
  content.append(navTabs, panel);
  renderResource(current, "teoria", panel);
  const navigation = node("div", null, "psiq-class-pager");
  const ix = classes.findIndex(c => c.id === current.id);
  if(ix > 0) {
   const prev = node("button", "← Clase " + String(ix).padStart(2,"0"), "psiq-pager-button");
   prev.type = "button";
   prev.addEventListener("click", () => selectClass(classes[ix-1].id));
   navigation.appendChild(prev);
  }
  const all = link("../psiquiatria/index.html#clases", "Programa completo", "psiq-pager-home");
  navigation.appendChild(all);
  if(ix < classes.length-1) {
   const next = node("button", "Clase " + String(ix+2).padStart(2,"0") + " →", "psiq-pager-button");
   next.type = "button";
   next.addEventListener("click", () => selectClass(classes[ix+1].id));
   navigation.appendChild(next);
  }
  content.appendChild(navigation);
 }
 function selectClass(id) {
  const item = classes.find(c => c.id === id);
  if(!item) return;
  current = item;
  renderList();
  renderCurrent();
  if(window.history?.replaceState) {
   window.history.replaceState(null, "", "aula-psiquiatria.html?clase=" + encodeURIComponent(id));
  }
 }
 search?.addEventListener("input", renderList);
 updateProgress();
 renderList();
 renderCurrent();
})();

