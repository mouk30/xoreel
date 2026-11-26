import { type ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowUp, ChevronDown, Menu, X } from 'lucide-react';
import { GAMES_DATA } from '../data/gamesData';

interface LayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: ReactNode;
}

export function Layout({ currentPath, onNavigate, children }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'games' | 'law' | null>(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const dropdownTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setShowTopBtn(y > 480);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [currentPath]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    onNavigate(path);
  };

  const openMenuDelayed = (menu: 'games' | 'law') => {
    if (dropdownTimerRef.current) window.clearTimeout(dropdownTimerRef.current);
    setOpenDropdown(menu);
  };

  const closeMenuDelayed = () => {
    dropdownTimerRef.current = window.setTimeout(() => setOpenDropdown(null), 150);
  };

  const isNavActive = (prefix: string) => {
    if (prefix === '/') return currentPath === '/';
    return currentPath.startsWith(prefix);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F3EC] text-[#14221D] overflow-x-hidden">
      {/* Top Bar (Strict 1-row, 3-zone contract) */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 border-b ${
          scrolled
            ? 'bg-[#071A15]/95 border-[#C6A45B]/30 text-[#F4F1E8]'
            : 'bg-[#09271F] border-[#C6A45B]/20 text-[#F4F1E8]'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-[#F4F1E8] whitespace-nowrap shrink-0 hover:text-[#E2C98C] transition-colors"
          >
            릴게임<span className="font-normal text-[#C6A45B]">매거진</span>
          </a>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav
            aria-label="주 메뉴"
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#F4F1E8]/85"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/');
              }}
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                isNavActive('/')
                  ? 'border-[#C6A45B] text-[#E2C98C]'
                  : 'border-transparent hover:text-[#F4F1E8]'
              }`}
            >
              홈
            </a>

            <a
              href="/guide/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/guide/');
              }}
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                isNavActive('/guide/')
                  ? 'border-[#C6A45B] text-[#E2C98C]'
                  : 'border-transparent hover:text-[#F4F1E8]'
              }`}
            >
              릴게임 가이드
            </a>

            {/* Dropdown: 게임 백과 */}
            <div
              className="relative"
              onMouseEnter={() => openMenuDelayed('games')}
              onMouseLeave={closeMenuDelayed}
            >
              <a
                href="/games/"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/games/');
                }}
                aria-expanded={openDropdown === 'games'}
                className={`inline-flex items-center gap-1 py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                  isNavActive('/games/')
                    ? 'border-[#C6A45B] text-[#E2C98C]'
                    : 'border-transparent hover:text-[#F4F1E8]'
                }`}
              >
                게임 백과
                <ChevronDown className="h-3.5 w-3.5 text-[#C6A45B]" aria-hidden="true" />
              </a>

              {openDropdown === 'games' && (
                <div className="absolute left-0 top-full pt-2 w-72">
                  <div className="border border-[#C6A45B]/30 bg-[#071A15] p-3 shadow-xl">
                    <a
                      href="/games/"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick('/games/');
                      }}
                      className="block border-b border-[#C6A45B]/20 pb-2 mb-2 text-xs font-semibold text-[#E2C98C] hover:underline"
                    >
                      전체 8종 게임 백과 보기
                    </a>
                    <div className="grid grid-cols-2 gap-1">
                      {GAMES_DATA.map((game) => (
                        <a
                          key={game.slug}
                          href={`/games/${game.slug}/`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(`/games/${game.slug}/`);
                          }}
                          className={`px-2 py-1.5 text-xs transition-colors whitespace-nowrap ${
                            currentPath === `/games/${game.slug}/`
                              ? 'bg-[#103A2D] text-[#E2C98C]'
                              : 'text-[#F4F1E8]/85 hover:bg-[#103A2D]/70 hover:text-[#F4F1E8]'
                          }`}
                        >
                          {game.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href="/history/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/history/');
              }}
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                isNavActive('/history/')
                  ? 'border-[#C6A45B] text-[#E2C98C]'
                  : 'border-transparent hover:text-[#F4F1E8]'
              }`}
            >
              릴게임 역사
            </a>

            {/* Dropdown: 법률 및 안전정보 */}
            <div
              className="relative"
              onMouseEnter={() => openMenuDelayed('law')}
              onMouseLeave={closeMenuDelayed}
            >
              <a
                href="/regulation/"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/regulation/');
                }}
                aria-expanded={openDropdown === 'law'}
                className={`inline-flex items-center gap-1 py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                  isNavActive('/regulation/') || isNavActive('/safety/')
                    ? 'border-[#C6A45B] text-[#E2C98C]'
                    : 'border-transparent hover:text-[#F4F1E8]'
                }`}
              >
                법률 및 안전정보
                <ChevronDown className="h-3.5 w-3.5 text-[#C6A45B]" aria-hidden="true" />
              </a>

              {openDropdown === 'law' && (
                <div className="absolute left-0 top-full pt-2 w-60">
                  <div className="border border-[#C6A45B]/30 bg-[#071A15] p-2 shadow-xl flex flex-col gap-1">
                    <a
                      href="/regulation/"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick('/regulation/');
                      }}
                      className="px-3 py-2 text-xs text-[#F4F1E8]/90 hover:bg-[#103A2D] hover:text-[#E2C98C] transition-colors"
                    >
                      국내 법률 및 등급분류 규제
                    </a>
                    <a
                      href="/safety/"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick('/safety/');
                      }}
                      className="px-3 py-2 text-xs text-[#F4F1E8]/90 hover:bg-[#103A2D] hover:text-[#E2C98C] transition-colors"
                    >
                      이용자 보호 및 피해 예방
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a
              href="/glossary/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/glossary/');
              }}
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                isNavActive('/glossary/')
                  ? 'border-[#C6A45B] text-[#E2C98C]'
                  : 'border-transparent hover:text-[#F4F1E8]'
              }`}
            >
              용어 사전
            </a>

            <a
              href="/faq/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/faq/');
              }}
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                isNavActive('/faq/')
                  ? 'border-[#C6A45B] text-[#E2C98C]'
                  : 'border-transparent hover:text-[#F4F1E8]'
              }`}
            >
              FAQ
            </a>
          </nav>

          {/* Zone 3: Fixed Top-Right CTA + Mobile Menu Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://reelkings.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[#E2C98C] bg-[#14533C] px-4 sm:px-5 py-1.5 sm:py-2 text-base sm:text-lg font-extrabold tracking-tight text-white shadow-md hover:bg-[#19664A] transition-colors whitespace-nowrap shrink-0"
            >
              <span>릴게임바로가기</span>
              <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center border border-[#C6A45B]/30 text-[#F4F1E8] hover:text-[#E2C98C] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#C6A45B]/20 bg-[#071A15] px-4 py-5 max-h-[82vh] overflow-y-auto">
            <nav aria-label="모바일 메뉴" className="flex flex-col divide-y divide-[#C6A45B]/15">
              {[
                { label: '홈', path: '/' },
                { label: '릴게임 가이드', path: '/guide/' },
                { label: '게임 백과 (8종 전체)', path: '/games/' },
                { label: '릴게임 역사', path: '/history/' },
                { label: '법률 및 규제', path: '/regulation/' },
                { label: '이용자 안전정보 (1336 안내)', path: '/safety/' },
                { label: '용어 사전', path: '/glossary/' },
                { label: '아티클 모음', path: '/articles/' },
                { label: '자주 묻는 질문 (FAQ)', path: '/faq/' }
              ].map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.path);
                  }}
                  className={`py-3 text-sm font-medium transition-colors ${
                    currentPath === item.path ? 'text-[#E2C98C]' : 'text-[#F4F1E8]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-[#C6A45B]/20">
              <p className="text-xs text-[#C6A45B] mb-2 font-medium">게임별 바로가기</p>
              <div className="grid grid-cols-2 gap-2">
                {GAMES_DATA.map((game) => (
                  <a
                    key={game.slug}
                    href={`/games/${game.slug}/`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(`/games/${game.slug}/`);
                    }}
                    className="border border-[#C6A45B]/20 bg-[#09271F] px-3 py-2 text-xs text-[#F4F1E8]"
                  >
                    {game.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">{children}</main>

      {/* Scroll to Top Button */}
      {showTopBtn && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="페이지 최상단으로 이동"
          className="fixed bottom-6 right-5 z-40 inline-flex h-11 w-11 items-center justify-center border border-[#C6A45B]/50 bg-[#09271F] text-[#E2C98C] shadow-lg hover:bg-[#103A2D] transition-colors cursor-pointer"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      {/* Editorial Footer (Section 09) */}
      <footer className="bg-[#071A15] text-[#F4F1E8] border-t border-[#C6A45B]/25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#C6A45B]/20">
            <div className="lg:col-span-5">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/');
                }}
                className="font-editorial text-xl font-bold text-[#F4F1E8]"
              >
                릴게임<span className="font-normal text-[#C6A45B]">매거진</span>
              </a>
              <p className="mt-4 text-sm leading-relaxed text-[#B8C0B9] max-w-sm">
                릴게임의 기초 개념, 작동 원리, 8종 게임 백과, 한국 게임장 역사와 관련 법령 및 이용자 보호 정보를 객관적으로 정리한 디지털 정보 매거진입니다.
              </p>
              <p className="mt-4 text-xs leading-relaxed text-[#B8C0B9]/80">
                본 매거진은 특정 게임 이용이나 사설 사이트 접속을 홍보·알선하지 않습니다.
              </p>
            </div>

            <div className="lg:col-span-3">
              <h2 className="font-sans text-xs font-semibold tracking-wider text-[#C6A45B] mb-4">
                주요 메뉴
              </h2>
              <ul className="space-y-2.5 text-sm text-[#B8C0B9]">
                {[
                  { label: '릴게임 가이드', path: '/guide/' },
                  { label: '게임 백과 전체', path: '/games/' },
                  { label: '한국 릴게임 역사', path: '/history/' },
                  { label: '국내 법률 및 규제', path: '/regulation/' },
                  { label: '이용자 안전정보', path: '/safety/' },
                  { label: '용어 사전 · FAQ', path: '/glossary/' }
                ].map((link) => (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.path);
                      }}
                      className="hover:text-[#E2C98C] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h2 className="font-sans text-xs font-semibold tracking-wider text-[#C6A45B] mb-4">
                게임 백과 색인
              </h2>
              <ul className="grid grid-cols-2 gap-2.5 text-sm text-[#B8C0B9]">
                {GAMES_DATA.map((game) => (
                  <li key={game.slug}>
                    <a
                      href={`/games/${game.slug}/`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(`/games/${game.slug}/`);
                      }}
                      className="hover:text-[#E2C98C] transition-colors"
                    >
                      {game.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#B8C0B9]">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/privacy/"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/privacy/');
                }}
                className="hover:text-[#E2C98C] transition-colors"
              >
                개인정보처리방침
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/terms/"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/terms/');
                }}
                className="hover:text-[#E2C98C] transition-colors"
              >
                이용약관
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/disclaimer/"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/disclaimer/');
                }}
                className="hover:text-[#E2C98C] transition-colors"
              >
                면책 및 정보 안내
              </a>
            </div>
            <p>© 2026 릴게임매거진. 정보 제공 목적의 비영리 아카이브 매거진.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
