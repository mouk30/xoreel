export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface RouteSeoMeta {
  title: string;
  description: string;
  canonicalPath: string;
  robots: 'index, follow' | 'noindex, nofollow';
  ogType: 'website' | 'article';
  ogImage: string;
  breadcrumbs: BreadcrumbItem[];
  articleDate?: string;
  faqEntities?: { question: string; answer: string }[];
  is404?: boolean;
}

export const CANONICAL_SITE_ORIGIN = 'https://xoreel.net';

const DEFAULT_OG_IMAGE = '/src/assets/images/hero_reel_archive_1795676703367.jpg';

const GAME_SEO_MAP: Record<string, { name: string; title: string; description: string; image: string }> = {
  badaiyagi: {
    name: '바다이야기',
    title: '바다이야기 릴게임 정보 | 개념·심볼·역사·법률 정리 - 릴게임매거진',
    description:
      '바다이야기의 해양 테마와 심볼 구성, 화면형 릴 작동 원리, 2000년대 사회적 배경 및 국내 법률·이용 주의사항을 객관적으로 정리했습니다.',
    image: '/src/assets/images/theme_maritime_illustration_1795676703922.jpg'
  },
  'ocean-paradise': {
    name: '오션파라다이스',
    title: '오션파라다이스 릴게임 정보 | 특징·심볼·주의사항 - 릴게임매거진',
    description:
      '오션파라다이스의 열대 산호초 테마와 화면 연출 특징, 난수 기반 작동 원리, 사설 사이트 주의사항을 백과사전 형식으로 정리했습니다.',
    image: '/src/assets/images/theme_maritime_illustration_1795676703922.jpg'
  },
  yamato: {
    name: '야마토',
    title: '야마토 릴게임 정보 | 방식·파치슬로 차이·역사 정리 - 릴게임매거진',
    description:
      '야마토 릴게임의 전함·파도 심볼 구성, 일본 파치슬로와의 구조적 차이, 빠른 회차 진행 특성과 국내 법률상 주의사항을 확인하세요.',
    image: '/src/assets/images/hero_reel_archive_1795676703367.jpg'
  },
  'cherry-master': {
    name: '체리마스터',
    title: '체리마스터 정보 | 고전 과일 슬롯 구조·8라인·역사 - 릴게임매거진',
    description:
      '고전 과일 슬롯 계보를 대표하는 체리마스터의 3×3 격자 8라인 구조, 체리·7·BAR 심볼의 유래와 아케이드 역사를 안내합니다.',
    image: '/src/assets/images/mechanism_diagram_art_1795676704532.jpg'
  },
  hwanggeumseong: {
    name: '황금성',
    title: '황금성 릴게임 정보 | 동양 성곽 테마·연출·법적 주의 - 릴게임매거진',
    description:
      '황금성 릴게임의 동양 성곽·보물 테마와 단계형 연출 특징, 확인되지 않은 공략법에 대한 팩트체크 및 이용자 주의사항을 정리했습니다.',
    image: '/src/assets/images/arcade_history_archive_1795676704080.jpg'
  },
  aladdin: {
    name: '알라딘',
    title: '알라딘 릴게임 정보 | 아라비안나이트 테마·심볼·주의사항 - 릴게임매거진',
    description:
      '아라비안나이트 설화 기반의 알라딘 릴게임 테마와 마법 램프·컷씬 연출 구조, 멀티라인 변형판 주의사항 및 안전 정보를 확인하세요.',
    image: '/src/assets/images/theme_maritime_illustration_1795676703922.jpg'
  },
  sincheonji: {
    name: '신천지',
    title: '신천지 릴게임 정보 | 모험·판타지 테마·역사·안전 안내 - 릴게임매거진',
    description:
      '신천지 릴게임의 모험·판타지 테마 분류, 2000년대 아케이드 다변화 배경 및 불법 온라인 사설 사이트 식별 기준을 안내합니다.',
    image: '/src/assets/images/arcade_history_archive_1795676704080.jpg'
  },
  sonogong: {
    name: '손오공',
    title: '손오공 릴게임 정보 | 서유기 스토리 연출·심볼·안전정보 - 릴게임매거진',
    description:
      '고전 서유기 캐릭터 조합과 스토리 컷씬을 특징으로 하는 손오공 릴게임의 구조, RNG 독립성, 법률 규제 및 상담 안내를 확인하세요.',
    image: '/src/assets/images/theme_maritime_illustration_1795676703922.jpg'
  }
};

