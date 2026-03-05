---
title: Newt Commands Reference
description: Complete reference for all Newt slash commands with syntax, options, and examples.
---

# Newt Commands Reference

Complete reference for all available commands in the Newt plugin.

## Core Review Commands

### `/review`
**Purpose**: Execute comprehensive code review analysis.

**Syntax**:
```
/review [--path <directory>] [--depth quick|full] [--format markdown|json|summary]
```

**Options**:
- `--path <directory>`: Limit analysis to specific directory
- `--depth quick|full`: Analysis thoroughness (default: quick)
- `--format markdown|json|summary`: Output format (default: markdown)

**Examples**:
```bash
/review --path src/auth --depth quick
/review --format json
/review --depth full
```

**Output Sections**:
- Review Summary
- Issues Detected
- Severity
- Recommended Fixes
- Refactored Code Example

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

### `/architecture-check`
**Purpose**: Validate architectural patterns and boundaries.

**Syntax**:
```
/architecture-check [--path <directory>] [--pattern <pattern>]
```

**Options**:
- `--path <directory>`: Target module or service
- `--pattern`: Expected pattern (clean|hexagonal|layered|modular_monolith|microservices)

**Examples**:
```bash
/architecture-check --path src/billing
/architecture-check --pattern clean_architecture
/architecture-check --pattern microservices
```

**Output Sections**:
- Architecture Pattern
- Violations
- Refactoring Suggestions
- Pattern Compliance Score

---

## PR Review Commands

### `/pr-review`
**Purpose**: Intelligent PR review with commit planning and PR splitting.

**Syntax**:
```
/pr-review [--live|--staged|--branch <name>|--massive|--hotfix|--refactor] [--path <directory>]
```

**Modes**:
- `--live`: Real-time file monitoring and suggestions
- `--staged`: Pre-commit validation of staged files
- `--branch <name>`: Full branch analysis
- `--massive`: Large PR splitting (100+ commits)
- `--hotfix`: Fast-track safety review
- `--refactor`: Architecture change tracking

**Options**:
- `--path <directory>`: Limit analysis scope

**Examples**:
```bash
/pr-review --staged
/pr-review --branch feature-auth
/pr-review --massive --path src/billing
/pr-review --hotfix
/pr-review --refactor --path src/api
```

**Output Sections**:
- Real-time Suggestions
- Commit Recommendations
- PR Planning
- Risk Assessment
- Communication Artifacts

---

## Brainstorming & Ideation Commands

### `/brainstorm`
**Purpose**: Structured ideation session with decision artifacts.

