---
title: /architecture-check
purpose: Run a repository-wide structural assessment powered by the architecture-analyst.
outputs:
  sections:
    - Architecture Pattern
    - Violations
    - Refactoring Suggestions
---

## Description
Performs deterministic architecture validation against Clean, Hexagonal, Layered, Modular Monolith, and Microservices blueprints. Ideal for early warning during large refactors.

## Usage
1. Execute `/architecture-check [optional module or service path]`.
2. The command calls `architecture-analyst` and supporting skills (circular deps, god class).
3. Review violations and accompanying remediation steps before merging changes.

## Behavior
- Generates dependency graphs and detects cross-layer calls.
- Highlights god modules, tight coupling, and module boundary leaks.
- Summarizes findings with explicit pattern names and severity cues.

## Output Contract
All mandated sections must be present. When no violations exist, set `Violations: None` and still provide reinforcement guidance under Refactoring Suggestions (e.g., "Maintain current boundaries").
