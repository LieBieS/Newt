---
title: /voice
purpose: Capture user voice and inject into all harnesses (Claude, Pi, Codex, Windsurf, Cursor).
outputs:
  sections:
    - Voice Profile
    - Harness Config Updates
    - Verification Log
---

## Description
Capture and distribute communication voice across all development tools.

## Usage
```bash
# Run voice questionnaire
/voice capture

# Update harness configs
/voice inject --harnesses all

# Test harness integration
/voice test --harness claudecode

# Refresh profile
/voice refresh

# Export profile
/voice export
```

