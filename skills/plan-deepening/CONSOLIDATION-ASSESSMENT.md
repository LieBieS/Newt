---
title: Consolidated Skill Assessment
description: Assessment of the 24 current skills and proposed consolidation into 12 focused, world-class skills including PR Reviewer, Jira, and Support Triage.
---

# Skill Set Consolidation Assessment

## The Verdict

No — 24 skills with heavy overlap don't scale. We should roll them into **12 focused, world-class skills** that cover the entire development lifecycle.

## Overlap Analysis

### 4 Hook Skills → 1 Hook Manager (100% overlap)
- `hook-configuration` + `hook-execution` + `hook-monitoring` + `hook-validation` → same domain (Git/IDE/CI hooks)
- **Roll-up**: `hook-manager`

### 5 UI/UX Skills → 1 Design Quality Skill (100% overlap)
- `component-consistency-checker` + `ux-pattern-detector` + `analyze-visual-hierarchy` + `responsive-breakpoint-analyzer` + `detect-accessibility-issues` → all design-system/quality
- **Roll-up**: `design-quality` (includes WCAG, responsive, visual, component consistency)

### 4 Detection Skills → 1 Security/Quality Guard (70% overlap)
- `detect-sql-injection` + `detect-god-class` + `detect-circular-deps` + `secret-detection` → all code-security/quality
- **Roll-up**: `security-guard` (includes injection, secrets, structural, architecture issues)

### 2 Dependency Skills → 1 Dependency Audit (100% overlap)
- `dependency-audit` + `dependency-security-check` → same CVE/vendor management
- **Roll-up**: `dependency-audit`

### 4 Idea/Plan Skills → 1 Planning Pipeline (80% overlap)
- `idea-clusterer` + `idea-backlog-curator` + `constraint-harvester` + `plan-deepening` → all ideation/planning
- **Roll-up**: `plan-pipeline`

### 2 Commit/PR Skills → 1 PR Reviewer (with Jira) (100% overlap)
- `commit-planning` + `pr-splitting` + existing agent `pr-review-agent` + `pr-communication-agent`
- **Roll-up**: `pr-reviewer` — adds Jira, PR planning, and PR communication

### 1 Deployment Skill → 1 Deployment Validation (standalone, valuable)
- `deployment-validation` → keep standalone

### 1 Performance Skill → 1 Performance Monitor (standalone, valuable)
- `performance-monitoring` → keep standalone

### 1 Live Suggestions → 1 Live Suggestions (standalone, valuable)
- `live-suggestions` → keep standalone (real-time IDE feedback)

---

## The New 12-Skill World-Class Set

| # | Skill | Covers | Rationale |
|---|-------|--------|-----------|
| 1 | **adversarial-review** | Security + Architecture + Performance + Craftsmanship | Master orchestrator — already exists |
| 2 | **pr-reviewer** | PR review + commit planning + PR split + Jira + communication | **NEW — the user's request** |
| 3 | **support-triage** | Customer tickets → code tasks, priority, escalation | **NEW — the user's request** |
| 4 | **dependency-audit** | Dependency security + audit + license | Merged from 2 skills |
| 5 | **hook-manager** | All Git/IDE/CI hooks | Merged from 4 skills |
| 6 | **architecture-quality** | Circular deps + god classes + build readiness | Merged from 3 skills |
| 7 | **design-quality** | Component + UX + accessibility + responsive + visual | Merged from 5 skills |
| 8 | **plan-pipeline** | Brainstorm + cluster + backlog + constraint + deepening | Merged from 4 skills |
| 9 | **security-guard** | SQL injection + secrets + structural + detection | Merged from 4 skills |
| 10 | **deployment-validation** | Deploy checks | Standalone |
| 11 | **performance-monitoring** | Performance + complexity | Standalone |
| 12 | **live-suggestions** | Real-time IDE suggestions | Standalone |

---

## The New Skills — Detailed Design

### 2. `pr-reviewer` (Unified PR Review & Jira)

**Mission**: The definitive PR quality gate — from staged changes to stakeholder communication, with Jira integration.

