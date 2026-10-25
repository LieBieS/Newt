---
title: voice-onboarding
description: Captures user's communication style and injects it into Claude Code, Pi, Codex, Windsurf, Cursor for voice-consistent agent outputs.
kind: automated-skill
triggers:
  - event: harness_start
    filter: "**/*"
  - event: user_profile_updated
    filter: "**/*"
outputs:
  sections:
    - Voice Profile
    - Harness Config Updates
    - Verification Log
---

# Voice Onboarding

## Mission
Every developer writes differently. This skill captures the user's voice (tone, vocabulary, formatting, examples) and writes it into their development harness so that all skills and agents respond in that voice.

## Operating Procedure
1. **Questionnaire** — Run 10-question voice questionnaire
2. **Profile** — Generate Voice Profile (tone, vocabulary, formatting, etc.)
3. **Inject** — Update all harness configs:
   - Claude Code: `.claude/settings.local.json`
   - Pi: `~/.pi/agent-mesh/config.json`
   - Codex: `~/.codex/config.json`
   - Windsurf / Cursor: `.cursor/settings.json`
4. **Verify** — Each harness reads back profile, log OK/FAILED
5. **Log** — Write `logs/voice/YYYY-MM-DD_voice-onboarding.log`
6. **Emit** — `Status: Complete` with correlation ID

## Voice Questionnaire (Mandatory)
1. Tone: formal | conversational | direct | playful | technical
2. Vocabulary: abbreviated | full | technical
3. Formatting: table | bullet | paragraph | code-first
4. Detail: quick | balanced | comprehensive
5. Examples: include code samples | links | analogies
6. Error style: direct | gentle | suggestive
7. Audit transparency: show | hide
8. Decision style: options | recommendation | confirmation
9. Language: en | bilingual | other
10. Update mode: manual | continuous

## Output Contract
- **Voice Profile** — Tone, vocabulary, formatting, detail, examples, error_style, audit_transparency, decision_style, language, update_mode
- **Harness Config Updates** — Per-harness path, status, error
- **Verification Log** — Harness, status, correlation_id, timestamp

## Configuration
```yaml
voice_onboarding:
  enabled: true
  harnesses:
    - claudecode
    - pi
    - codex
    - windsurf
    - cursor
  questionnaire_path: skills/voice-onboarding/voice-questionnaire.yml
```

## Success Criteria
- All 10 questions answered
- All harness configs updated
- Verification log shows OK per harness
- Downstream skill uses profile
- No unhandled exceptions
- Deterministic for identical input