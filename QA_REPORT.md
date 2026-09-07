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

- The remote repository still uses legacy branch-based Pages deployment. No changes have been pushed, merged, or published. Switch Pages to GitHub Actions and merge the reviewed branch for launch.
- A successful remote deployment and live-site checks remain pending launch.
- The CV is the supplied October 2025 PDF, preserved byte-for-byte; the owner should provide a current academic CV.
- LinkedIn blocks automated link verification; the preserved owner-supplied URL needs a normal-browser check if its profile slug changes.
- These are browser-engine and viewport checks, not physical iPhone/Android testing or a full screen-reader audit.
