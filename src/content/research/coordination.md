---
title: "Consensus Within, Competition Between: Decentralized LLM Teams for Perimeter Defense"
shortTitle: Decentralized LLM Coordination Testbed
category: Current research · Multi-agent coordination
summary: "Reproducible perimeter-defense simulations comparing centralized, auction-based consensus and independent LLM teams under communication constraints."
date: 2026-10-29
authors: ["Khawaja Abaid Ullah", "Ananya Acharya", "Mohammad Javad Khojasteh"]
status: Preprint; under review
public: true
draft: false
selected: true
order: 1
tags: ["Decentralized task allocation", "CBAA", "LLM-assisted planning"]
relatedPublications: [consensus-within-competition-between]
links:
  - { label: Paper, href: "https://arxiv.org/abs/2610.41044" }
  - {
      label: Code,
      href: "https://github.com/the-kas-lab/consensus-within-competition-between",
    }
---

## Research question

How should LLM-assisted teams distribute decisions and resolve competing task assignments when communication is unreliable? Perimeter defense is an experimental setting for this broader coordination question.

## Implementation and evaluated scope

I developed a reproducible simulation testbed comparing a central commander, decentralized agents using the consensus-based auction algorithm (CBAA), and independently acting agents. The experiments vary network conditions and the authority given to the LLM over bid computation, and examine multimodal visual deception.

In the evaluated perimeter-defense simulations, the auction-based consensus teams had lower breach rates than the centralized or independent teams. These comparisons describe the tested agents, scenarios and network conditions; they do not establish a universal advantage for decentralized teams.

The public repository contains the simulator, planners, experiment runners and replay viewer. These are simulation experiments, not physical robot deployments.
