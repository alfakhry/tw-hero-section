import { css, html, LitElement, nothing } from "lit";
import { baseStyles } from "../../shared/styles";
import { ctaBlock, readCta } from "../../shared/cta";
import { PLACEHOLDER_IMAGE, color, direction, hexToRgba, isOn, item, list, option, t, text, textOr } from "../../shared/utils";

type Mark = "yes" | "no" | "partial";
type Row = { feature: string; brand: Mark; c1: Mark; c2: Mark };

const DEFAULT_ROWS: Row[] = [
  { feature: "مكوّنات طبيعية بالكامل", brand: "yes", c1: "no", c2: "partial" },
  { feature: "ثبات يدوم أكثر من 10 ساعات", brand: "yes", c1: "partial", c2: "no" },
  { feature: "ضمان استرجاع المبلغ", brand: "yes", c1: "partial", c2: "partial" },
  { feature: "شحن مجاني وسريع", brand: "yes", c1: "no", c2: "no" },
  { feature: "خدمة عملاء على مدار الساعة", brand: "yes", c1: "partial", c2: "no" },
];

function mark(value: unknown, fallback: Mark): Mark {
  const v = option(value, fallback);
  return v === "yes" || v === "no" || v === "partial" ? v : fallback;
}

/** Comparison: your product against two alternatives, with an optional image beside the table. */
export default class LpComparison extends LitElement {
  static properties = { config: { type: Object } };
  config?: Record<string, unknown>;

  static styles = [
    baseStyles,
    css`
      .layout { display: grid; grid-template-columns: 1fr 1.25fr; gap: 3rem; align-items: center; }
      .layout.no-image { grid-template-columns: 1fr; max-width: 820px; margin-inline: auto; }
      .media img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; border-radius: var(--lp-radius); background: #e5e7eb; }

      table { width: 100%; border-collapse: collapse; table-layout: fixed; }
      th, td { padding: 0.95rem 0.6rem; text-align: center; vertical-align: middle; }
      th { font-weight: 700; font-size: 1.05rem; color: #4b5563; }
      th.feature-h { text-align: start; width: 40%; }
      thead tr { border-bottom: 2px solid #111827; }
      tbody tr + tr td { border-top: 1px solid #e5e7eb; }
      tbody tr:not(:last-child) td { border-bottom: 1px solid #e5e7eb; }
      td.feature { text-align: start; color: #374151; line-height: 1.55; font-size: 0.98rem; }
      .brand { background: var(--brand-bg); }
      thead .brand { border-radius: 12px 12px 0 0; }
      tbody tr:last-child .brand { border-radius: 0 0 12px 12px; }
      .brand-name { color: var(--brand); font-size: 1.1rem; }
      .brand-logo { max-height: 40px; max-width: 100%; margin-inline: auto; object-fit: contain; }
      .ic { width: 26px; height: 26px; display: inline-block; vertical-align: middle; }
      .ic.small { width: 20px; height: 20px; }

      @media (max-width: 768px) {
        .layout { grid-template-columns: 1fr; gap: 1.5rem; }
        th, td { padding: 0.75rem 0.35rem; }
        th { font-size: 0.9rem; }
        td.feature { font-size: 0.88rem; }
        .media img { aspect-ratio: 4 / 3; }
      }
    `,
  ];

  private get data() {
    const cfg = this.config || {};
    const rows = list(cfg.rows);
    return {
      bg: color(cfg.bg_color, "#ffffff"),
      accent: color(cfg.accent_color, "#1a8917"),
      title: textOr(cfg.heading, "لماذا نحن الخيار الأفضل؟"),
      subtitle: textOr(cfg.subheading, "قارن بنفسك بين منتجنا والبدائل المنتشرة في السوق."),
      showImage: isOn(cfg.show_image, true),
      image: text(cfg.image).trim() || PLACEHOLDER_IMAGE,
      brandName: textOr(cfg.brand_name, "منتجنا"),
      brandLogo: text(cfg.brand_logo).trim(),
      c1: textOr(cfg.competitor_1, "منتج آخر"),
      c2: textOr(cfg.competitor_2, "البدائل التقليدية"),
      rows: rows.length
        ? rows
            .map((r) => ({
              feature: text(item(r, "rows", "feature")).trim(),
              brand: mark(item(r, "rows", "brand"), "yes"),
              c1: mark(item(r, "rows", "c1"), "no"),
              c2: mark(item(r, "rows", "c2"), "no"),
            }))
            .filter((r) => r.feature)
        : DEFAULT_ROWS,
      cta: readCta(cfg, { text: "اطلب الآن", enabled: false }),
    };
  }

  private icon(m: Mark, accent: string, isBrand: boolean) {
    const label = t(m === "yes" ? "yes" : m === "no" ? "no" : "partial");
    if (m === "yes") {
      return isBrand
        ? html`<svg class="ic" viewBox="0 0 24 24" fill="none" role="img" aria-label="${label}"><circle cx="12" cy="12" r="10" stroke="${accent}" stroke-width="2"/><path d="M7.5 12.5l3 3 6-6.5" stroke="${accent}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        : html`<svg class="ic small" viewBox="0 0 24 24" fill="none" role="img" aria-label="${label}"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="#6b7280" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
    if (m === "no") {
      return html`<svg class="ic small" viewBox="0 0 24 24" fill="none" role="img" aria-label="${label}"><path d="M6 6l12 12M18 6L6 18" stroke="#9ca3af" stroke-width="2.4" stroke-linecap="round"/></svg>`;
    }
    return html`<svg class="ic small" viewBox="0 0 24 24" fill="none" role="img" aria-label="${label}"><path d="M6 12h12" stroke="#9ca3af" stroke-width="2.4" stroke-linecap="round"/></svg>`;
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
          <div class="layout ${d.showImage ? "" : "no-image"}" style="--brand:${d.accent};--brand-bg:${hexToRgba(d.accent, 0.09)}">
            ${d.showImage ? html`<div class="media"><img src="${d.image}" alt="${d.brandName}" loading="lazy" decoding="async" /></div>` : nothing}
            <table>
              <thead>
                <tr>
                  <th class="feature-h" scope="col"><span class="sr-only">${t("feature")}</span></th>
                  <th class="brand" scope="col">
                    ${d.brandLogo
                      ? html`<img class="brand-logo" src="${d.brandLogo}" alt="${d.brandName}" />`
                      : html`<span class="brand-name">${d.brandName}</span>`}
                  </th>
                  <th scope="col">${d.c1}</th>
                  <th scope="col">${d.c2}</th>
                </tr>
              </thead>
              <tbody>
                ${d.rows.map(
                  (r) => html`<tr>
                    <td class="feature">${r.feature}</td>
                    <td class="brand">${this.icon(r.brand, d.accent, true)}</td>
                    <td>${this.icon(r.c1, d.accent, false)}</td>
                    <td>${this.icon(r.c2, d.accent, false)}</td>
                  </tr>`
                )}
              </tbody>
            </table>
          </div>
          ${ctaBlock(d.cta)}
        </div>
      </section>
    `;
  }
}
