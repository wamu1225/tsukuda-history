// scripts/generate-ogp.ts — OGP画像（1200×630）を public/ogp.png に生成する。
// 新旧の対比という中心体験そのものを画像でも表現＝左を和紙調（元佃）、右をグリッド調（リバーシティ21）に分ける。
// 実行: npx tsx scripts/generate-ogp.ts
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const FONT_SERIF = "'Hiragino Mincho ProN','Yu Mincho',serif";
const FONT_SANS = "-apple-system,'Hiragino Sans','Yu Gothic UI',sans-serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f7f1e0"/>
  <path d="M 700 0 L 1200 0 L 1200 630 L 500 630 Z" fill="#e7edf4"/>
  <line x1="700" y1="0" x2="500" y2="630" stroke="#262524" stroke-width="4"/>
  <rect x="0" y="0" width="1200" height="14" fill="#8a4a2f"/>
  <rect x="0" y="614" width="700" height="16" fill="#8a4a2f"/>
  <rect x="700" y="614" width="500" height="16" fill="#3b6ea5"/>
  <text x="80" y="230" font-family="${FONT_SERIF}" font-size="66" font-weight="700" fill="#3b2f1f">佃 境界のまち</text>
  <text x="80" y="300" font-family="${FONT_SANS}" font-size="28" fill="#6b6259">江戸の路地と超高層群を分ける一本の道</text>
  <line x1="80" y1="340" x2="620" y2="340" stroke="#8a4a2f" stroke-width="2"/>
  <text x="80" y="390" font-family="${FONT_SANS}" font-size="22" fill="#3b2f1f" font-weight="600">study-apps.com/tsukuda-history/</text>
  <text x="740" y="120" font-family="${FONT_SANS}" font-size="20" fill="#1a2530" letter-spacing="2">RIVER CITY 21</text>
  <rect x="740" y="160" width="40" height="200" fill="#3b6ea5" opacity="0.85"/>
  <rect x="800" y="120" width="40" height="240" fill="#3b6ea5" opacity="0.7"/>
  <rect x="860" y="190" width="40" height="170" fill="#3b6ea5" opacity="0.55"/>
</svg>`;

async function main() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const outPath = path.join(PUBLIC_DIR, 'ogp.png');
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  console.log(`✓ ogp.png (1200x630) を生成: ${outPath}`);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
