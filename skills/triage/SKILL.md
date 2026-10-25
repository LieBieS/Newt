---
title: support-triage
description: Enterprise-grade support ticket → code task conversion with priority, blast-radius, and escalation logic.
kind: automated-skill
triggers:
  - event: support_ticket_created
    filter: "**/*"
  - event: bug_reported
    filter: "**/*"
  - event: feature_request
    filter: "**/*"
outputs:
  sections:
    - Ticket Classification
    - Blast Radius Assessment
    - Priority Scoring
    - Suggested Tasks
    - Escalation Path
    - Jira Integration
---

# Support Triage

## Mission
Turn any user-facing request (support ticket, bug, feature request) into a prioritized, actionable code task with blast-radius assessment and enterprise escalation.

## Operating Procedure
1. **Classify** — Determine ticket type (bug, feature, security, performance, ux)
2. **Assess** — Map customer impact, business value, technical debt
3. **Blast** — Identify affected components (git graph, dependency tree)
4. **Score** — Priority using formula: P = (impact × urgency) + risk_factor
5. **Suggest** — Break down tasks into user stories, acceptance criteria
6. **Escalate** — Route based on severity (P0-P3 levels)
7. **Integrate** — Create Jira ticket linked to source (chat, email, form)

## Consolidated Domains

### Ticket Classification
- Bug: regression, documented behavior, severity
- Feature: new functionality, roadmap alignment
- Security: vulnerability, exposure vector
- Performance: degradation, bottleneck
- UX: user experience, accessibility

### Blast Radius Assessment
- Component graph traversal (affected modules)
- API surface impact (public interfaces)
- User impact (customer segments)
- Downstream dependencies (transitive dependents)
- Data/state affected (user data, logs, configs)

### Priority Scoring
- Impact score: user_count × business_value
- Urgency score: deadline, revenue impact, compliance date
- Risk score: technical complexity, unknown dependencies
- Priority formula: P = (impact × urgency) + risk
- Levels: P0 (critical), P1 (high), P2 (medium), P3 (low)

### Suggested Tasks
- Primary task (epic level)
- Sub-tasks (user stories, acceptance criteria)
- Technical tasks (refactor, infrastructure)
- Documentation tasks (changelog, user guide)

### Escalation Path
- P0 → Immediate escalation (CTO, security team)
- P1 → Team lead + product owner
- P2 → Development team lead
- P3 → Backlog grooming

### Jira Integration
- Create issue with custom fields:
  - ticket_source (email, slack, portal)
  - blast_radius (components affected)
  - priority (P0-P3)
  - escalation_level (auto-calculated)
- Link to source (chat message ID, GitHub issue)
- Auto-update status based on task creation

## Output Contract
- **Ticket Classification** — Type, severity, category, source
- **Blast Radius Assessment** — Components, users, data, dependencies
- **Priority Scoring** — Impact, urgency, risk, final_priority
- **Suggested Tasks** — Epic, user story, acceptance criteria, technical
- **Escalation Path** — Target, urgency, notification_method
- **Jira Integration** — Issue_key, link_url, status, created_at

## Configuration
```yaml
support_triage:
  enabled: true
  classification:
    bug:
      severity_map:
        crash: P0
        data_loss: P0
        auth_failure: P0
        performance_degradation: P1
        ui_breakage: P1
        documentation_gaps: P2
        cosmetic: P3
    feature:
      prioritization: [revenue, user_value, competitive]
  blast_radius:
    max_components: 10
    dependency_depth: 3
    user_segments: true
    data_impact: true
  priority:
    impact_weights:
      user_count: 0.3
      business_value: 0.4
      technical_debt: 0.3
    urgency_weights:
      revenue_deadline: 0.5
      compliance_date: 0.3
      customer_reported: 0.2
  escalation:
    channels: [slack, email, pagerduty]
    notification_template: "Triage: {{ticket}} - Priority {{priority}}"
  jira:
    project: NEWT
    custom_fields:
      - ticket_source
      - blast_radius
      - escalation_level
```

## Success Criteria
- Ticket classified correctly
- Blast radius accurately assessed
- Priority calculated and documented
- Tasks suggested (epic + stories)
- Escalation path defined
- Jira issue created
- Source linked
- Notification sent
- Output is executable (task list, Jira link)
- Deterministic for identical tickets
- Completes within 10s per ticket