---
title: idea-backlog-curator
kind: automated-skill
description: Converts recurring review findings and logged risks into structured opportunity statements and backlog items.
triggers:
  - event: log_write
    filter: "logs/reviews/**/*.md"
  - event: log_write
    filter: "logs/brainstorm/**/*.md"
instructions:
  steps:
    - Parse new log entries and extract recurring problems, hotspots, and repeated recommendations.
    - Convert each into an Opportunity Statement (problem, why now, desired outcome).
    - Propose 3 solution directions per opportunity.
    - Generate backlog-ready items with:
      - title
      - description
      - acceptance criteria
      - effort (S/M/L)
      - impact (1-5)
      - suggested owner role
    - Deduplicate against the last 30 days of backlog outputs.
outputs:
  format: |
    Opportunity Backlog:
    - Title: <short>
      Problem: <what hurts>
      Outcome: <measurable>
      Solution Directions:
        - <direction 1>
        - <direction 2>
        - <direction 3>
      Backlog Item:
        Effort: <S|M|L>
        Impact: <1-5>
        Owner: <PM|Architect|Security|Lead Dev|SRE>
        Acceptance Criteria:
          - <criterion>
---
