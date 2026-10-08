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

// 住吉神社の年表（4点）
function buildSumiyoshiTimelineSvg(): string {
  const node = (x: number, year: string, label: string, color: string) =>
    `<circle cx="${x}" cy="54" r="9" fill="${color}"/>` +
    `<text x="${x}" y="34" font-size="11" font-weight="700" fill="#262524" text-anchor="middle">${year}</text>` +
    `<text x="${x}" y="80" font-size="10.5" fill="#262524" text-anchor="middle">${label.split('|')[0]}</text>` +
    (label.includes('|') ? `<text x="${x}" y="92" font-size="10.5" fill="#262524" text-anchor="middle">${label.split('|')[1]}</text>` : '');
  return `<figure class="fig">
  <svg viewBox="0 0 300 110" width="100%" role="img" aria-labelledby="sumiyoshi-title sumiyoshi-desc">
    <title id="sumiyoshi-title">住吉神社の年表の図</title>
    <desc id="sumiyoshi-desc">正保3年の創建から、宮神輿の制作、陶製扁額の奉納、海中渡御の終了までの年表。</desc>
    <rect width="300" height="110" fill="#eef0ec"/>
    <line x1="34" y1="54" x2="266" y2="54" stroke="#8a8578" stroke-width="2.2"/>
    <path d="M266 54 l-8 -4 M266 54 l-8 4" stroke="#8a8578" stroke-width="2.2" fill="none"/>
    ${node(40, '1646', '創建|（正保3年）', '#8a4a2f')}
    ${node(125, '1838', '八角形の|宮神輿を制作', '#6b6259')}
    ${node(200, '1882', '陶製扁額を|奉納', '#8a4a2f')}
    ${node(260, '1962', '海中渡御を|最後に台船へ', '#262524')}
  </svg>
  <figcaption>住吉神社は正保3年（1646年）6月29日の創建以来、天保9年（1838年）作の八角形の宮神輿、明治15年（1882年）奉納の陶製扁額など、江戸・明治の信仰の記録を今に伝えています。昭和37年（1962年）までは担ぎ手が隅田川へ入る「海中渡御」でしたが、以降は台船による船渡御に変わりました。</figcaption>
</figure>`;
}

// 月島の埋立から、もんじゃ振興会の発展までの年表（4点）
function buildTsukishimaTimelineSvg(): string {
  const node = (x: number, year: string, label: string, color: string) =>
    `<circle cx="${x}" cy="54" r="9" fill="${color}"/>` +
    `<text x="${x}" y="34" font-size="11" font-weight="700" fill="#262524" text-anchor="middle">${year}</text>` +
    `<text x="${x}" y="80" font-size="10.5" fill="#262524" text-anchor="middle">${label.split('|')[0]}</text>` +
    (label.includes('|') ? `<text x="${x}" y="92" font-size="10.5" fill="#262524" text-anchor="middle">${label.split('|')[1]}</text>` : '');
  return `<figure class="fig">
  <svg viewBox="0 0 300 110" width="100%" role="img" aria-labelledby="tsukishima-title tsukishima-desc">
    <title id="tsukishima-title">月島の埋立からもんじゃ振興会の発展までの年表の図</title>
    <desc id="tsukishima-desc">月島一号地の完成から、戦後のもんじゃ焼き文化の広がり、振興会協同組合化までの年表。</desc>
    <rect width="300" height="110" fill="#eef0ec"/>
    <line x1="34" y1="54" x2="266" y2="54" stroke="#8a8578" stroke-width="2.2"/>
    <path d="M266 54 l-8 -4 M266 54 l-8 4" stroke="#8a8578" stroke-width="2.2" fill="none"/>
    ${node(40, '1892', '月島一号地|完成', '#3b6ea5')}
    ${node(125, '1954', '好美家|創業', '#8a4a2f')}
    ${node(200, '1997', 'もんじゃ振興会|発足（28店）', '#6b6259')}
    ${node(260, '2019', '加盟|54店舗', '#262524')}
  </svg>
  <figcaption>月島一号地は明治25年（1892年）に完成し、大正9年（1920年）ごろには人口約3万人・工場214か所に成長しました。もんじゃ焼きは昭和20年代の駄菓子屋文化から育ち、平成9年（1997年）に28店でもんじゃ振興会が発足、令和元年（2019年）には加盟54店舗にまで広がっています。</figcaption>
</figure>`;
}

