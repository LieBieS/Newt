---
title: /voice-onboarding
purpose: "Onboard your communication voice into Claude Code, Pi, Codex, Windsurf, Cursor so all agents speak your language"
outputs:
  sections:
    - Voice Profile
    - Harness Config Updates
---

## Description
Runs the Voice Onboarding questionnaire, captures your communication style, writes a profile to your harness, and verifies downstream agents use it.

## Usage
```bash
# First time — answer the 10-question profile
/voice-onboarding --path .

# Update voice profile (e.g., changed preference)
/voice-onboarding --refresh

# Test that a target harness loaded your profile
/voice-onboarding --test claudecode

# Test all registered harnesses
/voice-onboarding --test all
```

## Behavior
1. Loads `skills/voice-onboarding/voice-questionnaire.yml`
2. If missing answers → `Status: Pending` + list of unanswered questions
3. Generates `.claude/settings.local.json` with `newt.voiceProfile`
4. Updates:
   - Claude Code: `.claude/settings.local.json`
   - Pi: `~/.pi/agent-mesh/config.json`
   - Codex: `~/.codex/config.json`
   - Windsurf / Cursor: `.cursor/settings.json`
5. Runs self-test: asks each harness “read your profile” and returns `OK / FAILED`
6. Emits a verification log in `logs/voice/YYYY-MM-DD_voice-onboarding.log`

## Output Contract
Always renders the mandated sections even when no findings are reported.

## Integration
- All other skills pass `context.voiceProfile` (tone, formatting, detail_depth) to their agent invocations
- `/adversarial-review` reads voice profile to format findings in your preferred voice
- `/brand-marketing` uses tone + vocabulary when producing copy drafts

## Configuration
Controlled via `config/default.yml`:
```yaml
voice_onboarding:
  enabled: true
  harnesses:
    - claudecode
    - pi
    - codex
    - windsurf
    - cursor
```