const ARTICLE_SEO_MAP: Record<string, { title: string; description: string; image: string }> = {
  'what-is-reel-game': {
    title: '릴게임이란 무엇인가? 개념부터 구조까지 | 릴게임매거진',
    description:
      '회전하는 릴 드럼과 심볼, 페이라인의 개념을 바탕으로 릴게임의 정의와 기본 구조를 명확히 설명합니다.',
    image: '/src/assets/images/hero_reel_archive_1795676703367.jpg'
  },
  'rng-and-gamblers-fallacy': {
    title: 'RNG(난수 발생기)와 도박사의 오류 | 릴게임매거진',
    description:
      '디지털 릴게임의 난수 생성 원리를 설명하고, 공략법이나 연타 패턴이 수학적으로 성립할 수 없는 이유를 정리했습니다.',
    image: '/src/assets/images/mechanism_diagram_art_1795676704532.jpg'
  },
  'reel-vs-slot-vs-pachislot': {
    title: '릴게임 vs 슬롯머신 vs 파치슬로 구조 비교 | 릴게임매거진',
    description:
      '국내 릴게임, 카지노 슬롯머신, 일본 파치슬로의 기원과 조작 방식, 적용 법률의 차이를 표로 비교합니다.',
    image: '/src/assets/images/theme_maritime_illustration_1795676703922.jpg'
  },
  'game-industry-act-classification': {
    title: '게임산업법과 게임물 등급분류 제도 해설 | 릴게임매거진',
    description:
      '「게임산업진흥에 관한 법률」상 사행성 게임물의 기준과 게임물관리위원회 등급분류 제도를 공식 자료 기준으로 정리했습니다.',
    image: '/src/assets/images/law_safety_editorial_1795676705013.jpg'
  },
  'recognizing-illegal-online-sites': {
    title: '불법 온라인 릴게임 사이트 위험성과 피해 예방법 | 릴게임매거진',
    description:
      '무설치·보너스를 내세운 불법 사설 사이트의 악성코드·금전 사기 위험 유형과 신고·상담 절차를 안내합니다.',
    image: '/src/assets/images/law_safety_editorial_1795676705013.jpg'
  },
  'korean-arcade-history-2000s': {
    title: '2000년대 한국 아케이드 게임장과 릴게임 규제 변천사 | 릴게임매거진',
    description:
      '고전 과일 슬롯에서 화면형 아케이드의 확산, 2006년 제도 대개편에 이르는 국내 릴게임 역사의 주요 전환점을 살펴봅니다.',
    image: '/src/assets/images/arcade_history_archive_1795676704080.jpg'
  }
};

export function normalizePathname(pathname: string): string {
  const clean = pathname.split('?')[0].split('#')[0] || '/';
  if (clean === '/') return '/';
  return clean.endsWith('/') ? clean : `${clean}/`;
}

