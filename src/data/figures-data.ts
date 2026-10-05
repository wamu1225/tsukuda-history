// 記事本文に付随する自作SVG模式図のSSOT。React版（ArticlePage.tsx）と
// prerender.ts で同じHTML文字列を共用するための単一ソース。
// ⚠️ viewBox幅は390px幅のモバイル表示でも実効フォントが11px以上になるよう、
// 他サイトの年表図と同じ300〜320の幅に抑えている（O-2-25の再発防止）。

export type Figure = { html: string };

// リバーシティ21・3タワーの規模比較（階数バーチャート）
function buildTowerChartSvg(): string {
  const towers = [
    { name: 'シティフロントタワー', year: '1991年', floors: 31, units: '290戸', color: '#8fb0cf' },
    { name: 'スカイライトタワー', year: '1993年', floors: 40, units: '336戸', color: '#5f8fb8' },
    { name: 'センチュリーパークタワー', year: '1999年', floors: 54, units: '756戸', color: '#3b6ea5' },
  ];
  const maxFloors = 54;
  const barMaxW = 110;
  const rowH = 52;
  const rows = towers
    .map((t, i) => {
      const y = 10 + i * rowH;
      const w = (t.floors / maxFloors) * barMaxW;
      return (
        `<text x="0" y="${y + 12}" font-size="11.5" font-weight="700" fill="#262524">${t.name}</text>` +
        `<rect x="0" y="${y + 18}" width="${barMaxW}" height="14" fill="#eef0ec" stroke="#d9d5c9"/>` +
        `<rect x="0" y="${y + 18}" width="${w.toFixed(1)}" height="14" fill="${t.color}"/>` +
        `<text x="0" y="${y + 44}" font-size="11.5" fill="#262524">${t.floors}階・${t.units}（${t.year}）</text>`
      );
    })
    .join('');
  return `<figure class="fig">
  <svg viewBox="0 0 300 180" width="100%" role="img" aria-labelledby="tower-title tower-desc">
    <title id="tower-title">リバーシティ21・3タワーの階数と戸数の比較図</title>
    <desc id="tower-desc">シティフロントタワー31階290戸（1991年）、スカイライトタワー40階336戸（1993年）、センチュリーパークタワー54階756戸（1999年）を、階数に比例した横棒で比較する図。</desc>
    <g transform="translate(15,5)">${rows}</g>
  </svg>
  <figcaption>3つの超高層棟は、規模も竣工年もそれぞれ異なります。最も早く建ったシティフロントタワー（平成3年/1991年）から、もっとも新しく最も高いセンチュリーパークタワー（平成11年/1999年）まで、8年間で階数・戸数とも段階的に増えていきました。</figcaption>
</figure>`;
}

// 佃煮老舗3軒の創業年比較（年表）
function buildTsukudaniTimelineSvg(): string {
  const node = (x: number, year: string, label: string, color: string) =>
    `<circle cx="${x}" cy="54" r="9" fill="${color}"/>` +
    `<text x="${x}" y="34" font-size="11.5" font-weight="700" fill="#262524" text-anchor="middle">${year}</text>` +
    `<text x="${x}" y="80" font-size="11" fill="#262524" text-anchor="middle">${label.split('|')[0]}</text>` +
    (label.includes('|') ? `<text x="${x}" y="92" font-size="11" fill="#262524" text-anchor="middle">${label.split('|')[1]}</text>` : '');
  return `<figure class="fig">
  <svg viewBox="0 0 300 110" width="100%" role="img" aria-labelledby="tsukudani-title tsukudani-desc">
    <title id="tsukudani-title">佃煮老舗3軒の創業年を比較する年表</title>
    <desc id="tsukudani-desc">天安本店が天保8年（1837年）、丸久が安政6年（1859年）の創業で、田中屋は確認できる最古の記録が明治8年（1875年）であることを示す年表。</desc>
    <rect width="300" height="110" fill="#eef0ec"/>
    <line x1="34" y1="54" x2="266" y2="54" stroke="#8a8578" stroke-width="2.2"/>
    <path d="M266 54 l-8 -4 M266 54 l-8 4" stroke="#8a8578" stroke-width="2.2" fill="none"/>
    ${node(50, '1837', '天安本店|創業（天保8年）', '#8a4a2f')}
    ${node(150, '1859', '丸久|創業（安政6年）', '#8a4a2f')}
    ${node(250, '1875〜', '田中屋|確認できる最古記録', '#6b6259')}
  </svg>
  <figcaption>3軒とも佃1丁目1〜3番に集まっていますが、創業年にはばらつきがあります。天安本店（天保8年/1837年）、丸久（安政6年/1859年）は公式サイトが創業年を明記する一方、田中屋は現存する最古の記録が明治8年（1875年）で、それ以前から商いをしていた可能性にも触れています。</figcaption>
</figure>`;
}

const figures: Record<string, Figure> = {
  rivercity: { html: buildTowerChartSvg() },
  tsukudani: { html: buildTsukudaniTimelineSvg() },
};

export function figureHtml(slug: string): string | null {
  return figures[slug]?.html ?? null;
}
