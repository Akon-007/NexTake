import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Exact SVG of the user's icon matching the uploaded icon.png:
// Canvas: 1024 x 1024
const ntGlyphExact = `
<g id="nt-brand-glyph">
  <!-- 1. Green Accent Polygon layered ON TOP of the T crossbar -->
  <polygon 
    points="435,190 705,380 515,380 435,310" 
    fill="#3DF2AC" 
  />

  <!-- 2. T Horizontal Top Crossbar (White, meets the green diagonal at 575,288 -> 705,380) -->
  <polygon 
    points="575,288 830,288 830,380 705,380" 
    fill="#FFFFFF" 
  />

  <!-- 3. T Vertical Stem (White, separated by horizontal gap below crossbar) -->
  <polygon 
    points="625,435 735,435 735,685 625,765" 
    fill="#FFFFFF" 
  />

  <!-- 4. N Left Pillar & Upper Diagonal Arm (Single continuous solid white element) -->
  <polygon 
    points="194,345 288,296 550,530 550,670 456,580 288,446 288,746 194,746" 
    fill="#FFFFFF" 
  />

  <!-- 5. N Lower Diagonal Fold (Parallelogram ribbon below) -->
  <polygon 
    points="365,595 445,655 505,830 425,770" 
    fill="#FFFFFF" 
  />
</g>
`;

const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#070E1E"/>
      <stop offset="100%" stop-color="#040812"/>
    </linearGradient>
  </defs>
  <!-- Squircle Background matching user icon.png -->
  <rect x="0" y="0" width="1024" height="1024" rx="230" fill="url(#bgGrad)"/>
  <rect x="2" y="2" width="1020" height="1020" rx="228" fill="none" stroke="#1E293B" stroke-width="3" opacity="0.4"/>
  ${ntGlyphExact}
</svg>
`.trim();

fs.writeFileSync('public/test-icon.svg', iconSvg);
console.log('test-icon.svg written');
