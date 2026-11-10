import { d } from "../../shared/defaults";
import { css, html, LitElement, nothing, render, type TemplateResult } from "lit";
import { PAYMENTS } from "../../shared/payments";
import { chevron, chevronNext, stars } from "../../shared/cta";
import { TRUST_ICONS, personIcon } from "../../shared/icons";
import {
  PLACEHOLDER_IMAGE,
  SALLA_ICONS_CSS,
  color,
  contrastText,
  direction,
  ensureSallaIcons,
  hexToRgba,
  isOn,
  item,
  list,
  number,
  option,
  safeUrl,
  t,
  text,
} from "../../shared/utils";

type Dict = Record<string, any>;
type Tier = { title: string; subtitle: string; qty: number; price: string; compare: string; badge: string };
type Product = {
  id: string;
  name: string;
  price: number;
  regular: number;
  images: string[];
  available: boolean;
  hasOptions: boolean;
  options: unknown;
  currency: string;
};

const PAYMENT_LIST: [string, string][] = [
  ["mada", "mada"],
  ["applepay", "Apple Pay"],
  ["stcpay", "STC Pay"],
  ["tabby", "Tabby"],
  ["tamara", "Tamara"],
  ["mastercard", "Mastercard"],
  ["googlepay", "Google Pay"],
];

/** Styles for the purchase form rendered in the light DOM, so Salla's own web components inherit the theme. */
const LIGHT_CSS = `
.wahaj-buy .wahaj-form fieldset{border:0;margin:0;padding:0;min-width:0}
.wahaj-buy{display:flex;flex-direction:column;gap:14px;font-family:inherit}
.wahaj-buy .wahaj-label{font-weight:700;font-size:15px;color:#111827;margin:0}
.wahaj-buy .wahaj-tiers{display:grid;grid-template-columns:repeat(var(--wahaj-cols,3),minmax(0,1fr));gap:10px;margin:0;padding:0;border:0}
.wahaj-buy .wahaj-tier{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-height:64px;padding:12px 8px;border:2px solid #e5e7eb;border-radius:10px;background:#f3f4f6;cursor:pointer;text-align:center;font:inherit;color:#111827;transition:border-color .15s,background .15s}
.wahaj-buy .wahaj-tier:hover{border-color:#d1d5db}
.wahaj-buy .wahaj-tier[aria-checked="true"]{border-color:var(--wahaj-accent);background:var(--wahaj-accent-soft)}
.wahaj-buy .wahaj-tier:focus-visible{outline:3px solid var(--wahaj-accent);outline-offset:2px}
.wahaj-buy .wahaj-tier strong{font-size:15px}
.wahaj-buy .wahaj-tier small{font-size:12px;color:#6b7280}
.wahaj-buy .wahaj-tier .wahaj-tier-price{font-weight:700;font-size:14px;display:inline-flex;flex-wrap:wrap;justify-content:center;gap:0 6px;align-items:baseline;white-space:nowrap}
.wahaj-buy .wahaj-tier s{color:#9ca3af;font-size:12px;font-weight:500}
.wahaj-buy .wahaj-badge{position:absolute;top:-10px;inset-inline-end:8px;background:var(--wahaj-accent);color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;white-space:nowrap}
.wahaj-buy .wahaj-row{display:flex;gap:12px;align-items:stretch}
.wahaj-buy .wahaj-qty{flex:0 0 96px;min-height:54px;border:0;border-radius:10px;background:#f3f4f6;padding:0 12px;font:inherit;font-size:16px;color:#111827;cursor:pointer}
.wahaj-buy .wahaj-cta{flex:1 1 auto;min-height:54px;border:0;border-radius:10px;font:inherit;font-size:18px;font-weight:700;cursor:pointer;transition:filter .15s,transform .15s}
.wahaj-buy .wahaj-cta:hover{filter:brightness(.94)}
.wahaj-buy .wahaj-cta:active{transform:translateY(1px)}
.wahaj-buy .wahaj-cta:focus-visible{outline:3px solid currentColor;outline-offset:3px}
.wahaj-buy .wahaj-cta[disabled]{opacity:.6;cursor:not-allowed}
.wahaj-buy salla-product-options,.wahaj-buy salla-quick-order,.wahaj-buy salla-offer{display:block}
.wahaj-buy #bundle-pro-widget:empty{display:none}
.wahaj-buy .money{display:inline-flex;align-items:baseline;gap:.2em;direction:ltr;unicode-bidi:isolate;white-space:nowrap}
.wahaj-buy .sar{font-style:normal;font-size:.85em}
.wahaj-buy .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
@media (max-width:820px){.wahaj-buy .wahaj-cta{font-size:17px}}
@media (prefers-reduced-motion:reduce){.wahaj-buy .wahaj-cta,.wahaj-buy .wahaj-tier{transition:none}}
`;

function ensureLightStyles() {
  if (document.getElementById("wahaj-hero-light")) return;
  const style = document.createElement("style");
  style.id = "wahaj-hero-light";
  style.textContent = LIGHT_CSS;
  document.head.appendChild(style);
}

/** True when the merchant's "عروض المنتجات والباقات" storefront widget is on the page. */
function bundlesAppInstalled(): boolean {
  const w = window as Dict;
  return Boolean(
    w.__BUNDLE_PRO_LOADER_SRC__ || w.__BUNDLE_PRO__ || document.querySelector('script[src*="/widget/storefront"]')
  );
}

function num(v: unknown): number {
  if (v && typeof v === "object") v = (v as Dict).amount ?? (v as Dict).value;
  const n = Number.parseFloat(String(v ?? ""));
  return Number.isFinite(n) ? n : 0;
}

