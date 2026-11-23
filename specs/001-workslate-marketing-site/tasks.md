  data, or currently available Web3j support.
description: "Implementation tasks for the Workslate AI marketing site"
---

# Tasks: Workslate AI Marketing Site

**Input**: Constitution, specification, implementation plan, and supporting design
documents in `/specs/001-workslate-marketing-site/`.

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, and
`quickstart.md`.

**Tests**: Included because the specification explicitly requires Vitest, Testing
Library, Playwright, responsive checks, axe accessibility checks, and Lighthouse CI.

**Organization**: Tasks follow the feature's three user stories and the requested
implementation sequence. Setup and shared foundation tasks precede all stories.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Task can run in parallel with other ready tasks because it does not edit
  their files or depend on their output.
- **[Story]**: User-story association; setup, foundation, and polish tasks omit it.
- Every task includes its target file path.

## Phase 1: Setup

**Purpose**: Scaffold the Vite + React 18 + TypeScript application and its tooling.

- [X] T001 [P] Create `package.json` with Vite, React 18, TypeScript, Tailwind CSS and `@tailwindcss/vite`, `vite-react-ssg`, `react-helmet-async`, Vitest, Testing Library, Playwright, and `@axe-core/playwright`, and `vite-plugin-svgr` with `@svgr/plugin-svgo`; add `dev`, `build`, `preview`, `test`, `test:e2e`, `lighthouse`, and `check:js-budget` scripts.
- [X] T002 [P] Configure Vite and Tailwind's Vite plugin in `vite.config.ts`; use the `vite-react-ssg` CLI for single-page development and prerendered builds without adding a router.
- [X] T003 [P] Configure strict TypeScript and React JSX settings in `tsconfig.json` and `tsconfig.node.json`.
- [X] T004 [P] Configure Vitest and Testing Library setup in `vitest.config.ts` and `tests/setup.ts`.
- [X] T005 [P] Configure Playwright projects and a production-preview web server in `playwright.config.ts`.
- [X] T006 [P] Create the HTML document shell, language, viewport, theme color, and local variable-font preload in `index.html`.
- [X] T007 Configure SVGR in `vite.config.ts` with `vite-plugin-svgr` so `*.svg?react` imports compile to inline React components (never `<img>` or URL references), run SVGO with `removeViewBox` disabled so every SVG keeps its `viewBox`, and add `vite-plugin-svgr/client` typings in `src/vite-env.d.ts`.
- [X] T008 Add the vector source library and a typed SVG-to-component registry: store raw artwork in `src/assets/svg/{logo,icons,coins,chains,illustrations}/*.svg` and re-export it as typed components in `src/components/svg/index.ts`; atoms and illustrations MUST import artwork only through this registry.
**Checkpoint**: The application toolchain builds a minimal Vite React page and
exposes the requested test commands.

## Phase 2: Foundational - Shared Design System and Runtime

**Purpose**: Establish typed content conventions, design tokens, accessible atoms,
and a prerender-compatible app shell required by all user stories.

- [X] T009 Create the React 18 `vite-react-ssg/single-page` entry and root `HelmetProvider` in `src/main.tsx`.
- [X] T010 Create shared TypeScript types for navigation, content, chains, FAQ items, transaction samples, and metadata in `src/content/types.ts`.
- [X] T011 [P] Define Tailwind CSS-first gradient, navy, spacing, typography, breakpoints, focus, and reduced-motion tokens in `src/styles/global.css`.
- [X] T012 [P] Create shared Button, Badge, GradientText, and Icon SVG atoms in `src/components/atoms/Button.tsx`, `src/components/atoms/Badge.tsx`, `src/components/atoms/GradientText.tsx`, and `src/components/atoms/Icon.tsx`, consuming SVGR components from `src/components/svg/index.ts`; ensure icons have explicit dimensions and meaningful accessible names when not decorative.
- [X] T013 [P] Create CoinIcon and ChainBadge SVG atoms with explicit dimensions, using SVGR components from `src/components/svg/index.ts`, in `src/components/atoms/CoinIcon.tsx` and `src/components/atoms/ChainBadge.tsx`.
- [X] T014 Create the semantic page composition with exactly one `h1` and stable anchors for `#home`, `#features`, `#how-it-works`, `#docs`, `#pricing`, `#sign-in`, `#get-started`, `#dashboard-demo`, `#faq`, and `#footer` in `src/App.tsx`.
- [X] T015 [P] Add one appropriately licensed, self-hosted, subsetted variable font file at `src/assets/fonts/workslate-variable.woff2` and declare `font-display: swap` in `src/styles/global.css`.
- [X] T016 [P] Add a gzip-size checker for production JavaScript that fails above 100KB in `scripts/check-js-budget.mjs`.

