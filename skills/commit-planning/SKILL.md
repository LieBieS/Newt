---
title: commit-planning
kind: automated-skill
description: Analyzes staged changes to suggest optimal commit boundaries and logical groupings.
triggers:
  - event: git_stage
    filter: "**/*"
  - event: pre_commit_hook
    filter: "**/*"
instructions:
  steps:
    - Analyze staged files for semantic coherence.
    - Identify cross-file dependencies that should be committed together.
    - Detect atomic units of work that maintain system consistency.
    - Suggest commit boundaries based on feature completeness.
    - Validate that each suggested commit maintains buildability.
    - Generate commit message suggestions following team conventions.
outputs:
  format: |
    Commit Planning:
    - Suggested Commits: <count>
      Commit <number>: <description>
        Files: <file list>
        Reason: <rationale>
        Risk: <level>
    - Dependencies: <dependency mapping>
    - Commit Message: <suggested message>
---
