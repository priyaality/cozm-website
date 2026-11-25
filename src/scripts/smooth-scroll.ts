/**
 * Smooth scrolling (Lenis), like odins-crow.com's: mouse-wheel and trackpad
 * scrolling eases toward where the wheel sends it (lerp 0.1) instead of
 * jumping. The page still scrolls natively underneath (window.scrollTo each
 * frame), so sticky / pinned sections and the scroll-driven effects keep
 * working as they are.
 *
 * - Touch scrolling stays native (phones and tablets), as on the reference.
 * - Off with prefers-reduced-motion (Lenis follows it on its own).
 * - Follows the home hero's scroll lock: autoToggle stops Lenis while <html>
 *   has overflow: hidden.
 * - Leaves alone wheel events another handler has already taken (the home
 *   page's hero ↔ intro glide calls preventDefault): it drops its own easing
 *   then, so the two don't fight over the scroll position.
 * - A click or tap ends any easing still running, so code that scrolls the page
 *   on click (the accordion, the scroll-down cue) starts from a still page.
 * - A link to a section of the page you're on, written as a path ('/#services'
 *   from the nav while on the home page), fades the screen to black, jumps so
 *   the section's top sits just below the header, and fades back (a long glide
 *   would race through the pinned sideways cards on the way). Instant with
 *   prefers-reduced-motion. Plain '#…' links (the skip link) keep the
 *   browser's behaviour, which also moves keyboard focus.
 *
 * Started after the other page scripts have run (DOMContentLoaded), so its
 * wheel listener comes after theirs and sees their preventDefault.
 */
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const FADE_IN_MS = 220;
const FADE_OUT_MS = 320;
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Fade to black, jump to `top`, fade back. */
const fadeTo = async (lenis: Lenis, top: number) => {
  const jump = () => lenis.scrollTo(top, { immediate: true, force: true });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return jump();
  const veil = document.createElement('div');
  veil.ariaHidden = 'true';
  // Above the header (50) and the font picker button (60), like the page curtain.
  veil.style.cssText = `position:fixed;inset:0;z-index:90;background:var(--color-black);opacity:0;transition:opacity ${FADE_IN_MS}ms ease-in`;
  document.body.append(veil);
  void veil.offsetWidth; // start from opacity 0
  veil.style.opacity = '1';
  await wait(FADE_IN_MS);
  jump();
  veil.style.transition = `opacity ${FADE_OUT_MS}ms ease-out`;
  veil.style.opacity = '0';
  await wait(FADE_OUT_MS);
  veil.remove();
};

const start = () => {
  const lenis = new Lenis({
    lerp: 0.1,
    autoRaf: true,
    autoToggle: true,
    virtualScroll: ({ event }) => {
      if (!event.defaultPrevented) return true;
      halt();
      return false;
    },
  });
  /** Stop any easing where the page is now. */
  const halt = () => {
    if (lenis.isScrolling === 'smooth') lenis.scrollTo(window.scrollY, { immediate: true, force: true });
  };
  window.addEventListener('pointerdown', halt, { passive: true });

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element | null)?.closest?.('a[href]');
    if (!(link instanceof HTMLAnchorElement) || link.getAttribute('href')?.startsWith('#')) return;
    const url = new URL(link.href, location.href);
    if (!url.hash || url.origin !== location.origin || url.pathname !== location.pathname) return;
    if (url.search !== location.search) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    link.closest('details')?.removeAttribute('open'); // the mobile menu
    if (location.hash !== url.hash) history.pushState(null, '', url.hash);
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    void fadeTo(lenis, target.getBoundingClientRect().top + window.scrollY - margin);
  });
};

// Not readyState === 'loading': module scripts run while it's 'interactive', before DOMContentLoaded.
if (document.readyState === 'complete') start();
else document.addEventListener('DOMContentLoaded', start, { once: true });
