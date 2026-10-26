// 記事本文に付随する自作SVG模式図のSSOT。React版（ArticlePage.tsx）と
// prerender.ts で同じHTML文字列を共用するための単一ソース。
// ⚠️ viewBox幅は390px幅のモバイル表示でも実効フォントが11px以上になるよう、
// 他サイトの年表図と同じ300〜320の幅に抑えている（O-2-25の再発防止）。

export type Figure = { html: string };

// リバーシティ21・3タワーの規模比較（階数バーチャート）
function buildTowerChartSvg(): string {
  const towers = [
    { name: 'シティフロントタワー', year: '1990年代初', floors: 31, units: '290戸', color: '#8fb0cf' },
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
    <desc id="tower-desc">シティフロントタワー31階290戸（1990年代初頭）、スカイライトタワー40階336戸（1993年）、センチュリーパークタワー54階756戸（1999年）を、階数に比例した横棒で比較する図。</desc>
    <g transform="translate(15,5)">${rows}</g>
  </svg>
  <figcaption>3つの超高層棟は、規模も竣工年もそれぞれ異なります。最も早く建ったシティフロントタワー（1990年代初頭）から、もっとも新しく最も高いセンチュリーパークタワー（1999年）まで、階数・戸数とも段階的に増えていきました。</figcaption>
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
  <figcaption>3軒とも佃1丁目の元佃に集まっていますが、創業年にはばらつきがあります。天安本店は天保8年（1837年）、丸久は安政6年（1859年）の創業とされます。田中屋は現存する最古の書籍が明治8年（1875年）のもので、公式サイトの記載にもとづきます。</figcaption>
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
    ${node(125, '天保年間', '八角形の|宮神輿を制作', '#6b6259')}
    ${node(200, '1882', '陶製扁額を|奉納', '#8a4a2f')}
    ${node(260, '1962', '海中渡御を|最後に台船へ', '#262524')}
  </svg>
  <figcaption>住吉神社は正保3年（1646年）6月29日の創建以来、天保年間（1830〜1844年）作とされる八角形の宮神輿、明治15年（1882年）奉納の陶製扁額など、江戸・明治の信仰の記録を今に伝えています。昭和37年（1962年）までは担ぎ手が隅田川へ入る「海中渡御」でしたが、以降は台船による船渡御に変わりました。</figcaption>
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
  <figcaption>同じ「佃川」という1本の水路が、佃大橋への埋立、佃の渡しの廃止、佃堀としての現存という3つの異なる結末をたどりました。橋の完成と渡しの廃止は同じ昭和39年（1964年）に重なっています。</figcaption>
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
    <desc id="seiritsu-desc">漁民の江戸入りを慶長17年とする説と、正保元年の埋め立てを並べた年表。</desc>
    <rect width="300" height="110" fill="#eef0ec"/>
    <line x1="34" y1="54" x2="266" y2="54" stroke="#8a8578" stroke-width="2.2"/>
    <path d="M266 54 l-8 -4 M266 54 l-8 4" stroke="#8a8578" stroke-width="2.2" fill="none"/>
    ${node(70, '1612説', '森孫右衛門ら|34名が江戸入り', '#8a4a2f')}
    ${node(220, '1644', '干潟を埋め立て|島を築く（正保元年）', '#262524')}
  </svg>
  <figcaption>佃村の漁民がいつ江戸へ移り住んだかは資料によって揺れ、慶長17年（1612年）に森孫右衛門ら34名が江戸に入ったとする資料もあります。島を築いたのは正保元年（1644年）です。</figcaption>
</figure>`;
}

// 佃1〜3丁目の町域が合わさった経緯（合流図）
function buildTownMergeSvg(): string {
  const box = (x: number, a: string, b: string, c: string, color: string) =>
    `<rect x="${x}" y="12" width="88" height="62" rx="3" fill="none" stroke="${color}" stroke-width="2"/>` +
    `<text x="${x + 44}" y="31" font-size="12" font-weight="700" fill="#262524" text-anchor="middle">${a}</text>` +
    `<text x="${x + 44}" y="48" font-size="11.5" fill="#262524" text-anchor="middle">${b}</text>` +
    `<text x="${x + 44}" y="63" font-size="11.5" fill="#262524" text-anchor="middle">${c}</text>`;
  return `<figure class="fig">
  <svg viewBox="0 0 300 190" width="100%" role="img" aria-labelledby="town-title town-desc">
    <title id="town-title">佃1〜3丁目の町域が合わさった図</title>
    <desc id="town-desc">江戸初期からの佃島と、明治期の埋め立てでできた新佃島西町、新佃島東町が、昭和の住居表示で現在の佃1〜3丁目になったことを示す図。</desc>
    <rect width="300" height="190" fill="#eef0ec"/>
    ${box(8, '佃島', '江戸初期の埋立地', '1丁目が中心', '#8a4a2f')}
    ${box(106, '新佃島西町', '明治期の埋立地', '2丁目', '#3b6ea5')}
    ${box(204, '新佃島東町', '明治期の埋立地', '3丁目', '#3b6ea5')}
    <path d="M52 78 L132 120 M150 78 V120 M248 78 L168 120" stroke="#8a8578" stroke-width="2" fill="none"/>
    <rect x="70" y="122" width="160" height="56" rx="3" fill="#262524" opacity="0.08" stroke="#262524" stroke-width="2"/>
    <text x="150" y="146" font-size="13" font-weight="700" fill="#262524" text-anchor="middle">佃1〜3丁目</text>
    <text x="150" y="166" font-size="11.5" fill="#262524" text-anchor="middle">昭和の住居表示で一つの町名へ</text>
  </svg>
  <figcaption>元佃は最初の埋立地の古い町並みを指すのに対し、行政区画としての佃は江戸初期と明治期、二つの時代の埋立地を含んでいます。</figcaption>
</figure>`;
}

// 佃島の盆踊りの配置（模式図）
function buildBonOdoriSvg(): string {
  return `<figure class="fig">
  <svg viewBox="0 0 300 220" width="100%" role="img" aria-labelledby="bon-title bon-desc">
    <title id="bon-title">佃島の盆踊りの配置の模式図</title>
    <desc id="bon-desc">広場の中心の櫓で音頭取りが太鼓に合わせて口説を唄い、その周りを参加者が輪になって踊り、櫓の正面に無縁仏のための精霊棚が置かれる様子を示す模式図。</desc>
    <rect width="300" height="220" fill="#eef0ec"/>
    <circle cx="150" cy="98" r="70" fill="none" stroke="#8a4a2f" stroke-width="2" stroke-dasharray="3 6"/>
    <circle cx="150" cy="28" r="5" fill="#8a4a2f"/><circle cx="200" cy="48" r="5" fill="#8a4a2f"/><circle cx="220" cy="98" r="5" fill="#8a4a2f"/>
    <circle cx="200" cy="148" r="5" fill="#8a4a2f"/><circle cx="100" cy="148" r="5" fill="#8a4a2f"/><circle cx="80" cy="98" r="5" fill="#8a4a2f"/><circle cx="100" cy="48" r="5" fill="#8a4a2f"/>
    <rect x="128" y="76" width="44" height="44" fill="#262524" opacity="0.15" stroke="#262524" stroke-width="2"/>
    <text x="150" y="95" font-size="12" font-weight="700" fill="#262524" text-anchor="middle">櫓</text>
    <text x="150" y="111" font-size="11" fill="#262524" text-anchor="middle">音頭取り</text>
    <rect x="124" y="124" width="52" height="16" fill="#3b6ea5" opacity="0.8"/>
    <text x="182" y="137" font-size="11.5" fill="#3b6ea5">← 精霊棚（正面）</text>
    <text x="150" y="190" font-size="11.5" fill="#262524" text-anchor="middle">輪になって行きつ戻りつ踊る</text>
    <text x="150" y="208" font-size="11.5" fill="#262524" text-anchor="middle">太鼓と七七調の口説のみ（三味線・笛なし）</text>
  </svg>
  <figcaption>広場の中心に櫓を組み、その正面に無縁仏を供養する精霊棚を設けます。音頭取りの太鼓と唄だけで、参加者が周りを輪になって踊ります。</figcaption>
</figure>`;
}

const figures: Record<string, Figure> = {
  rivercity: { html: buildTowerChartSvg() },
  tsukudani: { html: buildTsukudaniTimelineSvg() },
  sumiyoshi: { html: buildSumiyoshiTimelineSvg() },
  tsukishima: { html: buildTsukishimaTimelineSvg() },
  oohashi: { html: buildOohashiContrastSvg() },
  seiritsu: { html: buildSeiritsuTimelineSvg() },
  chimei: { html: buildTownMergeSvg() },
  'bon-odori': { html: buildBonOdoriSvg() },
};

export function figureHtml(slug: string): string | null {
  return figures[slug]?.html ?? null;
}
