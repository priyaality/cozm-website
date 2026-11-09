/**
 * Selection for a ProjectList and the panels (and optional media) it controls.
 *
 * Inside `root`:
 *   [data-project-tab]    the list's select buttons (aria-pressed)
 *   [data-project-panel]  one details panel per row
 *   [data-project-media]  optional, one cover/visual per row
 *
 * Clicking a row's button selects it. The selected panel and media get
 * `data-active` (the crossfade is CSS, in global.css); the other panels are
 * made inert so their links and fields can't be reached.
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

  const select = (index: number) => {
    if (index !== current) onSelect?.(index);
    current = index;
    tabs.forEach((tab, i) => tab.setAttribute('aria-pressed', String(i === index)));
    panels.forEach((panel, i) => {
      panel.toggleAttribute('data-active', i === index);
      panel.inert = i !== index;
    });
    media.forEach((el, i) => el.toggleAttribute('data-active', i === index));
  };

  tabs.forEach((tab, i) => tab.addEventListener('click', () => select(i)));
  select(0);
}
