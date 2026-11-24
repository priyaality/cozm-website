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
 *
 * Started after the other page scripts have run (DOMContentLoaded), so its
 * wheel listener comes after theirs and sees their preventDefault.
 */
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

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
};

// Not readyState === 'loading': module scripts run while it's 'interactive', before DOMContentLoaded.
if (document.readyState === 'complete') start();
else document.addEventListener('DOMContentLoaded', start, { once: true });
