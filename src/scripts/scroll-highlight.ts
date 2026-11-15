/**
 * Scroll highlight (as in motion.dev's "Scroll highlight" example): the page
 * scrolls normally, and the item passing through the middle of the screen is
 * the current one.
 *
 * `focus()` gives the focus line, in px from the top of the viewport. The
 * current item is the last one whose top has scrolled up past it; before the
 * first gets there, it's the first. Using the top edge (not the middle) means
 * an item that grows when it's current can't flicker back out.
 *
 * `onChange` runs whenever the current item changes (and once at the start).
 * Measured once per frame while scrolling or resizing. Returns a function that
 * stops tracking.
 */
export function trackScrollHighlight(
  items: HTMLElement[],
  focus: () => number,
  onChange: (index: number) => void,
): () => void {
  let frame = 0;
  let current = -1;

  const measure = () => {
    frame = 0;
    const line = focus();
    let index = 0;
    items.forEach((item, i) => {
      if (item.getBoundingClientRect().top <= line) index = i;
    });
    if (index === current) return;
    current = index;
    onChange(index);
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

/** The middle of the visible area between `top` (px, e.g. below the fixed header) and the bottom of the screen. */
export const middleBelow = (top: number) => (top + window.innerHeight) / 2;
