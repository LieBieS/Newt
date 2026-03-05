---
title: Newt API Reference
description: Complete reference for all commands, agents, skills, and configuration options.
---

# Newt API Reference

## Commands

### /review
**Purpose**: Execute comprehensive code review analysis.

**Syntax**:
```
/review [--path <dir>] [--depth quick|full] [--format markdown|json|summary]
```

**Options**:
- `--path <dir>`: Limit analysis to specific directory
- `--depth quick|full`: Analysis thoroughness (default: quick)
- `--format markdown|json|summary`: Output format (default: markdown)

**Output Sections**: Review Summary, Issues Detected, Severity, Recommended Fixes, Refactored Code Example

---

### /project-health
**Purpose**: Evaluate holistic codebase health.

**Syntax**:
```
/project-health [--path <dir>] [--metrics all|security|performance|architecture]
```

**Options**:
- `--path <dir>`: Scope to specific module
- `--metrics`: Focus area (default: all)

**Output Sections**: Project Health Score, Major Issues, Technical Debt Areas, Suggested Improvements

---

### /review-history
**Purpose**: Analyze historical review logs.

**Syntax**:
```
/review-history [--range <days>d] [--limit <n>] [--filters <criteria>]
```

**Options**:
- `--range`: Time window (e.g., 14d, 30d)
- `--limit`: Max results to show
- `--filters`: Filter criteria (e.g., severity=high,type=security)

**Output Sections**: Recent Reviews, Most Common Issues, Recurring Risks

---

### /architecture-check
**Purpose**: Validate architectural patterns and boundaries.

**Syntax**:
```
/architecture-check [--path <dir>] [--pattern <name>]
```

**Options**:
- `--path <dir>`: Target module or service
- `--pattern`: Expected pattern (clean|hexagonal|layered|modular_monolith|microservices)

**Output Sections**: Architecture Pattern, Violations, Refactoring Suggestions

---

### /pr-review
**Purpose**: Intelligent PR review with commit planning.

**Syntax**:
```
/pr-review [--live|--staged|--branch <name>|--massive|--hotfix|--refactor] [--path <dir>]
```

**Modes**:
- `--live`: Real-time file monitoring
- `--staged`: Pre-commit validation
- `--branch <name>`: Full branch analysis
- `--massive`: Large PR splitting (100+ commits)
- `--hotfix`: Fast-track safety review
- `--refactor`: Architecture change tracking

**Output Sections**: Real-time Suggestions, Commit Recommendations, PR Planning, Risk Assessment

---

### /brainstorm
**Purpose**: Structured ideation with decision artifacts.

**Syntax**:
```
/brainstorm --mode <type> --topic <text> [--path <dir>] [--frameworks <list>] [--constraints <text>]
```

**Modes**:
- `technical`: Architecture, performance, security
- `product`: Features, UX, experiments
- `process`: Delivery, DevEx, CI/CD
- `incident`: Post-incident improvements

**Options**:
- `--topic`: Problem or opportunity statement
- `--path`: Relevant code directory
- `--frameworks`: Override default frameworks (scamper,six_hats,triz,mind_mapping)
- `--constraints`: Explicit constraints

**Output Sections**: Objective, Constraints, Idea Landscape, Clusters, Top Candidates, Recommendations, Decision Artifacts

---

### /converge
**Purpose**: Score and select top ideas from a list.

**Syntax**:
```
/converge --ideas <text> [--weights <yaml>] [--top <n>]
```

**Options**:
- `--ideas`: Paste or reference idea list
- `--weights`: Custom scoring weights
- `--top`: Number of candidates (default: 3)

**Output Sections**: Scoring Rubric, Scored Options, Top 3, Why Not The Others

---

### /experiment-brief
**Purpose**: Generate testable experiment plan.

**Syntax**:
```
/experiment-brief --idea <text> [--metrics <text>] [--constraints <text>]
```

