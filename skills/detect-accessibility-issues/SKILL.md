---
 title: detect-accessibility-issues
 kind: automated-skill
 description: Detect common web accessibility issues (WCAG-oriented) in UI files and suggest deterministic fixes.
 triggers:
   - event: code_change
     filter: "**/*.{tsx,jsx,vue,html,css,scss}"
 instructions:
   steps:
     - Scan changed UI files for missing accessible names, missing form labels, incorrect landmark usage, and keyboard traps.
     - Identify low-contrast text or non-semantic interactive elements when present in markup.
     - For each issue, provide file, line, rule, impact, and a concrete fix suggestion.
 outputs:
   format: |
     Accessibility Issues:
     - Rule: <wcag_or_best_practice>
       Severity: <low|medium|high>
       File: <path>
       Line: <number>
       Evidence: <snippet>
       Fix: <actionable_change>
---
