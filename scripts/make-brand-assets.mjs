import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
fs.mkdirSync(publicDir, { recursive: true });

// Colors directly matched from user uploads:
// Dark Navy: #070F22 / #050B18
// Vivid Turquoise / Mint: #00F2AA (or #00E6A2)
// White: #FFFFFF
// Subtitle Muted White / Gray: #CBD5E1

// Exact isometric NT Monogram SVG Path
// Coordinates on a 500x500 box:
// Monogram occupies ~ x: 90..410, y: 80..420
const ntMonogram = (isDark = true) => {
  const mainColor = isDark ? '#FFFFFF' : '#070F22';
  const tealColor = '#00F2AA';

  return `
    <!-- Top Mint Accent Fold -->
    <polygon points="228,88 340,186 280,228 174,136" fill="${tealColor}" />
    
    <!-- Left Column of N (with angled roof and angled base) -->
    <polygon points="96,164 168,104 168,364 96,424" fill="${mainColor}" />
    
    <!-- Diagonal Fold of N -->
    <polygon points="176,218 284,312 284,414 176,322" fill="${mainColor}" />
    
    <!-- T Horizontal Top Crossbar -->
    <polygon points="280,140 404,140 404,188 280,188" fill="${mainColor}" />
    
    <!-- T Vertical Stem -->
    <polygon points="304,188 356,188 356,374 304,416" fill="${mainColor}" />
  `;
};

// 1. icon.svg and icon.png (512x512 with smooth dark squircle)
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="iconBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#09142A"/>
      <stop offset="100%" stop-color="#040914"/>
    </linearGradient>
  </defs>
  <!-- Squircle container -->
  <rect x="0" y="0" width="512" height="512" rx="112" fill="url(#iconBg)"/>
  <!-- Subtle border highlight -->
  <rect x="1" y="1" width="510" height="510" rx="111" fill="none" stroke="#1E293B" stroke-width="2" opacity="0.6"/>
  
  <g transform="translate(6, -4)">
    ${ntMonogram(true)}
  </g>
</svg>
`.trim();

// 2. header.svg and header.png
// Large, high-resolution header banner (2048 x 560)
// Designed for dark navigation or header display
// Left: NT mark, Right: NEXT (white) + AKE (teal), Subtitle: TECHNOLOGY NEWS. INTELLIGENTLY CURATED.
const headerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 560" width="2048" height="560">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@800;900&amp;display=swap');
      .h-title {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-weight: 900;
        font-size: 200px;
        letter-spacing: -2px;
      }
      .h-sub {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-weight: 800;
        font-size: 40px;
        letter-spacing: 16px;
      }
    </style>
  </defs>

  <!-- Left NT Monogram -->
  <g transform="translate(40, 30) scale(1.0)">
    ${ntMonogram(true)}
  </g>

  <!-- Main Wordmark -->
  <text x="560" y="310" class="h-title">
    <tspan fill="#FFFFFF">NEXT</tspan><tspan fill="#00F2AA">AKE</tspan>
  </text>

  <!-- Subtitle Tagline -->
  <text x="566" y="390" fill="#E2E8F0" class="h-sub">
    TECHNOLOGY NEWS. INTELLIGENTLY CURATED.
  </text>
</svg>
`.trim();

// 3. footer.svg and footer.png
// Clean white canvas matching the user's uploaded footer.png exactly:
// NEXT (Navy #070F22) + AKE (Teal #00F2AA)
// Subtitle: TECHNOLOGY NEWS. INTELLIGENTLY CURATED. (Navy #070F22)
const footerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 600" width="2048" height="600">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@800;900&amp;display=swap');
      .f-title {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-weight: 900;
        font-size: 220px;
        letter-spacing: -3px;
      }
      .f-sub {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-weight: 800;
        font-size: 42px;
        letter-spacing: 18px;
      }
    </style>
  </defs>

  <!-- Clean pure white background as in uploaded footer.png -->
  <rect width="2048" height="600" fill="#FFFFFF"/>

  <!-- Centered Wordmark -->
  <text x="1024" y="320" text-anchor="middle" class="f-title">
    <tspan fill="#070F22">NEXT</tspan><tspan fill="#00F2AA">AKE</tspan>
  </text>

  <!-- Centered Subtitle Tagline -->
  <text x="1034" y="415" text-anchor="middle" fill="#070F22" class="f-sub">
    TECHNOLOGY NEWS. INTELLIGENTLY CURATED.
  </text>
</svg>
`.trim();

// Write SVGs
fs.writeFileSync(path.join(publicDir, 'icon.svg'), iconSvg);
fs.writeFileSync(path.join(publicDir, 'header.svg'), headerSvg);
fs.writeFileSync(path.join(publicDir, 'footer.svg'), footerSvg);

// Render high-resolution PNGs
async function generatePngs() {
  await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon.png'));

  await sharp(Buffer.from(iconSvg))
    .resize(64, 64)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  await sharp(Buffer.from(headerSvg))
    .resize(2048, 560)
    .png()
    .toFile(path.join(publicDir, 'header.png'));

  await sharp(Buffer.from(footerSvg))
    .resize(2048, 600)
    .png()
    .toFile(path.join(publicDir, 'footer.png'));

  console.log('Successfully generated public/icon.png, public/header.png, public/footer.png, favicon.png and SVGs!');
}

generatePngs().catch(console.error);
