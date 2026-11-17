import { SHOWS, splitShows } from './shows.js?v=4';
import { STRINGS, pickLanguage } from './i18n.js?v=4';

const IG = 'https://www.instagram.com/852livemusic/';
const EMAIL = '852livemusic@gmail.com';

let lang = 'en';
const $ = (s) => document.querySelector(s);
const t = (k) => STRINGS[lang][k] ?? STRINGS.en[k] ?? k;
const L = (o) => o?.[lang] ?? (lang === 'zht' ? o?.zh : undefined) ?? o?.en;

function h(tag, props = {}, ...kids) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === 'class') node.className = v;
    else node.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat()) if (kid != null && kid !== false) node.append(kid.nodeType ? kid : document.createTextNode(kid));
  return node;
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function fmtDate(iso) {
  return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : lang === 'zht' ? 'zh-TW' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(iso + 'T12:00:00Z'));
}

const CITY = {
  zh: { London: '伦敦', Manchester: '曼彻斯特', 'Hong Kong': '香港', Beijing: '北京' },
  zht: { London: '倫敦', Manchester: '曼徹斯特', 'Hong Kong': '香港', Beijing: '北京' },
};
const city = (s) => CITY[lang]?.[s.city] ?? s.city;

function heroNext(next) {
  if (!next) {
    return h('div', { class: 'next-card soon' },
      h('p', { class: 'next-label' }, t('next_label')),
      h('h2', {}, t('soon_title')),
      h('p', {}, t('soon_body')),
      h('div', { class: 'btn-row' },
        h('a', { class: 'btn', href: IG, target: '_blank', rel: 'noopener' }, t('btn_ig')),
        h('a', { class: 'btn ghost', href: `mailto:${EMAIL}` }, t('btn_email'))));
  }
  return h('div', { class: 'next-card' },
    h('p', { class: 'next-label' }, t('next_label')),
    h('h2', {}, L(next.title)),
    h('p', {}, `${fmtDate(next.date)} · ${L(next.venue)}, ${city(next)}`),
    next.ticketUrl && h('div', { class: 'btn-row' }, h('a', { class: 'btn', href: next.ticketUrl, target: '_blank', rel: 'noopener' }, t('btn_tickets'))));
}

function showCard(s, withTickets) {
  const poster = s.image
    ? h('img', { src: s.image, alt: L(s.alt) ?? L(s.title), loading: 'lazy' })
    : textPoster(s);
  const info = h('div', { class: 'show-info' },
    h('p', { class: 'show-date' }, `${fmtDate(s.date)} · ${city(s)}`),
    h('h3', {}, L(s.title)),
    h('p', { class: 'show-venue' }, L(s.venue)),
    s.note && h('p', { class: 'show-note' }, L(s.note)),
    s.lineup.length ? h('p', { class: 'mini' }, t('past_lineup')) : null,
    s.lineup.length ? h('ul', { class: 'chips' }, (lang === 'zht' && s.lineupZht || s.lineup).map((n) => h('li', {}, n))) : null,
    withTickets && s.ticketUrl && h('a', { class: 'btn', href: s.ticketUrl, target: '_blank', rel: 'noopener' }, t('btn_tickets')),
    s.gallery.length ? h('p', { class: 'mini' }, t('past_gallery')) : null,
    s.gallery.length ? h('div', { class: 'gallery' }, s.gallery.map((src) => h('img', { src, alt: '', loading: 'lazy' }))) : null);
  return h('article', { class: 'show reveal' }, h('figure', { class: 'show-poster' }, poster), info);
}

function textPoster(s) {
  return h('div', { class: 'text-poster' }, h('span', {}, L(s.title)));
}

function render() {
  document.documentElement.lang = { en: 'en', zh: 'zh-Hans', zht: 'zh-Hant' }[lang];
  document.querySelectorAll('#langs button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  document.querySelectorAll('[data-i18n]').forEach((n) => { n.textContent = t(n.dataset.i18n); });
  const { next, upcoming, past } = splitShows(SHOWS, todayISO());
  $('#hero-next').replaceChildren(heroNext(next));
  const up = $('#shows-upcoming');
  up.replaceChildren(...upcoming.map((s) => showCard(s, true)));
  up.hidden = upcoming.length === 0;
  $('#shows-past').replaceChildren(...past.map((s) => showCard(s, false)));
  observeReveals();
}

let io;
function observeReveals() {
  const items = document.querySelectorAll('.reveal:not(.in)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) { items.forEach((n) => n.classList.add('in')); return; }
  io ??= new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  items.forEach((n) => io.observe(n));
}

function readStored() { try { return localStorage.getItem('lang'); } catch { return null; } }
function writeStored(v) { try { localStorage.setItem('lang', v); } catch { /* ignore */ } }

// Show a styled text card if a poster fails to load.
document.addEventListener('error', (e) => {
  const img = e.target;
  if (img.tagName !== 'IMG' || !img.closest('.show-poster')) return;
  const show = SHOWS.find((s) => s.image && img.src.endsWith(s.image));
  img.replaceWith(textPoster(show ?? { title: { en: '', zh: '' } }));
}, true);

lang = pickLanguage(readStored(), navigator.language);
$('#langs').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-lang]');
  if (!b) return;
  lang = b.dataset.lang; writeStored(lang); render();
});

const menuBtn = $('#menu-btn');
const links = $('#nav-links');
menuBtn.addEventListener('click', () => {
  const open = menuBtn.getAttribute('aria-expanded') !== 'true';
  menuBtn.setAttribute('aria-expanded', String(open));
  links.classList.toggle('open', open);
});
links.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') { menuBtn.setAttribute('aria-expanded', 'false'); links.classList.remove('open'); }
});
addEventListener('scroll', () => $('#nav').classList.toggle('scrolled', scrollY > 24), { passive: true });

render();
