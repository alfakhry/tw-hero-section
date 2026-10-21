import { css as w, nothing as a, html as o, LitElement as v } from "lit";
const $ = w`
  :host {
    display: block;
    font-family: inherit;
    color: #1f2937;
    --lp-radius: 16px;
    --lp-muted: #6b7280;
    --lp-heading: #111827;
  }
  * { box-sizing: border-box; }
  img { max-width: 100%; display: block; }

  .section { padding: 3.5rem 1rem; }
  .container { max-width: 1140px; margin-inline: auto; }

  .head { text-align: center; max-width: 680px; margin: 0 auto 2.25rem; }
  .head h2 { margin: 0 0 0.5rem; font-size: 1.85rem; line-height: 1.35; font-weight: 700; color: var(--lp-heading); }
  .head p { margin: 0; color: var(--lp-muted); font-size: 1.05rem; line-height: 1.75; }

  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
  }

  /* Rating stars */
  .stars { display: inline-flex; gap: 2px; vertical-align: middle; }
  .stars svg { width: 18px; height: 18px; display: block; }

  /* Call to action block */
  .cta-block { display: flex; flex-direction: column; align-items: center; gap: 0.9rem; margin-top: 2.5rem; text-align: center; }
  .cta-rating { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0.45rem; font-size: 0.95rem; color: #374151; }
  .cta-rating strong { font-weight: 700; }
  .cta-btn {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: min(100%, 320px); min-height: 52px; padding: 0.85rem 2rem;
    border: 0; border-radius: 12px; cursor: pointer; text-decoration: none;
    font: inherit; font-size: 1.1rem; font-weight: 700;
    transition: filter 0.15s ease, transform 0.15s ease;
  }
  .cta-btn:hover { filter: brightness(0.94); }
  .cta-btn:active { transform: translateY(1px); }
  .cta-btn:focus-visible { outline: 3px solid currentColor; outline-offset: 3px; }
  .cta-note { margin: 0; color: var(--lp-muted); font-size: 0.9rem; }
  .pay { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0.4rem; margin: 0; padding: 0; list-style: none; }
  .pay img { height: 28px; width: auto; }

  /* Horizontal scroller with prev/next buttons */
  .scroller { position: relative; }
  .track {
    display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory;
    scroll-behavior: smooth; scrollbar-width: none; padding: 0.25rem 0.1rem 0.75rem;
    overscroll-behavior-x: contain;
  }
  .track::-webkit-scrollbar { display: none; }
  .track > * { scroll-snap-align: start; flex: 0 0 auto; }
  .nav {
    position: absolute; top: 50%; transform: translateY(-50%); z-index: 2;
    width: 40px; height: 40px; border-radius: 50%; border: 1px solid #e5e7eb;
    background: #fff; color: #111827; cursor: pointer; display: grid; place-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  .nav svg { width: 18px; height: 18px; }
  .nav.prev { inset-inline-start: -14px; }
  .nav.next { inset-inline-end: -14px; }
  .nav:focus-visible { outline: 3px solid #111827; outline-offset: 2px; }

  @media (max-width: 768px) {
    .section { padding: 2.5rem 1rem; }
    .head { margin-bottom: 1.5rem; }
    .head h2 { font-size: 1.45rem; }
    .nav { display: none; }
    .cta-btn { width: 100%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .track { scroll-behavior: auto; }
    .cta-btn { transition: none; }
  }
`;
function y() {
  var i, r, n, s, l, f, h, d, u;
  const e = window, t = ((n = (r = (i = e.salla) == null ? void 0 : i.lang) == null ? void 0 : r.getLocale) == null ? void 0 : n.call(r)) || ((f = (l = (s = e.Salla) == null ? void 0 : s.lang) == null ? void 0 : l.getLocale) == null ? void 0 : f.call(l)) || ((u = (d = (h = e.salla) == null ? void 0 : h.config) == null ? void 0 : d.get) == null ? void 0 : u.call(d, "user.language_code"));
  return String(t || document.documentElement.lang || "ar").slice(0, 2).toLowerCase();
}
function k() {
  var t;
  const e = (document.documentElement.getAttribute("dir") || ((t = document.body) == null ? void 0 : t.getAttribute("dir")) || "").toLowerCase();
  return e === "rtl" || e === "ltr" ? e : ["ar", "he", "fa", "ur"].includes(y()) ? "rtl" : "ltr";
}
function c(e) {
  if (e == null) return "";
  if (typeof e == "string") return e;
  if (typeof e == "number") return String(e);
  if (typeof e == "object") {
    const t = e;
    return t[y()] || t.ar || t.en || Object.values(t).find((i) => typeof i == "string" && i) || "";
  }
  return "";
}
function x(e, t) {
  return e == null ? t : c(e).trim();
}
function b(e, t) {
  const i = c(e).trim();
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(i) ? i : t;
}
function z(e, t) {
  const i = Array.isArray(e) ? e[0] : e;
  if (i && typeof i == "object") {
    const r = i.value ?? i.key;
    return r ? String(r) : t;
  }
  return i ? String(i) : t;
}
function S(e) {
  return Array.isArray(e) ? e.filter((t) => t && typeof t == "object") : [];
}
function p(e, t, i) {
  if (e[i] !== void 0 && e[i] !== "") return e[i];
  const r = e[`${t}.${i}`];
  return r !== void 0 ? r : e[i];
}
function j(e, t) {
  let i = e.replace("#", "");
  i.length === 3 && (i = i.split("").map((n) => n + n).join(""));
  const r = Number.parseInt(i, 16);
  return `rgba(${r >> 16 & 255},${r >> 8 & 255},${r & 255},${t})`;
}
const A = "https://cdn.salla.network/images/placeholder.png";
function E(e, t, i) {
  const r = S(e);
  return r.length ? r.map((n) => ({
    image: c(p(n, t, "image")).trim(),
    title: c(p(n, t, "title")).trim(),
    text: c(p(n, t, "text")).trim(),
    points: c(p(n, t, "points")).split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
  })).filter((n) => n.title || n.text || n.image) : i;
}
function C(e) {
  return z(e, "end") === "start" ? "start" : "end";
}
function L(e, t, i) {
  return o`<div class="rows">
    ${e.map((r, n) => {
    const s = n % 2 === 0 == (t === "start");
    return o`<article class="row ${s ? "img-start" : "img-end"}">
        <div class="row-media">
          <img src="${r.image || A}" alt="${r.title}" loading="lazy" decoding="async" />
        </div>
        <div class="row-body">
          ${r.title ? o`<h3>${r.title}</h3>` : a}
          ${r.text ? o`<p>${r.text}</p>` : a}
          ${r.points.length ? o`<ul class="checks">
                ${r.points.map(
      (l) => o`<li><span class="tick" style="color:${i};background:${j(i, 0.12)}" aria-hidden="true">✓</span>${l}</li>`
    )}
              </ul>` : a}
        </div>
      </article>`;
  })}
  </div>`;
}
const O = w`
  .rows { display: flex; flex-direction: column; gap: 2.5rem; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
  .row.img-end .row-media { order: 2; }
  .row-media img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: var(--lp-radius); background: #e5e7eb; }
  .row-body h3 { margin: 0 0 0.6rem; font-size: 1.45rem; line-height: 1.4; font-weight: 700; color: var(--lp-heading); }
  .row-body p { margin: 0; color: #4b5563; font-size: 1.02rem; line-height: 1.85; }
  .checks { list-style: none; margin: 1rem 0 0; padding: 0; display: grid; gap: 0.55rem; }
  .checks li { display: flex; gap: 0.6rem; align-items: flex-start; line-height: 1.6; color: #374151; }
  .tick {
    width: 22px; height: 22px; border-radius: 50%; flex: 0 0 auto; margin-top: 0.1rem;
    display: inline-grid; place-items: center; font-size: 0.75rem; font-weight: 700;
  }

  @media (max-width: 768px) {
    .rows { gap: 2rem; }
    .row { grid-template-columns: 1fr; gap: 1rem; }
    .row.img-end .row-media { order: 0; }
    .row-body h3 { font-size: 1.25rem; }
  }
`, R = [
  {
    image: "",
    title: "ثقة تدوم معك طوال اليوم",
    text: "تركيبة مدروسة تمنحك نتيجة واضحة تلاحظها من أول استخدام، وتبقى معك من الصباح حتى المساء.",
    points: []
  },
  {
    image: "",
    title: "مكوّنات طبيعية تناسب الجميع",
    text: "اخترنا مكوّنات لطيفة وآمنة للاستخدام اليومي، بدون إضافات تزعجك.",
    points: []
  }
], g = class g extends v {
  get data() {
    const t = this.config || {};
    return {
      bg: b(t.bg_color, "#f4f4f5"),
      accent: b(t.accent_color, "#1a8917"),
      title: x(t.heading, "لماذا يحبّه عملاؤنا؟"),
      subtitle: x(t.subheading, "فوائد حقيقية تلاحظها في حياتك اليومية."),
      first: C(t.first_image_side),
      rows: E(t.benefits, "benefits", R)
    };
  }
  render() {
    const t = this.data;
    return t.rows.length ? o`
      <section class="section" dir="${k()}" style="background:${t.bg}" aria-label="${t.title || a}">
        <div class="container">
          ${t.title || t.subtitle ? o`<div class="head">
                ${t.title ? o`<h2>${t.title}</h2>` : a}
                ${t.subtitle ? o`<p>${t.subtitle}</p>` : a}
              </div>` : a}
          ${L(t.rows, t.first, t.accent)}
        </div>
      </section>
    ` : a;
  }
};
g.properties = { config: { type: Object } }, g.styles = [$, O];
let m = g;
typeof m < "u" && m.registerSallaComponent("salla-lp-benefits");
export {
  m as default
};