export function getRouteSeoMeta(pathname: string): RouteSeoMeta {
  const path = normalizePathname(pathname);

  if (path === '/') {
    return {
      title: '릴게임 | 핵심 구조 리포트',
      description:
        '릴게임의 회전 드럼·심볼·페이라인 구조와 난수(RNG) 작동 원리부터 8종 게임 백과, 한국 아케이드 역사, 국내 법률·규제 및 이용자 안전정보까지 한눈에 정리한 리포트입니다.',
      canonicalPath: '/',
      robots: 'index, follow',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      breadcrumbs: [{ name: '홈', path: '/' }]
    };
  }

  if (path === '/guide/') {
    return {
      title: '릴게임 가이드 | 뜻·작동 원리·RNG·슬롯 비교 - 릴게임매거진',
      description:
        '릴게임이란 무엇인가? 릴과 페이라인 구조, 난수 발생기(RNG) 원리, 도박사의 오류, 슬롯머신 및 파치슬로와의 차이점을 체계적으로 해설합니다.',
      canonicalPath: '/guide/',
      robots: 'index, follow',
      ogType: 'article',
      ogImage: '/src/assets/images/mechanism_diagram_art_1795676704532.jpg',
      breadcrumbs: [
        { name: '홈', path: '/' },
        { name: '릴게임 가이드', path: '/guide/' }
      ],
      articleDate: '2026-11-25'
    };
  }

  if (path === '/games/') {
    return {
      title: '릴게임 백과 | 바다이야기·야마토·체리마스터 등 8종 정리 - 릴게임매거진',
      description:
        '바다이야기, 오션파라다이스, 야마토, 체리마스터, 황금성, 알라딘, 신천지, 손오공 등 대표 릴게임 8종의 테마, 심볼, 배경과 주의사항을 한곳에서 살펴보세요.',
      canonicalPath: '/games/',
      robots: 'index, follow',
      ogType: 'website',
      ogImage: '/src/assets/images/theme_maritime_illustration_1795676703922.jpg',
      breadcrumbs: [
        { name: '홈', path: '/' },
        { name: '게임 백과', path: '/games/' }
      ]
    };
  }

  if (path.startsWith('/games/')) {
    const slug = path.replace('/games/', '').replace(/\/$/, '');
    const gameMeta = GAME_SEO_MAP[slug];
    if (gameMeta) {
      return {
        title: gameMeta.title,
        description: gameMeta.description,
        canonicalPath: `/games/${slug}/`,
        robots: 'index, follow',
        ogType: 'article',
        ogImage: gameMeta.image,
        breadcrumbs: [
          { name: '홈', path: '/' },
          { name: '게임 백과', path: '/games/' },
          { name: gameMeta.name, path: `/games/${slug}/` }
        ],
        articleDate: '2026-11-25'
      };
    }
  }

  if (path === '/history/') {
    return {
      title: '한국 릴게임 역사 | 기계식 슬롯부터 제도 개편까지 연대기 - 릴게임매거진',
      description:
        '초기 기계식 슬롯의 유입, 화면형 릴게임의 등장, 2000년대 게임장 문화와 2006년 게임산업법 정비 과정을 공신력 있는 기록 중심으로 정리했습니다.',
      canonicalPath: '/history/',
      robots: 'index, follow',
      ogType: 'article',
      ogImage: '/src/assets/images/arcade_history_archive_1795676704080.jpg',
      breadcrumbs: [
        { name: '홈', path: '/' },
        { name: '릴게임 역사', path: '/history/' }
      ],
      articleDate: '2026-11-25'
    };
  }

  if (path === '/regulation/') {
    return {
      title: '릴게임 법률 및 규제 | 게임산업법·등급분류·환전 금지 - 릴게임매거진',
      description:
        '「게임산업진흥에 관한 법률」상 사행성 게임물 기준, 게임물관리위원회 등급분류 조회 방법, 경품·환전 금지 규정을 공식 법령 기준으로 안내합니다.',
      canonicalPath: '/regulation/',
      robots: 'index, follow',
      ogType: 'article',
      ogImage: '/src/assets/images/law_safety_editorial_1795676705013.jpg',
      breadcrumbs: [
        { name: '홈', path: '/' },
        { name: '법률 및 규제', path: '/regulation/' }
      ],
      articleDate: '2026-11-25'
    };
  }

  if (path === '/safety/') {
    return {
      title: '이용자 안전정보 | 불법 사이트 식별·피해 예방·1336 상담 - 릴게임매거진',
      description:
        '불법 온라인 릴게임 사이트의 악성코드·금전 사기 위험을 식별하는 기준과 한국도박문제예방치유원(1336), 경찰청(182) 등 공식 지원 안내를 확인하세요.',
      canonicalPath: '/safety/',
      robots: 'index, follow',
      ogType: 'article',
      ogImage: '/src/assets/images/law_safety_editorial_1795676705013.jpg',
      breadcrumbs: [
        { name: '홈', path: '/' },
        { name: '이용자 안전정보', path: '/safety/' }
      ],
      articleDate: '2026-11-25'
    };
  }

  if (path === '/glossary/') {
    return {
      title: '릴게임 용어 사전 | 릴·페이라인·RNG·RTP·등급분류 정리 - 릴게임매거진',
      description:
        '릴, 페이라인, RNG(난수 발생기), RTP(환수율), 와일드·스캐터 심볼, 도박사의 오류, 등급분류 등 릴게임 이해에 필수적인 용어를 알기 쉽게 정리했습니다.',
      canonicalPath: '/glossary/',
      robots: 'index, follow',
      ogType: 'website',
      ogImage: '/src/assets/images/mechanism_diagram_art_1795676704532.jpg',
      breadcrumbs: [
        { name: '홈', path: '/' },
        { name: '용어 사전', path: '/glossary/' }
      ]
    };
  }

  if (path === '/faq/') {
    return {
      title: '자주 묻는 질문 (FAQ) | 릴게임 개념·확률·규제·안전 - 릴게임매거진',
      description:
        '릴게임의 뜻과 작동 방식, 슬롯머신과의 차이, RNG 확률 구조, 국내 법적 규제, 불법 사이트 주의사항 등 자주 묻는 질문과 답변을 모았습니다.',
      canonicalPath: '/faq/',
      robots: 'index, follow',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      breadcrumbs: [
        { name: '홈', path: '/' },
        { name: '자주 묻는 질문', path: '/faq/' }
      ]
    };
  }

  if (path === '/articles/') {
    return {
      title: '에디토리얼 아티클 | 릴게임 심층 리포트·비교·법령 해설 - 릴게임매거진',
      description:
        '릴게임의 작동 원리, 슬롯머신 비교, 한국 게임장 역사와 법령 해설, 불법 사이트 피해 예방법까지 심층 아티클을 읽어보세요.',
      canonicalPath: '/articles/',
      robots: 'index, follow',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      breadcrumbs: [
        { name: '홈', path: '/' },
        { name: '아티클', path: '/articles/' }
      ]
    };
  }

  if (path.startsWith('/articles/')) {
    const slug = path.replace('/articles/', '').replace(/\/$/, '');
    const articleMeta = ARTICLE_SEO_MAP[slug];
    if (articleMeta) {
      return {
        title: articleMeta.title,
        description: articleMeta.description,
        canonicalPath: `/articles/${slug}/`,
        robots: 'index, follow',
        ogType: 'article',
        ogImage: articleMeta.image,
        breadcrumbs: [
          { name: '홈', path: '/' },
          { name: '아티클', path: '/articles/' },
          { name: articleMeta.title.split(' | ')[0], path: `/articles/${slug}/` }
        ],
        articleDate: '2026-11-25'
      };
    }
  }

  if (path === '/privacy/') {
    return {
      title: '개인정보처리방침 | 릴게임매거진',
      description: '릴게임매거진 정보 매거진 웹사이트의 개인정보 처리 및 보호 방침을 안내합니다.',
      canonicalPath: '/privacy/',
      robots: 'index, follow',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      breadcrumbs: [
        { name: '홈', path: '/' },
        { name: '개인정보처리방침', path: '/privacy/' }
      ]
    };
  }

  if (path === '/terms/') {
    return {
      title: '이용약관 | 릴게임매거진',
      description: '릴게임매거진 디지털 정보 매거진의 이용 조건 및 콘텐츠 저작권 안내입니다.',
      canonicalPath: '/terms/',
      robots: 'index, follow',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      breadcrumbs: [
        { name: '홈', path: '/' },
        { name: '이용약관', path: '/terms/' }
      ]
    };
  }

  if (path === '/disclaimer/') {
    return {
      title: '면책 및 정보 안내 | 릴게임매거진',
      description:
        '릴게임매거진의 정보 중립성 원칙, 출처 표기 정책, 법률 정보의 한계 및 비홍보 선언을 안내합니다.',
      canonicalPath: '/disclaimer/',
      robots: 'index, follow',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      breadcrumbs: [
        { name: '홈', path: '/' },
        { name: '면책 및 정보 안내', path: '/disclaimer/' }
      ]
    };
  }

  return {
    title: '페이지를 찾을 수 없습니다 (404) | 릴게임매거진',
    description: '요청하신 페이지를 찾을 수 없습니다. 릴게임매거진의 주요 메뉴로 이동해 주세요.',
    canonicalPath: path,
    robots: 'noindex, nofollow',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    breadcrumbs: [{ name: '홈', path: '/' }],
    is404: true
  };
}

