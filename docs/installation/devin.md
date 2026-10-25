---
title: Newt for Devin
description: One-command installation and setup for Devin AI
---

# Newt for Devin

## Quick Install

Devin runs Newt as an external tool via its tool calling interface. No plugin install needed — use the **MCP Server** or **CLI**.

---

## Method 1: MCP Server (Recommended)

### 1. Start the MCP Server

```bash
# In your Devin project
git clone https://github.com/LieBieS/Newt.git .newt && cd .newt && npm install

# Start MCP server (keep running)
npm run mcp:server
```

Server runs on stdio — Devin will connect automatically.

### 2. Configure Devin

In your Devin project settings, add the MCP server:

```json
{
  "mcpServers": {
    "newt": {
      "command": "node",
      "args": [".newt/mcp/server.mjs"],
      "cwd": "{{workspace}}"
    }
  }
}
```

### 3. Use in Devin

Devin can now call Newt tools directly:

```
Devin, run a security review on src/auth using Newt
Devin, run /adversarial-review on the billing module
Devin, check for secrets and critical vulnerabilities before I commit
Devin, show me the brand strategy for this project
Devin, run /triage on "User cannot login after password reset"
```

---

## Method 2: CLI via Shell Tool

If Devin has shell access:

```bash
# One-time setup
git clone https://github.com/LieBieS/Newt.git ~/newt && cd ~/newt && npm install

# Run reviews
node ~/newt/scripts/review.js --path ./src --depth full
```

---

## Configuration for Devin

Create `.newt/config.yml` in your workspace:

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

Devin will respect these settings automatically.

---

## Available MCP Resources

Devin can read these resources:
- `config://default.yml` — Newt configuration
- `config://schema.json` — Config schema
- `logs://reviews/latest` — Latest review log
- `logs://brainstorm/latest` — Latest brainstorm session
- `agents://list` — Available agents
- `skills://list` — Available skills (12 canonical skills)
- `metrics://latest` — Prometheus metrics
- `health://latest` — Health status

---

## Available MCP Tools

Devin can invoke:
- `newt_review` — Run code review
- `newt_pr_review` — PR review with commit planning
- `newt_brainstorm` — Structured ideation
- `newt_architecture_check` — Architecture compliance
- `newt_project_health` — Health score
- `newt_brand_strategy` — Generate brand strategy
- `newt_video_storyboard` — Create video storyboard
- `newt_pdf_brief` — Generate PDF brief
- `newt_metrics` — Get metrics (Prometheus/JSON/summary)

---

## 12-Skill Framework (Canonical)

| Skill | Purpose |
|-------|---------|
| `review` | Adversarial review orchestrator |
| `security` | OWASP, secrets, policies, vulnerabilities |
| `design` | UI/UX/accessibility audit |
| `hooks` | Git/IDE/CI hook lifecycle |
| `planning` | Ideation → PERT pipeline |
| `pr` | PR lifecycle (analyze, split, plan, review, communicate) |
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
| MCP connection fails | Ensure `npm install` completed; check Devin logs |
| Tools not appearing | Restart Devin after adding MCP config |
| Permission errors | Ensure workspace is writable for logs |

---

## Next Steps

- Read [Adversarial Review Guide](../adversarial-review.md)
- Explore [Commands Reference](../commands-reference.md)