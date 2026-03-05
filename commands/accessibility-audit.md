---
 title: /accessibility-audit
 purpose: Audit UI code for accessibility issues and provide actionable fixes and tests.
 outputs:
   sections:
     - Scope
     - WCAG Target
     - Issues (Prioritized)
     - Fix Recommendations
     - Test Plan
     - Checklist
---

## Description
Audits UI code and markup for WCAG compliance and practical usability.

## Usage
```
/accessibility-audit [--path <dir>] [--wcag A|AA|AAA] [--focus] [--forms] [--aria]
```

## Options
- `--path`: Scope to UI directory.
- `--wcag`: Target level.
- `--focus`: Emphasize focus management and keyboard navigation.
- `--forms`: Emphasize form labels, errors, and validation.
- `--aria`: Emphasize ARIA usage.

## Output Contract
Always produce the sections listed in frontmatter.
