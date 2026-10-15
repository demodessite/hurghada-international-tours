/* ==========================================================================
   Hurghada International Tours — application (catalogue, devis, WhatsApp)
   Vanilla JS, aucune dépendance.
   ========================================================================== */
(() => {
  'use strict';

  /* ---------- Stockage local (tolérant aux erreurs) ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* stockage indisponible */ } }
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clone = (o) => JSON.parse(JSON.stringify(o));

  /* ---------- Icône dauphin (dessin maison, style Tabler) ---------- */
  ICONS.dolphin = '<path d="M2.5 15.5c2.2-4.6 6.7-7.6 11.8-7.4 3.2.1 5.7 1.6 6.9 3.9l1.6.4-1.5 1c-.9 2-3.4 3.1-6.1 2.7-2.6-.4-4.8.3-6.8 2l-.2-2.4-2.4 1.8z"/><path d="M11 8.4l.9-3.2 2.4 3"/><path d="M12.5 15.2l-.6 2.6 2.3-2.2"/>';

  ICONS.download = '<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"/><path d="M7 11l5 5l5 -5"/><path d="M12 4l0 12"/>';

  const FLAGS = {
    fr: '<svg class="flag" viewBox="0 0 3 2" preserveAspectRatio="none" aria-hidden="true"><rect width="1" height="2" fill="#0055A4"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#EF4135"/></svg>',
    en: '<svg class="flag" viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="60" height="40" fill="#012169"/><path d="M0 0L60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" stroke-width="3"/><path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="12"/><path d="M30 0v40M0 20h60" stroke="#C8102E" stroke-width="7"/></svg>',
    es: '<svg class="flag" viewBox="0 0 3 2" preserveAspectRatio="none" aria-hidden="true"><rect width="3" height="2" fill="#AA151B"/><rect y=".5" width="3" height="1" fill="#F1BF00"/></svg>',
    pt: '<svg class="flag" viewBox="0 0 30 20" preserveAspectRatio="none" aria-hidden="true"><rect width="30" height="20" fill="#FF0000"/><rect width="12" height="20" fill="#006600"/><circle cx="12" cy="10" r="4" fill="#FFCC00"/><circle cx="12" cy="10" r="2.4" fill="#FF0000"/></svg>'
  };
  FLAGS.ru = '<svg class="flag" viewBox="0 0 3 3" preserveAspectRatio="none" aria-hidden="true"><rect width="3" height="1" fill="#fff"/><rect y="1" width="3" height="1" fill="#0039A6"/><rect y="2" width="3" height="1" fill="#D52B1E"/></svg>';
  FLAGS.ar = '<svg class="flag" viewBox="0 0 30 21" preserveAspectRatio="none" aria-hidden="true"><rect width="30" height="7" fill="#CE1126"/><rect y="7" width="30" height="7" fill="#fff"/><rect y="14" width="30" height="7" fill="#000"/><circle cx="15" cy="10.5" r="2.4" fill="#C09300"/></svg>';
  const LANG_NAMES = { fr: 'Français', en: 'English', es: 'Español', pt: 'Português' };
  const LOCALES = { fr: 'fr-FR', en: 'en-GB', es: 'es-ES', pt: 'pt-PT' };
  const DIRS = {};

  /* ---------- Packs de langue supplémentaires (js/lang-xx.js) ---------- */
  (function installPacks() {
    const packs = window.LANG_PACKS || {};
    Object.keys(packs).forEach((code) => {
      if (LANGS.includes(code)) return;
      const p = packs[code]; LANGS.push(code); const i = LANGS.length - 1;
      const put = (arr, val) => { if (Array.isArray(arr)) arr[i] = val != null ? val : (arr[1] ?? arr[0]); };
      const g = (obj, k) => (obj ? obj[k] : undefined);
      Object.keys(UI).forEach((k) => put(UI[k], g(p.ui, k)));
      CATS.forEach((c) => { put(c.l, g(p.cats, c.id)); c.subs.forEach((s) => put(s.l, g(p.cats, s.id))); });
      Object.keys(PLACES).forEach((k) => put(PLACES[k], g(p.places, k)));
      ZONES.forEach((z) => put(z.l, g(p.zones, z.id)));
      Object.keys(INCL).forEach((k) => put(INCL[k], g(p.incl, k)));
      Object.keys(EXCL).forEach((k) => put(EXCL[k], g(p.excl, k)));
      Object.keys(ADDONS).forEach((k) => put(ADDONS[k].l, g(p.addons, k)));
      OFFERS.forEach((o) => {
        const q = (p.offers && p.offers[o.id]) || {};
        put(o.title, q.t); put(o.desc, q.d);
        (o.notes || []).forEach((n, j) => put(n, q.n && q.n[j]));
        const putPricing = (pr, qq) => {
          if (!pr) return;
          (pr.variants || []).forEach((v) => { if (v.l) put(v.l, qq.v && qq.v[v.id]); });
          if (pr.unit) put(pr.unit, qq.u && qq.u[0]);
          if (pr.unitOne) put(pr.unitOne, qq.u && qq.u[1]);
        };
        putPricing(o.pricing, q);
        (o.slots || []).forEach((s, j) => { if (Array.isArray(s)) put(s, q.s && q.s[j]); });
        (o.formulas || []).forEach((f) => {
          const qf = (q.f && q.f[f.id]) || {};
          put(f.l, qf.l); if (f.desc) put(f.desc, qf.d);
          (f.notes || []).forEach((n, j) => put(n, qf.n && qf.n[j]));
          putPricing(f.pricing, qf);
        });
      });
      LANG_NAMES[code] = p.name; LOCALES[code] = p.locale; if (p.dir) DIRS[code] = p.dir;
    });
  })();

  /* ---------- Langue ---------- */
  function detectLang() {
    const saved = store.get('hit-lang', null);
    if (LANGS.includes(saved)) return saved;
    const prefs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'fr']);
    for (const p of prefs) { const l = String(p).slice(0, 2).toLowerCase(); if (LANGS.includes(l)) return l; }
    return 'en';
  }
  let lang = detectLang();
  const li = () => LANGS.indexOf(lang);
  const loc = () => LOCALES[lang];
  function t(key, vars) {
    const e = UI[key];
    let s = e ? (e[li()] ?? e[1] ?? e[0]) : key;
    if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  }
  const L = (v) => (Array.isArray(v) ? (v[li()] ?? v[1] ?? v[0]) : v);
  const sep = () => (lang === 'fr' ? ' : ' : ': ');
  const money = (n) => { const d = Math.round(n * 100) % 100 ? 2 : 0; return new Intl.NumberFormat(loc(), { style: 'currency', currency: 'EUR', maximumFractionDigits: d, minimumFractionDigits: d }).format(n); };

  /* ---------- Icônes ---------- */
  function icon(name, cls = '') {
    if (name.startsWith('arrow-')) cls += ' flip';
    if (name === 'star-filled') return `<svg class="i ${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${ICONS['star-filled']}</svg>`;
    return `<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
  }
  const stars = () => Array.from({ length: 5 }, () => icon('star-filled')).join('');
  function hydrateIcons(root = document) {
    $$('[data-icon]', root).forEach((el) => { el.outerHTML = icon(el.dataset.icon); });
    $$('[data-stars]', root).forEach((el) => { el.innerHTML = stars(); });
  }

  /* ---------- Données ---------- */
  const OFFERS_V = OFFERS.filter((o) => !o.hidden);
  const byId = Object.fromEntries(OFFERS.map((o) => [o.id, o]));
  const catOf = (id) => CATS.find((c) => c.id === id);
  const subOf = (o) => catOf(o.cat).subs.find((s) => s.id === o.sub);

  /* Formules (groupe / privé, VAN / BUS…) : la formule choisie complète l'activité */
  const formulaOf = (o, fId) => (o.formulas ? (o.formulas.find((f) => f.id === fId) || o.formulas[0]) : null);
  const effCache = new Map();
  function eff(o, c) {
    if (!o || !o.formulas || o.formula) return o;
    const f = formulaOf(o, c && c.formula); const key = o.id + '|' + f.id;
    if (!effCache.has(key)) effCache.set(key, Object.assign({}, o, f, { id: o.id, formula: f, formulas: o.formulas }));
    return effCache.get(key);
  }
  const hasPrivateOpt = (o) => !!(o.formulas && o.formulas.some((f) => (f.tags || []).includes('private')));
  function tiersOf(o, vId) {
    const vs = o.pricing.variants;
    if (vs) { const v = vs.find((x) => x.id === vId) || vs[0]; return v.tiers || []; }
    return o.pricing.tiers || [];
  }
  const variantOf = (o, vId) => (o.pricing.variants ? (o.pricing.variants.find((v) => v.id === vId) || o.pricing.variants[0]) : null);
  function maxPeople(o) {
    if (o.max) return o.max;
    if (o.pricing.type === 'group') { const m = Math.max(...o.pricing.variants.map((v) => v.max || 0)); return m || null; }
    return null;
  }
  function leadPrice(o) {
    if (o.formulas && !o.formula) {
      const all = o.formulas.map((f) => leadPrice(eff(o, { formula: f.id })));
      const best = all.reduce((a, b) => (b.p < a.p ? b : a));
      return Object.assign({}, best, { from: true });
    }
    const pr = o.pricing; const ps = [];
    if (pr.type === 'pp') (pr.variants || [{ tiers: pr.tiers }]).forEach((v) => { const t0 = v.tiers.find((x) => x.p > 0) || v.tiers[0]; ps.push(t0.p); });
    else if (pr.type === 'group') pr.variants.forEach((v) => ps.push(v.p));
    else ps.push(pr.p);
    const p = Math.min(...ps);
    const from = !!o.from || ps.length > 1 || !!o.season;
    let per = t('per_person');
    if (pr.type === 'group') per = t('flat_rate');
    if (pr.type === 'unit') per = '/ ' + L(pr.unitOne || pr.unit);
    return { p, from, per };
  }

  /* ---------- Formats ---------- */
  function fmtDur(d) {
    if (!d) return '';
    if (d.d) return t('dur_dn', { d: d.d, n: d.n });
    if (d.min) return d.min + ' min';
    const h = Math.floor(d.h); const m = Math.round((d.h - h) * 60);
    return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`;
  }
  function fmtDays(days) {
    const f = new Intl.DateTimeFormat(loc(), { weekday: 'short' });
    return [1, 2, 3, 4, 5, 6, 0].filter((d) => days.includes(d)).map((d) => f.format(new Date(2024, 0, 7 + d)).replace(/\.$/, '')).join(', ');
  }
  function parseDate(s) { if (!s) return null; const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
  function fmtDate(s, long = true) {
    const d = parseDate(s); if (!d) return '—';
    return new Intl.DateTimeFormat(loc(), long ? { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' } : { day: 'numeric', month: 'short' }).format(d);
  }
  function todayStr() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
  function ageLabel(a) {
    if (!a) return '';
    if (a.startsWith('u')) return t('age_under', { n: a.slice(1) });
    if (a.endsWith('+')) return t('age_plus', { n: a.slice(0, -1) });
    const [x, y] = a.split('-'); return t('age_range', { a: x, b: y });
  }
  function tierWord(k) { return t(k.startsWith('child') ? 't_child' : k === 'adult' ? 't_adult' : k === 'baby' ? 't_baby' : k === 'diver' ? 't_diver' : k === 'escort' ? 't_escort' : k === 'snorkeler' ? 't_snorkel' : 't_person'); }
  function tierLabel(tr) { const a = ageLabel(tr.a); return a ? `${tierWord(tr.k)} (${a})` : tierWord(tr.k); }
  function inSeason(key, dateStr) {
    if (!key || !dateStr) return false;
    const s = SEASONS[key]; const md = dateStr.slice(5);
    return s.from <= s.to ? (md >= s.from && md <= s.to) : (md >= s.from || md <= s.to);
  }
  const slotLabel = (o, i) => (o.slots && o.slots[i] != null ? L(o.slots[i]) : '');

  /* ---------- Calcul du prix ---------- */
  function calc(o, c) {
    o = eff(o, c);
    const pr = o.pricing; const season = inSeason(o.season, c.date);
    const lines = []; let persons = 0; let payers = 0;
    if (pr.type === 'pp') {
      tiersOf(o, c.variant).forEach((tr) => {
        const n = c.qty[tr.k] || 0; if (!n) return;
        const unit = season && tr.sp ? tr.sp : tr.p;
        persons += n; if (tr.k !== 'baby' || unit > 0) payers += n;
        lines.push({ label: tierLabel(tr), n, unit, total: n * unit });
      });
    } else if (pr.type === 'group') {
      const v = variantOf(o, c.variant);
      const unit = season && v.sp ? v.sp : v.p;
      persons = payers = c.persons;
      lines.push({ label: v.l ? L(v.l) : t('flat_rate').replace(/^./, (ch) => ch.toUpperCase()), n: 1, unit, total: unit, flat: true });
    } else {
      persons = payers = c.units;
      lines.push({ label: L(pr.unit), n: c.units, unit: pr.p, total: c.units * pr.p });
    }
    // petit groupe : supplément transfert pour le groupe (ex. moins de 3 personnes)
    if (o.smallGroup && persons > 0 && persons < o.smallGroup.under) {
      lines.push({ label: t('small_group_fee'), n: 1, unit: o.smallGroup.fee, total: o.smallGroup.fee, flat: true, fee: true });
    }
    (o.addons || []).forEach((id) => {
      const A = ADDONS[id]; const val = c.addons[id];
      if (!val) return;
      const n = A.per === 'pp' ? payers : Number(val);
      if (n > 0) lines.push({ label: L(A.l), n, unit: A.p, total: n * A.p, addon: true });
    });
    const total = lines.reduce((s, l) => s + l.total, 0);
    return { lines, total, persons, season, from: !!o.from };
  }

  /* ---------- Panier ---------- */
  /* Anciennes offres fusionnées dans une activité à formules */
  const MOVED = {
    'eden-speedboat': ['eden', 'private'], 'mahmya-speedboat': ['mahmya', 'private'],
    'luxor-van': ['luxor-day', 'van'], 'luxor-bus': ['luxor-day', 'bus'], 'luxor-private': ['luxor-day', 'private'],
    'cairo-van': ['cairo-day', 'van'], 'cairo-bus': ['cairo-day', 'bus'], 'cairo-private': ['cairo-day', 'private']
  };
  let cart = store.get('hit-cart', []).map((i) => {
    const mv = MOVED[i && i.id]; if (mv && i.cfg) { i.id = mv[0]; i.cfg.formula = mv[1]; }
    if (i && byId[i.id] && byId[i.id].formulas && i.cfg && !byId[i.id].formulas.some((f) => f.id === i.cfg.formula)) i.cfg.formula = byId[i.id].formulas[0].id;
    return i;
  }).filter((i) => i && byId[i.id] && !byId[i.id].hidden);
  const saveCart = () => store.set('hit-cart', cart);
  const cartTotal = () => cart.reduce((s, i) => s + calc(byId[i.id], i.cfg).total, 0);
  const cartFrom = () => cart.some((i) => byId[i.id].from);

  const defaultForm = { name: '', hotel: '', zone: 'hurghada', arr: '', dep: '', pickup: true, airport: false, atype: 'arrival', aIn: '', fIn: '', aOut: '', fOut: '', pax: 2, msg: '' };
  let form = Object.assign({}, defaultForm, store.get('hit-form', {}));
  const saveForm = () => store.set('hit-form', form);

  /* ---------- Illustrations des cartes ---------- */
  const THEMES = {
    sea: ['#a3e6ec', '#25a8bd', '#0b6a83'],
    heritage: ['#ffe7ad', '#f1ad58', '#bd6a31'],
    desert: ['#ffd8a2', '#f09558', '#bf4c36'],
    spa: ['#e8f5f0', '#a3d4c7', '#4a9887'],
    special: ['#ffdccc', '#f3997f', '#c24f3d'],
    night: ['#6380ad', '#2d4873', '#13294b']
  };
  function themeOf(o) {
    if (o.sub === 'special') return 'special';
    if (o.sub === 'wellness') return 'spa';
    if (['luxor-overnight', 'luxor-balloon', 'fantastic-sahara', 'souk'].includes(o.id)) return 'night';
    if (o.cat === 'aqua' || (o.id || '').startsWith('nile')) return 'sea';
    if (o.cat === 'excursions') return 'heritage';
    return 'desert';
  }
  function hash(s) { let h = 7; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) | 0; return Math.abs(h); }
  let artN = 0;
  function artSVG(o) {
    const th = themeOf(o); const [c0, c1, c2] = THEMES[th]; const h = hash(o.id); const id = 'art' + (++artN);
    const r = (n, m) => ((h >> n) % m);
    let deco = '';
    if (th === 'sea') {
      const j = r(2, 18);
      deco = `<path d="M0 ${168 + j}C70 ${146 + j} 130 ${192 + j} 205 ${170 + j}S340 ${146 + j} 400 ${168 + j}V250H0Z" fill="#fff" fill-opacity=".13"/>
        <path d="M0 ${198 + j}C80 ${180 + j} 150 ${214 + j} 230 ${198 + j}S350 ${182 + j} 400 ${200 + j}V250H0Z" fill="#fff" fill-opacity=".12"/>` +
        [0, 1, 2, 3].map((k) => `<circle cx="${40 + ((h >> (k * 3)) % 320)}" cy="${40 + ((h >> (k * 2 + 1)) % 110)}" r="${3 + ((h >> k) % 5)}" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.5"/>`).join('');
    } else if (th === 'heritage') {
      const px = 150 + r(3, 90);
      deco = `<circle cx="${300 + r(1, 50)}" cy="62" r="30" fill="#fff6d2" fill-opacity=".75"/>
        <path d="M${px} 250L${px + 95} 150L${px + 190} 250Z" fill="#7a3a10" fill-opacity=".2"/>
        <path d="M${px - 70} 250L${px + 5} 175L${px + 80} 250Z" fill="#7a3a10" fill-opacity=".14"/>
        <path d="M0 225C90 205 220 240 400 215V250H0Z" fill="#7a3a10" fill-opacity=".16"/>`;
    } else if (th === 'desert') {
      deco = `<circle cx="${60 + r(2, 70)}" cy="${55 + r(4, 20)}" r="28" fill="#fff4cf" fill-opacity=".7"/>
        <path d="M0 190C80 160 160 175 240 200S360 210 400 185V250H0Z" fill="#7a2410" fill-opacity=".18"/>
        <path d="M0 222C100 200 190 232 290 218S380 205 400 212V250H0Z" fill="#7a2410" fill-opacity=".22"/>`;
    } else if (th === 'spa') {
      deco = `<circle cx="80" cy="200" r="90" fill="#fff" fill-opacity=".18"/><circle cx="340" cy="40" r="70" fill="#fff" fill-opacity=".22"/>`;
    } else if (th === 'special') {
      deco = `<circle cx="330" cy="60" r="34" fill="#fff4e8" fill-opacity=".6"/><path d="M0 200C100 180 250 220 400 196V250H0Z" fill="#fff" fill-opacity=".14"/>`;
    } else {
      deco = Array.from({ length: 14 }, (_, k) => `<circle cx="${(h * (k + 3) * 7) % 400}" cy="${(h * (k + 5) * 3) % 150}" r="${k % 3 ? 1.2 : 1.9}" fill="#fff" fill-opacity="${k % 2 ? '.9' : '.55'}"/>`).join('') +
        `<path d="M0 214C110 196 220 228 400 204V250H0Z" fill="#0a1a33" fill-opacity=".35"/>`;
    }
    return `<svg class="art" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="${c0}"/><stop offset=".6" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
      <rect width="400" height="250" fill="url(#${id})"/>${deco}
      <circle cx="200" cy="122" r="64" fill="#fff" fill-opacity=".16"/>
      <g transform="translate(155 77) scale(3.75)" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${ICONS[o.icon] || ICONS.sparkles}</g>
    </svg>`;
  }
  const media = (o, eager) => (o.photo ? `<img src="${o.photo}" alt="" ${eager ? '' : 'loading="lazy"'} decoding="async"${o.photoPos ? ` style="object-position:${o.photoPos}"` : ''}>` : artSVG(o));

  /* Galerie de la fiche : plusieurs photos qu'on fait glisser */
  function galleryHTML(o) {
    const pics = o.photos && o.photos.length > 1 ? o.photos : null;
    if (!pics) return `<div class="offer-media">${media(o, true)}</div>`;
    return `<div class="offer-media gallery">
      <div class="gal-track">${pics.map((p, i) => `<img src="${p}" alt="" ${i ? 'loading="lazy"' : ''} decoding="async">`).join('')}</div>
      <button class="gal-btn gal-prev" type="button" data-gal="-1" aria-label="${esc(t('gal_prev'))}" disabled>${icon('chevron-left', 'flip')}</button>
      <button class="gal-btn gal-next" type="button" data-gal="1" aria-label="${esc(t('gal_next'))}">${icon('chevron-right', 'flip')}</button>
      <div class="gal-dots">${pics.map((_, i) => `<button type="button" data-gal-to="${i}" aria-label="${i + 1} / ${pics.length}" ${i ? '' : 'aria-current="true"'}></button>`).join('')}</div>
      <span class="gal-count">1 / ${pics.length}</span>
    </div>`;
  }
  const galIndex = (tr) => Math.round(Math.abs(tr.scrollLeft) / Math.max(1, tr.clientWidth));
  function galGo(g, i) {
    const tr = $('.gal-track', g); const n = tr.children.length;
    i = Math.max(0, Math.min(n - 1, i));
    const rtl = getComputedStyle(tr).direction === 'rtl';
    tr.scrollTo({ left: (rtl ? -1 : 1) * i * tr.clientWidth, behavior: 'smooth' });
  }
  function galSync(g) {
    const tr = $('.gal-track', g); const n = tr.children.length; const i = galIndex(tr);
    $$('.gal-dots button', g).forEach((b, k) => { if (k === i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    $('.gal-prev', g).disabled = i <= 0; $('.gal-next', g).disabled = i >= n - 1;
    $('.gal-count', g).textContent = `${i + 1} / ${n}`;
  }

  /* ---------- Scène du hero (SVG animé) ---------- */
  function waveRow(y, amp, cls, op, sw) {
    let d = `M-400 ${y}`; for (let i = 0; i < 28; i++) d += ` q50 ${i % 2 ? amp : -amp} 100 0`;
    return `<path class="${cls}" d="${d}" fill="none" stroke="#fff" stroke-opacity="${op}" stroke-width="${sw}" stroke-linecap="round"/>`;
  }
  function palm(x, y, s) {
    const leaf = 'M0 0C30-26 80-30 118 2C84-10 44-8 0 0Z';
    const right = [-62, -28, 6, 34].map((a, k) => `<path transform="rotate(${a})" d="${leaf}" fill="${k % 2 ? '#1f4e74' : '#173a5e'}"/>`).join('');
    const left = [-62, -28, 6].map((a, k) => `<path transform="rotate(${a})" d="${leaf}" fill="${k % 2 ? '#173a5e' : '#1f4e74'}"/>`).join('');
    return `<g class="frond" style="transform-origin:${x}px ${y}px"><g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 0C-8-70-2-130 30-190" fill="none" stroke="#1b3a5c" stroke-width="13" stroke-linecap="round"/>
      <path d="M-4-40h9M-6-80h9M-4-120h9M5-156h9" stroke="#2c5376" stroke-width="3" stroke-linecap="round"/>
      <g transform="translate(30 -190)">${right}<g transform="scale(-1 1)">${left}</g><path transform="rotate(-96)" d="${leaf}" fill="#1f4e74"/>
      <circle cx="-4" cy="8" r="7" fill="#5b3a1e"/><circle cx="8" cy="10" r="6.5" fill="#6d4524"/></g>
    </g></g>`;
  }
  function dolphinShape(fill) {
    return `<path d="M0 18C14 4 44-2 70 6C78 9 84 13 88 18C82 17 76 18 72 20C52 28 26 30 8 26L-6 36L-3 22L-12 14Z" fill="${fill}"/>
      <path d="M36 3L47-13L54 5Z" fill="${fill}"/><path d="M44 24L38 36L53 26Z" fill="${fill}"/><circle cx="74" cy="13" r="1.8" fill="#0b1e33"/>`;
  }
  function splash(x, y, cls) {
    return `<g class="splash ${cls}"><ellipse cx="${x}" cy="${y}" rx="26" ry="5" fill="#fff" fill-opacity=".7"/>
      <circle cx="${x - 12}" cy="${y - 12}" r="3.5" fill="#fff"/><circle cx="${x + 2}" cy="${y - 20}" r="4" fill="#fff"/><circle cx="${x + 15}" cy="${y - 10}" r="3" fill="#fff"/></g>`;
  }
  /* Activités en fond de scène : montgolfières, caravane, parachute, quad */
  function balloon(x, y, s, a, b, cls) {
    return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}">
      <path d="M0-60C34-60 44-30 40-8C36 14 16 26 8 36H-8C-16 26-36 14-40-8C-44-30-34-60 0-60Z" fill="${a}"/>
      <path d="M0-60C15-60 19-30 17-8C15 14 6 26 4 36H-4C-6 26-15 14-17-8C-19-30-15-60 0-60Z" fill="${b}"/>
      <path d="M-40-8C-20 0 20 0 40-8" fill="none" stroke="#13294b" stroke-opacity=".18" stroke-width="2"/>
      <path d="M-8 36L-6 48M8 36L6 48" stroke="#13294b" stroke-width="1.6"/>
      <rect x="-7" y="48" width="14" height="10" rx="2" fill="#6d4524"/></g></g>`;
  }
  function camel(x, fill) {
    return `<path transform="translate(${x} 0)" fill="${fill}" d="M0 0C4-10 10-16 16-14C20-20 26-20 28-12C32-12 34-18 38-22H42C44-22 44-18 42-17L40-16C38-10 36-6 32-4V12H30L29-2H14L13 12H11L10-2C6-2 2 0 2 6H0Z"/>`;
  }
  function caravan() {
    const f = '#8a6238';
    return `<g transform="translate(700 626) scale(.75)"><g class="caravan">
      <g fill="${f}"><circle cx="-14" cy="-24" r="4"/><path d="M-18-20H-10L-8-2L-10 12H-12L-14-2L-16 12H-18L-20-2Z"/></g>
      ${camel(0, f)}${camel(52, f)}${camel(104, f)}
      <circle cx="30" cy="-22" r="4" fill="${f}"/><path d="M26-18H34L33-12H27Z" fill="${f}"/>
      <circle cx="134" cy="-22" r="4" fill="${f}"/><path d="M130-18H138L137-12H131Z" fill="${f}"/>
    </g></g>`;
  }
  function parasail() {
    return `<g transform="translate(0 704)"><g class="parasail">
      <path d="M-70 6Q-30 2 0 6" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="3" stroke-linecap="round"/>
      <path d="M-6 0H40L50-6L46 6Q20 12-6 8Z" fill="#fff"/><path d="M8-2H24L22-9H12Z" fill="#13294b"/>
      <path d="M-4 0L-150-150" stroke="#13294b" stroke-opacity=".5" stroke-width="1.2"/>
      <g transform="translate(-160 -176)">
        <path d="M-34 6C-30-22 30-22 34 6C22 0 12-2 0-2S-22 0-34 6Z" fill="#e0674d"/>
        <path d="M-12-15C-8-19 8-19 12-15L10 0C4-1-4-1-10 0Z" fill="#f4b43a"/>
        <path d="M-34 6L0 30M34 6L0 30M-12 0L0 30M12 0L0 30" stroke="#13294b" stroke-opacity=".45" stroke-width="1"/>
        <circle cx="0" cy="33" r="3.2" fill="#13294b"/><path d="M-2 36H2L3 44H-3Z" fill="#13294b"/>
      </g></g></g>`;
  }
  function quad() {
    return `<g transform="translate(1470 624)"><g class="quad">
      <g class="dust"><circle cx="30" cy="2" r="7" fill="#f3dca8" opacity=".8"/><circle cx="42" cy="-2" r="9" fill="#f3dca8" opacity=".55"/><circle cx="56" cy="0" r="6" fill="#f3dca8" opacity=".35"/></g>
      <path d="M-14-4H14L18 2H-18Z" fill="#c0392b"/><path d="M-4-12H4L6-4H-6Z" fill="#13294b"/><circle cx="0" cy="-15" r="3.2" fill="#13294b"/>
      <circle cx="-11" cy="4" r="5" fill="#13294b"/><circle cx="11" cy="4" r="5" fill="#13294b"/>
    </g></g>`;
  }
  /* Banc de dauphins : sauts décalés pour qu'il y en ait presque toujours un en l'air */
  function dolphinPod() {
    const T = 5.2;
    const pod = [
      [880, 688, 1, 0, '#2a5b80'], [950, 710, .8, .12, '#346a90'],
      [1190, 700, 1.05, 1.4, '#244f72'], [1250, 724, .85, 1.52, '#2f6288'],
      [330, 700, .7, 2.3, '#2a5b80'], [1400, 684, .72, 3.1, '#346a90'],
      [560, 736, .95, 3.9, '#244f72'], [1060, 748, .9, 4.5, '#2f6288']
    ];
    return pod.map(([x, y, s, d, c]) => {
      const st = (delay) => `style="animation-duration:${T}s;animation-delay:${delay.toFixed(2)}s"`;
      const sp = (sx, delay) => `<g class="splash" ${st(delay)}><ellipse cx="${sx}" cy="70" rx="26" ry="5" fill="#fff" fill-opacity=".7"/><circle cx="${sx - 12}" cy="58" r="3.5" fill="#fff"/><circle cx="${sx + 2}" cy="50" r="4" fill="#fff"/><circle cx="${sx + 15}" cy="60" r="3" fill="#fff"/></g>`;
      return `<g transform="translate(${x} ${y}) scale(${s})"><g class="dolphin" ${st(d)}>${dolphinShape(c)}</g>${sp(38, d)}${sp(178, d + T * .31)}</g>`;
    }).join('');
  }
  function fins() {
    const fin = (c) => `<path d="M0 0Q6-18 18-21Q12-10 15 0Z" fill="${c}"/><path d="M-14 3H30" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>`;
    return `<g transform="translate(1650 790)"><g class="fins f1">${fin('#244f72')}<g transform="translate(46 10) scale(.8)">${fin('#2f6288')}</g></g></g>
      <g transform="translate(1700 745)"><g class="fins f2">${fin('#2a5b80')}</g></g>`;
  }
  function heroSVG() {
    return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" role="presentation" focusable="false">
    <defs>
      <linearGradient id="hSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6ee"/><stop offset=".5" stop-color="#e3f2ec"/><stop offset=".84" stop-color="#ffe6ae"/><stop offset="1" stop-color="#ffd690"/></linearGradient>
      <radialGradient id="hSun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe083"/><stop offset="1" stop-color="#f5a623"/></radialGradient>
      <radialGradient id="hGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe39a" stop-opacity=".9"/><stop offset="1" stop-color="#ffe39a" stop-opacity="0"/></radialGradient>
      <linearGradient id="hSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd7e0"/><stop offset=".28" stop-color="#2cb2c4"/><stop offset="1" stop-color="#0a6a86"/></linearGradient>
    </defs>
    <rect width="1600" height="640" fill="url(#hSky)"/>
    <g fill="#fff" fill-opacity=".7"><ellipse cx="1270" cy="210" rx="90" ry="16"/><ellipse cx="1330" cy="196" rx="60" ry="14"/><ellipse cx="1480" cy="120" rx="70" ry="12"/></g>
    <circle class="sun-glow" cx="1130" cy="585" r="230" fill="url(#hGlow)"/>
    <circle cx="1130" cy="585" r="92" fill="url(#hSun)"/>
    <path d="M740 640L830 600L900 616L985 570L1070 610L1170 588L1250 552L1345 592L1430 562L1520 598L1600 574V640Z" fill="#edc9a1" fill-opacity=".85"/>
    <path d="M1320 640L1400 604L1455 620L1525 588L1600 606V640Z" fill="#dcab82"/>
    <path d="M1308 640L1352 598L1396 640Z" fill="#e9c68d"/><path d="M1352 598L1366 640H1396Z" fill="#c4935a"/>
    <path d="M1190 640L1265 556L1345 640Z" fill="#efcd92"/><path d="M1265 556L1290 640H1345Z" fill="#c7975c"/>
    <path d="M980 640L1100 498L1255 640Z" fill="#f1d197"/><path d="M1100 498L1145 640H1255Z" fill="#c8995c"/>
    <path d="M1100 498L1145 640" stroke="#b9884f" stroke-width="1.5"/>
    ${balloon(1180, 150, 1, '#e0674d', '#f4b43a', 'balloon b1')}${balloon(1455, 300, .68, '#0d8ea3', '#ffffff', 'balloon b2')}${balloon(1030, 250, .5, '#f4b43a', '#13294b', 'balloon b3')}
    ${caravan()}${quad()}
    <g class="birds" fill="none" stroke="#13294b" stroke-width="2.6" stroke-linecap="round">
      <path d="M1180 300q9-9 18 0q9-9 18 0"/><path d="M1225 272q6-6 12 0q6-6 12 0" stroke-width="2"/><path d="M1262 318q7-7 14 0q7-7 14 0" stroke-width="2.2"/>
    </g>
    <rect y="640" width="1600" height="260" fill="url(#hSea)"/>
    <rect y="637" width="1600" height="4" fill="#fff" fill-opacity=".6"/>
    <g fill="#fff1c2"><rect class="shimmer" x="1070" y="652" width="120" height="5" rx="2.5" opacity=".85"/><rect class="shimmer" x="1090" y="668" width="80" height="4" rx="2" opacity=".7"/><rect class="shimmer" x="1105" y="684" width="50" height="4" rx="2" opacity=".55"/></g>
    ${parasail()}
    ${waveRow(700, 7, 'wave-a', .42, 3)}${waveRow(752, 8, 'wave-b', .32, 3)}${waveRow(812, 9, 'wave-c', .28, 3.5)}${waveRow(868, 10, 'wave-a', .22, 4)}
    <g transform="translate(640 676) scale(1.25)"><g class="felucca">
      <ellipse cx="70" cy="24" rx="72" ry="6" fill="#0a5f7a" fill-opacity=".35"/>
      <path d="M72 2V-122" stroke="#13294b" stroke-width="3.5"/>
      <path d="M20-9L118-150Q132-62 128-6Z" fill="#fffdf5" stroke="#13294b" stroke-width="2" stroke-linejoin="round"/>
      <path d="M26-18L126-18L127-7L22-10Z" fill="#f4b43a"/>
      <path d="M14-10L122-154" stroke="#13294b" stroke-width="3" stroke-linecap="round"/>
      <path d="M0 0Q70 24 140 0L126 16Q70 32 14 16Z" fill="#13294b"/>
    </g></g>
    ${fins()}${dolphinPod()}
    <path d="M0 900V796C120 776 250 796 360 846C400 866 420 886 430 900Z" fill="#f3dca8"/>
    <path d="M0 808C120 788 250 808 360 858" fill="none" stroke="#e2c084" stroke-width="4" stroke-opacity=".7"/>
    ${palm(118, 872, 1.05)}${palm(262, 886, .78)}
    <path d="M1600 900V812C1540 806 1466 836 1410 900Z" fill="#f3dca8"/>
    ${palm(1530, 892, .9)}
    </svg>`;
  }

  /* ---------- Rendu : textes statiques ---------- */
  function applyStatic() {
    document.documentElement.lang = lang;
    document.documentElement.dir = DIRS[lang] || 'ltr';
    $('#statLangs').textContent = LANGS.length;
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    const mt = t('hero_title').match(/^(.*?)([,،]\s*)(.*)$/);
    $('#heroTitle').innerHTML = mt ? `${esc(mt[1] + mt[2].trim())} <span class="hl">${esc(mt[3])}</span>` : esc(t('hero_title'));
    $('#q').placeholder = t('search_ph');
    $('#cartBtn').setAttribute('aria-label', t('cart'));
    $('#menuBtn').setAttribute('aria-label', t('menu'));
    $('#qClear').setAttribute('aria-label', t('close'));
    $('#langFlag').innerHTML = FLAGS[lang];
    $('#langCode').textContent = lang.toUpperCase();
    $('#statOffers').textContent = OFFERS_V.length;
    const langBtns = (cls) => LANGS.map((l) => `<button type="button" data-lang="${l}" ${cls === 'hello' ? `aria-pressed="${l === lang}"` : ''}>${FLAGS[l]}${cls === 'footer' ? l.toUpperCase() : LANG_NAMES[l]}</button>`).join('');
    $('#helloLangs').innerHTML = langBtns('hello');
    $('#helloLangs').setAttribute('aria-label', t('lang_label'));
    $('#footerLangs').innerHTML = langBtns('footer');
    $('#aboutLangs').innerHTML = LANGS.map((l) => `<span>${FLAGS[l]}${LANG_NAMES[l]}</span>`).join('');
    $('#langPop').innerHTML = LANGS.map((l) => `<button type="button" role="menuitemradio" aria-checked="${l === lang}" data-lang="${l}">${FLAGS[l]}${LANG_NAMES[l]}</button>`).join('');
    $$('.wa-link').forEach((a) => { a.href = waURL(t('q_greeting').replace(/[:：]\s*$/, '.')); });
    $$('.g-link[target]').forEach((a) => { a.href = CONTACT.googleReviews; });
    document.title = 'Hurghada International Tours';
  }
  const waURL = (text) => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

  /* ---------- Destinations ---------- */
  function renderDests() {
    const count = (f) => OFFERS_V.filter(f).length;
    const items = [
      { k: 'dest_sea', cat: 'aqua', sub: null, photo: 'img/mer-rouge.jpg', art: { id: 'dest-sea', icon: 'dolphin', cat: 'aqua', sub: 'islands' }, n: count((o) => o.cat === 'aqua') },
      { k: 'dest_luxor', cat: 'excursions', sub: 'luxor', photo: 'img/luxor-portrait.jpg', art: { id: 'dest-luxor', icon: 'building-arch', cat: 'excursions', sub: 'luxor' }, n: count((o) => o.sub === 'luxor') },
      { k: 'dest_cairo', cat: 'excursions', sub: 'cairo', photo: 'img/le-caire.jpg', art: { id: 'dest-cairo', icon: 'pyramid', cat: 'excursions', sub: 'cairo' }, n: count((o) => o.sub === 'cairo') },
      { k: 'dest_desert', cat: 'explore', sub: 'desert', photo: 'img/desert-portrait.jpg', art: { id: 'dest-desert', icon: 'sun', cat: 'explore', sub: 'desert' }, n: count((o) => o.sub === 'desert') }
    ];
    $('#dests').innerHTML = items.map((d) => `<button class="dest" type="button" data-cat="${d.cat}" data-sub="${d.sub || ''}">
      ${d.photo ? `<img src="${d.photo}" alt="" loading="lazy">` : artSVG(d.art)}
      <span class="dest-label"><b>${esc(t(d.k))}</b><span>${esc(t(d.n > 1 ? 'offers_many' : 'offers_one', { n: d.n }))} ${icon('arrow-right')}</span></span>
    </button>`).join('');
  }

  /* ---------- Catalogues (brochures PDF/JPG de l'agence) ---------- */
  const BROCHURE_DATE = '2026-10-15';
  const BROCHURES = [
    { key: 'iles', over: 'aqua', title: () => L(catOf('aqua').subs.find((x) => x.id === 'islands').l), img: { fr: 'img/cat-fr-iles.jpg', en: 'img/cat-en-iles.jpg', es: 'img/cat-es-iles.jpg', pt: 'img/cat-pt-iles.jpg', ru: 'img/cat-ru-iles.jpg', ar: 'img/cat-ar-iles.jpg' } },
    { key: 'mer', over: 'aqua', title: () => t('catl_sea'), img: { fr: 'img/cat-fr-mer.jpg', en: 'img/cat-en-mer.jpg', es: 'img/cat-es-mer.jpg', pt: 'img/cat-pt-mer.jpg', ru: 'img/cat-ru-mer.jpg', ar: 'img/cat-ar-mer.jpg' } },
    { key: 'excursions', title: () => L(catOf('excursions').l), img: { fr: 'img/cat-fr-excursions.jpg', en: 'img/cat-en-excursions.jpg', es: 'img/cat-es-excursions.jpg', pt: 'img/cat-pt-excursions.jpg', ru: 'img/cat-ru-excursions.jpg', ar: 'img/cat-ar-excursions.jpg' } },
    { key: 'explore', title: () => L(catOf('explore').l), img: { fr: 'img/cat-fr-explore.jpg', en: 'img/cat-en-explore.jpg', es: 'img/cat-es-explore.jpg', pt: 'img/cat-pt-explore.jpg', ru: 'img/cat-ru-explore.jpg', ar: 'img/cat-ar-explore.jpg' } }
  ];
  const brImg = (b) => b.img[lang] || b.img.en;
  const brFile = (b) => `hurghada-international-tours-${b.key}-${lang}.jpg`;
  const brNote = () => t('catl_note', { d: new Intl.DateTimeFormat(loc(), { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(BROCHURE_DATE + 'T12:00:00')) });
  function renderBrochures() {
    $('#brochures').innerHTML = BROCHURES.map((b, i) => {
      const name = b.title();
      return `<article class="brochure">
        <button class="brochure-thumb" type="button" data-brochure="${i}" aria-label="${esc(t('catl_view'))} – ${esc(name)}"><img src="${brImg(b)}" alt="" loading="lazy" decoding="async"></button>
        <div class="brochure-body">${b.over ? `<p>${esc(L(catOf(b.over).l))}</p>` : ''}<h3>${esc(name)}</h3>
          <div class="brochure-actions"><button class="btn btn-ink btn-sm" type="button" data-brochure="${i}">${icon('search')}${esc(t('catl_view'))}</button>
          <a class="btn btn-ghost btn-sm" href="${brImg(b)}" download="${brFile(b)}">${icon('download')}${esc(t('catl_dl'))}</a></div></div>
      </article>`;
    }).join('');
    const n = $('#catalogue .brochure-note span:last-child'); if (n) n.textContent = brNote();
  }
  const brochureDlg = document.getElementById('brochureDialog');
  function openBrochure(i) {
    const b = BROCHURES[i]; const name = b.title();
    brochureDlg.innerHTML = `<div class="sheet-bar"><button class="back-btn" type="button" data-close>${icon('arrow-left')}${esc(t('back'))}</button><span class="sheet-bar-title" id="brochureTitle">${esc(name)}</span></div>
      <button class="sheet-close" type="button" data-close aria-label="${esc(t('close'))}">${icon('x')}</button>
      <div class="sheet-scroll"><img class="brochure-full" src="${brImg(b)}" alt="${esc(name)}"></div>
      <div class="sheet-foot"><p class="brochure-note">${icon('info-circle')}<span>${esc(brNote())}</span></p><a class="btn btn-sun" href="${brImg(b)}" download="${brFile(b)}">${icon('download')}${esc(t('catl_dl'))}</a></div>`;
    if (!brochureDlg.open) { brochureDlg.showModal(); pushHist(brochureDlg, 'brochure', '#catalogue'); }
  }
  document.addEventListener('click', (e) => { const b = e.target.closest('#brochures [data-brochure]'); if (b) openBrochure(Number(b.dataset.brochure)); });
  brochureDlg.addEventListener('click', (e) => { if (e.target === brochureDlg || e.target.closest('[data-close]')) brochureDlg.close(); });
  brochureDlg.addEventListener('close', () => popHist(brochureDlg));

  /* ---------- Catalogue ---------- */
  const state = { cat: 'all', sub: null, q: '' };
  const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const searchIndex = Object.fromEntries(OFFERS_V.map((o) => [o.id, norm([
    ...o.title, ...o.desc, ...(PLACES[o.place] || []), ...subOf(o).l, ...catOf(o.cat).l,
    ...(o.formulas || []).flatMap((f) => [...f.l, ...(f.desc || [])]), ...(hasPrivateOpt(o) ? [...UI.private, ...UI.opt_private] : [])
  ].join(' '))]));
  const CAT_ICONS = { all: 'compass', aqua: 'swimming', excursions: 'pyramid', explore: 'sun' };

  function filtered() {
    const words = norm(state.q).split(/\s+/).filter(Boolean);
    return OFFERS_V.filter((o) => (state.cat === 'all' || o.cat === state.cat) && (!state.sub || o.sub === state.sub) && words.every((w) => searchIndex[o.id].includes(w)));
  }
  function renderTabs() {
    const tabs = [{ id: 'all', l: t('cat_all'), n: OFFERS_V.length }, ...CATS.map((c) => ({ id: c.id, l: L(c.l), n: OFFERS_V.filter((o) => o.cat === c.id).length }))];
    $('#tabs').innerHTML = tabs.map((c) => `<button class="tab" role="tab" type="button" data-tab="${c.id}" aria-selected="${state.cat === c.id}">${icon(CAT_ICONS[c.id])}${esc(c.l)} <small>${c.n}</small></button>`).join('');
    const chips = $('#chips');
    if (state.cat === 'all') { chips.hidden = true; chips.innerHTML = ''; return; }
    chips.hidden = false;
    const cat = catOf(state.cat);
    chips.innerHTML = `<button class="chip" type="button" data-sub="" aria-pressed="${!state.sub}">${esc(t('cat_all'))}</button>` +
      cat.subs.map((s) => `<button class="chip" type="button" data-sub="${s.id}" aria-pressed="${state.sub === s.id}">${esc(L(s.l))}</button>`).join('');
  }
  function metaItems(o) {
    o = eff(o); const items = [];
    if (o.dur) items.push(['clock', fmtDur(o.dur)]);
    else if (o.dep) items.push(['clock', `${o.dep} → ${o.ret}${o.retNext ? ' (+1)' : ''}`]);
    else if (o.hours) items.push(['clock', o.hours]);
    if (o.days) items.push(['calendar', fmtDays(o.days)]);
    else if (o.daily) items.push(['calendar', t('daily')]);
    const mx = maxPeople(o); if (mx) items.push(['users', t('max_people', { n: mx })]);
    return items;
  }
  function tagsHTML(o) {
    const out = [];
    if (o.tags?.includes('private')) out.push(`<span class="tag tag-dark">${icon('shield-check')}${esc(t('private'))}</span>`);
    else if (hasPrivateOpt(o)) out.push(`<span class="tag tag-dark">${icon('shield-check')}${esc(t('opt_private'))}</span>`);
    if (o.minAge) out.push(`<span class="tag">${esc(t('min_age', { n: o.minAge }))}</span>`);
    else if (o.tags?.includes('family')) out.push(`<span class="tag">${icon('users')}${esc(t('family'))}</span>`);
    if (o.tags?.includes('sunset') && out.length < 2) out.push(`<span class="tag">${icon('sunset')}${esc(t('sunset'))}</span>`);
    return out.slice(0, 2).join('');
  }
  function priceHTML(o) {
    const lp = leadPrice(o);
    return `<div class="price">${lp.from ? `<span class="from">${esc(t('from'))}</span>` : '<span class="from">&nbsp;</span>'}<strong>${money(lp.p)}</strong><span class="per">${esc(lp.per)}</span></div>`;
  }
  function cardHTML(o) {
    const inCart = cart.some((i) => i.id === o.id);
    return `<article class="card" data-id="${o.id}">
      <button class="card-media" type="button" data-open="${o.id}" tabindex="-1" aria-hidden="true">${media(o)}<span class="card-tags">${tagsHTML(o)}</span></button>
      <div class="card-body">
        <p class="card-eyebrow">${icon('map-pin')}${esc(L(PLACES[o.place]))}</p>
        <h3 class="card-title"><button type="button" data-open="${o.id}">${esc(L(o.title))}</button></h3>
        <p class="card-desc">${esc(L(o.desc))}</p>
        <ul class="card-meta">${metaItems(o).map(([ic, tx]) => `<li>${icon(ic)}${esc(tx)}</li>`).join('')}</ul>
        <div class="card-foot">${priceHTML(o)}
          <button class="btn-add ${inCart ? 'is-in' : ''}" type="button" data-add="${o.id}" aria-label="${esc(t('add_to_quote'))} – ${esc(L(o.title))}">${icon(inCart ? 'check' : 'plus')}${esc(inCart ? t('in_quote') : t('add'))}</button>
        </div>
      </div>
    </article>`;
  }
  function renderCatalog() {
    const list = filtered();
    $('#resultCount').textContent = t(list.length === 1 ? 'offers_one' : 'offers_many', { n: list.length });
    const host = $('#catalog');
    if (!list.length) {
      host.innerHTML = `<div class="empty"><p>${esc(t('no_results'))}</p><a class="btn btn-wa wa-link" href="${waURL(t('q_greeting').replace(/[:：]\s*$/, '.') + ' ' + state.q)}" target="_blank" rel="noopener">${icon('brand-whatsapp')}${esc(t('hero_wa'))}</a></div>`;
      return;
    }
    if (state.q || state.sub) { host.innerHTML = `<div class="grid">${list.map(cardHTML).join('')}</div>`; return; }
    let html = '';
    CATS.forEach((c) => c.subs.forEach((s) => {
      const g = list.filter((o) => o.cat === c.id && o.sub === s.id);
      if (!g.length) return;
      html += `<h3 class="group-title">${esc(L(s.l))} <small>${state.cat === 'all' ? esc(L(c.l)) + ' · ' : ''}${g.length}</small></h3><div class="grid">${g.map(cardHTML).join('')}</div>`;
    }));
    host.innerHTML = html;
  }
  function refreshCardButtons() {
    $$('[data-add]').forEach((b) => {
      const inCart = cart.some((i) => i.id === b.dataset.add);
      b.classList.toggle('is-in', inCart);
      b.innerHTML = icon(inCart ? 'check' : 'plus') + esc(inCart ? t('in_quote') : t('add'));
    });
  }

  /* ---------- Historique : le geste « retour » du téléphone ferme la fiche ---------- */
  let ignorePop = false;
  try { history.scrollRestoration = 'manual'; } catch (e) { /* ignore */ }
  function pushHist(dlg, name, hash) {
    try {
      const st = history.state;
      if (st && st.hit) history.replaceState({ hit: name }, '', hash);
      else history.pushState({ hit: name }, '', hash);
      dlg._hist = true;
    } catch (e) { dlg._hist = false; }
  }
  function popHist(dlg) {
    if (!dlg._hist) return;
    dlg._hist = false;
    try { if (history.state && history.state.hit) { ignorePop = true; history.back(); } } catch (e) { /* ignore */ }
  }
  window.addEventListener('popstate', () => {
    if (ignorePop) { ignorePop = false; return; }
    [document.getElementById('offerDialog'), document.getElementById('cartDialog'), document.getElementById('brochureDialog')].forEach((d) => { if (d.open) { d._hist = false; d.close(); } });
  });

  /* ---------- Fiche offre + configurateur ---------- */
  const offerDlg = $('#offerDialog');
  let cur = null; let cfg = null; let editingUid = null; let backToCart = false;

  function defaultCfg(base, fId) {
    const o = eff(base, { formula: fId }); const pr = o.pricing;
    const c = { formula: o.formula ? o.formula.id : null, variant: pr.variants ? pr.variants[0].id : null, slot: o.slots ? 0 : null, choice: o.choice ? 0 : null, date: '', qty: {}, persons: 2, units: 1, addons: {} };
    if (pr.type === 'pp') tiersOf(o, c.variant).forEach((tr, i) => { c.qty[tr.k] = i === 0 ? Math.min(2, o.max || 2) : 0; });
    if (pr.type === 'group') { const v = variantOf(o, c.variant); c.persons = Math.max(pr.min || 1, Math.min(2, v.max || 2)); }
    return c;
  }
  function openOffer(id, opts = {}) {
    const o = byId[id]; if (!o) return;
    cur = o; editingUid = opts.uid || null; backToCart = !!opts.backToCart;
    const existing = editingUid ? cart.find((i) => i.uid === editingUid) : null;
    cfg = existing ? clone(existing.cfg) : defaultCfg(o, opts.formula);
    renderOffer();
    if (!offerDlg.open) { offerDlg.showModal(); pushHist(offerDlg, 'offer', '#o-' + id); }
    $('.sheet-scroll', offerDlg).scrollTop = 0;
    if (opts.toBook) requestAnimationFrame(() => { const b = $('#bookStart'); if (b && window.innerWidth < 900) b.scrollIntoView({ block: 'start' }); });
  }
  function factsHTML(o) {
    const f = [];
    f.push(['map-pin', L(PLACES[o.place])]);
    if (o.dur) f.push(['hourglass', fmtDur(o.dur)]);
    if (o.dep) f.push(['clock', `${t('depart')} ${o.dep} · ${t('return')} ${o.ret}${o.retNext ? ' ' + t('next_day') : ''}`]);
    else if (o.hours) f.push(['clock', o.hours]);
    if (o.days) f.push(['calendar', `${t('departures')} : ${fmtDays(o.days)}`.replace(' : ', sep())]);
    else if (o.daily) f.push(['calendar', t('daily')]);
    const mx = maxPeople(o); if (mx) f.push(['users', t('max_people', { n: mx })]);
    if (o.minAge) f.push(['info-circle', t('min_age', { n: o.minAge })]);
    return f.map(([i, x]) => `<span class="fact">${icon(i)}${esc(x)}</span>`).join('');
  }
  /* Tous les tarifs de l'offre, comme sur les fiches du client */
  function pricesHTML(o, curF) {
    if (o.formulas && !o.formula) {
      return `<div class="plist plist-formulas">${o.formulas.map((f) => {
        const inner = pricesHTML(eff(o, { formula: f.id }));
        return `<div class="plist-formula ${curF === f.id ? 'is-cur' : ''}"><h4 class="plist-ftitle">${(f.tags || []).includes('private') ? icon('shield-check') : ''}${esc(L(f.l))}</h4>${inner}</div>`;
      }).join('')}</div>`;
    }
    const pr = o.pricing;
    const seasonTxt = (sp) => (o.season && sp ? `<small>${esc(t('season_info', { period: t(SEASONS[o.season].k), price: money(sp) }))}</small>` : '');
    const tierRows = (tiers) => tiers.map((tr) => {
      const lab = tr.k === 'person' ? t('price_pp') : tierWord(tr.k);
      return `<li><span>${esc(lab)}${tr.a ? `<small>${esc(ageLabel(tr.a))}</small>` : ''}${seasonTxt(tr.sp)}</span><b>${tr.p ? money(tr.p) : esc(t('free'))}</b></li>`;
    }).join('');
    let groups = [];
    if (pr.type === 'pp') {
      if (pr.variants) groups = pr.variants.map((v) => ({ h: L(v.l), rows: tierRows(v.tiers) }));
      else groups = [{ h: '', rows: tierRows(pr.tiers) }];
    } else if (pr.type === 'group') {
      groups = [{ h: '', rows: pr.variants.map((v) => `<li><span>${esc(v.l ? L(v.l) : t('flat_rate').replace(/^./, (c) => c.toUpperCase()))}${v.max ? `<small>${esc(t('max_people', { n: v.max }))}</small>` : ''}${seasonTxt(v.sp)}</span><b>${money(v.p)}</b></li>`).join('') }];
    } else {
      groups = [{ h: '', rows: `<li><span>${esc(L(pr.unitOne || pr.unit).replace(/^./, (c) => c.toUpperCase()))}</span><b>${money(pr.p)}</b></li>` }];
    }
    return `<div class="plist">${groups.map((g) => `<div class="plist-group">${g.h ? `<h4>${esc(g.h)}</h4>` : ''}<ul>${g.rows}</ul></div>`).join('')}</div>`;
  }
  function suppHTML(o) {
    if (o.transfer === 'none') return `<p class="transfer-hint">${icon('bus')}<span>${esc(t('transfer_none'))}</span></p>`;
    const list = SUPPS[o.supp || 'std'];
    if (!list) return '';
    return `<div class="supp"><h3>${icon('bus')}${esc(t('supp_title'))}</h3>
      <ul>${list.map(([z, p]) => `<li><span>${esc(L(ZONES.find((x) => x.id === z).l))}</span><b>+${money(p)}</b></li>`).join('')}</ul>
      <p>${esc(t('supp_note'))}</p></div>`;
  }
  function seg(name, opts, checked) {
    return `<div class="seg" role="radiogroup">${opts.map((op, i) => `<label><input type="radio" name="${name}" value="${esc(op.v)}" ${String(op.v) === String(checked) ? 'checked' : ''}><span>${esc(op.l)}${op.p ? `<small>${esc(op.p)}</small>` : ''}</span></label>`).join('')}</div>`;
  }
  function renderOffer() {
    const o = eff(cur, cfg); const pr = o.pricing;
    const notes = (o.notes || []).map((n) => `<p class="note">${icon('info-circle')}<span>${esc(L(n))}</span></p>`).join('');
    const incl = (o.incl || []).map((k) => `<li>${icon('check')}${esc(L(INCL[k]))}</li>`).join('');
    const excl = (o.excl || []).map((k) => `<li>${icon('x')}${esc(L(EXCL[k]))}</li>`).join('');
    let seasonInfo = '';
    if (o.season) {
      const alt = pr.type === 'pp' ? tiersOf(o, cfg.variant)[0].sp : variantOf(o, cfg.variant).sp;
      seasonInfo = `<p class="hint">${icon('sun-high')} ${esc(t('season_info', { period: t(SEASONS[o.season].k), price: money(alt) }))}</p>`;
    }
    let formulaField = '';
    if (cur.formulas) {
      const opts = cur.formulas.map((f) => { const lp = leadPrice(eff(cur, { formula: f.id })); return { v: f.id, l: L(f.l), p: (lp.from ? t('from') + ' ' : '') + money(lp.p) + ' ' + lp.per }; });
      formulaField = `<div class="field"><span class="label">${esc(t('vk_formula'))}</span>${seg('bkForm', opts, cfg.formula)}</div>`;
    }
    let variantField = '';
    if (pr.variants && pr.variants.length > 1) {
      const opts = pr.variants.map((v) => ({ v: v.id, l: L(v.l), p: money(pr.type === 'pp' ? (v.tiers.find((x) => x.p > 0) || v.tiers[0]).p : v.p) }));
      variantField = `<div class="field"><span class="label">${esc(t(pr.vk || 'vk_formula'))}</span>${seg('bkVar', opts, cfg.variant)}</div>`;
    }
    const slotField = o.slots ? `<div class="field"><span class="label">${esc(t(o.slotKey || 'vk_slot'))}</span>${seg('bkSlot', o.slots.map((s, i) => ({ v: i, l: L(s) })), cfg.slot)}</div>` : '';
    const choiceField = o.choice ? `<div class="field"><label for="bkChoice">${esc(t(o.choice.k))}</label><select id="bkChoice">${o.choice.opts.map((x, i) => `<option value="${i}" ${i === cfg.choice ? 'selected' : ''}>${esc(x)}</option>`).join('')}</select></div>` : '';
    const dateHint = o.days ? t('date_hint_days', { days: fmtDays(o.days) }) : t('date_hint');
    const addons = (o.addons || []).map((id) => {
      const A = ADDONS[id];
      if (A.per === 'qty') {
        const n = Number(cfg.addons[id] || 0);
        return `<div class="pax"><div class="pax-row"><span><b>${esc(L(A.l))}</b><small>${money(A.p)} · ${esc(t('each'))}</small></span>${stepper('addon:' + id, n, 0, 20)}</div></div>`;
      }
      return `<label class="check"><input type="checkbox" data-addon="${id}" ${cfg.addons[id] ? 'checked' : ''}><span><b>${esc(L(A.l))}</b><small>${money(A.p)} ${esc(t('per_person'))}</small></span></label>`;
    }).join('');

    offerDlg.innerHTML = `
      <div class="sheet-bar"><button class="back-btn" type="button" data-close>${icon('arrow-left')}${esc(t('back'))}</button><span class="sheet-bar-title">${esc(L(o.title))}</span></div>
      <button class="sheet-close" type="button" data-close aria-label="${esc(t('close'))}">${icon('x')}</button>
      <div class="sheet-scroll"><div class="offer-layout">
        <div>
          ${galleryHTML(o)}
          <div class="offer-info">
            <p class="card-eyebrow">${esc(L(subOf(o).l))} · ${esc(L(catOf(o.cat).l))}</p>
            <h2 id="offerTitle">${esc(L(o.title))}</h2>
            <div class="facts">${factsHTML(o)}</div>
            ${pricesHTML(cur, cfg.formula)}
            <p class="offer-desc">${esc(L(o.desc))}</p>
            ${notes ? `<div class="notes">${notes}</div>` : ''}
            <div class="incl-grid">
              ${incl ? `<div class="incl yes"><h3>${esc(t('included'))}</h3><ul>${incl}</ul></div>` : ''}
              ${excl ? `<div class="incl no"><h3>${esc(t('not_included'))}</h3><ul>${excl}</ul></div>` : ''}
            </div>
            ${suppHTML(o)}
          </div>
        </div>
        <div class="offer-book" id="bookStart">
          <h3>${esc(t('your_booking'))}</h3>
          ${formulaField}${variantField}${slotField}${choiceField}
          <div class="field">
            <label for="bkDate">${esc(t('choose_date'))}</label>
            <input type="date" id="bkDate" min="${todayStr()}" value="${esc(cfg.date)}" required>
            <p class="hint">${esc(dateHint)}</p>
            <p class="warn" id="dateWarn" hidden>${esc(t('date_warn'))}</p>
            <p class="err" id="dateErr" hidden>${esc(t('date_required'))}</p>
          </div>
          <div class="field" id="paxWrap"></div>
          ${addons ? `<div class="field"><span class="label">${esc(t('options'))}</span>${addons}</div>` : ''}
          ${seasonInfo}
          <p class="season-note" id="seasonNote" hidden></p>
          <ul class="breakdown" id="breakdown"></ul>
          <p class="hint">${esc(t('est_note'))}</p>
        </div>
      </div></div>
      <div class="sheet-foot">
        <div class="sheet-total"><small>${esc(t('est_total'))}</small><b id="bkTotal"></b></div>
        <button class="btn btn-sun" type="button" id="bkAdd">${icon(editingUid ? 'check' : 'plus')}${esc(t(editingUid ? 'update_quote' : 'add_to_quote'))}</button>
      </div>`;
    renderPax();
    updateOfferCalc();
    const g = $('.gallery', offerDlg);
    if (g) { let raf = 0; $('.gal-track', g).addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => galSync(g)); }, { passive: true }); }
  }
  function stepper(key, val, min, max) {
    return `<span class="stepper" data-step="${key}">
      <button type="button" data-d="-1" aria-label="−" ${val <= min ? 'disabled' : ''}>${icon('minus')}</button>
      <output aria-live="polite">${val}</output>
      <button type="button" data-d="1" aria-label="+" ${val >= max ? 'disabled' : ''}>${icon('plus')}</button></span>`;
  }
  function paxTotal() { return Object.values(cfg.qty).reduce((s, n) => s + n, 0); }
  function renderPax() {
    const o = eff(cur, cfg); const pr = o.pricing; const wrap = $('#paxWrap');
    const season = inSeason(o.season, cfg.date);
    if (pr.type === 'pp') {
      const tiers = tiersOf(o, cfg.variant); const cap = o.max || 30; const total = paxTotal();
      wrap.innerHTML = `<span class="label">${esc(t('travellers'))}</span><div class="pax">${tiers.map((tr, i) => {
        const n = cfg.qty[tr.k] || 0; const p = season && tr.sp ? tr.sp : tr.p;
        return `<div class="pax-row"><span><b>${esc(tierWord(tr.k))}</b><small>${tr.a ? esc(ageLabel(tr.a)) + ' · ' : ''}${p ? money(p) : esc(t('free'))}</small></span>${stepper('tier:' + tr.k, n, i === 0 ? 1 : 0, total >= cap ? n : 30)}</div>`;
      }).join('')}</div>${o.max ? `<p class="hint">${esc(t('max_people', { n: o.max }))}</p>` : ''}`;
    } else if (pr.type === 'group') {
      const v = variantOf(o, cfg.variant); const max = v.max || 30; const min = pr.min || 1;
      cfg.persons = Math.min(Math.max(cfg.persons, min), max);
      wrap.innerHTML = `<span class="label">${esc(t('persons'))}</span><div class="pax"><div class="pax-row"><span><b>${esc(t('persons'))}</b><small>${v.max ? esc(t('max_people', { n: v.max })) : ''}</small></span>${stepper('persons', cfg.persons, min, max)}</div></div>
        ${v.max ? `<p class="hint">${esc(t('group_more', { n: v.max }))}</p>` : ''}`;
    } else {
      wrap.innerHTML = `<span class="label">${esc(L(pr.unit))}</span><div class="pax"><div class="pax-row"><span><b>${esc(L(pr.unit))}</b><small>${money(pr.p)} · ${esc(t('each'))}</small></span>${stepper('units', cfg.units, 1, 10)}</div></div>`;
    }
  }
  function updateOfferCalc() {
    const o = eff(cur, cfg); const r = calc(o, cfg);
    $('#bkTotal').textContent = (r.from ? t('from') + ' ' : '') + money(r.total);
    $('#breakdown').innerHTML = r.lines.map((l) => `<li><span>${esc(l.label)}${l.flat ? '' : ` × ${l.n}`}</span><b>${money(l.total)}</b></li>`).join('');
    const sn = $('#seasonNote');
    sn.hidden = !r.season; if (r.season) sn.textContent = t('season_applied', { period: t(SEASONS[o.season].k) });
    const w = $('#dateWarn');
    w.hidden = !(o.days && cfg.date && !o.days.includes(parseDate(cfg.date).getDay()));
  }
  offerDlg.addEventListener('click', (e) => {
    if (e.target === offerDlg || e.target.closest('[data-close]')) { offerDlg.close(); return; }
    const gb = e.target.closest('[data-gal], [data-gal-to]');
    if (gb) {
      const g = gb.closest('.gallery'); const cur0 = galIndex($('.gal-track', g));
      galGo(g, gb.dataset.galTo != null ? Number(gb.dataset.galTo) : cur0 + Number(gb.dataset.gal));
      return;
    }
    const sb = e.target.closest('.stepper button');
    if (sb && !sb.disabled) {
      const key = sb.closest('.stepper').dataset.step; const d = Number(sb.dataset.d);
      const [kind, k] = key.split(':');
      if (kind === 'tier') cfg.qty[k] = Math.max(0, (cfg.qty[k] || 0) + d);
      else if (kind === 'persons') cfg.persons += d;
      else if (kind === 'units') cfg.units += d;
      else if (kind === 'addon') cfg.addons[k] = Math.max(0, Number(cfg.addons[k] || 0) + d);
      if (kind === 'addon') {
        const st = sb.closest('.stepper'); const n = cfg.addons[k];
        st.querySelector('output').textContent = n; st.querySelector('[data-d="-1"]').disabled = n <= 0; st.querySelector('[data-d="1"]').disabled = n >= 20;
      } else {
        const focusD = d; renderPax();
        const again = $(`.stepper[data-step="${key}"] [data-d="${focusD}"]`, offerDlg);
        if (again && !again.disabled) again.focus(); else $(`.stepper[data-step="${key}"] output`, offerDlg)?.focus?.();
      }
      updateOfferCalc();
      return;
    }
    if (e.target.closest('#bkAdd')) addToCart();
  });
  offerDlg.addEventListener('change', (e) => {
    const el = e.target;
    if (el.name === 'bkForm') { switchFormula(el.value); return; }
    if (el.name === 'bkVar') {
      cfg.variant = el.value;
      const tiers = tiersOf(eff(cur, cfg), cfg.variant);
      tiers.forEach((tr) => { if (cfg.qty[tr.k] == null) cfg.qty[tr.k] = 0; });
      renderPax();
    } else if (el.name === 'bkSlot') cfg.slot = Number(el.value);
    else if (el.id === 'bkChoice') cfg.choice = Number(el.value);
    else if (el.id === 'bkDate') { cfg.date = el.value; el.classList.remove('invalid'); $('#dateErr').hidden = true; renderPax(); }
    else if (el.dataset.addon) cfg.addons[el.dataset.addon] = el.checked;
    updateOfferCalc();
  });
  offerDlg.addEventListener('input', (e) => { if (e.target.id === 'bkDate') { cfg.date = e.target.value; updateOfferCalc(); } });
  offerDlg.addEventListener('close', () => { popHist(offerDlg); updateBar(); });

  /* Changement de formule : on garde la date, les options et, si possible, le nombre de personnes */
  function switchFormula(fId) {
    const prev = cfg; const prevO = eff(cur, prev);
    const n = prevO.pricing.type === 'pp' ? paxTotal() : prevO.pricing.type === 'group' ? prev.persons : prev.units;
    const c = defaultCfg(cur, fId); const o = eff(cur, c); const pr = o.pricing;
    c.date = prev.date; c.addons = Object.assign({}, prev.addons);
    if (pr.variants && pr.variants.some((v) => v.id === prev.variant)) c.variant = prev.variant;
    if (pr.type === 'pp') {
      const tiers = tiersOf(o, c.variant); const cap = o.max || 30;
      const same = tiers.some((tr) => prev.qty[tr.k]);
      tiers.forEach((tr, i) => { c.qty[tr.k] = same ? (prev.qty[tr.k] || 0) : (i === 0 ? n : 0); });
      let tot = tiers.reduce((s, tr) => s + c.qty[tr.k], 0);
      for (let i = tiers.length - 1; i >= 0 && tot > cap; i--) { const k = tiers[i].k; const cut = Math.min(c.qty[k] - (i === 0 ? 1 : 0), tot - cap); c.qty[k] -= cut; tot -= cut; }
      if (!c.qty[tiers[0].k]) c.qty[tiers[0].k] = 1;
    } else if (pr.type === 'group') {
      if (!prev.variant || !pr.variants.some((v) => v.id === prev.variant)) {
        const fit = pr.variants.find((v) => !v.max || v.max >= n) || pr.variants[pr.variants.length - 1]; c.variant = fit.id;
      }
      const v = variantOf(o, c.variant); c.persons = Math.max(pr.min || 1, Math.min(n || 1, v.max || 30));
    }
    cfg = c;
    const sc = $('.sheet-scroll', offerDlg); const top = sc ? sc.scrollTop : 0;
    renderOffer();
    const sc2 = $('.sheet-scroll', offerDlg); if (sc2) sc2.scrollTop = top;
    const r = $(`input[name="bkForm"][value="${fId}"]`, offerDlg); if (r) r.focus({ preventScroll: true });
  }
  function addToCart() {
    const dateEl = $('#bkDate');
    if (!cfg.date) { dateEl.classList.add('invalid'); $('#dateErr').hidden = false; dateEl.focus(); dateEl.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    // on ne garde que les tranches de la formule choisie
    const eo = eff(cur, cfg);
    if (eo.pricing.type === 'pp') { const keys = tiersOf(eo, cfg.variant).map((x) => x.k); Object.keys(cfg.qty).forEach((k) => { if (!keys.includes(k)) delete cfg.qty[k]; }); }
    let msg;
    if (editingUid) {
      const it = cart.find((i) => i.uid === editingUid); if (it) it.cfg = clone(cfg); msg = t('updated_toast');
    } else {
      cart.push({ uid: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), id: cur.id, cfg: clone(cfg) }); msg = t('added_toast');
    }
    saveCart(); if (backToCart) offerDlg._hist = false; offerDlg.close();
    updateCartUI(true);
    if (backToCart) openCart(1); else toast(msg, true);
  }

  /* ---------- Devis (panier) ---------- */
  const cartDlg = $('#cartDialog');
  let cartStep = 1;
  function openCart(step = 1) { cartStep = step; renderCart(); if (!cartDlg.open) { cartDlg.showModal(); pushHist(cartDlg, 'cart', '#devis'); } updateBar(); }
  function itemSummary(o, c) {
    o = eff(o, c); const out = [];
    out.push(`${icon('calendar')} ${esc(fmtDate(c.date))}`);
    const v = variantOf(o, c.variant);
    const bits = [];
    if (o.formula) bits.push(L(o.formula.l));
    if (v && v.l && (o.pricing.variants.length > 1 || o.formula)) bits.push(L(v.l));
    if (o.slots) bits.push(slotLabel(o, c.slot));
    if (o.choice) bits.push(o.choice.opts[c.choice]);
    if (bits.length) out.push(esc(bits.join(' · ')));
    const r = calc(o, c);
    const ppl = o.pricing.type === 'pp'
      ? tiersOf(o, c.variant).filter((tr) => c.qty[tr.k]).map((tr) => `${c.qty[tr.k]} ${tierWord(tr.k).toLowerCase()}`).join(', ')
      : o.pricing.type === 'group' ? `${c.persons} ${t('q_people')}` : `${c.units} × ${L(o.pricing.unit).toLowerCase()}`;
    out.push(`${icon('users')} ${esc(ppl)}`);
    r.lines.filter((l) => l.addon).forEach((l) => out.push(`+ ${esc(l.label)} × ${l.n}`));
    r.lines.filter((l) => l.fee).forEach((l) => out.push(`+ ${esc(l.label)} : ${money(l.total)}`.replace(' : ', sep())));
    return out.map((x) => `<li>${x}</li>`).join('');
  }
  function ticketHTML() {
    const total = cartTotal();
    return `<div class="ticket"><div class="ticket-row"><span>${esc(t('est_total'))}</span><b>${cartFrom() ? `<small style="font-size:.9rem">${esc(t('from'))}</small> ` : ''}${money(total)}</b></div><div class="perf" aria-hidden="true"></div><p style="padding-top:12px">${esc(t('est_note'))} ${needsSupp() ? '(' + esc(t('excl_transfers')) + ')' : ''}</p></div>`;
  }
  const needsSupp = () => (cart.length && form.pickup && form.zone !== 'hurghada') || form.airport;
  function renderCart() {
    const n = cart.length;
    let body = ''; let foot = '';
    if (cartStep === 1) {
      if (!n) {
        body = `<div class="empty">${icon('clipboard-list')}<b>${esc(t('cart_empty_t'))}</b><p>${esc(t('cart_empty_d'))}</p>
          <div class="row" style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><button class="btn btn-ink" type="button" data-browse>${esc(t('browse'))}</button><button class="btn btn-ghost" type="button" data-only-transfer>${icon('plane-arrival')}${esc(t('only_transfer'))}</button></div></div>`;
      } else {
        body = cart.map((it) => {
          const o = byId[it.id]; const r = calc(o, it.cfg);
          return `<article class="cart-item"><div class="cart-thumb">${media(o)}</div>
            <div><h3>${esc(L(o.title))}</h3><ul>${itemSummary(o, it.cfg)}</ul></div>
            <div class="cart-item-foot"><button type="button" data-edit="${it.uid}">${icon('edit')}${esc(t('edit'))}</button><button type="button" class="rm" data-rm="${it.uid}">${icon('trash')}${esc(t('remove'))}</button><b>${r.from ? esc(t('from')) + ' ' : ''}${money(r.total)}</b></div></article>`;
        }).join('') + ticketHTML();
        foot = `<button class="btn btn-sun btn-block" type="button" data-goto="2">${esc(t('continue'))}${icon('arrow-right')}</button>`;
      }
    } else {
      body = formHTML();
      foot = `<p class="form-errors" id="formErr" hidden></p>
        <a class="btn btn-wa btn-block" id="sendWa" href="#" target="_blank" rel="noopener">${icon('brand-whatsapp')}${esc(t('send_wa'))}</a>
        <p class="wa-hint">${esc(t('wa_hint'))}</p>
        <div class="row"><button class="btn btn-ghost btn-sm" type="button" data-goto="1">${icon('arrow-left')}${esc(t('back'))}</button><button class="btn btn-ghost btn-sm" type="button" id="copyQuote">${icon('copy')}${esc(t('copy_quote'))}</button></div>`;
    }
    cartDlg.innerHTML = `
      <div class="cart-head"><h2 id="cartTitle">${esc(t('cart'))}</h2><button class="sheet-close" type="button" data-close aria-label="${esc(t('close'))}">${icon('x')}</button></div>
      <div class="stepbar"><button type="button" data-goto="1" ${cartStep === 1 ? 'aria-current="step"' : ''}>1 · ${esc(t('step_quote'))}${n ? ` (${n})` : ''}</button><button type="button" data-goto="2" ${cartStep === 2 ? 'aria-current="step"' : ''}>2 · ${esc(t('step_details'))}</button></div>
      <div class="sheet-scroll"><div class="cart-body">${body}</div></div>
      ${foot ? `<div class="cart-foot">${foot}</div>` : ''}`;
    if (cartStep === 2) { syncFormVisibility(); refreshSend(); }
  }
  function formHTML() {
    const zones = ZONES.map((z) => `<option value="${z.id}" ${form.zone === z.id ? 'selected' : ''}>${esc(L(z.l))}</option>`).join('');
    const at = (v, k) => `<label><input type="radio" name="fAType" value="${v}" ${form.atype === v ? 'checked' : ''}><span>${esc(t(k))}</span></label>`;
    return `<form class="form-grid" id="quoteForm" novalidate>
      <div class="field"><label for="fName">${esc(t('f_name'))}</label><input type="text" id="fName" autocomplete="name" value="${esc(form.name)}" required></div>
      <div class="two">
        <div class="field"><label for="fHotel">${esc(t('f_hotel'))}</label><input type="text" id="fHotel" placeholder="${esc(t('f_hotel_ph'))}" value="${esc(form.hotel)}"></div>
        <div class="field"><label for="fZone">${esc(t('f_zone'))}</label><select id="fZone">${zones}</select></div>
      </div>
      <div class="field"><span class="label">${esc(t('f_stay'))} <span class="hint">(${esc(t('optional'))})</span></span>
        <div class="two"><div class="field"><label class="hint" for="fArr">${esc(t('f_arrival'))}</label><input type="date" id="fArr" value="${esc(form.arr)}"></div>
        <div class="field"><label class="hint" for="fDep">${esc(t('f_departure'))}</label><input type="date" id="fDep" value="${esc(form.dep)}"></div></div></div>
      <div class="field"><span class="label">${esc(t('f_transport'))}</span>
        <label class="check" id="pickupRow"><input type="checkbox" id="fPickup" ${form.pickup ? 'checked' : ''}><span><b>${esc(t('f_pickup'))}</b><small>${esc(t('f_pickup_note'))}</small></span></label>
        <label class="check"><input type="checkbox" id="fAirport" ${form.airport ? 'checked' : ''}><span><b>${esc(t('f_airport'))}</b><small>${esc(t('f_airport_note'))}</small></span></label>
        <div class="sub-fields" id="airportFields">
          <div class="field"><span class="label">${esc(t('f_trip'))}</span><div class="seg">${at('arrival', 'at_arrival')}${at('departure', 'at_departure')}${at('both', 'at_both')}</div></div>
          <div class="two" id="aInRow"><div class="field"><label for="fAIn">${esc(t('f_airport_in_date'))}</label><input type="date" id="fAIn" value="${esc(form.aIn)}"></div>
            <div class="field"><label for="fFIn">${esc(t('f_flight_in'))}</label><input type="text" id="fFIn" value="${esc(form.fIn)}" placeholder="EX: TO 3102"></div></div>
          <div class="two" id="aOutRow"><div class="field"><label for="fAOut">${esc(t('f_airport_out_date'))}</label><input type="date" id="fAOut" value="${esc(form.aOut)}"></div>
            <div class="field"><label for="fFOut">${esc(t('f_flight_out'))}</label><input type="text" id="fFOut" value="${esc(form.fOut)}"></div></div>
          <div class="pax"><div class="pax-row"><span><b>${esc(t('f_pax'))}</b><small>${esc(t('tr_car'))} ≤ 3 · ${esc(t('tr_van'))} ≤ 11</small></span>${stepper('fpax', form.pax, 1, 11)}</div></div>
        </div>
      </div>
      <div class="field"><label for="fMsg">${esc(t('f_message'))}</label><textarea id="fMsg" placeholder="${esc(t('f_message_ph'))}">${esc(form.msg)}</textarea></div>
      ${cart.length ? ticketHTML() : ''}
      <details class="preview"><summary>WhatsApp · ${esc(t('q_head'))}</summary><pre id="quotePreview"></pre></details>
    </form>`;
  }
  function syncFormVisibility() {
    const af = $('#airportFields', cartDlg); if (!af) return;
    af.hidden = !form.airport;
    $('#aInRow', cartDlg).hidden = form.atype === 'departure';
    $('#aOutRow', cartDlg).hidden = form.atype === 'arrival';
    $('#pickupRow', cartDlg).hidden = !cart.length;
  }
  function validate() {
    const errs = [];
    if (!form.name.trim()) errs.push(['fName', t('err_name')]);
    if (!cart.length && !form.airport) errs.push([null, t('err_empty')]);
    if (form.airport) {
      if (form.atype !== 'departure' && !form.aIn) errs.push(['fAIn', t('err_airport_date')]);
      if (form.atype !== 'arrival' && !form.aOut) errs.push(['fAOut', t('err_airport_date')]);
    }
    return errs;
  }
  function refreshSend() {
    const a = $('#sendWa', cartDlg); if (!a) return;
    const msg = buildMessage();
    a.href = waURL(msg);
    const pv = $('#quotePreview', cartDlg); if (pv) pv.textContent = msg;
  }
  cartDlg.addEventListener('click', (e) => {
    if (e.target === cartDlg || e.target.closest('[data-close]')) { cartDlg.close(); return; }
    const g = e.target.closest('[data-goto]'); if (g) { cartStep = Number(g.dataset.goto); renderCart(); $('.sheet-scroll', cartDlg).scrollTop = 0; return; }
    if (e.target.closest('[data-browse]')) { cartDlg.close(); document.getElementById('activites').scrollIntoView(); return; }
    if (e.target.closest('[data-only-transfer]')) { form.airport = true; saveForm(); cartStep = 2; renderCart(); return; }
    const ed = e.target.closest('[data-edit]');
    if (ed) { const it = cart.find((i) => i.uid === ed.dataset.edit); if (it) { cartDlg._hist = false; cartDlg.close(); openOffer(it.id, { uid: it.uid, backToCart: true }); } return; }
    const rm = e.target.closest('[data-rm]');
    if (rm) { cart = cart.filter((i) => i.uid !== rm.dataset.rm); saveCart(); updateCartUI(); renderCart(); return; }
    const sb = e.target.closest('.stepper button');
    if (sb && !sb.disabled) {
      form.pax = Math.min(11, Math.max(1, form.pax + Number(sb.dataset.d))); saveForm();
      const st = sb.closest('.stepper'); st.querySelector('output').textContent = form.pax;
      st.querySelector('[data-d="-1"]').disabled = form.pax <= 1; st.querySelector('[data-d="1"]').disabled = form.pax >= 11;
      refreshSend(); return;
    }
    if (e.target.closest('#sendWa')) {
      const errs = validate(); const box = $('#formErr', cartDlg);
      $$('.invalid', cartDlg).forEach((x) => x.classList.remove('invalid'));
      if (errs.length) {
        e.preventDefault();
        box.hidden = false; box.textContent = errs.map((x) => x[1]).join(' ');
        errs.forEach(([id]) => id && $('#' + id, cartDlg)?.classList.add('invalid'));
        const first = errs.find((x) => x[0]); if (first) $('#' + first[0], cartDlg).focus();
      } else { box.hidden = true; refreshSend(); }
      return;
    }
    if (e.target.closest('#copyQuote')) {
      const text = buildMessage(); const btn = e.target.closest('#copyQuote');
      const done = () => toast(t('copied'));
      const fail = () => { const d = $('details.preview', cartDlg); if (d) { d.open = true; const r = document.createRange(); r.selectNodeContents($('#quotePreview', cartDlg)); const s = getSelection(); s.removeAllRanges(); s.addRange(r); } toast(t('copy_failed')); };
      try { navigator.clipboard.writeText(text).then(done, fail); } catch (err) { fail(); }
      btn.blur();
    }
  });
  const FORM_MAP = { fName: 'name', fHotel: 'hotel', fZone: 'zone', fArr: 'arr', fDep: 'dep', fAIn: 'aIn', fFIn: 'fIn', fAOut: 'aOut', fFOut: 'fOut', fMsg: 'msg' };
  function onFormEdit(e) {
    const el = e.target;
    if (FORM_MAP[el.id]) { form[FORM_MAP[el.id]] = el.value; el.classList.remove('invalid'); }
    else if (el.id === 'fPickup') form.pickup = el.checked;
    else if (el.id === 'fAirport') form.airport = el.checked;
    else if (el.name === 'fAType') form.atype = el.value;
    else return;
    saveForm(); syncFormVisibility(); refreshSend();
    if (el.id === 'fZone' || el.id === 'fPickup' || el.id === 'fAirport') { const tk = $('.ticket p', cartDlg); if (tk) tk.textContent = `${t('est_note')} ${needsSupp() ? '(' + t('excl_transfers') + ')' : ''}`; }
  }
  cartDlg.addEventListener('input', onFormEdit);
  cartDlg.addEventListener('change', onFormEdit);
  cartDlg.addEventListener('submit', (e) => e.preventDefault());
  cartDlg.addEventListener('close', () => { popHist(cartDlg); updateBar(); });

  /* ---------- Message WhatsApp ---------- */
  function buildMessage() {
    const S = sep(); const out = [];
    const zone = ZONES.find((z) => z.id === form.zone) || ZONES[0];
    out.push(`🧾 *${t('q_head')} – Hurghada International Tours*`);
    out.push(t('q_greeting'));
    out.push('');
    if (form.name.trim()) out.push(`👤 ${t('q_name')}${S}${form.name.trim()}`);
    out.push(`🏨 ${t('q_hotel')}${S}${form.hotel.trim() || '—'} (${L(zone.l)})`);
    if (form.arr || form.dep) out.push(`📅 ${t('q_stay')}${S}${fmtDate(form.arr, false)} → ${fmtDate(form.dep, false)}`);
    cart.forEach((it, idx) => {
      const c = it.cfg; const o = eff(byId[it.id], c); const r = calc(o, c);
      out.push('');
      out.push(`*${idx + 1}. ${L(o.title)}*`);
      const v = variantOf(o, c.variant);
      if (o.formula) out.push(`▫️ ${t('vk_formula')}${S}${L(o.formula.l)}`);
      if (v && v.l && (o.pricing.variants.length > 1 || o.formula)) out.push(`▫️ ${t(o.pricing.vk || 'vk_formula')}${S}${L(v.l)}`);
      if (o.slots) out.push(`▫️ ${t(o.slotKey || 'vk_slot')}${S}${slotLabel(o, c.slot)}`);
      if (o.choice) out.push(`▫️ ${t(o.choice.k)}${S}${o.choice.opts[c.choice]}`);
      out.push(`📅 ${t('q_date')}${S}${fmtDate(c.date)}${r.season ? ` (${t('q_high')})` : ''}`);
      r.lines.forEach((l) => {
        if (l.fee) out.push(`🚐 ${l.label}${S}+${money(l.total)}`);
        else if (l.flat) { const lab = l.label.charAt(0).toUpperCase() + l.label.slice(1); out.push(`👥 ${lab}${S}${money(l.total)} · ${c.persons} ${t('q_people')}`); }
        else out.push(`${l.addon ? '➕' : '👥'} ${l.label}${S}${l.n} × ${money(l.unit)} = ${money(l.total)}`);
      });
      out.push(`💶 ${t('q_subtotal')}${S}${r.from ? t('from') + ' ' : ''}${money(r.total)}`);
    });
    const extra = [];
    if (cart.length) {
      if (!form.pickup) extra.push(`🚐 ${t('q_pickup')}${S}${t('q_no_pickup')}`);
      else if (form.zone === 'hurghada') extra.push(`🚐 ${t('q_pickup')}${S}${t('q_pickup_incl')}`);
      else extra.push(`🚐 ${t('q_pickup')}${S}${t('q_pickup_supp', { zone: L(zone.l) })}`);
    }
    if (form.airport) {
      const lab = { arrival: 'at_arrival', departure: 'at_departure', both: 'at_both' }[form.atype];
      extra.push(`✈️ ${t('q_airport')}${S}${t(lab)}`);
      if (form.atype !== 'departure') extra.push(`   • ${t('f_arrival')}${S}${fmtDate(form.aIn)}${form.fIn.trim() ? ` · ${t('q_flight')} ${form.fIn.trim()}` : ''}`);
      if (form.atype !== 'arrival') extra.push(`   • ${t('f_departure')}${S}${fmtDate(form.aOut)}${form.fOut.trim() ? ` · ${t('q_flight')} ${form.fOut.trim()}` : ''}`);
      extra.push(`   • ${form.pax} ${t('q_people')} · ${L(zone.l)} · ${t('price_tbc')}`);
    }
    if (extra.length) { out.push(''); out.push(...extra); }
    if (form.msg.trim()) { out.push(''); out.push(`📝 ${t('q_message')}${S}${form.msg.trim()}`); }
    if (cart.length) {
      out.push('');
      out.push(`💰 *${t('est_total')}${S}${cartFrom() ? t('from') + ' ' : ''}${money(cartTotal())}*${needsSupp() ? ` (${t('excl_transfers')})` : ''}`);
    }
    out.push(`_${t('q_footer')}_`);
    return out.join('\n');
  }

  /* ---------- Barre devis, badge, toast ---------- */
  function updateBar() {
    const bar = $('#cartBar'); const n = cart.length;
    const show = n > 0 && !offerDlg.open && !cartDlg.open;
    bar.hidden = !show;
    document.body.style.setProperty('--bar-space', show ? '84px' : '0px');
    if (!n) return;
    bar.innerHTML = `${icon('clipboard-list')}<span><small>${esc(t('cart'))} · ${esc(t(n > 1 ? 'items_many' : 'items_one', { n }))}</small><b>${cartFrom() ? esc(t('from')) + ' ' : ''}${money(cartTotal())}</b></span><em>${esc(t('view_quote'))}</em>`;
  }
  function updateCartUI(bump) {
    const b = $('#cartCount'); b.hidden = !cart.length; b.textContent = cart.length;
    if (bump) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
    refreshCardButtons(); updateBar();
  }
  let toastTimer;
  function toast(msg, withAction) {
    const host = $('#toastHost'); clearTimeout(toastTimer);
    host.innerHTML = `<div class="toast" role="status">${icon('check')}<span>${esc(msg)}</span>${withAction ? `<button class="btn btn-sm btn-ink" type="button" data-toast-cart>${esc(t('view_quote'))}</button>` : ''}</div>`;
    toastTimer = setTimeout(() => { host.innerHTML = ''; }, 3600);
  }

  /* ---------- Sections dynamiques ---------- */
  function renderTransfers() {
    $('#trTable').innerHTML = `<caption class="sr-only">${esc(t('tr_prices'))}</caption><tbody>` +
      ZONES.filter((z) => z.airport).map((z) => `<tr><td>${esc(L(z.l))}</td><td><small>${esc(t('from'))}</small>${money(z.airport)}</td></tr>`).join('') + '</tbody>';
  }
  function renderReviews() {
    const colors = ['#0d8ea3', '#e0674d', '#13294b', '#b7791f', '#2f7d4f', '#8a3f7a'];
    $('#reviews').innerHTML = REVIEWS.map((r, i) => `<figure class="review" style="margin:0">
      <span class="stars" aria-label="5/5">${stars()}</span>
      <blockquote>« ${esc(r.text)} »</blockquote>${r.photo ? `<img class="rv-photo" src="${r.photo}" alt="" loading="lazy">` : ''}
      <footer><span class="avatar" style="background:${colors[i % colors.length]}">${esc(r.name[0])}</span><span><b>${esc(r.name)}</b><small>${esc(t(r.ago))}${lang !== 'fr' ? ' · ' + esc(t('rv_orig')) : ''}</small></span>
      <span class="g-badge" style="margin-inline-start:auto">Google</span></footer>
    </figure>`).join('');
  }
  function renderFaq() {
    $('#faq').innerHTML = [1, 2, 3, 4, 5].map((k) => `<details><summary>${esc(t('q' + k))}${icon('chevron-down')}</summary><p>${esc(t('a' + k))}</p></details>`).join('');
  }
  function renderSocials() {
    const s = CONTACT.social;
    $('#socials').innerHTML = [['instagram', 'brand-instagram', 'Instagram'], ['tiktok', 'brand-tiktok', 'TikTok'], ['snapchat', 'brand-snapchat', 'Snapchat'], ['facebook', 'brand-facebook', 'Facebook']]
      .map(([k, ic, name]) => `<a href="${s[k]}" target="_blank" rel="noopener" aria-label="${name}">${icon(ic)}</a>`).join('');
  }

  function renderAll() {
    applyStatic(); renderDests(); renderBrochures(); renderTabs(); renderCatalog(); renderTransfers(); renderReviews(); renderFaq(); renderSocials();
    updateCartUI();
    if (offerDlg.open) renderOffer();
    if (cartDlg.open) renderCart();
  }
  function setLang(l) {
    if (!LANGS.includes(l) || l === lang) return;
    lang = l; store.set('hit-lang', l); renderAll();
  }

  /* ---------- Événements globaux ---------- */
  document.addEventListener('click', (e) => {
    const lb = e.target.closest('[data-lang]');
    if (lb) { setLang(lb.dataset.lang); $('#langPop').hidden = true; $('#langBtn').setAttribute('aria-expanded', 'false'); return; }
    if (e.target.closest('#langBtn')) { const p = $('#langPop'); p.hidden = !p.hidden; $('#langBtn').setAttribute('aria-expanded', String(!p.hidden)); return; }
    if (!e.target.closest('.lang-menu')) { $('#langPop').hidden = true; $('#langBtn').setAttribute('aria-expanded', 'false'); }
    if (e.target.closest('#menuBtn')) { const m = $('#mobileNav'); m.hidden = !m.hidden; $('#menuBtn').setAttribute('aria-expanded', String(!m.hidden)); return; }
    if (e.target.closest('#mobileNav a')) { $('#mobileNav').hidden = true; $('#menuBtn').setAttribute('aria-expanded', 'false'); }
    if (e.target.closest('#cartBtn') || e.target.closest('#cartBar') || e.target.closest('[data-toast-cart]')) { $('#toastHost').innerHTML = ''; openCart(1); return; }
    const open = e.target.closest('[data-open]'); if (open) { openOffer(open.dataset.open); return; }
    const add = e.target.closest('[data-add]'); if (add) { openOffer(add.dataset.add, { toBook: true }); return; }
    const tab = e.target.closest('[data-tab]');
    if (tab) { state.cat = tab.dataset.tab; state.sub = null; renderTabs(); renderCatalog(); return; }
    const chip = e.target.closest('.chip[data-sub]');
    if (chip) { state.sub = chip.dataset.sub || null; renderTabs(); renderCatalog(); return; }
    const dest = e.target.closest('.dest');
    if (dest) {
      state.cat = dest.dataset.cat; state.sub = dest.dataset.sub || null; state.q = ''; $('#q').value = ''; $('#qClear').hidden = true;
      renderTabs(); renderCatalog(); document.getElementById('activites').scrollIntoView(); return;
    }
    if (e.target.closest('#qClear')) { state.q = ''; $('#q').value = ''; $('#qClear').hidden = true; renderCatalog(); $('#q').focus(); return; }
    if (e.target.closest('#trCta')) { form.airport = true; saveForm(); openCart(2); return; }
    if (e.target.closest('#copyPhone')) {
      const btn = e.target.closest('#copyPhone');
      const ok = () => { btn.textContent = t('copied_short'); setTimeout(() => { btn.textContent = t('copy'); }, 1600); };
      const ko = () => { const r = document.createRange(); r.selectNodeContents($('#phoneText')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
      try { navigator.clipboard.writeText(CONTACT.phoneDisplay).then(ok, ko); } catch (err) { ko(); }
    }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('#langPop').hidden) { $('#langPop').hidden = true; $('#langBtn').focus(); } });
  let qTimer;
  $('#q').addEventListener('input', (e) => {
    clearTimeout(qTimer); $('#qClear').hidden = !e.target.value;
    qTimer = setTimeout(() => { state.q = e.target.value.trim(); renderCatalog(); }, 140);
  });

  /* ---------- Démarrage ---------- */
  hydrateIcons();
  $('#heroScene').innerHTML = heroSVG();
  $('#year').textContent = new Date().getFullYear();
  renderAll();
  const h = (location.hash || '').slice(1);
  if (h.startsWith('o-') && MOVED[h.slice(2)]) openOffer(MOVED[h.slice(2)][0], { formula: MOVED[h.slice(2)][1] });
  else if (h.startsWith('o-') && byId[h.slice(2)]) openOffer(h.slice(2));
})();
