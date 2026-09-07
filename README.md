# Khawaja Abaid Ullah — research website

A static academic website built with Astro 7, strict TypeScript, Astro Content Collections, and plain CSS. The design uses locally hosted Newsreader and Inter, a warm light palette, an OS-aware dark theme, and lightweight SVG research diagrams. There is no UI framework, analytics, or third-party client script.

## Development

Use Node 24 LTS (minimum 22.12).

```sh
npm ci
npm run dev
```

Astro prints the local URL. Astro 7 may run its development server in the background; use `npx astro dev stop` to stop it.

```sh
npm run check         # Astro + TypeScript diagnostics
npm run build         # Static generation plus output/link/privacy checks
npm run preview       # Serve the production build
npm run verify        # Check and build
npm run test:content  # Synthetic privacy/validation regression tests; rebuilds dist
```

Do not run `test:content` concurrently with another build or development server. It creates synthetic fixtures, tests their exclusion, removes them in a `finally` block, and rebuilds the clean site. It never uses real manuscript text.

## Content editing

| Location | Purpose |
| --- | --- |
| `src/data/profile.ts` | Identity, contact/profile URLs, navigation, research directions |
| `src/content/publications/` | Publication metadata and BibTeX |
| `src/content/research/` | Markdown research pages and feature metadata |
| `src/content/projects/` | Research software, engineering, and text-only archive |
| `src/content/news/` | Dated news entries |
| `src/assets/research/` | Approved public diagrams/images |
| `src/styles/tokens.css` | Theme, fonts, design tokens |
| `src/styles/global.css` | Shared layout and responsive rules |
| `public/cv.pdf` | Downloadable CV |

Add a Markdown file to the appropriate collection; no component change is needed. File names become IDs. A research entry named `new-study.md` generates `/research/new-study/`. IDs should use lowercase letters, digits, and hyphens. News and publications sort by date; featured research and projects sort by `order`.

Every visible entry must explicitly contain both `public: true` and `draft: false`. `selected: true` enables homepage selection, subject to the specified limits. Projects use `category: research-system`, `engineering`, or `archive`.

Example public research entry (replace the sample content before publishing):

```yaml
---
title: A descriptive research title
category: Machine Learning Security
summary: One concrete sentence about the contribution.
date: 2026-09-01
authors: ['Khawaja Abaid Ullah']
status: Preprint
public: true
draft: false
selected: false
order: 3
tags: ['ML security']
links:
  - label: Paper
    href: https://example.org/public-paper
relatedPublications: []
---
## Research question
Explain the problem and evidence here.
```

Publications additionally support `venue`, `arxiv`, `pdf`, and `bibtex`. Research and publication schemas both support authors, status, date, venue, tags, links, images, and an optional `metric` (`value`, `label`, optional `context`). Use `image: ../../assets/research/example.svg` and descriptive `imageAlt`; missing images or alt text fail the build. Prefer small, legible figures over full paper screenshots. Use actual metrics only with public supporting evidence.

News files need `date`, `text`, optional `href`, and the visibility fields. Use ISO dates; month-only events use day 01 for sorting and display only the month/year. Teaching, service, hobbies, and Scholar links are intentionally omitted until supplied.

## Confidentiality

**Keep confidential manuscript text, PDFs, and figures outside this repository.** A public Git repository can expose source files regardless of whether the website renders them. Everything in `public/` is copied as-is into the production artifact; only approved public downloads belong there.

`public-content-loader.ts` rejects nonpublic/draft entries before Markdown rendering or Astro image processing. A second shared query gate controls every listing and research route. This is deliberate: a standard glob loader plus a page-level filter can still emit an excluded entry's images. The small build-only `yaml` dependency supports this early gate.

The regression test checks private entries, drafts marked selected, private images, public-to-private transitions, and invalid publication metadata. The normal build checks generated pages, local links/fragments, required assets, sitemap, metadata, CV signatures, excluded strings, and a 30 KB compressed JS budget. These tests support careful content review; they cannot identify an unknown confidential phrase that someone manually pastes into a public page.

Fontus is approved **only as a brief class-project overview based on its public README**. Do not add the report, 3D-to-2D account, or detailed failure analysis without separate approval. See `CONTENT_SOURCES.md`.

## CV

The supplied October 2025 résumé is retained without edits. To update it, replace `public/cv.pdf` and copy the same file to `public/data/Web-Resume-KhawajaAbaidUllah.pdf` so older résumé links remain valid. An up-to-date academic CV should be supplied by the owner; no résumé facts were invented during migration.

## GitHub Pages

The configured site is `https://khawajaabaid.github.io`, with no `base` because this is a GitHub user-site repository. The workflow uses official `actions/checkout@v7`, `withastro/action@v6`, and `actions/deploy-pages@v5`. Node 24 builds, checks, runs privacy regressions, and uploads only `dist/`. Deployments run only from `main`; manual runs from other branches can build without publishing.

For first launch:

1. Review the migration branch and `QA_REPORT.md`.
2. Set **Settings → Pages → Build and deployment → Source → GitHub Actions**. The repository was using legacy branch deployment at inspection time.
3. Merge the reviewed migration into `main` and monitor the Pages workflow.
4. Verify the live homepage, research pages, CV, sitemap, and 404.

No live deployment is performed by local development commands. The migration does not change the remote Pages setting automatically. A future custom domain requires updating `site`, robots/sitemap URLs, the output-check origin, and the domain configuration together.

## Design and maintenance

The homepage keeps research above engineering. Content remains available without JavaScript; JS only enhances the mobile menu and theme toggle. The menu supports Escape, focus is visible, BibTeX uses native details, reduced motion disables animation/transitions, and print uses white/black.

The default social-sharing image is `public/og/default.png`; its editable source is `src/assets/og-default.svg`. Fonts retain their OFL licenses in `public/fonts/`. Research figures are original schematic SVGs, not measured plots.

See `MIGRATION_NOTES.md` for the baseline and decisions, `CONTENT_SOURCES.md` for evidence, and `QA_REPORT.md` for verification and launch limitations.
