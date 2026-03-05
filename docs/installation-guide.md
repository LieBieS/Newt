---
title: Newt Installation Guide
description: Step-by-step onboarding instructions for new developers configuring the Newt plugin.
---

# Developer Installation Guide

Welcome to the Newt project. Follow the steps below to install, configure, and verify the plugin in your local Claude Code environment.

## 1. Prerequisites
1. Claude Desktop or Claude Code extension installed.
2. Access to this repository and required credentials (GitHub, Jira, Slack, etc.).
3. Node.js 18+ and Python 3.10+ installed locally.
4. Git LFS enabled if your org stores large artifacts.

## 2. Clone the Repository
```bash
git clone <repo-url>
cd newt
```

## 3. Install Dependencies
```bash
npm install
pip install -r requirements.txt
```
> If your team uses pnpm/poetry, follow the standard bootstrapping scripts documented in `scripts/`.

## 4. Configure the Plugin
1. Copy `config/default.yml` to a local override if needed.
2. Select the appropriate environment file (`config/environments/development.yml`, `ci.yml`, or `production.yml`).
3. Apply team-specific overrides (e.g., `config/teams/team-a.yml`).
4. Validate configuration consistency:
   ```bash
   node scripts/config-validator.js --config config/default.yml
   ```

## 5. Install Plugin in Claude Code
1. Open Claude Code command palette.
2. Run:
   ```
   /plugin marketplace add ./newt
   /plugin install newt
   ```
3. Reload plugins if prompted.

### Windsurf Installation
Windsurf uses the same plugin runtime as Claude Code, so installation is identical:
1. Copy or clone the `newt/` folder into your Windsurf workspace (e.g., `workspace/plugins/newt`).
2. In Windsurf chat or command palette, run the same commands:
   ```
   /plugin marketplace add ./newt
   /plugin install newt
   ```
3. Reload the Windsurf IDE window to ensure the plugin manifest is reloaded.

### Cursor Installation
Cursor supports Claude Code-compatible plugins via its Agent Store:
1. Copy the `newt/` directory into your Cursor workspace under `.cursor/plugins/` (create the folder if missing).
2. Open Cursor’s command palette and run:
   ```
   /plugin marketplace add ./newt
   /plugin install newt
   ```
3. Toggle the Cursor agent off/on to refresh plugins.
4. If your team distributes plugins through a shared marketplace, publish `newt` there and run `/plugin marketplace search newt` instead.

## 6. Verify Installation
1. Execute `/review --dry-run` on a small directory.
2. Confirm logs appear under `logs/reviews/`.
3. Run `/project-health` to ensure metrics aggregation works.
4. For CI setups, run `npm test` and ensure quality gates pass.

## 7. Optional Integrations
- **GitHub**: Populate tokens in `integrations.github` section and enable PR annotations.
- **Jira**: Configure `project_key`, enable auto issue creation if needed.
- **Slack**: Set `SLACK_WEBHOOK_URL` or team-specific env vars.

## 8. Troubleshooting
| Symptom | Resolution |
|---------|------------|
| Plugin not listed after install | Restart Claude Code and re-run install commands. |
| Config validation fails | Run `node scripts/config-validator.js --fix` (if available) or inspect schema errors. |
| Logs missing | Ensure `logs/` directory writable and logging level not set to `error`. |
| Skills not triggering | Confirm `skills/` metadata matches target file extensions and events. |

## 9. Next Steps
- Review `README.md` for feature overview.
- Explore `agents/` and `commands/` to understand responsibilities.
- Read `docs/extending.md` (once available) for contribution guidelines.
- Join the `#dev-quality` Slack channel for support.
