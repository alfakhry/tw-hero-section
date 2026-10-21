# Main Section — Landing page component bundle

A Salla Twilight component bundle for building high-converting product landing pages.
It ships as **landing page templates** (Sales channels → Landing pages): every section is a
separate component, so merchants can show, hide and reorder sections freely.

مجموعة عناصر لبناء صفحات هبوط لمنتج واحد على سلة. كل قسم مكوّن مستقل، ويقدر التاجر يظهره أو يخفيه أو يغيّر ترتيبه.

## Components

| Component | Purpose |
|---|---|
| `hero` | Product gallery, rating, price, buy button, payment logos, trust card, review and FAQ |
| `lp-transformation` | 2–4 steps (problem → solution journey) with icons |
| `lp-features` | Alternating image/text rows, optional "what's in the box" panel and CTA |
| `lp-benefits` | Alternating image/text rows describing customer benefits |
| `lp-social-proof` | Written reviews, video reviews (YouTube / Vimeo / TikTok / mp4) and customer photos |
| `store-features` | Shipping, payment, support and returns highlights |
| `lp-final-cta` | Closing headline with the primary call to action |

Templates live in `templates/` (`perfume-landing`, `skincare-landing`) with thumbnails in `templates-thumbs/`.

## Conventions

- **Bilingual**: every merchant text field is `multilanguage`; fixed interface strings come from
  the small dictionary in `src/shared/utils.ts` (Arabic / English).
- **RTL and LTR**: layouts use logical CSS properties and follow the storefront `dir`.
- **Theme friendly**: components inherit the store font; colors are merchant settings.
- **One primary action**: every CTA scrolls to the purchase section (`hero`) or opens a merchant link.
- **Self-contained files**: code in `src/shared/` is copied into each component at build time
  (see `vite.config.js`), so each `dist/<component>.js` loads with a single request.
- **No external scripts**: only Salla's own icon font (`sallaicons.css`) is loaded.

## Development

```bash
pnpm install
pnpm dev     # Salla demo with the component editor and template switcher
pnpm build   # outputs dist/<component>.js
```

## Structure

```
src/
  components/<name>/index.ts   # one LitElement per component
  shared/                      # styles, CTA block, image rows, payment logos, helpers
templates/                     # landing page templates (component values)
templates-thumbs/              # template thumbnails (max 768px wide)
twilight-bundle.json           # component schemas, templates and bundle features
```

See `CHANGELOG.md` for release notes.
