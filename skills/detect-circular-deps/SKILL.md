---
title: detect-circular-deps
kind: automated-skill
description: Identify circular module dependencies that destabilize builds and violate architectural layering.
triggers:
  - event: code_change
    filter: "**/*.{ts,js,py,java,cs,rb,go}"
instructions:
  steps:
    - Build a directed dependency graph for modules touched by the change set.
    - Run cycle detection (Tarjan or DFS-based) and capture the shortest offending cycle.
    - Emit actionable guidance showing import chain and recommended decoupling tactics.
outputs:
  format: |
    Circular Dependencies:
    - Cycle: <moduleA -> moduleB -> moduleA>
      Files: [<pathA>, <pathB>, ...]
      RootCause: <shared state | misplaced responsibility | layering violation>
      Recommendation: <introduce interface | move abstraction | break shared state>
---
