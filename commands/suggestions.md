---
title: /suggestions
purpose: Real-time IDE suggestions for code improvement, patterns, best practices.
outputs:
  sections:
    - Active Suggestions
    - Pattern Recognition
    - Improvement Opportunities
    - Context-Aware Recommendations
---

## Description
Real-time code quality suggestions during development.

## Usage
```bash
# Get live suggestions in current file
/suggestions analyze current

# List all active suggestions
/suggestions list --all

# Accept specific suggestion
/suggestions accept "pattern-123"

# Filter by severity
/suggestions filter --severity high

# Export suggestions
/suggestions export --format json
```

