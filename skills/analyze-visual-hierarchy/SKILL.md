---
 title: analyze-visual-hierarchy
 kind: automated-skill
 description: Analyze headings, landmarks, and primary CTA clarity to improve visual hierarchy and scannability in web UIs.
 triggers:
   - event: code_change
     filter: "**/*.{tsx,jsx,vue,html}"
 instructions:
   steps:
     - Identify heading structure (H1-H6) and landmark regions (header/nav/main/footer).
     - Flag missing H1, skipped levels, or multiple H1s when inappropriate.
     - Identify likely primary actions and warn when competing CTAs exist above the fold.
     - Provide deterministic recommendations for hierarchy and layout adjustments.
 outputs:
   format: |
     Visual Hierarchy Findings:
     - File: <path>
       Finding: <issue>
       Evidence: <snippet>
       Recommendation: <change>
---
