import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');

// Exact NT Brand Glyph matching user's uploaded icon.png:
// - Mint green polygon on top of T crossbar
// - T crossbar and stem
// - N left pillar and upper diagonal
// - N LOWER DIAGONAL: Now significantly wider (~95px perpendicular width, matching the left pillar width of 94px)
const ntGlyphExact = `
<g id="nt-brand-glyph">
  <!-- 1. Green Accent Polygon: Layered ON TOP of the 'T' crossbar -->
  <polygon 
    points="435,190 575,288 705,380 515,380 435,310" 
    fill="#3DF2AC" 
  />

  <!-- 2. 'T' Top Horizontal Crossbar: Meets the green diagonal cut at 575,288 -> 705,380 -->
  <polygon 
    points="575,288 830,288 830,380 705,380" 
    fill="#FFFFFF" 
  />

  <!-- 3. 'T' Vertical Stem: Separated by horizontal dark gap below crossbar -->
  <polygon 
    points="625,435 735,435 735,685 625,765" 
    fill="#FFFFFF" 
  />

  <!-- 4. 'N' Left Pillar and Upper Diagonal Arm: Solid white structure -->
  <polygon 
    points="194,345 288,296 550,530 550,660 456,585 288,446 288,746 194,746" 
    fill="#FFFFFF" 
  />

  <!-- 5. 'N' Lower Diagonal Ribbon: WIDER stroke width matching the uploaded icon -->
  <!-- Left vertical edge: 365,580 to 365,715 (width ~95px perpendicular) -->
  <!-- Top diagonal: 365,580 to 575,745 -->
  <!-- Bottom-right angled edge: 508,832 up-right to 575,785 -->
  <!-- Bottom diagonal: 365,715 to 508,832 -->
  <polygon 
    points="365,580 575,745 575,785 508,832 365,715" 
    fill="#FFFFFF" 
  />
</g>
`;

// 1. icon.svg and icon.png (1024x1024 with dark squircle matching user's image)
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#060C1B"/>
      <stop offset="100%" stop-color="#040812"/>
    </linearGradient>
  </defs>
  <!-- Dark Navy Squircle matching user's exact uploaded icon -->
  <rect x="0" y="0" width="1024" height="1024" rx="230" fill="url(#bgGrad)"/>
  <rect x="2" y="2" width="1020" height="1020" rx="228" fill="none" stroke="#1E293B" stroke-width="2" opacity="0.4"/>
  ${ntGlyphExact}
</svg>
`.trim();

// 2. header.svg and header.png (2048 x 560)
const headerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 560" width="2048" height="560">
  <!-- Left NT Glyph -->
  <g transform="translate(40, 20) scale(0.50)">
    ${ntGlyphExact}
  </g>

  <!-- NEXT (White) + AKE (Mint) -->
  <text x="560" y="315" font-family="'Inter', -apple-system, sans-serif" font-weight="900" font-size="190" letter-spacing="-2" fill="#FFFFFF">
    NEXT<tspan fill="#3DF2AC">AKE</tspan>
  </text>

  <!-- Tagline: TECHNOLOGY NEWS. INTELLIGENTLY CURATED. -->
  <text x="565" y="390" font-family="'Inter', -apple-system, sans-serif" font-weight="700" font-size="35" letter-spacing="12" fill="#CBD5E1">
    TECHNOLOGY NEWS. INTELLIGENTLY CURATED.
  </text>
</svg>
`.trim();

// Write SVG files
fs.writeFileSync(path.join(publicDir, 'icon.svg'), iconSvg);
fs.writeFileSync(path.join(publicDir, 'header.svg'), headerSvg);

// Generate high-resolution PNGs
async function generateAll() {
  await sharp(Buffer.from(iconSvg))
    .resize(1024, 1024)
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

  console.log('Successfully updated icon and header with the wider lower diagonal of N!');
}

generateAll().catch(console.error);
