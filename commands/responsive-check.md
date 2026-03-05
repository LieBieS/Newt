---
 title: /responsive-check
 purpose: Validate responsive behavior, breakpoints, touch targets, and layout stability.
 outputs:
   sections:
     - Scope
     - Breakpoints
     - Findings
     - Layout Stability (CLS)
     - Touch Targets
     - Recommendations
---

## Description
Reviews responsive UI implementation and proposes fixes for layout, spacing, and stability.

## Usage
```
/responsive-check [--path <dir>] [--breakpoints <list>] [--touch-targets]
```

## Options
- `--path`: Scope to UI directory.
- `--breakpoints`: Override breakpoints.
- `--touch-targets`: Emphasize target sizing and spacing.

## Output Contract
Always produce the sections listed in frontmatter.
