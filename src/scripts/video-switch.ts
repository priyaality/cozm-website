/**
 * Background video that changes with the selected item (/originals, /work).
 *
 * show(index) fades `fade` (a black layer over the video) in, switches the
 * video to that item's file (or restarts it from its start time if it's the
 * same file), waits until the new frame can show, then fades back out. The
 * fade's timing is CSS (FADE_MS here must match it); a newer selection
 * cancels an older one partway.
 */
export type SwitchVideo = { src: string; sources?: { src: string; type: string }[]; poster?: string; startAt?: number };

const FADE_MS = 450;
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function videoSwitcher(video: HTMLVideoElement, fade: HTMLElement, videos: SwitchVideo[]) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentSrc = videos[0]?.src;
  let switchId = 0;

  /** Resolves when the video can show the new frame (or after a timeout, so it never sticks on black). */
  const ready = (event: 'seeked' | 'playing') =>
    Promise.race([new Promise((resolve) => video.addEventListener(event, resolve, { once: true })), wait(1500)]);

  return async (index: number) => {
    const next = videos[index];
    if (!next) return;
    const id = ++switchId;
    fade.toggleAttribute('data-on', true);
    await wait(reducedMotion ? 0 : FADE_MS);
    if (id !== switchId) return; // a newer selection took over

    if (next.src !== currentSrc) {
      currentSrc = next.src;
      video.poster = next.poster ?? '';
      // The first encoding this browser can play (AV1 WebM where supported), else the fallback.
      const file = next.sources?.find((source) => video.canPlayType(source.type) !== '')?.src ?? next.src;
      video.src = next.startAt ? `${file}#t=${next.startAt}` : file;
      const playing = ready('playing');
      video.play().catch(() => {});
      await playing;
    } else {
      const seeked = ready('seeked');
      video.currentTime = next.startAt ?? 0;
      video.play().catch(() => {});
      await seeked;
    }
    if (id !== switchId) return;
    fade.toggleAttribute('data-on', false);
  };
}
