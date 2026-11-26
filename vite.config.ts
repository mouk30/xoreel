import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';
import {buildRobotsTxt, buildSitemapXml} from './src/data/seoMeta.ts';

const DEFAULT_STATIC_ORIGIN =
  process.env.SITE_URL?.trim() ||
  (process.env.APP_URL?.trim() && process.env.APP_URL.trim() !== 'MY_APP_URL'
    ? process.env.APP_URL.trim()
    : 'https://ais-dev-fz47ofgslmwp5iunusx3ba-266850070721.asia-east1.run.app');

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Also syncs static sitemap.xml & robots.txt in dist/.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
          if (fs.existsSync(distDir)) {
            const origin = DEFAULT_STATIC_ORIGIN.replace(/\/$/, '');
            fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), buildSitemapXml(origin), 'utf-8');
            fs.writeFileSync(path.resolve(distDir, 'robots.txt'), buildRobotsTxt(origin), 'utf-8');
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
