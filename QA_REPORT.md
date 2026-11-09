# Local portfolio update — QA and handoff

Completed November 9, 2026 (America/New_York). All work is local. No commit, push, publication, remote write, or deployment was performed. The initial working tree was clean and there were no applicable AGENTS.md files.

## What changed and why

- Replaced unsupported current-research claims with the owner's current positioning: first-year ECE PhD student and GRA at RIT KAS Lab, studying multi-agent coordination, decentralized task allocation and LLM-assisted planning.
- Separated current questions, emerging algorithm-discovery interests, long-term on-device reasoning/search-and-rescue goals, and other research contributions. Reading inspirations explicitly link to other researchers' work.
- Per the owner’s latest correction, preserved the live landing layout: full-width room panorama above the connected desk-blotter panel, four original tabs, bookshelf navigation and original spacing. Updated the information inside these components and restored the original homepage experience ledger/archive and About-page structure. No side-by-side hero or added homepage header remains.
- Put the coordination testbed first, followed by Teras, merged Keras samplers/tests, ADS-C code, codriver, and the December 2025 Fontus simulation. Earlier student projects remain in a collapsed archive. Independent contributions and employment have separate descriptions.
- Corrected publication statuses, scoped coordination findings to tested simulations, distinguished unchanged ADS-C top-1 labels from changed probabilities, moved metrics into a contextual project page, and relabelled ADS-C as related implementation for AntidistillBench. The benchmark stores only its verified year; no day-level submission date or public artifact is invented. Verified the collaborative paper's title and author order, retaining it as LLM evaluation rather than alignment-training specialization.
- Corrected assistantship terminology, first-in-class wording, AWS engineering scope, MS/Fulbright/GPA chronology, robotics TA materials, and academic reviewing service.
- Added a verified October 29, 2026 coordination announcement, using the arXiv posting date. Exact public posting dates and month-only CV milestones have distinct display precision.
- Updated descriptions, titles, Open Graph/Twitter metadata, Person structured data, accessible illustration labels, visible portrait/bookshelf labels, and the generated share image.

See `CONTENT_SOURCES.md` for the concise claim/evidence/correction audit and source links.

## Validation completed

- `npm run verify`: Astro/TypeScript check passed with **0 errors, 0 warnings, 0 hints**; static build passed for **9 routes**.
- `npm run test:content`: private/draft text, routes and images stay excluded; revoking visibility removes previously public material; invalid author/date data fails validation; final clean output rebuild passed.
- `node scripts/verify-output.mjs`: internal links/fragments, unique HTML IDs and page titles, canonical URLs, matching description/Open Graph/Twitter metadata, sitemap, required files, PDF signatures/aliases, source exclusion and JS budget passed. Homepage project anchors have a prefix to prevent duplicate publication/project IDs. Client JavaScript is **2,166 bytes gzipped**, below the existing 30 KB budget.
- `QA_PACKAGE_DIR=/tmp/portfolio-qa node scripts/browser-qa.cjs`: passed in installed **Google Chrome (Playwright Chromium driver)** for all 9 routes at **7 widths (360, 390, 430, 768, 1024, 1280, 1440)** in **both themes**. WCAG A/AA automated axe checks at desktop/mobile sizes reported no violations.
- Browser interactions passed: keyboard skip link, room hotspots and four-tab arrow/Home/End navigation, theme switching/persistence/system changes, motion pause and live reduced-motion preference changes, static reduced-motion scene, keyboard BibTeX/archive disclosures, print, 200% zoom, no-JavaScript reading/navigation, and no console/page errors.
- Compared live and local landing geometry at 1280px and 390px: room position/dimensions, tab position/dimensions and connected panel position/width match exactly. The panel height adjusts naturally to the corrected copy. Comparison data and screenshots are in `artifacts/landing-layout-comparison.json` and `artifacts/restored-top-*.png`. Visually reviewed desktop and mobile screenshots in both themes, plus research/project layouts and the regenerated 1200×630 social preview. No overlap or horizontal clipping was found. Screenshots and machine-readable results are in ignored `artifacts/`.
- The live homepage returned HTTP 200 (read-only availability check). All **15 existing publication/PDF/code URLs** checked returned HTTP 200; redirects were recorded in `artifacts/link-check.json`. Primary arXiv records verified public dates, titles and author order. The Keras PR is merged and documents all four backends plus unit tests. ADS-C's README documents ADS-C rather than a separate benchmark release.
- Reviewed current source/generated copy for stale wording and for emerging interests or long-term goals being represented as completed contributions.
- Both CV aliases remain byte-for-byte identical to their original versions: SHA-256 `d29a814d509fe4449fe9828e7a92627ae2f07b6eaaf0bbe3a8e1641df1197f30`.
- `git diff --check` passed. Application dependency files and hosting/deployment configuration were unchanged. QA dependencies were installed outside the checkout.

## Limits and remaining facts

- Browser checks used Chrome. Matching Playwright Firefox/WebKit runtimes were unavailable; no claim of cross-engine verification is made. Automated accessibility checks do not replace testing with a screen reader.
- No editable CV source was found. Its old github.io portfolio URL remains inside the unmodified PDFs, preserving the supplied layout. An editable source or updated PDF is needed to change it.
- No public codriver repository/model was verified. FineWebEdu, CodeContests, fill-in-the-middle and 8× H100 details were omitted pending evidence.
- AntidistillBench's exact submission date, detailed matched-cost budget definitions and public-release links remain unverified. Only the supported threat-model overview, comparison protocol and manuscript-under-review status are used.
- The collaborative social-attraction paper's review status/venue was not confirmed; it is labelled preprint.

These gaps do not block the narrower supported site copy. The earlier September migration record remains in `MIGRATION_NOTES.md` and is explicitly historical.

## Files changed

- `CONTENT_SOURCES.md`
- `MIGRATION_NOTES.md`
- `QA_REPORT.md`
- `README.md`
- `public/og/default.png`
- `scripts/browser-qa.cjs`
- `scripts/verify-output.mjs`
- `src/assets/og-default.svg`
- `src/components/CareerLedger.astro`
- `src/components/Hero.astro`
- `src/components/NewsList.astro`
- `src/components/ProjectRow.astro`
- `src/components/PublicationItem.astro`
- `src/components/StudyRoomScene.astro`
- `src/content.config.ts`
- `src/content/news/2026-05-01.md`
- `src/content/news/2026-06-01.md`
- `src/content/news/2026-07-16.md`
- `src/content/news/2026-08-10.md`
- `src/content/news/2026-10-29.md`
- `src/content/projects/ads-c.md`
- `src/content/projects/codriver.md`
- `src/content/projects/coordination.md`
- `src/content/projects/fontus.md`
- `src/content/projects/keras.md`
- `src/content/projects/micrograd-c.md`
- `src/content/projects/teras.md`
- `src/content/publications/ads-c.md`
- `src/content/publications/consensus-within-competition-between.md`
- `src/content/publications/reversing-incentive.md`
- `src/content/publications/social-attraction.md`
- `src/content/research/ads-c.md`
- `src/content/research/coordination.md`
- `src/content/research/fontus.md`
- `src/data/profile.ts`
- `src/layouts/BaseLayout.astro`
- `src/pages/about.astro`
- `src/pages/index.astro`
- `src/pages/projects.astro`
- `src/pages/publications.astro`
- `src/pages/research/[id].astro`
- `src/pages/research/index.astro`
