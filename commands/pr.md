---
title: /pr
purpose: Unified PR lifecycle: analyze, split, plan, review, communicate.
outputs:
  sections:
    - PR Analysis
    - Suggested Splits
    - Dependencies
    - Review Checklist
    - Communication Draft
---

## Description
Complete PR lifecycle from diff analysis to final communication.

## Usage
```bash
# Review PR with analysis and split suggestions
/pr analyze <pr-number-or-diff>

# Suggest splits for large PRs
/pr split --limit 30 --loc 2000

# Build review plan
/pr plan --reviewers "frontend,backend,security"

# Review against all criteria
/pr review --criteria all

# Generate PR description
/pr communicate
```

