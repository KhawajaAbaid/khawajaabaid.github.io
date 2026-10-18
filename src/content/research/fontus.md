---
title: 'Fontus: Multi-Agent RL for Aerial UAV Recharging'
shortTitle: Fontus
category: Multi-Agent Reinforcement Learning · PettingZoo & Ray RLlib
summary: 'Built a custom PettingZoo Parallel multi-agent environment with vectorized NumPy dynamics, energy-aware transitions, and proximity-triggered charging; trained parameter-shared IPPO/PPO policies in PyTorch and Ray RLlib and diagnosed a reward-hacking “lazy agent” local optimum.'
date: 2025-12-01
authors: ['Khawaja Abaid Ullah']
status: Research Project
public: true
draft: false
selected: true
order: 2
tags: ['PettingZoo Parallel', 'Ray RLlib', 'PyTorch', 'IPPO / PPO', 'Vectorized NumPy']
image: ../../assets/research/fontus.svg
imageAlt: 'Conceptual aerial-recharging environment: a charging UAV travels from a base station toward mission UAVs. The diagram illustrates the problem setup, not a learned trajectory.'
figureCaption: 'Schematic of the Fontus aerial UAV recharging problem: mobile charging UAVs depart the base station to rendezvous with energy-constrained mission UAVs.'
metric:
  value: 'IPPO / PPO'
  label: parameter-shared policies in PettingZoo Parallel & Ray RLlib
  context: 'Vectorized NumPy dynamics + analytical no-charge baseline'
links:
  - { label: GitHub Code (fontus2d), href: 'https://github.com/KhawajaAbaid/fontus2d' }
---
## Problem formulation: coupled energy & rendezvous dynamics

Persistent UAV missions in disaster-response or surveillance settings are bottlenecked by finite onboard batteries. **Fontus** investigates whether mobile charging UAVs can learn cooperative rendezvous and energy-transfer policies to keep mission UAVs airborne while managing their own flight and transfer energy budgets.

## PettingZoo Parallel environment & vectorized NumPy dynamics

To decouple multi-agent scheduling and energy allocation from low-level 3D attitude control, I designed a custom **PettingZoo Parallel** 2D multi-agent environment ([`drone_fleet_env_v1.py`](https://github.com/KhawajaAbaid/fontus2d/blob/main/drone_fleet_env/env/drone_fleet_env_v1.py)) with:

- **Vectorized NumPy state transitions** for base stations, mobile charging UAVs, and energy-draining client UAVs.
- **Proximity-triggered wireless/contact energy transfer** and base-station replenishment dynamics.
- **Parameter-shared IPPO / PPO training** implemented with **PyTorch** and **Ray RLlib** ([`train.py`](https://github.com/KhawajaAbaid/fontus2d/blob/main/train.py)), plus deterministic scripted-policy verification harnesses.

## Analytical baseline & the "lazy agent" local optimum

By establishing an **analytical no-charge baseline** and inspecting saved rollout trajectories alongside episode returns, I diagnosed a classic **reward-hacking "lazy agent" local optimum**:

1. **Movement vs. passive survival**: Active transit toward a client UAV incurs immediate battery expenditure, whereas survival rewards accumulate passively while client batteries are still draining.
2. **Sparse multi-step credit assignment**: A successful refueling cycle requires departing base, closing distance, dwelling in the transfer radius, and returning before charger depletion. Under on-policy exploration (IPPO/PPO), the policy converges to stationary self-preservation—achieving high apparent episode return without executing actual energy transfers.

This diagnosis motivates off-policy replay, curriculum scheduling, and explicit energy-delivered evaluation metrics over raw episodic return.
