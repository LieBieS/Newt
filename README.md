---
title: Newt README
description: Documentation for the Newt Claude Code plugin delivering architecture, security, performance, and quality automation.
---

# Newt

## Overview
`Newt` is a comprehensive AI development assistant plugin for Claude Code, Windsurf, and Cursor that provides:
- **Code Review Automation**: Architecture, security, performance, and quality analysis
- **PR Review Intelligence**: Commit planning, PR splitting, and review-ready summaries
- **Structured Brainstorming**: Ideation sessions with decision artifacts (ADRs, experiment briefs)
- **Continuous Quality**: Real-time suggestions and automated skills

## Quick Start

### Installation
```bash
# Clone or download the plugin
cd /path/to/your/workspace

# Install in Claude Code/Windsurf/Cursor
/plugin marketplace add ./newt
/plugin install newt

# Verify installation
/review --help
```

### First Review
```bash
# Run a quick code review
/review --path src/auth --depth quick

# Check project health
/project-health

# Review your staged changes before commit
/pr-review --staged
```

### Configuration
Edit `config/default.yml` to customize thresholds, policies, and integrations.

See `docs/installation-guide.md` for detailed setup instructions.

## MCP (Model Context Protocol)
Newt ships with an MCP server under `mcp/server.mjs` so you can integrate Newt with MCP-capable clients (e.g., Claude Desktop).

### Run MCP server
```bash
npm install
npm run mcp:server
```

### Claude Desktop configuration example
```json
{
  "mcpServers": {
    "newt": {
      "command": "node",
      "args": ["mcp/server.mjs"],
      "cwd": "/absolute/path/to/newt"
    }
  }
}
```

### Exposed MCP resources
- `config://default.yml`
- `config://schema.json`
- `logs://reviews/latest`
- `logs://brainstorm/latest`
- `agents://list`
- `skills://list`

### Exposed MCP tools
Newt MCP tools currently return **deterministic runbooks** describing what to execute inside your agentic IDE:
- `newt_review`
- `newt_pr_review`
- `newt_brainstorm`
- `newt_converge`
- `newt_experiment_brief`
- `newt_adr_draft`

See `mcp/README.md` for details.

## Features
- **Multi-agent review pipeline** coordinated by a review orchestrator
- **Production-grade assessments** for architecture, security, and performance
- **Automated skills** running on every code change
- **Slash commands** for on-demand reviews, health checks, and history lookups
- **PR review automation** with commit planning and splitting for large PRs
- **Brainstorming & ideation** with structured decision artifacts
- **Deterministic output templates** for predictable consumption
- **Persistent logging** under `logs/reviews/` and `logs/brainstorm/`

## Architecture Diagram
```
        +--------------------+
        |  /review command   |
        +---------+----------+
                  |
                  v
        +--------------------+
        | review-orchestrator|
        +---+---+---+--------+
            |   |   |
    +-------+   |   +---------+
    v           v             v
+---------+  +---------+  +-----------+
|Arch Anal|  |Security |  |Performance|
+----+----+  +----+----+  +-----+-----+
     |            |             |
     v            v             v
 Circular   SQL Injection   Perf Heuristics
  Deps &    Detection       (skills + data)
 God Class        \           /
        +----------+----------+
        | Review Logs & Skills|
        +---------------------+
```

## Installation Instructions
1. Open Claude Code command palette.
2. Run:
   ```
   /plugin marketplace add ./newt
   /plugin install newt
   ```
3. Reload plugins if prompted.

## Available Commands
| Command | Description |
|---------|-------------|
| `/review` | Executes full code review (architecture, security, performance, quality) and logs results. |
| `/project-health` | Produces a health score plus major risks and debt areas. |
| `/review-history` | Summarizes past review logs, recurring issues, and hotspots. |
| `/architecture-check` | Runs deep structural validation against supported architecture patterns. |
| `/pr-review` | Reviews staged/branch changes and suggests commit boundaries, PR splits, and PR-ready summaries. |
| `/brainstorm` | Runs a structured ideation session and generates idea cards, ADR draft, and experiment brief. |
| `/converge` | Scores and converges an idea list into top candidates with trade-offs. |
| `/experiment-brief` | Produces an executable experiment plan for a selected candidate idea. |
| `/adr-draft` | Drafts an ADR for an architecture/product decision. |

## Agents Description
- **review-orchestrator** — Central brain that delegates work, merges findings, enforces formatting, and writes logs.
- **architecture-analyst** — Maps repository structure, detects patterns, and flags coupling or layering violations.
- **security-auditor** — Performs OWASP-aligned sweeps for injections, secrets, and auth mistakes.
- **performance-analyzer** — Highlights algorithmic bottlenecks, blocking calls, and query inefficiencies.

- **pr-review-agent** — Continuous PR companion for staged/branch review, PR splitting, and commit planning.
- **pr-planning-agent** — Strategic planner for commit boundaries, dependency mapping, and merge sequencing.
- **pr-communication-agent** — Generates PR descriptions, review comments, and stakeholder-ready summaries.

- **brainstorming-agent** — Facilitates structured ideation sessions and produces decision artifacts.
- **creative-pattern-agent** — Imports cross-domain patterns and modern practices with adaptation guidance.
- **constraint-analysis-agent** — Extracts constraints/assumptions and proposes relaxation options.
- **convergence-agent** — Scores ideas deterministically and selects top candidates.
- **experiment-designer-agent** — Turns candidates into testable experiment plans.

## Skills Description
| Skill | Purpose | Trigger |
|-------|---------|---------|
| detect-god-class | Flags oversized, multi-responsibility classes using metric thresholds. | Any code change touching supported languages. |
| detect-circular-deps | Runs cycle detection on dependency graphs for modified modules. | Code changes in supported languages. |
| detect-sql-injection | Scans SQL-adjacent code for concatenation and unbound parameters. | Code or SQL file changes. |
| dependency-audit | Checks manifest updates for vulnerable or outdated packages. | Changes to package/lock files. |

## Logging System
- Every `/review` invocation writes `logs/reviews/YYYY-MM-DD_HHMM.md`.
- File fields: date, files analyzed, issues found, recommendations, agents invoked.
- `/review-history` reads and aggregates these logs.

## Example Usage
```
/review src/auth
/project-health
/architecture-check services/billing
/review-history --limit 5
```

## Support
For enhancements or troubleshooting, open an issue in your internal repo or extend the agents/skills as needed.
