---
title: Newt for Codex
description: One-command installation and setup for OpenAI Codex CLI
---

# Newt for Codex

## Quick Install

Codex uses Newt as a CLI tool invoked via its shell/tool interface.

### 1. Clone and Install

```bash
# Clone to your workspace
git clone https://github.com/LieBieS/Newt.git ~/.codex/tools/Newt
cd ~/.codex/tools/Newt && npm install
```

### 2. Verify CLI

```bash
# Test Newt CLI directly
node ~/.codex/tools/Newt/scripts/validate-plugin.js
# Expected: structural integrity passed

# Run a review
node ~/.codex/tools/Newt/lsp/server.js --help
```

### 3. Use with Codex

In Codex chat:

```
Codex, run a security audit on the auth module using Newt
Codex, run /adversarial-review on src/services
Codex, check for secrets and critical vulnerabilities
Codex, run /brand on this project for brand strategy
Codex, run /triage "User cannot login" --severity P1
```

Codex invokes Newt via shell:

```bash
cd ~/.codex/tools/Newt
npm run validate
npm run lsp:server -- --debug
```

### 4. Configuration

Create `~/.codex/tools/Newt/.newt/config.yml`:

```yaml
adversarial:
  enabled: true
  depth: balanced
  lens: all

security:
  gate:
    blockOnCritical: true
    failOnSecrets: true
```

---

## Available Commands (13 Simplified)

Codex can invoke these Newt commands via shell:

| Command | Purpose |
|---------|---------|
| `/review` | Full-stack code review |
| `/adversarial-review` | Multi-agent adversarial review (GoF, Fowler, Uncle Bob) |
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

## 12-Skill Framework (Canonical)

| Skill | Purpose |
|-------|---------|
| `review` | Adversarial review orchestrator |
| `security` | OWASP, secrets, policies, vulnerabilities |
| `design` | UI/UX/accessibility audit |
| `hooks` | Git/IDE/CI hook lifecycle |
| `planning` | Ideation → PERT pipeline |
| `pr` | PR lifecycle |
| `architecture` | GoF patterns + DB analyst |
| `brand` | Brand strategy + collateral |
| `voice` | Voice onboarding (all harnesses) |
| `triage` | Support ticket → code task |
| `suggest` | Real-time IDE suggestions |
| `dependencies` | Supply chain audit (CVEs, licenses) |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `npm install` fails | Use Node.js 18+ (`node --version`) |
| Review errors | Check `logs/errors/` and `logs/reviews/` |
| Config validation | Run `node scripts/config-validator.js` |

---

## Next Steps

- Read [Adversarial Review Guide](../adversarial-review.md)
- Configure [Enterprise Security](../enterprise/security.md)
- Explore [Commands Reference](../commands-reference.md)