**Checkpoint**: Shared tokens, React/SSG root, content types, accessible atoms, and
stable page anchors are ready for story components.

## Phase 3: User Story 1 - Understand the Product (Priority: P1) 🎯 MVP

**Goal**: Build the header, hero, three feature columns, and clearly simulated
dashboard card that communicate the product at a glance.

**Independent Test**: Preview the prerendered page at 360px and 1536px. Verify the
exact hero heading, labeled market diagram, three feature descriptions, specified
chain and currency labels, simulated dashboard notice, and working navigation/CTA
anchors with no horizontal overflow.

### Tests for User Story 1

- [X] T017 [P] [US1] Test header destinations, exact hero heading, market/currency/chain labels, feature titles, and visible simulated-data notice in `tests/unit/components/marketing-content.test.tsx`.
- [X] T018 [P] [US1] Test hero and dashboard rendering, all in-page links, prerendered content, and responsive overflow at 360px and 1536px in `tests/e2e/marketing-site.spec.ts`.

### Implementation for User Story 1

- [X] T019 [P] [US1] Add typed navigation, hero copy, and three feature-column content in `src/content/navigation.ts`, `src/content/copy.ts`, and `src/content/features.ts`.
- [X] T020 [P] [US1] Define typed market labels A/B/C, Ethereum, Polygon, BSC, Arbitrum, Optimism, and $, €, ₿ display content in `src/content/chains.ts`.
- [X] T021 [P] [US1] Build lightweight memoized inline-SVG (SVGR-imported from `src/assets/svg/illustrations/`) HeroNetwork with Markets A/B/C, central W token, explicit aspect ratio, and accessible description in `src/components/illustrations/HeroNetwork.tsx`.
- [X] T022 [P] [US1] Build memoized inline-SVG (SVGR-imported from `src/assets/svg/illustrations/`) MarketFlow, EvmHub, and WorldMap illustrations with explicit dimensions/aspect ratios and accessible descriptions in `src/components/illustrations/MarketFlow.tsx`, `src/components/illustrations/EvmHub.tsx`, and `src/components/illustrations/WorldMap.tsx`.
- [X] T023 [US1] Implement the typed responsive NavLink molecule and Header with Home (`#home`), Features, How It Works, Docs (`#docs`), Pricing, Sign In, and Get Started anchors in `src/components/molecules/NavLink.tsx` and `src/components/sections/Header.tsx`.
- [X] T024 [US1] Implement Hero with eyebrow, exact `From Market to Market. Your Token. Everywhere.` heading, supporting paragraph, Get Started and Watch Demo CTAs, and HeroNetwork in `src/components/sections/Hero.tsx`.
- [X] T025 [P] [US1] Implement FeatureHeading and the three-column Seamless Money Movement, EVM Nodes, and Single Source of Truth sections in `src/components/molecules/FeatureHeading.tsx` and `src/components/sections/FeatureColumns.tsx`.
- [X] T026 [P] [US1] Add volume, transaction count, and sample transaction rows with a mandatory simulated-data label in `src/content/dashboard.ts`; do not describe samples as live data.
- [X] T027 [P] [US1] Implement StatCard, TransactionRow, and StatusPill molecules in `src/components/molecules/StatCard.tsx`, `src/components/molecules/TransactionRow.tsx`, and `src/components/molecules/StatusPill.tsx`.
- [X] T028 [US1] Implement the keyboard-operable dashboard sample at `#dashboard-demo` with an always-visible simulated-data notice in `src/components/sections/DashboardDemo.tsx`.
- [X] T029 [US1] Add accurate Pricing, Sign In, and Get Started anchor regions without implying checkout or authentication exists in `src/components/sections/Pricing.tsx`, `src/components/sections/SignIn.tsx`, and `src/components/sections/GetStarted.tsx`.
- [X] T030 [US1] Compose the Header, Hero, FeatureColumns, DashboardDemo, and CTA anchor regions in `src/App.tsx`; ensure the requested links resolve and exactly one `h1` is rendered.

