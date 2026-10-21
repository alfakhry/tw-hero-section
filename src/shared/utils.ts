// Helpers shared by the landing-page components.
// Each component gets its own copy at build time (see vite.config.js).

type Dict = Record<string, unknown>;

declare global {
  interface Window {
    salla?: any;
    Salla?: any;
  }
}

/** Current storefront language ("ar", "en", ...). */
export function locale(): string {
  const w = window;
  const fromSalla =
    w.salla?.lang?.getLocale?.() ||
    w.Salla?.lang?.getLocale?.() ||
    w.salla?.config?.get?.("user.language_code");
  return String(fromSalla || document.documentElement.lang || "ar").slice(0, 2).toLowerCase();
}

/** Text direction of the storefront. */
export function direction(): "rtl" | "ltr" {
  const dir = (document.documentElement.getAttribute("dir") || document.body?.getAttribute("dir") || "").toLowerCase();
  if (dir === "rtl" || dir === "ltr") return dir;
  return ["ar", "he", "fa", "ur"].includes(locale()) ? "rtl" : "ltr";
}

/** Fixed interface strings (everything else is merchant-editable content). */
const STRINGS: Record<string, Record<string, string>> = {
  ar: {
    previous: "السابق",
    next: "التالي",
    play: "تشغيل الفيديو",
    rating: "التقييم {value} من 5",
    reviews: "{count} تقييم",
    securePayment: "وسائل دفع آمنة",
    step: "الخطوة {n}",
    verified: "مشتري موثّق",
    close: "إغلاق",
    image: "عرض الصورة {n}",
    ratedBy: "تقييم من قبل {count} عميل",
  },
  en: {
    previous: "Previous",
    next: "Next",
    play: "Play video",
    rating: "Rated {value} out of 5",
    reviews: "{count} reviews",
    securePayment: "Secure payment methods",
    step: "Step {n}",
    verified: "Verified buyer",
    close: "Close",
    image: "Show image {n}",
    ratedBy: "rated by {count} customers",
  },
};

export function t(key: string, vars: Record<string, string | number> = {}): string {
  const table = STRINGS[locale()] || STRINGS.en;
  let out = table[key] ?? STRINGS.en[key] ?? key;
  Object.entries(vars).forEach(([k, v]) => (out = out.replace(`{${k}}`, String(v))));
  return out;
}

/** Reads a merchant value that may be plain text or a {ar, en} object. */
export function text(value: unknown): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "object") {
    const obj = value as Record<string, string>;
    return obj[locale()] || obj.ar || obj.en || Object.values(obj).find((v) => typeof v === "string" && v) || "";
  }
  return "";
}

/** Returns `fallback` only when the merchant never set the field. */
export function textOr(value: unknown, fallback: string): string {
  return value === undefined || value === null ? fallback : text(value).trim();
}

export function isOn(value: unknown, fallback: boolean): boolean {
  if (value === undefined || value === null || value === "") return fallback;
  if (Array.isArray(value)) return value.length > 0;
  return !(value === false || value === 0 || value === "0" || value === "false");
}

export function color(value: unknown, fallback: string): string {
  const c = text(value).trim();
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(c) ? c : fallback;
}

export function number(value: unknown, fallback: number, min = -Infinity, max = Infinity): number {
  const n = Number.parseFloat(text(value));
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

/** Value of a dropdown-list field (string, option object or array of options). */
export function option(value: unknown, fallback: string): string {
  const pick = Array.isArray(value) ? value[0] : value;
  if (pick && typeof pick === "object") {
    const v = (pick as Dict).value ?? (pick as Dict).key;
    return v ? String(v) : fallback;
  }
  return pick ? String(pick) : fallback;
}

export function list(value: unknown): Dict[] {
  return Array.isArray(value) ? (value.filter((v) => v && typeof v === "object") as Dict[]) : [];
}

/** Collection items may arrive as `field` or `collection.field`. */
export function item(row: Dict, collection: string, key: string): unknown {
  if (row[key] !== undefined && row[key] !== "") return row[key];
  const prefixed = row[`${collection}.${key}`];
  return prefixed !== undefined ? prefixed : row[key];
}

/** Accepts only http(s) links and in-page anchors. */
export function safeUrl(value: unknown): string {
  const url = text(value).trim();
  if (!url) return "";
  if (url.startsWith("#") || url.startsWith("/")) return url;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.href : "";
  } catch {
    return "";
  }
}

export function hexToRgba(hex: string, alpha: number): string {
  let v = hex.replace("#", "");
  if (v.length === 3) v = v.split("").map((c) => c + c).join("");
  const n = Number.parseInt(v, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

/** Light or dark text for a given background color. */
export function contrastText(hex: string): string {
  let v = hex.replace("#", "");
  if (v.length === 3) v = v.split("").map((c) => c + c).join("");
  const n = Number.parseInt(v, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.45 ? "#111827" : "#ffffff";
}

/** Converts a YouTube / Vimeo / TikTok link to an embeddable URL, or "" for direct video files. */
export function videoEmbed(url: string): string {
  const yt =
    url.match(/youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)([\w-]{6,})/) || url.match(/youtu\.be\/([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&playsinline=1`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  const tiktok = url.match(/tiktok\.com\/.*\/video\/(\d+)/);
  if (tiktok) return `https://www.tiktok.com/embed/v2/${tiktok[1]}`;
  return "";
}

/** YouTube thumbnail when the merchant did not upload a cover. */
export function videoPoster(url: string): string {
  const yt =
    url.match(/youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)([\w-]{6,})/) || url.match(/youtu\.be\/([\w-]{6,})/);
  return yt ? `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg` : "";
}

export const SALLA_ICONS_CSS = "https://cdn.salla.network/fonts/sallaicons.css?v=2.0.5";

/**
 * Salla icon classes are styled inside each component (shadow DOM), but browsers only
 * register @font-face rules from the document, so the stylesheet is also added once to <head>.
 * Storefront themes usually load it already; this only covers themes that don't.
 */
export function ensureSallaIcons(): void {
  const loaded = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')).some((l) =>
    l.href.includes("sallaicons")
  );
  if (loaded) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = SALLA_ICONS_CSS;
  document.head.appendChild(link);
}

export const PLACEHOLDER_IMAGE = "https://cdn.salla.network/images/placeholder.png";
