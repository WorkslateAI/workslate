# Quickstart: Workslate AI Marketing Site

## Prerequisites

- Supported Node.js LTS version and npm.
- Deployed to **Vercel**: `dist/` static output with Brotli/gzip, immutable
  caching for hashed assets, HTML revalidation, and a redirect from
  `www.workslate.ai` to `workslate.ai`. Deploys run from `ci.yml` via the
  `VERCEL_DEPLOY_HOOK_URL` secret after tests, build, JS budget, and e2e pass on
  `main`.

## Local development

```powershell
npm install
npm run dev
```

Open the Vite URL and verify the header, section links, and CTAs reach their existing
anchors (`#home`, `#how-it-works`, `#global`, `#features`, `#feature-01`–`#feature-04`,
`#prompt`, `#footer`) and that the Docs link opens the field-guide page at `#/docs`
with working search (Ctrl/Cmd+K or `/`).

## Production and test checks

```powershell
npm run test
npm run build
npm run preview
npm run test:e2e
```

Expected outcomes:

- Unit/component tests pass.
- Production output contains prerendered headings, copy, FAQ answers, metadata, and
  structured data.
- Playwright verifies navigation, the home ↔ `#/docs` route transition, and layout
  at 360px, 768px, 1024px, and 1536px, without horizontal overflow.
- Axe checks report no serious or critical accessibility violations; manually
  inspect keyboard use, reduced motion, and diagram descriptions.

## Lighthouse CI

Run the mobile Lighthouse CI workflow against the production build. The merge gate
requires >= 0.85 for Performance, Accessibility, Best Practices, and SEO. Enforce
LCP < 2000ms, CLS < 0.05, TBT < 150ms, and JavaScript < 100KB gzip. The same 0.85
threshold is the feature acceptance criterion; record pass or fail per category.

## SEO and content validation

Verify the canonical URL, Open Graph URL, and sitemap use `https://workslate.ai/`;
robots.txt references `https://workslate.ai/sitemap.xml`; the page has exactly one
`h1`; all requested JSON-LD types are in the prerendered document; FAQ JSON-LD
matches visible FAQ content; and Web3j integration is described as planned, not
currently supported.

## Post-deploy verification

```powershell
node scripts/check-www-redirect.mjs   # www.workslate.ai -> workslate.ai 301
```

Also confirm `https://workslate.ai/docs.html`, `/privacy.html`, `/terms.html`,
and `/cookies.html` resolve, and that `sitemap.xml` URLs match the live pages.