**Checkpoint**: The P1 marketing journey is understandable and navigable without
the later story sections.

## Phase 4: User Story 2 - Evaluate Workflows and Developer Roadmap (Priority: P2)

**Goal**: Explain the P2P workflow and make clear that Web3j / Java support is
planned, not currently available.

**Independent Test**: Navigate to `#how-it-works` and `#docs`; verify ordered P2P
steps and roadmap-only Web3j language with keyboard and screen-reader-friendly
semantics.

### Tests for User Story 2

- [X] T031 [P] [US2] Test ordered P2P steps, `#how-it-works` and `#docs` anchors, and copy that explicitly says Web3j support is planned in `tests/unit/components/workflow-developers.test.tsx`.
- [X] T032 [P] [US2] Test responsive workflow/Developers sections and assert rendered copy never claims Web3j is currently supported in `tests/e2e/marketing-site.spec.ts`.

### Implementation for User Story 2

- [X] T033 [P] [US2] Add accurate P2P workflow and roadmap-only Web3j copy in `src/content/copy.ts`.
- [X] T034 [US2] Implement the ordered, responsive, accessible How It Works P2P section in `src/components/sections/HowItWorks.tsx`.
- [X] T035 [US2] Implement Developers at the `#docs` anchor and state Web3j / Java integration is planned and not currently supported in `src/components/sections/Developers.tsx`.
- [X] T036 [US2] Integrate HowItWorks and Developers in the app composition while preserving exact section anchors in `src/App.tsx`.

**Checkpoint**: Workflow and roadmap can be understood and verified independently
of the FAQ.

## Phase 5: User Story 3 - Resolve Questions and Take Action (Priority: P3)

**Goal**: Answer product questions accurately and provide FAQ structured data and
usable footer links.

**Independent Test**: Open and close FAQ items by keyboard and pointer; verify
visible FAQ question/answer content exactly matches FAQPage JSON-LD; verify footer
links resolve to valid in-page anchors (no external destinations until approved).

### Tests for User Story 3

- [X] T037 [P] [US3] Test FAQ disclosure keyboard behavior and equality between visible FAQ items and FAQPage JSON-LD in `tests/unit/components/faq.test.tsx`.
- [X] T038 [P] [US3] Test FAQ and footer keyboard access, semantic landmarks, and axe results in `tests/e2e/accessibility.spec.ts`.

### Implementation for User Story 3

- [X] T039 [P] [US3] Add typed, product-verified questions and answers to `src/content/faq.ts`.
- [X] T040 [US3] Implement the keyboard-operable FAQ disclosure section and generate FAQPage JSON-LD from the same FAQ records in `src/components/sections/FAQ.tsx` and `src/seo/StructuredData.tsx`.
- [X] T041 [US3] Implement the semantic footer whose links all use existing in-page anchors (no external URLs until product-approved destinations are recorded in the spec) in `src/components/sections/Footer.tsx`.
- [X] T042 [US3] Integrate FAQ and Footer into `src/App.tsx` and assert the structured data matches the visible FAQ in `tests/e2e/accessibility.spec.ts`.

**Checkpoint**: FAQs, structured data, and footer are accurate and accessible.

