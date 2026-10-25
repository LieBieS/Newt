---
title: design-quality
description: Unified UI/UX/Accessibility skill merging component-consistency, ux-pattern-detection, visual-hierarchy, responsive-breakpoints, and accessibility detection.
kind: automated-skill
triggers:
  - event: ui_review
    filter: "**/*.{tsx,jsx,vue,svelte,html,css,scss}"
  - event: design_system_audit
    filter: "**/*"
outputs:
  sections:
    - Component Inventory
    - Accessibility Contract (WCAG AA)
    - Visual Style Tokens
    - Responsive Breakpoints
    - Implementation Checklist
---

# Design Quality

## Mission
Ensure deterministic, accessible, consistent user interfaces across the codebase. Merges 5 redundant skills into one unified contract.

## Operating Procedure
1. **Inventory** — Scan for components, design tokens, breakpoints
2. **Consistency** — Check component API, naming, props across files
3. **Accessibility** — Validate WCAG AA (color, focus, ARIA, semantics)
4. **Visual Hierarchy** — Verify spacing scale, typography scale, contrast
5. **Responsive** — Validate breakpoint usage, fluid layouts, container queries
5. **Report** — Emit unified checklist with pass/fail per rule

## Consolidated Domains

### Component Consistency
- Single source of truth for component APIs
- Prop naming conventions (camelCase, boolean prefixes)
- Default export patterns
- Storybook/MDX doc coverage

### UX Pattern Detection
- Recognize common patterns (modal, drawer, table, form, navigation)
- Flag non-standard implementations
- Suggest pattern library alternatives

### Visual Hierarchy
- Spacing scale adherence (4px base)
- Typography scale (heading 1-6, body, caption)
- Color contrast ratios (4.5:1 AA, 7:1 AAA)
- Z-index layering strategy

### Responsive Breakpoints
- Standard breakpoints: 640/768/1024/1280/1536
- Container query usage
- Fluid typography (clamp)
- No fixed widths in components

### Accessibility (WCAG AA)
- Semantic HTML structure
- Focus management (visible, logical order)
- ARIA labels/roles where native insufficient
- Color not sole information carrier
- Keyboard operability
- Screen reader announcements

## Output Contract
- **Component Inventory** — File, pattern, props, consistency score
- **Accessibility Contract** — Rule, element, status, fix
- **Visual Style Tokens** — Token, value, usage count, violations
- **Responsive Breakpoints** — Breakpoint, component, violations
- **Implementation Checklist** — Task, owner, status, priority

## Configuration
```yaml
design_quality:
  enabled: true
  wcag_level: AA
  spacing_base: 4
  breakpoints: [640, 768, 1024, 1280, 1536]
  color_contrast_aa: 4.5
  color_contrast_aaa: 7.0
  exclude_patterns: []
```

## Success Criteria
- All UI files scanned
- Every rule yields pass/fail (no unknown)
- Violations include file, line, fix
- WCAG AA baseline met or documented exceptions
- Deterministic output
- Completes within 60s for 1000 files