import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
fs.mkdirSync(publicDir, { recursive: true });

// 1. Precise Isometric NT Monogram SVG Path
// Designed to match icon.png exactly:
// Left pillar of N, diagonal fold of N, horizontal top bar of T, vertical stem of T, and top mint accent fold.
const getNTMonogramSvg = (isDark = true) => {
  const mainColor = isDark ? '#FFFFFF' : '#070F22';
  const tealColor = '#00F2AA';

  return `
    <g id="nt-monogram-paths">
      <!-- Top Mint Accent Parallelogram -->
      <polygon points="220,70 336,170 274,214 168,122" fill="${tealColor}" />

      <!-- Left Vertical Column of N with 30-deg cut edges -->
      <polygon points="90,150 162,90 162,370 90,430" fill="${mainColor}" />

      <!-- Diagonal Center Ribbon of N -->
      <polygon points="170,206 280,302 280,418 170,322" fill="${mainColor}" />

      <!-- T Horizontal Top Bar -->
      <polygon points="274,130 410,130 410,180 274,180" fill="${mainColor}" />

      <!-- T Vertical Stem -->
      <polygon points="304,180 356,180 356,376 304,418" fill="${mainColor}" />
    </g>
  `;
};

// 2. icon.svg and icon.png (512x512 with smooth dark squircle)
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="iconBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#09142A"/>
      <stop offset="100%" stop-color="#030712"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="512" height="512" rx="116" fill="url(#iconBgGrad)"/>
  <rect x="1.5" y="1.5" width="509" height="509" rx="114.5" fill="none" stroke="#1E293B" stroke-width="2.5" opacity="0.6"/>
  <g transform="translate(6, -2)">
    ${getNTMonogramSvg(true)}
  </g>
</svg>
`.trim();

// 3. header.svg and header.png
// Large, high-resolution header banner (1800 x 480)
// Transparent background for dark navbar/header
// Left: NT mark, Right: NEXT (white) + AKE (teal), Subtitle: TECHNOLOGY NEWS. INTELLIGENTLY CURATED.
const headerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 480" width="1800" height="480">
  <!-- Left NT Monogram Mark -->
  <g transform="translate(30, 20) scale(0.95)">
    ${getNTMonogramSvg(true)}
  </g>

  <!-- NEXT (White) -->
  <text x="510" y="275" font-family="'Inter', 'Liberation Sans', sans-serif" font-weight="900" font-size="180" letter-spacing="-2" fill="#FFFFFF">NEXT<tspan fill="#00F2AA">AKE</tspan></text>

  <!-- Tagline: TECHNOLOGY NEWS. INTELLIGENTLY CURATED. -->
  <text x="515" y="350" font-family="'Inter', 'Liberation Sans', sans-serif" font-weight="700" font-size="34" letter-spacing="11" fill="#E2E8F0">TECHNOLOGY NEWS. INTELLIGENTLY CURATED.</text>
</svg>
`.trim();

// 4. footer.svg and footer.png
// Exact reproduction of user's uploaded footer.png
// Pure white background, NEXT (dark navy), AKE (teal), Subtitle: TECHNOLOGY NEWS. INTELLIGENTLY CURATED.
const footerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 500" width="1800" height="500">
  <!-- Pure White Canvas -->
  <rect width="1800" height="500" fill="#FFFFFF"/>

  <!-- Centered NEXTAKE -->
  <text x="900" y="270" text-anchor="middle" font-family="'Inter', 'Liberation Sans', sans-serif" font-weight="900" font-size="200" letter-spacing="-3">
    <tspan fill="#070F22">NEXT</tspan><tspan fill="#00F2AA">AKE</tspan>
  </text>

  <!-- Centered Tagline -->
  <text x="900" y="355" text-anchor="middle" font-family="'Inter', 'Liberation Sans', sans-serif" font-weight="700" font-size="34" letter-spacing="12" fill="#070F22">TECHNOLOGY NEWS. INTELLIGENTLY CURATED.</text>
</svg>
`.trim();

fs.writeFileSync(path.join(publicDir, 'icon.svg'), iconSvg);
fs.writeFileSync(path.join(publicDir, 'header.svg'), headerSvg);
fs.writeFileSync(path.join(publicDir, 'footer.svg'), footerSvg);

async function run() {
  await sharp(Buffer.from(iconSvg)).resize(512, 512).png().toFile(path.join(publicDir, 'icon.png'));
  await sharp(Buffer.from(iconSvg)).resize(64, 64).png().toFile(path.join(publicDir, 'favicon.png'));
  await sharp(Buffer.from(headerSvg)).resize(1800, 480).png().toFile(path.join(publicDir, 'header.png'));
  await sharp(Buffer.from(footerSvg)).resize(1800, 500).png().toFile(path.join(publicDir, 'footer.png'));
  console.log('PNG build completed!');
}

run().catch(console.error);
