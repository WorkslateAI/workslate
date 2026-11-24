# Research: Workslate AI Marketing Site

## Decision: Use vite-react-ssg single-page mode

**Decision**: Use `vite-react-ssg`'s single-page entry for static rendering; do not
add a client-side router.

**Rationale**: This supports the site's single document and anchor-based navigation
while generating crawlable HTML. The single-page mode avoids the route-based entry's
router dependency.

**Alternatives considered**:

- `vite-plugin-prerender`: a browser snapshot approach with async-render timing
  sensitivity; prefer the single-page SSG integration for this React site.
- Client-only rendering: rejected because crawlers must receive complete HTML.

**Caveat**: Keep Helmet metadata and JSON-LD in synchronously rendered app-shell
components, outside lazy/Suspense boundaries. Validate that all required lazy
sections and their styles are present in the generated HTML; lazy rendering must
not hide SEO or required page content from crawlers.

**Source**: https://github.com/Daydreamer-riri/vite-react-ssg

## Decision: Use react-helmet-async with React 18

**Decision**: Use a root `HelmetProvider` and `react-helmet-async` for title,
description, canonical, Open Graph, and Twitter cards.

**Rationale**: React 19 native metadata is not available on the requested React 18
runtime. Helmet's context must be available to the static renderer so metadata is
included in the prerendered document, not added only after client hydration.

**Source**: https://github.com/staylor/react-helmet-async

## Decision: Use Tailwind CSS's Vite plugin

**Decision**: Use the first-party `@tailwindcss/vite` integration and its CSS-first
theme configuration. Confirm and pin a compatible Tailwind/Vite version pair when
dependencies are added.

**Rationale**: The official Tailwind installation guide recommends its Vite plugin.
This avoids a separate runtime styling library and supports optimized production
CSS.

**Source**: https://tailwindcss.com/docs/installation/using-vite

## Decision: Test with Vitest, Testing Library, Playwright, and axe

**Decision**: Use Vitest and React Testing Library for components and content;
Playwright for navigation and viewport behavior; and `@axe-core/playwright` for
automated accessibility scans.

**Rationale**: This combination tests both user-visible component behavior and the
rendered static page. Axe supplements manual keyboard, diagram-description, and
WCAG review; it is not a complete conformance proof.

**Sources**:

- https://vitest.dev/guide/
- https://testing-library.com/docs/react-testing-library/intro/
- https://playwright.dev/docs/accessibility-testing

## Decision: Use a single 0.85 Lighthouse threshold for CI and acceptance

**Decision**: Set merge-blocking Lighthouse CI minimums to 0.85 for Performance,
Accessibility, Best Practices, and SEO. The feature spec (FR-017, SC-003) and the
constitution specify the same 0.85 minimum, so the CI gate is also the acceptance
criterion.

**Rationale**: All governing artifacts now agree on 0.85, so one threshold removes any
ambiguity about what "passing" means.

**Alternatives considered**:

- Raise the threshold above 0.85: stricter than the spec and constitution require.
- Keep a separate acceptance target: unnecessary now that the values are identical.

Numeric budgets remain independently enforceable: LCP < 2000ms, CLS < 0.05,
TBT < 150ms, and JavaScript < 100KB gzip.

**Source**: https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md

## Decision: Emit all requested structured data types

**Decision**: Render Organization, WebSite, SoftwareApplication, and FAQPage JSON-LD.
Generate FAQPage data from the same typed FAQ records used for visible questions
and answers.

**Rationale**: This meets the site's structured-data requirement and avoids content
drift between the page and JSON-LD. FAQ structured data must not be presented as a
guarantee of Google FAQ rich results.

**Source**: https://developers.google.com/search/docs/appearance/structured-data/search-gallery

## Decision: Use CSS-only motion, inline SVG, and a local variable font

**Decision**: Use inline SVG components with explicit dimensions or aspect ratios,
CSS-only motion respecting `prefers-reduced-motion`, and one licensed self-hosted
variable font subset with `font-display: swap` and preload.

