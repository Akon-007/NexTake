import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
fs.mkdirSync(publicDir, { recursive: true });

// SVG Definition of the NT Monogram
// Coordinates designed on a 400x400 grid
function renderNTMonogram(colorMode = 'dark') {
  const isDark = colorMode === 'dark'; // Dark background, white letters
  const primaryColor = isDark ? '#FFFFFF' : '#070E20';
  const tealColor = '#00F2AA';

  return `
    <g id="nt-symbol">
      <!-- Top Cyan / Teal Fold -->
      <path d="M 180 75 L 260 125 L 290 155 L 220 155 Z" fill="${tealColor}" />
      
      <!-- N Left Pillar with angled top -->
      <path d="M 80 135 L 140 100 L 140 295 L 80 330 Z" fill="${primaryColor}" />
      
      <!-- N Diagonal Fold -->
      <path d="M 155 175 L 225 245 L 225 330 L 155 260 Z" fill="${primaryColor}" />
      
      <!-- T Crossbar -->
      <path d="M 235 115 L 330 115 L 330 155 L 235 155 Z" fill="${primaryColor}" />
      
      <!-- T Stem -->
      <path d="M 245 175 L 290 175 L 290 300 L 245 325 Z" fill="${primaryColor}" />
    </g>
  `;
}

// Let's refine the exact NT Monogram using SVG geometric paths matching icon.png exactly:
// In icon.png:
// Top Teal polygon: parallelogram
// Top edge from (175, 80) to (270, 135)
// Bottom edge from (215, 155) to (175, 130) -> wait, let's trace coordinates:
// Notice:
// Apex of N: (140, 120)
// Apex of Teal facet: (175, 75)
// Top right of Teal facet: (280, 155)
// Bottom left of Teal facet: (215, 155)
// T top bar: from (215, 115) to (330, 115), height 35px
// T stem: x=245 to x=290, from y=155 to y=300
// N left column: x=80 to x=140, from y=135 to y=295
// N diagonal: from (150, 175) to (215, 235), down to y=330

const ntMarkDark = `
  <g id="nt-icon-mark">
    <!-- Isometric Teal Polygon -->
    <polygon points="174,74 275,133 226,161 174,131" fill="#00F2AA" />
    
    <!-- Left Pillar (N) -->
    <polygon points="76,134 138,98 138,296 76,332" fill="#FFFFFF" />
    
    <!-- Diagonal Fold of N -->
    <polygon points="148,176 222,238 222,328 148,266" fill="#FFFFFF" />
    
    <!-- Horizontal Crossbar (T) -->
    <polygon points="214,114 330,114 330,152 226,152" fill="#FFFFFF" />
    
    <!-- Vertical Stem (T) -->
    <polygon points="248,174 294,174 294,302 248,328" fill="#FFFFFF" />
  </g>
`;

const ntMarkLight = `
  <g id="nt-icon-mark">
    <!-- Isometric Teal Polygon -->
    <polygon points="174,74 275,133 226,161 174,131" fill="#00F2AA" />
    
    <!-- Left Pillar (N) -->
    <polygon points="76,134 138,98 138,296 76,332" fill="#070E20" />
    
    <!-- Diagonal Fold of N -->
    <polygon points="148,176 222,238 222,328 148,266" fill="#070E20" />
    
    <!-- Horizontal Crossbar (T) -->
    <polygon points="214,114 330,114 330,152 226,152" fill="#070E20" />
    
    <!-- Vertical Stem (T) -->
    <polygon points="248,174 294,174 294,302 248,328" fill="#070E20" />
  </g>
`;

// 1. icon.svg and icon.png
// 512x512 with squircle background
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#070F1E"/>
      <stop offset="100%" stop-color="#040812"/>
    </linearGradient>
  </defs>
  <!-- App Icon Squircle Background -->
  <rect x="0" y="0" width="512" height="512" rx="112" fill="url(#bg-grad)" />
  <g transform="translate(56, 56) scale(1.0)">
    ${ntMarkDark}
  </g>
</svg>
`.trim();

// 2. header.svg and header.png
// NT Monogram + "NEXT" in white + "AKE" in #00F2AA + Subtitle in #94A3B8
// Tightly framed so content starts at x=10 and y=10 with zero wasted margin
const headerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1360 280" width="1360" height="280">
  <defs>
    <style>
      .brand-title {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 900;
        font-size: 156px;
        letter-spacing: -3px;
      }
      .brand-sub {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 700;
        font-size: 30px;
        letter-spacing: 11px;
      }
    </style>
  </defs>
  
  <g transform="translate(-66, -64)">
    ${ntMarkDark}
  </g>
  
  <text x="300" y="182" class="brand-title">
    <tspan fill="#FFFFFF">NEXT</tspan><tspan fill="#00F2AA">AKE</tspan>
  </text>
  
  <text x="305" y="252" fill="#94A3B8" class="brand-sub">
    TECHNOLOGY NEWS. INTELLIGENTLY CURATED.
  </text>
</svg>
`.trim();

// 3. footer.svg and footer.png
// High-contrast card matching uploaded footer.png with bold NEXTAKE + subtitle
const footerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 360" width="1400" height="360">
  <defs>
    <style>
      .brand-title-footer {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 900;
        font-size: 172px;
        letter-spacing: -3px;
      }
      .brand-sub-footer {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 800;
        font-size: 34px;
        letter-spacing: 13px;
      }
    </style>
  </defs>
  
  <!-- Clean white background as in footer.png with rounded corners -->
  <rect width="1400" height="360" rx="28" fill="#FFFFFF" />
  
  <text x="50%" y="195" text-anchor="middle" class="brand-title-footer">
    <tspan fill="#070E20">NEXT</tspan><tspan fill="#00F2AA">AKE</tspan>
  </text>
  
  <text x="50%" y="275" text-anchor="middle" fill="#070E20" class="brand-sub-footer">
    TECHNOLOGY NEWS. INTELLIGENTLY CURATED.
  </text>
</svg>
`.trim();

// Write SVGs
fs.writeFileSync(path.join(publicDir, 'icon.svg'), iconSvg);
fs.writeFileSync(path.join(publicDir, 'header.svg'), headerSvg);
fs.writeFileSync(path.join(publicDir, 'footer.svg'), footerSvg);

// Generate PNGs using sharp
async function buildPngs() {
  await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon.png'));

  // Also create a 64x64 favicon
  await sharp(Buffer.from(iconSvg))
    .resize(64, 64)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  await sharp(Buffer.from(headerSvg))
    .png()
    .toFile(path.join(publicDir, 'header.png'));

  await sharp(Buffer.from(footerSvg))
    .png()
    .toFile(path.join(publicDir, 'footer.png'));

  console.log('Successfully generated public/icon.png, public/header.png, public/footer.png, and SVGs!');
}

buildPngs().catch(console.error);
