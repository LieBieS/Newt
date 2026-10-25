---
title: Newt API Reference
description: Complete reference for all commands, agents, skills, and configuration options.
---

# Newt API Reference

## Commands (Simplified 13-Command Surface)

### /review
**Purpose**: Full-stack code review via review-orchestrator.

**Syntax**:
```
/review [--path <dir>] [--depth light|balanced|deep] [--lens all|security|architecture|craftsmanship]
```

**Options**:
- `--path <dir>`: Limit analysis to specific directory
- `--depth light|balanced|deep`: Analysis thoroughness (default: balanced)
- `--lens all|security|architecture|craftsmanship`: Which lens to apply (default: all)

**Output Sections**: Review Summary, Issues Detected, Severity, Recommended Fixes, Refactored Code Example

---

### /adversarial-review
**Purpose**: Multi-agent adversarial review (GoF, Fowler, Uncle Bob lenses).

**Syntax**:
```
/adversarial-review [--path <dir>] [--depth light|balanced|deep] [--lens security|architecture|craftsmanship|all]
```

**Options**:
- `--path <dir>`: Limit analysis to specific directory
- `--depth light|balanced|deep`: Probe depth (default: balanced)
- `--lens security|architecture|craftsmanship|all`: Lens to apply (default: all)

**Output Sections**: Executive Summary, Issues Found, Security Issues, Architecture Issues, Code Craftsmanship, Recommended Fixes, Adversarial Findings, Multi-Agent Chain

---

### /design
**Purpose**: Unified UI/UX/accessibility review (consolidates component, accessibility, responsive, design-system, UX).

**Syntax**:
```
/design [--path <dir>] [--wcag-level A|AA|AAA] [--scan "*.tsx,*.jsx,*.vue"]
```

**Options**:
- `--path <dir>`: Target UI directory
- `--wcag-level A|AA|AAA`: Accessibility level (default: AA)
- `--scan`: File glob pattern (default: all UI files)

**Output Sections**: Component Inventory, Accessibility Contract, Visual Style Tokens, Responsive Breakpoints, Implementation Checklist

---

### /security
**Purpose**: Unified security detection (OWASP, secrets, policies, vulnerabilities, exploits).

**Syntax**:
```
/security [--path <dir>] [--severity critical|high|medium|low] [--scope all|code|deps|config]
```

**Options**:
- `--path <dir>`: Target directory
- `--severity`: Minimum severity to report (default: high)
- `--scope`: What to scan (default: all)

**Output Sections**: OWASP Mapping, Secret Scan Results, Policy Violations, Vulnerability Findings, Exploit Scenarios, Remediation Guidance

---

### /hooks
**Purpose**: Unified hook management (install, execute, monitor, validate git/IDE/CI hooks).

**Syntax**:
```
/hooks <action> [--hook <name>] [--path <dir>]
```

**Actions**:
- `install`: Deploy all hooks to .git/hooks/, CI, IDE
- `execute <hook>`: Run specific hook manually
- `status`: Check hook health and execution history
- `validate`: Validate hook configuration
- `test <hook>`: Dry-run hook execution

**Output Sections**: Hook Registry, Execution Results, Monitoring Dashboard, Validation Report

---

### /planning
**Purpose**: Ideation → clustering → scoring → deepening → PERT planning (consolidates brainstorm, converge, ADR, experiment).

**Syntax**:
```
/planning [--path <dir>] [--depth quick|full] [--mode ideate|cluster|score|deepen|pert|assumptions]
```

**Options**:
- `--path <dir>`: Project root for ideation sources
- `--depth quick|full`: Planning depth (default: full)
- `--mode`: Pipeline stage to run (default: all)

**Output Sections**: Ideation Output, Clustering Matrix, Score Sheet, Deepening Plan, PERT Timeline, Assumptions List

---

### /pr
**Purpose**: Unified PR lifecycle: analyze, split, plan, review, communicate.

**Syntax**:
```
/pr <action> [--path <dir>] [--mode staged|branch|massive|hotfix|refactor]
```

**Actions**:
- `analyze`: Diff analysis, risk categorization, impact assessment
- `split`: Suggest PR partitions for large changesets
- `plan`: Build review plan (reviewers, timeline, acceptance criteria)
- `review`: Run adversarial checks (GoF, Fowler, Uncle Bob)
- `communicate`: Generate PR description, assign reviewers, notify

**Options**:
- `--path <dir>`: PR diff scope
- `--mode`: Review mode (default: staged)

**Output Sections**: PR Analysis, Suggested Splits, Dependencies, Review Checklist, Communication Draft

---

### /architecture
**Purpose**: Architecture analyst with DB analyst — GoF pattern violations, Fowler smells, database patterns.

**Syntax**:
```
/architecture [--path <dir>] [--depth light|balanced|deep] [--include-db]
```

