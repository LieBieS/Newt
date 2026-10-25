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

## Command
```bash
/review [optional path or pull request identifier]
```

## Validation
Run `npm run validate` to check plugin structural integrity.