**Rationale**: These choices align with the vector-first constitution, reduce
third-party requests, and avoid heavy chart and animation dependencies. Inline only
the critical CSS needed for the initial viewport; measure document size and
rendering stability.

## Decision: Use deployment compression and hashed-asset caching

**Decision**: Keep Vite's content-hashed asset filenames and configure the static
host/CDN for Brotli with gzip fallback, immutable long-cache headers for hashed
assets, and HTML revalidation.

**Rationale**: Compression and cache policy are deployment concerns; avoid generating
duplicate compressed files unless the selected host requires them.

**Resolution**: The site is deployed to **Vercel**, which provides compression
negotiation, immutable caching for hashed assets, and HTML revalidation out of
the box. Deploys are triggered by the CI workflow via the
`VERCEL_DEPLOY_HOOK_URL` deploy hook; the `www` → apex redirect is configured on
Vercel and verified by `scripts/check-www-redirect.mjs`.

## Addendum: Implementation Updates

### Decision: Serve feature/banner imagery as optimized responsive raster

**Decision**: Hero, banner, and feature-card illustrations ship as raster assets
generated by `scripts/optimize-images.mjs` (sharp) in AVIF/WebP/JPEG at 480/768/
1200/max widths with `<picture>` srcsets; icons, logos, and badges remain inline
SVG via the typed `src/components/svg` registry.

**Rationale**: The supplied marketing illustrations are photographic/artwork
rasters; forcing vector would lose fidelity. The srcset pipeline keeps transfer
sizes within budget (see `performance-report.md`).

### Decision: Docs as a `#/docs` hash route without a router

**Decision**: The Docs field guide (Web3j / BPMN / EVM architecture) renders from
`src/pages/Docs.tsx` behind the `#/docs` hash fragment handled in `App.tsx`; no
client-side router is added. Search uses Fuse.js over `src/search/docsIndex.ts`
via `useSiteSearch`, `SearchTrigger`, and `SearchDialog` (Ctrl/Cmd+K or `/`).

**Rationale**: Preserves the router-free single-page prerender model while giving
Docs its own URL and lazy chunk.

### Decision: Remove the simulated dashboard demo

**Decision**: The dashboard demo (`src/content/dashboard.ts`, `DashboardDemo`,
`StatCard`, `TransactionRow`, `StatusPill`, `FeatureColumns`, `FeatureHeading`,
SVG illustration components) was removed; the Features section now presents four
cards (Multi-Party Ledger Reconciliation, Corporate Wallet Orchestration,
Programmable Settlement Rules, End-to-End Transaction Traceability) with raster
illustrations. The `token-movement-dashboard` assets were renamed to
`token-movement-traceability`.

**Rationale**: Product direction moved the marketing page to the reconciliation/
orchestration feature set; simulated demo data is no longer presented.

### Decision: Static companion pages for Docs and legal

**Decision**: Crawlable static HTML pages ship in `public/`: `docs.html` (the
Web3j / BPMN / EVM field-guide companion to the `#/docs` app route, listed in
`sitemap.xml`) and the legal pages `privacy.html`, `terms.html`, and
`cookies.html`.

**Rationale**: Hash routes are not separately crawlable; a static `docs.html`
gives the field guide a canonical URL for the sitemap, and the legal pages
require no JavaScript.

### Decision: Page transitions and deferred hydration

**Decision**: Hash-route swaps (`/` ↔ `/#/docs`) use a 250 ms fade-out/swap/
fade-in in `src/App.tsx`, exits to static `.html` pages fade via
`public/assets/js/page-transition.js`, and hydration is deferred one frame past
first paint in `src/main.tsx` so the prerendered LCP element composites before
React mounts. All motion respects `prefers-reduced-motion`.

**Rationale**: Keeps the perceived-navigation polish of a router without adding
one, while protecting LCP and total blocking time budgets.
