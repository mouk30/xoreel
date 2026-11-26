import { ArrowRight } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  const recoveryLinks = [
    { label: '홈으로 돌아가기', path: '/' },
    { label: '릴게임 종합 가이드', path: '/guide/' },
    { label: '8종 게임 백과', path: '/games/' },
    { label: '이용자 안전정보 (1336)', path: '/safety/' }
  ];

  return (
    <section className="bg-[#F5F3EC] py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10 text-center">
        <p className="font-mono-tabular text-sm font-semibold tracking-[0.2em] text-[#C6A45B]">
          HTTP 404 · NOT FOUND
        </p>
        <h1 className="mt-3 font-editorial text-3xl sm:text-4xl font-semibold text-[#09271F]">
          요청하신 페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[#4B5852]">
          주소가 변경되었거나 존재하지 않는 경로입니다. 아래 주요 아카이브 메뉴를 통해 원하시는 정보로 이동해 주세요.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {recoveryLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.path);
              }}
              className="flex items-center justify-between border border-[#09271F]/20 bg-[#FAF8F2] px-5 py-4 text-sm font-medium text-[#09271F] hover:bg-[#09271F] hover:text-[#F4F1E8] transition-colors"
            >
              <span>{link.label}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
