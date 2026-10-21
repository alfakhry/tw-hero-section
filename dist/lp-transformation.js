import { css as S, LitElement as k, html as o, nothing as s } from "lit";
const C = S`
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
function h() {
  var n, i, r, l, c, u, x, d, b;
  const t = window, e = ((r = (i = (n = t.salla) == null ? void 0 : n.lang) == null ? void 0 : i.getLocale) == null ? void 0 : r.call(i)) || ((u = (c = (l = t.Salla) == null ? void 0 : l.lang) == null ? void 0 : c.getLocale) == null ? void 0 : u.call(c)) || ((b = (d = (x = t.salla) == null ? void 0 : x.config) == null ? void 0 : d.get) == null ? void 0 : b.call(d, "user.language_code"));
  return String(e || document.documentElement.lang || "ar").slice(0, 2).toLowerCase();
}
function j() {
  var e;
  const t = (document.documentElement.getAttribute("dir") || ((e = document.body) == null ? void 0 : e.getAttribute("dir")) || "").toLowerCase();
  return t === "rtl" || t === "ltr" ? t : ["ar", "he", "fa", "ur"].includes(h()) ? "rtl" : "ltr";
}
const g = {
  ar: {
    previous: "السابق",
    next: "التالي",
    play: "تشغيل الفيديو",
    rating: "التقييم {value} من 5",
    reviews: "{count} تقييم",
    securePayment: "وسائل دفع آمنة",
    step: "الخطوة {n}",
    verified: "مشتري موثّق",
    close: "إغلاق",
    image: "عرض الصورة {n}",
    ratedBy: "تقييم من قبل {count} عميل"
  },
  en: {
    previous: "Previous",
    next: "Next",
    play: "Play video",
    rating: "Rated {value} out of 5",
    reviews: "{count} reviews",
    securePayment: "Secure payment methods",
    step: "Step {n}",
    verified: "Verified buyer",
    close: "Close",
    image: "Show image {n}",
    ratedBy: "rated by {count} customers"
  }
};
function A(t, e = {}) {
  let i = (g[h()] || g.en)[t] ?? g.en[t] ?? t;
  return Object.entries(e).forEach(([r, l]) => i = i.replace(`{${r}}`, String(l))), i;
}
function a(t) {
  if (t == null) return "";
  if (typeof t == "string") return t;
  if (typeof t == "number") return String(t);
  if (typeof t == "object") {
    const e = t;
    return e[h()] || e.ar || e.en || Object.values(e).find((n) => typeof n == "string" && n) || "";
  }
  return "";
}
function y(t, e) {
  return t == null ? e : a(t).trim();
}
function w(t, e) {
  return t == null || t === "" ? e : Array.isArray(t) ? t.length > 0 : !(t === !1 || t === 0 || t === "0" || t === "false");
}
function v(t, e) {
  const n = a(t).trim();
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(n) ? n : e;
}
function E(t) {
  return Array.isArray(t) ? t.filter((e) => e && typeof e == "object") : [];
}
function f(t, e, n) {
  if (t[n] !== void 0 && t[n] !== "") return t[n];
  const i = t[`${e}.${n}`];
  return i !== void 0 ? i : t[n];
}
function $(t, e) {
  let n = t.replace("#", "");
  n.length === 3 && (n = n.split("").map((r) => r + r).join(""));
  const i = Number.parseInt(n, 16);
  return `rgba(${i >> 16 & 255},${i >> 8 & 255},${i & 255},${e})`;
}
const z = "https://cdn.salla.network/fonts/sallaicons.css?v=2.0.5";
function I() {
  if (Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(
    (n) => n.href.includes("sallaicons")
  )) return;
  const e = document.createElement("link");
  e.rel = "stylesheet", e.href = z, document.head.appendChild(e);
}
const N = [
  { icon: "sicon-shopping-bag", title: "اطلب بسهولة", text: "اختر الكمية المناسبة وأكمل الطلب خلال أقل من دقيقة." },
  { icon: "sicon-shipping-fast", title: "استلم بسرعة", text: "يصلك الطلب خلال يومين إلى باب بيتك مع إمكانية التتبّع." },
  { icon: "sicon-smile", title: "استمتع بالنتيجة", text: "لاحظ الفرق من أول استخدام، أو استرجع مبلغك بكل سهولة." }
], m = class m extends k {
  connectedCallback() {
    super.connectedCallback(), I();
  }
  get data() {
    const e = this.config || {}, n = E(e.steps), i = (n.length ? n : N).map((r) => ({
      icon: a(f(r, "steps", "icon")).trim(),
      title: a(f(r, "steps", "title")).trim(),
      text: a(f(r, "steps", "text")).trim()
    })).filter((r) => r.title || r.text);
    return {
      bg: v(e.bg_color, "#ffffff"),
      accent: v(e.accent_color, "#1a8917"),
      title: y(e.heading, "كيف يغيّر المنتج يومك؟"),
      subtitle: y(e.subheading, "ثلاث خطوات بسيطة تفصلك عن النتيجة التي تبحث عنها."),
      showNumbers: w(e.show_numbers, !0),
      showConnector: w(e.show_connector, !0),
      steps: i
    };
  }
  renderIcon(e) {
    return /^sicon-[a-z0-9-]+$/i.test(e) ? o`<i class="${e}" aria-hidden="true"></i>` : o`<span class="emoji" aria-hidden="true">${e || "✓"}</span>`;
  }
  render() {
    const e = this.data;
    if (!e.steps.length) return s;
    const n = j();
    return o`
      <link rel="stylesheet" href="${z}" />
      <section class="section" dir="${n}" style="background:${e.bg}" aria-label="${e.title || s}">
        <div class="container">
          ${e.title || e.subtitle ? o`<div class="head">
                ${e.title ? o`<h2>${e.title}</h2>` : s}
                ${e.subtitle ? o`<p>${e.subtitle}</p>` : s}
              </div>` : s}
          <ol
            class="steps ${e.showConnector ? "connected" : ""}"
            style="--cols:${Math.min(e.steps.length, 4)};--line:${$(e.accent, 0.35)}"
          >
            ${e.steps.map(
      (i, r) => o`<li class="step">
                <div class="icon" style="background:${$(e.accent, 0.1)};color:${e.accent}">${this.renderIcon(i.icon)}</div>
                <div>
                  ${e.showNumbers ? o`<div class="num" style="color:${e.accent}">${A("step", { n: r + 1 })}</div>` : s}
                  ${i.title ? o`<h3>${i.title}</h3>` : s}
                  ${i.text ? o`<p>${i.text}</p>` : s}
                </div>
              </li>`
    )}
          </ol>
        </div>
      </section>
    `;
  }
};
m.properties = { config: { type: Object } }, m.styles = [
  C,
  S`
      .steps { display: grid; grid-template-columns: repeat(var(--cols, 3), minmax(0, 1fr)); gap: 1.5rem; list-style: none; margin: 0; padding: 0; counter-reset: step; }
      .step { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 0.5rem; }
      .icon {
        position: relative; z-index: 1;
        width: 76px; height: 76px; border-radius: 50%; display: grid; place-items: center; margin-bottom: 1rem;
      }
      .icon i { font-size: 32px; line-height: 1; }
      .icon .emoji { font-size: 1.9rem; line-height: 1; }
      .num { font-size: 0.85rem; font-weight: 700; letter-spacing: 0.02em; margin-bottom: 0.35rem; }
      .step h3 { margin: 0 0 0.45rem; font-size: 1.15rem; font-weight: 700; color: var(--lp-heading); }
      .step p { margin: 0; color: var(--lp-muted); line-height: 1.7; font-size: 0.97rem; max-width: 300px; }

      /* Dashed connector between step icons (desktop only) */
      .connected .step:not(:last-child)::after {
        content: ""; position: absolute; top: 38px; inset-inline-start: calc(50% + 46px); inset-inline-end: calc(-50% + 46px);
        border-top: 2px dashed var(--line); z-index: 0;
      }

      @media (max-width: 768px) {
        .steps { grid-template-columns: 1fr; gap: 1.75rem; }
        .connected .step:not(:last-child)::after { display: none; }
        .step { flex-direction: row; align-items: flex-start; text-align: start; gap: 1rem; padding: 0; }
        .icon { width: 60px; height: 60px; flex: 0 0 auto; margin: 0; }
        .icon i { font-size: 26px; }
        .step p { max-width: none; }
      }
    `
];
let p = m;
typeof p < "u" && p.registerSallaComponent("salla-lp-transformation");
export {
  p as default
};
