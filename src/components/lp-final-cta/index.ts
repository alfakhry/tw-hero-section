import { css, html, LitElement, nothing } from "lit";
import { baseStyles } from "../../shared/styles";
import { ctaBlock, readCta } from "../../shared/cta";
import { color, contrastText, direction, hexToRgba, number, safeUrl, textOr } from "../../shared/utils";

/** Closing call to action: an emotive headline with the primary button, repeated at the end of the page. */
export default class LpFinalCta extends LitElement {
  static properties = { config: { type: Object } };
  config?: Record<string, unknown>;

  static styles = [
    baseStyles,
    css`
      .section { position: relative; overflow: hidden; background-size: cover; background-position: center; }
      .overlay { position: absolute; inset: 0; }
      .inner { position: relative; max-width: 720px; margin-inline: auto; text-align: center; }
      .inner h2 { margin: 0 0 0.75rem; font-size: 2.1rem; line-height: 1.35; font-weight: 800; }
      .inner .sub { margin: 0 auto; max-width: 560px; font-size: 1.08rem; line-height: 1.8; opacity: 0.85; }
      .inner .cta-block { margin-top: 1.75rem; }
      .on-dark .cta-rating, .on-dark .cta-note { color: rgba(255, 255, 255, 0.9); }
      .on-dark .pay img { background: #fff; border-radius: 6px; }
      @media (max-width: 768px) {
        .inner h2 { font-size: 1.55rem; }
      }
    `,
  ];

  private get data() {
    const cfg = this.config || {};
    const bg = color(cfg.bg_color, "#f4f4f5");
    const image = safeUrl(cfg.bg_image);
    return {
      bg,
      image,
      overlay: number(cfg.overlay_opacity, 55, 0, 90) / 100,
      headline: textOr(cfg.heading, "جاهز تبدأ تجربتك اليوم؟"),
      subtitle: textOr(cfg.subheading, "انضم لآلاف العملاء الراضين، والكمية المتوفرة بهذا السعر محدودة."),
      textColor: image ? "#ffffff" : color(cfg.text_color, contrastText(bg)),
      cta: readCta({ ...cfg, show_cta: true }, { text: "اطلب الآن" }),
    };
  }

  render() {
    const d = this.data;
    const dark = d.textColor.toLowerCase() === "#ffffff" || d.textColor.toLowerCase() === "#fff";
    const style = d.image
      ? `background-color:${d.bg};background-image:url('${d.image.replace(/['()\\]/g, encodeURIComponent)}')`
      : `background:${d.bg}`;
    return html`
      <section class="section ${dark ? "on-dark" : ""}" dir="${direction()}" style="${style}" aria-label="${d.headline || nothing}">
        ${d.image ? html`<div class="overlay" style="background:${hexToRgba("#000000", d.overlay)}"></div>` : nothing}
        <div class="inner" style="color:${d.textColor}">
          ${d.headline ? html`<h2>${d.headline}</h2>` : nothing}
          ${d.subtitle ? html`<p class="sub">${d.subtitle}</p>` : nothing}
          ${ctaBlock(d.cta)}
        </div>
      </section>
    `;
  }
}
