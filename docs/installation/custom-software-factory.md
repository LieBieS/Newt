---
title: Newt for Custom Software Factory / Loom Soulf
description: Enterprise deployment for Custom Software Factory and Loom Soulf environments
---

# Newt for Custom Software Factory / Loom Soulf

## Quick Install

Production-grade deployment with containerized LSP and MCP servers.

### 1. Prerequisites

- Docker 24+ / Podman 4+
- Kubernetes 1.28+ or Docker Compose
- PostgreSQL 15+ (for audit logs)
- Redis 7+ (for caching)
- HashiCorp Vault or AWS Secrets Manager (for secrets)

### 2. Build Images

```bash
# Build LSP server image
docker build -f Dockerfile.lsp -t newt-lsp:latest .

# Build MCP server image
docker build -f Dockerfile.mcp -t newt-mcp:latest .
```

### 3. Deploy with Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  newt-lsp:
    image: newt-lsp:latest
    ports:
      - "8080:8080"
    environment:
      - LSP_JWT_SECRET=${LSP_JWT_SECRET}
      - CONFIG_PATH=/config/default.yml
    volumes:
      - ./config:/config
      - ./logs:/logs

  newt-mcp:
    image: newt-mcp:latest
    environment:
      - PLUGIN_ROOT=/workspace
    volumes:
      - .:/workspace

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=newt_audit
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### 4. Configure Enterprise Features

```bash
# Copy and customize config
cp config/default.yml /etc/newt/config.yml

# Key enterprise settings:
# - multi_tenancy.enabled: true
# - security.gate.blockOnCritical: true
# - security.auth.enabled: true
# - adversarial.enabled: true
```

### 5. Validate Deployment

```bash
# Health check
curl -X POST http://localhost:8080/newt/health

# Metrics endpoint
curl -X POST http://localhost:8080/newt/metrics

# Run adversarial review via LSP
echo '{"method":"newt/metrics"}' | nc localhost 8080
```

---

## Enterprise Features Enabled

| Feature | Component | Config |
|---------|-----------|--------|
| Multi-tenancy | `lsp/tenancy/tenant-config.js` | `multi_tenancy.enabled: true` |
| RBAC + OAuth2/OIDC | `lsp/security/auth.js` | `security.auth.enabled: true` |
| CI/CD Security Gate | `hooks/cicd/enterprise-security-gate.js` | `security.gate.blockOnCritical: true` |
| Metrics + AI Adoption | `lsp/metrics/observability.js` | `metrics.ai_adoption_tracking: true` |
| Adversarial Review | `agents/adversarial-review-orchestrator.md` | `adversarial.enabled: true` |

---

## 12-Skill Framework (Canonical)

| Skill | Purpose |
|-------|---------|
| `review` | Adversarial review orchestrator |
| `security` | OWASP, secrets, policies, vulnerabilities |
| `design` | UI/UX/accessibility audit |
| `hooks` | Git/IDE/CI hook lifecycle |
| `planning` | Ideation → PERT pipeline |
| `pr` | PR lifecycle (analyze, split, plan, review, communicate) |
| `architecture` | GoF patterns + DB analyst |
| `brand` | Brand strategy + collateral |
| `voice` | Voice onboarding (all harnesses) |
| `triage` | Support ticket → code task |
| `suggest` | Real-time IDE suggestions |
| `dependencies` | Supply chain audit (CVEs, licenses) |

---

## Integration Points

| System | Integration Method |
|--------|-------------------|
| GitLab CI | `hooks/cicd/enterprise-security-gate.js` in pipeline |
| GitHub Actions | `enterprise-security-gate` action |
| Jenkins | Shell step invoking `/security --scope all` |
| Jira | `/triage` creates issues via REST API |
| Slack | Webhook notifications from `/review` output |
| Prometheus/Grafana | Scrape `newt/metrics` LSP endpoint |
| HashiCorp Vault | JWT secret injection at deploy |

---

## Compliance

| Standard | Newt Coverage |
|----------|---------------|
| SOC2 Type II | Audit logs, RBAC, encryption at rest |
| GDPR | Data minimization, right to erasure via config |
| HIPAA | PHI detection in security scan, audit trails |
| PCI-DSS | Secret scanning, dependency audit, access control |

---

## Scaling

### Horizontal Scaling

```yaml
# Kubernetes HPA for LSP
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: newt-lsp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: newt-lsp
  minReplicas: 3
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### Regional Deployment

```yaml
# config/default.yml
multi_tenancy:
  enabled: true
  defaultRegion: us-east-1
  regions:
    us-east-1: https://newt-us-east-1.example.com
    eu-west-1: https://newt-eu-west-1.example.com
    ap-southeast-1: https://newt-ap-southeast-1.example.com
```

---

## Monitoring

### Key Dashboards

1. **AI Adoption Velocity** — `newt_ai_adoption_total` by team/tenant
2. **Review Quality** — `newt_adversarial_findings` by severity
3. **Skill Utilization** — `newt_skill_invocations_total` by skill
4. **System Health** — `newt_uptime_seconds`, `newt_active_sessions`
5. **Security Posture** — `newt_mcp_tool_calls_total{tool="newt_security"}`


---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| LSP connection timeout | Increase `orchestration.timeout_seconds` |
| Multi-tenant config not loading | Check `multi_tenancy.resolveEnvironmentOverrides: true` |
| MCP tools not visible | Restart MCP server after config changes |
| Metrics not scraping | Verify `metrics.enabled: true` and port 9090 open |

---

## Next Steps

- Read [Enterprise Security Guide](../enterprise/security.md)
- Read [Enterprise Rollout Strategy](../enterprise/rollout.md)
- Explore [Commands Reference](../commands-reference.md)
- Configure [Adversarial Review](../adversarial-review.md)