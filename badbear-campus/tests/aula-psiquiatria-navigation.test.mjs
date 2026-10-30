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

test('every theory opens in a new tab even with an old integrated flag', () => {
 for (const legacyFlag of [true, false]) {
  const a = aula(legacyFlag);
  assert.equal(a.all().some(e => e.className === 'psiq-theory-frame'), false);
  const link = a.all().find(e => e.target === '_blank');
  assert.equal(link.href, 'https://example.test/psiquiatria/clases/clase-01.html');
  assert.equal(link.rel, 'noopener noreferrer');
  assert.equal(a.newTabs.length, 0, 'selecting a class must not open unsolicited tabs');
  a.tab('Teoría completa').click();
  assert.deepEqual(a.newTabs[0], ['https://example.test/psiquiatria/clases/clase-01.html', '_blank', 'noopener,noreferrer']);
 }
});

test('opening theory and selecting another class preserves the global audio', () => {
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
 assert.equal(a.historyChanges.at(-1), 'aula-psiquiatria.html?clase=PSIQ-C02');
 assert.equal(a.newTabs.length, 1);
 a.tab('Teoría completa').click();
 assert.equal(a.newTabs[1][0], 'https://example.test/psiquiatria/clases/clase-02.html');
});
