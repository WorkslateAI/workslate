# Implementation Plan: Workslate AI Marketing Site

**Branch**: `001-workslate-marketing-site` | **Date**: 2026-10-22 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification and the Vite/React/Tailwind, component, SEO,
prerendering, performance, testing, and CI requirements provided by the user.

## Summary

Create a responsive, single-page Workslate AI marketing site based on
`design/Workslate–SinglePage.png`. Use Vite, React 18, TypeScript, and Tailwind CSS,
without client-side routing. Build typed, reusable visual components and separate
typed page content; prerender the complete HTML for crawlers; include SEO metadata,
JSON-LD, sitemap, and robots directives; and verify usability, accessibility,
responsive layouts, and Lighthouse performance through automated tests and CI.

## Technical Context

**Language/Version**: TypeScript with React 18; Node.js LTS compatible with the
selected Vite release.

**Primary Dependencies**: Vite, React 18, Tailwind CSS with its Vite plugin,
vite-plugin-svgr (SVGR) with SVGO, vite-react-ssg single-page mode, react-helmet-async, Fuse.js (Docs search), sharp (image pipeline), Vitest, React Testing Library,
Playwright, and @axe-core/playwright.

**Storage**: None. Typed content and example values are static source data.

**Testing**: Vitest and React Testing Library for component behavior; Playwright for
responsive and end-to-end checks; axe scans in Playwright; Lighthouse CI in GitHub
Actions.

**Target Platform**: Prerendered static site deployed at `https://workslate.ai`.
Hosting provider remains unspecified. Production hosting must serve Brotli/gzip,
cache hashed assets for a long duration, revalidate HTML, and redirect the `www`
host to the canonical apex domain.

**Project Type**: Single-page marketing site using native fragment navigation; no
router.

**Performance Goals**: Lighthouse CI merge-blocking minimum 0.85 in Performance,
Accessibility, Best Practices, and SEO. This single 0.85 threshold is both the
feature acceptance criterion (FR-017, SC-003) and the CI gate, consistent with the
constitution. Numeric targets are LCP < 2.0 seconds, CLS < 0.05,
TBT < 150ms, and JavaScript < 100KB gzip.

**Constraints**: Mobile-first design at 360, 768, 1024, and 1536px; functional React
components; inline SVG artwork with explicit dimensions/aspect ratios for icons,
logos, and badges; optimized responsive raster (AVIF/WebP/JPEG srcset) for hero,
banner, and feature illustrations; typed content
in `src/content`; one self-hosted variable font subset with `font-display: swap` and
preload; critical CSS inline; CSS-only motion that respects
`prefers-reduced-motion`; no heavy chart or animation libraries. Complete
prerendered page content must remain available to crawlers when below-the-fold
sections are code-split with `React.lazy` and `Suspense`. Keep metadata and JSON-LD
outside those boundaries and verify the SSG renderer includes lazy sections in the
final HTML. Web3j integration is roadmap-only and must be labeled as such.

**Scale/Scope**: One public marketing page plus the `#/docs` hash route: Header,
Hero, Business Problem, How It Works, Global, Features (four cards), Prompt, and
Footer, plus the Docs field-guide page with search. Include anchor destinations
`#home`, `#how-it-works`, `#global`, `#features`, `#feature-01` through `#feature-04`,
`#prompt`, and `#footer`. Emit Organization, WebSite,
SoftwareApplication, and FAQPage JSON-LD. Generate sitemap.xml and robots.txt.

## Constitution Check

| Principle | Plan alignment |
|---|---|
| React SPA Architecture | Vite + React 18 + TypeScript; functional components; one page and no router. |
| Typed, Reusable UI | Required atoms, molecules, sections, and typed content modules follow the defined structure. |
| Vector-First Assets | Inline SVG via SVGR for icons, logo, and badges; optimized responsive raster (AVIF/WebP/JPEG srcset) for hero, banner, and feature illustrations per updated FR-012. |
| Mobile-First Responsive Design | Validate at 360, 768, 1024, and 1536px; use fluid type with `clamp()`. |
| Measurable Performance | CI blocks below 0.85 in any category; also measure all specified LCP, CLS, TBT, and gzip-JavaScript budgets. |
| Accessibility, SEO, and Content Integrity | WCAG AA, keyboard operation, diagram labels, one `h1`, prerendered HTML, complete metadata, JSON-LD, and verified product claims. |
| Delivery Quality Gates | Lighthouse CI runs in GitHub Actions as a required merge check. |

