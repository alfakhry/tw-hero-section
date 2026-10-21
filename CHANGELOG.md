# Changelog

## 0.4.0 — 2026-10-22

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
