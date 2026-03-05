---
title: review-orchestrator unit tests
description: Validates deterministic formatting, severity normalization, and failure handling for the review-orchestrator agent.
---

## Test Matrix
| ID | Scenario | Input | Expected Output |
|----|----------|-------|-----------------|
| UO-001 | Normal multi-agent run | Architecture/security/perf findings with mixed severities | Output sections rendered in mandated order, severity normalized to Critical/High/Medium/Low |
| UO-002 | Missing agent response | Security agent returns timeout | Orchestrator marks Security Issues section as `Status: Degraded` and logs error |
| UO-003 | Duplicate findings | Two agents flag same file/function | Issue deduplicated with combined metadata |
| UO-004 | Critical blocking issue | Security returns Critical severity | Escalation flag set and recommendation includes owner role |
| UO-005 | Logging failure | File system throws error on log write | Orchestrator retries per config and emits warning if logging ultimately fails |

## Assertions
- JSON schema for intermediate findings validated before merge.
- Every table includes column headers exactly as specified.
- Correlation ID propagated from orchestrator request context.
- Log file name matches `logs/reviews/YYYY-MM-DD_HHMM.md` format.
