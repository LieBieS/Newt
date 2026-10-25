---
title: Newt Commands Reference
description: Complete reference for all Newt slash commands with syntax, options, and examples.
---

# Newt Commands Reference

Complete reference for all 13 available commands in the Newt plugin.

## Core Review Commands

### `/review`
**Purpose**: Full-stack code review via review-orchestrator.

**Syntax**:
```
/review [--path <directory>] [--depth light|balanced|deep] [--lens all|security|architecture|craftsmanship]
```

**Options**:
- `--path <directory>`: Limit analysis to specific directory
- `--depth light|balanced|deep`: Analysis thoroughness (default: balanced)
- `--lens all|security|architecture|craftsmanship`: Which lens to apply (default: all)

**Examples**:
```bash
/review --path src/auth --depth light
/review --lens security
/review --depth deep --lens architecture
```

**Output Sections**:
- Review Summary
- Issues Detected
- Severity
- Recommended Fixes
- Refactored Code Example

---

### `/adversarial-review`
**Purpose**: Multi-agent adversarial review (GoF, Fowler, Uncle Bob lenses).

**Syntax**:
```
/adversarial-review [--path <directory>] [--depth light|balanced|deep] [--lens security|architecture|craftsmanship|all]
```

**Options**:
- `--path <directory>`: Limit analysis to specific directory
- `--depth light|balanced|deep`: Probe depth (default: balanced)
- `--lens security|architecture|craftsmanship|all`: Lens to apply (default: all)

**Examples**:
```bash
/adversarial-review --path src/auth --depth balanced
/adversarial-review --lens architecture
/adversarial-review --depth deep
```

**Output Sections**:
- Executive Summary
- Issues Found
- Security Issues
- Architecture Issues
- Code Craftsmanship
- Recommended Fixes
- Adversarial Findings
- Multi-Agent Chain

---

### `/project-health`
**Purpose**: Evaluate holistic codebase health and generate health score.

**Syntax**:
```
/project-health [--path <directory>] [--metrics all|security|performance|architecture]
```

**Options**:
- `--path <directory>`: Scope to specific module
- `--metrics`: Focus area (default: all)

**Examples**:
```bash
/project-health
/project-health --path src/api
/project-health --metrics security
```

**Output Sections**:
- Project Health Score
- Major Issues
- Technical Debt Areas
- Suggested Improvements

---

### `/review-history`
**Purpose**: Analyze historical review logs and identify recurring issues.

**Syntax**:
```
/review-history [--range <days>d] [--limit <number>] [--filters <criteria>]
```

**Options**:
- `--range`: Time window (e.g., 14d, 30d)
- `--limit`: Maximum results to show
- `--filters`: Filter criteria (e.g., severity=high,type=security)

**Examples**:
```bash
/review-history --range 14d
/review-history --limit 10 --filters severity=high
/review-history --filters type=security
```

**Output Sections**:
- Recent Reviews
- Most Common Issues
- Recurring Risks
- Trend Analysis

---

### `/architecture`
**Purpose**: Architecture analyst with DB analyst — GoF pattern violations, Fowler smells, database patterns.

**Syntax**:
```
/architecture [--path <directory>] [--depth light|balanced|deep] [--include-db]
```

**Options**:
- `--path <directory>`: Target module or service
- `--depth light|balanced|deep`: Probe depth (default: balanced)
- `--include-db`: Include database analysis (N+1, indexes, migrations, schema)

**Examples**:
```bash
/architecture --path src/billing --depth balanced
/architecture --include-db --path src/models
/architecture --pattern clean_architecture
```

**Output Sections**:
- Architecture Pattern
- Violations
- Refactoring Suggestions
- Pattern Compliance Score
- Database Findings

---

## PR & Code Quality Commands

### `/pr`
**Purpose**: Unified PR lifecycle: analyze, split, plan, review, communicate.

**Syntax**:
```
/pr <action> [--path <directory>] [--mode staged|branch|massive|hotfix|refactor]
```

**Actions**:
- `analyze`: Diff analysis, risk categorization, impact assessment
- `split`: Suggest PR partitions for large changesets
- `plan`: Build review plan (reviewers, timeline, acceptance criteria)
- `review`: Run adversarial checks (GoF, Fowler, Uncle Bob)
- `communicate`: Generate PR description, assign reviewers, notify

