# Research website migration

## Baseline and preservation
- Branch: `revamp/research-site`; original implementation: `35ff182` on `main`.
- Plain HTML, SCSS/CSS and JavaScript, no package manifest/build. Main `/` uses hash sections; older experiments live under `old_work_in_progress_homepage/` and `random_stuff/`.
- GitHub Pages user repository; no checked-in Actions workflow or CNAME. Remote Pages settings have not yet been verified.
- Preserve the PDF résumé (`data/Web-Resume-KhawajaAbaidUllah.pdf`), contact URLs, Teras, codriver, education and Fulbright history. Older projects become a text archive.
- Replace Bootstrap 4/5, jQuery, Popper, Font Awesome CDN, Google Fonts request and typing script with static Astro components, local fonts and minimal theme/menu JavaScript.
- Existing source/assets remain untouched until replacement verification. Only `public/` and Astro-generated assets ship in the new artifact.

## Sequence
1. Foundation: current stable Astro, strict TypeScript, tokens, semantic layout, theme/navigation, SEO and Pages workflow.
2. Content: validated public-only collections, verified paper metadata, profile and selected engineering; no confidential manuscript source.
3. Homepage: editorial typography, sparse SVG motif, research directions, selected work, publications, engineering, bio and news.
4. Detail pages: research, public case studies, publications, projects/archive, about and 404.
5. Verify: type/build checks, confidentiality and link checks, responsive/theme/keyboard/no-JS checks, performance and deployment configuration; document remaining external limitations.

## Content decisions
- Specification directory is `khawaja-website-revamp-spec/`; read files 00–08 in order.
- User-supplied current PhD identity supersedes the older institutional MS biography.
- Existing CV is preserved exactly; it dates from October 2025 and should eventually be replaced by the owner.
- No suitable portrait in repository: use the specified network motif without a portrait.
- Google Scholar, unverified paper links, hobbies and teaching/service are omitted until sourced.
- Fontus detailed content/report/code require public-use approval; requested during implementation.
- Specification files and ZIP stay local and are excluded from deployment and new commits.

## Implementation outcome
- Eight static pages, four validated collections, local fonts, native BibTeX, responsive navigation, system/manual themes, SVG figures, SEO, and a working CV URL.
- Public ADS-C and LLM paper metadata/links verified; full author order retained. Only two selected publications are shown because only two independent papers were approved/verified.
- Owner approved Fontus as a brief class-project page based only on the public README. Detailed failure analysis and the report/modeling-pivot story are excluded.
- A privacy regression exposed draft-image emission through the normal glob loader. Added a small build-only YAML parser and an early public-content loader, plus regression tests; both content and images are now excluded before processing. A second public-only query gate remains in place.
- Original diagram SVGs are labeled conceptual. No portrait was added because none was supplied.
- Research features and citation components derive labels from their entries, so adding a new entry does not require component edits.
- No empty notes/direction routes, Scholar placeholder, hobbies, or teaching/service claims were added.
- Runtime JS is about 650 bytes gzip; no framework/runtime/CDN dependencies from the old site remain in the production artifact.
- Local verification is recorded in `QA_REPORT.md`. Official workflow validation passes. Remote Pages currently uses legacy deployment; no remote settings or live site were changed.

## Legacy cleanup
After the replacement passed build, content/privacy, link, responsive, accessibility, and browser checks, the old root HTML, CSS/SCSS, JS, fonts/logo wall, construction image, and experiment folders were removed from the working tree. They remain recoverable at `35ff182`. Older substantive projects are preserved in the structured text archive. The résumé was copied byte-for-byte into the new public directory with its former URL retained.
