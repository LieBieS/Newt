---
title: pr-splitting
kind: automated-skill
description: Automatically analyzes large PRs and suggests optimal splits into manageable, logical sub-PRs.
triggers:
  - event: pr_creation
    filter: "**/*"
  - event: branch_size_threshold
    filter: "**/*"
metrics:
  - name: max_commits_per_pr
    threshold: 50
  - name: max_files_changed_per_pr
    threshold: 100
  - name: max_lines_added_per_pr
    threshold: 5000
instructions:
  steps:
    - Detect PR size exceeding configured thresholds.
    - Analyze changes for logical groupings and dependencies.
    - Generate sub-PR recommendations with clear boundaries.
    - Create dependency mapping between proposed sub-PRs.
    - Suggest optimal merge sequence to minimize integration risk.
    - Provide risk assessment for each proposed sub-PR.
outputs:
  format: |
    PR Splitting Recommendations:
    - Current Size: <commits> commits, <files> files, <lines> lines
    - Recommended Split: <count> PRs
      PR <number>: <description>
        Commits: <range>
        Risk: <level>
        Reviewers: <suggested team>
    - Dependencies: <dependency graph>
    - Merge Sequence: <optimal order>
---
