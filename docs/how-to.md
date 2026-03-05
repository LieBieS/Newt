---
title: Using Newt Effectively
description: Practical walkthroughs, workflows, and real-world scenarios for the Newt agentic plugin.
---

# How to Use Newt

This guide illustrates common workflows, end-to-end scenarios, and command combinations so you can extract full value from Newt in daily engineering work.

## 1. Quick Pull Request Gate
1. Pull latest code and open the PR branch.
2. Run `/review --path src/billing` to focus on files touched by the PR.
3. Inspect the output sections (Issues Found, Security Issues, etc.).
4. If Critical/High issues appear, run `/project-health --path src/billing` to understand broader impact.
5. Use `/review-history --component billing-service` to confirm whether similar problems were previously flagged.

### Recommended Combo
- `/review` + `/review-history` ensures regressions don’t resurface.
- Trigger `detect-god-class` skill manually via `/skills run detect-god-class --path src/billing` when large refactors are in play.

## 2. Architecture Modernization Sprint
1. Kick off with `/architecture-check` to catalog current patterns and violations.
2. Run `/project-health --module api-gateway` to quantify technical debt.
3. Execute `/review --path api-gateway --depth full` after each refactor milestone.
4. Log outcomes in `logs/reviews/` and share via `/review-history --limit 10` for stakeholders.

### Recommended Combo
- `/architecture-check` → `/review` → `/project-health` gives you structure, findings, and scoring in one loop.
- Enable `detect-circular-deps` and `detect-god-class` skills to auto-run in CI (see `skills/` metadata).

## 3. Security Burn-Down
1. Run `/review --security-only` (custom flag) to focus on security sections.
2. Trigger `detect-sql-injection` skill manually for high-risk modules: `/skills run detect-sql-injection --path src/payments`.
3. Use `/project-health` to view security posture trend.
4. Export results to Jira via integration hooks (see README integrations section).

### Recommended Combo
- `/review --security-only` + `detect-sql-injection` ensures depth on data-access layers.
- `/review-history --filters severity=high,type=security` highlights recurring vulnerabilities.

## 4. Performance Tuning Cycle
1. Execute `/review --path services/search --focus performance` to gather perf risks.
2. Trigger `performance-analyzer` directly: `/agents run performance-analyzer --path services/search`.
3. Run `/project-health --path services/search --metrics performance` for trending.
4. Benchmark using upcoming `tests/performance/` suite once implemented.

### Recommended Combo
- `/review` + `performance-analyzer` + `/project-health` triangulates issues, specific root causes, and KPIs.
- Watch for `Issues Found` entries referencing "N+1" or "blocking I/O"; those map to targeted skills.

## 5. Release Readiness Drill
1. Run `/review --depth full` on the release branch.
2. Follow with `/project-health` to compute overall readiness score.
3. Use `/review-history --range 14d` to ensure all blockers were addressed.
4. Export logs in `logs/reviews/` to the release notes folder.

## 6. Brainstorming (Ideation OS) Workflows

### 6.1 Feature Ideation → Converge → Experiment
1. Generate options:
   ```
   /brainstorm --mode product --topic "Improve onboarding for mobile users"
   ```
2. If you already have a list of options from stakeholders, converge deterministically:
   ```
   /converge --ideas <paste ideas>
   ```
3. Turn the selected candidate into a test plan:
   ```
   /experiment-brief --idea "<selected candidate>"
   ```

### 6.2 Architecture Decision → ADR Draft
1. Generate architecture options and trade-offs:
   ```
   /brainstorm --mode technical --topic "Split billing module" --path src/billing
   ```
2. Draft an ADR for the chosen approach:
   ```
   /adr-draft --decision "<chosen approach>" --options "<other options>"
   ```

### 6.3 Process Improvement (Large PRs)
1. Brainstorm approaches to reduce PR size and review time:
   ```
   /brainstorm --mode process --topic "Reduce PRs >100 commits" 
   ```
2. Apply the plan to your current branch:
   ```
   /pr-review --massive
   ```
3. Use the output to create stacked PRs (recommended merge sequence included).

### Recommended Combo
- `/review` (full) + `/project-health` + `/review-history --range` gives PMs and architects a single view.
- Integrate with CI: `npm run test:e2e` (future script) before tagging releases.

## 7. Frontend Design (Web UI/UX) Workflows

### 7.1 Design a New Page or Flow
1. Create an implementation-ready spec:
   ```
   /ui-design --goal "Design a new settings page" --path src/ui
   ```
2. Validate accessibility:
   ```
   /accessibility-audit --path src/ui
   ```
3. Validate responsive behavior:
   ```
   /responsive-check --path src/ui --touch-targets
   ```

### 7.2 Improve a Single Component
1. Review component contract, variants, and a11y:
   ```
   /component-review --component Button --path src/components --a11y
   ```
2. Run focused a11y audit:
   ```
   /accessibility-audit --path src/components/Button
   ```

### 7.3 Establish a Lightweight Design System
1. Propose tokens + standards:
   ```
   /design-system --tokens --components "Button,Input,Modal"
   ```
2. Review UX patterns for a critical flow:
   ```
   /ux-pattern-review --flow "Onboarding" --heuristics nielsen
   ```

## Tips & Tricks
- **Scoped paths**: Most commands accept `--path` to narrow analysis.
- **Depth options**: `/review --depth quick|full` balances speed vs. thoroughness.
- **Custom configs**: Adjust thresholds via `config/environments/*.yml` or `config/teams/*.yml`.
- **Automation**: Add commands to pre-commit hooks or CI pipelines using `/plugin run <command>` CLI equivalents.
- **Logging**: Investigate issues using `logs/reviews/` and `logs/errors/` for forensic analysis.

## Real-World Use Cases
| Role | Goal | Commands & Skills |
|------|------|-------------------|
| Project Manager | Assess release risk | `/project-health`, `/review-history`, logs exports |
| Architect | Enforce layered design | `/architecture-check`, `detect-circular-deps`, `/review --path core` |
| Security Champion | Burn down vulnerabilities | `/review --security-only`, `detect-sql-injection`, `dependency-audit` |
| Performance Lead | Optimize hotspots | `performance-analyzer`, `/review --focus performance`, performance tests |
| Senior Dev | Prep PRs for review | `/review --path feature`, `/project-health --path feature`, `/review-history --component feature` |

Use this guide as a starting point and adapt the combos to your workflow. Contributions welcome—submit new playbooks under `docs/how-to.md`.
