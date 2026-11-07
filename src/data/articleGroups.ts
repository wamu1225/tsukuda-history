// 記事一覧の まとまり（読む順）。一覧のページと prerender の両方が使う（2026-11-07 監督）
export const ARTICLE_GROUPS: { title: string; lead: string; slugs: string[] }[] = [
  { title: 'はじめに：島の名前と成り立ち', lead: '摂津から来た漁民が、隅田川の河口に島を築くまで。', slugs: ['chimei', 'seiritsu'] },
  { title: '島の信仰と暮らし', lead: '住吉神社と盆踊り、そして佃煮。江戸から続くもの。', slugs: ['sumiyoshi', 'bon-odori', 'tsukudani'] },
  { title: '島が陸になるまで', lead: '橋、埋め立ての月島、造船所の跡地。', slugs: ['oohashi', 'tsukishima', 'rivercity'] },
  { title: '歩いて確かめる', lead: '元佃とリバーシティ21の境目と、よくある取りちがえ。', slugs: ['kyokai', 'faq'] },
];
