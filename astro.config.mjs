import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Integração de sitemap compatível com Astro 4.x
function elefefSitemap() {
  const SITE = 'https://elefef.com.br';
  return {
    name: 'elefef-sitemap',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const urls = pages
          .filter(p => !p.pathname.match(/^(404|500)/))
          .map(p => {
            const path = p.pathname.replace(/\/?$/, '/');
            const loc = path === '/' ? SITE + '/' : SITE + '/' + path.replace(/^\//, '');
            const priority = p.pathname === '' ? '1.0' : p.pathname.startsWith('blog/') ? '0.7' : '0.8';
            return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
          });
        const urlset = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          '</urlset>',
        ].join('\n');
        const index = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          `  <sitemap><loc>${SITE}/sitemap-0.xml</loc></sitemap>`,
          '</sitemapindex>',
        ].join('\n');
        const outDir = fileURLToPath(dir);
        await writeFile(outDir + 'sitemap-0.xml', urlset, 'utf-8');
        await writeFile(outDir + 'sitemap-index.xml', index, 'utf-8');
        console.log(`[@elefef/sitemap] sitemap-index.xml criado (${pages.length} URLs)`);
      },
    },
  };
}

export default defineConfig({
  site: 'https://elefef.com.br',
  output: 'static',
  integrations: [
    elefefSitemap(),
    tailwind({ applyBaseStyles: false }),
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
