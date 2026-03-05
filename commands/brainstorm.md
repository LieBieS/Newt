---
title: /brainstorm
purpose: Run a structured ideation session using Newt's brainstorming agent ecosystem.
outputs:
  sections:
    - Objective
    - Constraints
    - Idea Landscape
    - Clusters
    - Top Candidates
    - Recommendations
    - Decision Artifacts
---

## Description
Runs a deterministic, high-signal brainstorming session that generates options and converges to a small number of testable candidates. Produces decision artifacts (Idea Cards, ADR Draft, Experiment Brief) and logs the session.

## Usage
```
/brainstorm --mode technical|product|process|incident [--topic <text>] [--constraints <text>] [--path <dir>] [--frameworks <list>]
```

## Modes
- `technical`: architecture, performance, security, scalability
- `product`: features, UX, experiments, roadmap options
- `process`: delivery, code review efficiency, CI/CD, DevEx
- `incident`: post-incident improvements, SLOs, reliability work

## Behavior
- Invokes `brainstorming-agent` as the facilitator.
- Calls `constraint-analysis-agent` to extract explicit/hidden constraints.
- Calls `creative-pattern-agent` to propose cross-domain analogies/patterns.
- Calls `convergence-agent` to score and pick top candidates.
- Calls `experiment-designer-agent` for the primary candidate experiment plan.
- Writes a session log to `logs/brainstorm/YYYY-MM-DD_HHMM_brainstorm.md`.

## Output Contract
All mandated sections must be present. When a section is empty, output `None`.
