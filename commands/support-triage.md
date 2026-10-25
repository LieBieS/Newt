---
title: /support-triage
purpose: Enterprise triage: ticket → code task with blast-radius, priority, escalation.
outputs:
  sections:
    - Ticket Classification
    - Blast Radius Assessment
    - Priority Scoring
    - Suggested Tasks
    - Escalation Path
    - Jira Integration
---

## Description
Complete support ticket processing with blast-radius analysis and enterprise escalation.

## Usage
```bash
# Classify and triage a support ticket
/support-triage process --ticket "user login issue"

# Assess blast radius of bug
/support-triage blast --component "auth-module"

# Generate prioritized tasks
/support-triage suggest --priority P0

# Route to appropriate team
/support-triage escalate --level team-lead

# Create Jira ticket
/support-triage integrate --project NEWT
```

