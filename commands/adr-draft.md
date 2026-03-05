---
title: /adr-draft
purpose: Generate an Architecture Decision Record draft for a selected candidate.
outputs:
  sections:
    - Context
    - Decision
    - Options Considered
    - Consequences
    - Rollout
    - Links
---

## Description
Produces a deterministic ADR draft suitable for pasting into your repo's ADR directory.

## Usage
```
/adr-draft --decision <text> --options <text> [--constraints <text>]
```

## Behavior
- Uses the selected candidate as the `Decision`.
- Ensures options have explicit trade-offs.

## Output Contract
Always render all mandated sections. When details are missing, add placeholders and list what must be confirmed.
