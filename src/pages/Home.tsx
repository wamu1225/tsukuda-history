import { href } from '../lib/router';
import { contrastRows } from '../data/contrast';
import { articles } from '../data/articles';
import BoundaryMap from '../components/BoundaryMap';

const ZONE_TITLE: Record<string, string> = { old: '元佃', new: 'リバーシティ21', boundary: '境界' };

export default function Home() {
  const oldArticles = articles.filter((a) => a.zone === 'old');
  const newArticles = articles.filter((a) => a.zone === 'new');
  const boundaryArticles = articles.filter((a) => a.zone === 'boundary');

  return (
    <>
      <section className="hero">
        <p className="hero__eyebrow">東京都中央区 佃1丁目</p>
        <h1 className="hero__title">
          江戸の路地と、超高層群。<br />
          隔てているのは、たった一本の道か。
        </h1>
        <p className="hero__lead">
          住吉神社と老舗の佃煮店が並ぶ「元佃」の路地から、最大54階のタワーが立つ「リバーシティ21」まで、実は数百メートル。土地の持ち主の歴史が違うだけで、これほど異なる景観が隣り合っている。
        </p>
      </section>

      <section className="contrast" aria-labelledby="contrast-title">
        <h2 id="contrast-title" className="section-title">
          元佃 ⇄ リバーシティ21
        </h2>
        <div className="contrast-table" role="table">
          <div className="contrast-table__head" role="row">
            <span className="contrast-table__cell contrast-table__cell--label" role="columnheader" />
            <span className="contrast-table__cell contrast-table__cell--old" role="columnheader">
              元佃
            </span>
            <span className="contrast-table__cell contrast-table__cell--new" role="columnheader">
              リバーシティ21
            </span>
          </div>
          {contrastRows.map((row) => (
            <div className="contrast-table__row" role="row" key={row.label}>
              <span className="contrast-table__cell contrast-table__cell--label" role="rowheader">
                {row.label}
              </span>
              <span className="contrast-table__cell contrast-table__cell--old" role="cell">
                {row.old}
              </span>
              <span className="contrast-table__cell contrast-table__cell--new" role="cell">
                {row.next}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="map-section" aria-labelledby="map-title">
        <h2 id="map-title" className="section-title">
          実座標で見る位置関係
        </h2>
        <p className="section-lead">
          老舗3軒のクラスタからスカイライトタワーまで実測 約180m、センチュリーパークタワーまで約300m。
        </p>
        <BoundaryMap />
      </section>

      <section className="article-groups" aria-labelledby="articles-title">
        <h2 id="articles-title" className="section-title">
          記事を読む
        </h2>
        {[
          { zone: 'old', list: oldArticles },
          { zone: 'boundary', list: boundaryArticles },
          { zone: 'new', list: newArticles },
        ].map(({ zone, list }) => (
          <div key={zone} className={`article-group article-group--${zone}`}>
            <h3 className="article-group__title">{ZONE_TITLE[zone]}</h3>
            <ul className="article-group__list">
              {list.map((a) => (
                <li key={a.slug}>
                  <a href={href(`/articles/${a.slug}/`)}>{a.title}</a>
                  <p className="article-group__dek">{a.dek}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
