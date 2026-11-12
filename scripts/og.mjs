// Generates the share image and app icons in public/ from the COZM wordmark
// (src/assets/images/logo.png). Run after changing the logo or the headline:
//
//   bun scripts/og.mjs
//
// Writes:
//   public/og.jpg                1200×630 Open Graph / Twitter card
//   public/apple-touch-icon.png  180×180 (iOS home screen; opaque, iOS adds the rounding)
//   public/icon-192.png          192×192 web manifest icon
//   public/icon-512.png          512×512 web manifest icon
//   public/favicon.ico           32×32 PNG in an ICO container
//
// public/favicon.svg is the same "C" traced to vector once with potrace; it is
// not regenerated here (potrace isn't a project dependency).
//
// The headline is SVG text rendered by sharp's librsvg, which can't load the
// site's self-hosted woff2 fonts, so it uses the system serif (Georgia on macOS).
// Check the output by eye after running.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));

const SAND = '#e7dbc9';
const INK = '#1c1c1c';
const HEADLINE = ['Original media for', 'India’s top 10%'];
const KICKER = 'Podcasts · Documentaries · Video essays';

// The PNG has transparent padding; this is the visible wordmark (found with sharp().trim()).
const WORDMARK = { left: 54, top: 73, width: 230, height: 56 };
// The "C" alone, for square icons.
const LETTER_C = { left: 55, top: 73, width: 43, height: 56 };

/** A region of the logo, recoloured to ink, scaled to `height`. */
async function logoPart(region, height) {
  const mask = await sharp(root('src/assets/images/logo.png'))
    .extract(region)
    .resize({ height, kernel: 'lanczos3' })
    .png()
    .toBuffer({ resolveWithObject: true });
  return sharp({
    create: { width: mask.info.width, height: mask.info.height, channels: 4, background: INK },
  })
    .composite([{ input: mask.data, blend: 'dest-in' }])
    .png()
    .toBuffer({ resolveWithObject: true });
}

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// ---------- Open Graph image ----------
{
  const W = 1200;
  const H = 630;
  const PAD = 80;
  const logo = await logoPart(WORDMARK, 52);
  const fontSize = 96;
  const lineHeight = 100;
  const lastBaseline = H - PAD - 8;
  const lines = HEADLINE.map(
    (line, i) =>
      `<text x="${PAD - 4}" y="${lastBaseline - (HEADLINE.length - 1 - i) * lineHeight}">${escape(line)}</text>`,
  ).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="100%" height="100%" fill="${SAND}"/>
    <line x1="0" x2="${W}" y1="${PAD + 52 + 40}" y2="${PAD + 52 + 40}" stroke="${INK}" stroke-width="2"/>
    <text x="${W - PAD}" y="${PAD + 40}" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="24" letter-spacing="-0.5" fill="${INK}" fill-opacity="0.7">${escape(KICKER)}</text>
    <g font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" letter-spacing="-3" fill="${INK}">${lines}</g>
  </svg>`;
  await sharp(Buffer.from(svg))
    .composite([{ input: logo.data, left: PAD, top: PAD }])
    .flatten({ background: SAND })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(root('public/og.jpg'));
}

// ---------- Square icons: the "C" on sand ----------
async function icon(size) {
  const c = await logoPart(LETTER_C, Math.round(size * 0.56));
  return sharp({ create: { width: size, height: size, channels: 4, background: SAND } })
    .composite([
      {
        input: c.data,
        left: Math.round((size - c.info.width) / 2),
        top: Math.round((size - c.info.height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

await sharp(await icon(180)).toFile(root('public/apple-touch-icon.png'));
await sharp(await icon(192)).toFile(root('public/icon-192.png'));
await sharp(await icon(512)).toFile(root('public/icon-512.png'));

// ICO container holding one 32×32 PNG (supported by every current browser).
{
  const png = await icon(32);
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(32, 6); // width
  header.writeUInt8(32, 7); // height
  header.writeUInt8(0, 8); // palette size
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14); // image size
  header.writeUInt32LE(22, 18); // image offset
  await writeFile(root('public/favicon.ico'), Buffer.concat([header, png]));
}

console.log('Wrote public/og.jpg, apple-touch-icon.png, icon-192.png, icon-512.png, favicon.ico');
