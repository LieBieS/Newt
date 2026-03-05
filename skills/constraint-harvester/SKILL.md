---
title: constraint-harvester
kind: automated-skill
description: Extracts explicit and implicit constraints from configuration changes and architecture findings to keep an up-to-date constraints register.
triggers:
  - event: code_change
    filter: "config/**/*.yml"
  - event: log_write
    filter: "logs/reviews/**/*.md"
instructions:
  steps:
    - Detect constraints implied by config values (timeouts, budgets, thresholds, integrations).
    - Extract constraints mentioned in architecture/security/performance findings.
    - Write/update a constraints register entry under `logs/brainstorm/constraints-register.md`.
    - Categorize constraints: Security, Performance, Compliance, Delivery, Team, Operations.
    - Track last-seen timestamp and source file/log for each constraint.
outputs:
  format: |
    Constraints Register Update:
    - Category: <Security|Performance|Compliance|Delivery|Team|Operations>
      Constraint: <text>
      Source: <file/log>
      LastSeen: <timestamp>
---
