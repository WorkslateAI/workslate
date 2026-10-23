# Feature Specification: Workslate AI Marketing Site

**Feature Branch**: `001-workslate-marketing-site`

**Created**: 2026-10-22

**Status**: Draft

**Input**: User description: "Single-page marketing site for Workslate AI (see design/Workslate–singlepage.png): a platform that tracks and moves tokens across markets and EVM-compatible blockchains with AI-driven automation, peer-to-peer (P2P) transfer workflows and a unified real-time dashboard. Sections: Header with logo, nav (Home, Features, How It Works, Docs, Pricing), Sign In, Get Started; Hero with eyebrow, h1 'From Market to Market. Your Token. Everywhere.', paragraph, two CTAs, SVG market-network illustration (Markets A/B/C, central W token); Feature 01 Seamless Money Movement (market flow with $, €, ₿); Feature 02 EVM Nodes (Ethereum, Polygon, BSC, Arbitrum, Optimism hub diagram); Feature 03 Single Source of Truth (dashboard card: volume, transactions, table); How It Works (P2P workflow steps); Developers (Web3j / Java integration overview); FAQ (supports FAQ structured data) and Footer. SEO keyword targets, used naturally in headings, body copy, alt/aria text and metadata: blockchain, EVM, EVM-compatible nodes, Web3j, Web3j Java integration, P2P workflows, peer-to-peer token transfer, multi-chain token tracking, Web3. Acceptance: matches reference at 1536px; stacks cleanly at 360px; Lighthouse 95+."

## Clarifications

### Session 2026-10-22

- Q: Does Workslate support Web3j today, or is Web3j integration only planned? → A: Planned only; Web3j integration is not currently supported and must be labeled as roadmap.
- Q: Where should the Docs navigation link take visitors? → A: The Developers section at `#docs` (the later link-destination decision supersedes the initial external-docs selection).
- Q: Should the dashboard show static illustrative mock data or a live interactive demo? → A: An interactive demo with simulated data, clearly labeled as a simulation and not live product data.
- Q: What final public domain should the canonical URL and sitemap use? → A: `workslate.ai`, with any `www` variant redirected to the canonical apex domain.
- Q: What exact destinations should Docs, Pricing, Sign In, Get Started, and Watch Demo use, in that order? → A: Use in-page anchors for all five; link Docs to Developers and add target sections where no matching section exists.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the product (Priority: P1)

A visitor arrives on the Workslate AI marketing site and quickly understands its
token-tracking and movement offering, the markets and EVM-compatible networks it
covers, and how to begin exploring the product.

**Why this priority**: Clear product understanding is the primary purpose of the
marketing site and enables visitors to decide whether to continue.

**Independent Test**: Review the page from its opening section through its feature
sections and verify the product and its three core capabilities are understandable
without navigating away.

**Acceptance Scenarios**:

1. **Given** a visitor opens the page, **When** the hero is presented, **Then** it
   displays the exact heading "From Market to Market. Your Token. Everywhere.", a
   supporting paragraph, Get Started and Watch Demo calls to action, and a labeled
   market-network diagram showing Markets A, B, C, and a central W token.
2. **Given** a visitor explores the feature sections, **When** they reach each
   capability, **Then** they can identify seamless movement across markets, support
   for Ethereum, Polygon, BSC, Arbitrum, and Optimism, and the unified dashboard,
   with demo data clearly identified as simulated.
3. **Given** a visitor selects a header navigation item, **When** the action completes,
   **Then** they reach the corresponding page section, including the Developers
   section for Docs and the matching Pricing, Sign In, or Get Started section.

---

### User Story 2 - Evaluate workflows and developer roadmap (Priority: P2)

A prospective user or developer reviews how peer-to-peer token transfers work and
whether the planned Web3j / Java integration is relevant to their needs.

**Why this priority**: Explaining the workflow and developer integration helps
qualified visitors evaluate the platform beyond the initial feature summary.

**Independent Test**: Review the How It Works and Developers sections and verify a
visitor can describe the P2P workflow at a high level and identify Web3j / Java
integration as planned, not currently supported.

**Acceptance Scenarios**:

1. **Given** a visitor reaches How It Works, **When** they read the section, **Then**
   they see an ordered, understandable description of the P2P transfer workflow.
2. **Given** a Java developer reaches Developers, **When** they review the section,
   **Then** they can find a Web3j Java integration overview explicitly labeled as
   planned, without claims that it is currently available.

---

### User Story 3 - Resolve questions and take action (Priority: P3)

A visitor looks for answers to common questions and then uses the site's calls to
action or footer links to continue.

**Why this priority**: FAQs and clear next steps reduce unanswered questions and
support visitors who are ready to learn more or get started.

**Independent Test**: Read and interact with the FAQ, then follow the calls to action
and footer links to verify that they are understandable and usable.

