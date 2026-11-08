import { href } from '../lib/router';
import { articles } from '../data/articles';
import { ARTICLE_GROUPS } from '../data/articleGroups';
import { HOOK } from '../data/hooks';
import { heroSceneSvg } from '../data/figures-data';

// トップ：最初の1画面に、この町ならではの事実（つかみ）と町の絵。説明文から始めない（2026-11-08）
export default function Home() {
  const titleOf = (slug: string) => articles.find((a) => a.slug === slug)?.title ?? '';
  return (
    <>
      <section className="hook">
        <p className="hook__eyebrow">佃島の歴史と文化ガイド　東京都中央区 佃1丁目</p>
        <h1 className="hook__catch">{HOOK.catch}</h1>
        <p className="hook__sub">{HOOK.sub}</p>
        <div className="hook__scene" dangerouslySetInnerHTML={{ __html: heroSceneSvg() }} />
      </section>

      <section className="hook-numbers" aria-label="数字で見る佃島">
        {HOOK.numbers.map((x) => (
          <a key={x.label} className="hook-number" href={href(`/articles/${x.slug}/`)}>
            <span className="hook-number__n">{x.n}<small>{x.unit}</small></span>
            <span className="hook-number__label">{x.label}</span>
          </a>
        ))}
      </section>

      <section className="hook-questions" aria-labelledby="q-title">
        <h2 id="q-title" className="section-title">気になる問いから読む</h2>
        <ul>
          {HOOK.questions.map((x) => (
            <li key={x.q}>
              <a href={href(`/articles/${x.slug}/`)}>
                <span className="hook-q">{x.q}</span>
                <span className="hook-a">{x.a}</span>
                <span className="hook-more">{titleOf(x.slug)} →</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="article-groups" aria-labelledby="articles-title">
        <h2 id="articles-title" className="section-title">記事をぜんぶ見る</h2>
        {ARTICLE_GROUPS.map((g) => (
          <div key={g.title} className="article-group">
            <h3 className="article-group__title">{g.title}</h3>
            <ul className="article-group__list">
              {g.slugs.map((s) => (
                <li key={s}><a href={href(`/articles/${s}/`)}>{titleOf(s)}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
