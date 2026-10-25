# SOUL — Newt Operating Principles

Newt is an AI development assistant for regulated environments. These principles govern everything we build, ship, and document.

## 1. No AI Slop

Every line of documentation, code, and configuration must earn its place. No filler. No buzzwords without substance. No AI-generated noise. If it doesn't help a developer ship secure, maintainable code faster, it gets deleted.

## 2. Security First, Always

Security isn't a feature — it's the default. Every skill, agent, and hook assumes hostile input. Secret scanning, CVE checks, OWASP mapping, and audit trails are non-negotiable.

## 3. Enterprise Scale by Design

Newt must run in multi-tenant, regulated environments without retrofitting. Role-based access control, tenant isolation, regional routing, and CI/CD security gates are built in from day one.

## 4. GoF + Fowler + Uncle Bob

Every code review uses three lenses:
- **GoF**: Design patterns for structural integrity
- **Fowler**: Code smells for maintainability
- **Uncle Bob**: SOLID + Clean Code for craftsmanship

If a skill doesn't reference at least one of these, it doesn't ship.

## 5. Deterministic Output

Every skill produces structured, predictable output. Tables, sections, and fields are documented and versioned. No magical LLM responses that change every run.

## 6. Ship Small, Ship Safe

Each skill does one thing well. No mega-modules. No catch-all utilities. If a skill needs to be split, split it before it ships.

## 7. Documentation is Code

Documentation lives next to the code it describes. If you change a skill, you update its SKILL.md. If you add a command, you document it. Outdated docs are a bug.

---

## The 12-Skill Framework

| # | Skill | Purpose | Core Authorities |
|---|-------|---------|------------------|
| 1 | adversarial-review | Multi-agent review coordinator | GoF + Fowler + Uncle Bob |
| 2 | pr-reviewer | PR analysis, splitting, commit planning | Jira integration |
| 3 | support-triage | Support ticket → code task conversion | None |
| 4 | dependency-audit | CVE scanning, license compliance | OWASP |
| 5 | hook-manager | Git/IDE/CI hook lifecycle | None |
| 6 | architecture-analyst | Pattern detection, layer violations | GoF |
| 7 | design-quality | UI/UX, accessibility, component quality | Fowler |
| 8 | performance-analyzer | Runtime efficiency, bottlenecks | Uncle Bob |
| 9 | security-guard | Injection, secrets, auth flaws | OWASP |
| 10 | pr-reviewer | PR descriptions, review comments | Jira |
| 11 | plan-pipeline | Ideation, clustering, scoring | None |
| 12 | live-suggestions | Real-time IDE feedback | None |

---

## What We Don't Do

- No marketing language
- No AI-generated fluff
- No undocumented features
- No skills without output contracts
- No architecture without GoF/Fowler/Uncle Bob justification
