---
title: 'ADS-C: Antidistillation Sampling for Classification'
shortTitle: ADS-C
category: Machine Learning Security · Inference-Time Defense
summary: 'A margin-aware inference-time defense against model extraction that preserves every served top-1 prediction while reducing distilled-student accuracy by 29.6 pp on CIFAR-10, 17.4 pp on CIFAR-100, and 13.3 pp on Tiny-ImageNet.'
date: 2026-07-16
authors: ['Khawaja Abaid Ullah', 'Mohammad Javad Khojasteh']
status: Under review · IEEE OJCS
venue: arXiv:2607.15467
public: true
draft: false
selected: true
order: 1
tags: ['Model extraction', 'Antidistillation', 'Knowledge distillation', 'PyTorch']
image: ../../assets/research/ads-c.svg
imageAlt: 'ADS-C perturbs a teacher’s probability distribution within a per-input margin budget. The highest-probability class stays unchanged; the remaining probabilities provide less useful supervision for extraction. Bars are illustrative, not measured values.'
figureCaption: 'Conceptual overview: perturb the non-maximal probability distribution within a closed-form per-input confidence margin budget so the top-1 class is strictly preserved. Bar heights are illustrative.'
metric:
  value: '−29.6 pp'
  label: distilled-student accuracy on CIFAR-10 (−17.4 pp CIFAR-100 · −13.3 pp Tiny-ImageNet)
  context: '0 pp served top-1 accuracy cost · Open-source PyTorch evaluation harness'
relatedPublications: [ads-c]
links:
  - { label: Paper (arXiv), href: 'https://arxiv.org/abs/2607.15467' }
  - { label: PyTorch Code, href: 'https://github.com/the-kas-lab/ADS-C' }
---
## Threat model: soft-label model extraction

When a deployed classifier serves probability vectors over an API, each query leaks structural dark knowledge about how the teacher relates classes. An adversary can query the API and train a surrogate student via knowledge distillation—extracting proprietary model capability at a fraction of the training cost.

## Margin-aware antidistillation sampling (ADS-C)

Antidistillation sampling was originally introduced for autoregressive language models. Directly applying uncalibrated exponential tilting to image classifiers fails because well-trained classifiers exhibit sharp confidence regimes: small perturbations remain inert, while larger perturbations flip the teacher's top-1 prediction faster than they degrade the student.

**ADS-C** resolves this by bounding each perturbation using a **closed-form per-input confidence margin budget**. For every query $x$, the defense computes the exact margin between the teacher's top-1 logit and runner-up classes, poisoning the non-top probability structure while mathematically guaranteeing that no competing class can overtake the served top-1 prediction.

## Empirical results & companion review

Across three standard vision benchmarks and multiple student architectures, ADS-C preserves **100% of served top-1 predictions** while reducing distilled-student accuracy by:

- **29.6 percentage points on CIFAR-10**
- **17.4 percentage points on CIFAR-100**
- **13.3 percentage points on Tiny-ImageNet**

In our companion review manuscript (*"Reversing the Incentive to Distill: A Review of Test-Time Antidistillation Defenses for Classification"*, under review, 2026), we built a **unified matched-cost benchmark** and a **method-agnostic top-1-preservation wrapper** across prior test-time defenses—showing that directed perturbations under top-1 preservation drive distilled students **34.5 pp (CIFAR-10)** and **47.7 pp (CIFAR-100)** below the hard-label baseline.

## Open-source PyTorch harness

The complete defense and its multi-architecture evaluation harness are released as open-source PyTorch code in [`the-kas-lab/ADS-C`](https://github.com/the-kas-lab/ADS-C), alongside the preprint [`arXiv:2607.15467`](https://arxiv.org/abs/2607.15467) and my earlier [RIT Master's Thesis](https://repository.rit.edu/theses/12584/).
