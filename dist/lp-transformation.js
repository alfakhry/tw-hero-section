import { css as S, LitElement as C, html as a, nothing as o } from "lit";
function m() {
  var i, n, r, c, d, y, x, p, b;
  const t = window, e = ((r = (n = (i = t.salla) == null ? void 0 : i.lang) == null ? void 0 : n.getLocale) == null ? void 0 : r.call(n)) || ((y = (d = (c = t.Salla) == null ? void 0 : c.lang) == null ? void 0 : d.getLocale) == null ? void 0 : y.call(d)) || ((b = (p = (x = t.salla) == null ? void 0 : x.config) == null ? void 0 : p.get) == null ? void 0 : b.call(p, "user.language_code"));
  return String(e || document.documentElement.lang || "ar").slice(0, 2).toLowerCase();
}
function z() {
  var e;
  const t = (document.documentElement.getAttribute("dir") || ((e = document.body) == null ? void 0 : e.getAttribute("dir")) || "").toLowerCase();
  return t === "rtl" || t === "ltr" ? t : ["ar", "he", "fa", "ur"].includes(m()) ? "rtl" : "ltr";
}
const f = {
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
    ratedBy: "تقييم من قبل {count} عميل",
    yes: "متوفر",
    no: "غير متوفر",
    partial: "جزئياً",
    feature: "الميزة",
    quantity: "الكمية",
    startingFrom: "يبدأ من",
    secureCheckout: "دفع آمن ومضمون",
    recommendedBy: "موصى به من:",
    added: "تمت إضافة المنتج إلى السلة",
    outOfStock: "نفدت الكمية",
    choose: "اختر",
    save: "وفّر"
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
    ratedBy: "rated by {count} customers",
    yes: "Included",
    no: "Not included",
    partial: "Partly",
    feature: "Feature",
    quantity: "Quantity",
    startingFrom: "Starting from",
    secureCheckout: "Secure checkout",
    recommendedBy: "As recommended by:",
    added: "Added to cart",
    outOfStock: "Out of stock",
    choose: "Choose",
    save: "Save"
  }
};
function O(t, e = {}) {
  let n = (f[m()] || f.en)[t] ?? f.en[t] ?? t;
  return Object.entries(e).forEach(([r, c]) => n = n.replace(`{${r}}`, String(c))), n;
}
function l(t) {
  if (t == null) return "";
  if (typeof t == "string") return t;
  if (typeof t == "number") return String(t);
  if (typeof t == "object") {
    const e = t;
    return e[m()] || e.ar || e.en || Object.values(e).find((i) => typeof i == "string" && i) || "";
  }
  return "";
}
function w(t, e) {
  return t == null ? e : l(t).trim();
}
function v(t, e) {
  return t == null || t === "" ? e : Array.isArray(t) ? t.length > 0 : !(t === !1 || t === 0 || t === "0" || t === "false");
}
function k(t, e) {
  const i = l(t).trim();
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(i) ? i : e;
}
function E(t) {
  return Array.isArray(t) ? t.filter((e) => e && typeof e == "object") : [];
}
function g(t, e, i) {
  if (t[i] !== void 0 && t[i] !== "") return t[i];
  const n = t[`${e}.${i}`];
  return n !== void 0 ? n : t[i];
}
function $(t, e) {
  let i = t.replace("#", "");
  i.length === 3 && (i = i.split("").map((r) => r + r).join(""));
  const n = Number.parseInt(i, 16);
  return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${e})`;
}
const A = "https://cdn.salla.network/fonts/sallaicons.css?v=2.0.5";
function I() {
  if (Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(
    (i) => i.href.includes("sallaicons")
  )) return;
  const e = document.createElement("link");
  e.rel = "stylesheet", e.href = A, document.head.appendChild(e);
}
const j = {
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
function s(t) {
  return m() === "ar" ? t : j[t] ?? t;
}
const F = S`
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
`, P = () => [
  { icon: "sicon-shopping-bag", title: s("اطلب بسهولة"), text: s("اختر الكمية المناسبة وأكمل الطلب خلال أقل من دقيقة.") },
  { icon: "sicon-shipping-fast", title: s("استلم بسرعة"), text: s("يصلك الطلب خلال يومين إلى باب بيتك مع إمكانية التتبّع.") },
  { icon: "sicon-smile", title: s("استمتع بالنتيجة"), text: s("لاحظ الفرق من أول استخدام، أو استرجع مبلغك بكل سهولة.") }
], h = class h extends C {
  connectedCallback() {
    super.connectedCallback(), I();
  }
  get data() {
    const e = this.config || {}, i = E(e.steps), n = (e.steps !== void 0 && e.steps !== null ? i : P()).map((r) => ({
      icon: l(g(r, "steps", "icon")).trim(),
      title: l(g(r, "steps", "title")).trim(),
      text: l(g(r, "steps", "text")).trim()
    })).filter((r) => r.title || r.text);
    return {
      bg: k(e.bg_color, "#ffffff"),
      accent: k(e.accent_color, "#1a8917"),
      title: w(e.heading, s("كيف يغيّر المنتج يومك؟")),
      subtitle: w(e.subheading, s("ثلاث خطوات بسيطة تفصلك عن النتيجة التي تبحث عنها.")),
      showNumbers: v(e.show_numbers, !0),
      showConnector: v(e.show_connector, !0),
      steps: n
    };
  }
  renderIcon(e) {
    return /^sicon-[a-z0-9-]+$/i.test(e) ? a`<i class="${e}" aria-hidden="true"></i>` : a`<span class="emoji" aria-hidden="true">${e || "✓"}</span>`;
  }
  render() {
    const e = this.data;
    if (!e.steps.length) return o;
    const i = z();
    return a`
      <link rel="stylesheet" href="${A}" />
      <section class="section" dir="${i}" style="background:${e.bg}" aria-label="${e.title || o}">
        <div class="container">
          ${e.title || e.subtitle ? a`<div class="head">
                ${e.title ? a`<h2>${e.title}</h2>` : o}
                ${e.subtitle ? a`<p>${e.subtitle}</p>` : o}
              </div>` : o}
          <ol
            class="steps ${e.showConnector ? "connected" : ""}"
            style="--cols:${Math.min(e.steps.length, 4)};--line:${$(e.accent, 0.35)}"
          >
            ${e.steps.map(
      (n, r) => a`<li class="step">
                <div class="icon" style="background:${$(e.accent, 0.1)};color:${e.accent}">${this.renderIcon(n.icon)}</div>
                <div>
                  ${e.showNumbers ? a`<div class="num" style="color:${e.accent}">${O("step", { n: r + 1 })}</div>` : o}
                  ${n.title ? a`<h3>${n.title}</h3>` : o}
                  ${n.text ? a`<p>${n.text}</p>` : o}
                </div>
              </li>`
    )}
          </ol>
        </div>
      </section>
    `;
  }
};
h.properties = { config: { type: Object } }, h.styles = [
  F,
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
let u = h;
typeof u < "u" && u.registerSallaComponent("salla-lp-transformation");
export {
  u as default
};
