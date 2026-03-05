# Contributing to Newt

Thank you for your interest in contributing to Newt! This guide will help you get started.

## Development Setup

### Prerequisites
- Node.js 18+
- Git
- Claude Code, Windsurf, or Cursor IDE

### Initial Setup
```bash
# Clone the repository
git clone <repo-url>
cd newt

# Install dependencies
npm install

# Validate plugin structure
npm run validate

# Install git hooks (optional)
npm run install:hooks
```

## Project Structure

```
newt/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── agents/                   # AI agent definitions
│   ├── review-orchestrator.md
│   ├── architecture-analyst.md
│   ├── security-auditor.md
│   ├── performance-analyzer.md
│   ├── pr-review-agent.md
│   ├── pr-planning-agent.md
│   ├── pr-communication-agent.md
│   ├── brainstorming-agent.md
│   ├── creative-pattern-agent.md
│   ├── constraint-analysis-agent.md
│   ├── convergence-agent.md
│   └── experiment-designer-agent.md
├── commands/                 # Slash command definitions
│   ├── review.md
│   ├── project-health.md
│   ├── review-history.md
│   ├── architecture-check.md
│   ├── pr-review.md
│   ├── brainstorm.md
│   ├── converge.md
│   ├── experiment-brief.md
│   └── adr-draft.md
├── skills/                   # Automated skill definitions
│   ├── detect-god-class/
│   ├── detect-circular-deps/
│   ├── detect-sql-injection/
│   ├── dependency-audit/
│   ├── live-suggestions/
│   ├── commit-planning/
│   ├── pr-splitting/
│   ├── idea-backlog-curator/
│   ├── constraint-harvester/
│   └── idea-clusterer/
├── config/                   # Configuration files
│   ├── default.yml
│   ├── schema.json
│   ├── environments/
│   └── teams/
├── docs/                     # Documentation
│   ├── installation-guide.md
│   ├── how-to.md
│   ├── api-reference.md
│   └── troubleshooting.md
├── scripts/                  # Utility scripts
│   ├── validate-plugin.js
│   ├── config-validator.js
│   └── install-hooks.sh
├── tests/                    # Test files
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
└── logs/                     # Log outputs
    ├── reviews/
    ├── brainstorm/
    └── errors/
```

## Adding New Features

### Adding a New Agent

1. Create agent definition file in `agents/`:
```markdown
---
title: my-new-agent
description: Brief description of what this agent does
outputs:
  sections:
    - Section 1
    - Section 2
---

## Mission
Clear statement of the agent's purpose.

## Operating Procedure
1. Step 1
2. Step 2

## Success Criteria
- Criterion 1
- Criterion 2

## Resilience & Error Handling
- Error handling strategy
- Fallback behavior
- Logging approach
```

2. Register in `.claude-plugin/plugin.json`:
```json
{
  "agents": [
    "existing-agent",
    "my-new-agent"
  ]
}
```

3. Add tests in `tests/unit/my-new-agent.test.md`

### Adding a New Command

1. Create command file in `commands/`:
```markdown
---
title: /my-command
purpose: What this command does
outputs:
  sections:
    - Output Section 1
---

## Description
Detailed description.

## Usage
```
/my-command [options]
```

## Behavior
How the command works.

## Output Contract
Always render these sections.
```

2. Register in `.claude-plugin/plugin.json`

3. Add documentation in `docs/api-reference.md`

### Adding a New Skill

1. Create skill directory in `skills/my-skill/`

2. Create `SKILL.md`:
```markdown
---
title: my-skill
kind: automated-skill
description: What this skill detects
triggers:
  - event: code_change
    filter: "**/*.ts"
instructions:
  steps:
    - Detection logic
outputs:
  format: |
    Output template
---
```

3. Register in `.claude-plugin/plugin.json`

## Code Standards

### Agent/Command/Skill Guidelines
- Always include YAML frontmatter
- Use deterministic output templates
- Include error handling sections
- Provide clear success criteria
- Use markdown formatting consistently

### Configuration Guidelines
- Validate against `config/schema.json`
- Provide sensible defaults
- Document all options
- Use environment-specific overrides appropriately

### Documentation Guidelines
- Keep examples up to date
- Include troubleshooting for common issues
- Provide clear API references
- Use consistent terminology

## Testing

### Running Tests
```bash
# Validate plugin structure
npm run validate

# Validate configuration
npm run validate:config

# Run unit tests (when implemented)
npm run test:unit

# Run integration tests (when implemented)
npm run test:integration
```

### Writing Tests
- Add test fixtures in `tests/fixtures/`
- Document expected outputs
- Test error conditions
- Validate output contracts

## Pull Request Process

1. **Fork and Branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make Changes**
   - Follow code standards
   - Add tests
   - Update documentation

3. **Validate**
   ```bash
   npm run validate
   npm run validate:config
   ```

4. **Commit**
   - Use conventional commit format:
     - `feat(agents): add new agent for X`
     - `fix(commands): correct output format in Y`
     - `docs(api): update command reference`

5. **Submit PR**
   - Clear description of changes
   - Link to related issues
   - Include test results
   - Update CHANGELOG.md

## Code Review Checklist

- [ ] All agents have error handling sections
- [ ] Commands have complete output contracts
- [ ] Skills have proper triggers defined
- [ ] Configuration validated against schema
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No secrets committed
- [ ] Plugin validation passes

## Release Process

1. Update version in:
   - `.claude-plugin/plugin.json`
   - `package.json`

2. Update CHANGELOG.md

3. Tag release:
   ```bash
   git tag -a v1.1.0 -m "Release v1.1.0"
   git push origin v1.1.0
   ```

## Getting Help

- Check `docs/troubleshooting.md`
- Review `docs/api-reference.md`
- Open an issue for bugs
- Join #newt-dev on Slack

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).
