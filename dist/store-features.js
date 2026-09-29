import { LitElement as g, css as f, html as r } from "lit";
const m = "https://cdn.salla.network/fonts/sallaicons.css?v=2.0.5", c = {
  شحن: () => r`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/></svg>`,
  توصيل: () => c.شحن(),
  استرجاع: () => r`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12a8 8 0 1 1 2.3 5.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M4 18v-4h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  ضمان: () => r`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  امان: () => r`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.6"/></svg>`,
  دفع: () => c.امان(),
  دعم: () => r`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13v-1a7 7 0 0 1 14 0v1" stroke="currentColor" stroke-width="1.6"/><rect x="3.5" y="13" width="3.5" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/><rect x="17" y="13" width="3.5" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/></svg>`,
  تقييم: () => r`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l2.6 5.6 6 .6-4.5 4 1.3 6-5.4-3.2L6.6 19l1.3-6-4.5-4 6-.6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`
}, u = [
  {
    is_icon: !0,
    icon: "sicon-shipping-fast",
    icon_color: "#059669",
    image: "",
    title: "شحن سريع",
    text: "توصيل خلال يومين لجميع مدن المملكة، مع إمكانية تتبّع الطلب."
  },
  {
    is_icon: !0,
    icon: "sicon-shield-check",
    icon_color: "#1d4ed8",
    image: "",
    title: "دفع آمن",
    text: "تابي ومدى و STC Pay وبطاقات بنكية، لإتمام الطلب براحة."
  },
  {
    is_icon: !0,
    icon: "sicon-headset",
    icon_color: "#7c3aed",
    image: "",
    title: "دعم متواصل",
    text: "فريق جاهز للرد على استفساراتك قبل الشراء وبعده."
  },
  {
    is_icon: !0,
    icon: "sicon-refund",
    icon_color: "#d97706",
    image: "",
    title: "استرجاع سهل",
    text: "إرجاع مجاني خلال 14 يوم إذا لم يُفتح المنتج."
  }
], l = class l extends g {
  get c() {
    const t = this.config || {}, e = Array.isArray(t.features) && t.features.length ? t.features : u;
    return {
      bg_color: this.safeColor(t.bg_color, "#f4f4f5"),
      title: t.title == null ? "مميزات المتجر" : this.asText(t.title),
      subtitle: t.subtitle == null ? "نلتزم بخدمة واضحة من لحظة الطلب حتى الاستلام." : this.asText(t.subtitle),
      features: e.map((i) => this.normalize(i)).filter((i) => i.title)
    };
  }
  updated() {
    const t = this.shadowRoot;
    if (!t || t.querySelector('link[data-salla-icons="true"]')) return;
    const e = document.createElement("link");
    e.rel = "stylesheet", e.href = m, e.dataset.sallaIcons = "true", t.prepend(e);
  }
  asText(t) {
    var e, i, o;
    if (!t) return "";
    if (typeof t == "string") return t;
    if (typeof t == "object") {
      const a = ((o = (i = (e = window.Salla) == null ? void 0 : e.lang) == null ? void 0 : i.getLocale) == null ? void 0 : o.call(i)) || "ar", s = t;
      return s[a] || s.ar || s.en || "";
    }
    return String(t);
  }
  safeColor(t, e) {
    const i = this.asText(t).trim();
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(i) ? i : e;
  }
  isOn(t, e) {
    return t == null || t === "" ? e : !(t === !1 || t === 0 || t === "0" || t === "false");
  }
  field(t, e) {
    if (t[e] != null && t[e] !== "") return t[e];
    const i = t[`features.${e}`];
    return i != null && i !== "" ? i : t[e];
  }
  normalize(t) {
    const e = this.asText(this.field(t, "icon")).trim() || "sicon-star2";
    return {
      isIcon: this.isOn(this.field(t, "is_icon"), !0),
      image: this.asText(this.field(t, "image")).trim(),
      icon: e,
      iconColor: this.safeColor(this.field(t, "icon_color"), "#059669"),
      title: this.asText(this.field(t, "title")).trim(),
      text: this.asText(this.field(t, "text") ?? this.field(t, "sub_title")).trim()
    };
  }
  hexToRgba(t, e) {
    let i = t.slice(1);
    i.length === 3 && (i = i.split("").map((d) => d + d).join(""));
    const o = Number.parseInt(i, 16), a = o >> 16 & 255, s = o >> 8 & 255, h = o & 255;
    return `rgba(${a},${s},${h},${e})`;
  }
  siconClass(t) {
    const e = t.match(/^(sicon-[a-z0-9-]+)$/i);
    return e ? e[1] : "";
  }
  renderMedia(t) {
    if (!t.isIcon && t.image)
      return r`<img src="${t.image}" alt="" />`;
    const e = this.siconClass(t.icon);
    if (e)
      return r`<i class="${e}" style="color:${t.iconColor}" aria-hidden="true"></i>`;
    const i = c[t.icon];
    return i ? i() : r`<span class="emoji" aria-hidden="true">${t.icon || "✓"}</span>`;
  }
  render() {
    const t = this.c;
    return t.features.length ? r`
      <section class="section" style="background:${t.bg_color}" aria-label="${t.title}">
        <div class="container">
          ${t.title || t.subtitle ? r`
                <div class="head">
                  ${t.title ? r`<h2>${t.title}</h2>` : ""}
                  ${t.subtitle ? r`<p>${t.subtitle}</p>` : ""}
                </div>
              ` : ""}
          <div class="grid">
            ${t.features.map(
      (e) => r`
                <article class="card">
                  <div
                    class="media"
                    style="${e.isIcon ? `background:${this.hexToRgba(e.iconColor, 0.12)};color:${e.iconColor}` : ""}"
                  >
                    ${this.renderMedia(e)}
                  </div>
                  <h3>${e.title}</h3>
                  ${e.text ? r`<p>${e.text}</p>` : ""}
                </article>
              `
    )}
          </div>
        </div>
      </section>
    ` : r``;
  }
};
l.properties = {
  config: { type: Object }
}, l.styles = f`
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
let n = l;
typeof n < "u" && n.registerSallaComponent("salla-store-features");
export {
  n as default
};
