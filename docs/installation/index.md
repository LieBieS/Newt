---
title: Installation Index
description: Platform-specific installation guides for Claude Code, Devin, Codex, Windsurf, Cursor, and Custom Software Factory / Loom Soulf
---

# Installation Index

## Quick Reference

| Platform / Environment | Guide | Time |
|-------|-------|------|
| Claude Code (Desktop) | [claude-code.md](claude-code.md) | 2 min |
| Devin (AI Agent) | [devin.md](devin.md) | 3 min |
| Codex (CLI) | [codex.md](codex.md) | 3 min |
| Windsurf | See [claude-code.md](claude-code.md) (same runtime) | 2 min |
| Cursor | See [claude-code.md](claude-code.md) (same runtime) | 2 min |
| Custom Software Factory / Loom Soulf | [custom-software-factory.md](custom-software-factory.md) | 30 min |

---

## Universal Prerequisites

- Node.js 18+ (`node --version`)
- Git installed (`git --version`)
- Access to repository or workspace

---

## Verification (All Platforms)

After installation:

```bash
# Verify plugin structure
npm run validate

# Run first review
/review --path . --depth quick

# Run adversarial review (GoF + Fowler + Uncle Bob)
/adversarial-review --path . --lens all

# Check security
/security --path . --severity high

# Get metrics (Prometheus format)
/metrics

# Get health status
/health
```

Expected: Structured output with sections. No critical errors in `logs/errors/`.

---

## Available Commands (13 Simplified)

| Command | Purpose |
|---------|---------|
| `/review` | Full-stack code review |
| `/adversarial-review` | Multi-agent adversarial review |
| `/project-health` | Codebase health score |
| `/review-history` | Historical review analysis |
| `/architecture` | Architecture + DB analysis |
| `/pr` | PR lifecycle (analyze, split, plan, review, communicate) |
| `/design` | UI/UX/accessibility audit |
| `/security` | Security detection (OWASP, secrets, policies) |
| `/hooks` | Hook lifecycle management |
| `/suggestions` | Real-time IDE suggestions |
| `/dependencies` | Supply chain audit (CVEs, licenses) |
| `/planning` | Ideation → PERT pipeline |
| `/brand` | Brand strategy + collateral |
| `/voice` | Voice onboarding (all harnesses) |
| `/triage` | Support ticket → code task |
| `/metrics` | Observability + AI adoption |
| `/refresh-plugin` | Plugin refresh |

---

## Next Steps

- [Adversarial Review Guide](../adversarial-review.md)
- [Enterprise Security Guide](../enterprise/security.md)
- [Enterprise Rollout Strategy](../enterprise/rollout.md)
- [Commands Reference](../commands-reference.md)
- [Configuration Reference](../api-reference.md)