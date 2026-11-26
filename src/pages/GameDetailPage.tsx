import { AlertTriangle, ArrowRight, Phone, ShieldCheck } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { VisualFrame } from '../components/VisualFrame';
import { Accordion } from '../components/Accordion';
import { GAMES_DATA, getGameBySlug } from '../data/gamesData';

interface GameDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export function GameDetailPage({ slug, onNavigate }: GameDetailPageProps) {
  const game = getGameBySlug(slug);

  if (!game) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-editorial text-2xl font-semibold text-[#09271F]">
          요청하신 게임 백과 항목을 찾을 수 없습니다.
        </h1>
        <a
          href="/games/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/games/');
          }}
          className="mt-6 inline-flex items-center gap-2 bg-[#09271F] px-5 py-2.5 text-sm font-medium text-[#F4F1E8]"
        >
          게임 백과 전체 목록으로 이동
        </a>
      </div>
    );
  }

  const relatedGames = game.relatedSlugs
    .map((s) => GAMES_DATA.find((item) => item.slug === s))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="bg-[#F5F3EC]">
      {/* ① 게임 소개 (Hero & Accession Metadata) */}
      <section className="bg-[#09271F] text-[#F4F1E8] py-12 lg:py-16 border-b border-[#C6A45B]/25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Breadcrumb
            items={[
              { name: '홈', path: '/' },
              { name: '게임 백과', path: '/games/' },
              { name: game.name, path: `/games/${game.slug}/` }
            ]}
            onNavigate={onNavigate}
            dark
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6">
              <VisualFrame
                src={game.image}
                alt={game.imageAlt}
                caption={game.imageCaption}
                aspectClass="aspect-[4/3]"
                eager
                darkSurface
              />
            </div>

            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 text-xs text-[#E2C98C]">
                <span className="font-semibold">{game.category}</span>
                <span aria-hidden="true">·</span>
                <span>{game.era}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={game.updatedAt} className="tabular-nums">
                  최종 검토 {game.updatedAt}
                </time>
              </div>

              <h1 className="mt-3 font-editorial text-3xl sm:text-4xl font-semibold text-[#F4F1E8]">
                {game.name} 릴게임 정보
              </h1>
              <p className="mt-1.5 text-xs text-[#B8C0B9]">
                영문 표기 및 별칭: {game.aliases.join(' · ')}
              </p>
              <p className="mt-5 text-[15px] leading-[1.75] text-[#F4F1E8]/90">{game.summary}</p>

              <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="border border-[#C6A45B]/25 bg-[#071A15] p-3.5">
                  <dt className="text-[#C6A45B]">테마 분류</dt>
                  <dd className="mt-1 text-sm text-[#F4F1E8]">{game.theme}</dd>
                </div>
                <div className="border border-[#C6A45B]/25 bg-[#071A15] p-3.5">
                  <dt className="text-[#C6A45B]">릴 구조 개요</dt>
                  <dd className="mt-1 text-sm text-[#F4F1E8]">{game.reelStructure}</dd>
                </div>
                <div className="border border-[#C6A45B]/25 bg-[#071A15] p-3.5 sm:col-span-2">
                  <dt className="text-[#C6A45B]">법적 지위 및 안내</dt>
                  <dd className="mt-1 text-sm text-[#F4F1E8]">{game.legalStatus}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Main Overview & Aside Safety Check */}
      <section className="py-12 lg:py-16 border-b border-[#09271F]/12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-5 max-w-prose">
            <h2 className="font-editorial text-2xl font-semibold text-[#09271F]">
              기본 개념과 개요
            </h2>
            {game.overviewParagraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-[15px] leading-[1.8] text-[#4B5852]">
                {p}
              </p>
            ))}
            <p className="text-xs text-[#4B5852] pt-2 border-t border-[#09271F]/12">
              시기 참고: {game.eraNote}
            </p>
          </div>

          <aside className="lg:col-span-4 border border-[#09271F]/15 bg-[#FAF8F2] p-6">
            <div className="flex items-center gap-2 text-[#103A2D]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <h3 className="font-sans text-xs font-semibold tracking-wider">정보 검증 안내</h3>
            </div>
            <ul className="mt-4 space-y-3 text-xs leading-relaxed text-[#4B5852]">
              <li>· 본 문서는 게임 구조·역사·법률을 정리한 정보 자료이며 이용을 권하지 않습니다.</li>
              <li>· 확인되지 않은 내부 배당 확률이나 사설 버전 규칙은 사실처럼 단정하지 않습니다.</li>
              <li>· 도박 문제 예방 및 무료 상담이 필요하면 1336으로 연락할 수 있습니다.</li>
            </ul>
            <a
              href="tel:1336"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[#09271F] px-4 py-2.5 text-xs font-semibold text-[#E2C98C] hover:bg-[#103A2D] transition-colors"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>상담전화 1336 연결</span>
            </a>
          </aside>
        </div>
      </section>

      {/* ② 게임의 특징 */}
      <section className="bg-[#FAF8F2] py-12 lg:py-16 border-b border-[#09271F]/12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#103A2D]">CHARACTERISTICS</p>
          <h2 className="mt-2 font-editorial text-2xl font-semibold text-[#09271F]">
            {game.name}의 주요 특징
          </h2>
          <dl className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {game.characteristics.map((item) => (
              <div
                key={item.label}
                className="border border-[#09271F]/12 bg-[#F5F3EC] p-5"
              >
                <dt className="text-xs font-semibold text-[#103A2D]">{item.label}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#14221D]">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ③ 작동 방식 */}
      <section className="py-12 lg:py-16 border-b border-[#09271F]/12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#103A2D]">HOW IT WORKS</p>
          <h2 className="mt-2 font-editorial text-2xl font-semibold text-[#09271F]">
            일반적인 작동 원리
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {game.operationPrinciples.map((op) => (
              <div key={op.step} className="border border-[#09271F]/15 bg-[#FAF8F2] p-6">
                <span className="font-mono-tabular text-sm font-semibold text-[#C6A45B]">
                  STEP {op.step}
                </span>
                <h3 className="mt-2 font-editorial text-lg font-semibold text-[#09271F]">
                  {op.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#4B5852]">{op.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 border border-[#09271F]/15 bg-[#EFECE2] px-5 py-4 text-xs leading-relaxed text-[#4B5852]">
            검증 유의사항: {game.operationCaveat}
          </p>
        </div>
      </section>

      {/* ④ 심볼 및 용어 설명 */}
      <section className="bg-[#FAF8F2] py-12 lg:py-16 border-b border-[#09271F]/12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#103A2D]">SYMBOLS &amp; MOTIFS</p>
          <h2 className="mt-2 font-editorial text-2xl font-semibold text-[#09271F]">
            주요 심볼 및 상징 설명
          </h2>

          <div className="mt-8 overflow-x-auto border border-[#09271F]/15 bg-[#F5F3EC]">
            <table className="w-full min-w-[600px] text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#09271F]/15 bg-[#09271F] text-[#F4F1E8]">
                  <th className="py-3 px-5 font-semibold w-44">심볼 / 모티프</th>
                  <th className="py-3 px-5 font-semibold w-48">일반적 역할</th>
                  <th className="py-3 px-5 font-semibold">설명 및 참고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#09271F]/10">
                {game.symbols.map((sym) => (
                  <tr key={sym.name}>
                    <th scope="row" className="py-4 px-5 font-semibold text-[#09271F] align-top">
                      {sym.name}
                    </th>
                    <td className="py-4 px-5 text-[#103A2D] font-medium align-top">{sym.role}</td>
                    <td className="py-4 px-5 text-[#4B5852] leading-relaxed align-top">
                      {sym.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-[#4B5852]">{game.symbolCaveat}</p>
        </div>
      </section>

      {/* ⑤ 관련 역사 및 배경 + ⑥ 법률 및 이용 주의사항 */}
      <section className="py-12 lg:py-16 border-b border-[#09271F]/12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-[0.18em] text-[#103A2D]">
              HISTORICAL CONTEXT
            </p>
            <h2 className="mt-2 font-editorial text-2xl font-semibold text-[#09271F]">
              시대적 배경과 게임 문화 맥락
            </h2>
            <ol className="mt-6 space-y-5">
              {game.historicalContext.map((ctx, i) => (
                <li key={ctx.slice(0, 20)} className="flex gap-3.5">
                  <span className="font-mono-tabular text-sm font-semibold text-[#C6A45B] shrink-0 mt-0.5">
                    0{i + 1}
                  </span>
                  <p className="text-sm leading-[1.8] text-[#4B5852]">{ctx}</p>
                </li>
              ))}
            </ol>
            <a
              href="/history/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/history/');
              }}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#09271F] hover:underline"
            >
              <span>한국 릴게임 전체 역사 보기</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="lg:col-span-6 border border-[#09271F]/20 bg-[#09271F] text-[#F4F1E8] p-7">
            <div className="flex items-center gap-2 text-[#E2C98C]">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-editorial text-xl font-semibold">
                법률 및 이용 주의사항
              </h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#B8C0B9]">
              <div>
                <h3 className="font-sans text-xs font-semibold text-[#C6A45B]">등급분류 기준</h3>
                <p className="mt-1">{game.legalAndSafety.classificationNote}</p>
              </div>
              <div>
                <h3 className="font-sans text-xs font-semibold text-[#C6A45B]">환전 행위 금지</h3>
                <p className="mt-1">{game.legalAndSafety.exchangeWarning}</p>
              </div>
              <div>
                <h3 className="font-sans text-xs font-semibold text-[#C6A45B]">온라인 사설 사이트 주의</h3>
                <p className="mt-1">{game.legalAndSafety.onlineWarning}</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#C6A45B]/25 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#B8C0B9]">법령 확인 및 상담: 1336 / 182</span>
              <a
                href="/regulation/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/regulation/');
                }}
                className="text-[#E2C98C] font-medium hover:underline"
              >
                관련 법률 자세히 보기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ⑧ 게임별 FAQ */}
      <section className="bg-[#FAF8F2] py-12 lg:py-16 border-b border-[#09271F]/12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
          <h2 className="font-editorial text-2xl font-semibold text-[#09271F] mb-6">
            {game.name} 자주 묻는 질문
          </h2>
          <Accordion items={game.faqs} defaultOpenIndex={0} />
        </div>
      </section>

      {/* ⑦ 관련 콘텐츠 */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <h2 className="font-editorial text-2xl font-semibold text-[#09271F]">
                함께 살펴볼 관련 게임 백과
              </h2>
              <p className="mt-1 text-sm text-[#4B5852]">
                유사한 테마나 시대적 흐름을 공유하는 계열입니다.
              </p>
            </div>
            <a
              href="/games/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/games/');
              }}
              className="inline-flex items-center gap-1 text-sm font-medium text-[#09271F] hover:underline"
            >
              <span>전체 백과 목록</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedGames.map((rel) => (
              <a
                key={rel.slug}
                href={`/games/${rel.slug}/`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/games/${rel.slug}/`);
                }}
                className="group border border-[#09271F]/15 bg-[#FAF8F2] p-5 hover:border-[#09271F] transition-colors"
              >
                <div className="text-xs text-[#103A2D] font-medium">
                  {rel.category} · {rel.era}
                </div>
                <h3 className="mt-2 font-editorial text-xl font-semibold text-[#09271F] group-hover:underline">
                  {rel.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#4B5852] line-clamp-2">
                  {rel.summary}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
