import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../aula-psiquiatria.js', import.meta.url), 'utf8');

function aula(integrated = true) {
 class Element {
  constructor(tag) { this.tag = tag; this.children = []; this.attributes = {}; this.events = {}; this.style = {}; this.textContent = ''; this.value = ''; }
  append(...children) { this.children.push(...children); }
  appendChild(child) { this.append(child); }
  replaceChildren(...children) { this.children = children; }
  setAttribute(key, value) { this.attributes[key] = value; }
  removeAttribute(key) { delete this.attributes[key]; }
  addEventListener(name, action) { this.events[name] = action; }
  click() { this.events.click?.({ defaultPrevented: false, preventDefault() {} }); }
 }
 const ids = new Map();
 const document = {
  baseURI: "https://example.test/badbear-campus/aula-psiquiatria.html",
  getElementById(id) { if (!ids.has(id)) ids.set(id, new Element('div')); return ids.get(id); },
  createElement(tag) { return new Element(tag); },
  body: { classList: { add() {}, remove() {} } }
 };
 const audio = document.getElementById('psiq-global-audio');
 audio.loadCalls = 0; audio.pauseCalls = 0;
 audio.load = () => audio.loadCalls++;
 audio.pause = () => audio.pauseCalls++;
 let historyChanges = [], newTabs = [];
 const window = {
  open: (...args) => newTabs.push(args),
  BADBEAR_PSIQUIATRIA_CLASES: [1, 2].map(n => ({ id: 'PSIQ-C0' + n, numero: n, titulo: 'Clase ' + n, teoriaIntegrada: integrated, teoria: '../psiquiatria/clases/clase-0' + n + '.html', recursos: { audio: '/audio-test.mp3', extra: '/document-test.pdf' } })),
  location: { search: '?clase=PSIQ-C01', origin: 'https://example.test' },
  history: { replaceState(_, __, url) { historyChanges.push(url); } }
 };
 vm.runInNewContext(source, { document, window, localStorage: { getItem: () => null, setItem() {} }, URL, URLSearchParams });
 function descendants(element) { return [element, ...element.children.flatMap(descendants)]; }
 const all = () => descendants(ids.get('psiq-class-content'));
 const tab = name => all().find(e => e.attributes.role === 'tab' && e.textContent === name);
 return { Element, document, ids, audio, historyChanges, newTabs, all, tab };
}

test('opening a class renders its theory inside the aula without a new-tab link', () => {
 const a = aula();
 const frame = a.all().find(e => e.className === 'psiq-theory-frame');
 assert.equal(frame.tag, 'iframe');
 assert.equal(frame.src, '../psiquiatria/clases/clase-01.html');
 assert.equal(frame.attributes.sandbox.includes('allow-popups'), false);
 assert.equal(frame.attributes.sandbox.includes('allow-top-navigation'), false);
 assert.equal(a.all().some(e => e.target === '_blank'), false);
});

test('switching from audio to theory and another class preserves the global audio', () => {
 const a = aula();
 a.tab('Audio').click();
 a.audio.currentTime = 123;
 const loaded = a.audio.loadCalls, paused = a.audio.pauseCalls;
 a.tab('Teoría completa').click();
 a.ids.get('psiq-class-list').children[1].click();
 assert.equal(a.audio.src, '/audio-test.mp3');
 assert.equal(a.audio.currentTime, 123);
 assert.equal(a.audio.loadCalls, loaded);
 assert.equal(a.audio.pauseCalls, paused);
 assert.equal(a.all().find(e => e.className === 'psiq-theory-frame').src, '../psiquiatria/clases/clase-02.html');
 assert.equal(a.historyChanges.at(-1), 'aula-psiquiatria.html?clase=PSIQ-C02');
});

test('chapter links stay in their frame; next-class links select the class in the existing aula', () => {
 const a = aula();
 const frame = a.all().find(e => e.className === 'psiq-theory-frame');
 const next = new a.Element('a'); next.href = 'https://example.test/badbear-campus/aula-psiquiatria.html?clase=PSIQ-C02'; next.target = '_blank';
 const reference = new a.Element('a'); reference.href = 'https://reference.test/book'; reference.target = '_blank';
 frame.contentDocument = { baseURI: 'https://example.test/psiquiatria/clases/clase-01.html', head: new a.Element('head'), createElement: a.document.createElement, querySelectorAll: () => [next, reference] };
 frame.events.load();
 assert.equal(next.target, '_self'); assert.equal(reference.target, '_self');
 let prevented = false;
 next.events.click({ defaultPrevented: false, preventDefault() { prevented = true; } });
 assert.equal(prevented, true);
 assert.equal(a.all().find(e => e.className === 'psiq-theory-frame').src, '../psiquiatria/clases/clase-02.html');
});

test('other lessons retain their existing separate-tab reading mode', () => {
 const a = aula(false);
 assert.equal(a.all().some(e => e.className === 'psiq-theory-frame'), false);
 assert.equal(a.all().some(e => e.target === '_blank'), true);
 a.tab('Teoría completa').click();
 assert.equal(a.newTabs.length, 1);
 assert.equal(a.newTabs[0][1], '_blank');
});
