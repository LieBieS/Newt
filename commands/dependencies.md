---
title: /dependencies
purpose: Supply chain audit: CVEs, licenses, policy compliance, vulnerability assessment.
outputs:
  sections:
    - Dependency Inventory
    - CVE Assessment
    - License Compliance
    - Policy Violations
    - Vulnerability Remediation
---

## Description
Complete dependency security auditing and compliance validation.

## Usage
```bash
# Audit all dependencies
/dependencies audit --all

# Scan for vulnerabilities
/dependencies cves --db local

# Check license compliance
/dependencies licenses --approved [MIT,Apache]

# Validate security policies
/dependencies policy --enforce

# Generate remediation plan
/dependencies remediate --priority high
```

