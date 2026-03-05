---
 title: /ux-pattern-review
 purpose: Review UX patterns in a flow for usability, predictability, and best-practice adherence.
 outputs:
   sections:
     - Scope
     - Heuristics Applied
     - Findings (Prioritized)
     - Recommendations
     - Before/After Suggestions
---

## Description
Analyzes a user flow (or screen) for UX anti-patterns and recommends improvements.

## Usage
```
/ux-pattern-review [--path <dir>] [--flow <name>] [--heuristics nielsen|laws]
```

## Options
- `--path`: Scope to UI directory.
- `--flow`: Flow name.
- `--heuristics`: Which rubric to emphasize.

## Output Contract
Always produce the sections listed in frontmatter.
