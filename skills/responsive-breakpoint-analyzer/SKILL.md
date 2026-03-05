---
 title: responsive-breakpoint-analyzer
 kind: automated-skill
 description: Analyze responsive breakpoints, media queries, and layout stability risks (CLS) in web UI code.
 triggers:
   - event: file_save
     filter: "**/*.{css,scss,tsx,jsx,vue}"
 instructions:
   steps:
     - Identify media queries or responsive utilities and flag inconsistent breakpoint usage.
     - Flag missing sizing constraints that can cause layout shift (images without dimensions, dynamic content without reserved space).
     - Recommend stable layout patterns and consistent breakpoint scales.
 outputs:
   format: |
     Responsive Findings:
     - File: <path>
       BreakpointIssue: <description>
       CLSRisk: <description>
       Recommendation: <action>
---
