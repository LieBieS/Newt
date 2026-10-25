---
title: security-guard
description: OWASP security detection, secret scanning, policy checks, vulnerability assessment, exploit scenario simulation.
kind: automated-skill
triggers:
  - event: security_scan
    filter: "**/*"
  - event: code_commit
    filter: "**/*"
outputs:
  sections:
    - OWASP Mapping
    - Secret Scan Results
    - Policy Violations
    - Vulnerability Findings
    - Exploit Scenarios
    - Remediation Guidance
---

# Security Guard

## Mission
Unified security detection consolidating `detect-sql-injection`, `detect-god-class`, `detect-circular-deps`, `secret-detection`, and OWASP mapping into one deterministic security monitor.

## Operating Procedure
1. **Map** — OWASP Top-10 category mapping per code line
2. **Scan** — Secret scanning, credential exposure
3. **Audit** — Policy violations (license, dependencies, compliance)
4. **Assess** — Vulnerability severity (CVSS-style scoring)
5. **Simulate** — Exploit scenario modeling
6. **Remediate** — Fix guidance and priority ordering

## Consolidated Domains

### OWASP Mapping
- A01:2021 Broken Access Control
- A02:2021 Cryptographic Failures
- A03:2021 Injection
- A04:2021 Insecure Design
- A05:2021 Security Misconfiguration
- A06:2021 Vulnerable and Outdated Components
- A07:2021 Identification and Authentication Failures
- A08:2021 Software and Data Integrity Failures
- A09:2021 Security Logging and Monitoring Failures
- A10:2021 Server-Side Request Forgery

### Secret Detection
- API keys, tokens, credentials
- SSH keys, certificates
- Database credentials
- Cloud provider credentials
- JWT secrets, session tokens
- Third-party service keys

### Policy Violations
- License incompatibilities (GPL vs MIT, etc.)
- Dependency vulnerability (known CVEs)
- Compliance mandates (SOC2, HIPAA, GDPR, PCI-DSS)
- Internal policy (no-external-libs, audit-fields)

### Vulnerability Findings
- CVE lookup against dependencies
- CVSS calculation (base, temporal, environmental)
- Affected component, version, severity
- Public exploit availability

### Exploit Scenarios
- Injection path simulation (SQL, NoSQL, OS)
- Access control bypass attempts
- Privilege escalation chains
- Data exfiltration vectors

### Remediation Guidance
- Immediate fixes (minutes)
- Short-term fixes (days)
- Long-term architectural changes (weeks/months)
- Verification steps

## Output Contract
- **OWASP Mapping** — Category, location, severity, CWE ID
- **Secret Scan Results** — File, line, type, risk_score, remediation
- **Policy Violations** — Policy, violation, component, deadline, owner
- **Vulnerability Findings** — CVE, CVSS, affected_component, exploit_available
- **Exploit Scenarios** — Scenario, likelihood, impact, attack_vector
- **Remediation Guidance** — Priority, effort, steps, verification

## Configuration
```yaml
security_guard:
  enabled: true
  owasp_mapping: true
  secret_scan: true
  policy_audit: true
  vulnerability_db: "local,cve"  # sources
  exploit_simulation: true
  severity_weights:
    critical: 9.0-10.0
    high: 6.0-8.9
    medium: 3.0-5.9
    low: 0.0-2.9
  exclude_patterns: []
  max_files_per_scan: 500
```

## Success Criteria
- OWASP Top-10 coverage
- All secret types detected
- Policy violations documented
- Vulnerabilities scored
- Exploits simulated
- Remediation prioritized
- Output is actionable
- Deterministic for identical codebase
- Completes within 60s for 1000 files