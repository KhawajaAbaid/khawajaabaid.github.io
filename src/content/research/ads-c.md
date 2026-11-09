---
title: "ADS-C: Antidistillation Sampling for Classification"
shortTitle: ADS-C
category: Machine Learning Security · Inference-Time Defense
summary: "An inference-time defense that changes served probability outputs while provably preserving top-1 predictions. It reduced soft-label distilled-student accuracy in the evaluated image-classification experiments; unchanged labels remain available to hard-label attackers."
date: 2026-07-16
authors: ["Khawaja Abaid Ullah", "Mohammad Javad Khojasteh"]
status: Preprint; under review, IEEE Open Journal of the Computer Society
venue: arXiv:2607.15467
public: true
draft: false
selected: true
order: 2
tags: ["Model extraction", "Antidistillation", "Margin bounds", "PyTorch"]
relatedPublications: [ads-c]
links:
  - { label: arXiv, href: "https://arxiv.org/abs/2607.15467" }
  - { label: PDF, href: "https://arxiv.org/pdf/2607.15467" }
  - { label: Code, href: "https://github.com/the-kas-lab/ADS-C" }
---

## Method and guarantee

ADS-C modifies the probability distribution returned by a classifier using a per-input confidence-margin budget. The bound preserves the classifier’s top-1 prediction for every input; it does not preserve the probability values or promise calibrated probabilities. The method targets model extraction through soft-label knowledge distillation. An attacker can still query the unchanged hard labels.

## A scoped experimental result

In the reported CIFAR-10 experiment at λ = 3, student top-1 accuracy fell from **81.44% ± 0.43** when distilling undefended outputs to **51.80% ± 0.38** with ADS-C outputs: a reduction of **29.64 percentage points** (about 29.6). Values are means ± standard deviations over three seeds, as reported in the public implementation. The defended teacher’s top-1 accuracy stayed unchanged. These results apply to the evaluated distillation setup, not all extraction attacks.

See the [paper](https://arxiv.org/abs/2607.15467) and [implementation and reproduction guide](https://github.com/the-kas-lab/ADS-C) for the tested models, other datasets, and full evaluation.

## Related benchmark contribution

AntidistillBench implements classification defenses under a common model-extraction threat model and a matched-cost evaluation protocol to compare suppression of student learning. Its manuscript is under review. The ADS-C repository linked here is related implementation code; it is not presented as a public release of AntidistillBench.
