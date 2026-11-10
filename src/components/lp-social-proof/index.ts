import { d } from "../../shared/defaults";
import { css, html, LitElement, nothing } from "lit";
import { baseStyles } from "../../shared/styles";
import { chevron, chevronNext, ctaBlock, readCta, scrollTrack, stars } from "../../shared/cta";
import {
  PLACEHOLDER_IMAGE,
  color,
  direction,
  isOn,
  item,
  list,
  number,
  safeUrl,
  t,
  text,
  textOr,
} from "../../shared/utils";
import { parseVideo, videoMeta, type VideoInfo } from "../../shared/video";

type Review = { avatar: string; name: string; rating: number; text: string; verified: boolean };
type Video = { url: string; cover: string; caption: string };

const DEFAULT_REVIEWS = (): Review[] => [
  { avatar: "", name: d("سارة القحطاني"), rating: 5, text: d("من أفضل المنتجات اللي جربتها، النتيجة واضحة والتغليف فخم."), verified: true },
  { avatar: "", name: d("عبدالله الشمري"), rating: 5, text: d("وصلني الطلب بسرعة والجودة أعلى من توقعاتي. أكيد بكرر الطلب."), verified: true },
  { avatar: "", name: d("نورة العتيبي"), rating: 4, text: d("تجربة ممتازة وخدمة العملاء متعاونين جداً."), verified: true },
  { avatar: "", name: d("فهد الدوسري"), rating: 5, text: d("يستاهل كل ريال، أنصح فيه أهلي وأصحابي."), verified: true },
];

/** Social proof: customer reviews, video reviews and a customer photo strip, each optional. */
export default class LpSocialProof extends LitElement {
  static properties = {
    config: { type: Object },
    playing: { state: true },
    posters: { state: true },
  };
  config?: Record<string, unknown>;
  /** Index of the video open in the player window, -1 when closed. */
  playing!: number;
  /** Thumbnails and players found through oEmbed, by video URL. */
  posters!: Record<string, { poster: string; embed: string; vertical?: boolean }>;
  private seen = false;
  private observer?: IntersectionObserver;

  constructor() {
    super();
    this.playing = -1;
    this.posters = {};
  }

