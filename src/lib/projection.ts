import { geoPoints } from '../data/geo';

/** 正距円筒図法（equirectangular）で緯度経度を平面座標へ変換する。 */
export function project(
  lat: number,
  lng: number,
  opts: { minLat: number; maxLat: number; minLng: number; maxLng: number; width: number; height: number; padding: number },
) {
  const { minLat, maxLat, minLng, maxLng, width, height, padding } = opts;
  const centerLat = (minLat + maxLat) / 2;
  const cos = Math.cos((centerLat * Math.PI) / 180);
  const spanX = (maxLng - minLng) * cos;
  const spanY = maxLat - minLat;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;
  const scale = Math.min(innerW / (spanX || 1), innerH / (spanY || 1));
  const x = padding + ((lng - minLng) * cos) * scale + (innerW - spanX * scale) / 2;
  const y = padding + (maxLat - lat) * scale + (innerH - spanY * scale) / 2;
  return { x, y };
}

export function getBounds() {
  const lats = geoPoints.map((p) => p.lat);
  const lngs = geoPoints.map((p) => p.lng);
  return {
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
  };
}
