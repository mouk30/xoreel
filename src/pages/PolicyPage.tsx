import { Breadcrumb } from '../components/Breadcrumb';

interface PolicyPageProps {
  type: 'privacy' | 'terms' | 'disclaimer';
  onNavigate: (path: string) => void;
}

const POLICY_CONTENT = {
  privacy: {
    eyebrow: 'PRIVACY POLICY',
    title: '개인정보처리방침',
    path: '/privacy/',
    intro:
      '릴게임매거진은 별도의 회원 가입, 로그인, 결제 기능을 운영하지 않는 순수 정보 제공용 디지털 매거진입니다.',
    sections: [
      {
        heading: '1. 개인정보 수집 항목 및 보유 여부',
        body: '본 웹사이트는 이용자의 성명, 연락처, 주민등록번호, 계좌번호 등 일체의 개인식별정보나 민감정보를 수집·저장하지 않습니다. 사이트 내 검색 기능은 이용자의 브라우저 내에서만 동작하며 외부로 검색 기록을 전송하지 않습니다.'
      },
      {
        heading: '2. 서버 접속 로그 및 쿠키 안내',
        body: '웹 서비스 보안 유지와 오류 점검을 위해 일반적인 HTTP 요청 기록(접속 시간, 요청 경로 등)이 일시적으로 처리될 수 있으나, 개인을 식별하거나 추적 광고에 활용하지 않습니다.'
      },
      {
        heading: '3. 외부 링크 이동 시 유의사항',
        body: '본 매거진은 법령 및 등급분류 확인을 위해 게임물관리위원회, 국가법령정보센터 등 공공기관 공식 사이트 링크를 제공합니다. 외부 사이트로 이동한 이후에는 해당 기관의 개인정보처리방침이 적용됩니다.'
      }
    ]
  },
  terms: {
    eyebrow: 'TERMS OF USE',
    title: '이용약관',
    path: '/terms/',
    intro:
      '본 약관은 릴게임매거진 디지털 정보 매거진이 제공하는 아카이브 문서 및 백과 콘텐츠의 이용 조건을 규정합니다.',
    sections: [
      {
        heading: '1. 정보 제공의 목적 및 성격',
        body: '본 사이트의 모든 콘텐츠는 릴게임의 구조, 역사, 관련 용어 및 대한민국 법률·규제에 대한 객관적 정보 전달과 이용자 피해 예방을 목적으로 제작되었습니다.'
      },
      {
        heading: '2. 허용되지 않는 이용 행위',
        body: '이용자는 본 사이트의 콘텐츠를 불법 사설 도박 사이트 홍보, 사행 행위 알선, 허위 공략법 유포 등의 목적으로 무단 전재하거나 재가공하여 사용할 수 없습니다.'
      },
      {
        heading: '3. 콘텐츠 저작권 및 인용',
        body: '에디토리얼 텍스트와 시각화 도판의 출처를 명확히 밝히는 비상업적·연구적 인용은 허용되나, 무단 복제 및 상업적 재배포는 제한됩니다.'
      }
    ]
  },
  disclaimer: {
    eyebrow: 'EDITORIAL DISCLAIMER',
    title: '면책 및 정보 안내',
    path: '/disclaimer/',
    intro:
      '릴게임매거진은 어떠한 게임물 유통 사업자나 사설 사이트와도 제휴·광고 관계가 없는 독립 정보 아카이브입니다.',
    sections: [
      {
        heading: '1. 비홍보 및 사행 행위 금지 선언',
        body: '본 사이트는 게임 접속 링크, 회원 가입 코드, 보너스 안내, 환전 정보 등을 일절 제공하지 않으며 사행성 게임 이용을 권장하거나 유도하지 않습니다.'
      },
      {
        heading: '2. 미확인 정보에 대한 검증 구분 원칙',
        body: '과거 유통되었던 아케이드 게임물의 경우 버전 및 개변조 여부에 따라 사양이 달라지므로, 확인되지 않은 내부 확률(RTP)·출시일·제조사 정보는 사실처럼 단정하지 않고 검증이 필요한 영역으로 명시합니다.'
      },
      {
        heading: '3. 법률 정보의 한계',
        body: '본 매거진에 수록된 법률·규제 안내는 「게임산업진흥에 관한 법률」 및 공공기관 공개 자료를 바탕으로 정리한 일반 안내이며, 개별 사건에 대한 법률적 조언을 대체하지 않습니다. 구체적인 법적 판단은 반드시 변호사 등 법률 전문가와 상의하시기 바랍니다.'
      }
    ]
  }
} as const;

export function PolicyPage({ type, onNavigate }: PolicyPageProps) {
  const doc = POLICY_CONTENT[type];

  return (
    <div className="bg-[#F5F3EC]">
      <section className="bg-[#09271F] text-[#F4F1E8] py-14 border-b border-[#C6A45B]/25">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
          <Breadcrumb
            items={[
              { name: '홈', path: '/' },
              { name: doc.title, path: doc.path }
            ]}
            onNavigate={onNavigate}
            dark
          />
          <p className="text-xs font-semibold tracking-[0.18em] text-[#C6A45B]">{doc.eyebrow}</p>
          <h1 className="mt-2 font-editorial text-3xl sm:text-4xl font-semibold text-[#F4F1E8]">
            {doc.title}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#B8C0B9]">{doc.intro}</p>
        </div>
      </section>

      <section className="py-14 lg:py-18">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
          <div className="space-y-10 max-w-prose">
            {doc.sections.map((section) => (
              <div key={section.heading} className="pb-8 border-b border-[#09271F]/12 last:border-b-0">
                <h2 className="font-editorial text-xl font-semibold text-[#09271F]">
                  {section.heading}
                </h2>
                <p className="mt-3 text-[15px] leading-[1.85] text-[#4B5852]">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
