import { ArrowRight } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { VisualFrame } from '../components/VisualFrame';
import { COMPARISON_TABLE, GUIDE_STEPS } from '../data/editorialData';

interface GuidePageProps {
  onNavigate: (path: string) => void;
}

export function GuidePage({ onNavigate }: GuidePageProps) {
  return (
    <div className="bg-[#F5F3EC]">
      {/* Header Band */}
      <section className="bg-[#09271F] text-[#F4F1E8] py-14 lg:py-20 border-b border-[#C6A45B]/25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Breadcrumb
            items={[
              { name: '홈', path: '/' },
              { name: '릴게임 가이드', path: '/guide/' }
            ]}
            onNavigate={onNavigate}
            dark
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#C6A45B]">
                COMPREHENSIVE GUIDE
              </p>
              <h1 className="mt-3 font-editorial text-3xl sm:text-4xl font-semibold leading-tight text-[#F4F1E8]">
                릴게임 종합 가이드:
                <br />
                개념과 원리, 그리고 올바른 이해
              </h1>
              <p className="mt-5 text-[15px] sm:text-base leading-[1.75] text-[#B8C0B9] max-w-2xl">
                릴게임의 정의부터 회전 릴의 구조, 난수 발생기(RNG)가 결과를 결정하는 방식, 흔히 빠지는 인지 편향인 도박사의 오류, 그리고 법적 경계까지 기초 지식을 단계별로 정리했습니다.
              </p>
            </div>
            <div className="lg:col-span-5">
              <VisualFrame
                src="/src/assets/images/mechanism_diagram_art_1795676704532.jpg"
                alt="릴 드럼과 페이라인의 개념적 구조를 그린 기술 일러스트"
                caption="Fig. 1 — 기계적 릴 드럼과 페이라인 개념 도해"
                aspectClass="aspect-[4/3]"
                eager
                darkSurface
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reading Body with Sticky TOC */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sidebar TOC */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 border border-[#09271F]/15 bg-[#FAF8F2] p-6">
            <h2 className="font-sans text-xs font-semibold tracking-wider text-[#103A2D] pb-3 border-b border-[#09271F]/12">
              가이드 목차
            </h2>
            <nav aria-label="가이드 섹션 목차" className="mt-3 space-y-2.5 text-sm">
              <a href="#definition" className="block text-[#4B5852] hover:text-[#09271F]">
                01. 릴게임이란 무엇인가?
              </a>
              <a href="#steps" className="block text-[#4B5852] hover:text-[#09271F]">
                02. 5단계 핵심 구조와 RNG 해설
              </a>
              <a href="#rng" className="block text-[#4B5852] hover:text-[#09271F]">
                03. 도박사의 오류와 공략법 팩트체크
              </a>
              <a href="#comparison" className="block text-[#4B5852] hover:text-[#09271F]">
                04. 슬롯머신 · 파치슬로 비교표
              </a>
            </nav>

            <div className="mt-6 pt-5 border-t border-[#09271F]/12">
              <p className="text-xs leading-relaxed text-[#4B5852]">
                더 많은 용어 해설과 법령 기준은 아래 아카이브에서 확인할 수 있습니다.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href="/glossary/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/glossary/');
                  }}
                  className="inline-flex items-center justify-between border border-[#09271F]/20 px-3 py-2 text-xs font-medium text-[#09271F] hover:bg-[#09271F] hover:text-[#F4F1E8] transition-colors"
                >
                  <span>릴게임 용어 사전</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href="/regulation/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/regulation/');
                  }}
                  className="inline-flex items-center justify-between border border-[#09271F]/20 px-3 py-2 text-xs font-medium text-[#09271F] hover:bg-[#09271F] hover:text-[#F4F1E8] transition-colors"
                >
                  <span>국내 법률 및 규제 안내</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </aside>

          {/* Main Essay Column */}
          <div className="lg:col-span-8 space-y-14">
            <article id="definition" className="max-w-prose">
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#09271F]">
                릴게임이란 무엇인가?
              </h2>
              <p className="mt-4 text-base leading-[1.8] text-[#14221D] font-medium">
                릴게임(Reel Game)은 회전하는 세로 열(릴)에 배치된 심볼들이 정지했을 때, 유효 기준선(페이라인) 위에 형성되는 조합에 따라 점수와 연출이 결정되는 게임 방식을 말합니다.
              </p>
              <p className="mt-4 text-[15px] leading-[1.8] text-[#4B5852]">
                원래 19세기 말 미국에서 제작된 기계식 슬롯머신의 회전 드럼에서 유래했으며, 대한민국에서는 1990년대 후반~2000년대 초반 아케이드 게임장을 중심으로 디지털 화면형 연출이 강조된 게임들을 통칭하는 명칭으로 자리 잡았습니다.
              </p>
            </article>

            <div id="steps" className="pt-10 border-t border-[#09271F]/15 space-y-8">
              <div>
                <h2 className="font-editorial text-2xl font-semibold text-[#09271F]">
                  릴게임을 이해하기 위한 5가지 핵심 원리
                </h2>
                <p className="mt-2 text-sm text-[#4B5852]">
                  외부 화면이 아무리 달라도 모든 릴게임은 아래 다섯 가지 원리와 제도적 틀 안에서 이해해야 합니다.
                </p>
              </div>

              <div className="divide-y divide-[#09271F]/12 border-t border-b border-[#09271F]/15">
                {GUIDE_STEPS.map((step) => (
                  <div key={step.number} id={step.number === '02' ? 'rng' : undefined} className="py-7">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono-tabular text-sm font-semibold text-[#C6A45B]">
                        {step.number}
                      </span>
                      <h3 className="font-editorial text-xl font-semibold text-[#09271F]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm font-medium text-[#103A2D]">{step.summary}</p>
                    <p className="mt-3 text-[15px] leading-[1.8] text-[#4B5852] max-w-prose">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div id="comparison" className="pt-6">
              <h2 className="font-editorial text-2xl font-semibold text-[#09271F]">
                릴게임 · 슬롯머신 · 파치슬로 구조 비교
              </h2>
              <p className="mt-2 text-sm text-[#4B5852] mb-5">
                겉보기엔 유사한 회전 릴 구조를 사용하지만, 기원·조작 방식·국내 법적 지위는 명확히 다릅니다.
              </p>

              <div className="overflow-x-auto border border-[#09271F]/15 bg-[#FAF8F2]">
                <table className="w-full min-w-[640px] text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#09271F]/15 bg-[#09271F] text-[#F4F1E8]">
                      <th className="py-3.5 px-4 font-semibold w-32">구분</th>
                      <th className="py-3.5 px-4 font-semibold">국내 릴게임</th>
                      <th className="py-3.5 px-4 font-semibold">슬롯머신</th>
                      <th className="py-3.5 px-4 font-semibold">파치슬로</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#09271F]/10">
                    {COMPARISON_TABLE.map((row) => (
                      <tr key={row.criterion}>
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
        </div>
      </section>
    </div>
  );
}
