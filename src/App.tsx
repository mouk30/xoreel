/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useCallback, useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { GuidePage } from './pages/GuidePage';
import { GamesIndexPage } from './pages/GamesIndexPage';
import { GameDetailPage } from './pages/GameDetailPage';
import { HistoryPage } from './pages/HistoryPage';
import { RegulationPage } from './pages/RegulationPage';
import { SafetyPage } from './pages/SafetyPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { FaqPage } from './pages/FaqPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { PolicyPage } from './pages/PolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { getGameBySlug } from './data/gamesData';
import { ARTICLES_DATA, GENERAL_FAQS } from './data/editorialData';
import {
  buildStructuredDataJson,
  CANONICAL_SITE_ORIGIN,
  getRouteSeoMeta,
  normalizePathname
} from './data/seoMeta';

function upsertMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLinkTag(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePathname(window.location.pathname)
  );

  const navigate = useCallback((target: string) => {
    const [rawPath, hashPart] = target.split('#');
    const normalized = normalizePathname(rawPath || '/');
    const finalUrl = hashPart ? `${normalized}#${hashPart}` : normalized;

    if (window.location.pathname + window.location.hash !== finalUrl) {
      window.history.pushState({}, '', finalUrl);
    }
    setCurrentPath(normalized);

    if (hashPart) {
      window.setTimeout(() => {
        const el = document.getElementById(hashPart);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const normalized = normalizePathname(window.location.pathname);
      setCurrentPath(normalized);
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        window.setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const meta = getRouteSeoMeta(currentPath);
    const origin = (import.meta.env.VITE_SITE_URL || CANONICAL_SITE_ORIGIN).replace(/\/$/, '');
    const canonicalUrl = `${origin}${meta.canonicalPath}`;
    const fullImage = `${origin}${meta.ogImage}`;

    document.title = meta.title;
    upsertMetaTag('name', 'description', meta.description);
    upsertMetaTag('name', 'robots', meta.robots);
    upsertLinkTag('canonical', canonicalUrl);

    upsertMetaTag('property', 'og:type', meta.ogType);
    upsertMetaTag('property', 'og:title', meta.title);
    upsertMetaTag('property', 'og:description', meta.description);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:image', fullImage);

    upsertMetaTag('name', 'twitter:title', meta.title);
    upsertMetaTag('name', 'twitter:description', meta.description);
    upsertMetaTag('name', 'twitter:image', fullImage);

    let faqs: { question: string; answer: string }[] | undefined;
    if (currentPath === '/') {
      faqs = GENERAL_FAQS.slice(0, 7);
    } else if (currentPath === '/faq/') {
      faqs = GENERAL_FAQS;
    } else if (currentPath.startsWith('/games/') && currentPath !== '/games/') {
      const slug = currentPath.replace('/games/', '').replace(/\/$/, '');
      const game = getGameBySlug(slug);
      if (game) faqs = game.faqs;
    }

    const jsonLd = buildStructuredDataJson(meta, origin, faqs);
    let scriptEl = document.getElementById('rz-jsonld') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'rz-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = jsonLd;
  }, [currentPath]);

  const renderPage = () => {
    if (currentPath === '/') {
      return <HomePage onNavigate={navigate} />;
    }
    if (currentPath === '/guide/') {
      return <GuidePage onNavigate={navigate} />;
    }
    if (currentPath === '/games/') {
      return <GamesIndexPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/games/')) {
      const slug = currentPath.replace('/games/', '').replace(/\/$/, '');
      if (getGameBySlug(slug)) {
        return <GameDetailPage slug={slug} onNavigate={navigate} />;
      }
      return <NotFoundPage onNavigate={navigate} />;
    }
    if (currentPath === '/history/') {
      return <HistoryPage onNavigate={navigate} />;
    }
    if (currentPath === '/regulation/') {
      return <RegulationPage onNavigate={navigate} />;
    }
    if (currentPath === '/safety/') {
      return <SafetyPage onNavigate={navigate} />;
    }
    if (currentPath === '/glossary/') {
      return <GlossaryPage onNavigate={navigate} />;
    }
    if (currentPath === '/faq/') {
      return <FaqPage onNavigate={navigate} />;
    }
    if (currentPath === '/articles/') {
      return <ArticlesPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/articles/')) {
      const slug = currentPath.replace('/articles/', '').replace(/\/$/, '');
      if (ARTICLES_DATA.some((a) => a.slug === slug)) {
        return <ArticlesPage slug={slug} onNavigate={navigate} />;
      }
      return <NotFoundPage onNavigate={navigate} />;
    }
    if (currentPath === '/privacy/') {
      return <PolicyPage type="privacy" onNavigate={navigate} />;
    }
    if (currentPath === '/terms/') {
      return <PolicyPage type="terms" onNavigate={navigate} />;
    }
    if (currentPath === '/disclaimer/') {
      return <PolicyPage type="disclaimer" onNavigate={navigate} />;
    }

    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <Layout currentPath={currentPath} onNavigate={navigate}>
      {renderPage()}
    </Layout>
  );
}
