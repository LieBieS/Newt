---
title: Enterprise Security
description: Security hardening, multi-tenant isolation, and CI/CD security gates for enterprise-scale Newt deployments.
---

# Enterprise Security

## Overview

Newt's enterprise security model covers three layers:

1. **LSP Authentication** — OAuth2/OIDC + JWT with role-based access control (RBAC)
2. **Multi-Tenant Isolation** — Per-tenant configuration, regional routing, cross-tenant access prevention
3. **CI/CD Security Gates** — Pre-build gates with secret scanning, dependency auditing, license compliance

## LSP Authentication — `lsp/security/auth.js`

### Configuration

```yaml
lsp:
  auth:
    enabled: true
    oidcIssuer: https://auth.example.com/realms/enterprise
    clientId: newt-lsp
    audience: newt-api
    jwtSecret: ${LSP_JWT_SECRET}
    rolePermissions:
      admin: [read, write, admin, audit, config]
      security: [read, write, audit, security]
      developer: [read, write]
      auditor: [read, audit]
      viewer: [read]
```

### Usage

The LSP server validates JWT tokens on every connection:
- OIDC providers: JWKS fetch + signature verification
- Local JWT: HMAC-SHA256 signature validation
- Token cache: 5-minute TTL with automatic eviction
- Audit logging: Every token validation and authorization decision logged with correlation ID

### Authorization Model

| Role | Permissions |
|------|-------------|
| admin | read, write, admin, audit, config |
| security | read, write, audit, security |
| developer | read, write |
| auditor | read, audit |
| viewer | read |

Cross-tenant access is denied unless the caller has `admin` permission.

## Multi-Tenant Configuration — `lsp/tenancy/tenant-config.js`

### Resolution Chain

Environment variables → Tenant config → Team config → Environment config → Global defaults

### Example Tenant Registration

```yaml
tenants:
  corp-a:
    defaultRegion: us-east-1
    regions:
      us-east-1: https://newt-us-east-1.example.com
      eu-west-1: https://newt-eu-west-1.example.com
    analysisDepth: comprehensive
    maxConcurrentAnalyses: 10
  corp-b:
    defaultRegion: eu-central-1
    analysisDepth: balanced
```

### Regional Resolution

Tenants resolve endpoints via `tenant-config.js` using `defaultRegion` with fallback to `us-east-1`. Regional overrides in `config/default.yml` under `multi_tenancy.regions`.

## CI/CD Security Gate — `hooks/cicd/enterprise-security-gate.js`

### Gate Checks

| Check | Tool | Severity |
|-------|------|----------|
| Secret scanning | truffleHog / gitleaks | Block on any |
| Dependency audit | npm audit / OSV | Block on critical |
| License compliance | clearly-defined | Block on GPL/AGPL |
| OWASP mapping | Internal mapping | Warn on high |
| Policy enforcement | Config-driven | Block on violation |

### Configuration

```yaml
security:
  gate:
    blockOnCritical: true
    failOnSecrets: true
    minDependencyScore: 0.8
    allowedLicenses: [MIT, Apache-2.0, BSD-3-Clause, ISC]
    blockedCves: []
    auditLogPath: logs/audit/security-gate.log
```

### Audit Trail

All gate decisions written to `logs/audit/security-gate.log` with correlation ID, timestamp, tenant, and decision outcome.

## Skills Referencing This

| Skill | Usage |
|-------|-------|
| security | Runs OWASP mapping, secret scan, policy audit |
| review | Invokes security agent in adversarial chain |
| dependencies | CVE scanning, license compliance |

## Related

- [Adversarial Review](../adversarial-review.md)
- [Enterprise Rollout](rollout.md)
- [LSP Architecture](../../lsp-architecture.md)