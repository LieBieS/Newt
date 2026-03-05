---
 title: /design-system
 purpose: Define or evolve a web design system (tokens, components, rules, governance).
 outputs:
   sections:
     - Scope
     - Stack Detection
     - Token Proposal
     - Component Standards
     - Accessibility Standards
     - Governance
     - Adoption Plan
---

## Description
Creates a lightweight design system spec that teams can implement incrementally.

## Usage
```
/design-system [--framework <name>] [--style-system <name>] [--tokens] [--components <list>]
```

## Options
- `--framework`: Optional override.
- `--style-system`: Optional override.
- `--tokens`: Include token tables.
- `--components`: Seed list of components.

## Output Contract
Always produce the sections listed in frontmatter.
