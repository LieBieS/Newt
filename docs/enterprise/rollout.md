---
title: Enterprise Rollout
description: Phased rollout strategy for deploying Newt at enterprise global scale.
---

# Enterprise Rollout Strategy

## Overview

4-phase rollout for deploying Newt across a global enterprise organization.

## Phase 1 — Foundation (Weeks 1-4)

### Objectives
- Complete LSP Phase 2 (real agent integration)
- Deploy authentication layer (OAuth2/OIDC + JWT)
- Enable structured audit logging
- Containerize MCP server

### Deliverables
- `lsp/agents/real-agent-registry.js` — Real agents wired into LSP
- `lsp/security/auth.js` — Authentication + RBAC
- `lsp/metrics/observability.js` — Metrics + health checks
- Containerized MCP server for deployment

### Success Criteria
- LSP diagnostics appear in editor within 2 seconds
- All agent invocations logged with correlation IDs
- MCP server starts without errors in container

---

## Phase 2 — Multi-Tenancy (Weeks 5-8)

### Objectives
- Tenant-aware configuration resolution
- Regional endpoint routing
- Metrics dashboards
- Circuit breakers for agent invocations

### Deliverables
- `lsp/tenancy/tenant-config.js` — Tenant config manager
- Regional routing configuration
- Observability dashboards
- Circuit breaker configuration in `config/default.yml`

### Success Criteria
- Tenant configs resolve correctly via override chain
- Regional endpoints route users to correct region
- Metrics endpoint returns structured data

---

## Phase 3 — CI/CD Pipeline (Weeks 9-12)

### Objectives
- Deploy enterprise security gate to CI/CD
- Hook framework with audit logging
- SAST/DAST pipeline integration
- SOC2/GDPR automation

### Deliverables
- `hooks/cicd/enterprise-security-gate.js` — Pre-build security gate
- Secret scanning, dependency audit, license compliance
- Policy compliance enforcement
- Compliance report generation

### Success Criteria
- CI pipeline blocks builds on critical violations
- Secret detection prevents credential leaks
- License compliance enforced across all dependencies

---

## Phase 4 — Global Scale (Weeks 13-16)

### Objectives
- Multi-region deployment
- Distributed caching
- Incremental AST analysis
- AI adoption metrics dashboard

### Deliverables
- Multi-region LSP deployment
- Distributed cache layer
- Incremental analysis engine
- Prometheus/Grafana dashboards for AI adoption velocity

### Success Criteria
- Sub-second LSP response at scale
- 99.9% uptime SLA
- AI adoption tracked per team/tenant

## Related

- [Enterprise Security](security.md)
- [Adversarial Review](../../adversarial-review.md)
- [LSP Architecture](../../lsp-architecture.md)