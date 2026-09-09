import { articles } from '../data/articles';
import { href } from '../lib/router';

const ZONE_LABEL: Record<string, string> = { old: '元佃', new: 'リバーシティ21', boundary: '境界' };

export default function ArticleIndex() {
  return (
    <>
      <h1 className="content-h1">記事一覧</h1>
      <ul className="article-index">
        {articles.map((a) => (
          <li key={a.slug} className={`article-index__item article-index__item--${a.zone}`}>
            <span className="article-index__zone">{ZONE_LABEL[a.zone]}</span>
            <a href={href(`/articles/${a.slug}/`)}>{a.title}</a>
            <p>{a.dek}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