// 佃川の3つの結末（大橋・渡し・堀）の対比図
function buildOohashiContrastSvg(): string {
  return `<figure class="fig">
  <svg viewBox="0 0 300 190" width="100%" role="img" aria-labelledby="oohashi-title oohashi-desc">
    <title id="oohashi-title">佃川の3つの結末（大橋・渡し・堀）を示す図</title>
    <desc id="oohashi-desc">1本の水路だった佃川が、佃大橋への埋立・佃の渡しの廃止・佃堀としての現存という3つの異なる結末をたどったことを示す対比図。</desc>
    <rect x="10" y="10" width="280" height="50" fill="#e7edf4" opacity="0.7"/>
    <text x="20" y="30" font-size="12" font-weight="700" fill="#262524">佃大橋（1964年）</text>
    <text x="20" y="48" font-size="11" fill="#6b6259">佃川の大部分を埋め立てて架橋</text>
    <rect x="10" y="68" width="280" height="50" fill="#f7f1e0" opacity="0.8"/>
    <text x="20" y="88" font-size="12" font-weight="700" fill="#262524">佃の渡し（1964年廃止）</text>
    <text x="20" y="106" font-size="11" fill="#6b6259">正保2年から300年余り続いた渡し船が終了</text>
    <rect x="10" y="126" width="280" height="50" fill="#e7f0e9" opacity="0.8"/>
    <text x="20" y="146" font-size="12" font-weight="700" fill="#262524">佃堀（今も現存）</text>
    <text x="20" y="164" font-size="11" fill="#6b6259">西側の一部は水路として残り、住吉水門で高潮対策</text>
  </svg>
  <figcaption>同じ「佃川」という1本の水路が、佃大橋への埋立、佃の渡しの廃止、佃堀としての現存という3つの異なる結末をたどりました。橋の完成と渡しの廃止は同じ昭和39年（1964年）8月27日に重なっています。</figcaption>
</figure>`;
}

// 佃島の成立の年表（3点）
function buildSeiritsuTimelineSvg(): string {
  const node = (x: number, year: string, label: string, color: string) =>
    `<circle cx="${x}" cy="54" r="9" fill="${color}"/>` +
    `<text x="${x}" y="34" font-size="11" font-weight="700" fill="#262524" text-anchor="middle">${year}</text>` +
    `<text x="${x}" y="80" font-size="10.5" fill="#262524" text-anchor="middle">${label.split('|')[0]}</text>` +
    (label.includes('|') ? `<text x="${x}" y="92" font-size="10.5" fill="#262524" text-anchor="middle">${label.split('|')[1]}</text>` : '');
  return `<figure class="fig">
  <svg viewBox="0 0 300 110" width="100%" role="img" aria-labelledby="seiritsu-title seiritsu-desc">
    <title id="seiritsu-title">佃島の成立の年表の図</title>
    <desc id="seiritsu-desc">家康との結びつきを伝える2つの移住伝承と、正保年間の埋め立て完成までの年表。</desc>
    <rect width="300" height="110" fill="#eef0ec"/>
    <line x1="34" y1="54" x2="266" y2="54" stroke="#8a8578" stroke-width="2.2"/>
    <path d="M266 54 l-8 -4 M266 54 l-8 4" stroke="#8a8578" stroke-width="2.2" fill="none"/>
    ${node(40, '1590説', '天正18年|家康に同行', '#8a4a2f')}
    ${node(125, '1630説', '寛永7年|一部が移住', '#8a4a2f')}
    ${node(230, '1644〜45', '埋め立てが|完成（正保元〜2年）', '#262524')}
  </svg>
  <figcaption>佃村の漁民がいつ江戸へ移り住んだかは資料によって年代が揺れ、天正18年（1590年）説と寛永7年（1630年）説があります。一致して語られるのは、隅田川河口の干潟を埋め立てて島を完成させた正保元〜2年（1644〜45年）です。</figcaption>
</figure>`;
}

const figures: Record<string, Figure> = {
  rivercity: { html: buildTowerChartSvg() },
  tsukudani: { html: buildTsukudaniTimelineSvg() },
  sumiyoshi: { html: buildSumiyoshiTimelineSvg() },
  tsukishima: { html: buildTsukishimaTimelineSvg() },
  oohashi: { html: buildOohashiContrastSvg() },
  seiritsu: { html: buildSeiritsuTimelineSvg() },
};

export function figureHtml(slug: string): string | null {
  return figures[slug]?.html ?? null;
}
