---
title: /converge
purpose: Score and converge an existing idea list into a small set of top candidates.
outputs:
  sections:
    - Scoring Rubric
    - Scored Options
    - Top 3
    - Why Not The Others
---

## Description
Takes an existing set of ideas (from a brainstorming session, doc, or chat) and converges it deterministically using the configured rubric.

## Usage
```
/converge --ideas <paste ideas> [--weights <yaml/json>] [--top <n>]
```

## Behavior
- Invokes `convergence-agent`.
- Applies default weights from `config/default.yml` unless overridden.

## Output Contract
Always emit all sections. If fewer than 3 ideas are provided, output only the available count.
