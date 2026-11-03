import { html as i, LitElement as O, render as W, nothing as c, css as R } from "lit";
function V() {
  var e, a, o, n, s, l, p, d, h;
  const r = window, t = ((o = (a = (e = r.salla) == null ? void 0 : e.lang) == null ? void 0 : a.getLocale) == null ? void 0 : o.call(a)) || ((l = (s = (n = r.Salla) == null ? void 0 : n.lang) == null ? void 0 : s.getLocale) == null ? void 0 : l.call(s)) || ((h = (d = (p = r.salla) == null ? void 0 : p.config) == null ? void 0 : d.get) == null ? void 0 : h.call(d, "user.language_code"));
  return String(t || document.documentElement.lang || "ar").slice(0, 2).toLowerCase();
}
function M() {
  var t;
  const r = (document.documentElement.getAttribute("dir") || ((t = document.body) == null ? void 0 : t.getAttribute("dir")) || "").toLowerCase();
  return r === "rtl" || r === "ltr" ? r : ["ar", "he", "fa", "ur"].includes(V()) ? "rtl" : "ltr";
}
const E = {
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
function f(r, t = {}) {
  let a = (E[V()] || E.en)[r] ?? E.en[r] ?? r;
  return Object.entries(t).forEach(([o, n]) => a = a.replace(`{${o}}`, String(n))), a;
}
function g(r) {
  if (r == null) return "";
  if (typeof r == "string") return r;
  if (typeof r == "number") return String(r);
  if (typeof r == "object") {
    const t = r;
    return t[V()] || t.ar || t.en || Object.values(t).find((e) => typeof e == "string" && e) || "";
  }
  return "";
}
function m(r, t) {
  return r == null || r === "" ? t : Array.isArray(r) ? r.length > 0 : !(r === !1 || r === 0 || r === "0" || r === "false");
}
function x(r, t) {
  const e = g(r).trim();
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(e) ? e : t;
}
function T(r, t, e = -1 / 0, a = 1 / 0) {
  const o = Number.parseFloat(g(r));
  return Number.isFinite(o) ? Math.min(a, Math.max(e, o)) : t;
}
function k(r, t) {
  const e = Array.isArray(r) ? r[0] : r;
  if (e && typeof e == "object") {
    const a = e.value ?? e.key;
    return a ? String(a) : t;
  }
  return e ? String(e) : t;
}
function Z(r) {
  return Array.isArray(r) ? r.filter((t) => t && typeof t == "object") : [];
}
function C(r, t, e) {
  if (r[e] !== void 0 && r[e] !== "") return r[e];
  const a = r[`${t}.${e}`];
  return a !== void 0 ? a : r[e];
}
function v(r) {
  const t = g(r).trim();
  if (!t) return "";
  if (t.startsWith("#")) return t;
  if (t.startsWith("/")) return /^\/[\/\\]/.test(t) ? "" : t;
  try {
    const e = new URL(t);
    return e.protocol === "https:" || e.protocol === "http:" ? e.href : "";
  } catch {
    return "";
  }
}
function I(r, t) {
  let e = r.replace("#", "");
  e.length === 3 && (e = e.split("").map((o) => o + o).join(""));
  const a = Number.parseInt(e, 16);
  return `rgba(${a >> 16 & 255},${a >> 8 & 255},${a & 255},${t})`;
}
function P(r) {
  let t = r.replace("#", "");
  t.length === 3 && (t = t.split("").map((l) => l + l).join(""));
  const e = Number.parseInt(t, 16), [a, o, n] = [e >> 16 & 255, e >> 8 & 255, e & 255].map((l) => {
    const p = l / 255;
    return p <= 0.03928 ? p / 12.92 : ((p + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * a + 0.7152 * o + 0.0722 * n > 0.45 ? "#111827" : "#ffffff";
}
const N = "https://cdn.salla.network/fonts/sallaicons.css?v=2.0.5";
function Y() {
  if (Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(
    (e) => e.href.includes("sallaicons")
  )) return;
  const t = document.createElement("link");
  t.rel = "stylesheet", t.href = N, document.head.appendChild(t);
}
const G = "https://cdn.salla.network/images/placeholder.png", F = {
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
function L(r) {
  return V() === "ar" ? r : F[r] ?? r;
}
const _ = {
  tabby: "data:image/svg+xml,%3Csvg width=%2270%22 height=%2248%22 viewBox=%220 0 70 48%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Crect x=%220.5%22 y=%220.5%22 width=%2269%22 height=%2247%22 rx=%225.5%22 fill=%22white%22 stroke=%22%23D9D9D9%22/%3E%3Cpath d=%22M54.2996 35H15.7004C11.9815 35 9 32.0493 9 28.4395V20.5605C9 16.9193 12.0136 14 15.7004 14H54.2996C58.0185 14 61 16.9507 61 20.5605V28.4395C61 32.0493 58.0185 35 54.2996 35Z%22 fill=%22%235AFEAE%22/%3E%3Cpath d=%22M51.6387 20.7489L48.9778 30.6995V30.7309H51.0616L53.7225 20.7803H51.6387V20.7489ZM18.746 26.3991C18.4254 26.556 18.1048 26.6188 17.7521 26.6188C17.0148 26.6188 16.598 26.4933 16.5339 25.8968V25.8655C16.5339 25.8341 16.5339 25.8341 16.5339 25.8027V24.0762V23.8879V22.6637V22.1614V21.9731V20.8116L14.6744 21.0314C15.9248 20.7803 16.6301 19.8386 16.6301 18.8655V18.269H14.5462V21.0628L14.418 21.0942V26.2421C14.4821 27.6861 15.4759 28.565 17.0468 28.565C17.6239 28.565 18.233 28.4394 18.7139 28.2197L18.746 26.3991Z%22 fill=%22%23292929%22/%3E%3Cpath d=%22M19.0667 20.3722L13.2319 21.2511V22.6951L19.0667 21.8161V20.3722ZM19.0667 22.5067L13.2319 23.3856V24.7668L19.0667 23.8879C19.0667 23.8879 19.0667 22.5067 19.0667 22.5067ZM25.6068 23.1659C25.5106 21.565 24.4847 20.5919 22.8176 20.5919C21.8559 20.5919 21.0544 20.9686 20.5094 21.6592C19.9644 22.3498 19.6758 23.3543 19.6758 24.5785C19.6758 25.8027 19.9644 26.8072 20.5094 27.4977C21.0544 28.1883 21.8559 28.5336 22.8176 28.5336C24.4847 28.5336 25.5106 27.5919 25.6068 25.9596V28.3767H27.6906V20.7803L25.6068 21.0942V23.1659ZM25.735 24.5785C25.735 25.991 24.9656 26.9327 23.7794 26.9327C22.5612 26.9327 21.8238 26.0538 21.8238 24.5785C21.8238 23.1031 22.5612 22.2242 23.7794 22.2242C24.3565 22.2242 24.8694 22.4439 25.2221 22.8834C25.5427 23.2915 25.735 23.8879 25.735 24.5785ZM33.7498 20.5919C32.0827 20.5919 31.0568 21.5336 30.9607 23.1659V18.5516L28.8768 18.8655V28.3767H30.9607V25.9596C31.0568 27.5919 32.0827 28.5336 33.7498 28.5336C35.7054 28.5336 36.8916 27.0583 36.8916 24.5785C36.8916 22.0986 35.7054 20.5919 33.7498 20.5919ZM32.8201 26.9327C31.6339 26.9327 30.8645 26.0224 30.8645 24.5785C30.8645 23.8879 31.0568 23.2915 31.3774 22.8834C31.7301 22.4439 32.211 22.2242 32.8201 22.2242C34.0383 22.2242 34.7757 23.1031 34.7757 24.5785C34.7757 26.0538 34.0383 26.9327 32.8201 26.9327ZM42.534 20.5919C40.867 20.5919 39.8411 21.5336 39.7449 23.1659V18.5516L37.661 18.8655V28.3767H39.7449V25.9596C39.8411 27.5919 40.867 28.5336 42.534 28.5336C44.4896 28.5336 45.6758 27.0583 45.6758 24.5785C45.6758 22.0986 44.4896 20.5919 42.534 20.5919ZM41.6043 26.9327C40.4181 26.9327 39.6487 26.0224 39.6487 24.5785C39.6487 23.8879 39.8411 23.2915 40.1616 22.8834C40.5143 22.4439 40.9952 22.2242 41.6043 22.2242C42.8226 22.2242 43.5599 23.1031 43.5599 24.5785C43.5599 26.0538 42.8226 26.9327 41.6043 26.9327ZM45.6758 20.7489H47.8879L49.6832 28.3767H47.6956C47.6956 28.3767 45.6758 20.7489 45.6758 20.7489ZM55.4218 21.5336V20.9372H55.1653V20.8117H55.8386V20.9372H55.5821V21.5336H55.4218ZM55.8706 21.5336V20.7803H56.1271L56.2554 21.1256C56.2874 21.2197 56.3195 21.2511 56.3195 21.2825C56.3195 21.2511 56.3515 21.2197 56.3836 21.1256L56.5118 20.7803H56.7683V21.5336H56.608V20.9372L56.3836 21.5336H56.2233L56.0309 20.9372V21.5336H55.8706Z%22 fill=%22%23292929%22/%3E%3C/svg%3E",
  mada: "data:image/svg+xml,%3Csvg width=%2270%22 height=%2248%22 viewBox=%220 0 70 48%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Crect x=%220.5%22 y=%220.5%22 width=%2269%22 height=%2247%22 rx=%225.5%22 fill=%22white%22 stroke=%22%23D9D9D9%22/%3E%3Cg clip-path=%22url(%23clip0_552_209)%22%3E%3Cpath d=%22M31.1505 26.1096H10V34.9842H31.1505V26.1096Z%22 fill=%22%2384B740%22/%3E%3Cpath d=%22M31.1505 14H10V22.8825H31.1505V14Z%22 fill=%22%23259BD6%22/%3E%3Cpath d=%22M52.3007 33.1808L52.2065 33.2045C51.88 33.2836 51.7606 33.3153 51.522 33.3153C50.9694 33.3153 50.3163 32.9593 50.3163 31.2825C50.3163 30.4203 50.4293 29.2734 51.4592 29.2734H51.4655C51.6413 29.2893 51.8423 29.313 52.2191 29.4554L52.3007 29.487V33.1808ZM52.4703 24.8203L52.3007 24.8599V27.9605L52.15 27.9051L52.106 27.8893C51.9365 27.826 51.5471 27.6836 51.1703 27.6836C49.1106 27.6836 48.6772 29.6452 48.6772 31.2904C48.6772 33.5446 49.682 34.8418 51.4341 34.8418C52.1751 34.8418 52.7215 34.7469 53.2741 34.5175C53.7827 34.3119 53.9649 34.0192 53.9649 33.3944V24.496C53.475 24.6068 52.9664 24.7175 52.4703 24.8203Z%22 fill=%22%2327292D%22/%3E%3Cpath d=%22M58.4236 33.2362L58.3357 33.2678L58.0217 33.3706C57.7265 33.4656 57.4628 33.5209 57.2618 33.5209C56.7783 33.5209 56.4894 33.2204 56.4894 32.7062C56.4894 32.374 56.6087 31.8124 57.4 31.8124H58.4236V33.2362ZM57.7014 27.6441C57.0671 27.6441 56.414 27.7865 55.604 28.1028L55.0764 28.3006L55.2523 29.8034L55.7672 29.5899C56.3073 29.3684 56.9792 29.226 57.4816 29.226C57.7077 29.226 58.3985 29.226 58.3985 30.1673V30.5786H57.4377C55.6856 30.5786 54.8755 31.2825 54.8755 32.7932C54.8755 34.0825 55.6228 34.8576 56.8788 34.8576C57.2681 34.8576 57.8082 34.7627 58.2729 34.6204L58.298 34.6125L58.3231 34.6204L58.4801 34.652C58.9699 34.7627 59.4786 34.8735 59.9747 34.9921V30.0565C59.9747 28.4588 59.2086 27.6441 57.7014 27.6441Z%22 fill=%22%2327292D%22/%3E%3Cpath d=%22M46.2219 33.2362L46.134 33.2678L45.82 33.3706C45.5249 33.4656 45.2674 33.5209 45.0602 33.5209C44.5766 33.5209 44.2877 33.2204 44.2877 32.7062C44.2877 32.374 44.4071 31.8125 45.192 31.8125H46.2157L46.2219 33.2362ZM45.506 27.6441C44.8655 27.6441 44.2187 27.7865 43.4086 28.1028L42.8811 28.3006L43.0569 29.8034L43.5718 29.5899C44.1119 29.3684 44.7839 29.226 45.2862 29.226C45.5123 29.226 46.2031 29.226 46.2031 30.1673V30.5786H45.2423C43.4902 30.5786 42.6738 31.2825 42.6738 32.7932C42.6738 34.0825 43.4211 34.8576 44.6834 34.8576C45.0727 34.8576 45.6128 34.7627 46.0775 34.6204L46.1026 34.6125L46.1277 34.6204L46.2785 34.652C46.7746 34.7627 47.2769 34.8735 47.7731 35V30.0644C47.7793 28.4509 47.0132 27.6441 45.506 27.6441Z%22 fill=%22%2327292D%22/%3E%3Cpath d=%22M39.6092 27.6599C38.8117 27.6599 38.1523 27.9921 37.9074 28.1345L37.8446 28.174L37.7881 28.1187C37.449 27.8102 36.9529 27.652 36.2621 27.652C35.6529 27.652 35.0815 27.7627 34.4598 27.9921C33.926 28.1978 33.7188 28.522 33.7188 29.1311V34.7706H35.3892V29.5582L35.4708 29.5266C35.8099 29.3842 36.0109 29.3605 36.2056 29.3605C36.6891 29.3605 36.934 29.6848 36.934 30.3175V34.7785H38.5793V30.2305C38.5793 29.9616 38.5354 29.8034 38.5291 29.7718L38.4726 29.6373L38.5856 29.574C38.8368 29.4317 39.1131 29.3605 39.402 29.3605C39.7348 29.3605 40.1305 29.5266 40.1305 30.3175V34.7785H41.7695V30.1119C41.7695 28.4588 41.0661 27.6599 39.6092 27.6599Z%22 fill=%22%2327292D%22/%3E%3Cpath d=%22M57.1929 19.7898C56.948 19.7898 56.5398 19.7582 56.2195 19.6791L56.1253 19.6554V16.6102C56.1253 16.3571 56.0876 16.1989 56.0813 16.1752L56.0311 16.0486L56.1379 15.9932C56.163 15.9774 56.1881 15.9695 56.2195 15.9537L56.2383 15.9379C56.276 15.922 56.3137 15.9062 56.3514 15.8904C56.3702 15.8825 56.3828 15.8746 56.3953 15.8746C56.7659 15.748 57.105 15.7639 57.2557 15.748H57.262C58.2856 15.748 58.4049 16.8949 58.4049 17.7571C58.3986 19.4339 57.7392 19.7898 57.1929 19.7898ZM57.1866 14C57.174 14 57.1552 14 57.1426 14C56.1818 14 55.1959 14.3322 54.8442 14.9808C54.6558 15.2972 54.5491 15.6927 54.5428 16.1593V19.2995C54.5428 19.5684 54.4988 19.6712 54.4926 19.6949L54.436 19.8294H51.4029V17.6463H51.3966C51.3589 15.3446 50.2788 14.0791 48.7151 14.0791H48.533H47.1891C47.1263 14.6407 47.0761 15.0362 47.0133 15.5978H48.533C49.3305 15.5978 49.7513 16.452 49.7513 17.765V19.9639L49.6445 19.8927C49.6257 19.8848 49.4938 19.8294 49.2866 19.8294H46.6616C46.6114 20.2486 46.5486 20.7944 46.4795 21.3401H54.5491C54.8254 21.2689 55.1457 21.2057 55.422 21.1503C55.8302 21.4034 56.59 21.5379 57.1112 21.5379C58.8633 21.5379 60 20.0588 60 17.7808C59.9937 15.5266 58.8947 14.0475 57.1866 14Z%22 fill=%22%2327292D%22/%3E%3Cpath d=%22M43.038 22.2656H43.1134C44.8654 22.2656 45.6818 21.5379 45.6818 19.7424C45.6818 18.4531 44.9345 17.4249 43.6786 17.4249H42.0646C41.5811 17.4249 41.2922 17.0769 41.2922 16.4915C41.2922 16.0961 41.4115 15.6057 42.2028 15.6057H45.7321C45.8074 15.0283 45.8451 14.6644 45.9142 14.087H42.2468C40.5386 14.087 39.6783 14.9887 39.6783 16.4915C39.6783 17.9785 40.4256 18.7537 41.6816 18.7537H43.2955C43.779 18.7537 44.0679 19.2362 44.0679 19.7424C44.0679 20.0746 43.9486 20.7627 43.1636 20.7627H42.8936L37.7253 20.7469H36.7833C35.9858 20.7469 35.4269 20.1774 35.4269 18.8565V17.9469C35.4269 16.5706 35.8602 15.7164 36.7833 15.7164H38.3156C38.3847 15.1311 38.4286 14.7593 38.4914 14.2057H36.5824H36.4002C34.8366 14.2057 33.7564 15.5266 33.7188 17.8283V17.9153V18.8565C33.7564 21.1582 34.8366 22.2576 36.4002 22.2576H36.5824H37.9262L40.727 22.2656H42.3975H43.038Z%22 fill=%22%2327292D%22/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id=%22clip0_552_209%22%3E%3Crect width=%2250%22 height=%2221%22 fill=%22white%22 transform=%22translate(10 14)%22/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
  mastercard: "data:image/svg+xml,%3Csvg width=%2270%22 height=%2248%22 viewBox=%220 0 70 48%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Crect x=%220.5%22 y=%220.5%22 width=%2269%22 height=%2247%22 rx=%225.5%22 fill=%22white%22 stroke=%22%23D9D9D9%22/%3E%3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M35.5 34.3139C33.1169 36.3704 30.0255 37.6119 26.6475 37.6119C19.1102 37.6119 13 31.4308 13 23.806C13 16.1811 19.1102 10 26.6475 10C30.0255 10 33.1169 11.2415 35.5 13.2981C37.8831 11.2415 40.9745 10 44.3525 10C51.8898 10 58 16.1811 58 23.806C58 31.4308 51.8898 37.6119 44.3525 37.6119C40.9745 37.6119 37.8831 36.3704 35.5 34.3139Z%22 fill=%22%23ED0006%22/%3E%3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M35.5 34.3139C38.4344 31.7816 40.2951 28.0136 40.2951 23.806C40.2951 19.5983 38.4344 15.8303 35.5 13.2981C37.8831 11.2415 40.9745 10 44.3524 10C51.8898 10 58 16.1811 58 23.806C58 31.4308 51.8898 37.6119 44.3524 37.6119C40.9745 37.6119 37.8831 36.3704 35.5 34.3139Z%22 fill=%22%23F9A000%22/%3E%3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M35.5 13.2981C38.4344 15.8304 40.2951 19.5984 40.2951 23.806C40.2951 28.0136 38.4344 31.7816 35.5 34.3138C32.5657 31.7816 30.705 28.0136 30.705 23.806C30.705 19.5984 32.5657 15.8304 35.5 13.2981Z%22 fill=%22%23FF5E00%22/%3E%3C/svg%3E",
  applepay: "data:image/svg+xml,%3Csvg width=%2270%22 height=%2248%22 viewBox=%220 0 70 48%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Crect x=%220.5%22 y=%220.5%22 width=%2269%22 height=%2247%22 rx=%225.5%22 fill=%22white%22 stroke=%22%23D9D9D9%22/%3E%3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M16.6924 17.8659C17.6325 17.9452 18.5726 17.3901 19.1601 16.6863C19.7379 15.9627 20.1198 14.9913 20.0219 14C19.1895 14.0397 18.1613 14.5551 17.5737 15.2787C17.0352 15.9032 16.5749 16.9143 16.6924 17.8659ZM27.8755 30.6333V15.1796H33.6041C36.5615 15.1796 38.6277 17.2414 38.6277 20.2548C38.6277 23.2683 36.5223 25.3499 33.5258 25.3499H30.2453V30.6333H27.8755ZM20.012 18.0542C19.1838 18.006 18.4281 18.3064 17.8177 18.549C17.4249 18.7051 17.0923 18.8373 16.8392 18.8373C16.5552 18.8373 16.2089 18.6981 15.82 18.5417L15.82 18.5417L15.82 18.5417L15.82 18.5417C15.3104 18.3368 14.7278 18.1025 14.1169 18.1137C12.7166 18.1335 11.4142 18.9365 10.6993 20.2152C9.23044 22.7726 10.3174 26.5593 11.7373 28.6409C12.4326 29.6718 13.265 30.8018 14.3617 30.7622C14.8442 30.7438 15.1913 30.5947 15.5505 30.4404C15.9641 30.2628 16.3937 30.0782 17.0645 30.0782C17.712 30.0782 18.1228 30.2579 18.5172 30.4305C18.8921 30.5945 19.2522 30.752 19.7868 30.7424C20.9227 30.7225 21.6376 29.7115 22.3328 28.6806C23.0831 27.5741 23.4129 26.4943 23.4629 26.3304L23.4688 26.3114C23.4676 26.3102 23.4583 26.3059 23.4419 26.2984C23.1911 26.1821 21.274 25.2937 21.2557 22.9114C21.2372 20.9118 22.7762 19.8987 23.0185 19.7392C23.0332 19.7295 23.0432 19.723 23.0477 19.7196C22.0684 18.2525 20.5408 18.0939 20.012 18.0542ZM42.9561 30.7523C44.4445 30.7523 45.8253 29.989 46.452 28.7797H46.501V30.6333H48.6945V22.9412C48.6945 20.7108 46.9318 19.2735 44.2193 19.2735C41.7026 19.2735 39.842 20.7307 39.7735 22.733H41.9083C42.0845 21.7814 42.9561 21.1569 44.1508 21.1569C45.6 21.1569 46.4128 21.8409 46.4128 23.0998V23.9522L43.4555 24.1307C40.7038 24.2992 39.2153 25.4391 39.2153 27.4217C39.2153 29.424 40.7527 30.7523 42.9561 30.7523ZM43.5924 28.9185C42.3292 28.9185 41.5262 28.3039 41.5262 27.3622C41.5262 26.3908 42.2998 25.8257 43.7785 25.7365L46.4127 25.568V26.4403C46.4127 27.8876 45.1984 28.9185 43.5924 28.9185ZM55.9702 31.238C55.0204 33.9442 53.9334 34.8363 51.6224 34.8363C51.4461 34.8363 50.8585 34.8165 50.7214 34.7768V32.9232C50.8683 32.943 51.2307 32.9628 51.4167 32.9628C52.4645 32.9628 53.0521 32.5167 53.4144 31.357L53.6298 30.673L49.6149 19.4222H52.0924L54.8833 28.5517H54.9322L57.7231 19.4222H60.1321L55.9702 31.238ZM30.2451 17.2018H32.9772C35.0336 17.2018 36.2087 18.312 36.2087 20.2648C36.2087 22.2175 35.0336 23.3377 32.9674 23.3377H30.2451V17.2018Z%22 fill=%22black%22/%3E%3C/svg%3E",
  googlepay: "data:image/svg+xml,%3Csvg width=%2270%22 height=%2248%22 viewBox=%220 0 70 48%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Crect x=%220.5%22 y=%220.5%22 width=%2269%22 height=%2247%22 rx=%225.5%22 fill=%22white%22 stroke=%22%23D9D9D9%22/%3E%3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M33.0603 31.5161V25.4742H36.1786C37.4564 25.4742 38.535 25.046 39.4142 24.2016L39.6252 23.9875C41.2313 22.2392 41.1258 19.5156 39.4142 17.898C38.5584 17.0417 37.3861 16.5779 36.1786 16.6016H31.1729V31.5161H33.0603ZM33.0605 23.6426V18.4332H36.2262C36.9063 18.4332 37.5512 18.6949 38.0319 19.1706C39.052 20.1697 39.0754 21.8348 38.0905 22.8695C37.6098 23.3809 36.9297 23.6664 36.2262 23.6426H33.0605ZM48.4293 22.1084C47.6204 21.3591 46.5185 20.9785 45.1234 20.9785C43.3298 20.9785 41.9816 21.6445 41.0906 22.9647L42.7553 24.0232C43.3649 23.1193 44.1973 22.6673 45.2524 22.6673C45.9206 22.6673 46.5653 22.9171 47.0694 23.3691C47.5618 23.7972 47.8432 24.4157 47.8432 25.0698V25.5099C47.1163 25.1055 46.2019 24.8914 45.0765 24.8914C43.7635 24.8914 42.7084 25.2007 41.923 25.831C41.1375 26.4614 40.739 27.2939 40.739 28.3525C40.7155 29.3158 41.1258 30.2316 41.8527 30.8501C42.5912 31.5161 43.5291 31.8491 44.631 31.8491C45.9323 31.8491 46.9639 31.2664 47.7494 30.1008H47.8314V31.5161H49.6368V25.2245C49.6368 23.9043 49.2382 22.8576 48.4293 22.1084ZM43.3066 29.6369C42.9197 29.3515 42.6852 28.8877 42.6852 28.3881C42.6852 27.8291 42.9432 27.3653 43.4473 26.9966C43.9632 26.6279 44.6081 26.4376 45.3702 26.4376C46.4255 26.4257 47.2462 26.6636 47.8325 27.1393C47.8325 27.9481 47.5159 28.6498 46.8945 29.2445C46.3317 29.8153 45.5696 30.1365 44.7723 30.1365C44.2446 30.1484 43.7287 29.97 43.3066 29.6369ZM53.693 36L60.0001 21.3115H57.9485L55.0295 28.6379H54.9943L52.0049 21.3115H49.9534L54.0916 30.862L51.747 36H53.693Z%22 fill=%22%233C4043%22/%3E%3Cpath d=%22M26.5442 24.1659C26.5442 23.5831 26.4973 23.0003 26.4035 22.4295H18.4435V25.724H23.0038C22.8163 26.7825 22.2067 27.734 21.3157 28.3286V30.4695H24.0355C25.6298 28.9828 26.5442 26.7825 26.5442 24.1659Z%22 fill=%22%234285F4%22/%3E%3Cpath d=%22M18.4439 32.539C20.7182 32.539 22.6408 31.7778 24.0358 30.4695L21.3161 28.3287C20.5541 28.852 19.581 29.1493 18.4439 29.1493C16.24 29.1493 14.376 27.6388 13.7078 25.6169H10.9059V27.8291C12.3362 30.7192 15.2552 32.539 18.4439 32.539Z%22 fill=%22%2334A853%22/%3E%3Cpath d=%22M13.708 25.617C13.3563 24.5584 13.3563 23.4048 13.708 22.3344V20.134H10.9058C9.69808 22.5484 9.69808 25.4029 10.9058 27.8173L13.708 25.617Z%22 fill=%22%23FBBC04%22/%3E%3Cpath d=%22M18.4439 18.8019C19.6514 18.7782 20.812 19.242 21.6795 20.0864L24.0944 17.6364C22.5587 16.1854 20.5423 15.3885 18.4439 15.4123C15.2552 15.4123 12.3362 17.2439 10.9059 20.134L13.7078 22.3462C14.376 20.3124 16.24 18.8019 18.4439 18.8019Z%22 fill=%22%23EA4335%22/%3E%3C/svg%3E",
  stcpay: "data:image/svg+xml,%3Csvg width=%2270%22 height=%2248%22 viewBox=%220 0 70 48%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Crect x=%220.5%22 y=%220.5%22 width=%2269%22 height=%2247%22 rx=%225.5%22 fill=%22white%22 stroke=%22%23D9D9D9%22/%3E%3Cg clip-path=%22url(%23clip0_552_251)%22%3E%3Cpath d=%22M14.0646 34.9923C15.4384 35.0605 16.7784 34.4021 17.8051 33.1545C18.1381 32.7075 18.4013 32.1731 18.5787 31.5834C18.7561 30.9938 18.8441 30.3612 18.8375 29.7239C18.8416 29.1295 18.7591 28.54 18.5946 27.9896C18.4303 27.4392 18.1873 26.9388 17.8799 26.5178C17.1524 25.5827 16.2342 24.9704 15.2466 24.7616L13.3988 24.2716C12.6507 24.0673 12.2019 23.5466 12.2019 22.8319C12.2019 21.8823 12.8751 21.2289 13.9524 21.2289C14.5536 21.197 15.1398 21.4906 15.5832 22.0457C15.8322 22.4161 15.9893 22.8841 16.0321 23.3833L18.6953 22.5664C18.6104 21.5308 18.2608 20.5692 17.7079 19.8505C16.692 18.5696 15.3498 17.8808 13.9674 17.931C12.679 17.8757 11.4221 18.4803 10.4438 19.6259C10.0871 20.0759 9.80308 20.6225 9.60986 21.2308C9.41665 21.8391 9.3185 22.4957 9.32168 23.1586C9.30837 23.7125 9.37778 24.2642 9.52568 24.7803C9.67358 25.2964 9.89689 25.766 10.182 26.1605C10.8832 27.0471 11.7507 27.6514 12.6881 27.9064L14.506 28.4986C15.4187 28.7845 15.8226 29.244 15.8226 30.0608C15.8226 31.0818 15.1568 31.6638 14.0571 31.6638C13.7179 31.6863 13.3789 31.6137 13.0611 31.4504C12.7433 31.2871 12.4534 31.0366 12.2093 30.7142C11.9177 30.3134 11.7469 29.7778 11.7306 29.2133L9 30.0302C9.08356 31.1264 9.44939 32.1467 10.0324 32.9095C10.5693 33.5995 11.2021 34.1357 11.8933 34.4864C12.5846 34.8371 13.3203 34.9953 14.0571 34.9515L14.0646 34.9923ZM34.2558 34.9515C35.0037 34.9799 35.7484 34.8059 36.4468 34.4396C37.1453 34.0734 37.7838 33.5221 38.3254 32.8176C39.0182 31.9187 39.5175 30.7782 39.7692 29.5197L36.9639 28.2434C36.8329 28.8941 36.5742 29.4836 36.2158 29.9485C35.6886 30.626 34.9871 30.9929 34.2632 30.9695C33.8687 30.9753 33.4772 30.8746 33.1113 30.6731C32.7454 30.4715 32.4123 30.1733 32.1312 29.7953C31.5419 28.8737 31.234 27.6787 31.2709 26.4566C31.2302 25.2189 31.5472 24.0091 32.1536 23.0872C32.7195 22.3426 33.4773 21.9318 34.2632 21.9436C34.6131 21.9287 34.9614 22.0115 35.2869 22.1871C35.6124 22.3627 35.9081 22.6273 36.1559 22.9646C36.5058 23.4507 36.7627 24.0469 36.904 24.7004L39.7543 23.3935C39.5159 22.1772 39.0552 21.0635 38.4152 20.1568C37.8561 19.4323 37.1973 18.8661 36.477 18.4911C35.7566 18.116 34.989 17.9395 34.2184 17.9718C33.4171 17.9588 32.6219 18.1623 31.8785 18.5706C31.1351 18.9789 30.4582 19.5839 29.8869 20.3508C28.7488 22.0162 28.1196 24.2118 28.128 26.4891C28.1363 28.7665 28.7815 30.9534 29.9317 32.6032C31.0909 34.1425 32.646 35.0003 34.2632 34.9923L34.2558 34.9515ZM24.5903 34.9923C25.488 35.0422 26.3724 34.683 27.104 33.9713V30.4794C26.6332 30.9196 26.0735 31.1481 25.503 31.1329C25.288 31.1869 25.0665 31.1684 24.858 31.0788C24.6494 30.9891 24.4601 30.8311 24.3066 30.6186C24.1531 30.406 24.0401 30.1455 23.9774 29.8595C23.9147 29.5737 23.9043 29.2712 23.947 28.9785V14H20.7975V18.4211H27.1189V22.5971H20.7975V30.02C20.7544 31.3292 21.0903 32.6091 21.7326 33.5834C22.1186 34.0675 22.5715 34.4416 23.0648 34.6835C23.5581 34.9255 24.0818 35.0305 24.6053 34.9923%22 fill=%22%234F008C%22/%3E%3Cpath d=%22M42.8462 29.4998V18.4243H44.2088V19.3002C44.4248 18.9399 44.6986 18.6532 45.0088 18.4628C45.3189 18.2724 45.657 18.1834 45.9964 18.2027C47.5641 18.2027 48.6923 19.9245 48.6923 22.3913C48.6923 24.8582 47.6008 26.6303 45.9964 26.6303C45.6558 26.6472 45.317 26.5551 45.0067 26.3611C44.6965 26.1671 44.4233 25.8767 44.2088 25.5126V29.5401L42.8462 29.4998ZM44.2088 21.4448V23.4586C44.3369 23.8802 44.5525 24.2407 44.8287 24.495C45.1049 24.7492 45.4295 24.8861 45.762 24.8884C46.6704 24.8884 47.2711 23.952 47.2711 22.4417C47.2711 20.9314 46.6704 20.0151 45.762 20.0151C45.429 20.0085 45.1024 20.1406 44.8252 20.394C44.548 20.6474 44.3331 21.0103 44.2088 21.4348%22 fill=%22%2303BB86%22/%3E%3Cpath d=%22M49.617 23.7541C49.596 23.1503 49.7628 22.5603 50.0813 22.1122C50.3999 21.6642 50.8444 21.3943 51.3182 21.3612L53.7618 20.9673V20.5734C53.7728 20.4796 53.7669 20.3838 53.7444 20.2934C53.7218 20.203 53.6833 20.1204 53.6318 20.052C53.5802 19.9835 53.5171 19.931 53.4471 19.8985C53.3772 19.8659 53.3023 19.8543 53.2282 19.8644H50.1351V18.2001H53.2282C54.4655 18.2001 55.1537 18.9682 55.1537 20.3469V25.9698H53.7618V24.985C53.5275 25.3779 53.2208 25.6913 52.8687 25.8974C52.5167 26.1035 52.1303 26.196 51.7436 26.1667C51.475 26.2026 51.2035 26.1662 50.9467 26.0598C50.6899 25.9533 50.4535 25.7794 50.253 25.549C50.0524 25.3187 49.8922 25.0373 49.7826 24.7229C49.6731 24.4086 49.6166 24.0685 49.617 23.7246V23.7541ZM52.0992 24.7093C52.4451 24.7187 52.7858 24.6012 53.0807 24.3707C53.3755 24.1402 53.6119 23.8065 53.7618 23.4094V22.4247L51.8982 22.7595C51.3801 22.8481 51.1249 23.1928 51.1249 23.7443C51.1249 24.2957 51.4884 24.729 52.1302 24.729%22 fill=%22%2303BB86%22/%3E%3Cpath d=%22M56.3119 27.7828H57.2241C57.3654 27.8044 57.5069 27.7429 57.62 27.6106C57.7332 27.4783 57.8098 27.2851 57.8345 27.0695L58.0021 26.3563L56.0771 18.2001H57.3783L58.5721 23.8753L59.719 18.2001H61.0002L58.8875 27.5657C58.5993 28.8578 58.2167 29.5401 57.2912 29.5401H56.3119V27.7828Z%22 fill=%22%2303BB86%22/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id=%22clip0_552_251%22%3E%3Crect width=%2252%22 height=%2221%22 fill=%22white%22 transform=%22translate(9 14)%22/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
  tamara: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPYAAABQCAMAAAAdiXgJAAABgFBMVEWfZpafZbWtkrX/nm6aXLmk2fXgZbjia8f+n3cdHCCvhXuiye+mzPHUZLv+oHiOdnGWW7eutPinqsT/AADSZb3TZbz/nnRELDhWUVp0dIT/AP/1eOr/qqp/P79VVaqoy+7dacDQnZn///88Qkt/f39/f/9/v795ipx/v/9///+/P7+cYsT/VVX//wABAAHt2e765LT02M/24cuvZrruyNH1x7PQ5fv417XPd7rutrLMabvT2Pax1vj5p47pqbHpt8/q4vvTl8S3dbyxyezPhbvQusvOyufcpMjHicL7tZfxzOMAAADQw9nll7e55Prkq8sXFBfYlbniiLj9nXmbXbn+ons4MjTasrujXrmdYblkVVlqWGO9gsDZqLL9noO6vNeriY9vR2NLREm5wN0uKCy4fcDol8VcWWTYZ8JSOUaUk6jlisQ5PEVsanXie73iccL9wJ2iY8Ozd5PUfsQqHCNEODpIQT6BYViQaHWtVq2IWHCYipaxlZL/f3p/cmmdpsGv/sLkAAAAgHRSTlP3Gf8YmBgV8I///1acWtL/VAf/AZ3WS////wEVAwQDzXr/Af8CAgT/BAIEDQMB///8///+//7//f7+/v/+/v7//////v/+/////P8A//3/////+/39/f/++v3////+/f3////+//////v///////b/+P//////////A////wT//zWSKQsAAAlNSURBVHja1dyJV9s4AgZwAwXK9L6P6e4ce8/hjMlF4hzGBCcbJ5NkCJmGAIE0G6CUTum2u0Ch86+vfMiWbcmWHJN2v/favvBKnF8+SZad98KpRu5dqOrMw6tXb67njfwTzZs3SStpV366jDgPYR88Y6dgpQ7zi53Xr18vwWSz2Qf3b3w5p6rf3TO5nPGPhrbJeSf5DYH80yUnSO51u+BafoPJzn8N4F+i7Bn14up6fl0Pnp6caN2kspO+ZSPoJUeyeuZ/2/96Sp2z2RfqzM31dR91MvkpB3kyyd41hp3N7s/Pz6lTkH2hPlxfX1tzqD9TNm3bJSwbNL5/Q3cD9jNEjWcn/dif4yAvkdjZfeA+1dg/qDMA7S4bZWf+39glMhu458C6xv14Aeb1WOz058Yu+bGz+w/mTp9yz9SrunrNqUbYGSd7Au40y4rGys7O31Cfcfdm1tYgO49jZybOTo/HLgWwwTC/x8Gy18hl+7EFPYtGPgm7jrBLVnzY2fn7KgfLXiOXTWYLMIt2olbjp7bFboBYZY+0BA1yMLtPuYdYdR5VZ0hrmiDg3OPqqco22Y3WycbGSUmHt+q/cAePDnaXDgPY2f0bnD3GcewMhp30onHusPo0C/ukyWvpaerR23f6A/7sMIh9n7sJ2XkMO0NmC54skjOG2m9qFzd4MwejVn0JPuB3D5eC2HBq55nYAi6LAYmaXXxrQfmzUX1oP+IO/dkPTPZ2HsfOkAa5IIRyU+DTaYYVDYEujJD3gD8IYGcN9jaW7eZaIWnp3H72dJplaiNQvnSGPHhXomFvE8r+5r9GbjnVCZf6/OOtjx/Bn/NFgR6OtafZ2DtNW/p2F2E3lyjY21g26PoL81mGDnTCzYZjrbMosLnd9DQju9h6Z7MZ2s4C9vY2lq09N2S/d6rd7I753/6zKLC7EXqQGrNbqT+C0hbD3AZsH7XVdseBDmCHcBv0dAh2oTCAZzDHSl4JxTbXbw87QcMOCRcE1jFu7NN6+mQu1esy9XnbZLvVBQI7gWULHnYYuPF7zGUX6o0TbS6PWvYubTdol2awPWrI3oHsBIr2uDFsZrj9i6zsVuPtWQuoW6VR6exg+GhXdqux7DypbBc7EcyWhLBu1/jBqkmfDbTAJVhLS6k0Gh0eHlZKVGxP11h2gpXNAsfs+OjZhlln4y+3adgFPDuRILsheyAJodyEra5AHuOueysh2GQ1yk6EYgvjoEHAgSjUgWUHso2nomCj9hiZLYylFvSjmGh9vBXtNBoN510lH3kA26nOJEjsGIgEEswOggtCIFuXg78yW0haSHBWWZZp2QWXmsw+6oEc9Y4SFGwhArWQON/oNHm2cP+mYVuzJZAt1OAz12JudgxNEFwQ6NjCTodnD5kdz8Y5FxpRk9lNOraVUGi77AHPR8eOgxjsQgGrpmPHKNj6SsCIttiZIT8m24U22AWSmoqtmWx2jBzJCK3ZUidDqnHseNxiF8Zix6jZnhlPxxbe81Gx40g4orpYvBw2rdw41hd8ROx4nMR2oourBHbMzT6AN2Fo2TRy82DNiNhxItuJdrJrPmwJrrSdGFNoyv5gKQbnW1vfbNg3CXtIdnGR0YU8TmK7qwZB2Xr0l1LzsB/DO42x6NzumX2i7UwT1ivi+S1jg2pmZGZ5uQKDqOOecFum+lcrqzAethZFcbFF6Yh3Dvoo4K4xviHoA9BeZXmuEbxFNRKPY9naHheDRtlVG41hWyNxWopFBTfK3rK6ta5C4PmsV9xqlMvLWHeJgv0rAY1hKwqOHZuGL67HzibAzTF+DqePpU6cwLlusJeD6pZlAhtvxrAVL1vUXri1R28qsYjccDMOzxH2JecteCu8uFXW2Mvh2CSzxv6AsBUrIsoWtbqtK4XHYerGwclt9+y2DTaE49myLxuDrq1WLbaCqF1sEOmJtb4eSVIUbrgx8p/bkL1MZstE9irODNS1VYWSHevbm4TBqsQqJ1x46XdT4JEOEq6pDVZyS63DS4S7DVi1xiaoAfslZIuKH1uU0EvDwYdVeN0RLsjbYT/xhvYmJBKcdZiWg72MZctkNlENpnMgWzTZd537woXO4z1Hephs0MS+vzDkWq2dA/vDvWLZwV7GsGVGNjxJ07JFaY+fcHYaZLZDTc+uBbAVD1sUh5NVG2Wj7IqbLfuwn3NEdK0m4tgilh2rLUxS3dRntpNdcbBlPzWGbW9DsWzNiGtbUjoTZE8bZTvZlfBsdO+teNkG0WIrNluMiUeTm9imuuxQo2yZiY2ivWwo7Ft7URGN1N9rTgL9vlUsY8a47Q5iP3eynWiEPRQRtZKCP14QnZEkZXpw2fIhVwRqPLsC2f5la+z+at/IixdONHDefWXkCBnkir1qvxI9kSSx//LJ3mA4XGhGn3fvezvGzYWyL1v2LxuE61tqkBUQx7kKNmwP55Q4sDfgooiT61st10/x+9IqDP6zxaIzZfiZH5FdcZct49WQbaFhFMXFV+7+rmX6iX2GvpsSiYnFAjefPiG+AY0GBVumYb/AoF12zbHimWUdHzW54IDgmnd27suu0LPxZCtwIfN8EjUdxJYcn4fQXpgFuBE1gS37snV1m+uv+KJXciDAkLOWdZg9f3UqlQozvLF9B7MrrOxgtAkXndvPV/5kPRGxGcY4cE8HjvE2YNOg9aQcu7A/+WjthGRXx2BPB5bdbj/nuK8o1TkRuYfCH6VSflyCm1btcnvY5THYbZD4Fe46HVqr27rYGPRTweKQ7nHZm77stp7jK9w1WnUu9bIzHA5f7f3thVl1iiIh2dWw7M1NP3XXYLdvc3co0Zo7ZVJzlGaP+xOzobo9xanXc5RqZJpTo0Ozqz7nr3JIdrcLx7jKqbPM6tzPqdSlub3sIgN7c3PzXyR21y5b5e546g5EawnppmdXo2Z3kbJPub/8Y5ap65/NhHNHySaoCeyuxea+//NTTv1WvZZjRjPBmeqOkh3HsqfUP2pfSTGLuqnRId307CqJHTDGEbdLbbBvG19Joap/B+4cu/pS3NVx2JtENlR3gfoP8Otm7kA3m5oeHopdjZ59zE3pavPLhf6qzl4HsBVWdfTuy2Hr6u5x+8qUNsLtr5K6oxpwVjWtOyq27/lrk8TuduPHx8ddgAarGcpWv50F8GvXv2JVs7vp2VUsuxyG3eWu3Abo06cm938Wk18zXm8wMQAAAABJRU5ErkJggg=="
};
function z(r, t) {
  const e = `lp-star-${t.replace("#", "")}`;
  return i`<span class="stars" aria-hidden="true">
    ${[0, 1, 2, 3, 4].map((a) => {
    const o = Math.round(Math.max(0, Math.min(1, r - a)) * 100);
    return i`<svg viewBox="0 0 20 20">
        <defs>
          <linearGradient id="${e}-${o}">
            <stop offset="${o}%" stop-color="${t}"></stop>
            <stop offset="${o}%" stop-color="#d1d5db"></stop>
          </linearGradient>
        </defs>
        <path
          fill="url(#${e}-${o})"
          d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8z"
        ></path>
      </svg>`;
  })}
  </span>`;
}
const D = i`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`, q = i`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`, A = {
  شحن: () => i`<svg viewBox="0 0 24 24" fill="none"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/></svg>`,
  توصيل: () => A.شحن(),
  استرجاع: () => i`<svg viewBox="0 0 24 24" fill="none"><path d="M4 12a8 8 0 1 1 2.3 5.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M4 18v-4h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  ضمان: () => i`<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  امان: () => i`<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.6"/></svg>`,
  دعم: () => i`<svg viewBox="0 0 24 24" fill="none"><path d="M5 13v-1a7 7 0 0 1 14 0v1" stroke="currentColor" stroke-width="1.6"/><rect x="3.5" y="13" width="3.5" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/><rect x="17" y="13" width="3.5" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/></svg>`,
  هدية: () => i`<svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="8" width="17" height="12.5" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 12h17M12 8v12.5M12 8c-1.8-3.2-5.5-3.4-5.5-1 0 1.6 3 1 5.5 1zm0 0c1.8-3.2 5.5-3.4 5.5-1 0 1.6-3 1-5.5 1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  وقت: () => i`<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.6"/><path d="M12 7.5V12l3 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  تقييم: () => i`<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.6 5.6 6 .6-4.5 4 1.3 6-5.4-3.2L6.6 19l1.3-6-4.5-4 6-.6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`
}, X = () => i`<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8.5" r="4"/><path d="M4 20c0-4.2 3.6-6.5 8-6.5s8 2.3 8 6.5z"/></svg>`, U = [
  ["mada", "mada"],
  ["applepay", "Apple Pay"],
  ["stcpay", "STC Pay"],
  ["tabby", "Tabby"],
  ["tamara", "Tamara"],
  ["mastercard", "Mastercard"],
  ["googlepay", "Google Pay"]
], Q = `
.wahaj-buy .wahaj-form fieldset{border:0;margin:0;padding:0;min-width:0}
.wahaj-buy{display:flex;flex-direction:column;gap:14px;font-family:inherit}
.wahaj-buy .wahaj-label{font-weight:700;font-size:15px;color:#111827;margin:0}
.wahaj-buy .wahaj-tiers{display:grid;grid-template-columns:repeat(var(--wahaj-cols,3),minmax(0,1fr));gap:10px;margin:0;padding:0;border:0}
.wahaj-buy .wahaj-tier{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-height:64px;padding:12px 8px;border:2px solid #e5e7eb;border-radius:10px;background:#f3f4f6;cursor:pointer;text-align:center;font:inherit;color:#111827;transition:border-color .15s,background .15s}
.wahaj-buy .wahaj-tier:hover{border-color:#d1d5db}
.wahaj-buy .wahaj-tier[aria-checked="true"]{border-color:var(--wahaj-accent);background:var(--wahaj-accent-soft)}
.wahaj-buy .wahaj-tier:focus-visible{outline:3px solid var(--wahaj-accent);outline-offset:2px}
.wahaj-buy .wahaj-tier strong{font-size:15px}
.wahaj-buy .wahaj-tier small{font-size:12px;color:#6b7280}
.wahaj-buy .wahaj-tier .wahaj-tier-price{font-weight:700;font-size:14px;display:inline-flex;flex-wrap:wrap;justify-content:center;gap:0 6px;align-items:baseline;white-space:nowrap}
.wahaj-buy .wahaj-tier s{color:#9ca3af;font-size:12px;font-weight:500}
.wahaj-buy .wahaj-badge{position:absolute;top:-10px;inset-inline-end:8px;background:var(--wahaj-accent);color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;white-space:nowrap}
.wahaj-buy .wahaj-row{display:flex;gap:12px;align-items:stretch}
.wahaj-buy .wahaj-qty{flex:0 0 96px;min-height:54px;border:0;border-radius:10px;background:#f3f4f6;padding:0 12px;font:inherit;font-size:16px;color:#111827;cursor:pointer}
.wahaj-buy .wahaj-cta{flex:1 1 auto;min-height:54px;border:0;border-radius:10px;font:inherit;font-size:18px;font-weight:700;cursor:pointer;transition:filter .15s,transform .15s}
.wahaj-buy .wahaj-cta:hover{filter:brightness(.94)}
.wahaj-buy .wahaj-cta:active{transform:translateY(1px)}
.wahaj-buy .wahaj-cta:focus-visible{outline:3px solid currentColor;outline-offset:3px}
.wahaj-buy .wahaj-cta[disabled]{opacity:.6;cursor:not-allowed}
.wahaj-buy salla-product-options,.wahaj-buy salla-quick-order,.wahaj-buy salla-offer{display:block}
.wahaj-buy #bundle-pro-widget:empty{display:none}
@media (max-width:820px){.wahaj-buy .wahaj-cta{font-size:17px}}
@media (prefers-reduced-motion:reduce){.wahaj-buy .wahaj-cta,.wahaj-buy .wahaj-tier{transition:none}}
`;
function J() {
  if (document.getElementById("wahaj-hero-light")) return;
  const r = document.createElement("style");
  r.id = "wahaj-hero-light", r.textContent = Q, document.head.appendChild(r);
}
function B() {
  const r = window;
  return !!(r.__BUNDLE_PRO_LOADER_SRC__ || r.__BUNDLE_PRO__ || document.querySelector('script[src*="/widget/storefront"]'));
}
function $(r) {
  r && typeof r == "object" && (r = r.amount ?? r.value);
  const t = Number.parseFloat(String(r ?? ""));
  return Number.isFinite(t) ? t : 0;
}
function K(r) {
  return Number.isInteger(r) ? String(r) : r.toFixed(2);
}
const H = class H extends O {
  constructor() {
    super(), this.loadedId = "", this.lightRoot = null, this.topTimer = 0, this.topPaused = !1, this.topStopped = !1, this.uid = `wahaj-${Math.random().toString(36).slice(2, 8)}`, this.sdkTries = 0, this.activeImage = 0, this.activeTab = 0, this.activeTier = -1, this.topIndex = 0, this.product = null;
  }
  connectedCallback() {
    super.connectedCallback(), Y(), this.topTimer = window.setInterval(() => {
      var e, a, o;
      const t = Z((e = this.config) == null ? void 0 : e.top_bar).length;
      this.topPaused || (a = window.matchMedia) != null && a.call(window, "(prefers-reduced-motion: reduce)").matches || t > 1 && ((o = window.matchMedia) != null && o.call(window, "(max-width: 820px)").matches) && (this.topIndex = (this.topIndex + 1) % t);
    }, 4e3);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.topTimer);
  }
  /* ----------------------------------------------------------------- data */
  get c() {
    const t = this.config || {}, e = (s, l) => s == null ? l : g(s).trim(), a = (s, l, p) => Z(s).map((d) => Object.fromEntries(p.map((h) => [h, h === "icon" ? C(d, l, h) : g(C(d, l, h))]))), o = k(t.product, "").trim(), n = Z(t.tiers).map((s) => ({
      title: g(C(s, "tiers", "title")).trim(),
      subtitle: g(C(s, "tiers", "subtitle")).trim(),
      qty: Math.max(1, Math.round(T(C(s, "tiers", "qty"), 1, 1, 99))),
      price: g(C(s, "tiers", "price")).trim(),
      compare: g(C(s, "tiers", "compare")).trim(),
      badge: g(C(s, "tiers", "badge")).trim()
    })).filter((s) => s.title);
    return {
      productId: /^\d+$/.test(o) ? o : "",
      bg: x(t.bg_color, "#ffffff"),
      accent: x(t.accent_color, "#1a8917"),
      showTopBar: m(t.show_top_bar, !0),
      topBar: a(t.top_bar, "top_bar", ["icon", "text"]).filter((s) => s.text),
      gallery: a(t.gallery, "gallery", ["image"]).map((s) => v(s.image)).filter(Boolean),
      ratingValue: T(t.rating_value, 4.8, 0, 5),
      ratingCount: e(t.rating_count, "5000"),
      starsColor: x(t.stars_color, "#f5a623"),
      title: e(t.headline ?? t.title, L("عطر فاخر يدوم طويلاً — رائحة تبقى معك طوال اليوم")),
      subtitle: e(t.subheadline ?? t.subtitle, ""),
      priceFrom: m(t.price_from, !1),
      priceAfter: e(t.price_after, "149"),
      priceBefore: e(t.price_before, "249"),
      savings: e(t.savings_label, ""),
      stock: e(t.stock_label, L("الكمية محدودة")),
      points: a(t.points, "points", ["text"]).map((s) => s.text).filter(Boolean),
      offersMode: k(t.offers_mode, "auto"),
      offersTitle: e(t.offers_title, L("اختر العرض المناسب")),
      tiers: n,
      defaultTier: Math.max(0, Math.round(T(t.default_tier, 2, 1, 6)) - 1),
      showQty: m(t.show_qty, !0),
      ctaText: e(t.cta_text, L("اشترِ الآن")),
      ctaColor: x(t.cta_color, "#1a8917"),
      ctaAction: k(t.cta_action, "buy_now"),
      ctaLink: v(t.cta_link),
      showQuickOrder: m(t.show_quick_order, !0),
      showSallaOffers: m(t.show_salla_offers, !0),
      secureLabel: e(t.secure_label, f("secureCheckout")),
      payments: U.filter(([s]) => m(t[`pay_${s}`], ["mada", "applepay", "stcpay", "tabby", "mastercard"].includes(s))),
      showTrust: m(t.show_trust, !0),
      trust: a(t.trust, "trust", ["icon", "text"]).filter((s) => s.text),
      showReview: m(t.show_review, !0),
      review: a(t.reviews, "reviews", ["avatar", "name", "text"]).find((s) => s.text),
      showTabs: m(t.show_tabs, !0),
      tabs: a(t.tabs, "tabs", ["title", "content"]).filter((s) => s.title && s.content),
      showLogos: m(t.show_logos, !0),
      logosTitle: e(t.logos_title, f("recommendedBy")),
      logos: a(t.logos, "logos", ["name", "image"]).filter((s) => s.name || s.image)
    };
  }
  /** Arrow keys move between radio cards / tabs (focus follows the selection). */
  arrowKeys(t, e, a, o) {
    const n = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(t.key in n) || e < 2) return;
    t.preventDefault();
    const s = M() === "rtl" && t.key.startsWith("Arrow") && (t.key === "ArrowRight" || t.key === "ArrowLeft") ? -n[t.key] : n[t.key], l = (Math.max(o, 0) + s + e) % e;
    a(l);
    const p = t.currentTarget;
    requestAnimationFrame(() => {
      var d;
      return (d = p.querySelectorAll('[role="radio"],[role="tab"]')[l]) == null ? void 0 : d.focus();
    });
  }
  async loadProduct(t) {
    var a, o, n, s, l;
    const e = window.salla;
    if (!((a = e == null ? void 0 : e.product) != null && a.getDetails)) {
      this.sdkTries++ < 20 && window.setTimeout(() => this.loadProduct(t), 500);
      return;
    }
    this.loadedId = t;
    try {
      await ((o = e.onReady) == null ? void 0 : o.call(e));
      const p = await e.product.getDetails(t, ["images", "options"]), d = (p == null ? void 0 : p.data) ?? p;
      if (!d || this.loadedId !== t) return;
      const h = $(d.sale_price) || $(d.price), w = $(d.regular_price) || $(d.price), u = (Array.isArray(d.images) ? d.images : []).map((y) => {
        var S;
        return v((y == null ? void 0 : y.url) ?? ((S = y == null ? void 0 : y.image) == null ? void 0 : S.url) ?? y);
      }).filter(Boolean), b = v(((n = d.image) == null ? void 0 : n.url) ?? d.thumbnail);
      this.product = {
        id: t,
        name: g(d.name),
        price: h,
        regular: w > h ? w : 0,
        images: u.length ? u : b ? [b] : [],
        available: d.is_available !== !1 && d.status !== "out" && d.status !== "out-and-notify",
        hasOptions: Array.isArray(d.options) && d.options.length > 0,
        options: d.options,
        // Amounts come back in the visitor's selected currency.
        currency: g(((l = (s = e.config) == null ? void 0 : s.get) == null ? void 0 : l.call(s, "user.currency_code")) || d.currency || "SAR")
      };
    } catch {
      this.product = null;
    }
  }
  willUpdate() {
    const t = this.c.productId;
    t && t !== this.loadedId && this.loadProduct(t), !t && this.loadedId && (this.loadedId = "", this.product = null);
  }
  /* -------------------------------------------------------------- actions */
  /** Quantity tiers are skipped when the bundles app renders its own offers. */
  useTiers() {
    const t = this.c;
    return t.offersMode === "none" || t.offersMode === "app" || t.offersMode === "auto" && t.productId && B() ? !1 : t.tiers.length > 0;
  }
  tierIndex() {
    const t = this.c;
    return this.useTiers() ? this.activeTier >= 0 ? Math.min(this.activeTier, t.tiers.length - 1) : Math.min(t.defaultTier, t.tiers.length - 1) : -1;
  }
  selectedQuantity(t) {
    const e = this.tierIndex();
    if (e >= 0) return this.c.tiers[e].qty;
    const a = t.querySelector(".wahaj-qty");
    return a && Number(a.value) || 1;
  }
  async submit(t) {
    var l, p, d;
    t.preventDefault();
    const e = this.c, a = window.salla, o = t.target;
    if (!e.productId || !((l = a == null ? void 0 : a.cart) != null && l.addItem)) {
      e.ctaLink && (window.location.href = e.ctaLink);
      return;
    }
    const n = {};
    new FormData(o).forEach((h, w) => {
      const u = w.match(/^options\[(\d+)\]$/);
      u && typeof h == "string" && h && (n[u[1]] = h);
    });
    const s = o.querySelector(".wahaj-cta");
    s == null || s.setAttribute("disabled", "");
    try {
      await a.cart.addItem({ id: e.productId, quantity: this.selectedQuantity(o), options: n }), e.ctaAction === "buy_now" ? window.location.href = ((d = (p = a.url) == null ? void 0 : p.get) == null ? void 0 : d.call(p, "cart")) || "/cart" : e.ctaAction === "link" && e.ctaLink && (window.location.href = e.ctaLink);
    } catch {
    } finally {
      s == null || s.removeAttribute("disabled");
    }
  }
  /** Manual mode button: use the page's own purchase control, else follow the merchant link. */
  manualCta() {
    const t = this.c;
    if (t.ctaAction === "link" && t.ctaLink) {
      window.location.href = t.ctaLink;
      return;
    }
    const e = ["salla-quick-buy button", "[data-buy-now]", "salla-add-product-button button", ".btn-add-to-cart"].map((a) => document.querySelector(a)).find(Boolean);
    e ? e.click() : t.ctaLink && (window.location.href = t.ctaLink);
  }
  /* ------------------------------------------------------- light DOM part */
  updated() {
    var e;
    if (!this.c.productId) {
      (e = this.lightRoot) == null || e.remove(), this.lightRoot = null;
      return;
    }
    J(), this.lightRoot || (this.lightRoot = document.createElement("div"), this.lightRoot.slot = "buy", this.appendChild(this.lightRoot)), W(this.lightTemplate(), this.lightRoot), this.mountBundlesApp();
  }
  /**
   * Hands the product to the bundles app ("عروض المنتجات والباقات").
   * The app reads window.__BUNDLE_PRO_PRODUCT_ID__ and mounts into #bundle-pro-widget. When its script
   * already ran, it can re-mount through window.BundlePro.mount (if exposed) or the "wahaj:product" event.
   */
  mountBundlesApp() {
    var o, n;
    const t = this.c;
    if (!t.productId || t.offersMode === "none" || this.useTiers() || !B()) return;
    const e = (o = this.lightRoot) == null ? void 0 : o.querySelector("#bundle-pro-widget");
    if (!e || e.dataset.wahajMounted === t.productId) return;
    e.dataset.wahajMounted = t.productId;
    const a = window;
    a.__BUNDLE_PRO_PRODUCT_ID__ = t.productId, typeof ((n = a.BundlePro) == null ? void 0 : n.mount) == "function" && a.BundlePro.mount(e, t.productId), document.dispatchEvent(new CustomEvent("wahaj:product", { detail: { productId: t.productId, element: e } }));
  }
  lightTemplate() {
    const t = this.c, e = this.product;
    e ? e.regular && (t.savings || i`${f("save")} ${this.money(Math.round((e.regular - e.price) * 100) / 100)}`) : t.savings;
    const a = e ? !e.available : !1, o = this.tierIndex(), n = o >= 0 ? t.tiers : [], s = t.offersMode !== "none" && !this.useTiers() && B();
    return i`
      <div
        class="wahaj-buy"
        dir="${M()}"
        style="--wahaj-accent:${t.accent};--wahaj-accent-soft:${I(t.accent, 0.1)};--wahaj-cols:${Math.min(Math.max(n.length, 1), 3)}"
      >
        ${s ? i`<div id="bundle-pro-widget" class="bp-widget-mount"></div>` : c}
        ${n.length ? i`<p class="wahaj-label" id="${this.uid}-tiers">${t.offersTitle}</p>
              <div class="wahaj-tiers" role="radiogroup" aria-labelledby="${this.uid}-tiers" @keydown=${(l) => this.arrowKeys(l, n.length, (p) => this.activeTier = p, this.tierIndex())}>
                ${n.map(
      (l, p) => i`<button type="button" class="wahaj-tier" role="radio" aria-checked="${p === o}" tabindex="${p === o ? 0 : -1}" @click=${() => this.activeTier = p}>
                    ${l.badge ? i`<span class="wahaj-badge">${l.badge}</span>` : c}
                    <strong>${l.title}</strong>
                    ${l.price ? i`<span class="wahaj-tier-price">${l.price}${l.compare ? i`<s>${l.compare}</s>` : c}</span>` : c}
                    ${l.subtitle ? i`<small>${l.subtitle}</small>` : c}
                  </button>`
    )}
              </div>` : c}
        <form class="wahaj-form product-form" @submit=${(l) => this.submit(l)}>
          <input type="hidden" name="id" .value=${t.productId} />
          ${e != null && e.hasOptions ? i`<salla-product-options product-id="${t.productId}" options="${JSON.stringify(e.options)}"></salla-product-options>` : c}
          <div class="wahaj-row">
            ${t.showQty && !n.length ? i`<select class="wahaj-qty" name="quantity" aria-label="${f("quantity")}">
                  ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((l) => i`<option value="${l}">${l}</option>`)}
                </select>` : c}
            <button class="wahaj-cta" type="submit" style="background:${t.ctaColor};color:${P(t.ctaColor)}" ?disabled=${a}>
              ${a ? f("outOfStock") : t.ctaText}
            </button>
          </div>
        </form>
        ${t.showQuickOrder && !a ? i`<salla-quick-order product-id="${t.productId}"></salla-quick-order>` : c}
        ${t.showSallaOffers ? i`<salla-offer product-id="${t.productId}"></salla-offer>` : c}
      </div>
    `;
  }
  /* ------------------------------------------------------------ rendering */
  icon(t) {
    const e = k(t, "").trim();
    return A[e] ? A[e]() : A.ضمان();
  }
  money(t) {
    var o;
    const e = ((o = this.product) == null ? void 0 : o.currency) || "SAR", a = typeof t == "number" ? K(t) : t;
    return e.toUpperCase() === "SAR" ? i`${a}<i class="sar sicon-sar" aria-hidden="true"></i><span class="sr-only">SAR</span>` : i`${a} ${e}`;
  }
  renderTopBar(t, e) {
    if (!t.showTopBar || !t.topBar.length) return c;
    const a = t.topBar.length, o = this.topIndex % a, n = (l) => {
      this.topStopped = !0, this.topPaused = !0, this.topIndex = (o + l + a) % a;
    }, s = (l) => () => {
      this.topStopped || (this.topPaused = l);
    };
    return i`<div class="top" @mouseenter=${s(!0)} @mouseleave=${s(!1)} @focusin=${s(!0)} @focusout=${s(!1)}>
      <div class="container top-bar-inner">
        <button class="top-nav" type="button" aria-label="${f("previous")}" @click=${() => n(-1)}>${e ? q : D}</button>
        <ul class="top-list">
          ${t.topBar.map(
      (l, p) => i`<li class="top-item ${p === o ? "on" : ""}"><span class="ic" aria-hidden="true">${this.icon(l.icon)}</span>${l.text}</li>`
    )}
        </ul>
        <button class="top-nav" type="button" aria-label="${f("next")}" @click=${() => n(1)}>${e ? D : q}</button>
      </div>
    </div>`;
  }
  renderManualBuy(t) {
    const e = this.tierIndex(), a = e >= 0 ? t.tiers : [];
    return i`
      ${a.length ? i`<p class="label" id="tiers-label">${t.offersTitle}</p>
            <div class="tiers" role="radiogroup" aria-labelledby="tiers-label" @keydown=${(o) => this.arrowKeys(o, a.length, (n) => this.activeTier = n, e)} style="--cols:${Math.min(a.length, 3)}">
              ${a.map(
      (o, n) => i`<button type="button" class="tier" role="radio" aria-checked="${n === e}" tabindex="${n === e ? 0 : -1}" @click=${() => this.activeTier = n}>
                  ${o.badge ? i`<span class="badge">${o.badge}</span>` : c}
                  <strong>${o.title}</strong>
                  ${o.price ? i`<span class="tp">${o.price}${o.compare ? i`<s>${o.compare}</s>` : c}</span>` : c}
                  ${o.subtitle ? i`<small>${o.subtitle}</small>` : c}
                </button>`
    )}
            </div>` : c}
      <div class="buy-row">
        <button class="cta" type="button" style="background:${t.ctaColor};color:${P(t.ctaColor)}" @click=${() => this.manualCta()}>${t.ctaText}</button>
      </div>
    `;
  }
  renderTabs(t) {
    var a;
    if (!t.showTabs || !t.tabs.length) return c;
    const e = Math.min(Math.max(this.activeTab, 0), t.tabs.length - 1);
    return i`<div class="tabs">
        <div class="tabs-head" role="tablist" @keydown=${(o) => this.arrowKeys(o, t.tabs.length, (n) => this.activeTab = n, e)}>
          ${t.tabs.map(
      (o, n) => i`<button
              class="tab"
              role="tab"
              type="button"
              id="tab-${n}"
              aria-controls="${n === e ? "panel" : c}"
              aria-selected="${n === e}"
              tabindex="${n === e ? 0 : -1}"
              @click=${() => this.activeTab = n}
            >${o.title}</button>`
    )}
        </div>
        <div class="tab-panel" role="tabpanel" id="panel" aria-labelledby="tab-${e}">${(a = t.tabs[e]) == null ? void 0 : a.content}</div>
      </div>
      <div class="acc">
        ${t.tabs.map(
      (o, n) => i`<div class="acc-item">
            <button class="acc-q" type="button" aria-expanded="${n === this.activeTab}" @click=${() => this.activeTab = this.activeTab === n ? -1 : n}>
              <span>${o.title}</span><span aria-hidden="true">${n === this.activeTab ? "−" : "+"}</span>
            </button>
            ${n === this.activeTab ? i`<div class="acc-a">${o.content}</div>` : c}
          </div>`
    )}
      </div>`;
  }
  render() {
    const t = this.c, e = this.product, a = M(), o = a === "rtl", n = e != null && e.images.length ? e.images : t.gallery.length ? t.gallery : [G], s = Math.min(this.activeImage, n.length - 1), l = e && e.price ? this.money(e.price) : t.priceAfter ? this.money(t.priceAfter) : null, p = e ? e.regular ? this.money(e.regular) : null : t.priceBefore ? this.money(t.priceBefore) : null, d = e ? e.regular ? t.savings || i`${f("save")} ${this.money(Math.round((e.regular - e.price) * 100) / 100)}` : "" : t.savings, h = e ? !e.available : !1, w = t.review ? v(t.review.avatar) : "";
    return i`
      <link rel="stylesheet" href="${N}" />
      <section dir="${a}" style="background:${t.bg};--accent:${t.accent};--accent-soft:${I(t.accent, 0.1)}" aria-label="${t.title}">
        ${this.renderTopBar(t, o)}
        <div class="container">
          <div class="wrap">
            <div class="gallery">
              <img class="main-img" src="${n[s]}" alt="${t.title}" />
              ${n.length > 1 ? i`<div class="thumbs">
                    ${n.slice(0, 6).map(
      (u, b) => i`<button class="thumb-btn" type="button" aria-label="${f("image", { n: b + 1 })}" aria-pressed="${b === s}" @click=${() => this.activeImage = b}>
                        <img src="${u}" alt="" loading="lazy" decoding="async" />
                      </button>`
    )}
                  </div>` : c}
            </div>

            <div class="info">
              <div class="rating">
                ${z(t.ratingValue, t.starsColor)}
                <span class="sr-only">${f("rating", { value: t.ratingValue })}</span>
                <strong aria-hidden="true">${t.ratingValue}/5</strong>
                ${t.ratingCount ? i`<span>· ${f("ratedBy", { count: t.ratingCount })}</span>` : c}
              </div>

              <h1 class="title">${t.title}</h1>
              ${t.subtitle ? i`<p class="subtitle">${t.subtitle}</p>` : c}

              <div class="price-row">
                ${l ? i`<span class="price">${t.priceFrom ? i`<span class="from">${f("startingFrom")}</span>` : c}${l}</span>` : c}
                ${p ? i`<span class="price-before">${p}</span>` : c}
                ${d ? i`<span class="savings">${d}</span>` : c}
                ${h ? i`<span class="stock out"><span class="dot"></span>${f("outOfStock")}</span>` : t.stock ? i`<span class="stock"><span class="dot"></span>${t.stock}</span>` : c}
              </div>

              ${t.points.length ? i`<ul class="points">${t.points.map((u) => i`<li><span class="tick" aria-hidden="true">✓</span><span>${u}</span></li>`)}</ul>` : c}

              ${t.productId ? i`<slot name="buy"></slot>` : this.renderManualBuy(t)}

              ${t.payments.length ? i`<div class="pay">
                    <ul aria-label="${f("securePayment")}">
                      ${t.payments.map(([u, b]) => i`<li><img src="${_[u]}" alt="${b}" loading="lazy" decoding="async" /></li>`)}
                    </ul>
                    ${t.secureLabel ? i`<span class="secure">${t.secureLabel}</span>` : c}
                  </div>` : c}

              ${t.showTrust && t.trust.length ? i`<div class="trust-card">
                    ${t.trust.map((u) => i`<div class="trust-row"><span class="ic" aria-hidden="true">${this.icon(u.icon)}</span><span>${u.text}</span></div>`)}
                  </div>` : c}

              ${t.showReview && t.review ? i`<div class="review">
                    ${w ? i`<img class="avatar" src="${w}" alt="${t.review.name}" loading="lazy" />` : i`<span class="avatar" aria-hidden="true">${X()}</span>`}
                    <div>
                      <p class="rtext">${t.review.text}</p>
                      ${t.review.name ? i`<div class="rname">${t.review.name}</div>` : c}
                      ${z(5, t.starsColor)}
                    </div>
                  </div>` : c}

              ${this.renderTabs(t)}
            </div>
          </div>
        </div>

        ${t.showLogos && t.logos.length ? i`<div class="logos">
              <div class="container logos-inner">
                ${t.logosTitle ? i`<span class="logos-title">${t.logosTitle}</span>` : c}
                ${t.logos.map(
      (u) => v(u.image) ? i`<span class="logo"><img src="${v(u.image)}" alt="${u.name || ""}" loading="lazy" /></span>` : i`<span class="logo">${u.name}</span>`
    )}
              </div>
            </div>` : c}
      </section>
    `;
  }
};
H.properties = {
  config: { type: Object },
  activeImage: { state: !0 },
  activeTab: { state: !0 },
  activeTier: { state: !0 },
  topIndex: { state: !0 },
  product: { state: !0 }
}, H.styles = R`
    :host { display: block; font-family: inherit; color: #1f2937; }
    * { box-sizing: border-box; }
    img { display: block; max-width: 100%; }
    .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; }
    .container { max-width: 1240px; margin-inline: auto; padding-inline: 1rem; }

    /* Top bar */
    .top { border-bottom: 1px solid #eceef1; background: #fff; }
    .top-bar-inner { display: block; }
    .top-list { display: flex; justify-content: space-between; gap: 1rem; margin: 0; padding: 0.9rem 0; list-style: none; }
    .top-item { display: flex; align-items: center; gap: 0.55rem; font-size: 0.92rem; font-weight: 600; color: #111827; }
    .top-item .ic { width: 22px; height: 22px; flex: 0 0 auto; color: #111827; }
    .top-item .ic svg { width: 100%; height: 100%; }
    .top-nav { display: none; }

    /* Product area */
    .wrap { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 4rem; padding-block: 2rem 3rem; align-items: start; }
    .gallery { position: sticky; top: 1rem; }
    .main-img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; background: #f3f4f6; border-radius: 4px; }
    .thumbs { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0.9rem; margin-top: 1.25rem; }
    .thumb-btn { padding: 0; border: 2px solid transparent; background: #f3f4f6; border-radius: 6px; cursor: pointer; overflow: hidden; aspect-ratio: 1.15 / 1; }
    .thumb-btn[aria-pressed="true"] { border-color: #111827; }
    .thumb-btn:focus-visible { outline: 2px solid #111827; outline-offset: 2px; }
    .thumb-btn img { width: 100%; height: 100%; object-fit: cover; }

    .info { min-width: 0; display: flex; flex-direction: column; gap: 1.15rem; }
    .rating { display: flex; align-items: center; flex-wrap: wrap; gap: 0.45rem; font-size: 0.92rem; color: #4b5563; }
    .stars { display: inline-flex; gap: 2px; }
    .stars svg { width: 18px; height: 18px; display: block; }
    .rating strong { color: #111827; }
    h1.title { margin: 0; font-size: 2.35rem; line-height: 1.25; font-weight: 700; color: #111827; letter-spacing: -0.01em; }
    .subtitle { margin: -0.4rem 0 0; color: #4b5563; font-size: 1.02rem; line-height: 1.7; }

    .price-row { display: flex; align-items: center; flex-wrap: wrap; gap: 0.6rem 1rem; }
    .price { font-size: 1.45rem; font-weight: 700; color: #111827; }
    .price .from { font-weight: 500; color: #4b5563; font-size: 1.05rem; margin-inline-end: 0.35rem; }
    .price-before { color: #9ca3af; text-decoration: line-through; font-size: 1.05rem; }
    .savings { background: var(--accent-soft); color: var(--accent); font-size: 0.85rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 6px; }
    .stock { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; color: #4b5563; }
    .stock .dot { width: 12px; height: 12px; border-radius: 50%; background: #f59e0b; box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.18); }
    .stock.out .dot { background: #dc2626; box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.15); }
    .sar { font-style: normal; font-size: 0.85em; margin-inline-start: 2px; }

    .points { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.7rem; }
    .points li { display: flex; align-items: flex-start; gap: 0.7rem; line-height: 1.55; color: #374151; }
    .points .tick { width: 22px; height: 22px; flex: 0 0 auto; border-radius: 50%; background: #6b7280; color: #fff; display: grid; place-items: center; font-size: 0.72rem; margin-top: 1px; }

    /* Offers + button (manual mode) */
    .label { font-weight: 700; color: #111827; margin: 0.2rem 0 -0.4rem; }
    .tiers { display: grid; grid-template-columns: repeat(var(--cols, 3), minmax(0, 1fr)); gap: 0.65rem; }
    .tier { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; min-height: 64px; padding: 0.75rem 0.5rem; border: 2px solid #e5e7eb; border-radius: 10px; background: #f3f4f6; cursor: pointer; text-align: center; font: inherit; color: #111827; }
    .tier[aria-checked="true"] { border-color: var(--accent); background: var(--accent-soft); }
    .tier:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
    .tier strong { font-size: 0.95rem; }
    .tier small { font-size: 0.75rem; color: #6b7280; }
    .tier .tp { font-weight: 700; font-size: 0.9rem; display: inline-flex; flex-wrap: wrap; justify-content: center; gap: 0 6px; align-items: baseline; white-space: nowrap; }
    .tier s { color: #9ca3af; font-size: 0.75rem; font-weight: 500; }
    .tier .badge { position: absolute; top: -10px; inset-inline-end: 8px; background: var(--accent); color: #fff; font-size: 0.68rem; font-weight: 700; padding: 2px 8px; border-radius: 999px; white-space: nowrap; }

    .buy-row { display: flex; gap: 0.75rem; }
    .qty { flex: 0 0 96px; min-height: 54px; border: 0; border-radius: 10px; background: #f3f4f6; padding: 0 0.75rem; font: inherit; font-size: 1rem; }
    .cta { flex: 1 1 auto; min-height: 54px; border: 0; border-radius: 10px; font: inherit; font-size: 1.15rem; font-weight: 700; cursor: pointer; transition: filter 0.15s; }
    .cta:hover { filter: brightness(0.94); }
    .cta:focus-visible { outline: 3px solid currentColor; outline-offset: 3px; }

    .pay { display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem; }
    .pay ul { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0; padding: 0; list-style: none; }
    .pay img { height: 28px; width: auto; }
    .pay .secure { color: #4b5563; font-size: 0.92rem; margin-inline-start: 0.5rem; }

    .trust-card { background: #ececec; border-radius: 6px; padding: 1.25rem 1.4rem; display: grid; gap: 1rem; }
    .trust-row { display: flex; align-items: center; gap: 0.8rem; color: #374151; font-size: 0.98rem; }
    .trust-row .ic { width: 22px; height: 22px; flex: 0 0 auto; color: #6b7280; }
    .trust-row .ic svg { width: 100%; height: 100%; }

    .review { display: flex; gap: 1.25rem; align-items: center; }
    .review .avatar { width: 92px; height: 92px; border-radius: 50%; object-fit: cover; flex: 0 0 auto; background: #bcb6b6; color: #fff; display: grid; place-items: center; overflow: hidden; }
    .review .avatar svg { width: 55%; height: 55%; }
    .review .rtext { margin: 0 0 0.5rem; color: #374151; line-height: 1.65; }
    .review .rname { font-weight: 700; margin-bottom: 0.25rem; }

    .tabs-head { display: flex; border-bottom: 2px solid #e5e7eb; overflow-x: auto; scrollbar-width: none; }
    .tab { padding: 0.7rem 1.2rem; border: 0; background: none; font: inherit; font-weight: 600; color: #6b7280; cursor: pointer; white-space: nowrap; margin-bottom: -2px; border-bottom: 2px solid transparent; }
    .tab[aria-selected="true"] { color: #111827; background: #e5e7eb; border-bottom-color: #111827; }
    .tab:focus-visible { outline: 2px solid #111827; outline-offset: -2px; }
    .tab-panel { padding: 1rem 0.2rem 0; color: #4b5563; line-height: 1.85; white-space: pre-line; }
    .acc { display: none; }
    .acc-item + .acc-item { margin-top: 0.6rem; }
    .acc-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; padding: 0.8rem 1rem; background: #e5e7eb; border: 0; border-radius: 4px; font: inherit; font-weight: 600; color: #111827; text-align: start; cursor: pointer; }
    .acc-a { padding: 0.8rem 0.25rem 0.2rem; color: #4b5563; line-height: 1.8; white-space: pre-line; }

    /* Logos strip */
    .logos { background: #f2f2f2; }
    .logos-inner { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem 2.5rem; flex-wrap: wrap; padding-block: 1.6rem; }
    .logos-title { color: #4b5563; font-size: 0.92rem; }
    .logo { color: #6b7280; font-size: 1.15rem; font-weight: 600; }
    .logo img { max-height: 34px; width: auto; filter: grayscale(1); opacity: 0.75; }

    @media (max-width: 1024px) {
      .wrap { gap: 2.5rem; }
      h1.title { font-size: 2rem; }
    }
    @media (max-width: 820px) {
      .top-bar-inner { display: flex; align-items: center; justify-content: space-between; }
      .top-list { justify-content: center; padding: 0.7rem 0; }
      .top-list .top-item { display: none; }
      .top-list .top-item.on { display: flex; }
      .top-nav { display: grid; place-items: center; width: 32px; height: 32px; border: 0; background: none; cursor: pointer; color: #111827; }
      .top-nav svg { width: 18px; height: 18px; }
      .wrap { grid-template-columns: 1fr; gap: 1.5rem; padding-block: 1rem 2rem; }
      .gallery { position: static; }
      .thumbs { gap: 0.55rem; }
      h1.title { font-size: 1.7rem; }
      .review .avatar { width: 72px; height: 72px; }
      .tabs { display: none; }
      .acc { display: block; }
      .logos-inner { justify-content: center; text-align: center; }
      .logos-title { width: 100%; }
    }
  `;
let j = H;
typeof j < "u" && j.registerSallaComponent("salla-hero");
export {
  j as default
};
