# Quickstart: Workslate AI Marketing Site

## Prerequisites

- Supported Node.js LTS version and npm.
- Static hosting configured for `dist/`, Brotli/gzip, immutable caching for hashed
  assets, HTML revalidation, and redirect from `www.workslate.ai` to `workslate.ai`.

## Local development

```powershell
npm install
npm run dev
```

Open the Vite URL and verify the header, section links, and CTAs reach their existing
anchors, including the Developers section at `#docs`.

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
- Playwright verifies navigation and layout at 360px, 768px, 1024px, and 1536px,
  without horizontal overflow.
- Axe checks report no serious or critical accessibility violations; manually
  inspect keyboard use, reduced motion, and diagram descriptions.

## Lighthouse CI

Run the mobile Lighthouse CI workflow against the production build. The merge gate
requires >= 0.90 for Performance, Accessibility, Best Practices, and SEO. Enforce
LCP < 2000ms, CLS < 0.05, TBT < 150ms, and JavaScript < 100KB gzip. The same 0.90
threshold is the feature acceptance criterion; record pass or fail per category.

## SEO and content validation

Verify the canonical URL, Open Graph URL, and sitemap use `https://workslate.ai/`;
robots.txt references `https://workslate.ai/sitemap.xml`; the page has exactly one
`h1`; all requested JSON-LD types are in the prerendered document; FAQ JSON-LD
matches visible FAQ content; dashboard values are labeled simulated; and Web3j
integration is described as planned, not currently supported.
