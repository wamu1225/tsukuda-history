// scripts/prerender.ts：SSG。トップ（境界対比ビュー）、記事一覧、記事6本、about/privacyの
// 静的フォールバックHTML、per-page meta、JSON-LDを焼き込み、sitemap.xmlを生成する。
// 境界地図SVGは src/lib/boundaryMapSvg.ts を唯一の生成元として呼び出す（React側と同じ関数＝ズレない）。
// 実行: npx tsx scripts/prerender.ts（npm run predeploy 内）
import * as fs from 'fs';
import * as path from 'path';
import { articles } from '../src/data/articles';
import { contrastRows } from '../src/data/contrast';
import { ABOUT_CONTENT, PRIVACY_CONTENT, SITE_NAME } from '../src/data/static-pages';
import { renderBoundaryMapSvg, boundaryMapLegendItems } from '../src/lib/boundaryMapSvg';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const BASE = '/tsukuda-history';
const BASE_URL = 'https://study-apps.com/tsukuda-history';
const SITE_UPDATED_AT = '2026-09-10';

console.log('--- tsukuda-history SSG Pre-rendering ---');
if (!fs.existsSync(INDEX_HTML_PATH)) {
  console.error('Error: dist/index.html not found. Run "npm run build" first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
function templateForDepth(depth: number): string {
  if (depth === 0) return templateHtml;
  const up = '../'.repeat(depth);
  return templateHtml
    .replace(/href="\.\/assets\//g, `href="${up}assets/`)
    .replace(/src="\.\/assets\//g, `src="${up}assets/`)
    .replace(/href="\.\/favicon\.svg"/g, `href="${up}favicon.svg"`);
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function mdToHtml(content: string): string {
  return content
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b) => (b.startsWith('## ') ? `<h2>${esc(b.slice(3))}</h2>` : `<p>${esc(b)}</p>`))
    .join('\n');
}

function applyMeta(html: string, title: string, description: string, urlPath: string): string {
  const fullTitle = urlPath === '/' ? '佃 境界のまち｜江戸の路地と超高層群を分ける一本の道' : `${title}｜${SITE_NAME}`;
  const url = `${BASE_URL}${urlPath}`;
  return html
    .replace(/<title>.*?<\/title>/, `<title>${esc(fullTitle)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${esc(description)}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${esc(fullTitle)}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${esc(fullTitle)}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${esc(description)}" />`);
}

function writePage(subpath: string, html: string) {
  const dir = subpath === '' ? DIST_DIR : path.join(DIST_DIR, subpath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

const footerNav = `<nav style="margin-top:24px;display:flex;gap:16px;flex-wrap:wrap"><a href="${BASE}/about/" style="color:#8a4a2f">このサイトについて</a><a href="${BASE}/privacy/" style="color:#8a4a2f">プライバシーポリシー</a></nav>`;

const shellStyle =
  'font-family:sans-serif;line-height:1.85;max-width:720px;margin:0 auto;padding:24px 20px;color:#262524';
const h1Style = 'font-size:1.5rem;border-bottom:3px solid #8a4a2f;padding-bottom:8px;margin-bottom:16px;color:#3b2f1f';

function wrap(depth: number, title: string, desc: string, urlPath: string, bodyHtml: string, jsonLd: object) {
  let html = applyMeta(templateForDepth(depth), title, desc, urlPath);
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`);
  return html;
}

const ZONE_LABEL: Record<string, string> = { old: '元佃', new: 'リバーシティ21', boundary: '境界' };

// ── トップ（境界対比ビュー） ──
const homeDesc =
  '東京都中央区佃1丁目。江戸期の路地・住吉神社と、超高層タワー群リバーシティ21が数百メートルで隣り合う理由を、境界線の対比で読み解く。';
const contrastRowsHtml = contrastRows
  .map(
    (r) =>
      `<tr><th style="text-align:left;padding:8px;background:#e4dfd0;font-size:0.85rem">${esc(r.label)}</th><td style="padding:8px;background:#f7f1e0;border-left:3px solid #8a4a2f">${esc(r.old)}</td><td style="padding:8px;background:#e7edf4;border-left:3px solid #3b6ea5">${esc(r.next)}</td></tr>`,
  )
  .join('\n');
const legendHtml = boundaryMapLegendItems()
  .map((p) => `<span style="margin-right:14px">${esc(p.name)}</span>`)
  .join('');
const articleLinksHtml = (zone: string) =>
  articles
    .filter((a) => a.zone === zone)
    .map(
      (a) =>
        `<li><a href="${BASE}/articles/${a.slug}/" style="color:#8a4a2f"><strong>${esc(a.title)}</strong></a><br/><span style="color:#6b6259;font-size:0.88rem">${esc(a.dek)}</span></li>`,
    )
    .join('\n');
const homeBody = `<article style="${shellStyle}">
  <p style="color:#6b6259;font-size:0.8rem">東京都中央区 佃1丁目</p>
  <h1 style="${h1Style}">江戸の路地と、超高層群。隔てているのは、たった一本の道か。</h1>
  <p>${esc(homeDesc)}</p>
  <h2 style="font-size:1.15rem;margin:24px 0 8px;color:#3b2f1f">元佃 ⇄ リバーシティ21</h2>
  <table style="width:100%;border-collapse:collapse;border:1px solid #8a8578">${contrastRowsHtml}</table>
  <h2 style="font-size:1.15rem;margin:24px 0 8px;color:#3b2f1f">実座標で見る位置関係</h2>
  <p>老舗3軒のクラスタからスカイライトタワーまで実測 約180m、センチュリーパークタワーまで約300m。</p>
  ${renderBoundaryMapSvg()}
  <p style="font-size:0.85rem">${legendHtml}</p>
  <h2 style="font-size:1.15rem;margin:24px 0 8px;color:#3b2f1f">記事を読む（元佃）</h2>
  <ul style="padding-left:18px">${articleLinksHtml('old')}</ul>
  <h2 style="font-size:1.15rem;margin:24px 0 8px;color:#3b2f1f">記事を読む（境界）</h2>
  <ul style="padding-left:18px">${articleLinksHtml('boundary')}</ul>
  <h2 style="font-size:1.15rem;margin:24px 0 8px;color:#3b2f1f">記事を読む（リバーシティ21）</h2>
  <ul style="padding-left:18px">${articleLinksHtml('new')}</ul>
  ${footerNav}
</article>`;
writePage(
  '',
  wrap(0, '', homeDesc, '/', homeBody, {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${BASE_URL}/`,
    description: homeDesc,
    inLanguage: 'ja',
  }),
);
console.log('✓ トップページ');

// ── 記事一覧 ──
{
  const desc = '佃1丁目の成立から住吉神社、老舗の佃煮店、リバーシティ21再開発、境界線の実測までをまとめた記事一覧です。';
  const rows = articles
    .map(
      (a) =>
        `<li>[${ZONE_LABEL[a.zone]}] <a href="${BASE}/articles/${a.slug}/" style="color:#8a4a2f">${esc(a.title)}</a>：${esc(a.dek)}</li>`,
    )
    .join('\n');
  const body = `<article style="${shellStyle}">
    <h1 style="${h1Style}">記事一覧</h1>
    <p>${esc(desc)}</p>
    <ul style="padding-left:18px">${rows}</ul>
    ${footerNav}
  </article>`;
  writePage(
    'articles',
    wrap(1, '記事一覧', desc, '/articles/', body, {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: '記事一覧',
      url: `${BASE_URL}/articles/`,
      inLanguage: 'ja',
    }),
  );
}
console.log('✓ /articles/');

// ── 記事本体（6件） ──
for (const a of articles) {
  const sectionsHtml = a.sections
    .map(
      (s) =>
        `<h2 style="font-size:1.05rem;margin-top:24px">${esc(s.heading)}</h2>${s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n')}`,
    )
    .join('\n');
  const sourcesHtml = a.sources.map((s) => `<li>${esc(s)}</li>`).join('\n');
  const body = `<article style="${shellStyle}">
    <p style="display:inline-block;font-size:0.74rem;padding:3px 10px;border-radius:12px;color:#fff;background:${a.zone === 'old' ? '#8a4a2f' : a.zone === 'new' ? '#3b6ea5' : '#8a8578'}">${ZONE_LABEL[a.zone]}</p>
    <h1 style="${h1Style}">${esc(a.title)}</h1>
    <p style="color:#6b6259">${esc(a.dek)}</p>
    ${sectionsHtml}
    <div style="margin-top:24px;padding:14px 16px;background:#fff;border:1px solid #8a8578;border-radius:6px">
      <strong>出典</strong>
      <ul style="margin:6px 0 0;padding-left:18px">${sourcesHtml}</ul>
    </div>
    <p style="margin-top:20px"><a href="${BASE}/articles/" style="color:#8a4a2f">← 記事一覧に戻る</a></p>
    ${footerNav}
  </article>`;
  writePage(
    `articles/${a.slug}`,
    wrap(2, a.title, a.dek, `/articles/${a.slug}/`, body, {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title,
      description: a.dek,
      dateModified: a.updatedAt,
      url: `${BASE_URL}/articles/${a.slug}/`,
      inLanguage: 'ja',
    }),
  );
}
console.log(`✓ /articles/<slug>/ 全${articles.length}件`);

// ── about / privacy ──
for (const [slug, title, desc, content] of [
  ['about', 'このサイトについて', `${SITE_NAME}のデータの出典と編集方針を説明します。`, ABOUT_CONTENT],
  ['privacy', 'プライバシーポリシー', `${SITE_NAME}のプライバシーポリシー。`, PRIVACY_CONTENT],
] as const) {
  const body = `<article style="${shellStyle}">
    <h1 style="${h1Style}">${esc(title)}</h1>
    ${mdToHtml(content)}
    ${footerNav}
  </article>`;
  writePage(
    slug,
    wrap(1, title, desc, `/${slug}/`, body, {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: desc,
      url: `${BASE_URL}/${slug}/`,
      inLanguage: 'ja',
    }),
  );
}
console.log('✓ /about/ /privacy/');

// ── sitemap.xml（lastmodはページ単位＝O-2-27の教訓。全URL一律の日付にしない） ──
const urls = [
  { loc: `${BASE_URL}/`, priority: '1.0', lastmod: SITE_UPDATED_AT },
  { loc: `${BASE_URL}/articles/`, priority: '0.8', lastmod: SITE_UPDATED_AT },
  ...articles.map((a) => ({ loc: `${BASE_URL}/articles/${a.slug}/`, priority: '0.7', lastmod: a.updatedAt })),
  { loc: `${BASE_URL}/about/`, priority: '0.3', lastmod: SITE_UPDATED_AT },
  { loc: `${BASE_URL}/privacy/`, priority: '0.2', lastmod: SITE_UPDATED_AT },
];
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml);
console.log(`✓ sitemap.xml（全${urls.length}URL）`);

console.log('--- Done ---');
