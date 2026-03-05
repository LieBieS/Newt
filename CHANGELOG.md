# Changelog

All notable changes to Newt will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-03-05

### Added
- **PR Review Ecosystem**: Complete PR review automation with intelligent commit planning
  - `pr-review-agent`: Real-time analysis, staged file review, branch-level planning
  - `pr-planning-agent`: Strategic planning for commit boundaries and PR splits
  - `pr-communication-agent`: Natural language PR descriptions and review comments
  - `/pr-review` command with 6 modes (live, staged, branch, massive, hotfix, refactor)
  - Skills: `live-suggestions`, `commit-planning`, `pr-splitting`

- **Brainstorming & Ideation OS**: Structured ideation with decision artifacts
  - `brainstorming-agent`: Facilitator with deterministic workflow and convergence
  - `creative-pattern-agent`: Cross-domain patterns and analogies
  - `constraint-analysis-agent`: Constraint extraction and relaxation options
  - `convergence-agent`: Deterministic scoring and candidate selection
  - `experiment-designer-agent`: Experiment briefs with instrumentation and rollout plans
  - `/brainstorm` command with 4 modes (technical, product, process, incident)
  - `/converge`, `/experiment-brief`, `/adr-draft` commands
  - Skills: `idea-backlog-curator`, `constraint-harvester`, `idea-clusterer`
  - Configuration: `brainstorming` section in `config/default.yml`

- **Documentation**
  - `docs/api-reference.md`: Complete command and configuration reference
  - `docs/troubleshooting.md`: Comprehensive troubleshooting guide
  - `docs/how-to.md`: Enhanced with brainstorming workflows
  - `CONTRIBUTING.md`: Developer contribution guide

- **Tooling & Scripts**
  - `scripts/validate-plugin.js`: Plugin structure validator
  - `scripts/config-validator.js`: Configuration validator with schema checking
  - `scripts/install-hooks.sh`: Git hooks installer for pre-commit/pre-push
  - `package.json`: NPM scripts for validation and testing
  - `.gitignore`: Proper exclusions for logs, secrets, and build artifacts

- **Enhanced Error Handling**
  - Added resilience sections to `security-auditor` and `performance-analyzer`
  - Consistent error handling patterns across all agents
  - Structured error logging to `logs/errors/`

### Changed
- **README.md**: Enhanced with Quick Start section and better feature organization
- **Plugin version**: Bumped to 1.1.0
- **Plugin description**: Updated to reflect full feature set

### Fixed
- Missing error handling sections in core agents
- Inconsistent output contract documentation

## [1.0.0] - 2026-03-04

### Added
- Initial release of Newt plugin
- Core review agents: `review-orchestrator`, `architecture-analyst`, `security-auditor`, `performance-analyzer`
- Core commands: `/review`, `/project-health`, `/review-history`, `/architecture-check`
- Core skills: `detect-god-class`, `detect-circular-deps`, `detect-sql-injection`, `dependency-audit`
- Configuration system with environment and team overrides
- Logging system for reviews
- Installation guide and basic documentation

[1.1.0]: https://github.com/your-org/newt/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/your-org/newt/releases/tag/v1.0.0
