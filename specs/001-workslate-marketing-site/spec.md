# Feature Specification: Workslate AI Marketing Site

**Feature Branch**: `001-workslate-marketing-site`

**Created**: 2026-10-22

**Status**: Draft

**Input**: User description: "Single-page marketing site for Workslate AI (see design/Workslate–SinglePage.png): an AI-powered financial-orchestration platform for intelligent ledger reconciliation and programmable B2B token movement across EVM-compatible blockchains. Sections: Header with logo, nav (Home, How it works, Global, Docs, Features dropdown), Register for demo CTA, mobile menu; Hero with eyebrow, h1 'Reconcile First. Move Value with Confidence.', typing AI prompt chip, Register for demo and Watch video CTAs, hero image; Business Problem section; How It Works (four-step obligation → reconciliation → authorization → on-chain movement workflow); Global section (Seamless / Secure / Global cards plus world banner image); Features (four cards — Multi-Party Ledger Reconciliation, Corporate Wallet Orchestration, Programmable Settlement Rules, End-to-End Transaction Traceability — with sticky sidebar nav); Prompt section (AI prompt chip with typed 'Ask Workslate AI' response); Footer; Docs page reached via the `#/docs` hash route (Web3j / BPMN / EVM architecture field guide with search); FAQ structured data emitted from typed FAQ records. SEO keyword targets, used naturally in headings, body copy, alt/aria text and metadata: blockchain, EVM, EVM-compatible nodes, Web3j, Web3j Java integration, P2P workflows, peer-to-peer token transfer, multi-chain token tracking, Web3. Acceptance: matches reference at 1536px; stacks cleanly at 360px; Lighthouse 95+."

## Clarifications

### Session 2026-10-22

- Q: Does Workslate support Web3j today, or is Web3j integration only planned? → A: Planned only; Web3j integration is not currently supported and must be labeled as roadmap.
- Q: Where should the Docs navigation link take visitors? → A: The Docs page at the `#/docs` hash route — a Web3j / BPMN / EVM architecture field guide with search (supersedes the initial external-docs and in-page Developers-section decisions).
- Q: What final public domain should the canonical URL and sitemap use? → A: `workslate.ai`, with any `www` variant redirected to the canonical apex domain.
- Q: What exact destinations should Docs, Pricing, Sign In, Get Started, and Watch Demo use, in that order? → A: Superseded — Docs now uses the `#/docs` hash route and Watch video scrolls to `#how-it-works`; the Pricing, Sign In, and Get Started section components exist but are not mounted on the home route.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the product (Priority: P1)

A visitor arrives on the Workslate AI marketing site and quickly understands its
token-tracking and movement offering, the markets and EVM-compatible networks it
covers, and how to begin exploring the product.

**Why this priority**: Clear product understanding is the primary purpose of the
marketing site and enables visitors to decide whether to continue.

**Independent Test**: Review the page from its opening section through its feature
sections and verify the product and its four core capabilities are understandable
without navigating away.

**Acceptance Scenarios**:

1. **Given** a visitor opens the page, **When** the hero is presented, **Then** it
   displays the exact heading "Reconcile First. Move Value with Confidence.", a
   supporting paragraph, Register for demo and Watch video calls to action, a typing
   AI prompt chip, and the hero illustration.
2. **Given** a visitor explores the feature sections, **When** they reach each
   capability, **Then** they can identify multi-party ledger reconciliation,
   corporate wallet orchestration, programmable settlement rules, and end-to-end
   transaction traceability.
3. **Given** a visitor selects a header navigation item, **When** the action completes,
   **Then** they reach the corresponding page section or route, including the Docs
   page at `#/docs` and the Features dropdown entries.

---

### User Story 2 - Evaluate workflows and developer roadmap (Priority: P2)

A prospective user or developer reviews how peer-to-peer token transfers work and
whether the planned Web3j / Java integration is relevant to their needs.

**Why this priority**: Explaining the workflow and developer integration helps
qualified visitors evaluate the platform beyond the initial feature summary.

**Independent Test**: Review the How It Works section and the Docs page at `#/docs`,
and verify a visitor can describe the P2P workflow at a high level and identify
Web3j / Java integration as planned, not currently supported.

**Acceptance Scenarios**:

1. **Given** a visitor reaches How It Works, **When** they read the section, **Then**
   they see an ordered, understandable description of the P2P transfer workflow.
2. **Given** a Java developer opens the Docs page, **When** they review the field
   guide, **Then** they can find the Web3j / Java integration overview explicitly
   labeled as planned, without claims that it is currently available, and can
   search the guide via the search dialog.

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

- At a 360px viewport, diagrams, feature illustrations, and currency symbols remain
  understandable without horizontal page overflow.
- At a 1536px viewport, the page preserves the reference's section order, composition,
  and visual hierarchy. The available reference images use different page layouts;
  the selected hero and feature reference must be used consistently for comparison.
- If a diagram cannot be interpreted visually, its accessible name or description
  communicates its purpose and key relationships.
- If a configured navigation or call-to-action destination is unavailable, the control MUST be disabled (visually grayed out with `aria-disabled="true"`) or removed from the rendered markup.
- If a product capability or integration detail has not been confirmed, page copy and
  structured data must not state it as fact.
- If an FAQ answer changes, its visible content and structured data must remain
  consistent.
