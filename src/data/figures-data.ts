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
  <figcaption>棒の長さが階数。あとに建った棟ほど高く、戸数も多くなりました。</figcaption>
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
  <figcaption>灰色の田中屋だけは創業年ではなく、確かめられる最古の記録（明治8年の書籍）の年です。</figcaption>
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
  <figcaption>江戸の創建から、明治の扁額、昭和の祭りの形の変化まで。</figcaption>
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
  <figcaption>移り住んだ年は資料によって揺れますが（左）、島を築いた年は比較的そろっています（右）。</figcaption>
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
  <figcaption>いまの「佃」には、江戸初期と明治期、二つの時代の埋め立て地が入っています。</figcaption>
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

// 石川島の220年（縦の年表）。会社の歩みは茶、跡地の再開発は青、人足寄場は灰（rivercity の節2のあと）
function buildIshikawajimaTimelineSvg(): string {
  const rows: [string, string, string][] = [
    ['1790', '人足寄場を開く（松平定信）', '#6b6259'],
    ['1853', '石川島造船所（幕府が水戸藩に命じる）', '#8a4a2f'],
    ['明治', '平野富二が引き継ぎ、民営に', '#8a4a2f'],
    ['1945', '社名「石川島重工業」', '#8a4a2f'],
    ['1960', '播磨造船所と合併「石川島播磨重工業」', '#8a4a2f'],
    ['1979', '佃工場の操業が終わる', '#8a4a2f'],
    ['1986', 'リバーシティ21 着工', '#3b6ea5'],
    ['2007', '社名「株式会社IHI」', '#8a4a2f'],
    ['2010', '最後の棟（オフィス棟）が竣工', '#3b6ea5'],
  ];
  const rowH = 30, top = 18;
  const items = rows
    .map(([y, label, c], i) => {
      const cy = top + i * rowH;
      return (
        `<circle cx="52" cy="${cy}" r="6" fill="${c}"/>` +
        `<text x="40" y="${cy + 4}" font-size="11.5" font-weight="700" fill="#262524" text-anchor="end">${y}</text>` +
        `<text x="66" y="${cy + 4}" font-size="11.5" fill="${c === '#3b6ea5' ? '#2f5a88' : '#262524'}">${label}</text>`
      );
    })
    .join('');
  const h = top + (rows.length - 1) * rowH + 18;
  return `<figure class="fig">
  <svg viewBox="0 0 300 ${h}" width="100%" role="img" aria-labelledby="ishi-title ishi-desc">
    <title id="ishi-title">石川島の220年の年表</title>
    <desc id="ishi-desc">1790年の人足寄場、1853年の石川島造船所、明治の民営化、1945年の石川島重工業、1960年の石川島播磨重工業、1979年の佃工場の操業終了、1986年のリバーシティ21着工、2007年の株式会社IHI、2010年の最後の棟の竣工を縦に並べた年表。</desc>
    <line x1="52" y1="${top}" x2="52" y2="${top + (rows.length - 1) * rowH}" stroke="#c9c2b2" stroke-width="2"/>
    ${items}
  </svg>
  <figcaption>茶は会社の歩み、青は跡地の再開発。工場が閉じてから着工まで7年、着工から最後の棟まで24年かかりました。</figcaption>
</figure>`;
}

