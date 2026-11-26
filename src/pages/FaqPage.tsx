import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, Phone, Search } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { GENERAL_FAQS } from '../data/editorialData';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

export function FaqPage({ onNavigate }: FaqPageProps) {
  const [selectedCat, setSelectedCat] = useState<string>('전체');
  const [query, setQuery] = useState<string>('');
  const [openId, setOpenId] = useState<string | null>(GENERAL_FAQS[0].id);

  const categories = ['전체', '기본 개념', '작동·확률', '게임별 차이', '법률·규제', '이용자 안전'];

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && GENERAL_FAQS.some((f) => f.id === hash)) {
      setOpenId(hash);
    }
  }, []);

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GENERAL_FAQS.filter((item) => {
      const catMatch = selectedCat === '전체' || item.category === selectedCat;
      const queryMatch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
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
              { name: '자주 묻는 질문 (FAQ)', path: '/faq/' }
            ]}
            onNavigate={onNavigate}
            dark
          />
          <p className="text-xs font-semibold tracking-[0.18em] text-[#C6A45B]">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h1 className="mt-2 font-editorial text-3xl sm:text-4xl font-semibold text-[#F4F1E8]">
            자주 묻는 질문 (FAQ)
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#B8C0B9] max-w-2xl">
            릴게임의 정의와 슬롯머신과의 차이, RNG 난수 원리, 공략법의 진위, 국내 법적 규제 및 사설 사이트 피해 예방법까지 핵심 질문을 문답 형식으로 정리했습니다.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 pb-8 border-b border-[#09271F]/15">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="FAQ 분류 필터">
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

            <div className="relative">
              <Search
                className="h-4 w-4 text-[#4B5852] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="질문이나 키워드를 검색하세요 (예: RNG, 등급분류, 1336)"
                aria-label="FAQ 검색"
                className="w-full border border-[#09271F]/20 bg-[#FAF8F2] pl-9 pr-3 py-2.5 text-sm text-[#14221D] placeholder:text-[#4B5852]/70 focus:outline-none focus:border-[#09271F]"
              />
            </div>
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="divide-y divide-[#09271F]/12 border-b border-[#09271F]/15">
              {filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div key={faq.id} id={faq.id} className="py-1 scroll-mt-24">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenId((prev) => (prev === faq.id ? null : faq.id))}
                      className="flex w-full items-start justify-between gap-4 py-5 text-left hover:text-[#103A2D] transition-colors cursor-pointer"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="mb-1 block text-xs font-medium text-[#103A2D]">
                          {faq.category}
                        </span>
                        <span className="block text-base sm:text-lg font-medium leading-snug text-[#14221D]">
                          {faq.question}
                        </span>
                      </div>
                      <span
                        className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#09271F] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-6 pr-8 text-[15px] leading-[1.8] text-[#4B5852] max-w-prose">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center text-sm text-[#4B5852]">
              "{query}"에 일치하는 질문을 찾지 못했습니다.
            </div>
          )}

          {/* Support Box */}
          <div className="mt-12 border border-[#C6A45B]/35 bg-[#09271F] text-[#F4F1E8] p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#E2C98C]">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-semibold">공적 상담 및 피해 예방 안내</span>
              </div>
              <p className="mt-2 text-sm text-[#B8C0B9]">
                도박 문제 예방 상담(1336) 및 불법 사이트 신고 절차는 이용자 안전정보 페이지에서 자세히 확인할 수 있습니다.
              </p>
            </div>
            <a
              href="/safety/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/safety/');
              }}
              className="inline-flex items-center gap-2 bg-[#C6A45B] px-5 py-2.5 text-xs font-semibold text-[#071A15] hover:bg-[#E2C98C] transition-colors whitespace-nowrap shrink-0"
            >
              <span>이용자 안전정보 보기</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
