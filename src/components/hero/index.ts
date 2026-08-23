import { css, html, LitElement } from "lit";
import { PAYMENTS } from "./payments";

const TRUST_ICONS: Record<string, () => any> = {
  شحن: () => html`<svg viewBox="0 0 24 24" fill="none"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/></svg>`,
  توصيل: () => TRUST_ICONS["شحن"](),
  استرجاع: () => html`<svg viewBox="0 0 24 24" fill="none"><path d="M4 12a8 8 0 1 1 2.3 5.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M4 18v-4h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  ضمان: () => html`<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  امان: () => html`<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.6"/></svg>`,
  دعم: () => html`<svg viewBox="0 0 24 24" fill="none"><path d="M5 13v-1a7 7 0 0 1 14 0v1" stroke="currentColor" stroke-width="1.6"/><rect x="3.5" y="13" width="3.5" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/><rect x="17" y="13" width="3.5" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/></svg>`,
  تقييم: () => html`<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.6 5.6 6 .6-4.5 4 1.3 6-5.4-3.2L6.6 19l1.3-6-4.5-4 6-.6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
};

const personIcon = () => html`<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8.5" r="4"/><path d="M4 20c0-4.2 3.6-6.5 8-6.5s8 2.3 8 6.5z"/></svg>`;

export default class Hero extends LitElement {
  static properties = {
    config: { type: Object },
    activeImage: { type: Number, state: true },
    openFaq: { type: Number, state: true },
  };

  config?: Record<string, any>;
  activeImage!: number;
  openFaq!: number;

  constructor() {
    super();
    this.activeImage = 0;
    this.openFaq = -1;
  }

  connectedCallback() {
    super.connectedCallback();
    const w = window as any;
    if (!w.__sarFontLoaded && (window as any).FontFace) {
      w.__sarFontLoaded = true;
      const f = new FontFace(
        "saudi_riyal",
        "url('https://cdn.jsdelivr.net/npm/@emran-alhaddad/saudi-riyal-font/fonts/regular/saudi_riyal.woff2') format('woff2')"
      );
      f.load().then((loaded) => { (document as any).fonts.add(loaded); this.requestUpdate(); }).catch(() => {});
    }
  }

  private get c() {
    const cfg = this.config || {};
    return {
      bg_color: cfg.bg_color || "#ffffff",
      gallery:
        Array.isArray(cfg.gallery) && cfg.gallery.length
          ? cfg.gallery
          : [
              { image: "https://placehold.co/600x600/f1f1f1/999?text=1" },
              { image: "https://placehold.co/600x600/eaeaea/999?text=2" },
              { image: "https://placehold.co/600x600/f1f1f1/999?text=3" },
              { image: "https://placehold.co/600x600/eaeaea/999?text=4" },
            ],
      rating_value: cfg.rating_value || "4.8",
      rating_count: cfg.rating_count || "5000",
      stars_color: cfg.stars_color || "#f5a623",
      title: cfg.title || "عطر فاخر يدوم طويلاً — رائحة تبقى معك طوال اليوم",
      subtitle: cfg.subtitle || "تركيبة شرقية أصيلة بخلاصة العود والمسك، مصممة لتترك أثراً لا يُنسى.",
      points:
        Array.isArray(cfg.points) && cfg.points.length
          ? cfg.points
          : [{ text: "ثبات يدوم حتى 12 ساعة" }, { text: "مكوّنات طبيعية 100%" }, { text: "شحن مجاني لجميع مدن المملكة" }],
      price_after: cfg.price_after || "149",
      price_before: cfg.price_before || "249",
      savings_label: cfg.savings_label || "وفّرت 100",
      cta_text: cfg.cta_text || "اشترِ الآن",
      cta_color: cfg.cta_color || "#1a8917",
      cta_action: cfg.cta_action || "landing",
      cta_link: cfg.cta_link || "",
      stock_label: cfg.stock_label || "الكمية محدودة",
      pay_tabby: cfg.pay_tabby ?? true,
      pay_tamara: cfg.pay_tamara ?? true,
      pay_mada: cfg.pay_mada ?? true,
      pay_stcpay: cfg.pay_stcpay ?? true,
      pay_applepay: cfg.pay_applepay ?? true,
      pay_googlepay: cfg.pay_googlepay ?? false,
      pay_mastercard: cfg.pay_mastercard ?? false,
      trust:
        Array.isArray(cfg.trust) && cfg.trust.length
          ? cfg.trust
          : [
              { icon: "شحن", text: "شحن سريع خلال يومين" },
              { icon: "ضمان", text: "ضمان ذهبي — رضاك أولويتنا" },
              { icon: "دعم", text: "دعم فني على مدار الساعة" },
              { icon: "استرجاع", text: "استرجاع مجاني خلال 14 يوم" },
            ],
      reviews:
        Array.isArray(cfg.reviews) && cfg.reviews.length
          ? cfg.reviews
          : [{ avatar: "", name: "محمد العتيبي", text: "رائحة فخمة وثباتها ممتاز، وصلني بسرعة. أنصح فيه بشدة." }],
      faq:
        Array.isArray(cfg.faq) && cfg.faq.length
          ? cfg.faq
          : [
              { q: "كم يدوم ثبات العطر؟", a: "يدوم حتى 12 ساعة حسب نوع البشرة والاستخدام." },
              { q: "كم تستغرق مدة الشحن؟", a: "من يوم إلى يومين عمل داخل المملكة، مع إمكانية التتبّع." },
              { q: "هل يمكن الإرجاع؟", a: "نعم، إرجاع مجاني خلال 14 يوم إذا لم يُفتح المنتج." },
            ],
    };
  }

  static styles = css`
    :host { display: block; direction: rtl; font-family: "IBM Plex Sans Arabic", "Tajawal", system-ui, sans-serif; color: #1f2937; }
    * { box-sizing: border-box; }
    .sar { font-family: "saudi_riyal", sans-serif; font-style: normal; margin-right: 2px; }

    .container { max-width: 1140px; margin: 0 auto; }

    /* منطقة المنتج: عمودان */
    .wrap { padding: 0 1rem 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: start; }

    .gallery { position: sticky; top: 1rem; }
    .main-img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; border-radius: 14px; background: #f3f4f6; display: block; }
    .thumbs { display: flex; gap: 0.5rem; margin-top: 0.75rem; overflow-x: auto; padding-bottom: 4px; }
    .thumb { width: 72px; height: 72px; flex: 0 0 auto; object-fit: cover; border-radius: 10px; cursor: pointer; border: 2px solid transparent; transition: border-color .15s, opacity .15s; opacity: 0.7; }
    .thumb:hover { opacity: 1; }
    .thumb.active { border-color: #111827; opacity: 1; }

    .info { min-width: 0; }
    .rating { display: flex; align-items: center; gap: 0.4rem; font-size: 0.95rem; margin-bottom: 0.75rem; }
    .stars { letter-spacing: 1px; font-size: 1.05rem; }
    .rating-num { font-weight: 700; }
    .rating-count { color: #6b7280; }

    h1.title { font-size: 1.9rem; line-height: 1.35; font-weight: 700; margin: 0 0 0.6rem; }
    .subtitle { font-size: 1.05rem; color: #4b5563; line-height: 1.7; margin: 0 0 1.25rem; }

    .points { list-style: none; padding: 0; margin: 0 0 1.5rem; }
    .points li { display: flex; align-items: center; gap: 0.6rem; padding: 0.35rem 0; font-size: 1rem; }
    .points .pt-icon { width: 24px; height: 24px; flex: 0 0 auto; display: grid; place-items: center; background: #ecfdf5; color: #059669; border-radius: 50%; font-size: 0.8rem; }

    .price-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.4rem; flex-wrap: wrap; }
    .price-after { font-size: 2rem; font-weight: 800; color: #111827; }
    .price-before { font-size: 1.15rem; color: #9ca3af; text-decoration: line-through; }
    .savings { background: #dcfce7; color: #166534; font-size: 0.85rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 6px; }

    .stock { display: flex; align-items: center; gap: 0.45rem; color: #dc2626; font-weight: 600; font-size: 0.95rem; margin: 0 0 1.25rem; }
    .stock .dot { width: 9px; height: 9px; border-radius: 50%; background: #059669; display: inline-block; }

    .cta { width: 100%; border: none; color: #fff; font-size: 1.15rem; font-weight: 700; font-family: inherit; padding: 1rem; border-radius: 12px; cursor: pointer; transition: filter .15s; }
    .cta:hover { filter: brightness(0.95); }

    .pay { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin: 1.1rem 0 1.5rem; }
    .pay-label { color: #6b7280; font-size: 0.85rem; margin-left: 0.25rem; }
    .pay-logo { height: 30px; width: auto; display: block; }

    .trust-card { background: #f4f4f5; border-radius: 16px; padding: 1.1rem 1.25rem; display: flex; flex-direction: column; gap: 0.9rem; margin-bottom: 1.5rem; }
    .trust-row { display: flex; align-items: center; gap: 0.75rem; font-size: 0.98rem; color: #374151; }
    .trust-row .t-ic { width: 26px; height: 26px; flex: 0 0 auto; color: #4b5563; }
    .trust-row .t-ic svg { width: 100%; height: 100%; }
    .trust-row .t-emoji { font-size: 1.25rem; width: 26px; text-align: center; }

    .review { display: flex; gap: 0.9rem; align-items: center; background: #fafafa; border: 1px solid #f0f0f0; border-radius: 14px; padding: 1rem 1.25rem; }
    .review .avatar-ic { width: 52px; height: 52px; border-radius: 50%; background: #e5e7eb; color: #9ca3af; flex: 0 0 auto; display: grid; place-items: center; overflow: hidden; }
    .review .avatar-ic svg { width: 62%; height: 62%; }
    .review .avatar-img { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; flex: 0 0 auto; }
    .review .rtext { color: #374151; line-height: 1.6; margin-bottom: 0.3rem; }
    .review .rname { font-weight: 700; margin-bottom: 0.15rem; }
    .review .rstars { color: #f5a623; letter-spacing: 1px; font-size: 0.95rem; }

    /* الأسئلة: داخل عمود المعلومات — أشرطة كاملة العرض (مطابق للريفرنس) */
    .faq-list { margin-top: 1.5rem; }
    .faq-item { border: 1px solid #eee; border-radius: 12px; overflow: hidden; margin-bottom: 0.6rem; }
    .faq-q { display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; padding: 0.9rem 1rem; cursor: pointer; font-weight: 600; font-size: 0.98rem; user-select: none; }
    .faq-sign { font-size: 1.3rem; color: #059669; line-height: 1; flex: 0 0 auto; }
    .faq-a { padding: 0 1rem 0.9rem; color: #4b5563; line-height: 1.7; font-size: 0.93rem; }

    @media (max-width: 820px) {
      .wrap { grid-template-columns: 1fr; gap: 1.1rem; padding: 0 0 1.25rem; margin-top: 0; }
      .gallery { margin-top: 0; }
      .gallery { position: static; }
      .info { padding: 0 1rem; }
      .main-img { border-radius: 0; aspect-ratio: 4 / 5; }
      .thumbs { padding: 0 1rem 4px; }
      h1.title { font-size: 1.5rem; }
      .price-after { font-size: 1.7rem; }
    }
  `;

  private setImage(i: number) { this.activeImage = i; }
  private toggleFaq(i: number) { this.openFaq = this.openFaq === i ? -1 : i; }

  private handleCta() {
    const c = this.c;
    const action = (c.cta_action || "landing").trim();

    if (action === "link") {
      if (c.cta_link) window.location.href = c.cta_link;
      return;
    }

    if (action === "cart") {
      // الإضافة إلى السلة
      const el =
        document.querySelector(".btn-add-to-cart") ||
        document.querySelector("salla-add-product-button button") ||
        document.querySelector('form[action*="cart"] button[type="submit"]');
      (el as HTMLElement | null)?.click();
      return;
    }

    // الافتراضي: صفحة الهبوط — جرّب المحددات بالترتيب واضغط أول موجود
    const el =
      document.querySelector("button.s-button-primary") ||
      document.querySelector("[data-buy-now]") ||
      document.querySelector(".btn-add-to-cart") ||
      document.querySelector('form[action*="cart"] button[type="submit"]');
    (el as HTMLElement | null)?.click();
  }

  private renderTrustIcon(icon: string) {
    const key = (icon || "").trim();
    if (TRUST_ICONS[key]) return html`<span class="t-ic">${TRUST_ICONS[key]()}</span>`;
    return html`<span class="t-emoji">${key || "✓"}</span>`;
  }

  render() {
    const c = this.c;
    const safeIndex = Math.min(this.activeImage, c.gallery.length - 1);
    const sar = html`<span class="sar">&#x20C1;</span>`;
    const review = c.reviews[0];
    const payMap: [boolean, string, string][] = [
      [c.pay_tabby, PAYMENTS.tabby, "تابي"],
      [c.pay_tamara, PAYMENTS.tamara, "تمارا"],
      [c.pay_mada, PAYMENTS.mada, "مدى"],
      [c.pay_stcpay, PAYMENTS.stcpay, "STC Pay"],
      [c.pay_applepay, PAYMENTS.applepay, "Apple Pay"],
      [c.pay_googlepay, PAYMENTS.googlepay, "Google Pay"],
      [c.pay_mastercard, PAYMENTS.mastercard, "Mastercard"],
    ];

    return html`
      <section style="background:${c.bg_color}">
        <div class="container">

          <!-- منطقة المنتج: عمودان متوازيان -->
          <div class="wrap">
            <div class="gallery">
              <img class="main-img" src="${c.gallery[safeIndex]?.image}" alt="صورة المنتج" />
              <div class="thumbs">
                ${c.gallery.map(
                  (g: any, i: number) => html`
                    <img class="thumb ${i === safeIndex ? "active" : ""}" src="${g.image}"
                         @click=${() => this.setImage(i)} alt="صورة ${i + 1}" />
                  `
                )}
              </div>
            </div>

            <div class="info">
              <div class="rating">
                <span class="stars" style="color:${c.stars_color}">★★★★★</span>
                <span class="rating-num">${c.rating_value}/5</span>
                <span class="rating-count">· تقييم من قبل ${c.rating_count} عميل</span>
              </div>

              <h1 class="title">${c.title}</h1>
              <p class="subtitle">${c.subtitle}</p>

              <ul class="points">
                ${c.points.map((p: any) => html`<li><span class="pt-icon">✓</span><span>${p.text}</span></li>`)}
              </ul>

              <div class="price-row">
                <span class="price-after">${c.price_after} ${sar}</span>
                ${c.price_before ? html`<span class="price-before">${c.price_before} ${sar}</span>` : ""}
                ${c.savings_label ? html`<span class="savings">${c.savings_label} ${sar}</span>` : ""}
              </div>

              <div class="stock"><span class="dot"></span>${c.stock_label}</div>

              <button class="cta" style="background:${c.cta_color}" @click=${() => this.handleCta()}>${c.cta_text}</button>

              <div class="pay">
                <span class="pay-label">الدفع الآمن:</span>
                ${payMap.map(([on, src, alt]) => (on ? html`<img class="pay-logo" src="${src}" alt="${alt}" />` : ""))}
              </div>

              <div class="trust-card">
                ${c.trust.map((t: any) => html`<div class="trust-row">${this.renderTrustIcon(t.icon)}<span>${t.text}</span></div>`)}
              </div>

              ${review
                ? html`
                  <div class="review">
                    ${review.avatar
                      ? html`<img class="avatar-img" src="${review.avatar}" alt="${review.name}" />`
                      : html`<span class="avatar-ic">${personIcon()}</span>`}
                    <div class="rbody">
                      <div class="rtext">${review.text}</div>
                      <div class="rname">${review.name}</div>
                      <div class="rstars">★★★★★</div>
                    </div>
                  </div>`
                : ""}

              <!-- الأسئلة داخل العمود -->
              <div class="faq-list">
                ${c.faq.map(
                  (item: any, i: number) => html`
                    <div class="faq-item">
                      <div class="faq-q" @click=${() => this.toggleFaq(i)}>
                        <span>${item.q}</span>
                        <span class="faq-sign">${this.openFaq === i ? "−" : "+"}</span>
                      </div>
                      ${this.openFaq === i ? html`<div class="faq-a">${item.a}</div>` : ""}
                    </div>
                  `
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}