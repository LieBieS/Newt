#!/bin/bash
# Newt Final Validation Checklist
# Run this script to verify all enterprise-grade features are in place

set -euo pipefail

PASS=0
FAIL=0

check() {
  local desc="$1"
  shift
  if "$@" > /dev/null 2>&1; then
    echo "✅ $desc"
    PASS=$((PASS + 1))
  else
    echo "❌ $desc"
    FAIL=$((FAIL + 1))
  fi
}

echo "=== Newt Enterprise Validation ==="
echo ""

# 1. Skills
check "Skills directory exists" test -d "skills"
check "At least 12 skills present" bash -c '[ $(ls -d skills/*/ 2>/dev/null | wc -l) -ge 12 ]'
check "adversarial-goftop skill exists" test -f "skills/adversarial-goftop.md"
check "plan-deepening skill exists" test -f "skills/plan-deepening/SKILL.md"

# 2. Agents
check "Agents directory exists" test -d "agents"
check "adversarial-review-orchestrator exists" test -f "agents/adversarial-review-orchestrator.md"
check "review-orchestrator exists" test -f "agents/review-orchestrator.md"
check "security-auditor exists" test -f "agents/security-auditor.md"
check "architecture-analyst exists" test -f "agents/architecture-analyst.md"
check "performance-analyzer exists" test -f "agents/performance-analyzer.md"

# 3. LSP
check "LSP server exists" test -f "lsp/server.js"
check "LSP auth exists" test -f "lsp/security/auth.js"
check "LSP tenancy config exists" test -f "lsp/tenancy/tenant-config.js"
check "LSP metrics exists" test -f "lsp/metrics/observability.js"
check "LSP agent registry exists" test -f "lsp/agents/real-agent-registry.js"

# 4. Hooks
check "Enterprise security gate exists" test -f "hooks/cicd/enterprise-security-gate.js"

# 5. Config
check "Config YAML parses" python3 -c "import yaml; yaml.safe_load(open('config/default.yml'))"
check "adversarial config present" python3 -c "import yaml; d=yaml.safe_load(open('config/default.yml')); assert 'adversarial' in d"
check "security config present" python3 -c "import yaml; d=yaml.safe_load(open('config/default.yml')); assert 'security' in d"
check "multi_tenancy config present" python3 -c "import yaml; d=yaml.safe_load(open('config/default.yml')); assert 'multi_tenancy' in d"

# 6. MCP
check "MCP server exists" test -f "mcp/server.mjs"

# 7. Commands
check "adversarial-review command exists" test -f "commands/adversarial-review.md"
check "review command exists" test -f "commands/review.md"

# 8. Documentation
check "Adversarial review docs exist" test -f "docs/adversarial-review.md"
check "Enterprise security docs exist" test -f "docs/enterprise/security.md"
check "Enterprise rollout docs exist" test -f "docs/enterprise/rollout.md"
check "Installation index exists" test -f "docs/installation/index.md"
check "Installation visualizations exist" test -f "docs/installation/visualizations.md"

# 9. Package
check "package.json valid" python3 -c "import json; json.load(open('package.json'))"
check "plugin.json valid" python3 -c "import json; json.load(open('.claude-plugin/plugin.json'))"

# 10. SOUL.md
check "SOUL.md exists" test -f "SOUL.md"

echo ""
echo "=== Results: $PASS passed, $FAIL failed ==="

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi

echo "All validations passed."