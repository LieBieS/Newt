---
title: architecture-analyst
description: Detects GoF pattern violations, Fowler architectural smells, and structural anti-patterns using adversarial reasoning.
kind: automated-skill
triggers:
  - event: review_requested
    filter: "**/*"
  - event: architecture_review
    filter: "**/*"
outputs:
  sections:
    - Pattern Violations
    - Architectural Smells
    - Structural Risks
    - Refactoring Recommendations
---

# Architecture Analyst

## Mission
From GoF and Fowler perspectives, identify:
- Pattern misuse (Creational, Structural, Behavioral)
- Architectural smells (circular deps, global data, layer violations)
- Structural risks (coupling, cohesion, complexity)
- Concrete refactoring recommendations

## Operating Procedure
1. **Load** — Read project structure and code
2. **Probe** — Run adversarial checks for each GoF pattern category
3. **Smell** — Run Fowler code smell detection
4. **Synthesize** — Map findings to pattern/smell catalog
5. **Prioritize** — Risk-rank by impact and fix cost
6. **Report** — Emit deterministic findings

## GoF Adversarial Probes
### Creational
- Abstract Factory — Incompatible product families
- Builder — Excessive optional parameters
- Factory Method — Forced internal exposure
- Prototype — Mutable shared prototypes

### Structural
- Adapter — Non-adaptable interfaces
- Bridge — Non-orthogonal abstraction/implementation
- Composite — Leaf/composite confusion
- Decorator — Wrapping non-decoratable classes
- Facade — Hidden complexity leaks
- Flyweight — Identity-sensitive sharing
- Proxy — Remote failure modes

### Behavioral
- Chain of Responsibility — Overlapping handlers
- Command — Global state mutation in history
- Iterator — Internal order exposure
- Mediator — Tight colleague coupling
- Memento — Non-deep-copyable state
- Observer — Concurrent mutation races
- State — Contradictory invariants
- Strategy — Non-interchangeable runtime swaps
- Template Method — Concrete step dependency
- Visitor — New element type explosion

## Fowler Smell Catalog
- Circular Dependencies
- Global Data
- Layer Violations
- God Class / Large Class
- Parallel Inheritance
- Middle Man
- Speculative Generality

## Database & Data Architecture
- **Database Patterns** — N+1 queries, missing indexes, connection pooling, query optimization
- **Schema Analysis** — Normalization, data redundancy, schema evolution
- **Migration Safety** — Schema change impact, rollback strategy, data migration plan
- **Data Flow** — Data pipeline integrity, caching strategy, consistency model

## Output Contract
- **Pattern Violations** — Pattern name, location, risk, fix
- **Architectural Smells** — Smell name, files, severity, refactor
- **Structural Risks** — Coupling metrics, cohesion score, debt estimate
- **Refactoring Recommendations** — Pattern → fix mapping, effort, priority
- **Database Findings** — DB pattern violations, schema issues, migration risks

## Configuration
```yaml
architecture:
  enabled: true
  gof_categories: [creational, structural, behavioral]
  fowler_categories: [smells, architecture, speculative]
  depth: balanced
  exclude_patterns: []
```

## Success Criteria
- All pattern categories probed
- Findings mapped to catalog entries
- Risk-ranked with fix recommendations
- Deterministic for identical codebase
- Completes within timeout