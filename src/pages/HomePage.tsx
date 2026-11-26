import { useState } from 'react';
import { ArrowRight, ArrowUp, BookOpen, Phone, Scale, ShieldAlert } from 'lucide-react';
import { VisualFrame } from '../components/VisualFrame';
import { Accordion } from '../components/Accordion';
import { GAMES_DATA } from '../data/gamesData';
import {
  ARTICLES_DATA,
  COMPARISON_TABLE,
  EDITORIAL_DOMAINS,
  GENERAL_FAQS,
  HISTORY_TIMELINE
} from '../data/editorialData';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const categories = ['전체', '해양 계열', '전통·동양 계열', '클래식·기계식', '모험·판타지'];

  const filteredGames =
    selectedCategory === '전체'
      ? GAMES_DATA
      : GAMES_DATA.filter((g) => g.category === selectedCategory);

  const leadArticle = ARTICLES_DATA[0];
  const secondaryArticles = ARTICLES_DATA.slice(1, 3);
  const archiveArticles = ARTICLES_DATA.slice(3, 6);

  const homeFaqs = GENERAL_FAQS.slice(0, 7);

  return (
    <div>
      {/* SECTION 01 — EDITORIAL HERO */}
      <section className="bg-[#09271F] text-[#F4F1E8] border-b border-[#C6A45B]/25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium tracking-[0.2em] text-[#C6A45B]">
                  REEL GAME INFORMATION MAGAZINE
                </p>
                <h1 className="mt-5 font-editorial text-3xl sm:text-4xl lg:text-[2.85rem] font-semibold leading-[1.22] text-[#F4F1E8]">
                  릴게임의 모든 정보,
                  <br />
                  정확하고 깊이 있게 살펴보다.
                </h1>
                <p className="mt-6 text-[15px] sm:text-base leading-[1.75] text-[#B8C0B9] max-w-xl">
                  릴게임의 기본 개념과 난수(RNG) 작동 원리부터 바다이야기·야마토 등 8종 게임 백과, 한국 게임장 역사와 관련 법령·이용자 안전 정보까지 중립적으로 정리한 전문 아카이브 매거진입니다.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-[#C6A45B]/20">
                <div>
                  <a
                    href="https://reelkings.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 border-2 border-[#E2C98C] bg-[#14533C] px-10 py-5 text-2xl sm:text-3xl font-extrabold tracking-tight text-white shadow-lg hover:bg-[#19664A] transition-colors whitespace-nowrap"
                  >
                    <span>릴게임바로가기</span>
                    <ArrowUp className="h-7 w-7 text-white" aria-hidden="true" />
                  </a>
                </div>
                <p className="mt-4 text-xs text-[#B8C0B9]">
                  비영리 정보 제공 목적 · 게임 접속 유도 및 사행 행위 홍보 없음
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center">
              <VisualFrame
                src="/src/assets/images/hero_reel_archive_1795676703367.jpg"
                alt="황동 기어와 번호가 새겨진 빈티지 기계식 릴 드럼 전시 아카이브 사진"
                caption="Fig. 01 — 아카이브 전시용 기계식 릴 드럼 구조 참조 이미지. 본 매거진은 실제 특정 게임 화면을 임의로 재현하지 않습니다."
                aspectClass="aspect-[16/10] lg:h-full lg:min-h-[380px]"
                eager
                darkSurface
                className="h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 — EDITORIAL INTRODUCTION */}
      <section className="bg-[#F5F3EC] py-16 lg:py-24 border-b border-[#09271F]/12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#103A2D]">
                EDITORIAL SCOPE
              </p>
              <h2 className="mt-3 font-editorial text-2xl sm:text-3xl font-semibold leading-snug text-[#09271F]">
                홍보가 아닌,
                <br />
                검증된 지식의 아카이브
              </h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-[#4B5852]">
                온라인에 퍼진 출처 불명의 광고와 과장된 공략법 대신, 게임의 구조·역사·법령·보호 기준을 여섯 개의 전문 영역으로 나누어 체계적으로 기록합니다.
              </p>
              <div className="mt-6 pt-6 border-t border-[#09271F]/15 text-xs leading-relaxed text-[#4B5852]">
                확인되지 않은 내부 확률이나 출시 연도는 추정해 서술하지 않으며, 공신력 있는 법령과 공공기관 자료를 우선 기준으로 삼습니다.
              </div>
            </div>

            <div className="lg:col-span-8 divide-y divide-[#09271F]/12 border-t border-b border-[#09271F]/15">
              {EDITORIAL_DOMAINS.map((domain) => (
                <a
                  key={domain.index}
                  href={domain.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(domain.href);
                  }}
                  className="group grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 py-6 items-baseline hover:bg-[#FAF8F2] px-3 -mx-3 transition-colors"
                >
                  <div className="sm:col-span-1 font-mono-tabular text-sm font-medium text-[#C6A45B]">
                    {domain.index}
                  </div>
                  <div className="sm:col-span-4">
                    <h3 className="font-editorial text-lg font-semibold text-[#09271F] group-hover:text-[#103A2D]">
                      {domain.title}
                    </h3>
                    <span className="mt-0.5 block text-xs text-[#4B5852]">{domain.subtitle}</span>
                  </div>
                  <div className="sm:col-span-6 text-sm leading-relaxed text-[#4B5852]">
                    {domain.description}
                  </div>
                  <div className="sm:col-span-1 flex sm:justify-end items-center text-[#09271F] group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — FEATURED KNOWLEDGE */}
      <section className="bg-[#FAF8F2] py-16 lg:py-24 border-b border-[#09271F]/12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#09271F]/15">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#103A2D]">
                FEATURED KNOWLEDGE
              </p>
              <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-semibold text-[#09271F]">
                릴게임 핵심 구조 리포트
              </h2>
            </div>
            <a
              href="/guide/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/guide/');
              }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#09271F] hover:text-[#103A2D] hover:underline whitespace-nowrap"
            >
              <span>전체 가이드 읽기</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Lead Featured Story + 4 Asymmetric Knowledge Blocks */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <article className="lg:col-span-7 group">
              <a
                href="/articles/what-is-reel-game/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/articles/what-is-reel-game/');
                }}
                className="block"
              >
                <VisualFrame
                  src="/src/assets/images/mechanism_diagram_art_1795676704532.jpg"
                  alt="릴 드럼의 회전 단면과 페이라인 기하학을 묘사한 에디토리얼 기술 도판"
                  caption="Fig. 02 — 릴 회전 단면과 유효선(페이라인) 배열의 개념적 도해"
                  aspectClass="aspect-[4/3]"
                />
                <div className="mt-5">
                  <div className="flex items-center gap-2 text-xs text-[#4B5852]">
                    <span className="font-semibold text-[#103A2D]">기초 구조</span>
                    <span aria-hidden="true">·</span>
                    <span>핵심 해설</span>
                    <span aria-hidden="true">·</span>
                    <span>5분 읽기</span>
                  </div>
                  <h3 className="mt-2.5 font-editorial text-2xl sm:text-3xl font-semibold leading-snug text-[#09271F] group-hover:text-[#103A2D] transition-colors">
                    릴게임이란 무엇인가? 회전 드럼에서 디지털 난수(RNG)까지
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.75] text-[#4B5852] max-w-2xl">
                    릴(Reel)과 심볼, 페이라인의 기본 문법부터 현대 디지털 기기의 난수 결정 메커니즘까지, 릴게임의 본질적 작동 원리를 한눈에 정리했습니다.
                  </p>
                </div>
              </a>
            </article>

            <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-[#09271F]/12 border-t border-b border-[#09271F]/15">
              {[
                {
                  kicker: '확률 원리',
                  title: 'RNG와 "도박사의 오류" 바로잡기',
                  desc: '버튼 입력 순간 무작위 숫자가 결정되는 독립 시행 구조와, 연타·타이밍 공략법이 허구인 수학적 이유를 설명합니다.',
                  path: '/articles/rng-and-gamblers-fallacy/'
                },
                {
                  kicker: '비교 분석',
                  title: '슬롯머신·파치슬로·한국 릴게임의 차이',
                  desc: '세 게임의 기원과 수동/자동 조작 방식, 화면 연출 비중 및 국내법상 허가 범위를 대조합니다.',
                  path: '/articles/reel-vs-slot-vs-pachislot/'
                },
                {
                  kicker: '역사 맥락',
                  title: '2000년대 한국 아케이드와 제도 변화',
                  desc: '과일 슬롯에서 화면형 릴게임으로의 전환과 2006년 경품용 상품권 폐지 과정을 살펴봅니다.',
                  path: '/history/'
                },
                {
                  kicker: '법률 기준',
                  title: '게임산업법상 사행성 기준과 등급분류',
                  desc: '게임물관리위원회의 심의 기준과 환전 행위 금지 조항을 법령 원문 기준으로 안내합니다.',
                  path: '/regulation/'
                }
              ].map((block) => (
                <a
                  key={block.path}
                  href={block.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(block.path);
                  }}
                  className="group py-5 block hover:bg-[#F5F3EC] px-3 -mx-3 transition-colors"
                >
                  <span className="text-xs font-semibold text-[#103A2D]">{block.kicker}</span>
                  <h4 className="mt-1.5 font-editorial text-lg font-semibold text-[#09271F] group-hover:underline">
                    {block.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4B5852]">{block.desc}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Comparison Table Preview */}
          <div className="mt-14 pt-10 border-t border-[#09271F]/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <h3 className="font-editorial text-xl font-semibold text-[#09271F]">
                한눈에 비교하는 릴게임 · 슬롯머신 · 파치슬로
              </h3>
              <span className="text-xs text-[#4B5852]">구조 및 국내 법적 지위 대조</span>
            </div>
            <div className="overflow-x-auto border border-[#09271F]/15 bg-[#F5F3EC]">
              <table className="w-full min-w-[680px] text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#09271F]/15 bg-[#09271F] text-[#F4F1E8]">
                    <th className="py-3.5 px-4 font-semibold w-36">구분 기준</th>
                    <th className="py-3.5 px-4 font-semibold">국내 릴게임 계열</th>
                    <th className="py-3.5 px-4 font-semibold">카지노 슬롯머신</th>
                    <th className="py-3.5 px-4 font-semibold">일본 파치슬로</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#09271F]/10 text-[#14221D]">
                  {COMPARISON_TABLE.map((row) => (
                    <tr key={row.criterion} className="hover:bg-[#FAF8F2]">
                      <th scope="row" className="py-3.5 px-4 font-semibold text-[#09271F] align-top">
                        {row.criterion}
                      </th>
                      <td className="py-3.5 px-4 text-[#4B5852] leading-relaxed align-top">
                        {row.reelGame}
                      </td>
                      <td className="py-3.5 px-4 text-[#4B5852] leading-relaxed align-top">
                        {row.slotMachine}
                      </td>
                      <td className="py-3.5 px-4 text-[#4B5852] leading-relaxed align-top">
                        {row.pachislot}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 — GAME ENCYCLOPEDIA */}
      <section className="bg-[#09271F] text-[#F4F1E8] py-16 lg:py-24 border-b border-[#C6A45B]/25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#C6A45B]/20">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#C6A45B]">
                GAME ENCYCLOPEDIA
              </p>
              <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-semibold text-[#F4F1E8]">
                게임별 정보 백과 (8종)
              </h2>
              <p className="mt-2 text-sm text-[#B8C0B9] max-w-2xl">
                국내 아케이드 및 문헌에서 주로 언급되는 8종의 릴게임 계열을 테마, 구조, 심볼, 법적 주의사항으로 나누어 독립 문서로 정리했습니다.
              </p>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="게임 계열 필터">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[#C6A45B] text-[#071A15]'
                        : 'border border-[#C6A45B]/30 bg-[#071A15] text-[#B8C0B9] hover:text-[#F4F1E8]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGames.map((game, idx) => (
              <a
                key={game.slug}
                href={`/games/${game.slug}/`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/games/${game.slug}/`);
                }}
                className="group flex flex-col justify-between border border-[#C6A45B]/25 bg-[#071A15] p-5 hover:border-[#E2C98C] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#C6A45B]">
                    <span className="font-mono-tabular">
                      NO. {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{game.category}</span>
                  </div>
                  <h3 className="mt-3 font-editorial text-xl font-semibold text-[#F4F1E8] group-hover:text-[#E2C98C] transition-colors">
                    {game.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#B8C0B9]">
                    {game.englishName} · {game.era}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#B8C0B9] line-clamp-3">
                    {game.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#C6A45B]/15 flex items-center justify-between text-xs font-medium text-[#E2C98C]">
                  <span>상세 백과 보기</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <a
              href="/games/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/games/');
              }}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#E2C98C] hover:underline"
            >
              <span>게임 백과 전체 비교 및 색인 보기</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 05 — HISTORY CHRONICLE */}
      <section className="bg-[#F5F3EC] py-16 lg:py-24 border-b border-[#09271F]/12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#103A2D]">
                HISTORY CHRONICLE
              </p>
              <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-semibold text-[#09271F]">
                한국 릴게임의 역사와
                <br />
                제도 변화 연대기
              </h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-[#4B5852]">
                초기 기계식 슬롯의 유입부터 화면형 아케이드의 확산, 2006년 사회적 논란과 「게임산업진흥에 관한 법률」 제정에 이르는 주요 흐름을 확인 가능한 기록을 중심으로 정리했습니다.
              </p>

              <div className="mt-6">
                <VisualFrame
                  src="/src/assets/images/arcade_history_archive_1795676704080.jpg"
                  alt="과거 오락실 복도와 아케이드 기기들을 보여주는 다큐멘터리 스타일 아카이브 사진"
                  caption="Fig. 03 — 아케이드 게임장 시대의 공간적 분위기를 담은 아카이브 사진"
                  aspectClass="aspect-[16/10]"
                />
              </div>

              <a
                href="/history/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/history/');
                }}
                className="mt-6 inline-flex items-center gap-2 border border-[#09271F] px-5 py-2.5 text-sm font-medium text-[#09271F] hover:bg-[#09271F] hover:text-[#F4F1E8] transition-colors"
              >
                <span>전체 역사 연대기 보기</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="lg:col-span-7">
              <ol className="divide-y divide-[#09271F]/12 border-t border-b border-[#09271F]/15">
                {HISTORY_TIMELINE.map((item) => (
                  <li key={item.period} className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6">
                    <div className="sm:col-span-4">
                      <span className="font-mono-tabular text-sm font-semibold text-[#103A2D]">
                        {item.period}
                      </span>
                      <p className="mt-1 text-xs text-[#4B5852]">{item.sourceNote}</p>
                    </div>
                    <div className="sm:col-span-8">
                      <h3 className="font-editorial text-lg font-semibold text-[#09271F]">
                        {item.eraTitle}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#4B5852]">{item.summary}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06 — LAW & SAFETY */}
      <section className="bg-[#103A2D] text-[#F4F1E8] py-16 lg:py-24 border-b border-[#C6A45B]/25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <VisualFrame
                src="/src/assets/images/law_safety_editorial_1795676705013.jpg"
                alt="법률과 규제의 균형을 상징하는 황동 저울과 법전 정물 사진"
                caption="Fig. 04 — 게임산업법과 이용자 보호 원칙을 상징하는 에디토리얼 정물"
                aspectClass="aspect-[4/3]"
                darkSurface
              />

              <div className="mt-6 border border-[#C6A45B]/35 bg-[#071A15] p-6">
                <div className="flex items-center gap-2 text-[#E2C98C]">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <h3 className="font-sans text-sm font-semibold">공식 도움 및 피해 상담 창구</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#B8C0B9]">
                  사행성 게임 이용 문제로 도움이 필요하거나 불법 사이트 금전 피해를 입었다면 즉시 공적 기관의 도움을 받으시기 바랍니다.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-[#C6A45B]/20 text-xs">
                  <div>
                    <span className="block text-[#B8C0B9]">도박문제 전문 상담</span>
                    <a
                      href="tel:1336"
                      className="mt-1 inline-block font-mono-tabular text-lg font-bold text-[#E2C98C] hover:underline"
                    >
                      1336
                    </a>
                    <span className="block text-[#B8C0B9]/80">한국도박문제예방치유원</span>
                  </div>
                  <div>
                    <span className="block text-[#B8C0B9]">사이버 범죄·사기 신고</span>
                    <a
                      href="tel:182"
                      className="mt-1 inline-block font-mono-tabular text-lg font-bold text-[#E2C98C] hover:underline"
                    >
                      182
                    </a>
                    <span className="block text-[#B8C0B9]/80">경찰청 사이버수사국</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#E2C98C]">
                LAW &amp; USER PROTECTION
              </p>
              <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-semibold text-[#F4F1E8]">
                국내 게임 법률 규제와 이용자 보호 원칙
              </h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-[#B8C0B9]">
                본 매거진은 관련 법령과 공공기관 안내를 토대로 정확한 제도 기준을 전달합니다. 구체적인 법적 분쟁이나 법률 해석이 필요한 사안은 법률 전문가의 검토를 받으셔야 합니다.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border border-[#C6A45B]/25 bg-[#09271F] p-6">
                  <Scale className="h-5 w-5 text-[#C6A45B]" aria-hidden="true" />
                  <h3 className="mt-3 font-editorial text-lg font-semibold text-[#F4F1E8]">
                    게임산업법 및 등급분류
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#B8C0B9]">
                    모든 유통 게임물은 게임물관리위원회의 등급분류를 받아야 하며, 우연적 방법으로 재산상 이익·손실을 주는 사행성 게임물은 유통이 금지됩니다.
                  </p>
                  <a
                    href="/regulation/"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/regulation/');
                    }}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#E2C98C] hover:underline"
                  >
                    <span>법률·규제 상세 보기</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>

                <div className="border border-[#C6A45B]/25 bg-[#09271F] p-6">
                  <ShieldAlert className="h-5 w-5 text-[#C6A45B]" aria-hidden="true" />
                  <h3 className="mt-3 font-editorial text-lg font-semibold text-[#F4F1E8]">
                    환전 금지 및 불법 사이트 경계
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#B8C0B9]">
                    점수·경품의 현금 환전 및 알선은 불법이며, 온라인에서 현금 충전을 유도하는 릴게임 사이트는 악성코드·금융 사기 위험이 매우 높습니다.
                  </p>
                  <a
                    href="/safety/"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/safety/');
                    }}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#E2C98C] hover:underline"
                  >
                    <span>피해 예방 가이드 보기</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07 — POPULAR ARTICLES (3-Tier Editorial Layout) */}
      <section className="bg-[#F5F3EC] py-16 lg:py-24 border-b border-[#09271F]/12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#09271F]/15">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#103A2D]">
                EDITORIAL DISPATCHES
              </p>
              <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-semibold text-[#09271F]">
                주요 정보 아티클
              </h2>
            </div>
            <a
              href="/articles/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/articles/');
              }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#09271F] hover:underline whitespace-nowrap"
            >
              <span>전체 아티클 보기</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Tier 1: Lead Story */}
            <article className="lg:col-span-5 group">
              <a
                href={`/articles/${leadArticle.slug}/`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/articles/${leadArticle.slug}/`);
                }}
                className="block"
              >
                <VisualFrame
                  src={leadArticle.image}
                  alt={leadArticle.imageAlt}
                  aspectClass="aspect-[4/3]"
                />
                <div className="mt-4 flex items-center gap-2 text-xs text-[#4B5852]">
                  <span className="font-semibold text-[#103A2D]">{leadArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={leadArticle.publishedAt} className="tabular-nums">
                    {leadArticle.publishedAt}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{leadArticle.readTime}</span>
                </div>
                <h3 className="mt-2 font-editorial text-xl sm:text-2xl font-semibold text-[#09271F] group-hover:text-[#103A2D] transition-colors">
                  {leadArticle.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#4B5852]">
                  {leadArticle.excerpt}
                </p>
              </a>
            </article>

            {/* Tier 2: Secondary Features */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {secondaryArticles.map((art) => (
                <article
                  key={art.slug}
                  className="group border-b border-[#09271F]/12 pb-6 last:border-b-0 last:pb-0"
                >
                  <a
                    href={`/articles/${art.slug}/`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/articles/${art.slug}/`);
                    }}
                    className="grid grid-cols-12 gap-4 items-start"
                  >
                    <div className="col-span-4">
                      <VisualFrame
                        src={art.image}
                        alt={art.imageAlt}
                        aspectClass="aspect-[4/3]"
                      />
                    </div>
                    <div className="col-span-8">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#4B5852]">
                        <span className="font-semibold text-[#103A2D]">{art.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h3 className="mt-1 font-editorial text-base font-semibold leading-snug text-[#09271F] group-hover:underline">
                        {art.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-[#4B5852] line-clamp-2">{art.excerpt}</p>
                    </div>
                  </a>
                </article>
              ))}
            </div>

            {/* Tier 3: Archive Index List */}
            <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-[#09271F]/15 pt-6 lg:pt-0 lg:pl-7">
              <h3 className="font-sans text-xs font-semibold tracking-wider text-[#103A2D] mb-4 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                <span>아카이브 리포트</span>
              </h3>
              <ul className="divide-y divide-[#09271F]/10">
                {archiveArticles.map((art) => (
                  <li key={art.slug} className="py-4 first:pt-0">
                    <a
                      href={`/articles/${art.slug}/`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/articles/${art.slug}/`);
                      }}
                      className="group block"
                    >
                      <div className="flex items-center gap-1.5 text-[11px] text-[#4B5852]">
                        <span className="font-medium text-[#103A2D]">{art.category}</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={art.publishedAt} className="tabular-nums">
                          {art.publishedAt}
                        </time>
                      </div>
                      <h4 className="mt-1 font-editorial text-sm font-semibold leading-snug text-[#09271F] group-hover:underline">
                        {art.title}
                      </h4>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 08 — FAQ ACCORDION */}
      <section className="bg-[#FAF8F2] py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#103A2D]">
                FREQUENTLY ASKED QUESTIONS
              </p>
              <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-semibold text-[#09271F]">
                자주 묻는 질문
              </h2>
            </div>
            <a
              href="/faq/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/faq/');
              }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#09271F] hover:underline whitespace-nowrap"
            >
              <span>전체 FAQ 보기</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <Accordion items={homeFaqs} defaultOpenIndex={0} />
        </div>
      </section>
    </div>
  );
}
