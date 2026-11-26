import { ArrowRight, BookOpen } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { VisualFrame } from '../components/VisualFrame';
import { HISTORY_TIMELINE } from '../data/editorialData';

interface HistoryPageProps {
  onNavigate: (path: string) => void;
}

export function HistoryPage({ onNavigate }: HistoryPageProps) {
  return (
    <div className="bg-[#F5F3EC]">
      {/* Dark Header Band */}
      <section className="bg-[#09271F] text-[#F4F1E8] py-14 lg:py-20 border-b border-[#C6A45B]/25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Breadcrumb
            items={[
              { name: '홈', path: '/' },
              { name: '릴게임 역사', path: '/history/' }
            ]}
            onNavigate={onNavigate}
            dark
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#C6A45B]">
                HISTORY CHRONICLE
              </p>
              <h1 className="mt-3 font-editorial text-3xl sm:text-4xl font-semibold leading-tight text-[#F4F1E8]">
                한국 릴게임의 역사와
                <br />
                아케이드 제도 변천 연대기
              </h1>
              <p className="mt-5 text-[15px] sm:text-base leading-[1.75] text-[#B8C0B9] max-w-2xl">
                초기 기계식 슬롯과 과일 아케이드 기판의 유입부터 2000년대 화면형 릴게임의 급팽창, 2006년 사회적 논란과 「게임산업진흥에 관한 법률」 제정 이후의 규제 환경까지 확인 가능한 문헌 기록을 중심으로 정리합니다.
              </p>
            </div>
            <div className="lg:col-span-5">
              <VisualFrame
                src="/src/assets/images/arcade_history_archive_1795676704080.jpg"
                alt="20세기 후반 오락실 복도와 아케이드 기기들을 담은 다큐멘터리 스타일 아카이브 사진"
                caption="Fig. 1 — 시대적 아케이드 공간 구성을 재현한 아카이브 사진 (특정 상업 영업장 실물이 아님)"
                aspectClass="aspect-[16/10]"
                eager
                darkSurface
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Chronicle Body */}
      <section className="py-14 lg:py-20 border-b border-[#09271F]/12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sticky Editorial Context */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 border border-[#09271F]/15 bg-[#FAF8F2] p-6">
            <h2 className="font-sans text-xs font-semibold tracking-wider text-[#103A2D] pb-3 border-b border-[#09271F]/12">
              역사 서술 원칙
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#4B5852]">
              본 연대기는 확인되지 않은 개별 게임의 출시 연도나 미검증 매출 통계를 추정해 작성하지 않았습니다. 공신력 있는 국회 자료, 법령 연혁, 게임물관리위원회 기관 자료에서 확인되는 큰 흐름과 제도 전환점을 기준으로 구성했습니다.
            </p>

            <div className="mt-6 pt-5 border-t border-[#09271F]/12 space-y-2">
              <a
                href="/regulation/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/regulation/');
                }}
                className="flex items-center justify-between border border-[#09271F]/20 px-3 py-2 text-xs font-medium text-[#09271F] hover:bg-[#09271F] hover:text-[#F4F1E8] transition-colors"
              >
                <span>2006년 이후 게임산업법 보기</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="/games/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/games/');
                }}
                className="flex items-center justify-between border border-[#09271F]/20 px-3 py-2 text-xs font-medium text-[#09271F] hover:bg-[#09271F] hover:text-[#F4F1E8] transition-colors"
              >
                <span>시기별 8종 게임 백과 보기</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </aside>

          {/* Timeline Entries */}
          <div className="lg:col-span-8">
            <ol className="divide-y divide-[#09271F]/15 border-t border-b border-[#09271F]/15">
              {HISTORY_TIMELINE.map((item, idx) => (
                <li key={item.period} className="py-9 first:pt-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-mono-tabular text-sm font-semibold text-[#103A2D]">
                      {String(idx + 1).padStart(2, '0')} · {item.period}
                    </span>
                    <span className="text-xs text-[#4B5852]">{item.sourceNote}</span>
                  </div>
                  <h2 className="mt-2 font-editorial text-2xl font-semibold text-[#09271F]">
                    {item.eraTitle}
                  </h2>
                  <p className="mt-3 text-[15px] font-medium leading-relaxed text-[#14221D] max-w-prose">
                    {item.summary}
                  </p>
                  <ul className="mt-4 space-y-2.5 max-w-prose">
                    {item.details.map((detail) => (
                      <li
                        key={detail}
                        className="pl-4 border-l border-[#C6A45B] text-sm leading-[1.8] text-[#4B5852]"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            {/* Related Deep-dive Link */}
            <div className="mt-10 border border-[#09271F]/15 bg-[#FAF8F2] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#103A2D]">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  <span>연계 심층 리포트</span>
                </div>
                <h3 className="mt-1.5 font-editorial text-lg font-semibold text-[#09271F]">
                  2000년대 한국 아케이드 게임장과 릴게임 규제 변천사
                </h3>
              </div>
              <a
                href="/articles/korean-arcade-history-2000s/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/articles/korean-arcade-history-2000s/');
                }}
                className="inline-flex items-center gap-2 bg-[#09271F] px-5 py-2.5 text-xs font-semibold text-[#F4F1E8] hover:bg-[#103A2D] transition-colors whitespace-nowrap shrink-0"
              >
                <span>아티클 전문 읽기</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