export function buildStructuredDataJson(meta: RouteSeoMeta, baseUrl: string, faqs?: { question: string; answer: string }[]): string {
  const origin = baseUrl.replace(/\/$/, '');
  const fullUrl = `${origin}${meta.canonicalPath}`;
  const fullImage = `${origin}${meta.ogImage}`;

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: '릴게임매거진',
      url: origin,
      description: '릴게임 기초 지식, 게임 백과, 역사, 국내 법률 및 이용자 안전 정보를 제공하는 디지털 정보 매거진'
    },
    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: origin,
      name: '릴게임매거진',
      inLanguage: 'ko-KR',
      publisher: { '@id': `${origin}/#organization` }
    },
    {
      '@type': meta.ogType === 'article' ? 'Article' : 'WebPage',
      '@id': `${fullUrl}#webpage`,
      url: fullUrl,
      name: meta.title,
      headline: meta.title,
      description: meta.description,
      inLanguage: 'ko-KR',
      isPartOf: { '@id': `${origin}/#website` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: fullImage
      },
      ...(meta.articleDate
        ? {
            datePublished: meta.articleDate,
            dateModified: meta.articleDate,
            author: { '@id': `${origin}/#organization` },
            publisher: { '@id': `${origin}/#organization` }
          }
        : {})
    }
  ];

  if (meta.breadcrumbs.length > 0 && !meta.is404) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: meta.breadcrumbs.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: `${origin}${item.path}`
      }))
    });
  }

  if (faqs && faqs.length > 0 && !meta.is404) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph
  });
}

