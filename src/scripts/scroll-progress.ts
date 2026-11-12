/**
 * Page-scroll progress through a target element: a small stand-in for motion's
 * `scroll(callback, { target, offset })`, with the same offset maths.
 *
 * Each edge is [target fraction, viewport fraction]: [0, 0.25] is "the target's
 * top meets 25% down the viewport" (motion's `start 0.25`), [1, 1] is "the
 * target's bottom meets the viewport's bottom" (`end end`). Progress runs
 * linearly 0 → 1 between the two scroll positions, clamped, and is measured
 * once per frame while scrolling or resizing.
 */
export type ScrollEdge = [target: number, viewport: number];

export function trackScrollProgress(
  target: HTMLElement,
  [start, end]: [ScrollEdge, ScrollEdge],
  onProgress: (progress: number) => void,
): () => void {
  const page = document.scrollingElement ?? document.documentElement;
  let frame = 0;

  const measure = () => {
    frame = 0;
    // Document offset as motion measures it: offsetTop up the offsetParent chain.
    let top = 0;
    for (let el: HTMLElement | null = target; el; el = el.offsetParent as HTMLElement | null) {
      top += el.offsetTop;
    }
    const viewport = page.clientHeight;
    const length = target.clientHeight;
    const from = top + start[0] * length - start[1] * viewport;
    const to = top + end[0] * length - end[1] * viewport;
    const y = page.scrollTop;
    const progress = from === to ? (y < from ? 0 : 1) : (y - from) / (to - from);
    onProgress(Math.min(1, Math.max(0, progress)));
  };

  const schedule = () => {
    frame ||= requestAnimationFrame(measure);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  schedule();

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
  };
}
