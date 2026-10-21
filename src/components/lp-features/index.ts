import { css, html, LitElement, nothing } from "lit";
import { baseStyles } from "../../shared/styles";
import { ctaBlock, readCta } from "../../shared/cta";
import { firstImageSide, readRows, rowsStyles, rowsTemplate, type Row } from "../../shared/rows";
import { PLACEHOLDER_IMAGE, color, direction, hexToRgba, isOn, text, textOr } from "../../shared/utils";

const DEFAULT_ROWS: Row[] = [
  {
    image: "",
    title: "تصميم عملي يرافقك في كل مكان",
    text: "حجم مناسب للحقيبة وعبوة محكمة تحافظ على جودة المنتج.",
    points: ["عبوة مقاومة للتسريب", "سهل الحمل والاستخدام"],
  },
  {
    image: "",
    title: "جودة مختبرة قبل أن تصلك",
    text: "كل دفعة تمر بفحص جودة دقيق لتحصل على نفس التجربة في كل مرة.",
    points: ["فحص جودة لكل دفعة", "مصنوع وفق أعلى المعايير"],
  },
];

const DEFAULT_INCLUDED = "عبوة المنتج الأساسية\nعيّنة إضافية مجانية\nدليل الاستخدام\nتغليف هدية أنيق";

/** Features: product capabilities as alternating rows, an optional "what's included" panel and a CTA. */
export default class LpFeatures extends LitElement {
  static properties = { config: { type: Object } };
  config?: Record<string, unknown>;

  static styles = [
    baseStyles,
    rowsStyles,
    css`
      .included {
        display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;
        margin-top: 3.5rem; padding: 2.25rem; border-radius: var(--lp-radius);
      }
      .included h3 { margin: 0 0 0.6rem; font-size: 1.6rem; font-weight: 700; color: var(--lp-heading); }
      .included p { margin: 0 0 1rem; color: #4b5563; line-height: 1.8; }
      .included img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: calc(var(--lp-radius) - 4px); background: #e5e7eb; }
      .included.img-start .included-media { order: -1; }
      @media (max-width: 768px) {
        .included { grid-template-columns: 1fr; gap: 1.25rem; padding: 1.25rem; margin-top: 2.25rem; }
        .included.img-start .included-media { order: 0; }
        .included h3 { font-size: 1.3rem; }
      }
    `,
  ];

  private get data() {
    const cfg = this.config || {};
    const accent = color(cfg.accent_color, "#1a8917");
    return {
      bg: color(cfg.bg_color, "#ffffff"),
      accent,
      title: textOr(cfg.heading, "مزايا تصنع الفرق"),
      subtitle: textOr(cfg.subheading, "صُمّم بعناية ليمنحك أفضل تجربة ممكنة."),
      first: firstImageSide(cfg.first_image_side),
      rows: readRows(cfg.features, "features", DEFAULT_ROWS),
      included: {
        enabled: isOn(cfg.show_included, true),
        bg: color(cfg.included_bg_color, "#f4f4f5"),
        title: textOr(cfg.included_title, "ماذا يوجد داخل العلبة؟"),
        text: textOr(cfg.included_text, "كل ما تحتاجه لتبدأ مباشرة بعد الاستلام."),
        items: (cfg.included_items === undefined || cfg.included_items === null ? DEFAULT_INCLUDED : text(cfg.included_items))
          .split(/\r?\n/)
          .map((s) => s.trim())
          .filter(Boolean),
        image: text(cfg.included_image).trim() || PLACEHOLDER_IMAGE,
        imageStart: firstImageSide(cfg.included_image_side) === "start",
      },
      cta: readCta(cfg, { text: "اطلب الآن" }),
    };
  }

  render() {
    const d = this.data;
    const inc = d.included;
    return html`
      <section class="section" dir="${direction()}" style="background:${d.bg}" aria-label="${d.title || nothing}">
        <div class="container">
          ${d.title || d.subtitle
            ? html`<div class="head">
                ${d.title ? html`<h2>${d.title}</h2>` : nothing}
                ${d.subtitle ? html`<p>${d.subtitle}</p>` : nothing}
              </div>`
            : nothing}
          ${d.rows.length ? rowsTemplate(d.rows, d.first, d.accent) : nothing}
          ${inc.enabled
            ? html`<div class="included ${inc.imageStart ? "img-start" : ""}" style="background:${inc.bg}">
                <div>
                  ${inc.title ? html`<h3>${inc.title}</h3>` : nothing}
                  ${inc.text ? html`<p>${inc.text}</p>` : nothing}
                  ${inc.items.length
                    ? html`<ul class="checks">
                        ${inc.items.map(
                          (p) => html`<li><span class="tick" style="color:${d.accent};background:${hexToRgba(d.accent, 0.12)}" aria-hidden="true">✓</span>${p}</li>`
                        )}
                      </ul>`
                    : nothing}
                </div>
                <div class="included-media">
                  <img src="${inc.image}" alt="${inc.title}" loading="lazy" decoding="async" />
                </div>
              </div>`
            : nothing}
          ${ctaBlock(d.cta)}
        </div>
      </section>
    `;
  }
}