**Options**:
- `--path <directory>`: PR diff scope
- `--mode`: Review mode (default: staged)

**Examples**:
```bash
/pr analyze --path src/auth
/pr split --mode massive --path src/billing
/pr plan --reviewers "frontend,backend,security"
/pr review --depth deep
/pr communicate
```

**Output Sections**:
- PR Analysis
- Suggested Splits
- Dependencies
- Review Checklist
- Communication Draft

---

### `/design`
**Purpose**: Unified UI/UX/accessibility review (consolidates component, accessibility, responsive, design-system, UX).

**Syntax**:
```
/design [--path <directory>] [--wcag-level A|AA|AAA] [--scan "*.tsx,*.jsx,*.vue"]
```

**Options**:
- `--path <directory>`: Target UI directory
- `--wcag-level A|AA|AAA`: Accessibility level (default: AA)
- `--scan`: File glob pattern (default: all UI files)

**Examples**:
```bash
/design --path src/components --wcag-level AA
/design --scan "*.tsx" --path src/pages
/design --wcag-level AAA
```

**Output Sections**:
- Component Inventory
- Accessibility Contract
- Visual Style Tokens
- Responsive Breakpoints
- Implementation Checklist

---

### `/security`
**Purpose**: Unified security detection (OWASP, secrets, policies, vulnerabilities, exploits).

**Syntax**:
```
/security [--path <directory>] [--severity critical|high|medium|low] [--scope all|code|deps|config]
```

**Options**:
- `--path <directory>`: Target directory
- `--severity`: Minimum severity to report (default: high)
- `--scope`: What to scan (default: all)

**Examples**:
```bash
/security --path src/auth --severity high
/security --scope deps --severity critical
/security --path . --scope all
```

**Output Sections**:
- OWASP Mapping
- Secret Scan Results
- Policy Violations
- Vulnerability Findings
- Exploit Scenarios
- Remediation Guidance

---

### `/hooks`
**Purpose**: Unified hook management (install, execute, monitor, validate git/IDE/CI hooks).

**Syntax**:
```
/hooks <action> [--hook <name>] [--path <directory>]
```

**Actions**:
- `install`: Deploy all hooks to .git/hooks/, CI, IDE
- `execute <hook>`: Run specific hook manually
- `status`: Check hook health and execution history
- `validate`: Validate hook configuration
- `test <hook>`: Dry-run hook execution

**Examples**:
```bash
/hooks install
/hooks execute pre-commit
/hooks status
/hooks validate
/hooks test pre-push
```

**Output Sections**:
- Hook Registry
- Execution Results
- Monitoring Dashboard
- Validation Report

---

### `/suggestions`
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

**Examples**:
```bash
/suggestions analyze --file src/auth/login.ts
/suggestions list --severity high
/suggestions accept pattern-123
```

**Output Sections**:
- Active Suggestions
- Pattern Recognition
- Improvement Opportunities
- Context-Aware Recommendations

---

### `/dependencies`
**Purpose**: Supply chain audit: CVEs, licenses, policy compliance, vulnerability assessment.

**Syntax**:
```
/dependencies [--path <directory>] [--severity high|medium|low] [--policy <name>]
```

**Options**:
- `--path <directory>`: Project path
- `--severity`: Minimum vulnerability severity (default: high)
- `--policy`: Compliance policy to enforce

**Examples**:
```bash
/dependencies --path . --severity high
/dependencies --policy enterprise
/dependencies --severity medium --path src/backend
```

**Output Sections**:
- Dependency Inventory
- CVE Assessment
- License Compliance
- Policy Violations
- Vulnerability Remediation

---

## Planning & Ideation Commands

### `/planning`
**Purpose**: Ideation → clustering → scoring → deepening → PERT planning (consolidates brainstorm, converge, ADR, experiment).

**Syntax**:
```
/planning [--path <directory>] [--depth quick|full] [--mode ideate|cluster|score|deepen|pert|assumptions]
```

**Options**:
- `--path <directory>`: Project root for ideation sources
- `--depth quick|full`: Planning depth (default: full)
- `--mode`: Pipeline stage to run (default: all)

**Examples**:
```bash
/planning --path . --depth full
/planning --mode ideate --path src
/planning --mode pert --path .
```

