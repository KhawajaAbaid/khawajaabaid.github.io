# Verification report

Browser/performance verification: September 6, 2026. Clean-install, build, privacy, and workflow checks repeated successfully September 7, 2026. Tested the local production build at `http://127.0.0.1:4322/`.

## Results

| Check | Result |
| --- | --- |
| `npm run verify` | Pass: 24 source files, zero errors/warnings/hints; eight generated pages |
| `npm run test:content` | Pass: private/draft text and images excluded; public-to-private content removed; invalid author/date metadata rejected |
| Local routes, links, fragments, assets | Pass across all eight pages, including CV and legacy résumé URL |
| External destinations | Paper, code, RIT, thesis, and GitHub links resolve; LinkedIn returns HTTP 999 to automated requests |
| Workflow | `actionlint` passes; official Astro action inputs checked against v6 source |
| Accessibility | Zero axe violations on all eight pages in Chromium; light/dark homepage checked |
| Browser coverage | Chromium 153, Firefox 155, WebKit 26.6 via Playwright 1.63.0 |
| Viewports | 1440, 1280, 1024, 768, 430, 390, 360 px on every route in each engine; no horizontal overflow |
| Keyboard | Skip link, visible focus, mobile menu, Escape/focus return, native BibTeX details |
| Themes | Manual toggle and persistence; OS initial preference and OS changes without override |
| Reduced motion | Motif animation disabled; global transitions/animations disabled |
| No JavaScript | Content and mobile navigation available; OS dark theme works; enhancement controls hidden |
| Print / zoom | White print background with navigation hidden; 200% layout check passes |
| Console / images | No console errors; research images load in all three engines |
| SEO | Canonicals, unique titles/descriptions, OG PNG, favicon, Person JSON-LD, ADS-C academic metadata, sitemap and robots verified |
| Initial JavaScript | Approximately 650 bytes gzip, inline menu/theme enhancement only |

WebKit uses macOS's Option–Tab behavior to include links when full keyboard access is not enabled. The test uses that native shortcut rather than changing system preferences or modifying normal link semantics.

## Lighthouse

Lighthouse 13.4.1, default mobile simulation against the production preview:

- Performance: **100**
- Accessibility: **100**
- Best Practices: **100**
- SEO: **100**
- Largest Contentful Paint: **1.6 s**
- Cumulative Layout Shift: **0**
- Total Blocking Time: **0 ms**

These are local lab measurements, not a guarantee of real-user performance after deployment.

## Privacy regression details

The initial standard glob-loader implementation passed text exclusion but emitted a draft image. It was replaced with an early public-content loader that gates entries before Markdown and image processing. The regression suite now tests image content, asset names, rendered text, metadata, generated routes, and sitemap; it also tests revoking a previously public entry. No real confidential manuscript content was used or copied into the repository.

## Repeating browser QA

Browser tooling is intentionally separate from site dependencies:

```sh
npm install --prefix /tmp/research-site-qa playwright@1.63.0 @axe-core/playwright@4.13.0
/tmp/research-site-qa/node_modules/.bin/playwright install chromium firefox webkit
npm run build
npm run preview -- --host 127.0.0.1 --port 4322
# In a second terminal:
QA_PACKAGE_DIR=/tmp/research-site-qa node scripts/browser-qa.cjs
```

`QA_URL` may override the preview origin. The browser script saves screenshots and results to ignored `artifacts/`. Lighthouse can be run separately using its CLI against the same production preview. The original local Lighthouse HTML/JSON reports and screenshots are in `artifacts/`.

## Launch limitations

- Production was published September 7, 2026 using GitHub Actions; live checks passed as recorded below.
- The CV is the supplied October 2025 PDF, preserved byte-for-byte; the owner should provide a current academic CV.
- LinkedIn blocks automated link verification; the preserved owner-supplied URL needs a normal-browser check if its profile slug changes.
- These are browser-engine and viewport checks, not physical iPhone/Android testing or a full screen-reader audit.

## Fontus expansion — September 7, 2026

After the owner clarified that the full story is public, the Fontus page was expanded with the modeling pivot, environment/PPO setup, qualitative lazy-agent diagnosis, lessons, and proposed follow-ups. Homepage and project summaries were updated. The two Fontus-specific prohibited-phrase checks were removed; the public-content gate and anonymous-manuscript protections remain intact.

`npm run verify` and `npm run test:content` pass. Targeted Chromium checks on the homepage, projects page, and Fontus page pass at 1440/390 px in light/dark mode, with no overflow, console errors, or axe violations. Updated Fontus screenshots are saved in `artifacts/`. A technical-report URL has not been supplied, so no report link is fabricated.

## Production launch — September 7, 2026

User authorized publication. `main` was fast-forwarded to the reviewed code commit `d409cb7`, and GitHub Pages was switched from legacy branch deployment to Actions. [The launch workflow](https://github.com/KhawajaAbaid/khawajaabaid.github.io/actions/runs/34143942610) completed both build and deploy successfully.

Verified at https://khawajaabaid.github.io:

- All eight HTML routes, both CV URLs, robots, both sitemap files, and OG image return HTTP 200.
- An unknown route returns HTTP 404 with the custom “Nothing here.” page.
- Both served PDFs match the supplied CV byte-for-byte by SHA-256.
- The homepage metric and expanded Fontus story are present; synthetic private markers are absent.
- Live Chromium smoke checks pass for desktop/mobile, theme persistence, menu navigation, layout overflow, and console errors.

Local evidence is saved in `artifacts/live-verification.json` and live-site screenshots. No unapproved manuscript material or specification files were published.

## Hero credentials — September 7, 2026

At the owner's request, Fulbright Scholar and Former AWS AI/ML Intern are now emphasized directly below the PhD role in the hero. `npm run verify` passes. Chromium checks confirm both credentials are in the initial viewport at 1440, 768, 390, and 360 px in light/dark mode, with no overflow, console errors, or axe violations. No additional JavaScript or dependencies were added.
