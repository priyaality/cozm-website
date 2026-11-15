import type { ImageMetadata } from 'astro';
import luminary from '../assets/logos/luminary.svg';
import myMuse from '../assets/logos/mymuse.png';
import audible from '../assets/logos/audible.svg';
import autoX from '../assets/logos/autox.svg';
import cokeStudio from '../assets/logos/coke-studio.png';
import capMint from '../assets/logos/capmint.png';
import paisaSmart from '../assets/logos/paisasmart.svg';

/**
 * Client logos (butter, for brick red / black backgrounds), at their Figma
 * sizes in the homepage ticker. Some images have empty space around the logo;
 * `crop` places the image in its box as Figma does (percentages of the box:
 * image width/height, left/top offset).
 */
export interface ClientLogo {
  src: ImageMetadata;
  name: string;
  width: number;
  height: number;
  crop?: { w: number; h: number; left: number; top: number };
}

export const clientLogos = {
  luminary: { src: luminary, name: 'Luminary', width: 202.377, height: 44.8 },
  myMuse: { src: myMuse, name: 'MyMuse', width: 104, height: 45, crop: { w: 101.54, h: 99.56, left: -1.09, top: 0 } },
  audible: { src: audible, name: 'Audible', width: 131, height: 55 },
  autoX: { src: autoX, name: 'autoX', width: 121.2, height: 38.4 },
  cokeStudio: {
    src: cokeStudio,
    name: 'Coke Studio',
    width: 196,
    height: 31,
    crop: { w: 110.06, h: 295.21, left: -6.01, top: -91.16 },
  },
  capMint: {
    src: capMint,
    name: 'CapMint',
    width: 152,
    height: 44,
    crop: { w: 99.07, h: 145.2, left: 0.66, top: -16.69 },
  },
  paisaSmart: { src: paisaSmart, name: 'PaisaSmart', width: 229.682, height: 38.4 },
} satisfies Record<string, ClientLogo>;

export type ClientLogoKey = keyof typeof clientLogos;
