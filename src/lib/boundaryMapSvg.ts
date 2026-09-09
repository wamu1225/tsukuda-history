import { geoPoints } from '../data/geo';
import { project, getBounds } from './projection';

/**
 * 境界地図SVGの単一の生成元。React側（BoundaryMap.tsx）とprerender.tsの
 * 両方がこの関数を呼ぶことで、静的HTMLとハイドレーション後DOMのズレを防ぐ
 * （08-13/08-31/09-07に他サイトで繰り返した「SVGが静的HTMLに出ない」事故の再発防止）。
 * 色はCSSカスタムプロパティに依存せず16進値を直接埋め込む（prerender時にCSSが無くても正しく描画されるため）。
 */
const WIDTH = 400;
const HEIGHT = 400;
const PADDING = 48;

const ZONE_COLOR: Record<string, string> = {
  old: '#8a4a2f',
  new: '#3b6ea5',
  boundary: '#8a8578',
};

export function renderBoundaryMapSvg(): string {
  const bounds = getBounds();
  const points = geoPoints.map((p) => ({
    ...p,
    pos: project(p.lat, p.lng, { ...bounds, width: WIDTH, height: HEIGHT, padding: PADDING }),
  }));

  const circles = points
    .map(
      (p) =>
        `<circle cx="${p.pos.x.toFixed(1)}" cy="${p.pos.y.toFixed(1)}" r="${p.zone === 'boundary' ? 3.5 : 5}" fill="${ZONE_COLOR[p.zone]}" stroke="#f7f1e0" stroke-width="1.5"/>`,
    )
    .join('');

  return `<svg viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="boundary-map-title" xmlns="http://www.w3.org/2000/svg">
<title id="boundary-map-title">元佃とリバーシティ21の位置関係を示す実座標地図</title>
<rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="#f7f1e0"/>
<g transform="translate(${WIDTH - 28}, 20)">
<line x1="0" y1="14" x2="0" y2="-6" stroke="#262524" stroke-width="1.6"/>
<polygon points="0,-10 -4,0 4,0" fill="#262524"/>
<text x="0" y="26" text-anchor="middle" font-size="13" fill="#262524">N</text>
</g>
<g transform="translate(${PADDING}, ${HEIGHT - 22})">
<line x1="0" y1="0" x2="46" y2="0" stroke="#262524" stroke-width="2"/>
<line x1="0" y1="-4" x2="0" y2="4" stroke="#262524" stroke-width="2"/>
<line x1="46" y1="-4" x2="46" y2="4" stroke="#262524" stroke-width="2"/>
<text x="23" y="16" text-anchor="middle" font-size="13" fill="#262524">約100m</text>
</g>
${circles}
</svg>`;
}

export function boundaryMapLegendItems() {
  return geoPoints.map((p) => ({ id: p.id, name: p.name, zone: p.zone }));
}
