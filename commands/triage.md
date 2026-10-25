---
title: /triage
purpose: Support ticket → code task transformation with enterprise workflow.
outputs:
  sections:
    - Classification
    - Impact Analysis
    - Priority Assignment
    - Task Breakdown
    - Escalation Path
    - Jira Integration
---

## Description
Quick triage mode for support tickets.

## Usage
```bash
# Quick triage of support ticket
/triage "User cannot login"

# Assess ticket impact
/triage impact "auth-bug"

# Generate immediate tasks
/triage tasks --auto-priority

# Check status
/triage status

# Export for Jira
/triage export --project NEWT
```

