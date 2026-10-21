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
  videoEmbed,
  videoPoster,
} from "../../shared/utils";

type Review = { avatar: string; name: string; rating: number; text: string; verified: boolean };
type Video = { url: string; cover: string; caption: string };

const DEFAULT_REVIEWS: Review[] = [
  { avatar: "", name: "سارة القحطاني", rating: 5, text: "من أفضل المنتجات اللي جربتها، النتيجة واضحة والتغليف فخم.", verified: true },
  { avatar: "", name: "عبدالله الشمري", rating: 5, text: "وصلني الطلب بسرعة والجودة أعلى من توقعاتي. أكيد بكرر الطلب.", verified: true },
  { avatar: "", name: "نورة العتيبي", rating: 4, text: "تجربة ممتازة وخدمة العملاء متعاونين جداً.", verified: true },
  { avatar: "", name: "فهد الدوسري", rating: 5, text: "يستاهل كل ريال، أنصح فيه أهلي وأصحابي.", verified: true },
];

/** Social proof: customer reviews, video reviews and a customer photo strip, each optional. */
export default class LpSocialProof extends LitElement {
  static properties = {
    config: { type: Object },
    playing: { state: true },
  };
  config?: Record<string, unknown>;
  playing!: number;

  constructor() {
    super();
    this.playing = -1;
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
        overflow: hidden; background: #111827; padding: 0; border: 0; cursor: pointer; color: #fff;
      }
      .video img, .video iframe, .video video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; border: 0; }
      .video .play {
        position: absolute; inset: 0; margin: auto; width: 60px; height: 60px; border-radius: 50%;
        background: rgba(255, 255, 255, 0.92); display: grid; place-items: center; color: #111827;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
      }
      .video .play svg { width: 24px; height: 24px; margin-inline-start: 3px; }
      .video .caption {
        position: absolute; inset-inline: 0; bottom: 0; padding: 2rem 0.85rem 0.85rem; font-size: 0.9rem; text-align: start;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
      }
      .video:focus-visible { outline: 3px solid #111827; outline-offset: 3px; }

      .photos .photo { width: min(180px, 42vw); aspect-ratio: 1; border-radius: 12px; object-fit: cover; background: #e5e7eb; }
    `,
  ];

  private get data() {
    const cfg = this.config || {};
    const reviewRows = list(cfg.reviews);
    const reviews: Review[] = reviewRows.length
      ? reviewRows
          .map((r) => ({
            avatar: text(item(r, "reviews", "avatar")).trim(),
            name: text(item(r, "reviews", "name")).trim(),
            rating: number(item(r, "reviews", "rating"), 5, 1, 5),
            text: text(item(r, "reviews", "text")).trim(),
            verified: isOn(item(r, "reviews", "verified"), true),
          }))
          .filter((r) => r.text)
      : DEFAULT_REVIEWS;
    const videos: Video[] = list(cfg.videos)
      .map((v) => ({
        url: safeUrl(item(v, "videos", "url")),
        cover: text(item(v, "videos", "cover")).trim(),
        caption: text(item(v, "videos", "caption")).trim(),
      }))
      .filter((v) => v.url);
    const photos = list(cfg.photos)
      .map((p) => text(item(p, "photos", "image")).trim())
      .filter(Boolean);
    return {
      bg: color(cfg.bg_color, "#ffffff"),
      title: textOr(cfg.heading, "آراء عملائنا"),
      subtitle: textOr(cfg.subheading, "أكثر من 5000 عميل جرّبوا المنتج، وهذه بعض تجاربهم."),
      starsColor: color(cfg.reviews_stars_color ?? cfg.stars_color, "#f5a623"),
      showReviews: isOn(cfg.show_reviews, true),
      reviews,
      showVideos: isOn(cfg.show_videos, true),
      videosTitle: textOr(cfg.videos_title, ""),
      videos,
      showPhotos: isOn(cfg.show_photos, true),
      photosTitle: textOr(cfg.photos_title, ""),
      photos,
      cta: readCta(cfg, { text: "انضم لعملائنا السعداء" }),
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
    if (this.playing === i) {
      const embed = videoEmbed(v.url);
      return html`<div class="video">
        ${embed
          ? html`<iframe
              src="${embed}"
              title="${v.caption || t("play")}"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowfullscreen
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>`
          : html`<video src="${v.url}" controls autoplay playsinline></video>`}
      </div>`;
    }
    const poster = v.cover || videoPoster(v.url);
    return html`<button class="video" type="button" aria-label="${v.caption || t("play")}" @click=${() => (this.playing = i)}>
      ${poster ? html`<img src="${poster}" alt="" loading="lazy" decoding="async" />` : nothing}
      <span class="play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg></span>
      ${v.caption ? html`<span class="caption">${v.caption}</span>` : nothing}
    </button>`;
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
