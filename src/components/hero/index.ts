import { css, html, LitElement } from "lit";
import { PAYMENTS } from "../../shared/payments";
import { stars } from "../../shared/cta";
import { PLACEHOLDER_IMAGE, color, contrastText, direction, ensureSallaIcons, SALLA_ICONS_CSS, isOn, item, list, number, option, safeUrl, t, text } from "../../shared/utils";


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
    ensureSallaIcons();
  }

  private get c() {
    const cfg = (this.config || {}) as Record<string, any>;
    // Text fields may be plain strings or {ar, en} objects (multilanguage fields).
    const s = (v: unknown, fallback: string) => text(v).trim() || fallback;
    const rows = (v: unknown, name: string, keys: string[]) =>
      list(v).map((r) => Object.fromEntries(keys.map((k) => [k, k === "icon" ? item(r, name, k) : text(item(r, name, k))])));
    return {
      bg_color: color(cfg.bg_color, "#ffffff"),
      gallery:
        list(cfg.gallery).length
          ? rows(cfg.gallery, "gallery", ["image"])
          : [{ image: PLACEHOLDER_IMAGE }],
      rating_value: cfg.rating_value || "4.8",
      rating_count: cfg.rating_count || "5000",
      stars_color: color(cfg.stars_color, "#f5a623"),
      title: s(cfg.title, "عطر فاخر يدوم طويلاً — رائحة تبقى معك طوال اليوم"),
      subtitle: s(cfg.subtitle, "تركيبة شرقية أصيلة بخلاصة العود والمسك، مصممة لتترك أثراً لا يُنسى."),
      points:
        list(cfg.points).length
          ? rows(cfg.points, "points", ["text"])
          : [{ text: "ثبات يدوم حتى 12 ساعة" }, { text: "مكوّنات طبيعية 100%" }, { text: "شحن مجاني لجميع مدن المملكة" }],
      price_after: cfg.price_after || "149",
      price_before: cfg.price_before || "249",
      savings_label: s(cfg.savings_label, ""),
      cta_text: s(cfg.cta_text, "اشترِ الآن"),
      cta_color: color(cfg.cta_color, "#1a8917"),
      show_trust: isOn(cfg.show_trust, true),
      show_review: isOn(cfg.show_review, true),
      show_faq: isOn(cfg.show_faq, true),
      cta_action: option(cfg.cta_action, "landing"),
      cta_link: safeUrl(cfg.cta_link),
      stock_label: s(cfg.stock_label, ""),
      pay_tabby: cfg.pay_tabby ?? true,
      pay_tamara: cfg.pay_tamara ?? false,
      pay_mada: cfg.pay_mada ?? true,
      pay_stcpay: cfg.pay_stcpay ?? true,
      pay_applepay: cfg.pay_applepay ?? true,
      pay_googlepay: cfg.pay_googlepay ?? false,
      pay_mastercard: cfg.pay_mastercard ?? true,
      trust:
        list(cfg.trust).length
          ? rows(cfg.trust, "trust", ["icon", "text"])
          : [
              { icon: "شحن", text: "شحن سريع خلال يومين" },
              { icon: "ضمان", text: "ضمان ذهبي — رضاك أولويتنا" },
              { icon: "دعم", text: "دعم فني على مدار الساعة" },
              { icon: "استرجاع", text: "استرجاع مجاني خلال 14 يوم" },
            ],
      reviews:
        list(cfg.reviews).length
          ? rows(cfg.reviews, "reviews", ["avatar", "name", "text"])
          : [{ avatar: "", name: "محمد العتيبي", text: "رائحة فخمة وثباتها ممتاز، وصلني بسرعة. أنصح فيه بشدة." }],
      faq:
        list(cfg.faq).length
          ? rows(cfg.faq, "faq", ["q", "a"])
          : [
              { q: "كم يدوم ثبات العطر؟", a: "يدوم حتى 12 ساعة حسب نوع البشرة والاستخدام." },
              { q: "كم تستغرق مدة الشحن؟", a: "من يوم إلى يومين عمل داخل المملكة، مع إمكانية التتبّع." },
              { q: "هل يمكن الإرجاع؟", a: "نعم، إرجاع مجاني خلال 14 يوم إذا لم يُفتح المنتج." },
            ],
    };
  }

  static styles = css`
    :host { display: block; font-family: inherit; color: #1f2937; }
    * { box-sizing: border-box; }
    .sar { font-style: normal; margin-inline-start: 2px; font-size: 0.85em; }

    .container { max-width: 1140px; margin: 0 auto; }

    /* منطقة المنتج: عمودان */
    .wrap { padding: 1.5rem 1rem 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: start; }

    .gallery { position: sticky; top: 1rem; padding-top: 0.35rem; }
    .main-img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; border-radius: 14px; background: #f3f4f6; display: block; }
    .thumbs { display: flex; gap: 0.5rem; margin-top: 0.75rem; overflow-x: auto; padding-bottom: 4px; }
    .thumb-btn { padding: 0; border: 0; background: none; flex: 0 0 auto; cursor: pointer; border-radius: 10px; }
    .thumb-btn:focus-visible { outline: 2px solid #111827; outline-offset: 2px; }
    .thumb { width: 72px; height: 72px; flex: 0 0 auto; object-fit: cover; border-radius: 10px; cursor: pointer; border: 2px solid transparent; transition: border-color .15s, opacity .15s; opacity: 0.7; }
    .thumb:hover { opacity: 1; }
    .thumb.active { border-color: #111827; opacity: 1; }

    .info { min-width: 0; }
    .rating { display: flex; align-items: center; gap: 0.4rem; font-size: 0.95rem; margin-bottom: 0.75rem; }
    .stars { display: inline-flex; gap: 2px; }
    .stars svg { width: 18px; height: 18px; display: block; }
    .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; }
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

    .cta { width: 100%; border: none; font-size: 1.15rem; font-weight: 700; font-family: inherit; padding: 1rem; border-radius: 12px; cursor: pointer; transition: filter .15s; }
    .cta:hover { filter: brightness(0.94); }
    .cta:focus-visible { outline: 3px solid currentColor; outline-offset: 3px; }

    .pay { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin: 1.1rem 0 1.5rem; }
    .pay-label { color: #6b7280; font-size: 0.85rem; margin-inline-end: 0.25rem; }
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
    .review .rstars svg { width: 15px; height: 15px; }

    /* الأسئلة: داخل عمود المعلومات — أشرطة كاملة العرض (مطابق للريفرنس) */
    .faq-list { margin-top: 1.5rem; }
    .faq-item { border: 1px solid #eee; border-radius: 12px; overflow: hidden; margin-bottom: 0.6rem; }
    .faq-q { width: 100%; background: none; border: 0; font: inherit; color: inherit; text-align: start; display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; padding: 0.9rem 1rem; cursor: pointer; font-weight: 600; font-size: 0.98rem; }
    .faq-sign { font-size: 1.3rem; color: #059669; line-height: 1; flex: 0 0 auto; }
    .faq-a { padding: 0 1rem 0.9rem; color: #4b5563; line-height: 1.7; font-size: 0.93rem; }

    @media (max-width: 820px) {
      .wrap { grid-template-columns: 1fr; gap: 1.1rem; padding: 0 0 1.25rem; margin-top: 0; }
      .gallery { margin-top: 0; padding-top: 0; }
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

    // Buy / add to cart: use the purchase control the page already renders.
    const selectors =
      action === "cart"
        ? [".btn-add-to-cart", "salla-add-product-button button", 'form[action*="cart"] button[type="submit"]']
        : [
            "salla-quick-buy button",
            "[data-buy-now]",
            "button.s-button-primary",
            "salla-add-product-button button",
            ".btn-add-to-cart",
            'form[action*="cart"] button[type="submit"]',
          ];
    const el = selectors.map((sel) => document.querySelector(sel)).find(Boolean) as HTMLElement | undefined;
    if (el) {
      el.click();
      return;
    }
    // No purchase control on this page: fall back to the merchant's link, if any.
    if (c.cta_link) window.location.href = c.cta_link;
  }

  private renderTrustIcon(icon: unknown) {
    const key = option(icon, "").trim();
    if (TRUST_ICONS[key]) return html`<span class="t-ic">${TRUST_ICONS[key]()}</span>`;
    return html`<span class="t-emoji">${key || "✓"}</span>`;
  }

  render() {
    const c = this.c;
    const safeIndex = Math.min(this.activeImage, c.gallery.length - 1);
    const sar = html`<i class="sar sicon-sar" aria-hidden="true"></i>`;
    const review = c.reviews[0];
    const payMap: [boolean, string, string][] = [
      [c.pay_tabby, PAYMENTS.tabby, "Tabby"],
      [c.pay_tamara, PAYMENTS.tamara, "Tamara"],
      [c.pay_mada, PAYMENTS.mada, "mada"],
      [c.pay_stcpay, PAYMENTS.stcpay, "STC Pay"],
      [c.pay_applepay, PAYMENTS.applepay, "Apple Pay"],
      [c.pay_googlepay, PAYMENTS.googlepay, "Google Pay"],
      [c.pay_mastercard, PAYMENTS.mastercard, "Mastercard"],
    ];

    return html`
      <link rel="stylesheet" href="${SALLA_ICONS_CSS}" />
      <section dir="${direction()}" style="background:${c.bg_color}">
        <div class="container">

          <!-- منطقة المنتج: عمودان متوازيان -->
          <div class="wrap">
            <div class="gallery">
              <img class="main-img" src="${c.gallery[safeIndex]?.image || PLACEHOLDER_IMAGE}" alt="${c.title}" />
              <div class="thumbs">
                ${c.gallery.map(
                  (g: any, i: number) => html`
                    <button class="thumb-btn" type="button" aria-label="${t("image", { n: i + 1 })}" aria-pressed="${i === safeIndex}" @click=${() => this.setImage(i)}>
                      <img class="thumb ${i === safeIndex ? "active" : ""}" src="${g.image}" alt="" loading="lazy" />
                    </button>
                  `
                )}
              </div>
            </div>

            <div class="info">
              <div class="rating">
                ${stars(number(c.rating_value, 5, 0, 5), c.stars_color)}
                <span class="sr-only">${t("rating", { value: c.rating_value })}</span>
                <span class="rating-num" aria-hidden="true">${c.rating_value}/5</span>
                <span class="rating-count">· ${t("ratedBy", { count: c.rating_count })}</span>
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

              ${c.stock_label ? html`<div class="stock"><span class="dot"></span>${c.stock_label}</div>` : ""}

              <button class="cta" type="button" style="background:${c.cta_color};color:${contrastText(c.cta_color)}" @click=${() => this.handleCta()}>${c.cta_text}</button>

              <div class="pay">
                <span class="pay-label">${t("securePayment")}</span>
                ${payMap.map(([on, src, alt]) => (on ? html`<img class="pay-logo" src="${src}" alt="${alt}" loading="lazy" />` : ""))}
              </div>

              ${c.show_trust && c.trust.length
                ? html`<div class="trust-card">
                    ${c.trust.map((row: any) => html`<div class="trust-row">${this.renderTrustIcon(row.icon)}<span>${row.text}</span></div>`)}
                  </div>`
                : ""}

              ${c.show_review && review
                ? html`
                  <div class="review">
                    ${review.avatar
                      ? html`<img class="avatar-img" src="${review.avatar}" alt="${review.name}" />`
                      : html`<span class="avatar-ic">${personIcon()}</span>`}
                    <div class="rbody">
                      <div class="rtext">${review.text}</div>
                      <div class="rname">${review.name}</div>
                      <div class="rstars">${stars(5, c.stars_color)}</div>
                    </div>
                  </div>`
                : ""}

              ${c.show_faq && c.faq.length
                ? html`<div class="faq-list">
                ${c.faq.map(
                  (item: any, i: number) => html`
                    <div class="faq-item">
                      <button class="faq-q" type="button" aria-expanded="${this.openFaq === i}" @click=${() => this.toggleFaq(i)}>
                        <span>${item.q}</span>
                        <span class="faq-sign" aria-hidden="true">${this.openFaq === i ? "−" : "+"}</span>
                      </button>
                      ${this.openFaq === i ? html`<div class="faq-a">${item.a}</div>` : ""}
                    </div>
                  `
                )}
              </div>`
                : ""}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}