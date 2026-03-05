---
 title: component-consistency-checker
 kind: automated-skill
 description: Check UI component consistency for spacing, color tokens, typography scale, and variant duplication.
 triggers:
   - event: code_change
     filter: "**/*.{tsx,jsx,vue,css,scss}"
 instructions:
   steps:
     - Detect repeated style values that should be tokens (colors, spacing, radii, shadows).
     - Flag inconsistent button/link styles and duplicated variants across components.
     - Suggest consolidations into shared components or token usage.
 outputs:
   format: |
     Consistency Findings:
     - File: <path>
       Issue: <description>
       Evidence: <snippet>
       Recommendation: <action>
---
