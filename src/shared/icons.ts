import { html } from "lit";

/** Line icons for trust rows and the top bar, keyed by the dropdown value. */
export const TRUST_ICONS: Record<string, () => any> = {
  شحن: () => html`<svg viewBox="0 0 24 24" fill="none"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/></svg>`,
  توصيل: () => TRUST_ICONS["شحن"](),
  استرجاع: () => html`<svg viewBox="0 0 24 24" fill="none"><path d="M4 12a8 8 0 1 1 2.3 5.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M4 18v-4h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  ضمان: () => html`<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  امان: () => html`<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.6"/></svg>`,
  دعم: () => html`<svg viewBox="0 0 24 24" fill="none"><path d="M5 13v-1a7 7 0 0 1 14 0v1" stroke="currentColor" stroke-width="1.6"/><rect x="3.5" y="13" width="3.5" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/><rect x="17" y="13" width="3.5" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/></svg>`,
  هدية: () => html`<svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="8" width="17" height="12.5" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 12h17M12 8v12.5M12 8c-1.8-3.2-5.5-3.4-5.5-1 0 1.6 3 1 5.5 1zm0 0c1.8-3.2 5.5-3.4 5.5-1 0 1.6-3 1-5.5 1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  وقت: () => html`<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.6"/><path d="M12 7.5V12l3 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  تقييم: () => html`<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.6 5.6 6 .6-4.5 4 1.3 6-5.4-3.2L6.6 19l1.3-6-4.5-4 6-.6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
};

export const personIcon = () => html`<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8.5" r="4"/><path d="M4 20c0-4.2 3.6-6.5 8-6.5s8 2.3 8 6.5z"/></svg>`;