**Output Sections**: Hypothesis, Experiment Design, Instrumentation, Rollout Plan, Kill Criteria, Follow-ups

---

### /adr-draft
**Purpose**: Draft Architecture Decision Record.

**Syntax**:
```
/adr-draft --decision <text> --options <text> [--constraints <text>]
```

**Output Sections**: Context, Decision, Options Considered, Consequences, Rollout, Links

---

### /ui-design
**Purpose**: Create an implementation-ready UI spec for a page/flow.

**Syntax**:
```
/ui-design --goal <text> [--path <dir>] [--page <name>] [--framework <name>] [--style-system <name>] [--component-lib <name>]
```

**Output Sections**: Objective, Stack Detection, Proposed IA / User Flow, Component Inventory, Design Tokens, Accessibility Contract, Responsive Behavior, Testing Plan, Performance Budget, Implementation Checklist

---

### /component-review
**Purpose**: Review or design a single UI component.

**Syntax**:
```
/component-review --component <name> [--path <dir>] [--variants <list>] [--a11y]
```

---

### /accessibility-audit
**Purpose**: Audit UI code for accessibility issues.

**Syntax**:
```
/accessibility-audit [--path <dir>] [--wcag A|AA|AAA] [--focus] [--forms] [--aria]
```

---

### /responsive-check
**Purpose**: Validate responsive behavior and layout stability.

**Syntax**:
```
/responsive-check [--path <dir>] [--breakpoints <list>] [--touch-targets]
```

---

### /design-system
**Purpose**: Define or evolve a design system.

**Syntax**:
```
/design-system [--framework <name>] [--style-system <name>] [--tokens] [--components <list>]
```

---

### /ux-pattern-review
**Purpose**: Review UX patterns in a flow.

**Syntax**:
```
/ux-pattern-review [--path <dir>] [--flow <name>] [--heuristics nielsen|laws]
```

## Configuration Reference

### config/default.yml

#### Thresholds
```yaml
thresholds:
  lines_of_code:
    typescript: 400
    javascript: 350
    python: 300
  public_methods:
    typescript: 20
    javascript: 18
  cyclomatic_complexity:
    typescript: 10
    javascript: 10
```

#### Review Policies
```yaml
review_policies:
  commit_blocking:
    critical_vulnerabilities: true
    security_issues: true
    architecture_violations: true
  pr_size_limits:
    max_commits: 50
    max_files_changed: 100
    suggest_split_above: 30 commits
```

#### Brainstorming
```yaml
brainstorming:
  mode_defaults:
    technical:
      frameworks: ["scamper", "six_hats"]
      min_ideas: 15
      top_candidates: 3
  scoring_weights:
    impact: 1.0
    feasibility: 1.0
    risk_inverted: 1.0
```

#### Frontend Design
```yaml
frontend_design:
  enabled: true
  detection:
    framework: "auto"
    style_system: "auto"
    component_library: "auto"
  accessibility:
    wcag_level: "AA"
    contrast_ratio: 4.5
    keyboard_navigation: true
    reduced_motion: true
  responsive:
    breakpoints:
      mobile: "320px"
      tablet: "768px"
      desktop: "1024px"
      wide: "1440px"
    touch_target_min_px: 44
  performance:
    core_web_vitals_budgets:
      lcp_ms: 2500
      inp_ms: 200
      cls: 0.1
```

---

## Exit Codes

- `0`: Success
- `1`: Critical issues found (when commit blocking enabled)
- `2`: Configuration error
- `3`: Analysis timeout
- `4`: External service unavailable

---

## Environment Variables

- `NEWT_CONFIG_PATH`: Override config file location
- `NEWT_LOG_LEVEL`: Override logging level (debug|info|warn|error)
- `SLACK_WEBHOOK_URL`: Slack integration webhook
- `GITHUB_TOKEN`: GitHub API authentication
- `JIRA_API_TOKEN`: Jira integration token