- If external page metadata is unavailable, the page still provides its own complete,
  unique metadata and crawlable content.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST present the Workslate AI logo and a header with Home,
  How it works, Global, Docs, a Features dropdown (listing the four feature cards),
  a Register for demo call to action, and a mobile menu. Home MUST navigate to
  `#home` (the top of the page); How it works and Global MUST navigate to
  `#how-it-works` and `#global`; Docs MUST navigate to the `#/docs` hash route;
  Features dropdown entries MUST navigate to `#feature-01` through `#feature-04`.
- **FR-002**: The hero MUST include an eyebrow, the exact heading "Reconcile First.
  Move Value with Confidence.", supporting paragraph, Register for demo and Watch
  video calls to action, a typing AI prompt chip, and the hero illustration. Watch
  video MUST scroll to `#how-it-works` and trigger the workflow video affordance.
- **FR-003**: The site MUST present a Business Problem section describing the
  reconciliation gap with a pain-point card.
- **FR-004**: The site MUST present a Global section with Seamless, Secure, and
  Global cards plus a world banner image.
- **FR-005**: The site MUST present a Features section with four cards — Multi-Party
  Ledger Reconciliation, Corporate Wallet Orchestration, Programmable Settlement
  Rules, and End-to-End Transaction Traceability — each with a responsive
  illustration and a sticky sidebar nav.
- **FR-006**: The site MUST present a How It Works section that explains the
  four-step P2P workflow (business obligation, intelligent ledger reconciliation,
  settlement authorization, on-chain token movement) in ordered steps, plus a
  Prompt section rendering an AI response with the typing text renderer.
- **FR-007**: The site MUST present the Web3j / Java integration as planned roadmap
  work and MUST NOT imply it is currently supported. The Docs page at `#/docs` MUST
  present the Web3j / BPMN / EVM architecture field guide with working search.
- **FR-008**: The site MUST present a footer and FAQ structured data. FAQPage JSON-LD
  MUST be generated from the same typed FAQ records used for FAQ content.
- **FR-009**: Page copy, headings, metadata, and diagram descriptions MUST use the
  requested terms where contextually appropriate: blockchain, EVM, EVM-compatible nodes,
  Web3j, Web3j Java integration, P2P workflows, peer-to-peer token transfer,
  multi-chain token tracking, and Web3. Terms should appear in headings, body copy,
  alt text, aria labels, and metadata without keyword stuffing.
- **FR-010**: Product claims MUST be limited to capabilities confirmed as part of the
  product description or independently verified product information.
- **FR-011**: Equivalent content and controls MUST be presented consistently across
  page sections.
- **FR-012**: Icons, logos, and badges SHOULD prefer vector artwork; raster imagery
  is permitted for hero, banner, and feature illustrations and MUST be served as
  responsive AVIF/WebP/JPEG `srcset` variants (480/768/1200/max widths) with
  explicit dimensions and lazy loading below the fold.
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
  configured destination or perform a clearly identified in-page action. Docs MUST
  use the `#/docs` route and Watch video the scroll/playback behavior specified in
  FR-001 and FR-002. Footer links MUST be limited to in-page anchors defined in FR-021 until
  product-approved external destinations are explicitly added to this specification's FR-019 requirement text.
- **FR-020**: The sitemap MUST use `https://workslate.ai` as its public origin. The
  canonical host `https://workslate.ai` MUST redirect any `www` variant to the apex
  domain (e.g., `https://www.workslate.ai/` → `https://workslate.ai/`).
- **FR-021**: The page MUST include anchor targets for `#home`, `#how-it-works`,
  `#global`, `#features`, `#feature-01` through `#feature-04`, `#prompt`, and
  `#footer`, plus the `#/docs` hash route for the Docs page. Copy MUST NOT imply
  that account authentication, pricing checkout, or other unavailable product
  functionality is offered by the marketing site.

### Key Entities *(include if data involved)*

- **Page section**: A named content region with a user-facing purpose, including
  header, hero, feature sections, workflow, developer overview, FAQ, and footer.
- **Navigation or call-to-action link**: A labeled control and its configured
  destination or in-page action.
- **Network diagram**: A visual representation of markets or EVM-compatible networks
  and their relationships, with an accessible description.
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

- This feature is a single public marketing page plus the `#/docs` field-guide
  route; it does not implement sign-in, account creation, token transfers, or a
  live transaction feed. The Pricing, Sign In, Get Started, FAQ, and Developers
  section components remain in the codebase but are not currently mounted on the
  home route.
- Footer links are in-page anchors only; external footer
  destinations may be added once product-approved.
- The final public domain is `workslate.ai`; the `www` variant redirects to the apex
  canonical domain.
- Home navigates to `#home` (page top); How it works, Global, and Features navigate to
  `#how-it-works`, `#global`, and `#features` (dropdown entries to `#feature-01`–`#feature-04`);
  Docs navigates to the `#/docs` hash route; Watch video scrolls to `#how-it-works`.
  Register for demo is a non-navigating call-to-action affordance. Account-related
  copy must be product-approved and must not imply unavailable functionality.
- The provided description is the authority for platform capabilities, except that
  Web3j / Java integration is planned and not currently supported. Additional claims,
  including specific AI behaviors or integration guarantees, require product
  verification.
- `design/Workslate–SinglePage.png` is the selected visual reference for the page.
  The requested How It Works, Developers, and FAQ sections remain in scope.
- The project constitution remains authoritative for implementation architecture,
  reusable component organization, mobile-first breakpoints, accessibility,
  performance budgets, and required CI checks. This specification focuses on the
  page content and user-observable outcomes.
