# Changelog

## 0.7.0 — 2026-11-09

### Changed
- Renamed to **Conversion Boost Kit / مجموعة زيادة التحويل**.
- Landing page templates are back (Salla allows up to four): perfume, skincare, **abayas** (new) and
  **specialty coffee** (new). The electronics template is kept on the `landing-templates` branch.
- Help center with the kit's page, templates gallery, element guide and support: https://help.oarood.com/conversion-boost/
- Store screenshots still show one element each.

## 0.6.0 — 2026-11-08

### Changed
- Renamed to **Conversion Boost Elements / عناصر زيادة التحويل**.
- Published as an additional-elements bundle: landing page templates and the `landing-page-templates`
  feature were removed at Salla's request (kept on the `landing-templates` branch).
- New user guide site: https://alfakhry.github.io/tw-hero-section/
- One store screenshot per element, with element titles and descriptions.

## 0.5.0 — 2026-11-03

### Added
- `hero` redesigned to match the landing page wireframe: top features bar (rotates on mobile), gallery with
  up to 6 thumbnails, "starting from" price, savings badge and stock indicator, quantity offer cards,
  quantity selector, secure-checkout line, trust card, review, tabs (accordion on mobile) and an
  "as recommended by" strip.
- `hero` product linking: pick a store product to use its live price, images, options and stock;
  the button adds to cart then opens the cart, adds and stays, or opens a link. Optional Salla quick
  order button and Salla product offers.
- `hero` offers source: automatic (Bundles & Product Offers app when installed, otherwise quantity
  cards), quantity cards only, app only, or none. Host-mount hooks for the app
  (`#bundle-pro-widget`, `window.BundlePro.mount`, `wahaj:product` event).
- `lp-comparison`: your product against two alternatives, with yes / partly / no marks and an optional image.
- `lp-faq`: accessible FAQ accordion beside a heading and intro, side or stacked layout, optional CTA.
- Template `electronics-landing` (wireless headphones), and comparison + FAQ sections in all templates.

### Changed
- Hero FAQ moved to the new `lp-faq` component; hero `title`/`subtitle` fields renamed to
  `headline`/`subheadline` (old values are still read).
- Templates no longer include `store-features` (the hero trust card and top bar cover it); the component
  is still available.
- New component previews, template thumbnails and store screenshots.
- Collection sub-field ids follow Salla's `collection.field` convention; saved values with the old ids are still read.
- Default texts are bilingual (Arabic / English) in the editor and in the components.
- An emptied list (reviews, FAQ, rows, steps) stays empty instead of showing sample content.
- Image and link URLs are sanitized everywhere; protocol-relative links are rejected.
- Hero: keyboard arrows for offer cards and tabs, top bar pauses on hover/focus and stops when
  the arrows are used, unique ids when a page has more than one hero, retries while the Salla SDK loads.

## 0.4.0 — 2026-10-22 (not released separately; included in 0.5.0)

### Added
- Landing page templates: `perfume-landing` and `skincare-landing` (Arabic and English content).
- `lp-transformation`: problem → solution steps with icons, numbers and connector line.
- `lp-features`: alternating image/text rows, "what's in the box" panel and CTA block.
- `lp-benefits`: alternating image/text rows for customer benefits.
- `lp-social-proof`: written reviews slider, video reviews (YouTube, Vimeo, TikTok, mp4) and customer photos.
- `lp-final-cta`: closing headline with primary CTA, optional background image.
- Shared CTA block (rating, button, payment logos) with consistent styling across sections.

### Changed
- `hero`: follows storefront direction (RTL/LTR), interface strings localized, text fields multilanguage,
  button action and trust icons are now dropdowns, accessible thumbnails and FAQ buttons.
- `hero`: Saudi riyal symbol uses Salla's icon font instead of an external font.
- `store-features`: follows storefront direction; section title field renamed to `heading`
  (it was hidden in the editor because it clashed with the features title field); texts are multilanguage.
- Payment logos compressed (≈48 KB → ≈25 KB) and shared by all components.

## 0.3.0 — 2026-10-01
- Optimized bundle size by excluding development dependencies from the repository.

## 0.2.0 — 2026-09-29
- Hero section with product image, offer, price, benefits, ratings, CTA, payment options and trust elements.

## 0.1.0 — 2026-09-29
- Initial release.
