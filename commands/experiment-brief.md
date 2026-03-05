---
title: /experiment-brief
purpose: Generate a testable experiment plan for a selected idea.
outputs:
  sections:
    - Hypothesis
    - Experiment Design
    - Instrumentation
    - Rollout Plan
    - Kill Criteria
    - Follow-ups
---

## Description
Turns a selected candidate into an executable experiment plan with instrumentation, rollout strategy, and kill criteria.

## Usage
```
/experiment-brief --idea <text> [--metrics <text>] [--constraints <text>]
```

## Behavior
- Invokes `experiment-designer-agent`.
- Uses safe rollout defaults when constraints are missing.

## Output Contract
All mandated sections must be present. Use explicit placeholders if required inputs are missing.
