---
title: brand-marketing-strategy
kind: automated-skill
description: Crafts a complete brand strategy from core values to market positioning using a structured questionnaire framework.
triggers:
  - event: command_complete
    filter: "commands/adversarial-review"
  - event: plan_proposed
    filter: "**/*"
instructions:
  steps:
    - Ingest the proposed brand/product context and target audience.
    - Run the Brand Foundation Questionnaire to extract: mission, vision, values, unique value proposition.
    - Apply the Brand Archetype framework (Hero, Sage, Explorer, Outlaw, etc.) to personality.
    - Map competitor differentiation using a 2x2 matrix (price vs quality, innovation vs tradition).
    - Produce a Brand Script with problem, guide, plan, and success.
    - Output a Brand Guidelines brief (color palette, typography, voice, visual style).
outputs:
  format: |
    Brand Strategy Report:
    - Mission Statement: <1 sentence>
    - Vision Statement: <1 sentence>
    - Core Values: <3-5 bullet items>
    - Unique Value Proposition: <2 sentences>
    - Brand Archetype: <name> with rationale
    - Target Audience: <demographics + psychographics>
    - Competitive Positioning: <2x2 matrix description>
    - Brand Script: <problem > guide > plan > success>
    - Visual Identity: <color palette, typography hints, voice traits>
---

# Brand Strategy Marketer

## Mission
Generate a complete, executable brand strategy from first principles using a rigorous questionnaire — no AI slop, only structured output that feeds directly into video, presentation, and PDF collateral.

## Operating Principles

### 1. Question-Driven Brand Discovery
Every output is grounded in answers to a curated questionnaire. The questionnaire probes:
- Core problem the product solves
- Primary and secondary audiences
- Desired perception (premium, disruptive, trustworthy, etc.)
- Competitive landscape and differentiators
- Emotional and functional benefits
- Brand personality constraints

### 2. Archetype Alignment
Map the brand to one of 12 Jungian archetypes. The archetype dictates:
- Tone of voice (playful, authoritative, compassionate, rebellious)
- Visual language (imagery style, color psychology)
- Story framework (Hero’s journey, underdog triumph, etc.)

### 3. Deterministic Output
The skill never returns “TBD” or “TBD later.” If information is missing, it emits `Status: Pending <specific question>` and lists exactly what is needed to proceed.

## Output Contract (Deterministic)

```yaml
brand-strategy:
  mission: <concise>
  vision: <concise>
  values:
    - <value 1>
    - <value 2>
    - <value 3>
  uvp: <2-sentence unique value proposition>
  archetype: <name>  # e.g. Hero, Outlaw, Caregiver
  audience:
    demographics: <age, role, industry>
    psychographics: <motivations, fears, aspirations>
  positioning:
    price_quality: <premium / mainstream / value>
    innovation_tradition: < cutting-edge / established >
  brand_script:
    problem: <the customer's pain>
    guide: <how the brand helps>
    plan: <the first step to engagement>
    success: <what victory looks like>
  visual_identity:
    palette: <3 primary colors with hex codes>
    typography: <font family, weight>
    voice: <3 adjectives describing brand tone>
```

## Workflow with Adversarial Review

1. **Brand strategist runs** `/brand-marketing-strategy` with product context
2. **Output lands** in `logs/brand/YYYY-MM-DD_brandstrategy.md`
3. **Adversarial reviewer** (`adversarial-review-orchestrator`) checks:
   - Is the UVP differentiated from competitors?
   - Does the archetype align with the product category?
   - Are the visual identity elements actionable for designers?
4. **Feedback loop** — strategist revises pending items, re-runs until `Status: Complete`

## Configuration

- `brand-marketing.enabled: true`
- `brand-marketing.archetypes: [Hero, Outlaw, Caregiver, Explorer, Magician, Sage, Innocent, Ruler, Creator, Jester, Everyman, Lover]`
- `brand-marketing.question-depth: quick / full`