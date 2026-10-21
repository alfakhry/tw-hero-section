import { css, html, nothing } from "lit";
import { PLACEHOLDER_IMAGE, hexToRgba, item, list, option, text } from "./utils";

type Dict = Record<string, unknown>;
export type Row = { image: string; title: string; text: string; points: string[] };

/** Reads an image + text collection, falling back to defaults when it is empty. */
export function readRows(value: unknown, collection: string, defaults: Row[]): Row[] {
  const rows = list(value);
  if (!rows.length) return defaults;
  return rows
    .map((row: Dict) => ({
      image: text(item(row, collection, "image")).trim(),
      title: text(item(row, collection, "title")).trim(),
      text: text(item(row, collection, "text")).trim(),
      points: text(item(row, collection, "points"))
        .split(/\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean),
    }))
    .filter((r) => r.title || r.text || r.image);
}

/** "start" = first image on the reading-start side, then alternating. */
export function firstImageSide(value: unknown): "start" | "end" {
  return option(value, "end") === "start" ? "start" : "end";
}

/** Alternating image / text rows used by the Benefits and Features sections. */
export function rowsTemplate(rows: Row[], first: "start" | "end", accent: string) {
  return html`<div class="rows">
    ${rows.map((r, i) => {
      const imageAtStart = (i % 2 === 0) === (first === "start");
      return html`<article class="row ${imageAtStart ? "img-start" : "img-end"}">
        <div class="row-media">
          <img src="${r.image || PLACEHOLDER_IMAGE}" alt="${r.title}" loading="lazy" decoding="async" />
        </div>
        <div class="row-body">
          ${r.title ? html`<h3>${r.title}</h3>` : nothing}
          ${r.text ? html`<p>${r.text}</p>` : nothing}
          ${r.points.length
            ? html`<ul class="checks">
                ${r.points.map(
                  (p) => html`<li><span class="tick" style="color:${accent};background:${hexToRgba(accent, 0.12)}" aria-hidden="true">✓</span>${p}</li>`
                )}
              </ul>`
            : nothing}
        </div>
      </article>`;
    })}
  </div>`;
}

export const rowsStyles = css`
  .rows { display: flex; flex-direction: column; gap: 2.5rem; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
  .row.img-end .row-media { order: 2; }
  .row-media img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: var(--lp-radius); background: #e5e7eb; }
  .row-body h3 { margin: 0 0 0.6rem; font-size: 1.45rem; line-height: 1.4; font-weight: 700; color: var(--lp-heading); }
  .row-body p { margin: 0; color: #4b5563; font-size: 1.02rem; line-height: 1.85; }
  .checks { list-style: none; margin: 1rem 0 0; padding: 0; display: grid; gap: 0.55rem; }
  .checks li { display: flex; gap: 0.6rem; align-items: flex-start; line-height: 1.6; color: #374151; }
  .tick {
    width: 22px; height: 22px; border-radius: 50%; flex: 0 0 auto; margin-top: 0.1rem;
    display: inline-grid; place-items: center; font-size: 0.75rem; font-weight: 700;
  }

  @media (max-width: 768px) {
    .rows { gap: 2rem; }
    .row { grid-template-columns: 1fr; gap: 1rem; }
    .row.img-end .row-media { order: 0; }
    .row-body h3 { font-size: 1.25rem; }
  }
`;
