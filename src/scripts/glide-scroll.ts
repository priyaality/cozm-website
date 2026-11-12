/**
 * glideScroll — scrolls the window to `top` over `duration` ms along a CSS-style
 * cubic-bézier, one window.scrollTo per animation frame (what motion's
 * animate(from, to, { onUpdate }) did, without the library).
 */

/** One coordinate of a cubic bézier from (0,0) to (1,1) with control values a, b, at parameter s. */
const at = (a: number, b: number, s: number) => 3 * a * s * (1 - s) ** 2 + 3 * b * s * s * (1 - s) + s ** 3;

/** The y of cubic-bezier(x1, y1, x2, y2) at x = t, solved like CSS does. */
export const cubicBezier = (x1: number, y1: number, x2: number, y2: number) => (t: number) => {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  let lo = 0;
  let hi = 1;
  let s = t;
  for (let i = 0; i < 24; i++) {
    s = (lo + hi) / 2;
    if (at(x1, x2, s) < t) lo = s;
    else hi = s;
  }
  return at(y1, y2, s);
};

export const glideScroll = (top: number, duration: number, ease: (t: number) => number, onComplete: () => void) => {
  const from = window.scrollY;
  let start: number | undefined;
  const frame = (now: number) => {
    start ??= now;
    const p = Math.min((now - start) / duration, 1);
    window.scrollTo({ top: from + (top - from) * ease(p), behavior: 'instant' });
    if (p < 1) requestAnimationFrame(frame);
    else onComplete();
  };
  requestAnimationFrame(frame);
};
