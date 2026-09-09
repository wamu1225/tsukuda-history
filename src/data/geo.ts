import type { GeoPoint } from './types';

/**
 * 実座標。②が2026-09-09にOpenStreetMap Nominatim／Wikipedia座標テンプレートで取得。
 * 出典は _pipeline/reports/tsukuda-history.md「Day2」節に記録（内部資料）。
 * 住吉水門のみ座標未確定（djq.jpの位置関係記述から暫定配置・isEstimated=trueで明示）。
 */
export const geoPoints: GeoPoint[] = [
  {
    id: 'sumiyoshi-jinja',
    name: '住吉神社',
    zone: 'old',
    lat: 35.667972,
    lng: 139.783306,
    note: '正保3年(1646)創建。佃1-1-14。',
  },
  {
    id: 'tanakaya',
    name: '佃源 田中屋',
    zone: 'old',
    lat: 35.6674527,
    lng: 139.7822358,
    note: '明治8年(1875)創業。佃1-3-13。',
  },
  {
    id: 'tenyasu',
    name: '天安本店',
    zone: 'old',
    lat: 35.6675955,
    lng: 139.7822648,
    note: '天保8年(1837)創業。佃1-3-14。',
  },
  {
    id: 'marukyu',
    name: 'つくだに丸久',
    zone: 'old',
    lat: 35.6680204,
    lng: 139.7823483,
    note: '安政6年(1859)創業。佃1-2-10。',
  },
  {
    id: 'tsukuda-kobashi',
    name: '佃小橋',
    zone: 'boundary',
    lat: 35.667281,
    lng: 139.783353,
    note: '佃川支川（佃堀）に架かる赤い橋。',
  },
  {
    id: 'tsukuda-oohashi',
    name: '佃大橋',
    zone: 'boundary',
    lat: 35.6678368,
    lng: 139.7810734,
    note: '1964年架橋。取付道路が旧佃川を埋め立てた。',
  },
  {
    id: 'skylight-tower',
    name: 'スカイライトタワー',
    zone: 'new',
    lat: 35.6701565,
    lng: 139.7843436,
    note: 'リバーシティ21・佃1-11-7。',
  },
  {
    id: 'century-park-tower',
    name: 'センチュリーパークタワー',
    zone: 'new',
    lat: 35.6705122,
    lng: 139.7857627,
    note: '地上54階。佃2-1-1。リバーシティ21で最も高い棟。',
  },
];
