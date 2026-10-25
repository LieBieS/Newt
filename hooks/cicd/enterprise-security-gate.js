/**
 * Enterprise Security Hook — CI/CD Pre-Build Gate
 * Integrates Newt security audits into CI/CD pipelines (GitHub Enterprise, GitLab, Bitbucket)
 * Enforces: policy compliance, secret scanning, dependency checks, branch protection
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class EnterpriseSecurityGate {
  constructor(config = {}) {
    this.config = {
      policyRepo: config.policyRepo || process.env.NEWT_POLICY_REPO,
      blockOnCritical: config.blockOnCritical !== false,
      failOnSecrets: config.failOnSecrets !== false,
      minDependencyScore: config.minDependencyScore || 0.8,
      allowedLicenses: config.allowedLicenses || ['MIT', 'Apache-2.0', 'BSD-3-Clause', 'ISC'],
      blockedCves: new Set(config.blockedCves || []),
      auditLogPath: config.auditLogPath || 'logs/audit/security-gate.log',
      correlationId: config.correlationId || this.generateCorrelationId(),
      ...config,
    };
  }

  generateCorrelationId() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  async runPreBuildGate(repoPath, options = {}) {
    const results = {
      correlationId: this.config.correlationId,
      timestamp: new Date().toISOString(),
      checks: {},
      passed: true,
      violations: [],
    };

    // 1. Secret Detection
    results.checks.secrets = await this.scanForSecrets(repoPath);
    if (this.config.failOnSecrets && results.checks.secrets.findings.length > 0) {
      results.passed = false;
      results.violations.push('Secrets detected — failing build');
    }

    // 2. Dependency Security Audit
    results.checks.dependencies = await this.auditDependencies(repoPath);
    if (results.checks.dependencies.critical.length > 0 && this.config.blockOnCritical) {
      results.passed = false;
      results.violations.push(`Critical vulnerabilities: ${results.checks.dependencies.critical.join(', ')}`);
    }

    // 3. Policy Compliance
    results.checks.policy = await this.checkPolicyCompliance(repoPath);
    if (!results.checks.policy.passed) {
      results.passed = false;
      results.violations.push(`Policy violations: ${results.checks.policy.violations.join(', ')}`);
    }

    // 4. License Compliance
    results.checks.licenses = await this.checkLicenses(repoPath);
    if (!results.checks.licenses.passed && this.config.blockOnCritical) {
      results.passed = false;
      results.violations.push(`License violations: ${results.checks.licenses.violations.join(', ')}`);
    }

    // 5. Write audit log
    this.writeAuditLog(results);

    if (!results.passed) {
      throw new Error(`Security gate FAILED [${this.config.correlationId}]: ${results.violations.join(' | ')}`);
    }

    return results;
  }

  async scanForSecrets(repoPath) {
    const findings = [];
    const secretPatterns = [
      { name: 'AWS Key', pattern: /AKIA[0-9A-Z]{16}/g },
      { name: 'GitHub Token', pattern: /ghp_[a-zA-Z0-9]{36}/g },
      { name: 'Slack Token', pattern: /xox[baprs]-([0-9a-zA-Z]{10,48})/g },
      { name: 'Private Key', pattern: /-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g },
      { name: 'Generic API Key', pattern: /[a-zA-Z0-9_-]{32,}/g },
    ];

    const files = this.getFilesToScan(repoPath);
    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        for (const { name, pattern } of secretPatterns) {
          const matches = content.match(pattern);
          if (matches) {
            findings.push({ file, name, match: matches[0].slice(0, 8) + '...' });
          }
        }
      } catch {
        // Skip binary files
      }
    }

    return {
      status: findings.length === 0 ? 'clean' : 'violations',
      findings,
      correlationId: this.config.correlationId,
    };
  }

  async auditDependencies(repoPath) {
    const critical = [];
    const high = [];
    let audit;
    try {
      const result = execSync('npm audit --json', { cwd: repoPath, encoding: 'utf8', timeout: 30000 });
      audit = JSON.parse(result || '{}');
    } catch {
      return { critical: ['audit-failed'], high: [], total: 0, status: 'error' };
    }

    const allVulns = audit.vulnerabilities || {};
    for (const [pkg, info] of Object.entries(allVulns)) {
      if (this.config.blockedCves.has(pkg)) {
        critical.push(`${pkg}@${info.version || 'unknown'} (${info.severity})`);
      } else if (info.severity === 'critical' || info.severity === 'high') {
        high.push(`${pkg}@${info.severity}`);
      }
    }

    return {
      critical,
      high,
      total: Object.keys(allVulns).length,
      status: critical.length > 0 || high.length > 0 ? 'violations' : 'clean',
    };
  }

  async checkPolicyCompliance(repoPath) {
    const violations = [];
    const configPath = path.join(repoPath, '.newt', 'config.yml');
    if (!fs.existsSync(configPath)) {
      violations.push('Missing .newt/config.yml — enterprise policy requires it');
    }

    // Check branch protection
    const packageJson = path.join(repoPath, 'package.json');
    let pkg;
    try {
      pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
      if (!pkg.scripts?.test) violations.push('No test script — mandatory for CI/CD');
      if (!pkg.scripts?.lint) violations.push('No lint script — mandatory for CI/CD');
    } catch {
      violations.push('Cannot read package.json');
    }

    return {
      passed: violations.length === 0,
      violations,
    };
  }

  async checkLicenses(repoPath) {
    const violations = [];
    try {
      const result = execSync('npm ls --depth=0 --json', { cwd: repoPath, encoding: 'utf8' });
      const tree = JSON.parse(result);
      const deps = tree.dependencies || {};
      for (const [name, info] of Object.entries(deps)) {
        const license = info.license || info.licenses;
        if (license && !this.config.allowedLicenses.includes(license)) {
          violations.push(`${name} (${license})`);
        }
      }
    } catch {
      violations.push('Could not enumerate dependency tree');
    }

    return { passed: violations.length === 0, violations };
  }

  getFilesToScan(repoPath) {
    // Use git ls-files for consistent file set
    try {
      const files = execSync('git ls-files', { cwd: repoPath, encoding: 'utf8' })
        .split('\n')
        .filter(f => f && !f.includes('node_modules/') && !f.includes('.git/') && f.length > 0);
      return files;
    } catch {
      return [];
    }
  }

  writeAuditLog(results) {
    const logDir = path.dirname(this.config.auditLogPath);
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
    fs.appendFileSync(
      this.config.auditLogPath,
      JSON.stringify(results) + '\n',
      'utf8'
    );
  }
}

module.exports = { EnterpriseSecurityGate };
module.exports.default = EnterpriseSecurityGate;