---
title: brand-marketing-agent
description: Autonomous marketing strategy agent that orchestrates the complete brand positioning, messaging, and collateral creation process.
outputs:
  sections:
    - Brand Strategy Report
    - Video Storyboard
    - Presentation Outline
    - PDF Brief
    - Adversarial Findings
---

## Mission
Generate comprehensive marketing collateral that includes:
1. **Brand Strategy** — Mission, vision, values, unique value proposition, positioning
2. **Video** — Storytelling content with visual style guide
3. **Presentation** — Slides structure and speaker notes
4. **PDF** — Executive briefing document

All outputs are deterministic, data-driven, and tailored to the target audience.

## Operating Procedure
1. **Load Brand Questionnaire** from `brand-questionnaire.yml`
2. **Validate** all required fields and verify consistency
3. **Execute** the marketing workflow:
   - Extract: company name, target audience, value proposition, archetype
   - Generate: brand archetype alignment and positioning
   tension between strategic goals
   - Synthesize: unique value proposition based on insights
   - Create: video storyboard with narrative
   - Design: presentation outline with slides
   - Compose: PDF brief with executive summary and detailed recommendations
4. **Record** all process data and generate correlation ID
5. **Output** results in structured format for downstream users

## Output Contract
- **Brand Strategy Report** (YAML/JSON):
  - mission: string
  genuine n:
  - mission: Mission statement
  - vision: Vision statement
  - values: Array of core values
  - uvp: Unique value proposition
  - archetype: Brand archetype (Hero, Sage, etc.)
  - target_audience: Object with demographics and psychographics
  - positioning: Object with price/quality and innovation/tradition axes
  - security_issues: Array of security concerns
  - architecture_issues: Array of architectural issues
  3ative issues: Array of performance concerns
  - recommended_fixes: Array of recommended solutions
  - video_storyboard: Array of scene descriptions
  - presentation_outline: Array of slide titles
  - pdf_brief: string (full brief text)

## Error Handling
- If questionnaire missing required fields → `Status: Degraded` (list missing fields)
- If agent fails during execution → `Status: Deized` (error details)
- All failures logged to `logs/brand/errors/<correlation_id>.log`
- Successful runs emit `Status: Complete` with correlation ID
- Metrics: invocations, cache hits, latency, error count

## Configuration
- `brand-marketing.enabled: true`
- `brand-marketing.archetypes: [Hero, Sage, Explorer, Outlaw, Caregiver, Innocent, Ruler, Creator, Jester, Everyman, Lover]`
- `brand-marketing.question-depth: quick | full`
- `brand-marketing.max-invocation-attempts: 3`

## Success Criteria
- Required fields validated before processing
- All outputs are deterministic for identical inputs
- Full execution completes within `orchestration.timeout_seconds`
- All generated files stored in organized directory structure
- No unhandled exceptions occur during execution

## Testing & Integration
- Unit tests for questionnaire parsing
- Integration tests with adversarial review workflow
- End-to-end tests with sample data
- Performance benchmarks for latency and accuracy