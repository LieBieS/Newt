#!/bin/bash
# Newt Git Hooks Installation Script
# Installs pre-commit and pre-push hooks for automated quality checks

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_ROOT="$(dirname "$SCRIPT_DIR")"
GIT_HOOKS_DIR=".git/hooks"

echo "=== Newt Git Hooks Installation ==="
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    echo "Please run this script from the root of your git repository"
    exit 1
fi

# Create hooks directory if it doesn't exist
mkdir -p "$GIT_HOOKS_DIR"

# Install pre-commit hook
echo "Installing pre-commit hook..."
cat > "$GIT_HOOKS_DIR/pre-commit" << 'EOF'
#!/bin/bash
# Newt pre-commit hook
# Runs quality checks on staged files before commit

echo "🔍 Running Newt pre-commit checks..."

# Run staged file review
npx newt pr-review --staged --format json > /tmp/newt-review.json 2>&1

# Check exit code
if [ $? -ne 0 ]; then
    echo "❌ Newt found critical issues. Commit blocked."
    echo "Run 'npx newt pr-review --staged' to see details"
    exit 1
fi

# Check for critical issues in output
if grep -q '"severity":"critical"' /tmp/newt-review.json 2>/dev/null; then
    echo "❌ Critical issues found. Commit blocked."
    echo "Run 'npx newt pr-review --staged' to see details"
    exit 1
fi

echo "✅ Newt checks passed"
exit 0
EOF

chmod +x "$GIT_HOOKS_DIR/pre-commit"
echo "✓ Pre-commit hook installed"

# Install pre-push hook
echo "Installing pre-push hook..."
cat > "$GIT_HOOKS_DIR/pre-push" << 'EOF'
#!/bin/bash
# Newt pre-push hook
# Runs branch-level review before push

echo "🔍 Running Newt pre-push checks..."

# Get current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Run branch review
npx newt pr-review --branch "$BRANCH" --format json > /tmp/newt-branch-review.json 2>&1

# Check exit code
if [ $? -ne 0 ]; then
    echo "⚠️  Newt encountered issues during branch review"
    echo "Run 'npx newt pr-review --branch $BRANCH' to see details"
    # Don't block push, just warn
fi

echo "✅ Newt branch review complete"
exit 0
EOF

chmod +x "$GIT_HOOKS_DIR/pre-push"
echo "✓ Pre-push hook installed"

# Create optional commit-msg hook for commit message suggestions
echo "Installing commit-msg hook..."
cat > "$GIT_HOOKS_DIR/commit-msg" << 'EOF'
#!/bin/bash
# Newt commit-msg hook
# Validates commit message format

COMMIT_MSG_FILE=$1
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

# Check for conventional commit format
if ! echo "$COMMIT_MSG" | grep -qE '^(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?: .+'; then
    echo "⚠️  Commit message doesn't follow conventional format"
    echo "Expected: type(scope): description"
    echo "Example: feat(auth): add JWT authentication"
    echo ""
    echo "Continue anyway? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

exit 0
EOF

chmod +x "$GIT_HOOKS_DIR/commit-msg"
echo "✓ Commit-msg hook installed"

echo ""
echo "=== Installation Complete ==="
echo ""
echo "Installed hooks:"
echo "  ✓ pre-commit  - Runs quality checks on staged files"
echo "  ✓ pre-push    - Runs branch-level review"
echo "  ✓ commit-msg  - Validates commit message format"
echo ""
echo "To customize hook behavior, edit files in .git/hooks/"
echo "To disable a hook temporarily, make it non-executable:"
echo "  chmod -x .git/hooks/pre-commit"
echo ""
