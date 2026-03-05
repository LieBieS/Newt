---
title: /review
purpose: Run a full-stack automated code review via the review-orchestrator.
outputs:
  sections:
    - Review Summary
    - Issues Detected
    - Severity
    - Recommended Fixes
    - Refactored Code Example
---

## Description
Triggers a repository-wide code review that fuses architecture, security, performance, and maintainability insights. Ideal for pull request validation or pre-release gates.

## Usage
1. Ensure repository is indexed and up to date.
2. Run `/review [optional path or pull request identifier]`.
3. Review the structured output and inspect referenced files.

## Behavior
- Calls `review-orchestrator`, which sequentially invokes specialized agents and skills.
- Normalizes severity (Critical/High/Medium/Low) and emits deterministic tables.
- Logs every run under `logs/reviews/` with timestamped markdown files.

## Output Contract
Always render the mandated sections even when no findings are reported. For empty sections, output `None`.
