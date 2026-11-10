/**
 * Video links for the social proof section.
 *
 * Nothing from the video site loads until the customer presses play: the card only shows
 * a thumbnail image. Thumbnails come from the merchant's cover, or automatically from the
 * video site (YouTube image URL, or the public oEmbed endpoint of TikTok / Vimeo).
 */

export type VideoKind = "youtube" | "tiktok" | "vimeo" | "instagram" | "file";

export type VideoInfo = {
  kind: VideoKind;
  /** Player URL for the iframe (empty for a plain video file). */
  embed: string;
  /** Thumbnail known without a request (YouTube). */
  poster: string;
  /** Portrait (shorts, TikTok, reels, phone files) or landscape. */
  vertical: boolean;
};

const YT = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/;

export function parseVideo(url: string): VideoInfo | null {
  if (!url) return null;
  const yt = url.match(YT);
  if (yt) {
    const short = /\/shorts\//.test(url);
    return {
      kind: "youtube",
      embed: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&playsinline=1&modestbranding=1`,
      // oar2 is the portrait thumbnail YouTube makes for shorts; hq720 is the 16:9 one.
      poster: `https://i.ytimg.com/vi/${yt[1]}/${short ? "oar2" : "hq720"}.jpg`,
      vertical: short,
    };
  }
  const tiktok = url.match(/tiktok\.com\/.*\/video\/(\d+)/) || url.match(/tiktok\.com\/(?:player\/v1|embed(?:\/v2)?)\/(\d+)/);
  if (tiktok) return { kind: "tiktok", embed: tiktokPlayer(tiktok[1]), poster: "", vertical: true };
  if (/(?:vm|vt)\.tiktok\.com\/|tiktok\.com\/t\//.test(url)) return { kind: "tiktok", embed: "", poster: "", vertical: true };
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: "vimeo", embed: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&dnt=1`, poster: "", vertical: false };
  const ig = url.match(/instagram\.com\/(?:reels?|p|tv)\/([\w-]+)/);
  if (ig) return { kind: "instagram", embed: `https://www.instagram.com/reel/${ig[1]}/embed/`, poster: "", vertical: true };
  if (/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(url)) return { kind: "file", embed: "", poster: "", vertical: true };
  return null;
}

function tiktokPlayer(id: string) {
  return `https://www.tiktok.com/player/v1/${id}?autoplay=1&rel=0&description=0&music_info=0`;
}

type Meta = { poster: string; embed: string; vertical?: boolean };
const cache = new Map<string, Promise<Meta>>();

/** Thumbnail (and for TikTok short links, the player) from the site's public oEmbed. */
export function videoMeta(url: string, info: VideoInfo): Promise<Meta> {
  const known: Meta = { poster: info.poster, embed: info.embed };
  if (info.kind !== "tiktok" && info.kind !== "vimeo") return Promise.resolve(known);
  if (!cache.has(url)) {
    const endpoint =
      info.kind === "tiktok"
        ? `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`
        : `https://vimeo.com/api/oembed.json?width=720&url=${encodeURIComponent(url)}`;
    cache.set(
      url,
      fetch(endpoint)
        .then((r) => (r.ok ? r.json() : {}))
        .then((j: Record<string, unknown>) => {
          const poster = typeof j.thumbnail_url === "string" ? j.thumbnail_url : "";
          const id = typeof j.embed_product_id === "string" ? j.embed_product_id : "";
          const w = Number(j.width);
          const h = Number(j.height);
          return {
            poster,
            embed: info.embed || (id ? tiktokPlayer(id) : ""),
            vertical: info.kind === "vimeo" && w && h ? h > w : undefined,
          };
        })
        .catch(() => known)
    );
  }
  return cache.get(url)!;
}
