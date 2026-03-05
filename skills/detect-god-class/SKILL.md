---
title: detect-god-class
kind: automated-skill
description: Detect oversized classes or modules that violate single-responsibility principles.
triggers:
  - event: code_change
    filter: "**/*.{ts,js,py,java,cs,rb,go}"
metrics:
  - name: lines_of_code
    threshold: 400
  - name: public_methods
    threshold: 20
instructions:
  steps:
    - Collect static metrics (LoC, cyclomatic complexity, public API size) for modified classes.
    - Flag any class exceeding thresholds or hosting unrelated responsibilities (multiple domains detected by naming heuristics).
    - Provide evidence (file path, class name, metrics) and suggest decomposition strategies.
outputs:
  format: |
    God Class Candidates:
    - File: <path>
      Class: <name>
      LinesOfCode: <value>
      PublicMethods: <value>
      Complexity: <value>
      Recommendation: <action>
---
