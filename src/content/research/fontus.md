---
title: Learning to Recharge a UAV Network
shortTitle: Fontus
category: Multi-Agent Reinforcement Learning
summary: 'Project Fontus is a class project exploring aerial recharging through a custom multi-agent reinforcement-learning environment.'
date: 2025-11-18
authors: ['Khawaja Abaid Ullah']
status: Class project
public: true
draft: false
selected: true
order: 2
tags: ['Reinforcement learning', 'Environment design', 'UAV networks']
image: ../../assets/research/fontus.svg
imageAlt: 'Conceptual aerial-recharging environment: a charging UAV travels from a base station toward mission UAVs. The diagram illustrates the problem setup, not a learned trajectory.'
figureCaption: 'The aerial-recharging problem, drawn schematically. The path is illustrative, not a learned policy.'
links:
  - { label: Code, href: 'https://github.com/KhawajaAbaid/fontus2d' }
---
## Project Fontus

**A Deep Reinforcement Learning Approach for Aerial Recharging in UAV Networks** is a class project built around a custom multi-agent environment. This overview follows the [public repository README](https://github.com/KhawajaAbaid/fontus2d).

## Environment and experimentation

The repository separates environment configuration from its dynamics. It includes training scripts, saved-run visualization, and a scripted single-agent charging simulation for checking the environment's charging behavior.

These pieces support a practical workflow: configure the environment, train an agent, then inspect its behavior alongside the training plots.

## Inspecting what the agent learns

The README includes a saved run in which the trained agent sits idle. That observation motivates inspecting behavior directly, rather than relying on the training score alone. The public README does not establish the cause of this behavior.

## Running the project

The [repository](https://github.com/KhawajaAbaid/fontus2d) documents installation, training, checkpoint visualization, and the scripted charging verification. Development was performed on Ubuntu; the README notes a checkpoint-loading issue on macOS.
