---
title: /review-history
purpose: Surface historical automated review results for quick auditing and regression tracking.
outputs:
  sections:
    - Recent Reviews
    - Most Common Issues
    - Recurring Risks
---

## Description
Reads markdown logs from `logs/reviews/` and summarizes past findings so teams can monitor trends and verify remediation progress.

## Usage
1. Run `/review-history` with optional filters (date range, severity, component).
2. Command parses timestamps and aggregates issue metadata.
3. Use output to prioritize hotspots before new work begins.

## Behavior
- Sorts log files by timestamp descending for the Recent Reviews section.
- Computes frequency counts of issue categories, affected files, and severity distribution.
- Flags Recurring Risks when the same issue resurfaces ≥3 times within the selected window.

## Output Contract
Always render the mandated sections. When no logs exist, populate each section with `None` and instruct users to run `/review` first.