The feature spec, the requested Lighthouse CI gate, and the constitution all specify
a minimum score of 0.85. A passing CI gate therefore satisfies the acceptance
criterion; any category below 0.85 fails both.

Hosting and enforcement decisions: the hosting provider is not yet chosen, so the
`www` to apex redirect is an external deployment prerequisite verified by a
post-deploy check script (see tasks). The Lighthouse workflow job is named
`Lighthouse CI` and must be made a required status check in branch protection. Footer
links are limited to in-page anchors until product-approved external URLs are
recorded in the spec.

**Gate result**: PASS. No architecture or governance exception is proposed.

## Project Structure

### Documentation

```text
specs/001-workslate-marketing-site/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/                 # Not needed: no public application API
```

### Source Code

```text
index.html
vite.config.ts
package.json
public/
├── robots.txt
└── sitemap.xml
src/
├── main.tsx
├── App.tsx
├── content/
│   ├── copy.ts
│   ├── navigation.ts
│   ├── chains.ts
│   ├── features.ts
│   ├── types.ts
│   └── faq.ts
├── components/
│   ├── atoms/
│   │   ├── AITextRenderer.tsx
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── GradientText.tsx
│   │   ├── Icon.tsx
│   │   ├── CoinIcon.tsx
│   │   ├── ChainBadge.tsx
│   │   ├── Logo.tsx
│   │   ├── PlayIcon.tsx
│   │   ├── SearchTrigger.tsx
│   │   └── SearchDialog.tsx
│   ├── molecules/
│   │   └── NavLink.tsx
│   ├── sections/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── BusinessProblem.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── SideSection.tsx
│   │   ├── Features.tsx
│   │   ├── PromptSection.tsx
│   │   ├── Developers.tsx      # defined, not mounted on the home route
│   │   ├── FAQ.tsx             # defined, not mounted on the home route
│   │   ├── Pricing.tsx         # defined, not mounted on the home route
│   │   ├── SignIn.tsx          # defined, not mounted on the home route
│   │   ├── GetStarted.tsx      # defined, not mounted on the home route
│   │   └── Footer.tsx
│   └── svg/
│       └── index.ts            # typed SVGR component registry
├── pages/
│   └── Docs.tsx                # Web3j / BPMN / EVM field guide (#/docs hash route)
├── search/
│   ├── docsIndex.ts
│   └── useSiteSearch.ts
├── seo/
│   └── StructuredData.tsx
├── styles/
│   └── global.css
├── vite-env.d.ts
└── assets/
    ├── svg/                    # raw logo, icon, coin, chain sources
    └── fonts/
        └── workslate-variable.woff2
tests/
├── unit/
│   ├── components/
│   ├── pages/
│   └── app.test.tsx
├── e2e/
│   ├── accessibility.spec.ts
│   ├── marketing-site.spec.ts
│   ├── navigation-transition.spec.ts
│   └── responsive.spec.ts
└── setup.ts
.github/
└── workflows/
    ├── ci.yml
    └── lighthouse.yml
lighthouserc.json
```

**Structure Decision**: Use one Vite frontend at repository root. Follow the
constitution's atoms/molecules/sections organization, and keep reusable copy,
navigation, chains, features, and FAQ in `src/content/*.ts`. Below-the-fold home
sections are code-split with `React.lazy`/`Suspense`; the Docs field guide lives
in `src/pages/Docs.tsx` behind the `#/docs` hash route (no router dependency) and
searches `src/search/docsIndex.ts` via Fuse.js. Feature illustrations are
optimized raster assets generated by `scripts/optimize-images.mjs`.

## Phase 0: Research

Selected library and integration decisions are recorded in
[research.md](research.md).

## Phase 1: Design & Contracts

Content entities and validation rules are recorded in [data-model.md](data-model.md).
No external API or public software interface is exposed, so no contract files are
required. Runnable local and CI checks are recorded in [quickstart.md](quickstart.md).

## Complexity Tracking

No constitutional violations or architectural exceptions require justification.
