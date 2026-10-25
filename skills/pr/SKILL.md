---
title: pr-reviewer
description: Unified PR review + planning + communication agent unifies pr-review, pr-planning, pr-splitting, commit-planning, and pr-communication.
kind: automated-skill
triggers:
  - event: pr_created
    filter: "**/*"
  - event: pr_requested
    filter: "**/*"
outputs:
  sections:
    - PR Analysis
    - Suggested Splits
    - Dependencies
    - Review Checklist
    - Communication Draft
---

# PR Reviewer

## Mission
Complete PR lifecycle: analyze, split, plan, review, and communicate with deterministic consistency.

## Operating Procedure
1. **Analyze** — Scan staged changes for logical boundaries
2. **Split** — Suggest PR partitions for large changesets
3. **Plan** — Build review plan (reviewers, timeline, acceptance criteria)
4. **Review** — Run adversarial checks (GoF, Fowler, Uncle Bob)
5. **Communicate** — Generate PR description, assign reviewers, send notifications
6. **Track** — Update PR status, notify stakeholders on changes

## Consolidated Domains

### PR Analysis
- File diff parsing, component identification
- Risk categorization (security, architecture, performance)
- Impact assessment (affected modules, user stories)
- Complexity metrics (lines changed, cognitive load)

### PR Splits
- Suggest splits >30 commits or 2k LOC
- Identify natural boundaries (features, bug fixes, refactor)
- Generate split proposals with criteria

### Dependencies
- Detect cross-PR dependencies
- Build dependency graph for scheduled PRs
- Suggest ordering of dependent PRs

### Review Checklist
- GoF adversarial probes (structure)
- Fowler code smell checks (smells)
- Uncle Bob clean code review (SOLID)
- Security scans (OWASP, secrets)
- Performance impact assessment

### Communication Draft
- PR title and description template
- Suggested reviewers based on expertise
- Testing and deployment checklist
- Rollback plan if needed

## Output Contract
- **PR Analysis** — Metrics, risks, impact, complexity
- **Suggested Splits** — Split ID, commits, LOC, reason, suggested_target_branches
- **Dependencies** — Blocked-by, blocks, risk assessment
- **Review Checklist** - Category, item, status, assignee, due_date
- **Communication Draft** — Title, description, checklist, reviewers

## Configuration
```yaml
pr_review:
  enabled: true
  max_commits_per_pr: 30
  max_loc_per_pr: 2000
  reviewers:
    "frontend": ["@frontend-team"]
    "backend": ["@backend-team"]
    "security": ["@security-team"]
    "architecture": ["@architect-team"]
  checklist:
    gof: true
    fowler: true
    solid: true
    security: true
    performance: true
  communication:
    template: "automatic"
    notify: [slack, email, code-review-tool]
```

## Success Criteria
- PR analysis completed
- Splits suggested for oversized PRs
- Dependency graph built
- Checklist generated with assignees
- Communication draft ready
- All reviewers notified
- PR status tracked
- Changes reviewed against criteria
- Deterministic output
- Completes within 2m for 1000 PRs