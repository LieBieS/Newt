---
title: hook-manager
description: Unified git/IDE/CI hook management — install, execute, monitor, validate hooks across all environments.
kind: automated-skill
triggers:
  - event: git_commit
    filter: "**/*"
  - event: ci_pipeline
    filter: ".github/**/*.yml, .gitlab-ci.yml"
  - event: ide_action
    filter: "**/*"
outputs:
  sections:
    - Hook Registry
    - Execution Results
    - Monitoring Dashboard
    - Validation Report
---

# Hook Manager

## Mission
Single source of truth for all hooks — git (pre-commit, pre-push), CI (GitHub Actions, GitLab), IDE (format-on-save, lint-on-type), and custom lifecycle hooks.

## Operating Procedure
1. **Register** — Load hook definitions from `.newh/hooks/` and CI configs
2. **Install** — Deploy hooks to .git/hooks/, CI, IDE settings
3. **Execute** — Run hooks with context (files, env, stage)
4. **Monitor** — Track execution time, success rate, flakiness
5. **Validate** — Ensure hooks pass before merge, block on failure
6. **Report** — Dashboard + alerts for regressions

## Consolidated Domains

### Hook Configuration
- Central `hooks.yaml` defining all hooks
- Per-environment overrides (local, CI, prod)
- Dependency graph between hooks
- Version pinning for external tools

### Hook Execution
- Parallel execution where independent
- Timeout enforcement (default 30s/hook)
- Caching for unchanged files
- Artifact collection (reports, coverage)

### Hook Monitoring
- Execution time p50/p95/p99
- Failure rate by hook type
- Flake detection (intermittent failures)
- Performance regression alerts

### Hook Validation
- Pre-merge gate (all hooks must pass)
- Policy enforcement (e.g., "no skip-ci")
- License header check
- Secret scan
- Dependency vulnerability scan

## Output Contract
- **Hook Registry** — Name, type, trigger, config, status
- **Execution Results** — Hook, duration, exit_code, output, artifacts
- **Monitoring Dashboard** — Metrics, trends, alerts
- **Validation Report** — Gate status, blockers, waivers

## Configuration
```yaml
hook_manager:
  enabled: true
  config_path: .newh/hooks.yaml
  git_hooks:
    pre_commit: [lint, format, secret-scan]
    pre_push: [test, type-check, build]
  ci_hooks:
    github: [security-gate, test-matrix, deploy-preview]
    gitlab: [security-gate, test, deploy]
  ide_hooks:
    format_on_save: true
    lint_on_type: true
  timeouts:
    default: 30
    test: 120
    build: 180
  monitoring:
    enabled: true
    retention_days: 30
```

## Success Criteria
- All hooks registered and executable
- CI/CD integration verified
- Monitoring data collected
- Validation gate blocks on failure
- Zero flaky hooks (or documented)
- Deterministic behavior across environments