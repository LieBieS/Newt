---
title: /design
purpose: Unified UI/UX/accessibility review (component, accessibility, responsive, design-system, UX).
outputs:
  sections:
    - Component Inventory
    - Accessibility Contract (WCAG AA)
    - Visual Style Tokens
    - Responsive Breakpoints
    - Implementation Checklist
---

## Description
Complete UI/UX audit merging component consistency, accessibility, responsive, design-system, and UX pattern analysis.

## Usage
```bash
# Audit all UI components
/design audit --scan "*.tsx,*.jsx,*.vue,*.svelte,*.html,*.css"

# Check accessibility compliance
/design wcag --level AA --enforce

# Validate responsive breakpoints
/design responsive --standard [640,768,1024,1280,1536]

# Review design system consistency
/design system --tokens
```