**Options**:
- `--path <dir>`: Code scope
- `--depth`: Probe depth (default: balanced)
- `--include-db`: Include database analysis (N+1, indexes, migrations, schema)

**Output Sections**: Pattern Violations, Architectural Smells, Structural Risks, Refactoring Recommendations, Database Findings

---

### /brand
**Purpose**: Generate brand strategy + video storyboard, presentation, PDF collateral.

**Syntax**:
```
/brand [--path <dir>] [--depth quick|full] [--audience <role>] [--focus <area>]
```

**Options**:
- `--path <dir>`: Target repo
- `--depth`: Questionnaire depth (default: full)
- `--audience`: Target audience (CTO, VP Engineering, etc.)
- `--focus`: Focus area (technical, product, competitive)

**Output Sections**: Brand Strategy Report, Video Storyboard, Presentation Outline, PDF Brief

---

### /voice
**Purpose**: Capture user voice and inject into all harnesses (Claude Code, Pi, Codex, Windsurf, Cursor).

**Syntax**:
```
/voice [--capture|--inject|--test|--refresh] [--harness claudecode|pi|codex|all]
```

**Options**:
- `--capture`: Run 10-question voice questionnaire
- `--inject`: Update harness configs with profile
- `--test`: Verify harness integration
- `--refresh`: Update profile from recent interactions
- `--harness`: Target harness (default: all)

**Output Sections**: Voice Profile, Harness Config Updates, Verification Log

---

### /triage
**Purpose**: Support ticket → code task with blast-radius, priority, escalation.

**Syntax**:
```
/triage <ticket-text> [--severity P0|P1|P2|P3] [--project <jira-project>]
```

**Options**:
- `<ticket-text>`: Support ticket content (required)
- `--severity`: Initial severity estimate
- `--project`: Jira project key (default: NEWT)

**Output Sections**: Ticket Classification, Blast Radius Assessment, Priority Scoring, Suggested Tasks, Escalation Path, Jira Integration

---

### /suggestions
**Purpose**: Real-time IDE suggestions for code improvement, patterns, best practices.

**Syntax**:
```
/suggestions <action> [--file <path>] [--severity high|medium|low]
```

**Actions**:
- `analyze`: Get suggestions for current file
- `list`: Show all active suggestions
- `accept <id>`: Accept specific suggestion
- `filter`: Filter by severity

**Output Sections**: Active Suggestions, Pattern Recognition, Improvement Opportunities, Context-Aware Recommendations

---

### /dependencies
**Purpose**: Supply chain audit: CVEs, licenses, policy compliance, vulnerability assessment.

**Syntax**:
```
/dependencies [--path <dir>] [--severity high|medium|low] [--policy <name>]
```

**Options**:
- `--path <dir>`: Project path
- `--severity`: Minimum vulnerability severity (default: high)
- `--policy`: Compliance policy to enforce

**Output Sections**: Dependency Inventory, CVE Assessment, License Compliance, Policy Violations, Vulnerability Remediation

---

### /metrics
**Purpose**: Retrieve Newt metrics in Prometheus, JSON, or summary format for observability and AI adoption tracking.

**Syntax**:
```
/metrics [--format prometheus|json|summary]
```

**Options**:
- `--format`: Output format (default: prometheus)

**Metrics Catalog**:
- `newt_skill_invocations_total{skill,status}` — Counter
- `newt_skill_duration_seconds{skill}` — Histogram
- `newt_mcp_tool_calls_total{tool,status}` — Counter
- `newt_adversarial_reviews_total{lens,severity}` — Counter
- `newt_adversarial_findings{lens,severity}` — Gauge
- `newt_ai_adoption_total{event,user_type}` — Counter
- `newt_commands_total{command,status}` — Counter
- `newt_command_duration_seconds{command}` — Histogram
- `newt_uptime_seconds` — Gauge
- `newt_active_sessions` — Gauge

---

### /refresh-plugin
**Purpose**: Refresh plugin after repository updates.

**Syntax**:
```
/refresh-plugin [--force]
```

---

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

#### Security Gate
```yaml
security:
  gate:
    blockOnCritical: true
    failOnSecrets: true
    minDependencyScore: 0.8
    allowedLicenses: [MIT, Apache-2.0, BSD-3-Clause, ISC]
    blockedCves: []
    auditLogPath: logs/audit/security-gate.log
```

#### Multi-Tenancy
```yaml
multi_tenancy:
  enabled: false
  defaultRegion: us-east-1
  cacheTtlMs: 60000
  resolveEnvironmentOverrides: true
```

#### Adversarial Review
```yaml
adversarial:
  enabled: true
  depth: balanced
  lens: all
  goftop:
    enabled: true
    depth: balanced
    excludePatterns: []
    includeExternal: false
  probeDepth: deep
```

#### Metrics
```yaml
metrics:
  enabled: true
  prometheus_port: 9090
  retention_seconds: 3600
  ai_adoption_tracking: true
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