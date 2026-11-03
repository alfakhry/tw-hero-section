import { css, html, LitElement, nothing } from "lit";
import { baseStyles } from "../../shared/styles";
import { ctaBlock, readCta } from "../../shared/cta";
import { color, direction, isOn, item, list, option, text, textOr } from "../../shared/utils";

type Qa = { q: string; a: string };

const DEFAULT_FAQ: Qa[] = [
  { q: "كم تستغرق مدة الشحن؟", a: "من يوم إلى ثلاثة أيام عمل داخل المملكة، ويصلك رابط لتتبّع الطلب." },
  { q: "هل يمكنني إرجاع المنتج؟", a: "نعم، يمكنك الإرجاع خلال 14 يوماً من الاستلام إذا كان المنتج بحالته الأصلية." },
  { q: "ما طرق الدفع المتاحة؟", a: "مدى، Apple Pay، البطاقات البنكية، والتقسيط عبر تابي وتمارا." },
  { q: "هل المنتج أصلي؟", a: "جميع منتجاتنا أصلية 100% ومضمونة من المصدر." },
  { q: "كيف أتواصل معكم؟", a: "عبر واتساب أو الدردشة في المتجر، وفريقنا يرد خلال دقائق." },
];

/** FAQ: heading and intro on one side, an accessible accordion on the other. */
export default class LpFaq extends LitElement {
  static properties = { config: { type: Object }, open: { state: true } };
  config?: Record<string, unknown>;
  open!: number;

  constructor() {
    super();
    this.open = -1;
  }

  static styles = [
    baseStyles,
    css`
      .layout { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 3.5rem; align-items: start; }
      .layout.stacked { grid-template-columns: 1fr; max-width: 820px; margin-inline: auto; gap: 1.5rem; }
      .intro h2 { margin: 0 0 0.75rem; font-size: 2rem; line-height: 1.3; font-weight: 700; color: var(--lp-heading); }
      .intro p { margin: 0; color: var(--lp-muted); font-size: 1.05rem; line-height: 1.8; }
      .layout.stacked .intro { text-align: center; }
      .list { display: flex; flex-direction: column; }
      .item { border-bottom: 1px solid #e5e7eb; }
      .item:first-child { border-top: 1px solid #e5e7eb; }
      .q {
        width: 100%; display: flex; align-items: center; gap: 0.9rem; padding: 1.1rem 0.25rem;
        background: none; border: 0; font: inherit; font-size: 1.02rem; font-weight: 600; color: #111827;
        text-align: start; cursor: pointer;
      }
      .q:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 6px; }
      .sign { flex: 0 0 auto; width: 24px; height: 24px; position: relative; color: var(--accent); }
      .sign::before, .sign::after {
        content: ""; position: absolute; inset-inline-start: 4px; top: 11px; width: 16px; height: 2px;
        background: currentColor; border-radius: 2px; transition: transform 0.2s ease;
      }
      .sign::after { transform: rotate(90deg); }
      .item.open .sign::after { transform: rotate(0deg); }
      .a { padding: 0 2.4rem 1.2rem 0.25rem; color: #4b5563; line-height: 1.85; }
      .ltr .a { padding: 0 0.25rem 1.2rem 2.4rem; }
      @media (max-width: 768px) {
        .layout { grid-template-columns: 1fr; gap: 1.25rem; }
        .intro { text-align: center; }
        .intro h2 { font-size: 1.5rem; }
        .a { padding-inline: 0.25rem; }
      }
      @media (prefers-reduced-motion: reduce) {
        .sign::before, .sign::after { transition: none; }
      }
    `,
  ];

  private get data() {
    const cfg = this.config || {};
    const rows = list(cfg.faq);
    return {
      bg: color(cfg.bg_color, "#ffffff"),
      accent: color(cfg.accent_color, "#1a8917"),
      title: textOr(cfg.heading, "الأسئلة الشائعة"),
      subtitle: textOr(cfg.subheading, "جمعنا لك إجابات أكثر الأسئلة التي تصلنا. لم تجد إجابتك؟ تواصل معنا في أي وقت."),
      stacked: option(cfg.layout) === "stacked",
      firstOpen: isOn(cfg.first_open, false),
      items: rows.length
        ? rows
            .map((r) => ({ q: text(item(r, "faq", "q")).trim(), a: text(item(r, "faq", "a")).trim() }))
            .filter((r) => r.q && r.a)
        : DEFAULT_FAQ,
      cta: readCta(cfg, { text: "اطلب الآن", enabled: false }),
    };
  }

  private toggle(i: number) {
    this.open = this.open === i ? -2 : i;
  }

  render() {
    const d = this.data;
    if (!d.items.length) return nothing;
    const dir = direction();
    // -1 = untouched (respect "first item open"), -2 = everything closed by the visitor.
    const openIndex = this.open === -1 ? (d.firstOpen ? 0 : -1) : this.open;
    const uid = "faq";
    return html`
      <section class="section ${dir}" dir="${dir}" style="background:${d.bg};--accent:${d.accent}" aria-label="${d.title || nothing}">
        <div class="container">
          <div class="layout ${d.stacked ? "stacked" : ""}">
            ${d.title || d.subtitle
              ? html`<div class="intro">
                  ${d.title ? html`<h2>${d.title}</h2>` : nothing}
                  ${d.subtitle ? html`<p>${d.subtitle}</p>` : nothing}
                </div>`
              : nothing}
            <div class="list">
              ${d.items.map((qa, i) => {
                const isOpen = openIndex === i;
                return html`<div class="item ${isOpen ? "open" : ""}">
                  <h3 style="margin:0;font-size:inherit">
                    <button
                      class="q"
                      type="button"
                      id="${uid}-q-${i}"
                      aria-expanded="${isOpen}"
                      aria-controls="${uid}-a-${i}"
                      @click=${() => this.toggle(i)}
                    >
                      <span class="sign" aria-hidden="true"></span>
                      <span>${qa.q}</span>
                    </button>
                  </h3>
                  <div class="a" id="${uid}-a-${i}" role="region" aria-labelledby="${uid}-q-${i}" ?hidden=${!isOpen}>${qa.a}</div>
                </div>`;
              })}
            </div>
          </div>
          ${ctaBlock(d.cta)}
        </div>
      </section>
    `;
  }
}
