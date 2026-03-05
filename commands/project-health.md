---
title: /project-health
purpose: Evaluate the holistic health of the codebase from architecture, complexity, dependency, and security perspectives.
outputs:
  sections:
    - Project Health Score
    - Major Issues
    - Technical Debt Areas
    - Suggested Improvements
---

## Description
Provides an executive dashboard of the repository's quality signals. Useful for release planning, quarter planning, or onboarding new contributors.

## Usage
1. Run `/project-health [optional path or service name]`.
2. The review orchestrator aggregates metrics from all agents plus historical logs.
3. Interpret the Project Health Score (0-100) and address flagged areas.

## Behavior
- Computes health score based on issue counts, severities, dependency risks, and architecture compliance.
- Highlights top technical debt clusters with links to files and modules.
- Surfaces dependency vulnerabilities using `dependency-audit` skill output.

## Output Contract
Every invocation emits all mandated sections. Empty sections must state `None` to keep the UI consistent.
