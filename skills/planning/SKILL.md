---
title: plan-pipeline
description: Consolidated ideation → clustering → scoring → deepening → PERT planning + assumptions management.
kind: automated-skill
triggers:
  - event: ideation_completed
    filter: "**/*"
  - event: planning_requested
    filter: "**/*"
outputs:
  sections:
    - Ideation Output
    - Clustering Matrix
    - Score Sheet
    - Deepening Plan
    - PERT Timeline
    - Assumptions List
---

# Plan Pipeline

## Mission
From idea to executable plan: consolidate `idea-clusterer`, `idea-backlog-curator`, `constraint-harvester`, and `plan-deepening` into one pipeline.

## Operating Procedure
1. **Ingest** — Collect ideas, requirements, constraints from project sources
2. **Cluster** — Group related ideas into theme clusters
3. **Score** — Rank by impact/effort, effort, dependencies
4. **Deepen** — Expand each cluster: epics → user stories → acceptance criteria
5. **PERT** — Build PERT timeline (optimistic/pessimistic/realistic) with buffer
6. **Track** — Maintain assumptions list with validation status
7. **Report** — Emit executable plan with priority mapping

## Consolidated Domains

### Ideation
- Idea journal ingestion (chat, docs, email)
- Keyword extraction and topic modeling
- Categorize: feature, bug, enhancement, tech-debt

### Clustering
- Graph-based clustering (Jaccard similarity)
- Theme definitions: product, user experience, performance, security
- Output: cluster_id, theme, size, representative_idea

### Scoring
- Impact (user value, revenue potential)
- Effort (complexity, dev-days)
- Dependencies (blocking relationships)
- Risk (technical uncertainty, integration complexity)
- Priority = Impact/Effort × Risk modifier

### Deepening
- Epic → user stories (INVEST criteria)
- Acceptance criteria → test scenarios
- Story → task decomposition (stickies)
- Documentation structure (README.md, SOPs)

### PERT Timeline
- Task-level optimistic/pessimistic/realistic estimates
- Critical path identification
- Resource allocation matrix
- Buffer calculation (5% for risk)
- Milestone calendar (quarterly, monthly, sprint)

### Assumptions
- Format: "If X, then Y"
- Status: [Confirmed, Testable, Untested]
- Owner, validation due date
- Risk register (impact, mitigation)

## Output Contract
- **Ideation Output** — Idea count, theme distribution, keywords
- **Clustering Matrix** — Cluster, theme, size, centroid, similar_clusters
- **Score Sheet** — Item, impact, effort, priority, dependencies
- **Deepening Plan** — Epic, user story, acceptance criteria, test scenarios
- **PERT Timeline** — Task, optimistic, pessimistic, realistic, critical_path
- **Assumptions List** — Statement, owner, status, validation_date, risk

## Configuration
```yaml
plan_pipeline:
  enabled: true
  ideation:
    sources: [jira, github, slack, confluence]
    keyword_threshold: 0.7
  clustering:
    algorithm: graph
    min_cluster_size: 5
    theme_map: [product, ux, performance, security]
  scoring:
    criteria: [impact, effort, risk]
    impact_weights:
      user_value: 0.4
      revenue: 0.3
      competitive: 0.3
  deepening:
    epic_format: "EPIC-XX - [Feature Name]"
    story_format: "AS A <role> I WANT <goal> SO THAT <benefit>"
  pert:
    buffer_percent: 5
    max_paths: 20
    critical_path_algorithm: [forward, backward]
  assumptions:
    tracking: true
    validation_deadline_days: 30
```

## Success Criteria
- All ideation sources processed
- Clustering organized into themes
- Scoring prioritizes work
- Deepening produces INVEST stories
- PERT timeline with realistic buffers
- Assumptions tracked and validated
- Output is executable (task list, timeline, acceptance criteria)
- Deterministic for identical inputs
- Completes within 5m for 1000 ideas