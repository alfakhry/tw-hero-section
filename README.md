# Conversion Boost Kit (مجموعة زيادة التحويل) — Salla component bundle

A Salla Twilight component bundle with nine elements that help merchants persuade customers and get more orders.
Every section is a separate component that merchants add to any page of their store and can show,
hide and reorder freely. User guide: https://help.oarood.com/conversion-boost/

مجموعة عناصر لبناء صفحات هبوط لمنتج واحد على سلة. كل قسم مكوّن مستقل، ويقدر التاجر يظهره أو يخفيه أو يغيّر ترتيبه.

## Components

| Component | Purpose |
|---|---|
| `hero` | Buy section linked to a store product: top features bar, gallery, rating, live price, quantity offers or the Bundles app, Salla options, add to cart / quick order, payment logos, trust card, review, tabs and an "as recommended by" strip |
| `lp-transformation` | 2–4 steps (problem → solution journey) with icons |
| `lp-features` | Alternating image/text rows, optional "what's in the box" panel and CTA |
| `lp-benefits` | Alternating image/text rows describing customer benefits |
| `lp-social-proof` | Written reviews, video reviews (YouTube / Vimeo / TikTok / mp4) and customer photos |
| `store-features` | Shipping, payment, support and returns highlights |
| `lp-comparison` | Comparison table (your product vs two alternatives) with an optional image |
| `lp-faq` | FAQ accordion beside a heading and intro, optional CTA |
| `lp-final-cta` | Closing headline with the primary call to action |

Landing page templates live in `templates/` (perfume, skincare, electronics, abaya, coffee) with thumbnails in `templates-thumbs/`.

## Conventions

- **Bilingual**: merchant text fields are `multilanguage` with Arabic and English defaults (numbers,
  prices and colors are not); fixed interface strings come from the dictionary in `src/shared/utils.ts`,
  and built-in fallback texts from `src/shared/defaults.ts`.
- **Collection sub-fields** use Salla's `collection.field` ids (e.g. `tiers.price`).
- **RTL and LTR**: layouts use logical CSS properties and follow the storefront `dir`.
- **Theme friendly**: components inherit the store font; colors are merchant settings.
- **One primary action**: every CTA scrolls to the purchase section (`hero`) or opens a merchant link.
- **Real products**: when a product is chosen in `hero`, price, images and options come from
  `salla.product.getDetails`, options render with `salla-product-options`, and the button uses
  `salla.cart.addItem`. Without a product the section works in manual (display) mode.
- **Bundles & Product Offers app**: `hero` provides a `#bundle-pro-widget` mount, sets
  `window.__BUNDLE_PRO_PRODUCT_ID__`, calls `window.BundlePro.mount(el, id)` when available and
  dispatches a `wahaj:product` DOM event (`detail: { productId, element }`).
- **Self-contained files**: code in `src/shared/` is copied into each component at build time
  (see `vite.config.js`), so each `dist/<component>.js` loads with a single request.
- **No external scripts**: only Salla's own icon font (`sallaicons.css`) and Salla web components are used.
  Video reviews embed the merchant's YouTube / Vimeo / TikTok link in an iframe only after the visitor presses play.
- **React themes**: the bundle renders through `<salla-custom-component>`, so it works with both Twig and React (Twilight) themes.

## Development

```bash
pnpm install
pnpm dev     # Salla demo with the component editor
pnpm build   # outputs dist/<component>.js
```

## Structure

```
src/
  components/<name>/index.ts   # one LitElement per component
  shared/                      # styles, CTA block, image rows, payment logos, helpers
templates/                     # landing page templates (component values)
templates-thumbs/              # template thumbnails (max 768px wide)
twilight-bundle.json           # component schemas, templates and bundle metadata
```

See `CHANGELOG.md` for release notes.