**Includes** (merged + new):
- `commit-planning` (staged file grouping, commit messages)
- `pr-splitting` (large PR decomposition with dependency mapping)
- `pr-review-agent` (real-time + branch-level + massive PR + hotfix)
- `pr-planning-agent` (commit boundaries + dependency graphs + risk assessment)
- `pr-communication-agent` (PR descriptions, review comments, stakeholder messages)
- **NEW — Jira integration**: Auto-create Jira issues from critical findings, link PR to tickets, update ticket status
- **NEW — PR review command**: `/pr-review --staged / --branch / --massive / --hotfix`

**Output Contract**:
- PR Description with change impact, testing plan, rollback procedure
- Commit recommendations (3-commit split example)
- Risk assessment (security, performance, stability)
- Review comments (constructive, with fix hints)
- Jira tickets linked (via `integrations.jira` config)

---

### 3. `support-triage` (Customer Support → Code Tasks)

**Mission**: Convert customer support tickets into prioritized, actionable development tasks.

**Triggers**:
- `event: support_ticket` (from Jira/Slack/Email)
- `event: incident_report`

**Steps**:
- Ingest ticket (title, description, severity, customer impact)
- Classify: Bug / Feature / Security / Performance / UX / Integration
- Assess blast radius (affected components from repo)
- Determine priority (P0 = production impact / P1 = major feature / P2 = improvement / P3 = nice-to-have)
- Generate code impact forecast (which files would need changes)
- Suggest fix approach (quick fix / architecture change / config change)
- Create Jira task linked to source (auto-link)
- Escalate if critical (security/integration/performance critical)

**Output Contract**:
- Triage score (priority, complexity, blast radius)
- Affected components (from repo graph analysis)
- Recommended fix approach
- Jira task link (if integration enabled)
- Escalation recommendation (if critical)

---

## Why 12? The Golden Number

12 skills = 4 domains × 3 layers = complete coverage
- **Domain**: Security / Design / Process / Operations
- **Layer**: Prevent / Detect / Validate / Communicate

This maps directly to the 4 categories of quality (security, architecture, quality, operations) and the 3 stages of development (prevention, detection, validation).

---

## Consolidation Impact

| Metric | Before (24) | After (12) | Change |
|--------|-------------|------------|--------|
| Skills to maintain | 24 | 12 | -50% |
| Documentation | 24 SKILL.md | 12 SKILL.md | -50% |
| Overlap/confusion | High (hook-* all separate) | Low (clear domains) | Improved |
| Enterprise readiness | Partial (missing PR/Jira/triage) | Complete (+3 critical) | Enhanced |
| User cognitive load | High | Low | Improved |

---

## The New 12 — Final List

```
1. adversarial-review      (master orchestrator — security/arch/perf/craft)
2. pr-reviewer            (merged review + PR planning + Jira + communication) ⭐ NEW
3. support-triage          (customer tickets → prioritized code tasks) ⭐ NEW
4. dependency-audit       (merged dependency security + audit + license)
5. hook-manager            (merged Git/IDE/CI hooks)
6. architecture-quality   (merged structural + code quality)
7. design-quality         (merged UI/UX/accessibility/visual/responsive)
8. plan-pipeline          (merged ideation + planning + deepening)
9. security-guard         (merged injection/secret/structural detection)
10. deployment-validation  (standalone — deploy checks)
11. performance-monitoring (standalone — perf/complexity)
12. live-suggestions       (standalone — real-time IDE feedback)
```

---

## Implementation Path

Phase 1 (Now): Create `pr-reviewer`, `support-triage` + consolidate hooks/dependency/plan
Phase 2: Merge UI/UX → design-quality, architecture + quality → architecture-quality  
Phase 3: Write unified SKILL.md files (12 total)
Phase 4: Update plugin manifest, CLI, docs to reference new 12
Phase 5: Validate all 12 with `npm run validate`

The 12-skill set is cleaner, more maintainable, and covers all critical enterprise use cases — including the three the user specifically requested (PR Reviewer, Jira, Support Triage).
