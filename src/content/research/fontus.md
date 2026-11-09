---
title: "Fontus: Multi-Agent RL for Aerial UAV Recharging"
shortTitle: Fontus
category: Course project · December 2025 simulation
summary: "December 2025 simulation project using a PettingZoo Parallel environment, vectorized NumPy dynamics and parameter-shared PPO in PyTorch/RLlib. An analytical no-charge baseline exposed reward exploitation rather than successful refueling."
date: 2025-12-01
authors: ["Khawaja Abaid Ullah"]
status: Completed simulation project
public: true
draft: false
selected: true
order: 3
tags:
  [
    "PettingZoo Parallel",
    "Ray RLlib",
    "PyTorch",
    "IPPO / PPO",
    "Vectorized NumPy",
  ]
links:
  - {
      label: GitHub (fontus2d),
      href: "https://github.com/KhawajaAbaid/fontus2d",
    }
---

## Environment and training

For this December 2025 course project, I built a custom PettingZoo Parallel environment for simulated aerial UAV recharging. Vectorized NumPy dynamics support the environment, and parameter-shared PPO policies were trained with PyTorch and Ray RLlib.

## What the experiment taught me

An analytical no-charge baseline helped diagnose reward exploitation: policies earned higher rewards through passive survival without accomplishing the refueling task. The resulting lesson was about the objective and evaluation, rather than an operational charging system.

This was a simulation project completed before my PhD. It was not a physical deployment or a current KAS Lab project. The [public environment and training code](https://github.com/KhawajaAbaid/fontus2d) document the implementation.
