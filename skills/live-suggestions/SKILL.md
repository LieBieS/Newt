---
title: live-suggestions
kind: automated-skill
description: Provides real-time inline code suggestions and quality feedback as developers work in their IDE.
triggers:
  - event: file_save
    filter: "**/*.{ts,js,py,java,cs,rb,go}"
  - event: ide_focus_change
    filter: "**/*.{ts,js,py,java,cs,rb,go}"
instructions:
  steps:
    - Monitor file system changes and IDE focus events.
    - Run incremental analysis on modified files using existing agents.
    - Generate inline suggestions with severity indicators.
    - Cache results for sub-second response times.
    - Provide quick-fix options where applicable.
    - Maintain running quality scorecard for the session.
outputs:
  format: |
    Live Suggestions:
    - File: <path>
      Line: <line>
      Issue: <description>
      Severity: <critical|high|medium|low>
      Suggestion: <actionable advice>
      Quick Fix: <available|unavailable>
---