## Phase 6: SEO, Prerendering, and Performance Gates

**Purpose**: Complete page metadata and structured data, generate crawler files,
code-split safely, and enforce requested automated quality checks.

- [X] T043 Implement Helmet title, description, canonical `https://workslate.ai/`, Open Graph, and Twitter metadata plus Organization, WebSite, SoftwareApplication, and FAQPage JSON-LD in `src/seo/StructuredData.tsx`.
- [X] T044 Configure static prerendering so all required sections, metadata, and JSON-LD appear in generated HTML through the `vite-react-ssg` CLI scripts and `src/main.tsx`; verify output in `tests/e2e/marketing-site.spec.ts`.
- [X] T045 [P] Generate `public/sitemap.xml` with canonical `https://workslate.ai/` and `public/robots.txt` referencing `https://workslate.ai/sitemap.xml`; validate that the sitemap uses the correct public origin in `tests/e2e/marketing-site.spec.ts`.
- [X] T046 [P] Create `.github/workflows/ci.yml` to install dependencies and run unit tests, production build, JavaScript gzip budget, and Playwright checks.
- [X] T047 [P] Configure `lighthouserc.json` to require >= 0.85 in Performance, Accessibility, Best Practices, and SEO, and assert LCP < 2000ms, CLS < 0.05, and TBT < 150ms.
- [X] T048 Create `.github/workflows/lighthouse.yml` with a job named `Lighthouse CI` that runs the mobile Lighthouse CI gate against the production build; document in `specs/001-workslate-marketing-site/quickstart.md` the manual prerequisite to add `Lighthouse CI` (and the `ci.yml` job) as required status checks in GitHub branch protection for the default branch.
- [X] T049 Implement below-the-fold `React.lazy` and `Suspense` boundaries in `src/App.tsx`; keep head metadata synchronous and verify lazy content and styles appear in prerendered output in `tests/e2e/marketing-site.spec.ts`.
- [X] T050 [P] Add responsive Playwright checks at 360px, 768px, 1024px, and 1536px with horizontal-overflow assertions in `tests/e2e/responsive.spec.ts`.
- [X] T051 [P] Add Playwright axe scans at required viewports and validate accessible SVG diagram descriptions in `tests/e2e/accessibility.spec.ts`.
- [X] T052 [P] Verify hashed assets, Brotli/gzip delivery, critical CSS, font preload, and reduced-motion behavior against the production preview in `tests/e2e/responsive.spec.ts` and `specs/001-workslate-marketing-site/quickstart.md`.
- [X] T053 [P] Verify rendered SVG output: a Vitest check in `tests/unit/svgr-output.test.tsx` that every registry component renders an `<svg>` with `viewBox` and no `<img>`, and a Playwright check in `tests/e2e/marketing-site.spec.ts` that the prerendered `dist/index.html` and live page contain inline `<svg>` for the logo, icons, coins, chain badges, and all four illustrations, with zero `img`, `.svg` URL, or raster requests (except an optional OG image).
- [X] T054 [P] Add `scripts/check-www-redirect.mjs`, which asserts `https://www.workslate.ai/` returns a permanent redirect to `https://workslate.ai/`, and document in `specs/001-workslate-marketing-site/quickstart.md` that configuring this redirect at the (not yet chosen) hosting provider is an external deployment prerequisite to run after deploy.
- [X] T055 Compare the 1536px production preview with `Workslate–SinglePage.png`, validate the 360px stack, verify that all feature, network, and integration claims are accurate with no unsupported capabilities asserted, and record visual/accessibility/performance outcomes in `specs/001-workslate-marketing-site/quickstart.md`.
- [X] T056 [P] Validate that all navigation, footer, and call-to-action controls have valid configured destinations or clearly identified in-page actions in `tests/e2e/marketing-site.spec.ts`; verify keyboard operability for all interactive controls in `tests/e2e/accessibility.spec.ts`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; independent configuration tasks can run in
  parallel.
