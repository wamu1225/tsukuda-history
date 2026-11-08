import type { ReactNode } from 'react';
import { articles } from '../data/articles';
import { CATEGORY_LABEL } from '../data/types';
import { href } from '../lib/router';
import BoundaryMap from '../components/BoundaryMap';
import { contrastRows } from '../data/contrast';
import { figureHtml, sectionFigureHtml } from '../data/figures-data';
import { ARTICLE_POINTS } from '../data/hooks';
import { iconSvg, ARTICLE_ICON } from '../data/icons';

// 本文中の [text](/articles/slug/) をリンクに変換する（他記事とつなぐための最小限のインライン記法）。
function renderParagraph(text: string): ReactNode[] {
  const re = /\[([^\]]+)\]\((\/articles\/[a-z0-9-]+\/)\)/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    nodes.push(
      <a key={key++} href={href(m[2])}>
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

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
      {ARTICLE_ICON[article.slug] && <span className="article__icon" dangerouslySetInnerHTML={{ __html: iconSvg(ARTICLE_ICON[article.slug], 30) }} />}
      <h1 className="content-h1">{article.title}</h1>
      <p className="article__dek">{article.dek}</p>
      {ARTICLE_POINTS[article.slug] && (
        <aside className="points" aria-label="ざっくり3行">
          <p className="points__label">ざっくり3行</p>
          <ol>{ARTICLE_POINTS[article.slug].map((p) => <li key={p}>{p}</li>)}</ol>
        </aside>
      )}
      {article.sections.length >= 2 && (
        <nav className="article__toc" aria-label="目次">
          <p className="article__toc-label">目次</p>
          <ol>
            {article.sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#sec-${i}`}>{s.heading}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      {article.sections.map((s, i) => (
        <section key={s.heading} id={`sec-${i}`} className="article__section">
          <h2>{s.heading}</h2>
          {s.paragraphs.map((p, i2) => (
            <p key={i2}>{renderParagraph(p)}</p>
          ))}
          {sectionFigureHtml(article.slug, i) && <div dangerouslySetInnerHTML={{ __html: sectionFigureHtml(article.slug, i)! }} />}
        </section>
      ))}
      {figureHtml(article.slug) && <div dangerouslySetInnerHTML={{ __html: figureHtml(article.slug)! }} />}
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
