---
title: dependency-audit
kind: automated-skill
description: Continuously audit dependency manifests for outdated, vulnerable, or unapproved packages.
triggers:
  - event: code_change
    filter: "**/{package.json,pnpm-lock.yaml,yarn.lock,requirements.txt,poetry.lock,pyproject.toml,go.mod,Gemfile,Gemfile.lock,Cargo.toml,Cargo.lock}",
    match: any
instructions:
  steps:
    - Parse modified manifests and lockfiles to extract dependency name, version, and scope.
    - Compare versions against known vulnerability feeds (CVE, GitHub Advisory DB) and policy blacklists.
    - Flag packages older than the latest minor release or violating organization constraints.
    - Suggest patched versions or alternatives, including migration notes when breaking changes exist.
outputs:
  format: |
    Dependency Audit Findings:
    - Package: <name>
      CurrentVersion: <version>
      Issue: <CVE | outdated | license violation>
      Recommendation: <upgrade to X | replace with Y>
---