- **Foundational (Phase 2)**: Depends on Setup and blocks all user-story work.
- **US1 (Phase 3)**: Depends on Setup and Foundation; provides the MVP page shell.
- **US2 (Phase 4)** and **US3 (Phase 5)**: Depend on shared Foundation and the
  application composition from US1. Their section files and story tests can be
  developed in parallel.
- **SEO/Prerender/Performance (Phase 6)**: Integrates the complete page and depends
  on all story sections; responsive and axe tests can be authored in parallel.

### User Story Dependencies

- **US1 (P1)**: First deliverable and MVP; includes the core marketing proposition,
  features, navigation, and dashboard simulation.
- **US2 (P2)**: Adds workflow explanation and roadmap disclosure after the common
  page shell is established.
- **US3 (P3)**: Adds FAQ, FAQ structured data, and footer after shared SEO support is
  established.

### Parallel Opportunities

- Setup configuration files T001-T008 can be prepared in parallel.
- In Foundation, tokens, atoms, font, and gzip script (T011-T016) can proceed once
  their directories and package dependencies exist.
- For US1, typed content, illustrations, and independent tests (T017-T022,
  T025-T027) target separate files and can be parallelized after types/atoms exist.
- US2 copy/tests can proceed in parallel with the separate HowItWorks and Developers
  components.
- US3 FAQ content, tests, and footer can be developed separately; structured data
  integration follows FAQ content.
- Responsive and axe tests (T050-T051, T056) can run in parallel after page composition.

## Parallel Example: User Story 1

```text
Task: T017 Add unit coverage in tests/unit/components/marketing-content.test.tsx
Task: T019 Add navigation, hero, and feature content in src/content/navigation.ts, src/content/copy.ts, and src/content/features.ts
Task: T021 Build the hero SVG in src/components/illustrations/HeroNetwork.tsx
Task: T022 Build feature SVG illustrations in src/components/illustrations/MarketFlow.tsx, src/components/illustrations/EvmHub.tsx, and src/components/illustrations/WorldMap.tsx
```

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Setup and Foundation.
2. Implement and independently validate US1.
3. Confirm desktop reference matching, mobile stacking, simulated dashboard labeling,
   navigation, and prerendered content.
4. Continue with US2 and US3, then complete the SEO, performance, accessibility, and
   CI phase before merge.

### Incremental Delivery

1. Establish the shared application and design system.
2. Deliver US1 as the first reviewable marketing-page increment.
3. Add US2 workflow and Web3j roadmap content.
4. Add US3 FAQs and footer.
5. Integrate prerender, metadata, sitemap, responsive/a11y tests, and Lighthouse CI.

## Phase 7: Performance Optimization

**Purpose**: Raise Lighthouse scores to meet or exceed targets (Performance >= 90, Accessibility = 90, Best Practices = 90, SEO = 100) and improve Core Web Vitals (LCP < 2.0s, CLS < 0.02, TBT < 100ms, INP < 200ms, FCP < 1.5s, Speed Index < 2.5s).

