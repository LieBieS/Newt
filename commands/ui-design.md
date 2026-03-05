---
 title: /ui-design
 purpose: Create an implementation-ready web UI design spec (flow, components, tokens, a11y, responsive, performance).
 outputs:
   sections:
     - Objective
     - Stack Detection
     - Proposed IA / User Flow
     - Component Inventory
     - Design Tokens
     - Accessibility Contract
     - Responsive Behavior
     - Testing Plan
     - Performance Budget
     - Implementation Checklist
---

## Description
Creates a complete UI design and implementation plan for a page/flow or feature, aligned to the detected web stack.

## Usage
```
/ui-design --goal <text> [--path <dir>] [--page <name>] [--framework <name>] [--style-system <name>] [--component-lib <name>]
```

## Options
- `--goal`: What the UI should achieve.
- `--path`: Scope to a directory containing relevant UI.
- `--page`: Optional page/route name.
- `--framework`: Optional override (react|next|vue|nuxt|angular|svelte|sveltekit).
- `--style-system`: Optional override (tailwind|css_modules|styled_components|emotion|mui|chakra|antd|custom).
- `--component-lib`: Optional override (shadcn|mui|chakra|antd|none).

## Behavior
- Detect stack (unless overridden).
- Produce deterministic spec: IA/flow, components, states, tokens, a11y, responsive, tests, performance.

## Output Contract
Always produce the sections listed in frontmatter.
