import { renderBoundaryMapSvg, boundaryMapLegendItems } from '../lib/boundaryMapSvg';

export default function BoundaryMap() {
  const legend = boundaryMapLegendItems();

  return (
    <figure className="boundary-map">
      {/* eslint-disable-next-line react/no-danger -- prerender.tsと単一の生成元(boundaryMapSvg.ts)を共有するため */}
      <div dangerouslySetInnerHTML={{ __html: renderBoundaryMapSvg() }} />
      <figcaption className="boundary-map__legend">
        {legend.map((p) => (
          <span key={p.id} className={`boundary-map__legend-item boundary-map__legend-item--${p.zone}`}>
            {p.name}
          </span>
        ))}
      </figcaption>
      <p className="boundary-map__note">
        地図データ: OpenStreetMap Nominatim・Wikipedia座標テンプレート（正距円筒図法・北を上に表示）
      </p>
    </figure>
  );
}
