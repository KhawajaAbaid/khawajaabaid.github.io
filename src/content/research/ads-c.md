---
title: 'ADS-C: Antidistillation Sampling for Classification'
shortTitle: ADS-C
category: Machine Learning Security
summary: 'An inference-time defense against model extraction that preserves every served top-1 prediction while degrading the supervision available to a distilling student.'
date: 2026-07-16
authors: ['Khawaja Abaid Ullah', 'Mohammad Javad Khojasteh']
status: Preprint
venue: arXiv
public: true
draft: false
selected: true
order: 1
tags: ['Model extraction', 'Antidistillation', 'Knowledge distillation']
image: ../../assets/research/ads-c.svg
imageAlt: 'ADS-C perturbs a teacher’s probability distribution within a per-input margin budget. The highest-probability class stays unchanged; the remaining probabilities provide less useful supervision for extraction. Bars are illustrative, not measured values.'
figureCaption: 'Conceptual overview: change the distillation signal while preserving the predicted class. Bar heights are illustrative.'
metric:
  value: '−29.6 pp'
  label: distilled-student accuracy on CIFAR-10
  context: '0 pp served top-1 accuracy cost in the reported experiment'
relatedPublications: [ads-c]
links:
  - { label: Paper, href: 'https://arxiv.org/abs/2607.15467' }
  - { label: Code, href: 'https://github.com/the-kas-lab/ADS-C' }
---
## The problem

A deployed classifier can reveal more than its answer. An adversary can query its probability outputs and use them to train a surrogate. The same soft-label structure that makes knowledge distillation useful can make a proprietary model easier to replicate.

## The core idea

ADS-C changes the probabilities returned by the model while protecting the identity of the highest-probability class. The aim is to reduce the value of those outputs as training targets without changing the top-1 answer a legitimate user receives.

## Why direct transfer fails

Antidistillation sampling was originally proposed for language models. Classification introduces a different confidence structure: well-trained classifiers can be highly confident. As the perturbation strength grows, the unmodified defense moves from an inert region to a regime where the teacher's accuracy degrades faster than the student's. Temperature softening shifts that transition without resolving the underlying trade-off.

## A per-input margin budget

ADS-C constrains the perturbation using the teacher's confidence margin for each input. A closed-form budget prevents a competing class from overtaking the original top class. This gives a per-query top-1 preservation guarantee, rather than relying on an average accuracy trade-off.

## Key findings

The public paper reports student accuracy reductions of **29.6 percentage points on CIFAR-10**, **17.4 on CIFAR-100**, and **13.3 on Tiny-ImageNet**, while preserving the served top-1 predictions.

The guarantee concerns top-1 predictions. It does not mean that the served probability distribution or its calibration remains unchanged. A hard-label attacker still receives the original labels. The benchmark results describe the evaluated distillation setup, not a guarantee against every extraction strategy.

## Reproducibility

The [public ADS-C repository](https://github.com/the-kas-lab/ADS-C) contains the implementation, experiment drivers, and configurations. See the [paper](https://arxiv.org/abs/2607.15467) for the threat model, analytical results, and experimental protocol.

## Related work

This project connects knowledge distillation with inference-time defenses against model extraction. The paper situates ADS-C alongside output perturbation approaches and the original antidistillation formulation. For the earlier master's work, see my [RIT thesis record](https://repository.rit.edu/theses/12584/).
