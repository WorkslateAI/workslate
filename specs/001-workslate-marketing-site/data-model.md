# Data Model: Workslate AI Marketing Site

Last verified: 2026-11-24

The site has no persistent database. Page content is composed of typed static
records in `src/content/` plus component-inlined data. Interfaces live in
`src/content/types.ts`; some content modules are defined but not currently
imported by any component (noted per entity below).

## Navigation Item

Defined as `NavigationItem` in `src/content/types.ts`:

| Field | Type | Constraints |
|---|---|---|
| label | string | Required, visible accessible name. |
| href | string | Required fragment identifier or approved URL. |
| location | `header` \| `footer` | Required. |

`src/content/navigation.ts` exports `headerNavigation` / `footerNavigation`
records matching this shape, but they are not currently imported — the rendered
links are inlined in `src/components/sections/Header.tsx` and `Footer.tsx`:

- Header (desktop + mobile): Home (`#`), How it works (`#how-it-works`),
  Global (`#global`), Docs (`#/docs`), plus a Features dropdown linking to
  `#feature-01` through `#feature-04`.
- Footer: Docs (`#/docs`), Terms of Service (`/terms.html`), Privacy Policy
  (`/privacy.html`), Cookie Policy (`/cookies.html`).

## Routes and Pages

| Route | Type | Notes |
|---|---|---|
| `/` (Home) | SPA route | Default when `location.hash !== '#/docs'`. |
| `/#/docs` (Docs) | SPA hash route | `getRoute()` in `src/App.tsx` switches on the hash; transitions use a 250 ms fade-out/swap/fade-in and move focus to `#page-heading`. |
| `/docs.html` | Static HTML page | Standalone document in `public/`, also listed in the sitemap. |
| `/terms.html`, `/privacy.html`, `/cookies.html` | Static HTML pages | Linked from the footer; the app intercepts `.html` link clicks to fade out before leaving the SPA. |

`App.tsx` adds a `booted` class on mount to release the `.docs-route`
pre-paint hide rule injected by `index.html` (prevents Home flashing on
`/#/docs` loads). `vite-react-ssg` prerenders the site at build time.

## Content Section

Rendered Home page sections, in DOM order, each with a stable fragment ID:

| Order | Component | Anchor | Notes |
|---|---|---|---|
| 1 | `Hero` | `#home` | Contains the only page-level `h1` (`#page-heading`). |
| 2 | `BusinessProblem` | `#business-problem` | Lazy-loaded (`React.lazy` + `Suspense`). |
| 3 | `HowItWorks` | `#how-it-works` | Lazy; renders `howItWorksCopy` steps 01–04. |
| 4 | `SideSection` | `#global` | Lazy; markets/chains diagram. |
| 5 | `Features` | `#features` | Lazy; hosts `#feature-01`..`#feature-04` cards. |
| 6 | `PromptSection` | `#prompt` | Lazy; token banner / video prompt area. |
| — | `Footer` | `#footer` | Always mounted. |

Section components that exist but are **not currently mounted** on Home:
`Developers` (`#docs`), `FAQ` (`#faq`), `Pricing` (`#pricing`),
`SignIn` (`#sign-in`), `GetStarted` (`#get-started`).

Section copy records in `src/content/copy.ts`: `howItWorksCopy` (used by
`HowItWorks`), `developersCopy` (used by `Developers`), `heroCopy` and
`featureCopy` (defined, currently unused — Hero/Features inline their copy).

## Feature and Illustration

Defined as `Feature` in `src/content/types.ts`:

| Field | Type | Constraints |
|---|---|---|
| number | `01` \| `02` \| `03` \| `04` | Required and unique. |
| title | string | Required user-visible heading. |
| description | string | Required, accurate copy. |
| illustration | optional raster image reference | Responsive AVIF/WebP/JPEG srcset with explicit intrinsic dimensions and accessible alt text. |

`src/content/features.ts` exports matching records but is not currently
imported; `Features.tsx` holds its own inline array where each card carries:

| Field | Value |
|---|---|
| id | `feature-01` .. `feature-04` (also the scroll target) |
| number / title / subtitle | Same four topics as below |
| image | Base `.png` path under `public/assets/images/` |
| widths | `[480, 768, 1200, 2560]` — `buildSrcSet()` maps the last entry to the unsuffixed base file |
| width × height | 2560 × 1440 intrinsic (prevents CLS) |
| alt | Required accessible text |

