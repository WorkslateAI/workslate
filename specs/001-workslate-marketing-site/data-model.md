# Data Model: Workslate AI Marketing Site

The site has no persistent database. Page content and examples are typed static
records.

## Navigation Item

| Field | Type | Constraints |
|---|---|---|
| label | string | Required, visible accessible name. |
| href | string | Required fragment identifier or approved URL. |
| location | `header` \| `footer` | Required. |

Main page anchors include `#home`, `#how-it-works`, `#global`, `#features`,
`#feature-01` through `#feature-04`, `#prompt`, and `#footer`. The Docs page uses
the `#/docs` hash route. Header links target Home, How it works, Global, Docs,
and the Features dropdown; the footer uses the same in-page anchors.

## Content Section

| Field | Type | Constraints |
|---|---|---|
| id | string | Required unique stable fragment ID. |
| heading | string | Required for content sections; exactly one page-level `h1`. |
| eyebrow | string | Optional short label. |
| copy | string or structured content | Factual claims must be product-verified. |
| order | positive integer | Required to preserve requested page sequence. |

## Feature and Illustration

| Field | Type | Constraints |
|---|---|---|
| number | `01` \| `02` \| `03` \| `04` | Required and unique. |
| title | string | Required user-visible heading. |
| description | string | Required, accurate copy. |
| illustration | optional raster image reference | Responsive AVIF/WebP/JPEG srcset with explicit intrinsic dimensions and accessible alt text. |

Feature topics are Multi-Party Ledger Reconciliation, Corporate Wallet
Orchestration, Programmable Settlement Rules, and End-to-End Transaction
Traceability. Each feature card renders an optimized raster illustration under
`public/assets/images/`.

## Market and Chain

| Field | Type | Constraints |
|---|---|---|
| id | string | Required stable key. |
| name | string | Required visible label. |
| category | `market` \| `chain` | Required. |
| order | positive integer | Required unique order within category. |
| icon | inline SVG component reference | Required where the diagram displays an icon. |

Markets are A, B, and C. Ethereum is the currently supported chain; Polygon,
BSC, Arbitrum, and Optimism are roadmap chains. Accessible descriptions
communicate diagram purpose and relationships.

## Docs Entry and Search

| Field | Type | Constraints |
|---|---|---|
| id | string | Required unique stable key. |
| title | string | Required field-guide entry heading. |
| category | string | Groups entries for filtering (e.g., architecture terms). |
| body | string | Web3j / BPMN / EVM field-guide content. |

The Docs page at `#/docs` indexes entries in `src/search/docsIndex.ts` and
searches them through `useSiteSearch` (Fuse.js) via the `SearchTrigger` and
`SearchDialog` atoms (Ctrl/Cmd+K or `/` to open).

## FAQ Item

| Field | Type | Constraints |
|---|---|---|
| id | string | Required unique stable key. |
| question | string | Required and visible in the FAQ. |
| answer | string | Required, accurate, and visible when expanded. |

FAQPage JSON-LD must be generated from exactly the FAQ records visible to visitors.

## Page Metadata

| Field | Type | Constraints |
|---|---|---|
| title | string | Required unique page title. |
| description | string | Required accurate description. |
| canonicalUrl | absolute URL | Required; origin `https://workslate.ai`. |
| openGraph | structured metadata | Required title, description, type, URL; optional share image. |
| twitter | structured metadata | Required card, title, description; optional share image. |
| jsonLd | Organization, WebSite, SoftwareApplication, FAQPage | Must match available product facts and visible FAQ content. |

The sitemap uses `https://workslate.ai/`; robots.txt references the sitemap at
`https://workslate.ai/sitemap.xml`.
