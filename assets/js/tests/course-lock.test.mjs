import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { webcrypto, createHash } from 'node:crypto';

const source = readFileSync(new URL('../course-lock.js', import.meta.url), 'utf8');
const password = 'test-only-course-passphrase';
const digest = createHash('sha256').update(password).digest('hex');

function browserSession() {
  const cookies = new Map();
  const channels = new Set();
  const writes = [];
  function tab(course = 'psiquiatria', options = {}) {
    const storage = new Map(Object.entries(options.legacy || {}));
    const nodes = [];
    const windowEvents = new Map();
    const documentEvents = new Map();
    const classes = new Set();
    function element() {
      return {
        className: '', value: '', type: '', textContent: '', disabled: false,
        events: new Map(), children: [], fields: new Map(),
        appendChild(child) { this.children.push(child); nodes.push(child); },
        setAttribute() {}, focus() {}, select() {},
        remove() { const i = nodes.indexOf(this); if (i >= 0) nodes.splice(i, 1); },
        addEventListener(name, fn) { this.events.set(name, fn); },
        querySelector(selector) {
          if (!this.fields.has(selector)) this.fields.set(selector, element());
          return this.fields.get(selector);
        }
      };
    }
    const root = element();
    root.classList = { add: v => classes.add(v), remove: v => classes.delete(v) };
    const document = {
      currentScript: { dataset: { course } }, documentElement: root,
      readyState: 'complete', visibilityState: 'visible', createElement: element,
      querySelector: selector => nodes.find(n => n.className === selector.slice(1)) || null,
      addEventListener: (event, fn) => documentEvents.set(event, fn),
      get cookie() { return [...cookies].map(([k, v]) => `${k}=${v}`).join('; '); },
      set cookie(value) {
        writes.push(value);
        if (options.blockCookies) return;
        const pair = value.split(';')[0];
        const eq = pair.indexOf('='); cookies.set(pair.slice(0, eq), pair.slice(eq + 1));
      }
    };
    const window = {
      BADBEAR_COURSE_LOCK: { hash: options.hash || digest },
      addEventListener: (event, fn) => windowEvents.set(event, fn)
    };
    class BroadcastChannel {
      constructor(name) { this.name = name; channels.add(this); }
      addEventListener(_, fn) { this.receive = fn; }
      postMessage(data) {
        for (const peer of channels) {
          if (peer !== this && peer.name === this.name) peer.receive?.({ data });
        }
      }
    }
    const sessionStorage = {
      getItem: key => { if (options.blockStorage) throw Error('denied'); return storage.get(key) ?? null; },
      setItem: (key, value) => { if (options.blockStorage) throw Error('denied'); storage.set(key, value); },
      removeItem: key => { if (options.blockStorage) throw Error('denied'); storage.delete(key); }
    };
    vm.runInNewContext(source, {
      document, window, sessionStorage, BroadcastChannel, location: { protocol: 'https:' },
      crypto: webcrypto, TextEncoder, Uint8Array, setTimeout: fn => fn()
    });
    return {
      locked: () => classes.has('bb-course-locked'),
      async enter(value) {
        const card = document.querySelector('.bb-lock-overlay').children[0];
        card.querySelector('#bb-lock-password').value = value;
        await card.querySelector('#bb-lock-submit').events.get('click')();
        return card.querySelector('#bb-lock-error').textContent;
      },
      close() { document.querySelector('.bb-lock-close').events.get('click')(); },
      focus() { windowEvents.get('focus')(); }
    };
  }
  return { tab, cookies, writes };
}

test('one password unlocks existing and new openerless class tabs, only for that course', async () => {
  const browser = browserSession();
  const course = browser.tab();
  const existingClass = browser.tab();
  assert.equal(course.locked(), true);
  assert.equal(existingClass.locked(), true);
  await course.enter(password);
  assert.equal(course.locked(), false);
  assert.equal(existingClass.locked(), false);
  assert.equal(browser.tab().locked(), false);
  assert.equal(browser.tab('cirugia-batimix').locked(), true);
  assert(browser.writes.every(v => /Path=\/; SameSite=Lax; Secure/.test(v)));
  assert(browser.writes.every(v => !/Expires|Max-Age|Domain=/i.test(v)));
});

test('incorrect password does not grant access in this tab or another', async () => {
  const browser = browserSession();
  const course = browser.tab();
  assert.equal(await course.enter('incorrect-test-value'), 'Clave incorrecta.');
  assert.equal(course.locked(), true);
  assert.equal(browser.tab().locked(), true);
});

test('closing course access revokes it across open tabs and does not affect another course', async () => {
  const browser = browserSession();
  const course = browser.tab(); await course.enter(password);
  const oldClass = browser.tab();
  const otherCourse = browser.tab('cirugia-batimix'); await otherCourse.enter(password);
  course.close();
  assert.equal(course.locked(), true);
  assert.equal(oldClass.locked(), true);
  oldClass.focus();
  assert.equal(oldClass.locked(), true);
  assert.equal(browser.tab().locked(), true);
  assert.equal(browser.tab('psiquiatria', { legacy: { badbear_course_unlock_psiquiatria: digest } }).locked(), true);
  assert.equal(otherCourse.locked(), false);
});

test('an existing valid session migrates, while a changed configured password invalidates access', () => {
  const browser = browserSession();
  const course = browser.tab('psiquiatria', { legacy: { badbear_course_unlock_psiquiatria: digest } });
  assert.equal(course.locked(), false);
  assert.equal(browser.tab().locked(), false);
  assert.equal(browser.tab('psiquiatria', { hash: 'different-test-hash' }).locked(), true);
});

test('blocked storage fails closed, without crashing; cookies work even if sessionStorage is denied', async () => {
  const browser = browserSession();
  const denied = browser.tab('psiquiatria', { blockCookies: true, blockStorage: true });
  assert.equal(denied.locked(), true);
  const course = browser.tab('psiquiatria', { blockStorage: true });
  await course.enter(password);
  assert.equal(course.locked(), false);
  assert.equal(browser.tab().locked(), false);
});
