import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { GLOSSARY_TERMS } from '../data/editorialData';

interface GlossaryPageProps {
  onNavigate: (path: string) => void;
}

export function GlossaryPage({ onNavigate }: GlossaryPageProps) {
  const [selectedCat, setSelectedCat] = useState<string>('전체');
  const [query, setQuery] = useState<string>('');

  const categories = ['전체', '기본 구조', '확률·수학', '심볼·규칙', '법률·제도'];

  const filteredTerms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((item) => {
      const catMatch = selectedCat === '전체' || item.category === selectedCat;
      const queryMatch =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.english.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q);
      return catMatch && queryMatch;
    });
  }, [selectedCat, query]);

  return (
    <div className="bg-[#F5F3EC]">
      {/* Header */}
      <section className="bg-[#09271F] text-[#F4F1E8] py-14 border-b border-[#C6A45B]/25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Breadcrumb
            items={[
              { name: '홈', path: '/' },
              { name: '용어 사전', path: '/glossary/' }
            ]}
            onNavigate={onNavigate}
            dark
          />
          <p className="text-xs font-semibold tracking-[0.18em] text-[#C6A45B]">GLOSSARY</p>
          <h1 className="mt-2 font-editorial text-3xl sm:text-4xl font-semibold text-[#F4F1E8]">
            릴게임 핵심 용어 사전
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#B8C0B9] max-w-2xl">
            릴(Reel)과 페이라인 등 기계적 기초 개념부터 RNG·RTP·도박사의 오류 같은 확률 개념, 게임산업법 등급분류 제도까지 필수 용어를 알기 쉽게 정리했습니다.
          </p>
        </div>
      </section>

      {/* Filter & Term List */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#09271F]/15">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="용어 분류 필터">
              {categories.map((cat) => {
                const active = selectedCat === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCat(cat)}
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

            <div className="relative w-full md:w-72">
              <Search
                className="h-4 w-4 text-[#4B5852] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="용어 검색 (예: RNG, 페이라인)"
                aria-label="용어 키워드 검색"
                className="w-full border border-[#09271F]/20 bg-[#FAF8F2] pl-9 pr-3 py-2 text-sm text-[#14221D] placeholder:text-[#4B5852]/70 focus:outline-none focus:border-[#09271F]"
              />
            </div>
          </div>

          {filteredTerms.length > 0 ? (
            <dl className="divide-y divide-[#09271F]/12 border-b border-[#09271F]/15">
              {filteredTerms.map((item) => (
                <div
                  key={item.id}
                  id={item.id}
                  className="py-7 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 scroll-mt-24"
                >
                  <dt className="md:col-span-4">
                    <span className="text-xs font-semibold text-[#103A2D]">{item.category}</span>
                    <h2 className="mt-1 font-editorial text-xl font-semibold text-[#09271F]">
                      {item.term}
                    </h2>
                    <span className="mt-1 block font-mono-tabular text-xs text-[#4B5852]">
                      {item.english}
                    </span>
                  </dt>
                  <dd className="md:col-span-8">
                    <p className="text-[15px] leading-[1.8] text-[#14221D] max-w-prose">
                      {item.definition}
                    </p>
                    {item.caution && (
                      <p className="mt-3 border-l border-[#C6A45B] pl-3 text-xs leading-relaxed text-[#4B5852]">
                        주의: {item.caution}
                      </p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="py-16 text-center text-sm text-[#4B5852]">
              "{query}"에 해당하는 용어가 없습니다. 검색어를 초기화하거나 다른 분류를 선택해 주세요.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