// 月島の埋め立ての広がり（縦の年表・tsukishima の節1のあと）
function buildTsukishimaReclaimSvg(): string {
  const rows: [string, string, string][] = [
    ['1883', '東京湾澪浚（浚渫）が始まる', '#6b6259'],
    ['1887', '浚渫の土砂を埋め立てに使い始める', '#6b6259'],
    ['1892', '月島一号地（いまの月島1〜4丁目）', '#3b6ea5'],
    ['1894', '二号地', '#3b6ea5'],
    ['1896', '新佃島', '#3b6ea5'],
    ['1913', '三号地', '#3b6ea5'],
    ['1920', '人口 約3万人・工場 214か所', '#8a4a2f'],
  ];
  const rowH = 30, top = 18;
  const items = rows.map(([y, label, c], i) => {
    const cy = top + i * rowH;
    return `<circle cx="52" cy="${cy}" r="6" fill="${c}"/>` +
      `<text x="40" y="${cy + 4}" font-size="11.5" font-weight="700" fill="#262524" text-anchor="end">${y}</text>` +
      `<text x="66" y="${cy + 4}" font-size="11.5" fill="#262524">${label}</text>`;
  }).join('');
  const h = top + (rows.length - 1) * rowH + 18;
  return `<figure class="fig">
  <svg viewBox="0 0 300 ${h}" width="100%" role="img" aria-labelledby="tkr-title tkr-desc">
    <title id="tkr-title">月島の埋め立ての広がりの年表</title>
    <desc id="tkr-desc">1883年の浚渫開始、1887年に土砂を埋め立てへ転用、1892年の月島一号地、1894年の二号地、1896年の新佃島、1913年の三号地、1920年ごろ人口約3万人・工場214か所を縦に並べた年表。</desc>
    <line x1="52" y1="${top}" x2="52" y2="${top + (rows.length - 1) * rowH}" stroke="#c9c2b2" stroke-width="2"/>
    ${items}
  </svg>
  <figcaption>青が埋め立て地の完成。一号地の完成から30年足らずで、工場の町になりました。</figcaption>
</figure>`;
}

// 月島のもんじゃ焼き店の数（棒・tsukishima の節3のあと）
function buildMonjaCountSvg(): string {
  const rows: [string, number, string][] = [
    ['昭和30年代', 4, '4軒'],
    ['1997年', 28, '28店（振興会の発足）'],
    ['2019年', 54, '54店（組合の加盟店）'],
  ];
  const maxW = 150, rowH = 34, top = 12;
  const items = rows.map(([y, n, label], i) => {
    const yy = top + i * rowH;
    const w = Math.max(4, (n / 54) * maxW);
    return `<text x="0" y="${yy + 13}" font-size="11.5" font-weight="700" fill="#262524">${y}</text>` +
      `<rect x="0" y="${yy + 18}" width="${w.toFixed(1)}" height="10" fill="#8a4a2f"/>` +
      `<text x="${(w + 6).toFixed(1)}" y="${yy + 27}" font-size="11.5" fill="#262524">${label}</text>`;
  }).join('');
  return `<figure class="fig">
  <svg viewBox="0 0 300 ${top + rows.length * rowH + 4}" width="100%" role="img" aria-labelledby="monja-title monja-desc">
    <title id="monja-title">月島のもんじゃ焼き店の数の移り変わり</title>
    <desc id="monja-desc">昭和30年代は4軒、1997年は振興会の発足時に28店、2019年は協同組合の加盟店が54店であることを、店の数に比例した横棒で示す図。</desc>
    <g transform="translate(15,0)">${items}</g>
  </svg>
  <figcaption>棒の長さが店の数。平成に入ってから急に増えました。</figcaption>
</figure>`;
}

