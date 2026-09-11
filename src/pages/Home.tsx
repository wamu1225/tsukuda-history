import { href } from '../lib/router';
import { articles } from '../data/articles';
import { CATEGORY_LABEL, type Category } from '../data/types';

const CATEGORY_ORDER: Category[] = ['name-origin', 'history', 'shrine', 'food', 'industry', 'culture', 'spots', 'faq'];

export default function Home() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    list: articles.filter((a) => a.category === cat),
  })).filter((g) => g.list.length > 0);

  return (
    <>
      <section className="hero">
        <p className="hero__eyebrow">東京都中央区 佃1丁目</p>
        <h1 className="hero__title">佃島の歴史と文化</h1>
        <p className="hero__lead">
          江戸初期に摂津の漁民が埋め立てた小さな島は、佃煮の発祥地となり、近代には造船の町となり、今は超高層タワーが立つ街へと姿を変えた。地名の由来から、住吉神社、佃煮の老舗、そして新旧の街並みが接する境界線まで、佃1丁目の歴史と文化を一次資料にもとづいてまとめている。
        </p>
      </section>

      <section className="article-groups" aria-labelledby="articles-title">
        <h2 id="articles-title" className="section-title">
          分野から読む
        </h2>
        {grouped.map(({ category, list }) => (
          <div key={category} className={`article-group article-group--${category}`}>
            <h3 className="article-group__title">{CATEGORY_LABEL[category]}</h3>
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
