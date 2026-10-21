import { html, LitElement, nothing } from "lit";
import { baseStyles } from "../../shared/styles";
import { firstImageSide, readRows, rowsStyles, rowsTemplate, type Row } from "../../shared/rows";
import { color, direction, textOr } from "../../shared/utils";

const DEFAULT_ROWS: Row[] = [
  {
    image: "",
    title: "ثقة تدوم معك طوال اليوم",
    text: "تركيبة مدروسة تمنحك نتيجة واضحة تلاحظها من أول استخدام، وتبقى معك من الصباح حتى المساء.",
    points: [],
  },
  {
    image: "",
    title: "مكوّنات طبيعية تناسب الجميع",
    text: "اخترنا مكوّنات لطيفة وآمنة للاستخدام اليومي، بدون إضافات تزعجك.",
    points: [],
  },
];

/** Benefits: what the customer gains, as alternating image / text rows. */
export default class LpBenefits extends LitElement {
  static properties = { config: { type: Object } };
  config?: Record<string, unknown>;

  static styles = [baseStyles, rowsStyles];

  private get data() {
    const cfg = this.config || {};
    return {
      bg: color(cfg.bg_color, "#f4f4f5"),
      accent: color(cfg.accent_color, "#1a8917"),
      title: textOr(cfg.heading, "لماذا يحبّه عملاؤنا؟"),
      subtitle: textOr(cfg.subheading, "فوائد حقيقية تلاحظها في حياتك اليومية."),
      first: firstImageSide(cfg.first_image_side),
      rows: readRows(cfg.benefits, "benefits", DEFAULT_ROWS),
    };
  }

  render() {
    const d = this.data;
    if (!d.rows.length) return nothing;
    return html`
      <section class="section" dir="${direction()}" style="background:${d.bg}" aria-label="${d.title || nothing}">
        <div class="container">
          ${d.title || d.subtitle
            ? html`<div class="head">
                ${d.title ? html`<h2>${d.title}</h2>` : nothing}
                ${d.subtitle ? html`<p>${d.subtitle}</p>` : nothing}
              </div>`
            : nothing}
          ${rowsTemplate(d.rows, d.first, d.accent)}
        </div>
      </section>
    `;
  }
}
