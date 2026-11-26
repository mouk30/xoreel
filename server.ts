import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  buildRobotsTxt,
  buildSitemapXml,
  buildStructuredDataJson,
  getRouteSeoMeta,
  normalizePathname
} from './src/data/seoMeta.ts';
import { getGameBySlug } from './src/data/gamesData.ts';
import { GENERAL_FAQS } from './src/data/editorialData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const HOST_HEADER_PATTERN = /^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?(?::\d{1,5})?$/i;

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function parseConfiguredOrigin(): string | null {
  const candidates = [
    process.env.SITE_URL,
    process.env.CANONICAL_URL,
    process.env.APP_URL
  ];

  for (const raw of candidates) {
    const trimmed = raw?.trim();
    if (!trimmed || trimmed === 'MY_APP_URL') continue;
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return parsed.origin;
      }
    } catch {
      // Ignore invalid env value and try next candidate
    }
  }
  return null;
}

function isSafeHost(rawHost: string): boolean {
  if (!rawHost || rawHost.length > 253 || rawHost.includes('..')) {
    return false;
  }
  if (!HOST_HEADER_PATTERN.test(rawHost)) {
    return false;
  }
  const allowListRaw = process.env.ALLOWED_HOSTS?.trim();
  if (allowListRaw) {
    const allowed = allowListRaw
      .split(',')
      .map((h) => h.trim().toLowerCase())
      .filter(Boolean);
    const hostnameOnly = rawHost.split(':')[0].toLowerCase();
    return allowed.includes(rawHost.toLowerCase()) || allowed.includes(hostnameOnly);
  }
  return true;
}

function resolveCanonicalOrigin(req: express.Request): string {
  const configuredOrigin = parseConfiguredOrigin();
  if (configuredOrigin) {
    return configuredOrigin;
  }

  const forwardedProto = req.headers['x-forwarded-proto'];
  const protoToken = Array.isArray(forwardedProto)
    ? forwardedProto[0]
    : (forwardedProto || req.protocol || 'http').split(',')[0].trim().toLowerCase();
  const safeProto = protoToken === 'https' || protoToken === 'http' ? protoToken : 'http';

  const forwardedHost = req.headers['x-forwarded-host'];
  const rawForwardedHost = Array.isArray(forwardedHost)
    ? forwardedHost[0]
    : forwardedHost?.split(',')[0].trim();
  const rawHost = req.get('host')?.trim() || '';

  const candidateHost = rawForwardedHost || rawHost;
  if (isSafeHost(candidateHost)) {
    return `${safeProto}://${candidateHost}`;
  }

  return `http://localhost:${PORT}`;
}

function resolveTrustProxySetting(): string | number {
  const raw = process.env.TRUST_PROXY?.trim();
  if (!raw) return 1;
  if (raw === 'true') return 1;
  const parsed = Number(raw);
  if (!Number.isNaN(parsed) && parsed >= 0) return parsed;
  return raw;
}

function injectRouteSeo(html: string, reqPath: string, origin: string): { html: string; status: number } {
  const normalized = normalizePathname(reqPath);
  const meta = getRouteSeoMeta(normalized);
  const canonicalUrl = `${origin}${meta.canonicalPath}`;
  const fullImage = `${origin}${meta.ogImage}`;

  let faqs: { question: string; answer: string }[] | undefined;
  if (normalized === '/') {
    faqs = GENERAL_FAQS.slice(0, 7);
  } else if (normalized === '/faq/') {
    faqs = GENERAL_FAQS;
  } else if (normalized.startsWith('/games/') && normalized !== '/games/') {
    const slug = normalized.replace('/games/', '').replace(/\/$/, '');
    const game = getGameBySlug(slug);
    if (game) faqs = game.faqs;
  }

  const jsonLd = buildStructuredDataJson(meta, origin, faqs).replace(/</g, '\\u003c');
  const titleEscaped = escapeAttr(meta.title);
  const descEscaped = escapeAttr(meta.description);

  let updated = html;
  updated = updated.replace(/<title>[\s\S]*?<\/title>/, `<title>${titleEscaped}</title>`);
  updated = updated.replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${descEscaped}" />`
  );
  updated = updated.replace(
    /<meta\s+name="robots"[\s\S]*?\/>/,
    `<meta name="robots" content="${meta.robots}" />`
  );
  updated = updated.replace(
    '<!-- SSR_CANONICAL -->',
    `<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`
  );
  updated = updated.replace(
    '<!-- SSR_OG_URL -->',
    `<meta property="og:url" content="${escapeAttr(canonicalUrl)}" />`
  );
  updated = updated.replace(
    /<meta\s+property="og:type"[\s\S]*?\/>/,
    `<meta property="og:type" content="${meta.ogType}" />`
  );
  updated = updated.replace(
    /<meta\s+property="og:title"[\s\S]*?\/>/,
    `<meta property="og:title" content="${titleEscaped}" />`
  );
  updated = updated.replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${descEscaped}" />`
  );
  updated = updated.replace(
    /<meta\s+property="og:image"[\s\S]*?\/>/,
    `<meta property="og:image" content="${escapeAttr(fullImage)}" />`
  );
  updated = updated.replace(
    /<meta\s+name="twitter:title"[\s\S]*?\/>/,
    `<meta name="twitter:title" content="${titleEscaped}" />`
  );
  updated = updated.replace(
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${descEscaped}" />`
  );
  updated = updated.replace(
    /<meta\s+name="twitter:image"[\s\S]*?\/>/,
    `<meta name="twitter:image" content="${escapeAttr(fullImage)}" />`
  );
  updated = updated.replace(
    '<!-- SSR_JSON_LD -->',
    `<script type="application/ld+json" id="rz-jsonld">${jsonLd}</script>`
  );

  return {
    html: updated,
    status: meta.is404 ? 404 : 200
  };
}

async function startServer() {
  const app = express();
  app.set('trust proxy', resolveTrustProxySetting());
  app.disable('x-powered-by');

  app.get('/robots.txt', (req, res) => {
    const origin = resolveCanonicalOrigin(req);
    res
      .status(200)
      .set({
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff'
      })
      .send(buildRobotsTxt(origin));
  });

  app.get(['/sitemap.xml', '/sitemap.xml/'], (req, res) => {
    const origin = resolveCanonicalOrigin(req);
    res
      .status(200)
      .set({
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff'
      })
      .send(buildSitemapXml(origin));
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });

    app.use(vite.middlewares);

    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      if (url.includes('.') && !url.endsWith('.html')) {
        return next();
      }
      try {
        const templatePath = path.resolve(__dirname, 'index.html');
        const rawTemplate = fs.readFileSync(templatePath, 'utf-8');
        const transformed = await vite.transformIndexHtml(url, rawTemplate);
        const origin = resolveCanonicalOrigin(req);
        const { html, status } = injectRouteSeo(transformed, req.path, origin);
        res.status(status).set({ 'Content-Type': 'text/html; charset=utf-8' }).send(html);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    const prodTemplate = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8');

    app.use(express.static(distDir, { index: false }));

    app.get('*', (req, res) => {
      const origin = resolveCanonicalOrigin(req);
      const { html, status } = injectRouteSeo(prodTemplate, req.path, origin);
      res.status(status).set({ 'Content-Type': 'text/html; charset=utf-8' }).send(html);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`릴게임매거진 server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