- [X] T057 [P] Run baseline Lighthouse audit: build production with `npm run build && npm run preview`, run Lighthouse 3 times on mobile profile with default throttling for URLs /, /docs, and other routes; save HTML/JSON reports to `reports/lighthouse/before/`.
- [X] T058 [P] Record baseline metrics per URL: four category scores, Core Web Vitals (LCP, CLS, TBT, INP, FCP, Speed Index), LCP element, total transfer size, request count, JS and CSS size, and top opportunities/diagnostics.
- [X] T059 [P] Run bundle analysis using `vite build --report` or rollup-plugin-visualizer and list the 10 largest modules/chunks; report baseline table and prioritized optimization plan.
- [X] T060 [P] Identify all raster images in the project (hero, banners, feature images) and record their current sizes, formats, and dimensions.
- [X] T061 [P] Install and configure image optimization tooling (vite-imagetools or sharp build script) for AVIF/WebP generation with PNG/JPEG fallback; target < 150KB for large images, < 80KB for smaller ones.
- [X] T062 [P] Convert all raster images to modern formats (AVIF, WebP) with fallbacks; keep original files in source folder, not in shipped bundle.
- [X] T063 [P] Generate responsive image sizes (480, 768, 1200, max width) for each image and implement srcset + sizes attributes matching rendered widths at breakpoints.
- [X] T064 [P] Add explicit width and height attributes (or aspect-ratio CSS) to every image element to prevent CLS.
- [X] T065 Identify the LCP image (typically hero image) and implement loading="eager", fetchpriority="high", decoding="async".
- [X] T066 Add `<link rel="preload" as="image" imagesrcset="..." imagesizes="...">` in the pre-rendered `<head>` for the LCP image via react-helmet-async in `src/seo/StructuredData.tsx` or appropriate component.
- [X] T067 Add loading="lazy" and decoding="async" to all below-the-fold images.
- [X] T068 Convert logo and icons to SVG if faithful vector versions exist; otherwise ensure raster versions are correctly sized and optimized.
- [X] T069 Re-run Lighthouse audit on production build after image optimizations; compare with baseline and verify targets are met.
- [X] T070 [P] If performance targets not met after image optimization, analyze bundle for additional opportunities (code splitting, tree shaking, removing unused dependencies, minification improvements).
- [X] T071 [P] Document final performance scores, Core Web Vitals, and optimization changes in `specs/001-workslate-marketing-site/performance-report.md`.

**Checkpoint**: Lighthouse scores meet or exceed targets; Core Web Vitals within thresholds; no visual regressions.

## Phase 8: ChatGPT-Style AI Text Rendering

**Purpose**: Deliver a reusable progressive text-rendering component that simulates
real-time AI-generated responses with a typing cursor, Markdown support, and
reduced-motion compliance, applied only to designated AI text surfaces.

- [X] T072 [P] Create the reusable `AITextRenderer` atom in `src/components/atoms/AITextRenderer.tsx` with configurable `mode` (`character` | `word`) and `speed`, blinking cursor removed on completion, streaming continuation for appended text without restarting, optional `autoScroll` to the nearest scrollable ancestor, timer cleanup on unmount, `useSyncExternalStore`-driven `prefers-reduced-motion` instant rendering, and a built-in Markdown subset (paragraphs, headings, ordered/unordered lists, fenced code blocks, inline code, bold, italic, links).
- [X] T073 [P] Add `.ai-text-cursor` blink and `.ai-text-fade` per-unit fade-in styles gated behind `prefers-reduced-motion: no-preference` in `src/styles/global.css`.
- [X] T074 Apply `AITextRenderer` to the Hero `+ Prompt` chip (inline span mode, character mode) and fade in the "Workslate AI is generating a response" status line on `onComplete` in `src/components/sections/Hero.tsx`.
- [X] T075 [P] Add unit coverage for progressive character/word reveal, cursor lifecycle, streaming continuation vs restart, reduced-motion instant render, Markdown and fenced-code-block output, `onComplete`, and timer cleanup in `tests/unit/components/ai-text-renderer.test.tsx`.

**Checkpoint**: The hero prompt types out like a ChatGPT response with a blinking
cursor, the status line appears on completion, and the component is reusable for
any future AI response surface.

## Phase 9: Deployment

**Purpose**: Deploy to Vercel from CI only after the production build and test
gates pass.

- [X] T076 Add a `Trigger Vercel deployment` step that POSTs to `secrets.VERCEL_DEPLOY_HOOK_URL` on pushes to `main` after unit tests, the production build, the JS budget check, and E2E tests pass in `.github/workflows/ci.yml`; document the Vercel deploy-hook creation and secret setup in `README.md`.

## Notes

- Task IDs are sequential and each task uses a checkbox, ID, explicit file path,
  optional parallel marker, and required story label in story phases.
- The Lighthouse threshold is >= 0.85 for both the feature acceptance criterion and
  the CI gate, consistent with the constitution.
- Do not implement authentication, checkout, live token transfer, live transaction
---
