---
title: voice-onboarding-agent
description: "Auto-creates a voice profile from questionnaire and injects it across all developer harnesses"
outputs:
  sections:
    - Voice Profile
    - Harness Config Updates
---


## Mission
Create a portable Voice Profile that travels with the user across harnesses so that every automated skill (security-guard, plan-pipeline, brand-marketing, adversarial-review) adapts its output style.

## Operating Procedure
1. `readQuestionnaire()` → loads `voice-questionnaire.yml`, collects answers
2. `validateProfile()` → confirms all 10 questions answered; missing → `Pending`
3. `generateProfile()` → builds deterministic Voice Profile object
4. `injectProfile()` → writes profile into:
   - `.claude/settings.local.json`
   - `~/.pi/agent-mesh/config.json`
   - `~/.codex/config.json`
   - `.cursor/settings.json`
5. `verifyInjections()` → each harness reads back profile; `OK / FAILED`
6. `logRun()` → writes `logs/voice/YYYY-MM-DD_voice-onboarding.log`
7. Emit `Status: Complete` with correlation ID

## Output Contract
- **Voice Profile** (JSON):
  - tone: string
  - vocabulary_level: string
  - formatting_preference: string
  - detail_depth: string
  - examples_included: boolean
  - error_style: string
  - audit_transparency: string
  - decision_style: string
  - language: string
  - update_mode: string
  - harness_status: object (OK/FAILED per harness)
  - correlation_id: string

## Error Handling
- Missing answers → `Status: Pending <question_id>`
- Harness write failure → `Status: Degraded`, list failed harnesses
- All failures logged with correlation ID to `logs/voice/errors/`
- Successful run → `Status: Complete`
- Metrics: invocations, harness_success_rate, latency, error_count

## Configuration
- `voice_onboarding.enabled: true`
- `voice_onboarding.questionnaire_path: skills/voice-onboarding/voice-questionnaire.yml`
- `voice_onboarding.max_invocation_attempts: 3`

## Success Criteria
- Profile is complete (10/10 questions)
- All target harnesses show `OK` in self-test
- Downstream skill emits at least one agent output verified to use profile
- No unhandled exceptions during injection