Feature topics: Multi-Party Ledger Reconciliation (`market-a-b-c-currency-tokens`),
Corporate Wallet Orchestration (`wallet-orchestration`), Programmable Settlement
Rules (`evm-nodes-workslate`), End-to-End Transaction Traceability
(`token-movement-traceability`). Cards render `<picture>` with AVIF → WebP →
JPEG sources, `loading="lazy"`, `decoding="async"`.

## Market and Chain

Defined as `Market` in `src/content/types.ts`:

| Field | Type | Constraints |
|---|---|---|
| id | string | Required stable key. |
| name | string | Required visible label. |
| category | `market` \| `chain` | Required. |
| order | positive integer | Required unique order within category. |
| icon | optional string | SVG asset path under `public/assets/svg/`. |

`src/content/chains.ts` exports `markets` (A, B, C), `chains` (Ethereum — the
currently supported chain), `roadmapChains` (Polygon, BSC, Arbitrum, Optimism),
`icons` (LUNAR coin SVGs at 128/256/512), and `currencies` (USD `$`, EUR `€`,
BTC `₿`, LUNAR `Ł`). These records are currently defined for content authoring
and not imported by rendered components; the diagrams inline their own visuals.

## Docs Entry and Search

Search records are `SearchRecord` in `src/search/docsIndex.ts`:

| Field | Type | Constraints |
|---|---|---|
| id | string | Required unique stable key. |
| title | string | Required result heading. |
| breadcrumb | string[] | Section path shown in results (e.g. `['Core terminology']`). |
| anchor | string | In-page anchor on the Docs page; empty for the hero record. |
| content | string | Searchable body text mirroring the rendered section. |
| path | string | Always `/docs.html`. |
| code | optional string | Short code/pseudo-syntax snippet for matching. |

`generateDocsIndex()` builds ~25 records mirroring `src/pages/Docs.tsx`
sections: hero, `building-blocks`, `reference-architecture`, `core-terminology`
(18 term records categorized as `workflow` / `chain` / `network`),
`token-transfer-lifecycle`, `web3j-flow`, `reliability-rules`,
`common-misconceptions`. The terminology grid on the Docs page also filters by
`all` / `workflow` / `chain` / `network`.

`src/search/useSiteSearch.ts` wraps Fuse.js: keys weighted
title .5 / breadcrumb .2 / content .25 / code .05, threshold 0.3,
`ignoreLocation`, `minMatchCharLength` 2, result limit 10, 150 ms debounce.
The Fuse instance is built lazily on first search so it stays inside the
lazy Docs chunk. `SearchTrigger` + `SearchDialog` atoms render the UI;
Ctrl/Cmd+K or `/` opens the dialog.

## FAQ Item

Defined as `FAQItem` in `src/content/types.ts`:

| Field | Type | Constraints |
|---|---|---|
| id | string | Required unique stable key (`faq-1` .. `faq-5`). |
| question | string | Required and visible in the FAQ. |
| answer | string | Required, accurate, and visible when expanded. |

`src/content/faq.ts` exports 5 items consumed by `FAQ.tsx` (currently not
mounted on Home) and by `src/seo/StructuredData.tsx`, which serializes them
into the `FAQPage` JSON-LD. Note: the JSON-LD is emitted even though the FAQ
section component is dormant, so the structured data currently describes
content not rendered on the page — flagged for review.

## Page Metadata

Metadata is emitted from two places:

- `src/seo/StructuredData.tsx` (react-helmet-async): page title, description,
  canonical `https://workslate.ai/`, Open Graph (title, description,
  `og:type=website`, `og:url`), Twitter card (`summary_large_image`, title,
  description), and four JSON-LD blocks — `Organization`, `WebSite`,
  `SoftwareApplication` (FinanceApplication, free offer), `FAQPage`.
- `index.html` (static head, survives SSG): charset/viewport/theme-color,
  description, canonical, `msvalidate.01`, icon/manifest links, `og:image`
  and `twitter:image` (hero PNG), plus `woff2` preloads for Plus Jakarta Sans
  and Inter and the `.docs-route` pre-paint script.

`public/sitemap.xml` lists `https://workslate.ai/`, `/docs.html`,
`/terms.html`, `/privacy.html`, `/cookies.html` (lastmod 2026-11-24);
`public/robots.txt` allows all and references the sitemap at
`https://workslate.ai/sitemap.xml`.
