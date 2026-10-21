import { css } from "lit";

/**
 * Base styles shared by the landing-page components.
 * Colors come from merchant settings; typography inherits the store theme font.
 * Logical properties (inline-start/end) keep layouts correct in both RTL and LTR.
 */
export const baseStyles = css`
  :host {
    display: block;
    font-family: inherit;
    color: #1f2937;
    --lp-radius: 16px;
    --lp-muted: #6b7280;
    --lp-heading: #111827;
  }
  * { box-sizing: border-box; }
  img { max-width: 100%; display: block; }

  .section { padding: 3.5rem 1rem; }
  .container { max-width: 1140px; margin-inline: auto; }

  .head { text-align: center; max-width: 680px; margin: 0 auto 2.25rem; }
  .head h2 { margin: 0 0 0.5rem; font-size: 1.85rem; line-height: 1.35; font-weight: 700; color: var(--lp-heading); }
  .head p { margin: 0; color: var(--lp-muted); font-size: 1.05rem; line-height: 1.75; }

  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
  }

  /* Rating stars */
  .stars { display: inline-flex; gap: 2px; vertical-align: middle; }
  .stars svg { width: 18px; height: 18px; display: block; }

  /* Call to action block */
  .cta-block { display: flex; flex-direction: column; align-items: center; gap: 0.9rem; margin-top: 2.5rem; text-align: center; }
  .cta-rating { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0.45rem; font-size: 0.95rem; color: #374151; }
  .cta-rating strong { font-weight: 700; }
  .cta-btn {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: min(100%, 320px); min-height: 52px; padding: 0.85rem 2rem;
    border: 0; border-radius: 12px; cursor: pointer; text-decoration: none;
    font: inherit; font-size: 1.1rem; font-weight: 700;
    transition: filter 0.15s ease, transform 0.15s ease;
  }
  .cta-btn:hover { filter: brightness(0.94); }
  .cta-btn:active { transform: translateY(1px); }
  .cta-btn:focus-visible { outline: 3px solid currentColor; outline-offset: 3px; }
  .cta-note { margin: 0; color: var(--lp-muted); font-size: 0.9rem; }
  .pay { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0.4rem; margin: 0; padding: 0; list-style: none; }
  .pay img { height: 28px; width: auto; }

  /* Horizontal scroller with prev/next buttons */
  .scroller { position: relative; }
  .track {
    display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory;
    scroll-behavior: smooth; scrollbar-width: none; padding: 0.25rem 0.1rem 0.75rem;
    overscroll-behavior-x: contain;
  }
  .track::-webkit-scrollbar { display: none; }
  .track > * { scroll-snap-align: start; flex: 0 0 auto; }
  .nav {
    position: absolute; top: 50%; transform: translateY(-50%); z-index: 2;
    width: 40px; height: 40px; border-radius: 50%; border: 1px solid #e5e7eb;
    background: #fff; color: #111827; cursor: pointer; display: grid; place-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  .nav svg { width: 18px; height: 18px; }
  .nav.prev { inset-inline-start: -14px; }
  .nav.next { inset-inline-end: -14px; }
  .nav:focus-visible { outline: 3px solid #111827; outline-offset: 2px; }

  @media (max-width: 768px) {
    .section { padding: 2.5rem 1rem; }
    .head { margin-bottom: 1.5rem; }
    .head h2 { font-size: 1.45rem; }
    .nav { display: none; }
    .cta-btn { width: 100%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .track { scroll-behavior: auto; }
    .cta-btn { transition: none; }
  }
`;
