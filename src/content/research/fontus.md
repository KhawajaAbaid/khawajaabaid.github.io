---
title: Learning to Recharge a UAV Network
shortTitle: Fontus
category: Multi-Agent Reinforcement Learning
summary: 'A custom environment for energy-constrained aerial recharging—and an investigation of the reward-induced “lazy agent” behavior that made inactivity more attractive than mission-critical work.'
date: 2025-11-18
authors: ['Khawaja Abaid Ullah']
status: Class project
public: true
draft: false
selected: true
order: 2
tags: ['Multi-agent reinforcement learning', 'Environment design', 'Reward shaping', 'UAV networks']
image: ../../assets/research/fontus.svg
imageAlt: 'Conceptual aerial-recharging environment: a charging UAV travels from a base station toward mission UAVs. The diagram illustrates the problem setup, not a learned trajectory.'
figureCaption: 'The aerial-recharging problem, drawn schematically. The path is illustrative, not a learned policy.'
links:
  - { label: Code, href: 'https://github.com/KhawajaAbaid/fontus2d' }
---
## Can a UAV network learn to keep itself running?

**Project Fontus: A Deep Reinforcement Learning Approach for Aerial Recharging in UAV Networks** began as a class project on energy-constrained autonomy. I built a custom environment to study how charging UAVs could support mission UAVs while managing their own limited batteries.

The research question is a resource-allocation problem: which agent needs energy, when should a charger deliver it, and when should that charger return to base? A useful policy has to balance immediate movement costs against the longer-term value of keeping the network alive.

## Why aerial recharging?

A mission UAV cannot remain useful indefinitely on a finite battery. A mobile charger introduces another option besides ending its mission to return to base, but also introduces a coordination problem. The charger spends energy moving and transferring charge; it must replenish that supply before it can continue supporting other agents.

This creates a coupled decision process. Protecting the charger's battery is necessary, but a charger that only preserves itself does not accomplish the network's mission.

## Designing the environment

The environment models a base station, charging agents, and client UAVs. In the simplified 2D setup, clients are stationary while their batteries drain. Chargers move through a bounded continuous space using discrete directional actions, transfer energy when close enough to a client, and recharge near the base station.

Observations expose positions, velocities, battery levels, and information about other entities. The reward design combines client survival, actual energy transfer, and navigation shaping. These mechanisms make the environment itself part of the experiment: changing energy dynamics or rewards changes which behaviors are worth learning.

The [environment implementation](https://github.com/KhawajaAbaid/fontus2d/blob/main/drone_fleet_env/env/drone_fleet_env_v1.py) and configurable constants are separate from the training loop. Scripted charging checks provide a way to verify that the mechanics work independently of a learned policy.

## 3D → 2D: narrowing the modeling problem

The project pivoted from a 3D formulation to a 2D environment. This narrowed the problem to the interaction between movement, energy, and recharging decisions, rather than requiring the experiment to resolve a full three-dimensional flight-control problem at the same time.

The simplified model still retains the central trade-off: a charger must leave safety, spend energy reaching another UAV, transfer charge, and remain capable of returning. It is an abstraction for studying learning behavior, not a claim of flight-ready control.

## The reinforcement-learning setup

I used PPO through Ray RLlib, with a shared policy for homogeneous charging agents. The code supports a multi-agent formulation, while the current public training configuration reduces the experiment to **one charger and one client**. That smaller setup helps isolate basic navigation and charging behavior before scaling coordination across a fleet.

Training infrastructure saves checkpoints, configuration snapshots, and metrics. The [training script](https://github.com/KhawajaAbaid/fontus2d/blob/main/train.py) and checkpoint visualizer make it possible to compare the score an agent receives with what it actually does.

## The lazy-agent failure mode

The public saved run illustrates the central failure: the learned charger sits idle. My diagnosis was that the interaction between survival incentives, battery costs, and the difficulty of discovering useful charging behavior made inactivity locally attractive.

An agent can receive credit while clients remain alive without having delivered that energy itself. Movement consumes battery, and the payoff from a successful recharging sequence arrives only after several useful actions. If exploration rarely reaches that sequence, an on-policy learner can repeatedly reinforce conservative behavior instead.

This is the reward-hacking concern in Fontus: the proxy objective can favor behavior that falls short of the intended mission. The diagnosis is a qualitative interpretation of the observed failure, not a controlled ablation establishing a single cause. The repository contains evolving reward formulations; the idle run should not be read as evidence that every configuration behaves identically.

## What the failure teaches

A working simulator, an increasing return, and useful task behavior are different things. The scripted charging simulation verifies that energy transfer is possible. It does not show that the policy has learned when to perform it.

For this problem, evaluation needs to track delivered energy, client survival, successful charging cycles, and trajectories alongside episode reward. The failed policy made those distinctions concrete and turned the project into an investigation of reward shaping, exploration, and energy dynamics.

## Next experiments and reproducibility

The next steps would be controlled reward ablations, a curriculum that makes successful charging easier to discover, and comparisons against simple scripted scheduling policies. Only after reliable behavior in the smaller setup would I scale the number of chargers and clients or revisit richer motion and partial observability. These are proposed follow-ups, not completed results.

The [public repository](https://github.com/KhawajaAbaid/fontus2d) includes environment code, training and visualization scripts, a saved run, and scripted charging verification. Development was performed on Ubuntu; the README notes a checkpoint-loading issue on macOS.
