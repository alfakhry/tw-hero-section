import { LitElement as y, css as w, html as i } from "lit";
function m() {
  var t, r, s, c, a, d, l, h, p;
  const o = window, e = ((s = (r = (t = o.salla) == null ? void 0 : t.lang) == null ? void 0 : r.getLocale) == null ? void 0 : s.call(r)) || ((d = (a = (c = o.Salla) == null ? void 0 : c.lang) == null ? void 0 : a.getLocale) == null ? void 0 : d.call(a)) || ((p = (h = (l = o.salla) == null ? void 0 : l.config) == null ? void 0 : h.get) == null ? void 0 : p.call(h, "user.language_code"));
  return String(e || document.documentElement.lang || "ar").slice(0, 2).toLowerCase();
}
function k() {
  var e;
  const o = (document.documentElement.getAttribute("dir") || ((e = document.body) == null ? void 0 : e.getAttribute("dir")) || "").toLowerCase();
  return o === "rtl" || o === "ltr" ? o : ["ar", "he", "fa", "ur"].includes(m()) ? "rtl" : "ltr";
}
const x = "https://cdn.salla.network/fonts/sallaicons.css?v=2.0.5";
function b() {
  if (Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(
    (t) => t.href.includes("sallaicons")
  )) return;
  const e = document.createElement("link");
  e.rel = "stylesheet", e.href = x, document.head.appendChild(e);
}
const v = {
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
function n(o) {
  return m() === "ar" ? o : v[o] ?? o;
}
const C = "https://cdn.salla.network/fonts/sallaicons.css?v=2.0.5", f = {
  شحن: () => i`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/></svg>`,
  توصيل: () => f.شحن(),
  استرجاع: () => i`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 1 1 2.3 5.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M4 18v-4h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  ضمان: () => i`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  امان: () => i`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.6"/></svg>`,
  دفع: () => f.امان(),
  دعم: () => i`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13v-1a7 7 0 0 1 14 0v1" stroke="currentColor" stroke-width="1.6"/><rect x="3.5" y="13" width="3.5" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/><rect x="17" y="13" width="3.5" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/></svg>`,
  تقييم: () => i`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l2.6 5.6 6 .6-4.5 4 1.3 6-5.4-3.2L6.6 19l1.3-6-4.5-4 6-.6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`
}, A = () => [
  {
    is_icon: !0,
    icon: "sicon-shipping-fast",
    icon_color: "#059669",
    image: "",
    title: n("شحن سريع"),
    text: n("توصيل خلال يومين لجميع مدن المملكة، مع إمكانية تتبّع الطلب.")
  },
  {
    is_icon: !0,
    icon: "sicon-shield-check",
    icon_color: "#1d4ed8",
    image: "",
    title: n("دفع آمن"),
    text: n("تابي ومدى و STC Pay وبطاقات بنكية، لإتمام الطلب براحة.")
  },
  {
    is_icon: !0,
    icon: "sicon-headset",
    icon_color: "#7c3aed",
    image: "",
    title: n("دعم متواصل"),
    text: n("فريق جاهز للرد على استفساراتك قبل الشراء وبعده.")
  },
  {
    is_icon: !0,
    icon: "sicon-refund",
    icon_color: "#d97706",
    image: "",
    title: n("استرجاع سهل"),
    text: n("إرجاع مجاني خلال 14 يوم إذا لم يُفتح المنتج.")
  }
], g = class g extends y {
  connectedCallback() {
    super.connectedCallback(), b();
  }
  get c() {
    const e = this.config || {}, t = Array.isArray(e.features) ? e.features : A();
    return {
      bg_color: this.safeColor(e.bg_color, "#f4f4f5"),
      // "heading" replaced "title", which clashed with the features[].title field in the editor.
      title: (e.heading ?? e.title) == null ? n("مميزات المتجر") : this.asText(e.heading ?? e.title),
      subtitle: e.subtitle == null ? n("نلتزم بخدمة واضحة من لحظة الطلب حتى الاستلام.") : this.asText(e.subtitle),
      features: t.map((r) => this.normalize(r)).filter((r) => r.title)
    };
  }
  updated() {
    const e = this.shadowRoot;
    if (!e || e.querySelector('link[data-salla-icons="true"]')) return;
    const t = document.createElement("link");
    t.rel = "stylesheet", t.href = C, t.dataset.sallaIcons = "true", e.prepend(t);
  }
  asText(e) {
    if (!e) return "";
    if (typeof e == "string") return e;
    if (typeof e == "object") {
      const t = m(), r = e;
      return r[t] || r.ar || r.en || "";
    }
    return String(e);
  }
  safeColor(e, t) {
    const r = this.asText(e).trim();
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(r) ? r : t;
  }
  isOn(e, t) {
    return e == null || e === "" ? t : !(e === !1 || e === 0 || e === "0" || e === "false");
  }
  field(e, t) {
    if (e[t] != null && e[t] !== "") return e[t];
    const r = e[`features.${t}`];
    return r != null && r !== "" ? r : e[t];
  }
  normalize(e) {
    const t = this.asText(this.field(e, "icon")).trim() || "sicon-star2";
    return {
      isIcon: this.isOn(this.field(e, "is_icon"), !0),
      image: this.asText(this.field(e, "image")).trim(),
      icon: t,
      iconColor: this.safeColor(this.field(e, "icon_color"), "#059669"),
      title: this.asText(this.field(e, "title")).trim(),
      text: this.asText(this.field(e, "text") ?? this.field(e, "sub_title")).trim()
    };
  }
  hexToRgba(e, t) {
    let r = e.slice(1);
    r.length === 3 && (r = r.split("").map((l) => l + l).join(""));
    const s = Number.parseInt(r, 16), c = s >> 16 & 255, a = s >> 8 & 255, d = s & 255;
    return `rgba(${c},${a},${d},${t})`;
  }
  siconClass(e) {
    const t = e.match(/^(sicon-[a-z0-9-]+)$/i);
    return t ? t[1] : "";
  }
  renderMedia(e) {
    if (!e.isIcon && e.image)
      return i`<img src="${e.image}" alt="" />`;
    const t = this.siconClass(e.icon);
    if (t)
      return i`<i class="${t}" style="color:${e.iconColor}" aria-hidden="true"></i>`;
    const r = f[e.icon];
    return r ? r() : i`<span class="emoji" aria-hidden="true">${e.icon || "✓"}</span>`;
  }
  render() {
    const e = this.c;
    return e.features.length ? i`
      <section class="section" dir="${k()}" style="background:${e.bg_color}" aria-label="${e.title}">
        <div class="container">
          ${e.title || e.subtitle ? i`
                <div class="head">
                  ${e.title ? i`<h2>${e.title}</h2>` : ""}
                  ${e.subtitle ? i`<p>${e.subtitle}</p>` : ""}
                </div>
              ` : ""}
          <div class="grid">
            ${e.features.map(
      (t) => i`
                <article class="card">
                  <div
                    class="media"
                    style="${t.isIcon ? `background:${this.hexToRgba(t.iconColor, 0.12)};color:${t.iconColor}` : ""}"
                  >
                    ${this.renderMedia(t)}
                  </div>
                  <h3>${t.title}</h3>
                  ${t.text ? i`<p>${t.text}</p>` : ""}
                </article>
              `
    )}
          </div>
        </div>
      </section>
    ` : i``;
  }
};
g.properties = {
  config: { type: Object }
}, g.styles = w`
    :host {
      display: block;
      font-family: inherit;
      color: #1f2937;
    }
    * { box-sizing: border-box; }

    .section { padding: 2.75rem 1rem; }
    .container { max-width: 1140px; margin: 0 auto; }

    .head { text-align: center; max-width: 640px; margin: 0 auto 1.75rem; }
    .head h2 { margin: 0 0 0.45rem; font-size: 1.75rem; line-height: 1.35; font-weight: 700; color: #111827; }
    .head p { margin: 0; color: #6b7280; font-size: 1.05rem; line-height: 1.7; }

    .grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1rem;
    }

    .card {
      background: #fff;
      border-radius: 16px;
      padding: 1.6rem 1.15rem 1.4rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 0;
    }

    .media {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      margin-bottom: 1rem;
      overflow: hidden;
      flex: 0 0 auto;
    }
    .media i { font-size: 30px; line-height: 1; }
    .media svg { width: 30px; height: 30px; }
    .media img { width: 100%; height: 100%; object-fit: cover; }
    .emoji { font-size: 1.6rem; line-height: 1; }

    .card h3 { margin: 0 0 0.4rem; font-size: 1.05rem; font-weight: 700; color: #111827; }
    .card p { margin: 0; color: #6b7280; font-size: 0.92rem; line-height: 1.65; }

    @media (max-width: 980px) {
      .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 560px) {
      .section { padding: 2rem 1rem; }
      .head h2 { font-size: 1.4rem; }
      .grid { grid-template-columns: 1fr; }
    }
  `;
let u = g;
typeof u < "u" && u.registerSallaComponent("salla-store-features");
export {
  u as default
};