/** "149", "١٤٩ ر.س", "SAR 149.50" → 149 / 149 / 149.5; text without digits → null. */
function parseAmount(v: string): number | null {
  const ascii = v.replace(/[\u0660-\u0669]/g, (c) => String(c.charCodeAt(0) - 0x0660)).replace(/[\u06F0-\u06F9]/g, (c) => String(c.charCodeAt(0) - 0x06f0));
  const m = ascii.replace(/[,\u066C]/g, "").replace(/\u066B/g, ".").match(/\d+(?:\.\d+)?/);
  return m ? Number(m[0]) : null;
}

function formatAmount(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

/**
 * Main purchase section (Hero).
 * Manual mode: every text and price comes from the editor.
 * Product mode: the merchant picks a store product; price, stock, images and options load live,
 * and the purchase form is rendered with Salla's own components (and the merchant's bundles app, when installed).
 */
export default class Hero extends LitElement {
  static properties = {
    config: { type: Object },
    activeImage: { state: true },
    activeTab: { state: true },
    activeTier: { state: true },
    topIndex: { state: true },
    product: { state: true },
  };

  config?: Dict;
  activeImage!: number;
  activeTab!: number;
  activeTier!: number;
  topIndex!: number;
  product!: Product | null;
  private loadedId = "";
  private lightRoot: HTMLDivElement | null = null;
  private topTimer = 0;

  constructor() {
    super();
    this.activeImage = 0;
    this.activeTab = 0;
    this.activeTier = -1;
    this.topIndex = 0;
    this.product = null;
  }

  /** Unique per hero, so two heroes on one page never share ids in the page DOM. */
  private topPaused = false;
  private topStopped = false;
  private uid = `wahaj-${Math.random().toString(36).slice(2, 8)}`;

  connectedCallback() {
    super.connectedCallback();
    ensureSallaIcons();
    this.topTimer = window.setInterval(() => {
      const n = list(this.config?.top_bar).length;
      if (this.topPaused || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
      if (n > 1 && window.matchMedia?.("(max-width: 820px)").matches) this.topIndex = (this.topIndex + 1) % n;
    }, 4000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.topTimer);
  }

  /* ----------------------------------------------------------------- data */

  private get c() {
    const cfg = this.config || {};
    const s = (v: unknown, fallback: string) => (v === undefined || v === null ? fallback : text(v).trim());
    const rows = (v: unknown, name: string, keys: string[]) =>
      list(v).map((r) => Object.fromEntries(keys.map((k) => [k, k === "icon" ? item(r, name, k) : text(item(r, name, k))])));
    const productId = option(cfg.product, "").trim();
    const tiers: Tier[] = list(cfg.tiers)
      .map((r) => ({
        title: text(item(r, "tiers", "title")).trim(),
        subtitle: text(item(r, "tiers", "subtitle")).trim(),
        qty: Math.max(1, Math.round(number(item(r, "tiers", "qty"), 1, 1, 99))),
        price: text(item(r, "tiers", "price")).trim(),
        compare: text(item(r, "tiers", "compare")).trim(),
        badge: text(item(r, "tiers", "badge")).trim(),
      }))
      .filter((r) => r.title);
    return {
      productId: /^\d+$/.test(productId) ? productId : "",
      bg: color(cfg.bg_color, "#ffffff"),
      accent: color(cfg.accent_color, "#1a8917"),
      showTopBar: isOn(cfg.show_top_bar, true),
      topBar: rows(cfg.top_bar, "top_bar", ["icon", "text"]).filter((r) => r.text),
      gallery: rows(cfg.gallery, "gallery", ["image"]).map((r) => safeUrl(r.image)).filter(Boolean),
      ratingValue: number(cfg.rating_value, 4.8, 0, 5),
      ratingCount: s(cfg.rating_count, "5000"),
      starsColor: color(cfg.stars_color, "#f5a623"),
      title: s(cfg.headline ?? cfg.title, d("عطر فاخر يدوم طويلاً — رائحة تبقى معك طوال اليوم")),
      subtitle: s(cfg.subheadline ?? cfg.subtitle, ""),
      priceFrom: isOn(cfg.price_from, false),
      priceAfter: s(cfg.price_after, "149"),
      priceBefore: s(cfg.price_before, "249"),
      savings: s(cfg.savings_label, ""),
      stock: s(cfg.stock_label, d("الكمية محدودة")),
      points: rows(cfg.points, "points", ["text"]).map((r) => r.text as string).filter(Boolean),
      offersMode: option(cfg.offers_mode, "auto"),
      offersTitle: s(cfg.offers_title, d("اختر العرض المناسب")),
      tiers,
      defaultTier: Math.max(0, Math.round(number(cfg.default_tier, 2, 1, 6)) - 1),
      showQty: isOn(cfg.show_qty, true),
      ctaText: s(cfg.cta_text, d("اشترِ الآن")),
      ctaColor: color(cfg.cta_color, "#1a8917"),
      ctaAction: option(cfg.cta_action, "buy_now"),
      ctaLink: safeUrl(cfg.cta_link),
      showQuickOrder: isOn(cfg.show_quick_order, true),
      showSallaOffers: isOn(cfg.show_salla_offers, true),
      secureLabel: s(cfg.secure_label, t("secureCheckout")),
      payments: PAYMENT_LIST.filter(([k]) => isOn(cfg[`pay_${k}`], ["mada", "applepay", "stcpay", "tabby", "mastercard"].includes(k))),
      showTrust: isOn(cfg.show_trust, true),
      trust: rows(cfg.trust, "trust", ["icon", "text"]).filter((r) => r.text),
      showReview: isOn(cfg.show_review, true),
      review: rows(cfg.reviews, "reviews", ["avatar", "name", "text"]).find((r) => r.text) as Dict | undefined,
      showTabs: isOn(cfg.show_tabs, true),
      tabs: rows(cfg.tabs, "tabs", ["title", "content"]).filter((r) => r.title && r.content) as Dict[],
      showLogos: isOn(cfg.show_logos, true),
      logosTitle: s(cfg.logos_title, t("recommendedBy")),
      logos: rows(cfg.logos, "logos", ["name", "image"]).filter((r) => r.name || r.image) as Dict[],
    };
  }

  /** Arrow keys move between radio cards / tabs (focus follows the selection). */
  private arrowKeys(e: KeyboardEvent, count: number, select: (i: number) => void, current: number) {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(e.key in keys) || count < 2) return;
    e.preventDefault();
    const step = direction() === "rtl" && e.key.startsWith("Arrow") && (e.key === "ArrowRight" || e.key === "ArrowLeft") ? -keys[e.key] : keys[e.key];
    const next = (Math.max(current, 0) + step + count) % count;
    select(next);
    const group = e.currentTarget as HTMLElement;
    requestAnimationFrame(() => (group.querySelectorAll<HTMLElement>('[role="radio"],[role="tab"]')[next])?.focus());
  }

  private sdkTries = 0;

  private async loadProduct(id: string) {
    const salla = (window as Dict).salla;
    if (!salla?.product?.getDetails) {
      // The storefront SDK may load after this component; try again for a few seconds.
      if (this.sdkTries++ < 20) window.setTimeout(() => this.loadProduct(id), 500);
      return;
    }
    this.loadedId = id;
    try {
      await salla.onReady?.();
      const res = await salla.product.getDetails(id, ["images", "options"]);
      const p = (res?.data ?? res) as Dict;
      if (!p || this.loadedId !== id) return;
      const price = num(p.sale_price) || num(p.price);
      const regular = num(p.regular_price) || num(p.price);
      const images = (Array.isArray(p.images) ? p.images : [])
        .map((img: Dict) => safeUrl(img?.url ?? img?.image?.url ?? img))
        .filter(Boolean);
      const mainImage = safeUrl(p.image?.url ?? p.thumbnail);
      this.product = {
        id,
        name: text(p.name),
        price,
        regular: regular > price ? regular : 0,
        images: images.length ? images : mainImage ? [mainImage] : [],
        available: p.is_available !== false && p.status !== "out" && p.status !== "out-and-notify",
        hasOptions: Array.isArray(p.options) && p.options.length > 0,
        options: p.options,
        // Amounts come back in the visitor's selected currency.
        currency: text(salla.config?.get?.("user.currency_code") || p.currency || "SAR"),
      };
    } catch {
      // Product not found or API unavailable: stay on the merchant's manual values.
      this.product = null;
    }
  }

  protected willUpdate() {
    const id = this.c.productId;
    if (id && id !== this.loadedId) this.loadProduct(id);
    if (!id && this.loadedId) {
      this.loadedId = "";
      this.product = null;
    }
  }

  /* -------------------------------------------------------------- actions */

  /** Quantity tiers are skipped when the bundles app renders its own offers. */
  private useTiers(): boolean {
    const c = this.c;
    if (c.offersMode === "none" || c.offersMode === "app") return false;
    if (c.offersMode === "auto" && c.productId && bundlesAppInstalled()) return false;
    return c.tiers.length > 0;
  }

  private tierIndex(): number {
    const c = this.c;
    if (!this.useTiers()) return -1;
    return this.activeTier >= 0 ? Math.min(this.activeTier, c.tiers.length - 1) : Math.min(c.defaultTier, c.tiers.length - 1);
  }

  private selectedQuantity(form: HTMLFormElement): number {
    const i = this.tierIndex();
    if (i >= 0) return this.c.tiers[i].qty;
    const select = form.querySelector<HTMLSelectElement>(".wahaj-qty");
    return select ? Number(select.value) || 1 : 1;
  }

  /**
   * "Buy now" goes straight to Salla's checkout with the chosen quantity and options, the same
   * request Salla's own quick-buy button sends (checkout/mini). If the store cannot do that, the
   * product is added to the cart and the customer is taken to the cart instead.
   */
  private async submit(e: Event) {
    e.preventDefault();
    const c = this.c;
    const salla = (window as Dict).salla;
    const form = e.target as HTMLFormElement;
    if (!c.productId || !salla?.cart?.addItem) {
      if (c.ctaLink) window.location.href = c.ctaLink;
      return;
    }
    const options: Record<string, string> = {};
    new FormData(form).forEach((value, key) => {
      const m = key.match(/^options\[(\d+)\]$/);
      if (m && typeof value === "string" && value) options[m[1]] = value;
    });
    const quantity = this.selectedQuantity(form);
    const button = form.querySelector<HTMLButtonElement>(".wahaj-cta");
    button?.setAttribute("disabled", "");
    button?.setAttribute("aria-busy", "true");
    try {
      if (c.ctaAction === "buy_now" && (await this.quickCheckout(form, quantity))) return;
      await salla.cart.addItem({ id: c.productId, quantity, options });
      if (c.ctaAction === "buy_now") window.location.href = salla.url?.get?.("cart") || "/cart";
      else if (c.ctaAction === "link" && c.ctaLink) window.location.href = c.ctaLink;
    } catch {
      // Salla shows its own error message (for example when a required option is missing).
    } finally {
      button?.removeAttribute("disabled");
      button?.removeAttribute("aria-busy");
    }
  }

  /** Returns true when the customer is on the way to checkout (or the login window opened). */
  private async quickCheckout(form: HTMLFormElement, quantity: number): Promise<boolean> {
    const salla = (window as Dict).salla;
    const request = salla?.api?.request;
    if (typeof request !== "function") return false;
    // Required options are checked by Salla's options component before anything is sent.
    const optionsEl = form.querySelector<HTMLElement & { reportValidity?: () => Promise<boolean> | boolean }>("salla-product-options");
    if (optionsEl && typeof optionsEl.reportValidity === "function" && !(await optionsEl.reportValidity())) return true;
    if (!form.reportValidity()) return true;
    const data = new FormData(form);
    data.set("id", this.c.productId);
    data.set("quantity", String(quantity));
    data.set("source", "buy_now");
    const go = (resp: Dict) => {
      const to = resp?.data?.url || resp?.data?.redirect;
      if (to) {
        window.location.href = to;
        return true;
      }
      if (resp?.data?.to === "login") {
        salla.event?.dispatch?.("login::open");
        return true;
      }
      return false;
    };
    try {
      return go(await request.call(salla.api, "checkout/mini", data, "post"));
    } catch (err) {
      const code = (err as Dict)?.response?.data?.error?.code;
      if (code === "token_not_provided") {
        try {
          return go(await request.call(salla.api, `checkout/quick-purchase/${this.c.productId}`, data, "post"));
        } catch {
          return false;
        }
      }
      const message = (err as Dict)?.response?.data?.error?.message;
      // A clear refusal (out of stock, missing option…) is shown, otherwise fall back to the cart.
      if (message && (err as Dict)?.response?.status === 422) {
        salla.notify?.error?.(message);
        return true;
      }
      return false;
    }
  }

  /** Manual mode button: use the page's own purchase control, else follow the merchant link. */
  private manualCta() {
    const c = this.c;
    if (c.ctaAction === "link" && c.ctaLink) {
      window.location.href = c.ctaLink;
      return;
    }
    const el = ["salla-quick-buy button", "[data-buy-now]", "salla-add-product-button button", ".btn-add-to-cart"]
      .map((sel) => document.querySelector(sel))
      .find(Boolean) as HTMLElement | undefined;
    if (el) el.click();
    else if (c.ctaLink) window.location.href = c.ctaLink;
  }

  /* ------------------------------------------------------- light DOM part */

  protected updated() {
    const c = this.c;
    if (!c.productId) {
      this.lightRoot?.remove();
      this.lightRoot = null;
      return;
    }
    ensureLightStyles();
    if (!this.lightRoot) {
      this.lightRoot = document.createElement("div");
      this.lightRoot.slot = "buy";
      this.appendChild(this.lightRoot);
    }
    render(this.lightTemplate(), this.lightRoot);
    this.mountBundlesApp();
  }

  /**
   * Hands the product to the bundles app ("عروض المنتجات والباقات").
   * The app reads window.__BUNDLE_PRO_PRODUCT_ID__ and mounts into #bundle-pro-widget. When its script
   * already ran, it can re-mount through window.BundlePro.mount (if exposed) or the "wahaj:product" event.
   */
  private mountBundlesApp() {
    const c = this.c;
    if (!c.productId || c.offersMode === "none" || this.useTiers() || !bundlesAppInstalled()) return;
    const mount = this.lightRoot?.querySelector<HTMLElement>("#bundle-pro-widget");
    if (!mount || mount.dataset.wahajMounted === c.productId) return;
    mount.dataset.wahajMounted = c.productId;
    const w = window as Dict;
    w.__BUNDLE_PRO_PRODUCT_ID__ = c.productId;
    if (typeof w.BundlePro?.mount === "function") w.BundlePro.mount(mount, c.productId);
    document.dispatchEvent(new CustomEvent("wahaj:product", { detail: { productId: c.productId, element: mount } }));
  }

  private lightTemplate(): TemplateResult {
    const c = this.c;
    const p = this.product;
    // With a linked product the badge only shows when the product really has a discount.
    const savings = p
      ? p.regular
        ? c.savings || html`${t("save")} ${this.money(Math.round((p.regular - p.price) * 100) / 100)}`
        : ""
      : c.savings;
    const outOfStock = p ? !p.available : false;
    const tierIndex = this.tierIndex();
    const tiers = tierIndex >= 0 ? c.tiers : [];
    const appOffers = c.offersMode !== "none" && !this.useTiers() && bundlesAppInstalled();
    return html`
      <div
        class="wahaj-buy"
        dir="${direction()}"
        style="--wahaj-accent:${c.accent};--wahaj-accent-soft:${hexToRgba(c.accent, 0.1)};--wahaj-cols:${Math.min(Math.max(tiers.length, 1), 3)}"
      >
        ${appOffers ? html`<div id="bundle-pro-widget" class="bp-widget-mount"></div>` : nothing}
        ${tiers.length
          ? html`<p class="wahaj-label" id="${this.uid}-tiers">${c.offersTitle}</p>
              <div class="wahaj-tiers" role="radiogroup" aria-labelledby="${this.uid}-tiers" @keydown=${(e: KeyboardEvent) => this.arrowKeys(e, tiers.length, (i) => (this.activeTier = i), this.tierIndex())}>
                ${tiers.map(
                  (tier, i) => html`<button type="button" class="wahaj-tier" role="radio" aria-checked="${i === tierIndex}" tabindex="${i === tierIndex ? 0 : -1}" @click=${() => (this.activeTier = i)}>
                    ${tier.badge ? html`<span class="wahaj-badge">${tier.badge}</span>` : nothing}
                    <strong>${tier.title}</strong>
                    ${this.tierPrice(tier) !== nothing ? html`<span class="wahaj-tier-price">${this.tierPrice(tier)}</span>` : nothing}
                    ${tier.subtitle ? html`<small>${tier.subtitle}</small>` : nothing}
                  </button>`
                )}
              </div>`
          : nothing}
        <form class="wahaj-form product-form" @submit=${(e: Event) => this.submit(e)}>
          <input type="hidden" name="id" .value=${c.productId} />
          ${p?.hasOptions
            ? html`<salla-product-options product-id="${c.productId}" options="${JSON.stringify(p.options)}"></salla-product-options>`
            : nothing}
          <div class="wahaj-row">
            ${c.showQty && !tiers.length
              ? html`<select class="wahaj-qty" name="quantity" aria-label="${t("quantity")}">
                  ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => html`<option value="${n}">${n}</option>`)}
                </select>`
              : nothing}
            <button class="wahaj-cta" type="submit" style="background:${c.ctaColor};color:${contrastText(c.ctaColor)}" ?disabled=${outOfStock}>
              ${outOfStock ? t("outOfStock") : c.ctaText}
            </button>
          </div>
        </form>
        ${c.showQuickOrder && !outOfStock ? html`<salla-quick-order product-id="${c.productId}"></salla-quick-order>` : nothing}
        ${c.showSallaOffers ? html`<salla-offer product-id="${c.productId}"></salla-offer>` : nothing}
      </div>
    `;
  }

  /* ------------------------------------------------------------- styles */

  static styles = css`
    :host { display: block; font-family: inherit; color: #1f2937; }
    * { box-sizing: border-box; }
    img { display: block; max-width: 100%; }
    .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; }
    .container { max-width: 1240px; margin-inline: auto; padding-inline: 1rem; }

    /* Top bar */
    .top { border-bottom: 1px solid #eceef1; background: #fff; }
    .top-bar-inner { display: block; }
    .top-list { display: flex; justify-content: space-between; gap: 1rem; margin: 0; padding: 0.9rem 0; list-style: none; }
    .top-item { display: flex; align-items: center; gap: 0.55rem; font-size: 0.92rem; font-weight: 600; color: #111827; }
    .top-item .ic { width: 22px; height: 22px; flex: 0 0 auto; color: #111827; }
    .top-item .ic svg { width: 100%; height: 100%; }
    .top-nav { display: none; }

    /* Product area */
    .wrap { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 4rem; padding-block: 2rem 3rem; align-items: start; }
    .gallery { position: sticky; top: 1rem; }
    .main-img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; background: #f3f4f6; border-radius: 4px; }
    .thumbs { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0.9rem; margin-top: 1.25rem; }
    .thumb-btn { padding: 0; border: 2px solid transparent; background: #f3f4f6; border-radius: 6px; cursor: pointer; overflow: hidden; aspect-ratio: 1.15 / 1; }
    .thumb-btn[aria-pressed="true"] { border-color: #111827; }
    .thumb-btn:focus-visible { outline: 2px solid #111827; outline-offset: 2px; }
    .thumb-btn img { width: 100%; height: 100%; object-fit: cover; }

    .info { min-width: 0; display: flex; flex-direction: column; gap: 1.15rem; }
    .rating { display: flex; align-items: center; flex-wrap: wrap; gap: 0.45rem; font-size: 0.92rem; color: #4b5563; }
    .stars { display: inline-flex; gap: 2px; }
    .stars svg { width: 18px; height: 18px; display: block; }
    .rating strong { color: #111827; }
    h1.title { margin: 0; font-size: 2.35rem; line-height: 1.25; font-weight: 700; color: #111827; letter-spacing: -0.01em; }
    .subtitle { margin: -0.4rem 0 0; color: #4b5563; font-size: 1.02rem; line-height: 1.7; }

    .price-row { display: flex; align-items: center; flex-wrap: wrap; gap: 0.6rem 1rem; }
    .price { font-size: 1.45rem; font-weight: 700; color: #111827; }
    .price .from { font-weight: 500; color: #4b5563; font-size: 1.05rem; margin-inline-end: 0.35rem; }
    .price-before { color: #9ca3af; text-decoration: line-through; font-size: 1.05rem; }
    .savings { background: var(--accent-soft); color: var(--accent); font-size: 0.85rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 6px; }
    .stock { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.88rem; color: #4b5563; }
    .stock .dot { width: 12px; height: 12px; border-radius: 50%; background: #f59e0b; box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.18); }
    .stock.out .dot { background: #dc2626; box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.15); }
    .money { display: inline-flex; align-items: baseline; gap: 0.2em; direction: ltr; unicode-bidi: isolate; white-space: nowrap; }
    .sar { font-style: normal; font-size: 0.85em; }

    .points { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.7rem; }
    .points li { display: flex; align-items: flex-start; gap: 0.7rem; line-height: 1.55; color: #374151; }
    .points .tick { width: 22px; height: 22px; flex: 0 0 auto; border-radius: 50%; background: #6b7280; color: #fff; display: grid; place-items: center; font-size: 0.72rem; margin-top: 1px; }

    /* Offers + button (manual mode) */
    .label { font-weight: 700; color: #111827; margin: 0.2rem 0 -0.4rem; }
    .tiers { display: grid; grid-template-columns: repeat(var(--cols, 3), minmax(0, 1fr)); gap: 0.65rem; }
    .tier { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; min-height: 64px; padding: 0.75rem 0.5rem; border: 2px solid #e5e7eb; border-radius: 10px; background: #f3f4f6; cursor: pointer; text-align: center; font: inherit; color: #111827; }
    .tier[aria-checked="true"] { border-color: var(--accent); background: var(--accent-soft); }
    .tier:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
    .tier strong { font-size: 0.95rem; }
    .tier small { font-size: 0.75rem; color: #6b7280; }
    .tier .tp { font-weight: 700; font-size: 0.9rem; display: inline-flex; flex-wrap: wrap; justify-content: center; gap: 0 6px; align-items: baseline; white-space: nowrap; }
    .tier s { color: #9ca3af; font-size: 0.75rem; font-weight: 500; }
    .tier .badge { position: absolute; top: -10px; inset-inline-end: 8px; background: var(--accent); color: #fff; font-size: 0.68rem; font-weight: 700; padding: 2px 8px; border-radius: 999px; white-space: nowrap; }

    .buy-row { display: flex; gap: 0.75rem; }
    .qty { flex: 0 0 96px; min-height: 54px; border: 0; border-radius: 10px; background: #f3f4f6; padding: 0 0.75rem; font: inherit; font-size: 1rem; }
    .cta { flex: 1 1 auto; min-height: 54px; border: 0; border-radius: 10px; font: inherit; font-size: 1.15rem; font-weight: 700; cursor: pointer; transition: filter 0.15s; }
    .cta:hover { filter: brightness(0.94); }
    .cta:focus-visible { outline: 3px solid currentColor; outline-offset: 3px; }

    .pay { display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem; }
    .pay ul { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0; padding: 0; list-style: none; }
    .pay img { height: 28px; width: auto; }
    .pay .secure { color: #4b5563; font-size: 0.92rem; margin-inline-start: 0.5rem; }

    .trust-card { background: #ececec; border-radius: 6px; padding: 1.25rem 1.4rem; display: grid; gap: 1rem; }
    .trust-row { display: flex; align-items: center; gap: 0.8rem; color: #374151; font-size: 0.98rem; }
    .trust-row .ic { width: 22px; height: 22px; flex: 0 0 auto; color: #6b7280; }
    .trust-row .ic svg { width: 100%; height: 100%; }

    .review { display: flex; gap: 1.25rem; align-items: center; }
    .review .avatar { width: 92px; height: 92px; border-radius: 50%; object-fit: cover; flex: 0 0 auto; background: #bcb6b6; color: #fff; display: grid; place-items: center; overflow: hidden; }
    .review .avatar svg { width: 55%; height: 55%; }
    .review .rtext { margin: 0 0 0.5rem; color: #374151; line-height: 1.65; }
    .review .rname { font-weight: 700; margin-bottom: 0.25rem; }

    .tabs-head { display: flex; border-bottom: 2px solid #e5e7eb; overflow-x: auto; scrollbar-width: none; }
    .tab { padding: 0.7rem 1.2rem; border: 0; background: none; font: inherit; font-weight: 600; color: #6b7280; cursor: pointer; white-space: nowrap; margin-bottom: -2px; border-bottom: 2px solid transparent; }
    .tab[aria-selected="true"] { color: #111827; background: #e5e7eb; border-bottom-color: #111827; }
    .tab:focus-visible { outline: 2px solid #111827; outline-offset: -2px; }
    .tab-panel { padding: 1rem 0.2rem 0; color: #4b5563; line-height: 1.85; white-space: pre-line; }
    .acc { display: none; }
    .acc-item + .acc-item { margin-top: 0.6rem; }
    .acc-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; padding: 0.8rem 1rem; background: #e5e7eb; border: 0; border-radius: 4px; font: inherit; font-weight: 600; color: #111827; text-align: start; cursor: pointer; }
    .acc-a { padding: 0.8rem 0.25rem 0.2rem; color: #4b5563; line-height: 1.8; white-space: pre-line; }

    /* Logos strip */
    .logos { background: #f2f2f2; }
    .logos-inner { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem 2.5rem; flex-wrap: wrap; padding-block: 1.6rem; }
    .logos-title { color: #4b5563; font-size: 0.92rem; }
    .logo { color: #6b7280; font-size: 1.15rem; font-weight: 600; }
    .logo img { max-height: 34px; width: auto; filter: grayscale(1); opacity: 0.75; }

    @media (max-width: 1024px) {
      .wrap { gap: 2.5rem; }
      h1.title { font-size: 2rem; }
    }
    @media (max-width: 820px) {
      .top-bar-inner { display: flex; align-items: center; justify-content: space-between; }
      .top-list { justify-content: center; padding: 0.7rem 0; }
      .top-list .top-item { display: none; }
      .top-list .top-item.on { display: flex; }
      .top-nav { display: grid; place-items: center; width: 32px; height: 32px; border: 0; background: none; cursor: pointer; color: #111827; }
      .top-nav svg { width: 18px; height: 18px; }
      .wrap { grid-template-columns: 1fr; gap: 1.5rem; padding-block: 1rem 2rem; }
      .gallery { position: static; }
      .thumbs { gap: 0.55rem; }
      h1.title { font-size: 1.7rem; }
      .review .avatar { width: 72px; height: 72px; }
      .tabs { display: none; }
      .acc { display: block; }
      .logos-inner { justify-content: center; text-align: center; }
      .logos-title { width: 100%; }
    }
  `;

  /* ------------------------------------------------------------ rendering */

  private icon(key: unknown) {
    const k = option(key, "").trim();
    return TRUST_ICONS[k] ? TRUST_ICONS[k]() : TRUST_ICONS["ضمان"]();
  }

  /** Price with the riyal symbol on its left (SAMA guidance), in both languages. */
  private money(value: string | number) {
    const currency = this.product?.currency || "SAR";
    const n = typeof value === "number" ? value : parseAmount(value);
    const amount = n !== null ? formatAmount(n) : value;
    return currency.toUpperCase() === "SAR"
      ? html`<span class="money" dir="ltr"><i class="sar sicon-sar" aria-hidden="true"></i>${amount}<span class="sr-only"> SAR</span></span>`
      : html`<span class="money" dir="ltr">${amount} ${currency}</span>`;
  }

  /**
   * Price line of a quantity card. The merchant types plain numbers; with a linked product an
   * empty price is worked out as quantity × the product's price, and the struck price as
   * quantity × its price before discount.
   */
  private tierPrice(tier: Tier) {
    const p = this.product;
    let price = parseAmount(tier.price);
    let compare = parseAmount(tier.compare);
    if (p && p.price) {
      if (price === null) price = Math.round(p.price * tier.qty * 100) / 100;
      if (compare === null) {
        const full = Math.round((p.regular || p.price) * tier.qty * 100) / 100;
        if (full > price) compare = full;
      }
    }
    const show = (raw: string, n: number | null) => (n !== null ? this.money(n) : raw);
    const main = show(tier.price, price);
    if (!main) return nothing;
    const before = compare !== null && price !== null && compare <= price ? "" : show(tier.compare, compare);
    return html`${main}${before ? html`<s>${before}</s>` : nothing}`;
  }

  private renderTopBar(c: Dict, rtl: boolean) {
    if (!c.showTopBar || !c.topBar.length) return nothing;
    const n = c.topBar.length;
    const idx = this.topIndex % n;
    // Using the arrows stops the automatic rotation; hovering or focusing pauses it.
    const go = (d: number) => {
      this.topStopped = true;
      this.topPaused = true;
      this.topIndex = (idx + d + n) % n;
    };
    const hold = (on: boolean) => () => {
      if (!this.topStopped) this.topPaused = on;
    };
    return html`<div class="top" @mouseenter=${hold(true)} @mouseleave=${hold(false)} @focusin=${hold(true)} @focusout=${hold(false)}>
      <div class="container top-bar-inner">
        <button class="top-nav" type="button" aria-label="${t("previous")}" @click=${() => go(-1)}>${rtl ? chevronNext : chevron}</button>
        <ul class="top-list">
          ${c.topBar.map(
            (r: Dict, i: number) => html`<li class="top-item ${i === idx ? "on" : ""}"><span class="ic" aria-hidden="true">${this.icon(r.icon)}</span>${r.text}</li>`
          )}
        </ul>
        <button class="top-nav" type="button" aria-label="${t("next")}" @click=${() => go(1)}>${rtl ? chevron : chevronNext}</button>
      </div>
    </div>`;
  }

  private renderManualBuy(c: Dict) {
    const tierIndex = this.tierIndex();
    const tiers: Tier[] = tierIndex >= 0 ? c.tiers : [];
    return html`
      ${tiers.length
        ? html`<p class="label" id="tiers-label">${c.offersTitle}</p>
            <div class="tiers" role="radiogroup" aria-labelledby="tiers-label" @keydown=${(e: KeyboardEvent) => this.arrowKeys(e, tiers.length, (i) => (this.activeTier = i), tierIndex)} style="--cols:${Math.min(tiers.length, 3)}">
              ${tiers.map(
                (tier, i) => html`<button type="button" class="tier" role="radio" aria-checked="${i === tierIndex}" tabindex="${i === tierIndex ? 0 : -1}" @click=${() => (this.activeTier = i)}>
                  ${tier.badge ? html`<span class="badge">${tier.badge}</span>` : nothing}
                  <strong>${tier.title}</strong>
                  ${this.tierPrice(tier) !== nothing ? html`<span class="tp">${this.tierPrice(tier)}</span>` : nothing}
                  ${tier.subtitle ? html`<small>${tier.subtitle}</small>` : nothing}
                </button>`
              )}
            </div>`
        : nothing}
      <div class="buy-row">
        <button class="cta" type="button" style="background:${c.ctaColor};color:${contrastText(c.ctaColor)}" @click=${() => this.manualCta()}>${c.ctaText}</button>
      </div>
    `;
  }

  private renderTabs(c: Dict) {
    if (!c.showTabs || !c.tabs.length) return nothing;
    const tabIndex = Math.min(Math.max(this.activeTab, 0), c.tabs.length - 1);
    return html`<div class="tabs">
        <div class="tabs-head" role="tablist" @keydown=${(e: KeyboardEvent) => this.arrowKeys(e, c.tabs.length, (i) => (this.activeTab = i), tabIndex)}>
          ${c.tabs.map(
            (tab: Dict, i: number) => html`<button
              class="tab"
              role="tab"
              type="button"
              id="tab-${i}"
              aria-controls="${i === tabIndex ? "panel" : nothing}"
              aria-selected="${i === tabIndex}"
              tabindex="${i === tabIndex ? 0 : -1}"
              @click=${() => (this.activeTab = i)}
            >${tab.title}</button>`
          )}
        </div>
        <div class="tab-panel" role="tabpanel" id="panel" aria-labelledby="tab-${tabIndex}">${c.tabs[tabIndex]?.content}</div>
      </div>
      <div class="acc">
        ${c.tabs.map(
          (tab: Dict, i: number) => html`<div class="acc-item">
            <button class="acc-q" type="button" aria-expanded="${i === this.activeTab}" @click=${() => (this.activeTab = this.activeTab === i ? -1 : i)}>
              <span>${tab.title}</span><span aria-hidden="true">${i === this.activeTab ? "−" : "+"}</span>
            </button>
            ${i === this.activeTab ? html`<div class="acc-a">${tab.content}</div>` : nothing}
          </div>`
        )}
      </div>`;
  }

  render() {
    const c = this.c;
    const p = this.product;
    const dir = direction();
    const rtl = dir === "rtl";
    // A linked product shows its own photos; the manual gallery is the fallback.
    const gallery = p?.images.length ? p.images : c.gallery.length ? c.gallery : [PLACEHOLDER_IMAGE];
    const active = Math.min(this.activeImage, gallery.length - 1);
    const price = p && p.price ? this.money(p.price) : c.priceAfter ? this.money(c.priceAfter) : null;
    const before = p ? (p.regular ? this.money(p.regular) : null) : c.priceBefore ? this.money(c.priceBefore) : null;
    // With a linked product the badge only shows when the product really has a discount.
    const savings = p
      ? p.regular
        ? c.savings || html`${t("save")} ${this.money(Math.round((p.regular - p.price) * 100) / 100)}`
        : ""
      : c.savings;
    const outOfStock = p ? !p.available : false;
    const avatar = c.review ? safeUrl(c.review.avatar) : "";

    return html`
      <link rel="stylesheet" href="${SALLA_ICONS_CSS}" />
      <section dir="${dir}" style="background:${c.bg};--accent:${c.accent};--accent-soft:${hexToRgba(c.accent, 0.1)}" aria-label="${c.title}">
        ${this.renderTopBar(c, rtl)}
        <div class="container">
          <div class="wrap">
            <div class="gallery">
              <img class="main-img" src="${gallery[active]}" alt="${c.title}" />
              ${gallery.length > 1
                ? html`<div class="thumbs">
                    ${gallery.slice(0, 6).map(
                      (src, i) => html`<button class="thumb-btn" type="button" aria-label="${t("image", { n: i + 1 })}" aria-pressed="${i === active}" @click=${() => (this.activeImage = i)}>
                        <img src="${src}" alt="" loading="lazy" decoding="async" />
                      </button>`
                    )}
                  </div>`
                : nothing}
            </div>

            <div class="info">
              <div class="rating">
                ${stars(c.ratingValue, c.starsColor)}
                <span class="sr-only">${t("rating", { value: c.ratingValue })}</span>
                <strong aria-hidden="true">${c.ratingValue}/5</strong>
                ${c.ratingCount ? html`<span>· ${t("ratedBy", { count: c.ratingCount })}</span>` : nothing}
              </div>

              <h1 class="title">${c.title}</h1>
              ${c.subtitle ? html`<p class="subtitle">${c.subtitle}</p>` : nothing}

              <div class="price-row">
                ${price ? html`<span class="price">${c.priceFrom ? html`<span class="from">${t("startingFrom")}</span>` : nothing}${price}</span>` : nothing}
                ${before ? html`<span class="price-before">${before}</span>` : nothing}
                ${savings ? html`<span class="savings">${savings}</span>` : nothing}
                ${outOfStock
                  ? html`<span class="stock out"><span class="dot"></span>${t("outOfStock")}</span>`
                  : c.stock
                    ? html`<span class="stock"><span class="dot"></span>${c.stock}</span>`
                    : nothing}
              </div>

              ${c.points.length
                ? html`<ul class="points">${c.points.map((pt: string) => html`<li><span class="tick" aria-hidden="true">✓</span><span>${pt}</span></li>`)}</ul>`
                : nothing}

              ${c.productId ? html`<slot name="buy"></slot>` : this.renderManualBuy(c)}

              ${c.payments.length
                ? html`<div class="pay">
                    <ul aria-label="${t("securePayment")}">
                      ${c.payments.map(([k, label]: [string, string]) => html`<li><img src="${PAYMENTS[k]}" alt="${label}" loading="lazy" decoding="async" /></li>`)}
                    </ul>
                    ${c.secureLabel ? html`<span class="secure">${c.secureLabel}</span>` : nothing}
                  </div>`
                : nothing}

              ${c.showTrust && c.trust.length
                ? html`<div class="trust-card">
                    ${c.trust.map((r: Dict) => html`<div class="trust-row"><span class="ic" aria-hidden="true">${this.icon(r.icon)}</span><span>${r.text}</span></div>`)}
                  </div>`
                : nothing}

              ${c.showReview && c.review
                ? html`<div class="review">
                    ${avatar
                      ? html`<img class="avatar" src="${avatar}" alt="${c.review.name}" loading="lazy" />`
                      : html`<span class="avatar" aria-hidden="true">${personIcon()}</span>`}
                    <div>
                      <p class="rtext">${c.review.text}</p>
                      ${c.review.name ? html`<div class="rname">${c.review.name}</div>` : nothing}
                      ${stars(5, c.starsColor)}
                    </div>
                  </div>`
                : nothing}

              ${this.renderTabs(c)}
            </div>
          </div>
        </div>

        ${c.showLogos && c.logos.length
          ? html`<div class="logos">
              <div class="container logos-inner">
                ${c.logosTitle ? html`<span class="logos-title">${c.logosTitle}</span>` : nothing}
                ${c.logos.map((l: Dict) =>
                  safeUrl(l.image)
                    ? html`<span class="logo"><img src="${safeUrl(l.image)}" alt="${l.name || ""}" loading="lazy" /></span>`
                    : html`<span class="logo">${l.name}</span>`
                )}
              </div>
            </div>`
          : nothing}
      </section>
    `;
  }
}
