---
title: Newt for Claude Code
description: One-command installation and setup for Claude Code
---

# Newt for Claude Code

## Quick Install (30 seconds)

```bash
# Clone and install in one command
git clone https://github.com/LieBieS/Newt.git && cd Newt && npm install

# Install plugin to Claude Code
/plugin marketplace add ./Newt
/plugin install newt
```

## Verify Installation

```bash
# Run your first adversarial review
/review --path src --depth quick

# Or the new adversarial review
/adversarial-review --path src

# Check security
/security --path . --severity high

# Get metrics
/metrics
```

You should see structured output with sections: Summary, Issues Found, Security Issues, Architecture Issues, Code Craftsmanship.

---

## Detailed Steps

### 1. Prerequisites
- **Claude Code** installed and authenticated
- **Node.js 18+** (`node --version`)
- **Git** installed

### 2. Installation Methods

#### Method A: Local Development (Recommended for teams)
```bash
# Clone to your workspace
git clone https://github.com/LieBieS/Newt.git ~/.claude/plugins/Newt
cd ~/.claude/plugins/Newt && npm install

# Register with Claude Code
/plugin marketplace add ~/.claude/plugins/Newt
/plugin install newt
```

#### Method B: Project-Local (Per-repo)
```bash
# In your project root
git clone https://github.com/LieBieS/Newt.git .newt/plugin
cd .newt/plugin && npm install

# Register
/plugin marketplace add .newt/plugin
/plugin install newt
```

### 3. Configuration

```bash
# Copy config template
cp .newt/plugin/config/default.yml .newt/config.yml

# Edit for your team
# - Set thresholds in thresholds: section
# - Enable adversarial review: adversarial.enabled: true
# - Configure enterprise security gate: security.gate.blockOnCritical: true
```

### 4. Verify with Test Run

```bash
# Quick test
/review --path . --depth quick --format summary

# Expected: Output with "Summary", "Issues Found" sections
# No errors = installation successful
```

### 5. Enable Git Hooks (Optional)

```bash
# Install pre-commit hooks
.newt/plugin/scripts/install-hooks.sh

# Now every commit runs security + quality checks
```

---

## Available Commands (13 Simplified)

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

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `/plugin` command not found | Restart Claude Code after plugin install |
| "Plugin not found" | Ensure `npm install` completed in plugin directory |
| Config errors | Run `node scripts/config-validator.js --config .newt/config.yml` |
| Hooks fail | Check `logs/errors/` for details |

---

## Next Steps

- Read [Adversarial Review Guide](../adversarial-review.md)
- Configure [Enterprise Security](../enterprise/security.md)
- Set up [CI/CD Integration](cicd.md)