import { articles } from '../src/data/articles';
import { geoPoints } from '../src/data/geo';
import { contrastRows } from '../src/data/contrast';

let errors = 0;

function fail(msg: string) {
  console.error(`✗ ${msg}`);
  errors++;
}

// ── articles ──
const slugs = new Set<string>();
for (const a of articles) {
  if (slugs.has(a.slug)) fail(`記事slug重複: ${a.slug}`);
  slugs.add(a.slug);
  if (!a.title || !a.dek) fail(`記事の必須フィールド欠落: ${a.slug}`);
  if (a.sources.length === 0) fail(`出典が0件: ${a.slug}`);
  if (a.sections.length === 0) fail(`本文セクションが0件: ${a.slug}`);
  const totalChars = a.sections.reduce((sum, s) => sum + s.paragraphs.join('').length, 0);
  if (totalChars < 300) fail(`本文が短すぎる（300字未満・${totalChars}字）: ${a.slug}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(a.updatedAt)) fail(`updatedAtの形式不正: ${a.slug}`);
  for (const s of a.sections) {
    if (s.paragraphs.length === 0) fail(`セクション「${s.heading}」の段落が0件: ${a.slug}`);
  }
}

// ── geo points ──
const geoIds = new Set<string>();
for (const p of geoPoints) {
  if (geoIds.has(p.id)) fail(`地点id重複: ${p.id}`);
  geoIds.add(p.id);
  if (Math.abs(p.lat) < 1 || Math.abs(p.lng) < 1) fail(`座標が不正な値: ${p.id}`);
}

// ── contrast rows ──
if (contrastRows.length === 0) fail('contrastRowsが0件');
for (const r of contrastRows) {
  if (!r.old || !r.next) fail(`対比データの欠落: ${r.label}`);
}

console.log('--- tsukuda-history データ検証 ---');
console.log(`記事: ${articles.length}本`);
console.log(`地点: ${geoPoints.length}件`);
console.log(`対比項目: ${contrastRows.length}件`);

if (errors > 0) {
  console.error(`\n❌ ${errors}件のエラー`);
  process.exit(1);
}
console.log('\n✅ All checks passed!');
