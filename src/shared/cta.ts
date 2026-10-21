import { html, nothing } from "lit";
import { PAYMENTS } from "./payments";
import { color, contrastText, isOn, number, option, safeUrl, t, textOr } from "./utils";

type Dict = Record<string, unknown>;

const PAYMENT_LABELS: [string, string][] = [
  ["mada", "mada"],
  ["applepay", "Apple Pay"],
  ["stcpay", "STC Pay"],
  ["tabby", "Tabby"],
  ["tamara", "Tamara"],
  ["mastercard", "Mastercard"],
  ["googlepay", "Google Pay"],
];

/** Logos shown when the merchant has not changed the switches yet. */
const DEFAULT_PAYMENTS = ["mada", "applepay", "stcpay", "tabby", "mastercard"];

/** Five stars, partially filled to match `value` (0–5). */
export function stars(value: number, fill: string) {
  // Deterministic gradient ids: identical stars share an identical definition.
  const id = `lp-star-${fill.replace("#", "")}`;
  return html`<span class="stars" aria-hidden="true">
    ${[0, 1, 2, 3, 4].map((i) => {
      const pct = Math.round(Math.max(0, Math.min(1, value - i)) * 100);
      return html`<svg viewBox="0 0 20 20">
        <defs>
          <linearGradient id="${id}-${pct}">
            <stop offset="${pct}%" stop-color="${fill}"></stop>
            <stop offset="${pct}%" stop-color="#d1d5db"></stop>
          </linearGradient>
        </defs>
        <path
          fill="url(#${id}-${pct})"
          d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8z"
        ></path>
      </svg>`;
    })}
  </span>`;
}

/** Scrolls to the landing page purchase section (the Hero component), or to the top. */
export function scrollToPurchase() {
  const hero = Array.from(document.querySelectorAll("body *")).find((el) =>
    /^SALLA-HERO(-|$)/.test(el.tagName)
  ) as HTMLElement | undefined;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (hero) hero.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

/** Normalised call-to-action settings read from a component config. */
export function readCta(cfg: Dict, defaults: { text: string; enabled?: boolean }) {
  const bg = color(cfg.cta_color, "#1a8917");
  // One switch per logo: pay_mada, pay_applepay, ...
  const selected = PAYMENT_LABELS.map(([k]) => k).filter((k) => isOn(cfg[`pay_${k}`], DEFAULT_PAYMENTS.includes(k)));
  return {
    enabled: isOn(cfg.show_cta, defaults.enabled ?? true),
    text: textOr(cfg.cta_text, defaults.text),
    note: textOr(cfg.cta_note, ""),
    bg,
    fg: contrastText(bg),
    action: option(cfg.cta_action, "scroll"),
    link: safeUrl(cfg.cta_link),
    showRating: isOn(cfg.show_rating, true),
    rating: number(cfg.rating_value, 4.8, 0, 5),
    ratingCount: textOr(cfg.rating_count, "5000"),
    starsColor: color(cfg.stars_color, "#f5a623"),
    payments: PAYMENT_LABELS.filter(([key]) => selected.includes(key)),
  };
}

export type Cta = ReturnType<typeof readCta>;

/** Rating row + primary button + payment logos, identical across components. */
export function ctaBlock(cta: Cta, extraClass = "") {
  if (!cta.enabled) return nothing;
  const style = `background:${cta.bg};color:${cta.fg}`;
  const button =
    cta.action === "link" && cta.link
      ? html`<a class="cta-btn" style="${style}" href="${cta.link}">${cta.text}</a>`
      : html`<button class="cta-btn" type="button" style="${style}" @click=${scrollToPurchase}>${cta.text}</button>`;

  return html`<div class="cta-block ${extraClass}">
    ${cta.showRating
      ? html`<div class="cta-rating">
          ${stars(cta.rating, cta.starsColor)}
          <span class="sr-only">${t("rating", { value: cta.rating })}</span>
          <strong aria-hidden="true">${cta.rating}</strong>
          ${cta.ratingCount ? html`<span>· ${t("reviews", { count: cta.ratingCount })}</span>` : nothing}
        </div>`
      : nothing}
    ${button}
    ${cta.note ? html`<p class="cta-note">${cta.note}</p>` : nothing}
    ${cta.payments.length
      ? html`<ul class="pay" aria-label="${t("securePayment")}">
          ${cta.payments.map(
            ([key, label]) => html`<li><img src="${PAYMENTS[key]}" alt="${label}" loading="lazy" decoding="async" /></li>`
          )}
        </ul>`
      : nothing}
  </div>`;
}

/** Previous / next buttons for a horizontal `.track` scroller. */
export function scrollTrack(host: HTMLElement | ShadowRoot | null, selector: string, dir: 1 | -1, rtl: boolean) {
  const track = host?.querySelector(selector) as HTMLElement | null;
  if (!track) return;
  const step = Math.max(track.clientWidth * 0.8, 240);
  track.scrollBy({ left: step * dir * (rtl ? -1 : 1), behavior: "smooth" });
}

export const chevron = html`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
export const chevronNext = html`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
