import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { VisualFrame } from '../components/VisualFrame';
import { ARTICLES_DATA } from '../data/editorialData';

interface ArticlesPageProps {
  slug?: string;
  onNavigate: (path: string) => void;
}

export function ArticlesPage({ slug, onNavigate }: ArticlesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const categories = ['전체', '기초 지식', '작동 원리', '비교 분석', '법률·규제', '이용자 안전', '역사 아카이브'];

  const currentArticle = useMemo(
    () => (slug ? ARTICLES_DATA.find((a) => a.slug === slug) : undefined),
    [slug]
  );

  // Single Article Detail View
  if (slug && currentArticle) {
    const related = ARTICLES_DATA.filter((a) => a.slug !== currentArticle.slug).slice(0, 3);

    return (
      <div className="bg-[#F5F3EC]">
        <section className="bg-[#09271F] text-[#F4F1E8] py-12 lg:py-16 border-b border-[#C6A45B]/25">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
            <Breadcrumb
              items={[
                { name: '홈', path: '/' },
                { name: '아티클', path: '/articles/' },
                { name: currentArticle.title, path: `/articles/${currentArticle.slug}/` }
              ]}
              onNavigate={onNavigate}
              dark
            />

            <div className="flex flex-wrap items-center gap-2 text-xs text-[#C6A45B]">
              <span className="font-semibold">{currentArticle.category}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={currentArticle.publishedAt} className="tabular-nums text-[#B8C0B9]">
                {currentArticle.publishedAt}
              </time>
              <span aria-hidden="true">·</span>
              <span className="text-[#B8C0B9]">{currentArticle.readTime}</span>
            </div>

            <h1 className="mt-3 font-editorial text-2xl sm:text-4xl font-semibold leading-tight text-[#F4F1E8]">
              {currentArticle.title}
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-[#B8C0B9]">
              {currentArticle.excerpt}
            </p>
          </div>
        </section>

        <article className="py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
            <VisualFrame
              src={currentArticle.image}
              alt={currentArticle.imageAlt}
              caption={currentArticle.imageCaption}
              aspectClass="aspect-[16/10]"
              eager
            />

            {/* Lead Summary Answer */}
            <div className="mt-10 border border-[#09271F]/15 bg-[#FAF8F2] p-6 sm:p-7">
              <p className="text-xs font-semibold tracking-wider text-[#103A2D]">핵심 요약</p>
              <p className="mt-2 text-base font-medium leading-[1.8] text-[#14221D] max-w-prose">
                {currentArticle.leadAnswer}
              </p>
            </div>

            {/* Article Sections */}
            <div className="mt-10 space-y-10 max-w-prose">
              {currentArticle.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-[#09271F]">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((p) => (
                      <p key={p} className="text-[15px] leading-[1.85] text-[#14221D]">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Sources */}
            <div className="mt-12 pt-8 border-t border-[#09271F]/15 max-w-prose">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#103A2D]">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span>참조 및 근거 기준</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-[#4B5852]">
                {currentArticle.sources.map((src) => (
                  <li key={src}>· {src}</li>
                ))}
              </ul>
            </div>

            {/* Back to List + Related */}
            <div className="mt-12 pt-10 border-t border-[#09271F]/15">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-editorial text-xl font-semibold text-[#09271F]">
                  함께 읽을 만한 아티클
                </h2>
                <a
                  href="/articles/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/articles/');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#09271F] hover:underline"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>목록으로</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((item) => (
                  <a
                    key={item.slug}
                    href={`/articles/${item.slug}/`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/articles/${item.slug}/`);
                    }}
                    className="group border border-[#09271F]/15 bg-[#FAF8F2] p-5 hover:border-[#09271F] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-semibold text-[#103A2D]">
                        {item.category}
                      </span>
                      <h3 className="mt-1.5 font-editorial text-base font-semibold leading-snug text-[#09271F] group-hover:underline">
                        {item.title}
                      </h3>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#09271F]">
                      <span>읽기</span>
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // Articles Index View
  const filteredArticles =
    selectedCategory === '전체'
      ? ARTICLES_DATA
      : ARTICLES_DATA.filter((a) => a.category === selectedCategory);

  return (
    <div className="bg-[#F5F3EC]">
      <section className="bg-[#09271F] text-[#F4F1E8] py-14 border-b border-[#C6A45B]/25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Breadcrumb
            items={[
              { name: '홈', path: '/' },
              { name: '아티클', path: '/articles/' }
            ]}
            onNavigate={onNavigate}
            dark
          />
          <p className="text-xs font-semibold tracking-[0.18em] text-[#C6A45B]">
            EDITORIAL DISPATCHES
          </p>
          <h1 className="mt-2 font-editorial text-3xl sm:text-4xl font-semibold text-[#F4F1E8]">
            릴게임매거진 심층 정보 아티클
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#B8C0B9] max-w-2xl">
            릴게임의 작동 원리, 국내 아케이드 역사, 게임산업법 해설, 불법 사이트 피해 예방 수칙을 주제별 심층 리포트로 제공합니다.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 pb-8 border-b border-[#09271F]/15" role="tablist" aria-label="아티클 주제 필터">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#09271F] text-[#F4F1E8]'
                      : 'border border-[#09271F]/20 bg-[#FAF8F2] text-[#4B5852] hover:text-[#09271F]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <article key={art.slug} className="group border border-[#09271F]/15 bg-[#FAF8F2] flex flex-col justify-between">
                <a
                  href={`/articles/${art.slug}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/articles/${art.slug}/`);
                  }}
                  className="block p-5 flex-1"
                >
                  <VisualFrame src={art.image} alt={art.imageAlt} aspectClass="aspect-[4/3]" />
                  <div className="mt-4 flex items-center gap-2 text-xs text-[#4B5852]">
                    <span className="font-semibold text-[#103A2D]">{art.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={art.publishedAt} className="tabular-nums">
                      {art.publishedAt}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h2 className="mt-2 font-editorial text-xl font-semibold leading-snug text-[#09271F] group-hover:underline">
                    {art.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#4B5852] line-clamp-3">
                    {art.excerpt}
                  </p>
                </a>
                <div className="px-5 pb-5 pt-3 border-t border-[#09271F]/10 flex items-center justify-between text-xs font-semibold text-[#09271F]">
                  <span>전문 보기</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