**Output Sections**:
- Ideation Output
- Clustering Matrix
- Score Sheet
- Deepening Plan
- PERT Timeline
- Assumptions List

---

### `/brand`
**Purpose**: Generate brand strategy + video storyboard, presentation, PDF collateral.

**Syntax**:
```
/brand [--path <directory>] [--depth quick|full] [--audience <role>] [--focus <area>]
```

**Options**:
- `--path <directory>`: Target repo
- `--depth quick|full`: Questionnaire depth (default: full)
- `--audience`: Target audience (CTO, VP Engineering, etc.)
- `--focus`: Focus area (technical, product, competitive)

**Examples**:
```bash
/brand --path . --depth full
/brand --audience "CTO, VP Engineering" --focus enterprise
/brand --depth quick
```

**Output Sections**:
- Brand Strategy Report
- Video Storyboard
- Presentation Outline
- PDF Brief

---

### `/voice`
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

**Examples**:
```bash
/voice --capture
/voice --inject --harness all
/voice --test --harness claudecode
/voice --refresh
```

**Output Sections**:
- Voice Profile
- Harness Config Updates
- Verification Log

---

### `/triage`
**Purpose**: Support ticket → code task with blast-radius, priority, escalation.

**Syntax**:
```
/triage <ticket-text> [--severity P0|P1|P2|P3] [--project <jira-project>]
```

**Options**:
- `<ticket-text>`: Support ticket content (required)
- `--severity`: Initial severity estimate
- `--project`: Jira project key (default: NEWT)

**Examples**:
```bash
/triage "User cannot login after password reset" --severity P1
/triage "API returns 500 on bulk upload" --severity P0 --project OPS
```

**Output Sections**:
- Ticket Classification
- Blast Radius Assessment
- Priority Scoring
- Suggested Tasks
- Escalation Path
- Jira Integration

---

### `/metrics`
**Purpose**: Retrieve Newt metrics in Prometheus, JSON, or summary format for observability and AI adoption tracking.

**Syntax**:
```
/metrics [--format prometheus|json|summary]
```

**Options**:
- `--format`: Output format (default: prometheus)

**Examples**:
```bash
/metrics
/metrics --format json
/metrics --format summary
```

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

**Output Sections**:
- Skill Invocations
- MCP Tool Calls
- Adversarial Reviews
- AI Adoption Events
- Command Executions
- System Health

---

## Maintenance Commands

### `/refresh-plugin`
**Purpose**: Refresh plugin after repository updates.

**Syntax**:
```
/refresh-plugin [--force]
```

**Options**:
- `--force`: Force refresh even if cache is valid

**Examples**:
```bash
/refresh-plugin
/refresh-plugin --force
```

---

## Quick Reference Table

| Command | Purpose | Key Options |
|---------|---------|-------------|
| `/review` | Full-stack code review | `--path`, `--depth`, `--lens` |
| `/adversarial-review` | Multi-agent adversarial review | `--path`, `--depth`, `--lens` |
| `/project-health` | Codebase health score | `--path`, `--metrics` |
| `/review-history` | Historical review analysis | `--range`, `--limit`, `--filters` |
| `/architecture` | Architecture + DB analysis | `--path`, `--depth`, `--include-db` |
| `/pr` | PR lifecycle | `<action>`, `--path`, `--mode` |
| `/design` | UI/UX/accessibility audit | `--path`, `--wcag-level`, `--scan` |
| `/security` | Security detection | `--path`, `--severity`, `--scope` |
| `/hooks` | Hook lifecycle management | `<action>`, `--hook`, `--path` |
| `/suggestions` | Real-time IDE suggestions | `<action>`, `--file`, `--severity` |
| `/dependencies` | Supply chain audit | `--path`, `--severity`, `--policy` |
| `/planning` | Ideation → PERT pipeline | `--path`, `--depth`, `--mode` |
| `/brand` | Brand strategy + collateral | `--path`, `--depth`, `--audience` |
| `/voice` | Voice onboarding | `<action>`, `--harness` |
| `/triage` | Support ticket → code task | `<ticket>`, `--severity`, `--project` |
| `/metrics` | Observability + AI adoption | `--format` |
| `/refresh-plugin` | Plugin refresh | `--force` |