---
title: adversarial-review
description: Master coordinator that fans out to 5 specialist agents (security-auditor, architecture-analyst, performance-analyzer, brainstorming-agent, pr-communication-agent) and applies GoF/Fowler/Uncle Bob adversarial lenses.
kind: automated-skill
triggers:
  - event: review_requested
    filter: "**/*"
  - event: pull_request_opened
    filter: "**/*"
outputs:
  sections:
    - Security Findings
    - Architecture Findings
    - Performance Findings
    - Brainstorming Alternatives
    - PR Communication Draft
---

# Adversarial Review Orchestrator

## Mission
Run a complete adversarial code review from three perspectives:
1. **GoF** — Design pattern violations and structural anti-patterns
2. **Fowler** — Code smells, refactoring opportunities, architectural decay
3. **Uncle Bob** — SOLID violations, clean code principles

## Operating Procedure
1. **Fan-out** — Dispatch review scope to 5 specialist agents
2. **Aggregate** — Collect findings from all agents
3. **Synthesize** — Cross-reference findings across lenses
4. **Prioritize** — Rank by risk (Critical > High > Medium > Low)
5. **Report** — Emit deterministic review report

## Agent Fan-Out
| Agent | Lens | Focus |
|-------|------|-------|
| security-auditor | Security | OWASP, secrets, injection, auth |
| architecture-analyst | Architecture | GoF violations, Fowler smells |
| performance-analyzer | Performance | Bottlenecks, memory, complexity |
| brainstorming-agent | Alternatives | Pattern alternatives, improvements |
| pr-communication-agent | Communication | PR description, reviewer assignment |

## Output Contract
- **Security Findings** — OWASP category, severity, location, fix
- **Architecture Findings** — Pattern violation, smell, risk, refactor
- **Performance Findings** — Bottleneck, metric, recommendation
- **Brainstorming Alternatives** — Alternative patterns, trade-offs
- **PR Communication Draft** — Reviewer assignment, summary, checklist

## Configuration
```yaml
adversarial:
  enabled: true
  depth: balanced
  lenses: [security, architecture, performance, alternatives, communication]
  exclude_patterns: []
  max_files_per_review: 500
  timeout_seconds: 300
```

## Success Criteria
- All 5 agents complete within timeout
- Findings cross-referenced (no duplicate reports)
- Risk-ranked output with correlation ID
- No unhandled exceptions
- Deterministic for identical input