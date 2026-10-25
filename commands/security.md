---
title: /security
purpose: Unified security detection (OWASP, secrets, policies, vulnerabilities, exploits).
outputs:
  sections:
    - OWASP Mapping
    - Secret Scan Results
    - Policy Violations
    - Vulnerability Findings
    - Exploit Scenarios
    - Remediation Guidance
---

## Description
Complete security monitoring from OWASP compliance to vulnerability assessment.

## Usage
```bash
# Scan codebase for security issues
/security scan --scope all --severity high

# Check secrets and credentials
/security secrets --detect api_keys,ssh_certs,certs

# Audit policy violations
/security policy --violations all

# Assess vulnerabilities
/security vulnerabilities --cve-db local
```

