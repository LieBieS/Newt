---
title: /metrics
purpose: Retrieve Newt metrics in Prometheus, JSON, or summary format for observability and AI adoption tracking.
outputs:
  sections:
    - Skill Invocations
    - MCP Tool Calls
    - Adversarial Reviews
    - AI Adoption Events
    - Command Executions
    - System Health
---

## Description
Exposes Newt's internal metrics for observability. Includes skill invocation counts, MCP tool usage, adversarial review findings, AI adoption tracking, and command execution performance.

## Usage
```bash
# Prometheus format (default)
/metrics --format prometheus

# JSON format for programmatic access
/metrics --format json

# Human-readable summary
/metrics --format summary
```

## Metrics Catalog

### Skill Invocations
- `newt_skill_invocations_total{skill="<name>",status="success|error"}` — Counter
- `newt_skill_duration_seconds{skill="<name>"}` — Histogram

### MCP Tool Calls
- `newt_mcp_tool_calls_total{tool="<name>",status="success|error"}` — Counter

### Adversarial Reviews
- `newt_adversarial_reviews_total{lens="security|architecture|craftsmanship",severity="critical|high|medium|low"}` — Counter
- `newt_adversarial_findings{lens="<name>",severity="<level>"}` — Gauge

### AI Adoption Events
- `newt_ai_adoption_total{event="session_start|skill_used|command_run|review_completed",user_type="individual|team|enterprise"}` — Counter

### Command Executions
- `newt_commands_total{command="<name>",status="success|error"}` — Counter
- `newt_command_duration_seconds{command="<name>"}` — Histogram

### System Health
- `newt_uptime_seconds` — Gauge
- `newt_active_sessions` — Gauge
- `newt_memory_usage_bytes` — Gauge

## Output Examples

### Prometheus Format
```
# TYPE newt_skill_invocations_total counter
newt_skill_invocations_total{skill="review",status="success"} 42
newt_skill_duration_seconds_sum{skill="review"} 12.5
newt_skill_duration_seconds_count{skill="review"} 42
```

### JSON Format
```json
{
  "counters": {
    "newt_skill_invocations_total{skill=\"review\",status=\"success\"}": 42
  },
  "gauges": {
    "newt_adversarial_findings{lens=\"security\",severity=\"high\"}": 3
  },
  "histograms": {
    "newt_skill_duration_seconds{skill=\"review\"}": [0.1, 0.3, 0.2, 0.5]
  }
}
```

## Configuration
```yaml
metrics:
  enabled: true
  prometheus_port: 9090
  retention_seconds: 3600
  ai_adoption_tracking: true
```

## Integration
- LSP: `newt/metrics`, `newt/health`, `newt/getMetrics` requests
- MCP: `newt_metrics` tool
- Prometheus: Scrape `/metrics` endpoint
- Grafana: Dashboards for skill usage, review quality, adoption velocity