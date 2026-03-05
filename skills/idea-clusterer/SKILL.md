---
title: idea-clusterer
kind: automated-skill
description: Clusters brainstormed ideas into themes and computes theme-level scores for faster convergence.
triggers:
  - event: command_complete
    filter: "commands/brainstorm"
instructions:
  steps:
    - Ingest the latest brainstorming session output.
    - Normalize each idea into an Idea Card (title, approach, impact, feasibility, risk).
    - Cluster ideas into 3-7 themes using semantic similarity.
    - For each theme, compute average scores and identify the strongest representative idea.
    - Output clusters and recommended theme order.
outputs:
  format: |
    Idea Clusters:
    - Theme: <name>
      Representative: <idea>
      AvgImpact: <1-5>
      AvgFeasibility: <1-5>
      AvgRisk: <1-5>
      Ideas:
        - <idea 1>
        - <idea 2>
---
