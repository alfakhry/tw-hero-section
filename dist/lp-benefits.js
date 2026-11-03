import { css as v, nothing as o, html as n, LitElement as k } from "lit";
function g() {
  var r, i, a, s, l, f, y, u, b;
  const t = window, e = ((a = (i = (r = t.salla) == null ? void 0 : r.lang) == null ? void 0 : i.getLocale) == null ? void 0 : a.call(i)) || ((f = (l = (s = t.Salla) == null ? void 0 : s.lang) == null ? void 0 : l.getLocale) == null ? void 0 : f.call(l)) || ((b = (u = (y = t.salla) == null ? void 0 : y.config) == null ? void 0 : u.get) == null ? void 0 : b.call(u, "user.language_code"));
  return String(e || document.documentElement.lang || "ar").slice(0, 2).toLowerCase();
}
function $() {
  var e;
  const t = (document.documentElement.getAttribute("dir") || ((e = document.body) == null ? void 0 : e.getAttribute("dir")) || "").toLowerCase();
  return t === "rtl" || t === "ltr" ? t : ["ar", "he", "fa", "ur"].includes(g()) ? "rtl" : "ltr";
}
function c(t) {
  if (t == null) return "";
  if (typeof t == "string") return t;
  if (typeof t == "number") return String(t);
  if (typeof t == "object") {
    const e = t;
    return e[g()] || e.ar || e.en || Object.values(e).find((r) => typeof r == "string" && r) || "";
  }
  return "";
}
function w(t, e) {
  return t == null ? e : c(t).trim();
}
function x(t, e) {
  const r = c(t).trim();
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(r) ? r : e;
}
function A(t, e) {
  const r = Array.isArray(t) ? t[0] : t;
  if (r && typeof r == "object") {
    const i = r.value ?? r.key;
    return i ? String(i) : e;
  }
  return r ? String(r) : e;
}
function S(t) {
  return Array.isArray(t) ? t.filter((e) => e && typeof e == "object") : [];
}
function p(t, e, r) {
  if (t[r] !== void 0 && t[r] !== "") return t[r];
  const i = t[`${e}.${r}`];
  return i !== void 0 ? i : t[r];
}
function z(t) {
  const e = c(t).trim();
  if (!e) return "";
  if (e.startsWith("#")) return e;
  if (e.startsWith("/")) return /^\/[\/\\]/.test(e) ? "" : e;
  try {
    const r = new URL(e);
    return r.protocol === "https:" || r.protocol === "http:" ? r.href : "";
  } catch {
    return "";
  }
}
function C(t, e) {
  let r = t.replace("#", "");
  r.length === 3 && (r = r.split("").map((a) => a + a).join(""));
  const i = Number.parseInt(r, 16);
  return `rgba(${i >> 16 & 255},${i >> 8 & 255},${i & 255},${e})`;
}
const E = "https://cdn.salla.network/images/placeholder.png", j = {
  "تصميم عملي يرافقك في كل مكان": "A practical design that goes everywhere with you",
  "حجم مناسب للحقيبة وعبوة محكمة تحافظ على جودة المنتج.": "Bag-friendly size and a sealed pack that keeps the product fresh.",
  "سهل الحمل والاستخدام": "Easy to carry and use",
  "جودة مختبرة قبل أن تصلك": "Quality tested before it reaches you",
  "كل دفعة تمر بفحص جودة دقيق لتحصل على نفس التجربة في كل مرة.": "Every batch is quality checked so you get the same experience every time.",
  "مصنوع وفق أعلى المعايير": "Made to the highest standards",
  "عبوة المنتج الأساسية\nعيّنة إضافية مجانية\nدليل الاستخدام\nتغليف هدية أنيق": `Main product pack
Free extra sample
User guide
Elegant gift wrapping`,
  "مزايا تصنع الفرق": "Features that make the difference",
  "صُمّم بعناية ليمنحك أفضل تجربة ممكنة.": "Carefully designed to give you the best possible experience.",
  "ماذا يوجد داخل العلبة؟": "What's in the box?",
  "كل ما تحتاجه لتبدأ مباشرة بعد الاستلام.": "Everything you need to start right after delivery.",
  "اطلب الآن": "Order now",
  "عطر فاخر يدوم طويلاً — رائحة تبقى معك طوال اليوم": "A luxury fragrance that lasts — a scent that stays with you all day",
  "الكمية محدودة": "Limited stock",
  "اختر العرض المناسب": "Choose your offer",
  "اشترِ الآن": "Buy now",
  "سارة القحطاني": "Sara A.",
  "من أفضل المنتجات اللي جربتها، النتيجة واضحة والتغليف فخم.": "One of the best products I have tried — clear results and luxurious packaging.",
  "عبدالله الشمري": "Abdullah S.",
  "وصلني الطلب بسرعة والجودة أعلى من توقعاتي. أكيد بكرر الطلب.": "Fast delivery and better quality than I expected. I'll definitely order again.",
  "نورة العتيبي": "Noura O.",
  "تجربة ممتازة وخدمة العملاء متعاونين جداً.": "Great experience and very helpful customer service.",
  "فهد الدوسري": "Fahad D.",
  "يستاهل كل ريال، أنصح فيه أهلي وأصحابي.": "Worth every riyal — I recommend it to family and friends.",
  "آراء عملائنا": "What our customers say",
  "أكثر من 5000 عميل جرّبوا المنتج، وهذه بعض تجاربهم.": "More than 5,000 customers tried it. Here are some of their stories.",
  "انضم لعملائنا السعداء": "Join our happy customers",
  "شحن سريع": "Fast shipping",
  "توصيل خلال يومين لجميع مدن المملكة، مع إمكانية تتبّع الطلب.": "Delivery within two days across Saudi Arabia, with order tracking.",
  "دفع آمن": "Secure payment",
  "تابي ومدى و STC Pay وبطاقات بنكية، لإتمام الطلب براحة.": "Tabby, mada, STC Pay and cards for an easy checkout.",
  "دعم متواصل": "Always-on support",
  "فريق جاهز للرد على استفساراتك قبل الشراء وبعده.": "A team ready to answer your questions before and after you buy.",
  "استرجاع سهل": "Easy returns",
  "إرجاع مجاني خلال 14 يوم إذا لم يُفتح المنتج.": "Free returns within 14 days if the product is unopened.",
  "مميزات المتجر": "Why shop with us",
  "نلتزم بخدمة واضحة من لحظة الطلب حتى الاستلام.": "Clear, reliable service from order to delivery.",
  "اطلب بسهولة": "Order easily",
  "اختر الكمية المناسبة وأكمل الطلب خلال أقل من دقيقة.": "Pick your quantity and check out in under a minute.",
  "استلم بسرعة": "Get it fast",
  "يصلك الطلب خلال يومين إلى باب بيتك مع إمكانية التتبّع.": "Your order reaches your door within two days, with tracking.",
  "استمتع بالنتيجة": "Enjoy the results",
  "لاحظ الفرق من أول استخدام، أو استرجع مبلغك بكل سهولة.": "See the difference from the first use, or get your money back easily.",
  "كيف يغيّر المنتج يومك؟": "How it changes your day",
  "ثلاث خطوات بسيطة تفصلك عن النتيجة التي تبحث عنها.": "Three simple steps to the result you want.",
  "كم تستغرق مدة الشحن؟": "How long does shipping take?",
  "من يوم إلى ثلاثة أيام عمل داخل المملكة، ويصلك رابط لتتبّع الطلب.": "One to three business days within Saudi Arabia, with a tracking link.",
  "هل يمكنني إرجاع المنتج؟": "Can I return the product?",
  "نعم، يمكنك الإرجاع خلال 14 يوماً من الاستلام إذا كان المنتج بحالته الأصلية.": "Yes, you can return it within 14 days of delivery if it is in its original condition.",
  "ما طرق الدفع المتاحة؟": "Which payment methods are available?",
  "مدى، Apple Pay، البطاقات البنكية، والتقسيط عبر تابي وتمارا.": "mada, Apple Pay, cards, and instalments with Tabby and Tamara.",
  "هل المنتج أصلي؟": "Is the product original?",
  "جميع منتجاتنا أصلية 100% ومضمونة من المصدر.": "All our products are 100% original and guaranteed from the source.",
  "كيف أتواصل معكم؟": "How can I reach you?",
  "عبر واتساب أو الدردشة في المتجر، وفريقنا يرد خلال دقائق.": "Via WhatsApp or store chat — our team replies within minutes.",
  "الأسئلة الشائعة": "Frequently asked questions",
  "جمعنا لك إجابات أكثر الأسئلة التي تصلنا. لم تجد إجابتك؟ تواصل معنا في أي وقت.": "Answers to the questions we hear most. Can't find yours? Reach us anytime.",
  "ثقة تدوم معك طوال اليوم": "Confidence that lasts all day",
  "تركيبة مدروسة تمنحك نتيجة واضحة تلاحظها من أول استخدام، وتبقى معك من الصباح حتى المساء.": "A carefully designed formula with results you notice from the first use, lasting from morning to evening.",
  "مكوّنات طبيعية تناسب الجميع": "Natural ingredients for everyone",
  "اخترنا مكوّنات لطيفة وآمنة للاستخدام اليومي، بدون إضافات تزعجك.": "Gentle ingredients that are safe for daily use, with nothing you don't need.",
  "لماذا يحبّه عملاؤنا؟": "Why customers love it",
  "فوائد حقيقية تلاحظها في حياتك اليومية.": "Real benefits you notice in daily life.",
  "مكوّنات طبيعية بالكامل": "All-natural ingredients",
  "ثبات يدوم أكثر من 10 ساعات": "Lasts more than 10 hours",
  "ضمان استرجاع المبلغ": "Money-back guarantee",
  "شحن مجاني وسريع": "Fast, free shipping",
  "خدمة عملاء على مدار الساعة": "24/7 customer service",
  "لماذا نحن الخيار الأفضل؟": "Why we are the better choice",
  "قارن بنفسك بين منتجنا والبدائل المنتشرة في السوق.": "Compare our product with the usual alternatives.",
  منتجنا: "Our product",
  "منتج آخر": "Another product",
  "البدائل التقليدية": "Traditional alternatives",
  "جاهز تبدأ تجربتك اليوم؟": "Ready to start today?",
  "انضم لآلاف العملاء الراضين، والكمية المتوفرة بهذا السعر محدودة.": "Join thousands of happy customers — stock at this price is limited.",
  "عبوة مقاومة للتسريب": "Leak-proof pack",
  "فحص جودة لكل دفعة": "Quality check on every batch"
};
function d(t) {
  return g() === "ar" ? t : j[t] ?? t;
}
const O = v`
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
function W(t, e, r) {
  return t == null ? r : S(t).map((a) => ({
    image: z(p(a, e, "image")),
    title: c(p(a, e, "title")).trim(),
    text: c(p(a, e, "text")).trim(),
    points: c(p(a, e, "points")).split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
  })).filter((a) => a.title || a.text || a.image);
}
function I(t) {
  return A(t, "end") === "start" ? "start" : "end";
}
function T(t, e, r) {
  return n`<div class="rows">
    ${t.map((i, a) => {
    const s = a % 2 === 0 == (e === "start");
    return n`<article class="row ${s ? "img-start" : "img-end"}">
        <div class="row-media">
          <img src="${i.image || E}" alt="${i.title}" loading="lazy" decoding="async" />
        </div>
        <div class="row-body">
          ${i.title ? n`<h3>${i.title}</h3>` : o}
          ${i.text ? n`<p>${i.text}</p>` : o}
          ${i.points.length ? n`<ul class="checks">
                ${i.points.map(
      (l) => n`<li><span class="tick" style="color:${r};background:${C(r, 0.12)}" aria-hidden="true">✓</span>${l}</li>`
    )}
              </ul>` : o}
        </div>
      </article>`;
  })}
  </div>`;
}
const F = v`
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
`, L = () => [
  {
    image: "",
    title: d("ثقة تدوم معك طوال اليوم"),
    text: d("تركيبة مدروسة تمنحك نتيجة واضحة تلاحظها من أول استخدام، وتبقى معك من الصباح حتى المساء."),
    points: []
  },
  {
    image: "",
    title: d("مكوّنات طبيعية تناسب الجميع"),
    text: d("اخترنا مكوّنات لطيفة وآمنة للاستخدام اليومي، بدون إضافات تزعجك."),
    points: []
  }
], m = class m extends k {
  get data() {
    const e = this.config || {};
    return {
      bg: x(e.bg_color, "#f4f4f5"),
      accent: x(e.accent_color, "#1a8917"),
      title: w(e.heading, d("لماذا يحبّه عملاؤنا؟")),
      subtitle: w(e.subheading, d("فوائد حقيقية تلاحظها في حياتك اليومية.")),
      first: I(e.first_image_side),
      rows: W(e.benefits, "benefits", L())
    };
  }
  render() {
    const e = this.data;
    return e.rows.length ? n`
      <section class="section" dir="${$()}" style="background:${e.bg}" aria-label="${e.title || o}">
        <div class="container">
          ${e.title || e.subtitle ? n`<div class="head">
                ${e.title ? n`<h2>${e.title}</h2>` : o}
                ${e.subtitle ? n`<p>${e.subtitle}</p>` : o}
              </div>` : o}
          ${T(e.rows, e.first, e.accent)}
        </div>
      </section>
    ` : o;
  }
};
m.properties = { config: { type: Object } }, m.styles = [O, F];
let h = m;
typeof h < "u" && h.registerSallaComponent("salla-lp-benefits");
export {
  h as default
};