// 住吉神社に祀られた神々（どこから・何を・いつ）。sumiyoshi の節1のあと
function buildSumiyoshiDeitiesSvg(): string {
  const box = (y: number, h: number, fill: string, stroke: string) => `<rect x="20" y="${y}" width="260" height="${h}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
  const t = (x: number, y: number, s: string, w = 400, c = '#262524', anchor = 'middle') => `<text x="${x}" y="${y}" font-size="11.5" font-weight="${w}" fill="${c}" text-anchor="${anchor}">${s}</text>`;
  return `<figure class="fig">
  <svg viewBox="0 0 300 236" width="100%" role="img" aria-labelledby="sumi-d-title sumi-d-desc">
    <title id="sumi-d-title">住吉神社に祀られた神々の図</title>
    <desc id="sumi-d-desc">摂津国佃村の田蓑神社（旧称・住吉神社）から住吉三神の分霊を移し、同時に神功皇后と徳川家康の霊（東照御親命）も祀って、正保3年（1646年）に佃の住吉神社が創建されたことを示す図。</desc>
    ${box(8, 44, '#f7f1e0', '#8a4a2f')}
    ${t(150, 27, '摂津国 佃村の田蓑神社', 700)}
    ${t(150, 43, '（旧称・住吉神社）', 400, '#6b6259')}
    <path d="M150 56 V76" stroke="#8a4a2f" stroke-width="2"/><path d="M150 80 l-6 -9 h12 z" fill="#8a4a2f"/>
    ${t(160, 72, '分霊を移す', 400, '#8a4a2f', 'start')}
    ${box(86, 142, '#ffffff', '#8a4a2f')}
    ${t(150, 106, '佃の住吉神社（1646年 創建）', 700)}
    <line x1="36" y1="116" x2="264" y2="116" stroke="#e4dfd0"/>
    ${t(36, 136, '住吉三神', 700, '#262524', 'start')}
    ${t(36, 152, '底筒之男命・中筒之男命・表筒之男命', 400, '#262524', 'start')}
    ${t(36, 176, '神功皇后', 700, '#262524', 'start')}
    ${t(36, 200, '徳川家康の霊', 700, '#262524', 'start')}
    ${t(36, 216, '（東照御親命）', 400, '#6b6259', 'start')}
    ${t(264, 176, 'いっしょに', 400, '#3b6ea5', 'end')}
    ${t(264, 200, '祀った', 400, '#3b6ea5', 'end')}
  </svg>
  <figcaption>海の神である住吉三神に、神功皇后と家康の霊をあわせて、創建のときから祀っています。</figcaption>
</figure>`;
}

// 佃の渡しの移り変わり（縦の年表・oohashi の節2のあと）
function buildWatashiTimelineSvg(): string {
  const rows: [string, string, string][] = [
    ['1645', '島の人たちが運営（不定期）', '#6b6259'],
    ['1883', '大倉組の経営に。定期便が始まる', '#8a4a2f'],
    ['1926', '東京市の渡船になる', '#8a4a2f'],
    ['1927', '汽船が引く渡船に。運賃は無料', '#8a4a2f'],
    ['1964', '佃大橋の開通で廃止', '#3b6ea5'],
  ];
  const rowH = 30, top = 18;
  const items = rows.map(([y, label, c], i) => {
    const cy = top + i * rowH;
    return `<circle cx="52" cy="${cy}" r="6" fill="${c}"/>` +
      `<text x="40" y="${cy + 4}" font-size="11.5" font-weight="700" fill="#262524" text-anchor="end">${y}</text>` +
      `<text x="66" y="${cy + 4}" font-size="11.5" fill="#262524">${label}</text>`;
  }).join('');
  const h = top + (rows.length - 1) * rowH + 18;
  return `<figure class="fig">
  <svg viewBox="0 0 300 ${h}" width="100%" role="img" aria-labelledby="watashi-title watashi-desc">
    <title id="watashi-title">佃の渡しの移り変わりの年表</title>
    <desc id="watashi-desc">1645年に島民が運営する不定期の渡しとして始まり、1883年に大倉組の経営で定期運航、1926年に東京市営、1927年から汽船による無料の曳船渡船、1964年に佃大橋の開通で廃止されたことを縦に並べた年表。</desc>
    <line x1="52" y1="${top}" x2="52" y2="${top + (rows.length - 1) * rowH}" stroke="#c9c2b2" stroke-width="2"/>
    ${items}
  </svg>
  <figcaption>およそ320年、隅田川で最後まで残った渡しでした。</figcaption>
</figure>`;
}

const figures: Record<string, Figure> = {
  rivercity: { html: buildTowerChartSvg() },
  sumiyoshi: { html: buildSumiyoshiTimelineSvg() },
  oohashi: { html: buildOohashiContrastSvg() },
  'bon-odori': { html: buildBonOdoriSvg() },
};

export function figureHtml(slug: string): string | null {
  return figures[slug]?.html ?? null;
}

// 節のあとに置く図（節の番号は0から）。末尾の図（figureHtml）とは別に、本文の流れの中で見せたいもの
const sectionFigures: Record<string, Record<number, string>> = {
  rivercity: { 1: buildIshikawajimaTimelineSvg() },
  tsukishima: { 0: buildTsukishimaReclaimSvg(), 2: buildMonjaCountSvg() },
  sumiyoshi: { 0: buildSumiyoshiDeitiesSvg() },
  tsukudani: { 1: buildTsukudaniTimelineSvg() },
  oohashi: { 1: buildWatashiTimelineSvg() },
  chimei: { 2: buildTownMergeSvg() },
  seiritsu: { 1: buildSeiritsuTimelineSvg() },
};

export function sectionFigureHtml(slug: string, sectionIndex: number): string | null {
  return sectionFigures[slug]?.[sectionIndex] ?? null;
}
