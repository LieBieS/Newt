---
title: /brand-marketing
purpose: Generate comprehensive brand strategy and marketing collateral via the brand-marketing-agent
outputs:
  sections:
    - Brand Strategy Report
    - Video Storyboard
    - Presentation Outline
    - PDF Brief
    - Adversarial Findings
---

## Description
Runs the autonomous brand marketing agent to create a complete brand strategy package including mission, vision, values, positioning, video storyboard, presentation outline, and executive PDF brief.

## Usage
```bash
# Quick brand strategy with defaults
/brand-marketing --path . --depth quick

# Full brand strategy with full questionnaire
/brand-marketing --path . --depth full

# Specify target audience and focus
/brand-marketing --path . --audience "CTO, VP Engineering" --focus enterprise
```

## Behavior
1. Loads `skills/brand-marketing/brand-questionnaire.yml`
2. Validates all required fields are present
3. Runs brand archetype scoring (12 archetypes: Hero, Sage, Explorer, Outlaw, Caregiver, Innocent, Ruler, Creator, Jester, Everyman, Lover, Magician)
4. Computes competitive positioning (2x2 matrix: price/quality × innovation/tradition)
5. Produces deterministic Brand Strategy Report with:
   - Mission & Vision
   - Core Values
   - Unique Value Proposition
   - Target Audience (demographics + psychographics)
   - Positioning Matrix
   - Visual Identity Guidelines
   - Voice & Tone
   - Goals & Success Metrics
6. Auto-invokes template renderers:
   - Video Storyboard (60s format: Hook → Problem → Solution → Social Proof → CTA)
   - Presentation Outline (20-min investor deck structure)
   - PDF Brief (executive summary + detailed sections)
7. Writes all artifacts to `logs/brand/YYYY-MM-DD_brand-strategy/`

## Output Contract
Always renders the mandated sections even when no findings are reported.

## Integration
- Results feed into `/adversarial-review` for triple-validation (GoF + Fowler + Uncle Bob)
- Artifacts available as MCP resources: `brand://strategy`, `brand://video`, `brand://presentation`, `brand://pdf`
- Metrics tracked: invocations, cache hits, latency, error count

## Configuration
Controlled via `config/default.yml`:
```yaml
brand-marketing:
  enabled: true
  archetypes: [Hero, Sage, Explorer, Outlaw, Caregiver, Innocent, Ruler, Creator, Jester, Everyman, Lover, Magician]
  question-depth: quick | full
  max-invocation-attempts: 3
```