**Acceptance Scenarios**:

1. **Given** a visitor opens a frequently asked question, **When** the answer is
   revealed, **Then** it is readable and accurately describes the product.
2. **Given** a visitor uses a footer or call-to-action link, **When** they activate it
   by pointer or keyboard, **Then** it leads to its configured destination.
3. **Given** a crawler reads the page, **When** it evaluates the FAQ content, **Then**
   FAQ structured data corresponds to the questions and answers visible on the page.

---

### Edge Cases

- At a 360px viewport, diagrams, dashboard details, and currency symbols remain
  understandable without horizontal page overflow.
- At a 1536px viewport, the page preserves the reference's section order, composition,
  and visual hierarchy. The available reference images use different page layouts;
  the selected hero and feature reference must be used consistently for comparison.
- If a diagram cannot be interpreted visually, its accessible name or description
  communicates its purpose and key relationships.
- If a configured navigation or call-to-action destination is unavailable, the control MUST be disabled (visually grayed out with `aria-disabled="true"`) or removed from the rendered markup.
- If a product capability or integration detail has not been confirmed, page copy and
  structured data must not state it as fact.
- If dashboard data is simulated, its status must be clear before visitors can
  mistake it for live product data.
- If an FAQ answer changes, its visible content and structured data must remain
  consistent.
- If external page metadata is unavailable, the page still provides its own complete,
  unique metadata and crawlable content.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST present the Workslate AI logo and a header with Home,
  Features, How It Works, Docs, Pricing, Sign In, and Get Started controls. Home MUST
  navigate to `#home` (the top of the page); Features,
  How It Works, Docs, and Pricing MUST navigate to `#features`, `#how-it-works`,
  `#docs`, and `#pricing`, respectively. Sign In and Get Started MUST navigate to
  `#sign-in` and `#get-started`.
- **FR-002**: The hero MUST include an eyebrow, the exact heading "From Market to
  Market. Your Token. Everywhere.", supporting paragraph, Get Started and Watch Demo
  calls to action, and a market-network illustration identifying Markets A, B, C, and
  a central W token. Get Started MUST navigate to `#get-started` and Watch Demo MUST
  navigate to `#dashboard-demo`.
- **FR-003**: The site MUST present a Seamless Money Movement section with a market
  flow using $, €, and ₿.
- **FR-004**: The site MUST present an EVM Nodes section identifying Ethereum,
  Polygon, BSC, Arbitrum, and Optimism in a hub diagram.
- **FR-005**: The site MUST present a Single Source of Truth section with a dashboard
  card showing volume, transactions, and a transaction table in an interactive demo
  with simulated data that is clearly distinguished from live product data using a
  prominent "Simulated Data" badge or label visible above or adjacent to the dashboard.
- **FR-006**: The site MUST present a How It Works section that explains the P2P
  workflow in ordered steps.
- **FR-007**: The site MUST present the Web3j / Java integration as planned roadmap
  work and MUST NOT imply it is currently supported.
- **FR-008**: The site MUST present an FAQ and footer. FAQ structured data MUST match
  the questions and answers visible to visitors.
- **FR-009**: Page copy, headings, metadata, and diagram descriptions MUST use the
  requested terms where contextually appropriate: blockchain, EVM, EVM-compatible nodes,
  Web3j, Web3j Java integration, P2P workflows, peer-to-peer token transfer,
  multi-chain token tracking, and Web3. Terms should appear in headings, body copy,
  alt text, aria labels, and metadata without keyword stuffing.
- **FR-010**: Product claims MUST be limited to capabilities confirmed as part of the
  product description or independently verified product information.
- **FR-011**: Equivalent content and controls MUST be presented consistently across
  page sections.
- **FR-012**: Illustrations, icons, logos, and network badges MUST use vector artwork;
  raster imagery is not permitted except for an optional Open Graph share image.
- **FR-013**: Every page MUST have a unique title, meta description, canonical URL,
  Open Graph metadata, JSON-LD structured data, and exactly one semantic `h1`.
  Content MUST be crawlable in the rendered HTML. The canonical host MUST be
  `https://workslate.ai`, with any `www` variant redirected to the apex domain.
- **FR-014**: The site MUST support keyboard navigation, meet WCAG 2.2 Level AA, and
  provide accessible names or descriptions for diagrams.
- **FR-015**: The page MUST adapt without horizontal page overflow at widths of 360px,
  768px, 1024px, and 1536px, with content remaining readable and usable.
- **FR-016**: At 1536px, the page MUST be visually compared against the supplied design
  reference. At 360px, the sections MUST stack cleanly and remain usable.
- **FR-017**: On a Lighthouse mobile-profile audit, the page MUST score at least 90 in
  Performance, Accessibility, Best Practices, and SEO. It MUST achieve LCP below 2.0
  seconds, CLS below 0.05, TBT below 150ms, and JavaScript below 100KB gzip.
