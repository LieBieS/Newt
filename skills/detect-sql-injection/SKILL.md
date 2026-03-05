---
title: detect-sql-injection
kind: automated-skill
description: Scan query-building code for unsafe string concatenation or unparameterized input handling.
triggers:
  - event: code_change
    filter: "**/*.{ts,js,py,java,cs,rb,go,sql}"
instructions:
  steps:
    - Inspect modified files for SQL keywords combined with user-controlled variables.
    - Flag concatenated query strings lacking parameter binding or ORM placeholder usage.
    - Detect risky ORM APIs (e.g., `.queryRaw`, `.execute` with string interpolation).
    - Check for missing input sanitization on request parameters feeding queries.
    - Emit remediation guidance referencing parameterized queries or ORM protections.
outputs:
  format: |
    SQL Injection Findings:
    - File: <path>
      Line: <line>
      Pattern: <description>
      Risk: <High|Medium|Low>
      Recommendation: <parameterize | sanitize | use prepared statements>
---
