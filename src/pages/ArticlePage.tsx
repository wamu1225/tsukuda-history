import { articles } from '../data/articles';
import { CATEGORY_LABEL } from '../data/types';
import { href } from '../lib/router';
import BoundaryMap from '../components/BoundaryMap';
import { contrastRows } from '../data/contrast';

export default function ArticlePage({ id }: { id: string }) {
  const article = articles.find((a) => a.slug === id);
  if (!article) {
    return (
      <>
        <h1 className="content-h1">記事が見つかりません</h1>
        <p className="content-p">
          <a href={href('/articles/')}>記事一覧へ戻る</a>
        </p>
      </>
    );
  }

  return (
    <article className={`article article--${article.category}`}>
      <p className={`article__zone article__zone--${article.category}`}>{CATEGORY_LABEL[article.category]}</p>
      <h1 className="content-h1">{article.title}</h1>
      <p className="article__dek">{article.dek}</p>
      {article.sections.map((s) => (
        <section key={s.heading} className="article__section">
          <h2>{s.heading}</h2>
          {s.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      ))}
      {article.slug === 'kyokai' && (
        <section className="article__section article__figure">
          <h2>実座標で見る位置関係</h2>
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
          <BoundaryMap />
        </section>
      )}
      <footer className="article__sources">
        <h2>出典</h2>
        <ul>
          {article.sources.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </footer>
    </article>
  );
}
