import { css, html, LitElement } from "lit";

const SALLA_ICONS_HREF = "https://cdn.salla.network/fonts/sallaicons.css?v=2.0.5";

const KEYWORD_ICONS: Record<string, () => ReturnType<typeof html>> = {
  شحن: () => html`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/></svg>`,
  توصيل: () => KEYWORD_ICONS["شحن"](),
  استرجاع: () => html`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 1 1 2.3 5.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M4 18v-4h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  ضمان: () => html`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  امان: () => html`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.6"/></svg>`,
  دفع: () => KEYWORD_ICONS["امان"](),
  دعم: () => html`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13v-1a7 7 0 0 1 14 0v1" stroke="currentColor" stroke-width="1.6"/><rect x="3.5" y="13" width="3.5" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/><rect x="17" y="13" width="3.5" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/></svg>`,
  تقييم: () => html`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l2.6 5.6 6 .6-4.5 4 1.3 6-5.4-3.2L6.6 19l1.3-6-4.5-4 6-.6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
};

const DEFAULT_FEATURES = [
  {
    is_icon: true,
    icon: "sicon-shipping-fast",
    icon_color: "#059669",
    image: "",
    title: "شحن سريع",
    text: "توصيل خلال يومين لجميع مدن المملكة، مع إمكانية تتبّع الطلب.",
  },
  {
    is_icon: true,
    icon: "sicon-shield-check",
    icon_color: "#1d4ed8",
    image: "",
    title: "دفع آمن",
    text: "تابي ومدى و STC Pay وبطاقات بنكية، لإتمام الطلب براحة.",
  },
  {
    is_icon: true,
    icon: "sicon-headset",
    icon_color: "#7c3aed",
    image: "",
    title: "دعم متواصل",
    text: "فريق جاهز للرد على استفساراتك قبل الشراء وبعده.",
  },
  {
    is_icon: true,
    icon: "sicon-refund",
    icon_color: "#d97706",
    image: "",
    title: "استرجاع سهل",
    text: "إرجاع مجاني خلال 14 يوم إذا لم يُفتح المنتج.",
  },
];

type Feature = {
  isIcon: boolean;
  image: string;
  icon: string;
  iconColor: string;
  title: string;
  text: string;
};

export default class StoreFeatures extends LitElement {
  static properties = {
    config: { type: Object },
  };

  config?: Record<string, any>;

  private get c() {
    const cfg = this.config || {};
    const features = Array.isArray(cfg.features) && cfg.features.length ? cfg.features : DEFAULT_FEATURES;
    return {
      bg_color: this.safeColor(cfg.bg_color, "#f4f4f5"),
      title: cfg.title == null ? "مميزات المتجر" : this.asText(cfg.title),
      subtitle:
        cfg.subtitle == null
          ? "نلتزم بخدمة واضحة من لحظة الطلب حتى الاستلام."
          : this.asText(cfg.subtitle),
      features: features.map((item: Record<string, unknown>) => this.normalize(item)).filter((item: Feature) => item.title),
    };
  }

  static styles = css`
    :host {
      display: block;
      direction: rtl;
      font-family: "IBM Plex Sans Arabic", "Tajawal", system-ui, sans-serif;
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

  protected updated() {
    const root = this.shadowRoot;
    if (!root || root.querySelector('link[data-salla-icons="true"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = SALLA_ICONS_HREF;
    link.dataset.sallaIcons = "true";
    root.prepend(link);
  }

  private asText(value: unknown): string {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      const lang =
        (window as Window & { Salla?: { lang?: { getLocale?: () => string } } }).Salla?.lang?.getLocale?.() || "ar";
      const obj = value as Record<string, string>;
      return obj[lang] || obj.ar || obj.en || "";
    }
    return String(value);
  }

  private safeColor(value: unknown, fallback: string): string {
    const color = this.asText(value).trim();
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color) ? color : fallback;
  }

  private isOn(value: unknown, fallback: boolean): boolean {
    if (value === undefined || value === null || value === "") return fallback;
    if (value === false || value === 0 || value === "0" || value === "false") return false;
    return true;
  }

  private field(item: Record<string, unknown>, key: string): unknown {
    if (item[key] != null && item[key] !== "") return item[key];
    const prefixed = item[`features.${key}`];
    if (prefixed != null && prefixed !== "") return prefixed;
    return item[key];
  }

  private normalize(item: Record<string, unknown>): Feature {
    const icon = this.asText(this.field(item, "icon")).trim() || "sicon-star2";
    return {
      isIcon: this.isOn(this.field(item, "is_icon"), true),
      image: this.asText(this.field(item, "image")).trim(),
      icon,
      iconColor: this.safeColor(this.field(item, "icon_color"), "#059669"),
      title: this.asText(this.field(item, "title")).trim(),
      text: this.asText(this.field(item, "text") ?? this.field(item, "sub_title")).trim(),
    };
  }

  private hexToRgba(hex: string, opacity: number): string {
    let value = hex.slice(1);
    if (value.length === 3) value = value.split("").map((c) => c + c).join("");
    const intValue = Number.parseInt(value, 16);
    const r = (intValue >> 16) & 255;
    const g = (intValue >> 8) & 255;
    const b = intValue & 255;
    return `rgba(${r},${g},${b},${opacity})`;
  }

  private siconClass(icon: string): string {
    const match = icon.match(/^(sicon-[a-z0-9-]+)$/i);
    return match ? match[1] : "";
  }

  private renderMedia(feature: Feature) {
    if (!feature.isIcon && feature.image) {
      return html`<img src="${feature.image}" alt="" />`;
    }

    const sicon = this.siconClass(feature.icon);
    if (sicon) {
      return html`<i class="${sicon}" style="color:${feature.iconColor}" aria-hidden="true"></i>`;
    }

    const keyword = KEYWORD_ICONS[feature.icon];
    if (keyword) return keyword();
    return html`<span class="emoji" aria-hidden="true">${feature.icon || "✓"}</span>`;
  }

  render() {
    const c = this.c;
    if (!c.features.length) return html``;

    return html`
      <section class="section" style="background:${c.bg_color}" aria-label="${c.title}">
        <div class="container">
          ${c.title || c.subtitle
            ? html`
                <div class="head">
                  ${c.title ? html`<h2>${c.title}</h2>` : ""}
                  ${c.subtitle ? html`<p>${c.subtitle}</p>` : ""}
                </div>
              `
            : ""}
          <div class="grid">
            ${c.features.map(
              (feature: Feature) => html`
                <article class="card">
                  <div
                    class="media"
                    style="${feature.isIcon ? `background:${this.hexToRgba(feature.iconColor, 0.12)};color:${feature.iconColor}` : ""}"
                  >
                    ${this.renderMedia(feature)}
                  </div>
                  <h3>${feature.title}</h3>
                  ${feature.text ? html`<p>${feature.text}</p>` : ""}
                </article>
              `
            )}
          </div>
        </div>
      </section>
    `;
  }
}