export const ALL_INDEXABLE_PATHS: string[] = [
  '/',
  '/guide/',
  '/games/',
  '/games/badaiyagi/',
  '/games/ocean-paradise/',
  '/games/yamato/',
  '/games/cherry-master/',
  '/games/hwanggeumseong/',
  '/games/aladdin/',
  '/games/sincheonji/',
  '/games/sonogong/',
  '/history/',
  '/regulation/',
  '/safety/',
  '/glossary/',
  '/faq/',
  '/articles/',
  '/articles/what-is-reel-game/',
  '/articles/rng-and-gamblers-fallacy/',
  '/articles/reel-vs-slot-vs-pachislot/',
  '/articles/game-industry-act-classification/',
  '/articles/recognizing-illegal-online-sites/',
  '/articles/korean-arcade-history-2000s/',
  '/privacy/',
  '/terms/',
  '/disclaimer/'
];

export interface SitemapImageEntry {
  locPath: string;
  title: string;
}

const SITEMAP_PRIMARY_IMAGES: Record<string, SitemapImageEntry> = {
  '/': {
    locPath: '/src/assets/images/hero_reel_archive_1795676703367.jpg',
    title: '릴게임매거진 — 고전 기계식 릴 드럼 전시 사진'
  },
  '/guide/': {
    locPath: '/src/assets/images/mechanism_diagram_art_1795676704532.jpg',
    title: '릴 드럼 회전 구조와 페이라인 개념 도해'
  },
  '/games/badaiyagi/': {
    locPath: '/src/assets/images/theme_maritime_illustration_1795676703922.jpg',
    title: '해양 테마 릴게임 문헌 해설 에디토리얼 일러스트'
  },
  '/history/': {
    locPath: '/src/assets/images/arcade_history_archive_1795676704080.jpg',
    title: '20세기 후반 아케이드 게임장 문화 아카이브 사진'
  },
  '/regulation/': {
    locPath: '/src/assets/images/law_safety_editorial_1795676705013.jpg',
    title: '게임산업법 등급분류 및 이용자 보호 에디토리얼 정물'
  }
};