- **FR-018**: Lighthouse CI MUST pass as a required merge check.
- **FR-019**: Every navigation, footer, and call-to-action control MUST have a valid,
  configured destination or perform a clearly identified in-page action. Docs,
  Pricing, Sign In, Get Started, and Watch Demo MUST use the in-page destinations
  specified in FR-001 and FR-002. Footer links MUST be limited to in-page anchors defined in FR-021 until
  product-approved external destinations are explicitly added to this specification's FR-019 requirement text.
- **FR-020**: The sitemap MUST use `https://workslate.ai` as its public origin. The
  canonical host `https://workslate.ai` MUST redirect any `www` variant to the apex
  domain (e.g., `https://www.workslate.ai/` → `https://workslate.ai/`).
- **FR-021**: The page MUST include anchor targets for `#home`, `#features`, `#how-it-works`,
  `#docs`, `#pricing`, `#sign-in`, `#get-started`, `#dashboard-demo`, `#faq`, and
  `#footer`. The sign-in, get-started, pricing, and docs sections MUST provide accurate
  informational content and MUST NOT imply that account authentication, pricing
  checkout, or other unavailable product functionality is offered by the marketing
  site.

### Key Entities *(include if data involved)*

- **Page section**: A named content region with a user-facing purpose, including
  header, hero, feature sections, workflow, developer overview, FAQ, and footer.
- **Navigation or call-to-action link**: A labeled control and its configured
  destination or in-page action.
- **Network diagram**: A visual representation of markets or EVM-compatible networks
  and their relationships, with an accessible description.
- **Dashboard summary**: The sample volume, transaction count, and table content
  presented in the marketing-site dashboard demo; values are simulated, not live data.
- **FAQ item**: A visible question and answer pair represented consistently in FAQ
  structured data.
- **Page metadata**: The page title, description, canonical URL, Open Graph properties,
  and structured data associated with the marketing page.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At 1536px, reviewers confirm that the implemented page's section order,
  hierarchy, and composition match the supplied reference using a side-by-side visual
  comparison with tolerance for minor spacing variations (within 4px) and exact
  matching of section order, heading hierarchy, and component composition.
- **SC-002**: At 360px, reviewers can access every section and control, with no
  horizontal page overflow or clipped primary content.
- **SC-003**: The mobile-profile audit scores at least 90 in Performance,
  Accessibility, Best Practices, and SEO.
- **SC-004**: The page meets all specified performance thresholds: LCP below 2.0
  seconds, CLS below 0.05, TBT below 150ms, and JavaScript below 100KB gzip.
- **SC-005**: All visible navigation and calls to action have valid configured
  destinations or identified in-page actions, and are keyboard-operable.
- **SC-006**: The page contains exactly one `h1`, and its FAQ structured data matches
  all corresponding visible questions and answers.
- **SC-007**: Review confirms that all feature, network, and integration claims are
  accurate and no unsupported product capabilities are asserted.
- **SC-008**: The required Lighthouse CI check passes before merge.
- **SC-009**: The canonical URL and sitemap use `https://workslate.ai`, and any
  `www` variant redirects to the canonical apex domain.

## Assumptions

- This feature is a single public marketing page; it does not implement sign-in,
  account creation, token transfers, a live transaction feed, or the underlying
  dashboard product.
- Docs, Pricing, Sign In, Get Started, and Watch Demo use the in-page anchors specified
  in FR-001 and FR-002. Footer links are in-page anchors only; external footer
  destinations may be added once product-approved.
- The final public domain is `workslate.ai`; the `www` variant redirects to the apex
  canonical domain.
- Home navigates to `#home` (page top); Features, How It Works, Docs, and Pricing navigate to `#features`,
  `#how-it-works`, `#docs`, and `#pricing`; Sign In and Get Started navigate to
  `#sign-in` and `#get-started`; Watch Demo navigates to `#dashboard-demo`. Docs is
  the Developers section. Pricing and account-related copy must be product-approved
  and must not imply unavailable functionality.
- Dashboard figures and transaction rows are illustrative marketing content unless
  verified live data is explicitly provided. The dashboard demo uses simulated data,
  which must be labeled as such and not presented as live measurements.
- The provided description is the authority for platform capabilities, except that
  Web3j / Java integration is planned and not currently supported. Additional claims,
  including specific AI behaviors or integration guarantees, require product
  verification.
- `design/Workslate–singlepage.png` is the selected visual reference for the page.
  The requested How It Works, Developers, and FAQ sections remain in scope.
- The project constitution remains authoritative for implementation architecture,
  reusable component organization, mobile-first breakpoints, accessibility,
  performance budgets, and required CI checks. This specification focuses on the
  page content and user-observable outcomes.
