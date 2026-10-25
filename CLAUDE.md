# Newt — Claude Code Plugin

Newt is a comprehensive AI development assistant plugin. It provides architecture analysis, automated code reviews, security auditing, performance analysis, PR review automation, brainstorming, and frontend design tooling.

## Plugin Structure

- `commands/` — slash commands invokable via `/command-name`
- `skills/` — automated skills, each in a subdirectory with `SKILL.md`
- `agents/` — specialist agents called by commands and orchestrators
- `config/default.yml` — all configurable thresholds and settings
- `.claude-plugin/plugin.json` — manifest declaring all commands, skills, agents

## Available Commands

| Command | Purpose |
|---------|---------|
| `/review` | Full-stack code review via review-orchestrator |
| `/project-health` | Holistic codebase health score |
| `/review-history` | Browse past review logs |
| `/architecture-check` | Architecture pattern compliance |
| `/adversarial-review` | Multi-agent adversarial review (GoF, Fowler, Uncle Bob lenses) |
| `/design-quality` | Unified UI/UX/accessibility review (consolidates component, accessibility, responsive, design-system, UX) |
| `/security-guard` | Unified security detection (OWASP, secrets, policies, vulnerabilities, exploits) |
| `/plan-pipeline` | Ideation → clustering → scoring → deepening → PERT planning (consolidates brainstorm, converge, ADR, experiment) |
| `/pr-reviewer` | Unified PR lifecycle: analyze, split, plan, review, communicate |
| `/hook-manager` | Unified hook management: install, execute, monitor, validate |
| `/support-triage` | Support ticket → code task with blast-radius, priority, escalation |
| `/voice-onboarding` | Capture user voice and inject into all harnesses |
| `/brand-marketing` | Generate brand strategy + video, presentation, PDF collateral |
| `/refresh-plugin` | Refresh plugin after repository updates |

## Validation

Run `npm run validate` to check plugin structural integrity.

## Configuration

Edit `config/default.yml` to adjust thresholds, integrations, and orchestration settings.
