---
title: 'ADS-C: Antidistillation Sampling for Classification'
summary: 'Proposed a margin-aware inference-time defense that preserves every served top-1 prediction while reducing distilled-student accuracy by 29.6 pp on CIFAR-10, 17.4 pp on CIFAR-100, and 13.3 pp on Tiny-ImageNet. Released with an open-source PyTorch evaluation harness across all three benchmarks and multiple student architectures.'
date: 2026-07-16
authors: ['Khawaja Abaid Ullah', 'Mohammad Javad Khojasteh']
status: Under review · IEEE OJCS
venue: arXiv:2607.15467
public: true
draft: false
selected: true
order: 1
tags: ['ML security', 'Antidistillation', 'Model extraction', 'PyTorch']
arxiv: '2607.15467'
pdf: https://arxiv.org/pdf/2607.15467
metric:
  value: '−29.6 pp'
  label: CIFAR-10 student accuracy (−17.4 pp CIFAR-100 · −13.3 pp Tiny-ImageNet)
  context: '0 pp served top-1 accuracy cost'
links:
  - { label: Paper (arXiv), href: 'https://arxiv.org/abs/2607.15467' }
  - { label: PyTorch Code, href: 'https://github.com/the-kas-lab/ADS-C' }
  - { label: Research Folio, href: '/research/ads-c/' }
bibtex: |
  @misc{ullah2026adsc,
    title = {ADS-C: Antidistillation Sampling for Classification},
    author = {Khawaja Abaid Ullah and Mohammad Javad Khojasteh},
    year = {2026},
    eprint = {2607.15467},
    archivePrefix = {arXiv},
    primaryClass = {cs.LG},
    url = {https://arxiv.org/abs/2607.15467}
  }
---
