// 記事の主題を見分けるための線画アイコン（2026-11-08 ユーザー「アイコン使うとか」）。
// 絵文字は使いません。どれも 24×24・線の太さ1.8・currentColor で、同じ描き方にそろえます。
export const ICON_PATHS: Record<string, string> = {
  // 地名＝地図のピン
  pin: '<path d="M12 21s-6-5.6-6-10.2A6 6 0 0 1 18 10.8C18 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.2"/>',
  // 島を築く＝波の上の盛り土
  island: '<path d="M4 15c2-4 4-6 8-6s6 2 8 6"/><path d="M2 19c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1"/>',
  // 神社＝鳥居
  torii: '<path d="M3 6c3 1 15 1 18 0"/><path d="M5 9h14"/><path d="M7 7v13M17 7v13"/><path d="M11 9v3h2V9"/>',
  // 佃煮＝お椀
  bowl: '<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 20h8"/><path d="M9 7c0-1 1-1.5 1-2.5M13 7c0-1 1-1.5 1-2.5"/>',
  // 渡し船
  boat: '<path d="M3 15h18l-3 4H6z"/><path d="M12 15V5l5 7h-5"/><path d="M2 21c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1"/>',
  // 橋
  bridge: '<path d="M2 16h20"/><path d="M4 16c2-5 14-5 16 0"/><path d="M8 13v3M12 12v4M16 13v3"/>',
  // 碁盤目の町（月島）
  grid: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 9.5h16M4 14.5h16M9.5 4v16M14.5 4v16"/>',
  // 超高層（リバーシティ21）
  tower: '<path d="M5 21V9h5v12M10 21V3h6v18M16 21v-9h3v9"/><path d="M3 21h18"/><path d="M12 7h2M12 11h2M12 15h2"/>',
  // 境界を歩く＝足あと
  steps: '<path d="M7 14c-1.5 0-2.5-1.5-2.5-3.5S5.5 6 7 6s2.5 1.5 2.5 4.5S8.5 14 7 14z"/><path d="M5.5 16.5h3"/><path d="M17 10c-1.5 0-2.5-1.5-2.5-3.5S15.5 2 17 2s2.5 1.5 2.5 4.5S18.5 10 17 10z"/><path d="M15.5 12.5h3"/><path d="M12 14v8" stroke-dasharray="2 2"/>',
  // 盆踊り＝太鼓
  drum: '<ellipse cx="12" cy="8" rx="7" ry="3"/><path d="M5 8v8c0 1.7 3.1 3 7 3s7-1.3 7-3V8"/><path d="M15 3l3 3M9 3L6 6"/>',
  // よくある誤解＝問い
  question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7v.5"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>',
};

// 記事ごとのアイコン
export const ARTICLE_ICON: Record<string, string> = {
  chimei: 'pin', seiritsu: 'island', sumiyoshi: 'torii', tsukudani: 'bowl', oohashi: 'bridge',
  tsukishima: 'grid', rivercity: 'tower', kyokai: 'steps', 'bon-odori': 'drum', faq: 'question',
};

export function iconSvg(name: string, size = 24): string {
  const p = ICON_PATHS[name];
  if (!p) return '';
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}