  connectedCallback() {
    super.connectedCallback();
    // Thumbnails are looked up only when the section comes close to the screen.
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            this.seen = true;
            this.observer?.disconnect();
            this.loadPosters();
          }
        },
        { rootMargin: "400px" }
      );
      this.observer.observe(this);
    } else {
      this.seen = true;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer?.disconnect();
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("config") && this.seen) this.loadPosters();
    const dialog = this.renderRoot.querySelector<HTMLDialogElement>("dialog.player");
    if (dialog && !dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }
  }

  private loadPosters() {
    for (const v of this.data.videos) {
      const info = parseVideo(v.url);
      if (!info || this.posters[v.url]) continue;
      videoMeta(v.url, info).then((m) => {
        if (m.poster || m.embed !== info.embed || m.vertical !== undefined) this.posters = { ...this.posters, [v.url]: m };
      });
    }
  }

  private info(v: Video): VideoInfo {
    const base = parseVideo(v.url) || { kind: "file" as const, embed: "", poster: "", vertical: true };
    const m = this.posters[v.url];
    return {
      ...base,
      embed: m?.embed || base.embed,
      poster: v.cover || m?.poster || base.poster,
      vertical: m?.vertical ?? base.vertical,
    };
  }

  private open(v: Video, i: number) {
    const info = this.info(v);
    // A link the page cannot play in place (unknown site, unresolved short link) opens in a new tab.
    if (!parseVideo(v.url) || (!info.embed && info.kind !== "file")) {
      window.open(v.url, "_blank", "noopener");
      return;
    }
    this.playing = i;
  }

  private close() {
    const dialog = this.renderRoot.querySelector<HTMLDialogElement>("dialog.player");
    if (dialog?.open && typeof dialog.close === "function") dialog.close();
    const i = this.playing;
    this.playing = -1;
    // Return focus to the card that opened the player.
    this.updateComplete.then(() => this.renderRoot.querySelectorAll<HTMLElement>(".video")[i]?.focus());
  }

  static styles = [
    baseStyles,
    css`
      .block + .block { margin-top: 2.5rem; }
      .block-title { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 700; color: var(--lp-heading); }

      .review {
        width: min(320px, 82vw); background: #fff; border: 1px solid #eef0f2; border-radius: var(--lp-radius);
        padding: 1.4rem; display: flex; flex-direction: column; gap: 0.75rem;
      }
      .who { display: flex; align-items: center; gap: 0.75rem; }
      .avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; flex: 0 0 auto; background: #e5e7eb; }
      .initial { display: grid; place-items: center; font-weight: 700; font-size: 1.1rem; }
      .name { font-weight: 700; color: var(--lp-heading); }
      .verified { display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.8rem; color: #047857; }
      .review p { margin: 0; color: #374151; line-height: 1.75; }

      .video {
        position: relative; width: min(220px, 60vw); aspect-ratio: 9 / 16; border-radius: var(--lp-radius);
        overflow: hidden; background: #111827; padding: 0; border: 0; cursor: pointer; color: #fff; display: block;
      }
      .video img, .video video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; border: 0; pointer-events: none; }
      .video.blank { background: radial-gradient(120% 80% at 30% 20%, #374151, #111827 70%); }
      .video .play {
        position: absolute; inset: 0; margin: auto; width: 60px; height: 60px; border-radius: 50%;
        background: rgba(255, 255, 255, 0.92); display: grid; place-items: center; color: #111827;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25); transition: transform 0.15s;
      }
      .video:hover .play { transform: scale(1.08); }
      .video .play svg { width: 24px; height: 24px; margin-inline-start: 3px; }
      .video .src {
        position: absolute; top: 0.6rem; inset-inline-start: 0.6rem; font-size: 0.7rem; font-weight: 700;
        background: rgba(0, 0, 0, 0.55); padding: 2px 8px; border-radius: 999px;
      }
      .video .caption {
        position: absolute; inset-inline: 0; bottom: 0; padding: 2rem 0.85rem 0.85rem; font-size: 0.9rem; text-align: start;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
      }
      .video:focus-visible { outline: 3px solid #111827; outline-offset: 3px; }

      dialog.player {
        border: 0; padding: 0; background: transparent; max-width: none; max-height: none;
        width: 100vw; height: 100vh; height: 100dvh; margin: 0; inset: 0; overflow: hidden;
      }
      dialog.player::backdrop { background: rgba(0, 0, 0, 0.92); }
      .player-wrap { position: absolute; inset: 0; display: grid; place-items: center; padding: 3.5rem 1rem 1rem; }
      .frame { position: relative; background: #000; border-radius: 14px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); }
      .frame.v { aspect-ratio: 9 / 16; height: min(100%, 88dvh, calc((100vw - 2rem) * 16 / 9)); }
      .frame.h { aspect-ratio: 16 / 9; width: min(100%, 1000px, calc((100dvh - 5rem) * 16 / 9)); }
      .frame iframe, .frame video { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; background: #000; }
      .x {
        position: absolute; top: 0.75rem; inset-inline-end: 0.75rem; width: 44px; height: 44px; border-radius: 50%; border: 0;
        background: rgba(255, 255, 255, 0.95); color: #111827; font-size: 1.6rem; line-height: 1; cursor: pointer; display: grid; place-items: center;
      }
      .x:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
      .player-caption { position: absolute; bottom: 0.75rem; inset-inline: 1rem; text-align: center; color: #fff; font-size: 0.95rem; }

      .photos .photo { width: min(180px, 42vw); aspect-ratio: 1; border-radius: 12px; object-fit: cover; background: #e5e7eb; }
    `,
  ];

  private get data() {
    const cfg = this.config || {};
    const reviewRows = list(cfg.reviews);
    const reviews: Review[] = cfg.reviews !== undefined && cfg.reviews !== null
      ? reviewRows
          .map((r) => ({
            avatar: safeUrl(item(r, "reviews", "avatar")),
            name: text(item(r, "reviews", "name")).trim(),
            rating: number(item(r, "reviews", "rating"), 5, 1, 5),
            text: text(item(r, "reviews", "text")).trim(),
            verified: isOn(item(r, "reviews", "verified"), true),
          }))
          .filter((r) => r.text)
      : DEFAULT_REVIEWS();
    const videos: Video[] = list(cfg.videos)
      .map((v) => ({
        url: safeUrl(item(v, "videos", "url")),
        cover: safeUrl(item(v, "videos", "cover")),
        caption: text(item(v, "videos", "caption")).trim(),
      }))
      .filter((v) => v.url);
    const photos = list(cfg.photos)
      .map((p) => safeUrl(item(p, "photos", "image")))
      .filter(Boolean);
    return {
      bg: color(cfg.bg_color, "#ffffff"),
      title: textOr(cfg.heading, d("آراء عملائنا")),
      subtitle: textOr(cfg.subheading, d("أكثر من 5000 عميل جرّبوا المنتج، وهذه بعض تجاربهم.")),
      starsColor: color(cfg.reviews_stars_color ?? cfg.stars_color, "#f5a623"),
      showReviews: isOn(cfg.show_reviews, true),
      reviews,
      showVideos: isOn(cfg.show_videos, true),
      videosTitle: textOr(cfg.videos_title, ""),
      videos,
      showPhotos: isOn(cfg.show_photos, true),
      photosTitle: textOr(cfg.photos_title, ""),
      photos,
      cta: readCta(cfg, { text: d("انضم لعملائنا السعداء") }),
    };
  }

  private nav(selector: string, rtl: boolean) {
    const root = this.renderRoot as ShadowRoot;
    return html`
      <button class="nav prev" type="button" aria-label="${t("previous")}" @click=${() => scrollTrack(root, selector, -1, rtl)}>
        ${rtl ? chevronNext : chevron}
      </button>
      <button class="nav next" type="button" aria-label="${t("next")}" @click=${() => scrollTrack(root, selector, 1, rtl)}>
        ${rtl ? chevron : chevronNext}
      </button>
    `;
  }

  private renderReview(r: Review, starsColor: string) {
    const initial = r.name.trim().charAt(0) || "★";
    return html`<article class="review">
      <div class="who">
        ${r.avatar
          ? html`<img class="avatar" src="${r.avatar}" alt="${r.name}" loading="lazy" decoding="async" />`
          : html`<span class="avatar initial" aria-hidden="true">${initial}</span>`}
        <div>
          ${r.name ? html`<div class="name">${r.name}</div>` : nothing}
          ${r.verified ? html`<span class="verified">✓ ${t("verified")}</span>` : nothing}
        </div>
      </div>
      <div>${stars(r.rating, starsColor)}<span class="sr-only">${t("rating", { value: r.rating })}</span></div>
      <p>${r.text}</p>
    </article>`;
  }

  private renderVideo(v: Video, i: number) {
    const info = this.info(v);
    const label = v.caption || t("play");
    const site = { youtube: "YouTube", tiktok: "TikTok", vimeo: "Vimeo", instagram: "Instagram", file: "" }[info.kind];
    const blank = !info.poster && info.kind !== "file";
    return html`<button class="video ${blank ? "blank" : ""}" type="button" aria-label="${label}" aria-haspopup="dialog" @click=${() => this.open(v, i)}>
      ${info.poster
        ? html`<img
            src="${info.poster}"
            alt=""
            loading="lazy"
            decoding="async"
            @error=${(e: Event) => {
              // Older YouTube videos have no hq720 / oar2 image; hqdefault always exists.
              const img = e.target as HTMLImageElement;
              const yt = img.src.match(/i\.ytimg\.com\/vi\/([\w-]{11})\/(?!hqdefault)/);
              if (yt) img.src = `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`;
            }}
          />`
        : info.kind === "file"
          ? html`<video src="${v.url}#t=0.1" preload="metadata" muted playsinline tabindex="-1" aria-hidden="true"></video>`
          : nothing}
      ${site ? html`<span class="src" aria-hidden="true">${site}</span>` : nothing}
      <span class="play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg></span>
      ${v.caption ? html`<span class="caption">${v.caption}</span>` : nothing}
    </button>`;
  }

  private renderPlayer(v: Video) {
    const info = this.info(v);
    const label = v.caption || t("play");
    return html`<dialog
      class="player"
      aria-label="${label}"
      @cancel=${(e: Event) => {
        e.preventDefault();
        this.close();
      }}
      @click=${(e: Event) => {
        const el = e.target as HTMLElement;
        if (el.classList.contains("player") || el.classList.contains("player-wrap")) this.close();
      }}
    >
      <div class="player-wrap">
        <div class="frame ${info.vertical ? "v" : "h"}">
          ${info.embed
            ? html`<iframe
                src="${info.embed}"
                title="${label}"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowfullscreen
                referrerpolicy="strict-origin-when-cross-origin"
              ></iframe>`
            : html`<video src="${v.url}" controls autoplay playsinline></video>`}
        </div>
        ${v.caption ? html`<p class="player-caption">${v.caption}</p>` : nothing}
      </div>
      <button class="x" type="button" aria-label="${t("close")}" @click=${() => this.close()} autofocus>×</button>
    </dialog>`;
  }

  render() {
    const d = this.data;
    const dir = direction();
    const rtl = dir === "rtl";
    const showReviews = d.showReviews && d.reviews.length > 0;
    const showVideos = d.showVideos && d.videos.length > 0;
    const showPhotos = d.showPhotos && d.photos.length > 0;
    if (!showReviews && !showVideos && !showPhotos && !d.cta.enabled) return nothing;

    return html`
      <section class="section" dir="${dir}" style="background:${d.bg}" aria-label="${d.title || nothing}">
        <div class="container">
          ${d.title || d.subtitle
            ? html`<div class="head">
                ${d.title ? html`<h2>${d.title}</h2>` : nothing}
                ${d.subtitle ? html`<p>${d.subtitle}</p>` : nothing}
              </div>`
            : nothing}

          ${showReviews
            ? html`<div class="block scroller">
                <div class="track reviews-track">${d.reviews.map((r) => this.renderReview(r, d.starsColor))}</div>
                ${d.reviews.length > 3 ? this.nav(".reviews-track", rtl) : nothing}
              </div>`
            : nothing}

          ${showVideos
            ? html`<div class="block">
                ${d.videosTitle ? html`<h3 class="block-title">${d.videosTitle}</h3>` : nothing}
                <div class="scroller">
                  <div class="track videos-track">${d.videos.map((v, i) => this.renderVideo(v, i))}</div>
                  ${d.videos.length > 4 ? this.nav(".videos-track", rtl) : nothing}
                </div>
                ${this.playing >= 0 && d.videos[this.playing] ? this.renderPlayer(d.videos[this.playing]) : nothing}
              </div>`
            : nothing}

          ${showPhotos
            ? html`<div class="block photos">
                ${d.photosTitle ? html`<h3 class="block-title">${d.photosTitle}</h3>` : nothing}
                <div class="track">
                  ${d.photos.map(
                    (src) => html`<img class="photo" src="${src || PLACEHOLDER_IMAGE}" alt="" loading="lazy" decoding="async" />`
                  )}
                </div>
              </div>`
            : nothing}

          ${ctaBlock(d.cta)}
        </div>
      </section>
    `;
  }
}
