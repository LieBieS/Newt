---
 title: /component-review
 purpose: Review or design a single UI component for usability, accessibility, variants, and implementation quality.
 outputs:
   sections:
     - Component Summary
     - Detected Patterns
     - Variants & States
     - Accessibility Contract
     - Responsive Behavior
     - Suggested API
     - Testing Plan
     - Recommendations
---

## Description
Reviews an existing component (or drafts a new spec) with a focus on web UI best practices.

## Usage
```
/component-review --component <name> [--path <dir>] [--variants <list>] [--a11y]
```

## Options
- `--component`: Component name.
- `--path`: Scope to component directory.
- `--variants`: Optional explicit variants.
- `--a11y`: Emphasize accessibility.

## Output Contract
Always produce the sections listed in frontmatter.
