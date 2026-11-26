import { AlertTriangle, ArrowRight, Phone, ShieldAlert } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { VisualFrame } from '../components/VisualFrame';

interface SafetyPageProps {
  onNavigate: (path: string) => void;
}

export function SafetyPage({ onNavigate }: SafetyPageProps) {
  const riskChecklists = [
    {
      index: '01',
      title: '"공식 허가 · 무설치 안전 사이트" 사칭 문구',
      description:
        '대한민국 법령상 현금 충·환전이 가능한 온라인 릴게임·바다이야기 사이트는 단 한 곳도 허가되지 않았습니다. "심의 통과", "공식 인증" 배너를 내건 웹사이트는 모두 거짓 홍보입니다.'
    },
    {
      index: '02',
      title: '출처 불명 설치 파일(.apk / .exe) 실행 요구',
      description:
        '문자 메시지나 메신저 링크로 전달되는 설치 파일은 원격 제어 악성코드가 심어져 있어 금융 앱 정보, 연락처, 인증서를 탈취하는 사례가 빈번합니다.'
    },
    {
      index: '03',
      title: '과도한 첫 충전 보너스 및 출금 수수료 요구',
      description:
        '"가입 즉시 무료 머니", "첫 충전 100% 지급"으로 입금을 유도한 뒤, 환전을 요청하면 "롤링 미달", "가상 계좌 해제 수수료" 등을 명목으로 추가 입금을 요구하고 잠적하는 사기 수법에 유의해야 합니다.'
    },
    {
      index: '04',
      title: '타인 명의 대포통장 입금 및 금융 범죄 연루',
      description:
        '불법 사이트 입출금 계좌는 보이스피싱·자금세탁에 악용되는 경우가 많아, 단순 이용자라도 계좌 지급정지나 수사기관 조사 대상이 될 수 있습니다.'
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
              { name: '이용자 안전정보', path: '/safety/' }
            ]}
            onNavigate={onNavigate}
            dark
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#C6A45B]">
                USER PROTECTION &amp; HELPLINE
              </p>
              <h1 className="mt-3 font-editorial text-3xl sm:text-4xl font-semibold leading-tight text-[#F4F1E8]">
                이용자 안전정보 및
                <br />
                불법 사이트 피해 예방 가이드
              </h1>
              <p className="mt-5 text-[15px] sm:text-base leading-[1.75] text-[#B8C0B9] max-w-2xl">
                불법 온라인 사설 사이트의 전형적인 유인 수법과 보안 위협을 식별하는 기준을 안내하며, 사행성 게임 문제 및 금융 사기 피해를 당했을 때 즉시 연락할 수 있는 공적 지원 창구를 제공합니다.
              </p>
            </div>
            <div className="lg:col-span-5">
              <VisualFrame
                src="/src/assets/images/law_safety_editorial_1795676705013.jpg"
                alt="이용자 보호와 법적 안전 기준을 표현한 에디토리얼 정물 사진"
                caption="Fig. 1 — 이용자 안전 기준과 공적 보호 체계를 상징하는 정물 사진"
                aspectClass="aspect-[4/3]"
                eager
                darkSurface
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Official Helpline Column */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-[#09271F] text-[#F4F1E8] border border-[#C6A45B]/35 p-7">
              <div className="flex items-center gap-2 text-[#E2C98C]">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <h2 className="font-sans text-sm font-semibold">공식 상담 및 신고 연락처</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#B8C0B9]">
                본인이나 가족이 사행성 게임으로 경제적·정서적 어려움을 겪고 있거나 불법 사이트 피해를 입었다면 혼자 고민하지 말고 즉시 전문 기관에 도움을 요청하세요.
              </p>

              <div className="mt-6 divide-y divide-[#C6A45B]/20 border-t border-b border-[#C6A45B]/20">
                <div className="py-4">
                  <span className="text-xs text-[#C6A45B]">한국도박문제예방치유원 헬프라인</span>
                  <a
                    href="tel:1336"
                    className="mt-1 block font-mono-tabular text-3xl font-bold text-[#E2C98C] hover:underline"
                  >
                    1336
                  </a>
                  <p className="mt-1 text-xs text-[#B8C0B9]">
                    연중무휴 24시간 무료 · 비밀 보장 전문 상담 (문자 #1336)
                  </p>
                </div>

                <div className="py-4">
                  <span className="text-xs text-[#C6A45B]">경찰청 사이버수사국 · 범죄 신고</span>
                  <a
                    href="tel:182"
                    className="mt-1 block font-mono-tabular text-3xl font-bold text-[#E2C98C] hover:underline"
                  >
                    182
                  </a>
                  <p className="mt-1 text-xs text-[#B8C0B9]">
                    불법 사설 사이트 사기, 악성코드 감염, 금융 피해 신고 및 상담
                  </p>
                </div>

                <div className="py-4">
                  <span className="text-xs text-[#C6A45B]">게임물관리위원회 불법게임물신고센터</span>
                  <p className="mt-1 text-sm font-semibold text-[#F4F1E8]">grac.or.kr 온라인 신고</p>
                  <p className="mt-1 text-xs text-[#B8C0B9]">
                    무허가 게임장, 불법 개변조 기기, 미심의 온라인 릴게임 신고 접수
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-[#09271F]/15 bg-[#FAF8F2] p-6">
              <div className="flex items-center gap-2 text-[#103A2D]">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                <h3 className="font-sans text-xs font-semibold">의심 링크를 이미 눌렀을 때 대처법</h3>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-[#4B5852] leading-relaxed">
                <li>1. 설치한 알 수 없는 앱(.apk/.exe)을 즉시 삭제하고 모바일 백신 정밀 검사를 실행합니다.</li>
                <li>2. 계좌 비밀번호나 공인인증서 정보를 입력했다면 즉시 거래 은행 고객센터에 지급정지 및 보안 재발급을 요청합니다.</li>
                <li>3. 입금 내역과 대화 캡처를 보존해 경찰청(182)에 신고합니다.</li>
              </ul>
            </div>
          </aside>

          {/* Risk Checklist */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <div className="flex items-center gap-2 text-[#103A2D]">
                <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-semibold tracking-wider">IDENTIFICATION CHECKLIST</span>
              </div>
              <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-semibold text-[#09271F]">
                불법 온라인 릴게임 사이트 4대 위험 징후
              </h2>
              <p className="mt-2 text-sm text-[#4B5852]">
                과거 아케이드 게임의 명칭(바다이야기·야마토·손오공·알라딘 등)을 도용한 온라인 사이트에서 공통적으로 확인되는 위험 패턴입니다.
              </p>

              <div className="mt-6 divide-y divide-[#09271F]/15 border-t border-b border-[#09271F]/15">
                {riskChecklists.map((item) => (
                  <div key={item.index} className="py-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono-tabular text-sm font-semibold text-[#C6A45B]">
                        {item.index}
                      </span>
                      <h3 className="font-editorial text-lg font-semibold text-[#09271F]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 text-[15px] leading-[1.8] text-[#4B5852] max-w-prose">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#09271F]/15 bg-[#FAF8F2] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-[#103A2D]">심층 리포트</span>
                <h3 className="mt-1 font-editorial text-lg font-semibold text-[#09271F]">
                  불법 온라인 릴게임 사이트의 위험성과 주요 피해 유형 5가지
                </h3>
              </div>
              <a
                href="/articles/recognizing-illegal-online-sites/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/articles/recognizing-illegal-online-sites/');
                }}
                className="inline-flex items-center gap-2 bg-[#09271F] px-5 py-2.5 text-xs font-semibold text-[#F4F1E8] hover:bg-[#103A2D] transition-colors whitespace-nowrap shrink-0"
              >
                <span>아티클 읽기</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
