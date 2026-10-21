import { css, html, LitElement, nothing } from "lit";
import { baseStyles } from "../../shared/styles";
import { SALLA_ICONS_CSS, color, direction, ensureSallaIcons, hexToRgba, isOn, item, list, t, text, textOr } from "../../shared/utils";

const DEFAULT_STEPS = [
  { icon: "sicon-shopping-bag", title: "اطلب بسهولة", text: "اختر الكمية المناسبة وأكمل الطلب خلال أقل من دقيقة." },
  { icon: "sicon-shipping-fast", title: "استلم بسرعة", text: "يصلك الطلب خلال يومين إلى باب بيتك مع إمكانية التتبّع." },
  { icon: "sicon-smile", title: "استمتع بالنتيجة", text: "لاحظ الفرق من أول استخدام، أو استرجع مبلغك بكل سهولة." },
];

type Step = { icon: string; title: string; text: string };

/**
 * Transformation steps: a short "how it works / before → after" journey.
 * Fits the "problem → solution" part of a landing page.
 */
export default class LpTransformation extends LitElement {
  static properties = { config: { type: Object } };
  config?: Record<string, unknown>;

  connectedCallback() {
    super.connectedCallback();
    ensureSallaIcons();
  }

  static styles = [
    baseStyles,
    css`
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
    `,
  ];

  private get data() {
    const cfg = this.config || {};
    const rows = list(cfg.steps);
    const steps: Step[] = (rows.length ? rows : DEFAULT_STEPS)
      .map((row) => ({
        icon: text(item(row, "steps", "icon")).trim(),
        title: text(item(row, "steps", "title")).trim(),
        text: text(item(row, "steps", "text")).trim(),
      }))
      .filter((s) => s.title || s.text);
    return {
      bg: color(cfg.bg_color, "#ffffff"),
      accent: color(cfg.accent_color, "#1a8917"),
      title: textOr(cfg.heading, "كيف يغيّر المنتج يومك؟"),
      subtitle: textOr(cfg.subheading, "ثلاث خطوات بسيطة تفصلك عن النتيجة التي تبحث عنها."),
      showNumbers: isOn(cfg.show_numbers, true),
      showConnector: isOn(cfg.show_connector, true),
      steps,
    };
  }

  private renderIcon(icon: string) {
    if (/^sicon-[a-z0-9-]+$/i.test(icon)) return html`<i class="${icon}" aria-hidden="true"></i>`;
    return html`<span class="emoji" aria-hidden="true">${icon || "✓"}</span>`;
  }

  render() {
    const d = this.data;
    if (!d.steps.length) return nothing;
    const dir = direction();
    return html`
      <link rel="stylesheet" href="${SALLA_ICONS_CSS}" />
      <section class="section" dir="${dir}" style="background:${d.bg}" aria-label="${d.title || nothing}">
        <div class="container">
          ${d.title || d.subtitle
            ? html`<div class="head">
                ${d.title ? html`<h2>${d.title}</h2>` : nothing}
                ${d.subtitle ? html`<p>${d.subtitle}</p>` : nothing}
              </div>`
            : nothing}
          <ol
            class="steps ${d.showConnector ? "connected" : ""}"
            style="--cols:${Math.min(d.steps.length, 4)};--line:${hexToRgba(d.accent, 0.35)}"
          >
            ${d.steps.map(
              (s, i) => html`<li class="step">
                <div class="icon" style="background:${hexToRgba(d.accent, 0.1)};color:${d.accent}">${this.renderIcon(s.icon)}</div>
                <div>
                  ${d.showNumbers ? html`<div class="num" style="color:${d.accent}">${t("step", { n: i + 1 })}</div>` : nothing}
                  ${s.title ? html`<h3>${s.title}</h3>` : nothing}
                  ${s.text ? html`<p>${s.text}</p>` : nothing}
                </div>
              </li>`
            )}
          </ol>
        </div>
      </section>
    `;
  }
}
