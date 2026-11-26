import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { VisualFrame } from '../components/VisualFrame';
import { GAMES_DATA } from '../data/gamesData';

interface GamesIndexPageProps {
  onNavigate: (path: string) => void;
}

export function GamesIndexPage({ onNavigate }: GamesIndexPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const categories = ['전체', '해양 계열', '전통·동양 계열', '클래식·기계식', '모험·판타지'];

  const filtered =
    selectedCategory === '전체'
      ? GAMES_DATA
      : GAMES_DATA.filter((g) => g.category === selectedCategory);

  return (
    <div className="bg-[#F5F3EC]">
      <section className="bg-[#09271F] text-[#F4F1E8] py-14 lg:py-20 border-b border-[#C6A45B]/25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Breadcrumb
            items={[
              { name: '홈', path: '/' },
              { name: '게임 백과', path: '/games/' }
            ]}
            onNavigate={onNavigate}
            dark
          />
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-[#C6A45B]">
              GAME ENCYCLOPEDIA INDEX
            </p>
            <h1 className="mt-3 font-editorial text-3xl sm:text-4xl font-semibold text-[#F4F1E8]">
              릴게임 백과사전 (8종)
            </h1>
            <p className="mt-4 text-[15px] sm:text-base leading-[1.75] text-[#B8C0B9]">
              국내 아케이드 릴게임의 대표적 계열로 언급되는 8종을 테마, 릴 구조, 대표 심볼, 역사적 맥락과 법적 주의사항으로 정리했습니다. 확인되지 않은 내부 확률이나 출시 세부는 확정적으로 기술하지 않고 검증 범위만 서술합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#09271F]/15">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="테마 계열별 필터">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#09271F] text-[#E2C98C]'
                        : 'border border-[#09271F]/20 bg-[#FAF8F2] text-[#4B5852] hover:text-[#09271F]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <span className="text-xs text-[#4B5852] tabular-nums">
              총 {filtered.length}개 항목 표시 중
            </span>
          </div>

          {/* Editorial Directory Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((game) => (
              <article
                key={game.slug}
                className="group border border-[#09271F]/15 bg-[#FAF8F2] p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                    <div className="sm:col-span-5">
                      <VisualFrame
                        src={game.image}
                        alt={game.imageAlt}
                        aspectClass="aspect-[4/3]"
                      />
                    </div>
                    <div className="sm:col-span-7">
                      <div className="flex items-center gap-2 text-xs text-[#4B5852]">
                        <span className="font-semibold text-[#103A2D]">{game.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{game.era}</span>
                      </div>
                      <h2 className="mt-2 font-editorial text-2xl font-semibold text-[#09271F]">
                        <a
                          href={`/games/${game.slug}/`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/games/${game.slug}/`);
                          }}
                          className="hover:text-[#103A2D] hover:underline"
                        >
                          {game.name}
                        </a>
                      </h2>
                      <p className="mt-0.5 text-xs text-[#4B5852]">{game.englishName}</p>
                      <p className="mt-3 text-sm leading-relaxed text-[#4B5852]">{game.summary}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#09271F]/12 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-[#4B5852]">테마: {game.theme}</span>
                  <a
                    href={`/games/${game.slug}/`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/games/${game.slug}/`);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#09271F] hover:text-[#103A2D]"
                  >
                    <span>상세 백과 문서 읽기</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Summary Table */}
          <div className="mt-16 pt-12 border-t border-[#09271F]/15">
            <h2 className="font-editorial text-2xl font-semibold text-[#09271F] mb-5">
              8종 계열 요약 대조표
            </h2>
            <div className="overflow-x-auto border border-[#09271F]/15 bg-[#FAF8F2]">
              <table className="w-full min-w-[700px] text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#09271F]/15 bg-[#09271F] text-[#F4F1E8]">
                    <th className="py-3 px-4 font-semibold">게임명</th>
                    <th className="py-3 px-4 font-semibold">분류</th>
                    <th className="py-3 px-4 font-semibold">언급 시기</th>
                    <th className="py-3 px-4 font-semibold">핵심 테마</th>
                    <th className="py-3 px-4 font-semibold">법적 지위</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#09271F]/10">
                  {GAMES_DATA.map((g) => (
                    <tr key={g.slug} className="hover:bg-[#F5F3EC]">
                      <td className="py-3 px-4 font-semibold text-[#09271F]">
                        <a
                          href={`/games/${g.slug}/`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/games/${g.slug}/`);
                          }}
                          className="hover:underline"
                        >
                          {g.name}
                        </a>
                      </td>
                      <td className="py-3 px-4 text-[#4B5852]">{g.category}</td>
                      <td className="py-3 px-4 text-[#4B5852]">{g.era}</td>
                      <td className="py-3 px-4 text-[#4B5852]">{g.theme}</td>
                      <td className="py-3 px-4 text-[#4B5852]">{g.legalStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
