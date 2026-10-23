<!--
Sync Impact Report
Version change: uninitialized -> 1.0.0
Modified principles: placeholder -> I. React SPA Architecture; placeholder -> II. Typed, Reusable UI; placeholder -> III. Vector-First Assets; placeholder -> IV. Mobile-First Responsive Design; placeholder -> V. Measurable Performance
Added sections: Accessibility, SEO, and Content Integrity; Delivery Quality Gates
Removed sections: none
Follow-up TODOs: Confirm the original ratification date.
-->
# Workslate Constitution

## Core Principles

### I. React SPA Architecture
The application MUST be a React 18 or newer single-page application built with Vite
and TypeScript. UI MUST use functional components; class components are not permitted.

### II. Typed, Reusable UI
Every UI block MUST be implemented as a typed, props-driven component under
`/src/components`, organized into atoms, molecules, and sections. Shared markup MUST
not be duplicated. Reusable content and page copy MUST live in `/src/content`, separate
from presentation, so changes remain consistent and maintainable.

### III. Vector-First Assets
Illustrations, icons, logos, and chain badges MUST be inline SVG components handled
through SVGR. Raster images MUST NOT be used, except for an optional Open Graph share
image. This keeps visual assets crisp, scalable, and consistent across screen sizes.

### IV. Mobile-First Responsive Design
Layouts MUST be designed mobile-first and tested at the 360px, 768px, 1024px, and
1536px breakpoints. Typography MUST use fluid sizing with `clamp()` where appropriate
to maintain legibility and hierarchy across viewport sizes.

### V. Measurable Performance
On the Lighthouse mobile profile, each page MUST achieve scores of at least 90 for
Performance, Accessibility, Best Practices, and SEO. Core Web Vitals and bundle budgets
MUST meet: LCP under 2.0 seconds, CLS under 0.05, TBT under 150 milliseconds, and
JavaScript under 100 KB gzip. Regressions beyond any budget MUST be resolved before
merge.

## Accessibility, SEO, and Content Integrity

Every page MUST provide a unique title, meta description, canonical URL, Open Graph
metadata, and JSON-LD structured data. Pages MUST use semantic headings with exactly
one `h1`, and their content MUST be crawlable in HTML through prerendering.

The application MUST meet WCAG 2.2 Level AA, support keyboard navigation, and provide
accessible names or descriptions for diagrams using ARIA labels. Content MUST only
claim features that the product actually provides; unsupported or unverified product
claims MUST NOT be published.

## Delivery Quality Gates

Lighthouse CI MUST run as a required continuous-integration check, enforce the
performance and page-quality budgets in this constitution, and pass before a change
can merge. Changes to page metadata, semantics, accessibility, content, assets, or
responsive behavior MUST be checked against the corresponding requirements above.

## Governance

This constitution defines non-negotiable product and implementation standards and
takes precedence over conflicting project guidance. Amendments MUST be proposed in
writing, reviewed with the affected requirements and implementation consequences
identified, and approved before adoption. A change that removes or materially
redefines a principle requires a MAJOR version increment; adding a principle or
materially expanding requirements requires a MINOR increment; clarifications and
non-semantic wording changes require a PATCH increment.

Pull requests and release reviews MUST verify compliance with the applicable
principles and quality gates. Any exception MUST document its rationale, scope, and
approval in the change record; it MUST NOT silently weaken a required CI gate.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): confirm the original adoption date | **Last Amended**: 2026-10-22
