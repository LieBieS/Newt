---
title: /adversarial-review
purpose: Run a battle-tested multi-agent adversarial code review via the adversarial-review-orchestrator from GoF, Fowler, and Uncle Bob lenses.
outputs:
  sections:
    - Executive Summary
    - Issues Found
    - Security Issues
    - Architecture Issues
    - Code Craftsmanship
    - Recommended Fixes
    - Adversarial Findings
    - Multi-Agent Chain
---

## Description
Triggers a comprehensive adversarial code review that probes the codebase from three complementary software-craftsmanship perspectives:
1. Security — Uncle Bob's defensive programming + OWASP Top 10
2. Architecture — Gang of Four design patterns + Martin Fowler's architectural styles
3. Craftsmanship — Clean Code / SOLID + Fowler's code smells

## Usage
1. Run `/adversarial-review [optional path]` to focus the investigation.
2. Optional: `--depth light|balanced|deep` to control probe depth.
3. Optional: `--lens security|architecture|craftsmanship|all`.

## Behavior
- Fans out to 5 specialist agents in sequence:
  1. `security-auditor` — Security (OWASP + defensive programming)
  2. `architecture-analyst` — Architecture (GoF patterns)
  3. `performance-analyzer` — Craftsmanship (Clean Code/efficiency)
  4. `brainstorming-agent` — Architecture (Fowler refactoring)
  5. `pr-communication-agent` — Human interface (fix-first comments)
- Normalizes severities and deduplicates overlapping findings.
- Enriches each issue with GoF pattern name, Fowler smell, and Uncle Bob precept.

## Output Contract
Always render the mandated sections even when no findings are reported.

## Security Note
The adversarial review includes the `Enterprise Security Gate` in CI/CD pipelines via `hooks/cicd/enterprise-security-gate.js`.
