---
title: /pr-review
purpose: Execute comprehensive PR review analysis with real-time suggestions, commit planning, and intelligent communication generation.
outputs:
  sections:
    - Review Summary
    - Commit Recommendations
    - PR Planning
    - Risk Assessment
    - Communication Artifacts
---

## Description
Triggers the PR review agent ecosystem to analyze code changes, suggest optimal commit boundaries, plan PR structure, and generate human-readable communications. Supports multiple modes from live development to massive PR handling.

## Usage
1. Ensure repository is indexed and up to date.
2. Run `/pr-review [mode] [options]`.
3. Review the structured output and follow recommendations.

## Modes and Options

### Live Development Mode
```
/pr-review --live
```
- Monitors file changes in real-time
- Provides inline suggestions as you code
- Maintains running quality scorecard
- Suggests immediate fixes for critical issues

### Staged Files Review
```
/pr-review --staged
```
- Analyzes only staged files
- Provides pre-commit validation
- Suggests commit boundaries
- Blocks commits with critical issues (configurable)

### Branch-Level Analysis
```
/pr-review --branch <branch-name>
```
- Analyzes entire branch against target
- Generates PR planning recommendations
- Suggests optimal PR splits
- Identifies required reviewers

### Massive PR Handling
```
/pr-review --massive
```
- Automatically detects large PRs (100+ commits)
- Splits into logical sub-PRs
- Creates dependency mapping
- Generates merge sequence

### Emergency Hotfix Mode
```
/pr-review --hotfix
```
- Fast-tracks safety-focused analysis
- Generates rollback procedures
- Provides minimal risk assessment
- Creates emergency checklist

### Refactoring Campaign
```
/pr-review --refactor
```
- Tracks architectural changes
- Validates system invariants
- Identifies side effects
- Generates migration roadmap

## Options

### Path Scoping
```
/pr-review --path src/auth
```
- Limit analysis to specific directories
- Improves performance for large repositories
- Focuses review on changed components

### Depth Control
```
/pr-review --depth quick|full
```
- **quick**: Fast analysis focusing on critical issues
- **full**: Comprehensive analysis with detailed recommendations

### Output Format
```
/pr-review --format markdown|json|summary
```
- **markdown**: Human-readable report (default)
- **json**: Machine-readable for automation
- **summary**: Executive summary for stakeholders

### Integration Mode
```
/pr-review --integrate git-hooks|ide|ci
```
- **git-hooks**: Install pre-commit/pre-push hooks
- **ide**: Enable IDE integration for Windsurf/Cursor
- **ci**: Generate CI/CD pipeline configuration

## Behavior

### Agent Orchestration
- Calls `pr-review-agent` as primary orchestrator
- Invokes `pr-planning-agent` for strategic analysis
- Uses `pr-communication-agent` for human-readable output
- Leverages existing agents (architecture, security, performance) for technical analysis

### Analysis Pipeline
1. **Scope Detection**: Identify changed files and analysis boundaries
2. **Technical Analysis**: Run architecture, security, performance checks
3. **Strategic Planning**: Analyze dependencies and suggest boundaries
4. **Communication Generation**: Create human-readable outputs
5. **Integration**: Apply results to IDE, Git, or CI/CD systems

### Caching and Performance
- Caches analysis results for sub-second response times
- Uses incremental analysis for real-time mode
- Implements circuit breakers for external service calls
- Graceful degradation when services unavailable

## Output Contract

### Live Mode Output
```
Real-time Suggestions:
- File: src/auth/login.ts
  Line: 45
  Issue: SQL injection vulnerability
  Severity: High
  Suggestion: Use parameterized queries
  Quick Fix: Available
```

### Staged Mode Output
```
Commit Recommendations:
- Suggested Split: 3 commits
  1. Add authentication interface
  2. Implement JWT service
  3. Update login controller
- Risk Level: Medium
- Block Commit: No (no critical issues)
```

### Branch Mode Output
```
PR Planning:
- Recommended Split: 2 PRs
  PR 1: Authentication foundation (15 commits)
  PR 2: Login integration (8 commits)
- Dependencies: PR 2 depends on PR 1
- Reviewers: @security-team, @backend-team
- Timeline: 2-3 weeks
```

### Massive PR Output
```
Massive PR Analysis:
- Total Changes: 127 commits, 15,000 lines
- Recommended Split: 4 PRs
  PR 1: Core services (35 commits)
  PR 2: API endpoints (30 commits)
  PR 3: Frontend integration (32 commits)
  PR 4: Testing and docs (30 commits)
- Merge Sequence: PR 1 → PR 2 → PR 3 → PR 4
- Critical Path: Core services → API endpoints
```

## Integration Examples

### Pre-commit Hook
```bash
#!/bin/sh
# .git/hooks/pre-commit
npx newt pr-review --staged --format json
exit $?
```

### IDE Integration
```json
// .vscode/settings.json
{
  "newt.prReview.liveMode": true,
  "newt.prReview.autoSave": true,
  "newt.prReview.severityThreshold": "medium"
}
```

### CI/CD Pipeline
```yaml
# .github/workflows/pr-review.yml
- name: PR Review Analysis
  run: npx newt pr-review --branch $PR_BRANCH --format json
- name: Upload Review Results
  uses: actions/upload-artifact@v3
  with:
    name: pr-review-results
    path: review-results.json
```

## Configuration

All behavior controlled via `config/default.yml`:
- `review_policies.commit_blocking` - Configure commit blocking rules
- `review_policies.pr_size_limits` - Set PR size thresholds
- `review_policies.reviewer_assignment` - Define expert teams
- `orchestration.timeout_seconds` - Configure analysis timeouts
- `communication.tone` - Set communication style preferences

## Success Criteria
- Sub-second response times for live mode
- 90% accuracy in commit boundary suggestions
- 80% reduction in PR review time
- 70% improvement in code quality before merge
- 95% satisfaction with generated communications

## Troubleshooting
| Issue | Resolution |
|-------|------------|
| Slow analysis | Use `--path` to limit scope or `--depth quick` |
| Missing suggestions | Check file permissions and Git status |
| Hook not working | Verify hook executable permissions and PATH |
| IDE integration issues | Restart IDE and check plugin installation |