const ROUTE_LASTMOD_MAP: Record<string, string> = {
  '/': '2026-11-25',
  '/guide/': '2026-11-25',
  '/games/': '2026-11-25',
  '/history/': '2026-11-25',
  '/regulation/': '2026-11-25',
  '/safety/': '2026-11-25',
  '/glossary/': '2026-11-25',
  '/faq/': '2026-11-25',
  '/articles/': '2026-11-25',
  '/privacy/': '2026-11-25',
  '/terms/': '2026-11-25',
  '/disclaimer/': '2026-11-25'
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildSitemapXml(baseUrl: string): string {
  const origin = baseUrl.replace(/\/$/, '');
  const uniquePaths = Array.from(new Set(ALL_INDEXABLE_PATHS.map((p) => normalizePathname(p))));
  const seenImages = new Set<string>();

  const urlNodes = uniquePaths
    .filter((routePath) => {
      const meta = getRouteSeoMeta(routePath);
      return !meta.is404 && meta.robots === 'index, follow' && meta.canonicalPath === routePath;
    })
    .map((routePath) => {
      const meta = getRouteSeoMeta(routePath);
      const lastmod = meta.articleDate || ROUTE_LASTMOD_MAP[routePath] || '2026-11-25';
      const changefreq =
        routePath === '/' || routePath === '/games/' || routePath === '/articles/'
          ? 'weekly'
          : routePath === '/privacy/' || routePath === '/terms/' || routePath === '/disclaimer/'
            ? 'yearly'
            : 'monthly';
      const priority =
        routePath === '/'
          ? '1.0'
          : routePath === '/guide/' ||
              routePath === '/games/' ||
              routePath === '/regulation/' ||
              routePath === '/safety/'
            ? '0.9'
            : routePath.startsWith('/games/') ||
                routePath === '/history/' ||
                routePath === '/glossary/' ||
                routePath === '/faq/' ||
                routePath === '/articles/'
              ? '0.8'
              : routePath.startsWith('/articles/')
                ? '0.7'
                : '0.4';

      const imageEntry = SITEMAP_PRIMARY_IMAGES[routePath];
      let imageBlock = '';
      if (imageEntry && !seenImages.has(imageEntry.locPath)) {
        seenImages.add(imageEntry.locPath);
        imageBlock = `\n    <image:image>\n      <image:loc>${escapeXml(`${origin}${imageEntry.locPath}`)}</image:loc>\n      <image:title>${escapeXml(imageEntry.title)}</image:title>\n    </image:image>`;
      }

      return `  <url>\n    <loc>${escapeXml(`${origin}${routePath}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>${imageBlock}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urlNodes}\n</urlset>\n`;
}

export function buildRobotsTxt(baseUrl: string): string {
  const origin = baseUrl.replace(/\/$/, '');
  return `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
}

