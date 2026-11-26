import { ArrowRight, ExternalLink, Scale, ShieldCheck } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { VisualFrame } from '../components/VisualFrame';

interface RegulationPageProps {
  onNavigate: (path: string) => void;
}

export function RegulationPage({ onNavigate }: RegulationPageProps) {
  const legalPillars = [
    {
      code: '제2조',
      title: '사행성 게임물의 법적 정의',
      summary:
        '「게임산업진흥에 관한 법률」은 베팅·배당을 내용으로 하거나 우연적인 방법으로 결과가 결정되어 재산상 이익 또는 손실을 주는 게임물을 "사행성 게임물"로 규정합니다.',
      note: '여기에 해당하는 게임물은 원칙적으로 일반 게임 유통 등급분류 대상에서 제외되거나 엄격히 금지됩니다.'
    },
    {
      code: '제21조',
      title: '게임물 등급분류 의무',
      summary:
        '국내에서 게임물을 유통하거나 공중의 이용에 제공하려면 게임물관리위원회 또는 지정 기관으로부터 사전에 등급분류를 받아야 합니다.',
      note: '심의를 받지 않은 미분류 게임물 제공이나, 심의 받은 내용과 다르게 개·변조해 유통하는 행위는 모두 형사 처벌 대상입니다.'
    },
    {
      code: '제28조·제32조',
      title: '경품 취급 제한 및 환전·환전 알선 금지',
      summary:
        '게임물 이용을 통해 획득한 점수, 결과물, 경품 등을 현금이나 재산상 가치가 있는 유가증권으로 환전하거나 환전을 알선·재매입하는 행위는 엄격히 금지됩니다.',
      note: '2006년 제도 개편 이후 과거의 경품용 상품권 제도는 완전히 폐지되었습니다.'
    }
  ];

  return (
    <div className="bg-[#F5F3EC]">
      {/* Dark Header Band */}
      <section className="bg-[#09271F] text-[#F4F1E8] py-14 lg:py-20 border-b border-[#C6A45B]/25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Breadcrumb
            items={[
              { name: '홈', path: '/' },
              { name: '법률 및 규제', path: '/regulation/' }
            ]}
            onNavigate={onNavigate}
            dark
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#C6A45B]">
                REGULATION &amp; LEGAL FRAMEWORK
              </p>
              <h1 className="mt-3 font-editorial text-3xl sm:text-4xl font-semibold leading-tight text-[#F4F1E8]">
                국내 릴게임 관련 법률 및
                <br />
                게임물 등급분류 규제 안내
              </h1>
              <p className="mt-5 text-[15px] sm:text-base leading-[1.75] text-[#B8C0B9] max-w-2xl">
                대한민국 「게임산업진흥에 관한 법률」을 중심으로 사행성 게임물의 판단 기준, 등급분류 의무, 환전 금지 규정 및 공식 조회 방법을 객관적으로 안내합니다.
              </p>
            </div>
            <div className="lg:col-span-5">
              <VisualFrame
                src="/src/assets/images/law_safety_editorial_1795676705013.jpg"
                alt="법적 기준과 균형을 상징하는 황동 저울과 법전 정물 사진"
                caption="Fig. 1 — 법령과 공적 심의 기준을 상징하는 에디토리얼 정물 사진"
                aspectClass="aspect-[4/3]"
                eager
                darkSurface
              />
            </div>
          </div>
        </div>
      </section>

      {/* Legal Pillars */}
      <section className="py-14 lg:py-20 border-b border-[#09271F]/12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <div className="border border-[#09271F]/15 bg-[#FAF8F2] p-6">
              <div className="flex items-center gap-2 text-[#103A2D]">
                <Scale className="h-4 w-4" aria-hidden="true" />
                <h2 className="font-sans text-xs font-semibold tracking-wider">법률 정보 이용 주의</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#4B5852]">
                본 페이지의 내용은 일반 이용자의 이해를 돕기 위해 법령 조문과 공공기관 공개 자료를 요약한 정보입니다. 구체적인 법적 분쟁, 수사·재판 대응, 사업 적법성 판단이 필요한 경우에는 반드시 법률 전문가(변호사) 또는 관할 기관의 공식 유권해석을 확인하시기 바랍니다.
              </p>
              <div className="mt-5 pt-4 border-t border-[#09271F]/12">
                <a
                  href="/safety/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/safety/');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#09271F] hover:underline"
                >
                  <span>이용자 피해 예방 및 상담 안내</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="font-editorial text-2xl font-semibold text-[#09271F]">
                「게임산업진흥에 관한 법률」 핵심 규제 3가지
              </h2>
              <p className="mt-2 text-sm text-[#4B5852]">
                오프라인 아케이드 기기뿐만 아니라 웹·모바일 형태로 제공되는 모든 릴게임류에 공통으로 적용되는 법적 원칙입니다.
              </p>

              <div className="mt-6 divide-y divide-[#09271F]/15 border-t border-b border-[#09271F]/15">
                {legalPillars.map((pillar) => (
                  <div key={pillar.code} className="py-7">
                    <span className="font-mono-tabular text-xs font-semibold text-[#103A2D]">
                      게임산업법 {pillar.code} 중심 기준
                    </span>
                    <h3 className="mt-1.5 font-editorial text-xl font-semibold text-[#09271F]">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.8] text-[#14221D] max-w-prose">
                      {pillar.summary}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#4B5852] max-w-prose">
                      {pillar.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Rating Verification Guide */}
            <div className="border border-[#09271F]/15 bg-[#FAF8F2] p-7">
              <div className="flex items-center gap-2 text-[#103A2D]">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-editorial text-xl font-semibold text-[#09271F]">
                  게임물 등급분류 여부 직접 확인하는 방법
                </h2>
              </div>
              <ol className="mt-5 space-y-3 text-sm leading-relaxed text-[#4B5852] list-decimal list-inside max-w-prose">
                <li>
                  게임물관리위원회 공식 홈페이지(<span className="font-mono-tabular text-[#09271F]">grac.or.kr</span>)에 접속합니다.
                </li>
                <li>
                  상단 메뉴의 <strong>정보공개 → 등급분류 검색</strong> 메뉴에서 게임명 또는 신청 사업자명을 입력합니다.
                </li>
                <li>
                  등급결정번호, 등급(전체이용가·청소년이용불가 등), 그리고 <strong>등급분류 취소 여부</strong>를 반드시 대조합니다.
                </li>
                <li>
                  검색되지 않거나 온라인 현금 충·환전 기능이 결합된 경우 합법 게임물이 아니므로 이용하지 않아야 합니다.
                </li>
              </ol>

              <div className="mt-6 pt-5 border-t border-[#09271F]/12 flex flex-wrap gap-4 text-xs">
                <a
                  href="https://www.grac.or.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#09271F] hover:underline"
                >
                  <span>게임물관리위원회 공식 홈페이지</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.law.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#09271F] hover:underline"
                >
                  <span>국가법령정보센터 법령 원문 조회</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
