---
title: Adversarial Code Review
description: Multi-agent adversarial code review from GoF, Fowler, and Uncle Bob lenses for enterprise-grade quality assurance.
---

# Adversarial Code Review

Newt's adversarial code review runs a multi-agent chain that probes your codebase from three software-craftsmanship perspectives:

1. **Security** — Uncle Bob's defensive programming + OWASP Top 10
2. **Architecture** — GoF design patterns + Martin Fowler's architectural styles
3. **Craftsmanship** — Clean Code / SOLID + Fowler's code smells

## Command

```
/review --adversarial [--path <dir>] [--depth light|balanced|deep] [--lens security|architecture|craftsmanship|all]
```

| Option | Description | Default |
|--------|-------------|---------|
| `--path` | Limit analysis to specific directory | repo root |
| `--depth` | Adversarial probe depth | `balanced` |
| `--lens` | Which lens to run (or `all`) | `all` |

## The Agent Chain

The orchestrator fans out to 5 specialist agents, then fuses findings into one deterministic package:

| Agent | Lens | Probes |
|-------|------|--------|
| `security-auditor` | Security (Uncle Bob + OWASP) | Injection, secrets, authN/Z bypass, CVEs |
| `architecture-analyst` | Architecture (GoF) | Pattern violations, circular deps, god objects |
| `performance-analyzer` | Craftsmanship (Clean Code) | N+1 queries, blocking I/O, memory churn |
| `brainstorming-agent` | Architecture (Fowler) | Refactoring candidates, "what-if" removal |
| `pr-communication-agent` | Human Interface | Fix-first review comments, PR description |

## Output Sections

```
Executive Summary          → 3 bullets (Security + Architecture + Craftsmanship)
Issues Found               → table: ID, category, severity, component, GoF lens, Fowler smell, Uncle Bob precept
Security Issues            → OWASP category, CVSS severity, exploit scenario, suggested fix
Architecture Issues        → GoF pattern → violation evidence → refactoring path
Code Craftsmanship         → SOLID violations + Fowler smell catalog
Recommended Fixes          → prioritized backlog with ETA + owner role + GoF pattern to apply
Adversarial Findings       → what was probed and why (transparency)
Multi-Agent Chain          → agents invoked, order, correlation IDs
```

## GoF Pattern Violation Examples

```
Creational:
  Abstract Factory Abuse → AuthFactory expects [TokenProvider, SessionStore]
  but receives incompatible implementation → Risk: High

Structural:
  Bridge Overdesign → ThemeEngine extracts Abstraction + Implementation
  but exposes implementation details → Risk: Critical

Behavioral:
  Observer Race Condition → DataBus listeners mutate shared state
  without synchronization → Risk: Medium
```

## Uncle Bob SOLID Violations

| Principle | Adversarial Probe |
|-----------|-------------------|
| SRP | Methods with multiple reasons to change |
| OCP | Classes not designed for extension |
| LSP | Subclasses that weaken parent contracts |
| ISP | Interfaces with unused client dependencies |
| DIP | Depending on details instead of abstractions |

## Fowler Code Smell Probes

| Smell | What if? |
|-------|----------|
| Big Ball of Mud | Can we add structure to this monolithic blob? |
| God Class | Can we extract methods and properties? |
| Circular Dependency | Can we resolve with wrapper components? |
| Code Duplication | Can we refactor identical implementations into shared library? |
| Speculative Generality | Are we building for unknown futures? |

## Adversarial Findings Section

A dedicated "Adversarial Findings" section documents every probe attempted, even those that returned clean results — providing auditors with transparency into coverage depth.

## Logging

Review packages persist to:
```
logs/reviews/YYYY-MM-DD_HHMM.md
```

Metadata includes files analyzed, agents invoked, rule packs executed, and correlation IDs for traceability.

## Related

- [Enterprise Security](../enterprise/security.md)
- [Enterprise Rollout](../enterprise/rollout.md)
- [LSP Architecture](../lsp-architecture.md)