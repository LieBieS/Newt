---
title: /hooks
purpose: Unified hook management: install, execute, monitor, validate git/IDE/CI hooks.
outputs:
  sections:
    - Hook Registry
    - Execution Results
    - Monitoring Dashboard
    - Validation Report
---

## Description
Complete hook lifecycle management across all environments.

## Usage
```bash
# Install all hooks
/hooks install

# Run a specific hook
/hooks execute pre-commit

# List installed hooks
/hooks list

# Remove hooks
/hooks uninstall

# Check hook health
/hooks status

# Validate hook configuration
/hooks validate

# Test hook execution
/hooks test pre-commit
```

