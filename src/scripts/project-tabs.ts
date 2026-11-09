/**
 * Selection for a ProjectList and the panels (and optional media) it controls.
 *
 * Inside `root`:
 *   [data-project-tab]    the list's role="tab" buttons
 *   [data-project-panel]  one details panel per tab
 *   [data-project-media]  optional, one cover/visual per tab
 *
 * Clicking a row, or the arrow keys / Home / End once the list has focus,
 * selects it (WAI-ARIA tabs, automatic activation, roving tabindex). The
 * selected panel and media get `data-active` (the crossfade is CSS, in
 * global.css); the other panels are made inert so their links and fields
 * can't be reached.
 */
export function initProjectTabs(
  root: HTMLElement,
  /** Called when the user selects a different row (not on the initial selection). */
  onSelect?: (index: number) => void,
) {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-project-tab]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-project-panel]')];
  const media = [...root.querySelectorAll<HTMLElement>('[data-project-media]')];
  let current = 0;

  const select = (index: number, focus = false) => {
    if (index !== current) onSelect?.(index);
    current = index;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    panels.forEach((panel, i) => {
      panel.toggleAttribute('data-active', i === index);
      panel.inert = i !== index;
    });
    media.forEach((el, i) => el.toggleAttribute('data-active', i === index));
    if (focus) tabs[index].focus();
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', (event) => {
      const last = tabs.length - 1;
      const next = {
        ArrowDown: current === last ? 0 : current + 1,
        ArrowRight: current === last ? 0 : current + 1,
        ArrowUp: current === 0 ? last : current - 1,
        ArrowLeft: current === 0 ? last : current - 1,
        Home: 0,
        End: last,
      }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      select(next, true);
    });
  });

  select(0);
}
