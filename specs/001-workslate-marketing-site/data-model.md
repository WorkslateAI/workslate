# Data Model: Workslate AI Marketing Site

The site has no persistent database. Page content and examples are typed static
records. Dashboard filter selections are transient browser state.

## Navigation Item

| Field | Type | Constraints |
|---|---|---|
| label | string | Required, visible accessible name. |
| href | string | Required fragment identifier or approved URL. |
| location | `header` \| `footer` | Required. |

Main page anchors include `#features`, `#how-it-works`, `#docs`, and `#pricing`.
The Developers section uses `#docs`. CTA anchors include `#get-started` and
`#dashboard-demo`.

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
| number | `01` \| `02` \| `03` | Required and unique. |
| title | string | Required user-visible heading. |
| description | string | Required, accurate copy. |
| illustration | inline SVG component reference | Accessible description and explicit intrinsic dimensions/aspect ratio required. |

Feature topics are Seamless Money Movement, EVM Nodes, and Single Source of Truth.
The shared illustrations are HeroNetwork, MarketFlow, EvmHub, and WorldMap.

## Market and Chain

| Field | Type | Constraints |
|---|---|---|
| id | string | Required stable key. |
| name | string | Required visible label. |
| category | `market` \| `chain` | Required. |
| order | positive integer | Required unique order within category. |
| icon | inline SVG component reference | Required where the diagram displays an icon. |

Markets are A, B, and C. EVM networks are Ethereum, Polygon, BSC, Arbitrum, and
Optimism. Accessible descriptions communicate diagram purpose and relationships.

## Dashboard Demo and Transaction

| Field | Type | Constraints |
|---|---|---|
| dataStatus | `simulated` | Required and visibly labeled; never represented as live. |
| volume | formatted string | Illustrative value only. |
| transactionCount | formatted string | Illustrative value only. |
| transactions | `Transaction[]` | Sample rows only; no live transaction claims. |
| selectedFilter | string or enum | Transient UI state; updates visible sample data. |

Each transaction has a unique `id`, source and destination market labels, a chain
label, formatted illustrative amount, and illustrative status. Referenced market
and chain names must exist in their respective content lists.

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