**Syntax**:
```
/brainstorm --mode <type> --topic <text> [--path <directory>] [--frameworks <list>] [--constraints <text>]
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

**Examples**:
```bash
/brainstorm --mode technical --topic "Improve authentication system"
/brainstorm --mode product --topic "Mobile onboarding flow" --path src/mobile
/brainstorm --mode process --topic "Reduce PR size" --constraints "No breaking changes"
```

**Output Sections**:
- Objective
- Constraints
- Idea Landscape
- Clusters
- Top Candidates
- Recommendations
- Decision Artifacts

---

### `/converge`
**Purpose**: Score and select top ideas from a list.

**Syntax**:
```
/converge --ideas <text> [--weights <yaml>] [--top <number>]
```

**Options**:
- `--ideas`: Paste or reference idea list
- `--weights`: Custom scoring weights
- `--top`: Number of candidates (default: 3)

**Examples**:
```bash
/converge --ideas "Idea 1\nIdea 2\nIdea 3"
/converge --ideas <paste ideas> --top 5
```

**Output Sections**:
- Scoring Rubric
- Scored Options
- Top 3
- Why Not The Others

---

### `/experiment-brief`
**Purpose**: Generate testable experiment plan for selected idea.

**Syntax**:
```
/experiment-brief --idea <text> [--metrics <text>] [--constraints <text>]
```

**Options**:
- `--idea`: Selected candidate idea
- `--metrics`: Success metrics
- `--constraints`: Known constraints

**Examples**:
```bash
/experiment-brief --idea "Implement JWT authentication" --metrics "login success rate"
/experiment-brief --idea "A/B test new checkout flow" --constraints "No database changes"
```

**Output Sections**:
- Hypothesis
- Experiment Design
- Instrumentation
- Rollout Plan
- Kill Criteria
- Follow-ups

---

### `/adr-draft`
**Purpose**: Draft Architecture Decision Record.

**Syntax**:
```
/adr-draft --decision <text> --options <text> [--constraints <text>]
```

**Options**:
- `--decision`: Chosen approach
- `--options`: Alternative options considered
- `--constraints`: Known constraints

**Examples**:
```bash
/adr-draft --decision "Use microservices architecture" --options "Monolith, Modular monolith"
/adr-draft --decision "Adopt PostgreSQL" --options "MySQL, MongoDB" --constraints "Budget limit"
```

**Output Sections**:
- Context
- Decision
- Options Considered
- Consequences
- Rollout
- Links

---

## Frontend Design (Web UI/UX) Commands

### `/ui-design`
**Purpose**: Create an implementation-ready UI spec (flow, components, tokens, a11y, responsive, performance).

**Syntax**:
```
/ui-design --goal <text> [--path <directory>] [--page <name>] [--framework <name>] [--style-system <name>] [--component-lib <name>]
```

**Examples**:
```bash
/ui-design --goal "Redesign login screen" --path src/ui
/ui-design --goal "Improve onboarding flow" --page Onboarding
```

---

### `/component-review`
**Purpose**: Review a single component for usability, variants, accessibility, and API design.

**Syntax**:
```
/component-review --component <name> [--path <directory>] [--variants <list>] [--a11y]
```

---

### `/accessibility-audit`
**Purpose**: Audit UI code for WCAG issues and provide fixes and tests.

**Syntax**:
```
/accessibility-audit [--path <directory>] [--wcag A|AA|AAA] [--focus] [--forms] [--aria]
```

---

### `/responsive-check`
**Purpose**: Validate responsive behavior, touch targets, and layout stability.

**Syntax**:
```
/responsive-check [--path <directory>] [--breakpoints <list>] [--touch-targets]
```

---

### `/design-system`
**Purpose**: Define or evolve a design system (tokens, components, governance).

**Syntax**:
```
/design-system [--framework <name>] [--style-system <name>] [--tokens] [--components <list>]
```

---

### `/ux-pattern-review`
**Purpose**: Review UX patterns in a flow for usability and best-practice adherence.

**Syntax**:
```
/ux-pattern-review [--path <directory>] [--flow <name>] [--heuristics nielsen|laws]
```

---

## Command Quick Reference

| Command | Primary Use Case | Key Options |
|---------|------------------|-------------|
| `/review` | Code review | `--path`, `--depth`, `--format` |
| `/project-health` | Health assessment | `--path`, `--metrics` |
| `/review-history` | Historical analysis | `--range`, `--limit`, `--filters` |
| `/architecture-check` | Architecture validation | `--path`, `--pattern` |
| `/pr-review` | PR automation | `--staged`, `--branch`, `--massive` |
| `/brainstorm` | Ideation | `--mode`, `--topic`, `--constraints` |
| `/converge` | Idea selection | `--ideas`, `--top` |
| `/experiment-brief` | Experiment planning | `--idea`, `--metrics` |
| `/adr-draft` | Decision documentation | `--decision`, `--options` |

## Common Workflows

### 1. Pre-commit Review
```bash
/pr-review --staged
```

### 2. Feature Ideation → Experiment
```bash
/brainstorm --mode product --topic "New feature idea"
/converge --ideas <paste ideas>
/experiment-brief --idea <selected idea>
```

### 3. Architecture Decision
```bash
/brainstorm --mode technical --topic "Architecture change"
/adr-draft --decision <chosen approach> --options <alternatives>
```

### 4. Large PR Management
```bash
/pr-review --massive
# Follow recommendations to split into smaller PRs
```

### 5. Project Health Check
```bash
/project-health
/review-history --range 30d
```

## Tips & Tricks

- **Scoped Analysis**: Use `--path` to focus on specific modules
- **Quick Reviews**: Use `--depth quick` for faster analysis
- **Historical Trends**: Use `/review-history` to track improvement over time
- **PR Planning**: Use `/pr-review --staged` before committing
- **Decision Making**: Use `/brainstorm` → `/converge` → `/adr-draft` workflow
- **Experimentation**: Use `/brainstorm` → `/experiment-brief` for data-driven decisions

## Output Formats

### Markdown (Default)
Human-readable with sections and formatting

### JSON
Machine-readable for automation and CI/CD integration

### Summary
Executive overview for stakeholders

## Error Handling

All commands include:
- Graceful degradation when services unavailable
- Clear error messages
- Fallback to cached results when possible
- Structured error logging to `logs/errors/`

## Configuration

Customize behavior in `config/default.yml`:
- Review thresholds
- PR size limits
- Brainstorming frameworks
- Scoring weights
- Integration settings
