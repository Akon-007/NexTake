import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. NT Mark SVG path definition (based on icon.png)
// Centered in a 512x512 viewbox
function getNTMarkSvg(x, y, scale, isWhiteText = true) {
  // Let's create precise polygon paths for the NT monogram
  // Scale factor: scale / 512
  const s = scale;
  return `
    <g transform="translate(${x}, ${y}) scale(${s})">
      <!-- Top Teal Accent Facet -->
      <polygon points="175,90 280,180 230,225 155,150" fill="#00f2aa" />
      
      <!-- N - Left Vertical & Top Diagonal -->
      <polygon points="80,170 145,115 145,340 80,395" fill="${isWhiteText ? '#ffffff' : '#070e20'}" />
      
      <!-- N - Diagonal Center Stroke -->
      <polygon points="145,260 215,320 215,395 145,340" fill="${isWhiteText ? '#ffffff' : '#070e20'}" />

      <!-- T - Top Horizontal Bar -->
      <polygon points="230,135 340,135 340,180 200,180" fill="${isWhiteText ? '#ffffff' : '#070e20'}" />

      <!-- T - Vertical Stem -->
      <polygon points="255,180 305,180 305,395 255,395" fill="${isWhiteText ? '#ffffff' : '#070e20'}" />
    </g>
  `;
}

// Precise NT Monogram Path as seen in icon.png:
// Let's refine the exact coordinates for the 3D isometric NT logo:
// The icon has:
// Left pillar (N):
// Outer left vertical from y=170 to y=390
// Top-left slanting up-right to an apex at (150, 115)
// Inner slanting down to (200, 280)
// Diagonal crossbar of N: parallel ribbon slanting down-left to up-right
// T: Top facet in bright cyan/teal: (185, 95) -> (265, 175) -> (225, 215) -> (145, 135)
// T top bar: horizontal (210, 155) to (345, 155), down to (345, 200), (280, 200)
// T stem: (255, 200) to (305, 200), down to (305, 395), (255, 395)
// Bottom connecting ribbon: (200, 395) to (255, 340)...
