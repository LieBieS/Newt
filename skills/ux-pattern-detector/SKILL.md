---
 title: ux-pattern-detector
 kind: automated-skill
 description: Detect potential UX anti-patterns in UI text and structure and suggest user-friendly alternatives.
 triggers:
   - event: ide_focus_change
 instructions:
   steps:
     - Review recently focused UI-related files or components.
     - Flag confusing microcopy, unclear error messages, and patterns that increase cognitive load.
     - Suggest deterministic improvements aligned with UX heuristics.
 outputs:
   format: |
     UX Pattern Findings:
     - Context: <file_or_flow>
       Pattern: <anti_pattern>
       Evidence: <snippet>
       Recommendation: <rewrite_or_change>
---
