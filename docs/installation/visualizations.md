---
title: Newt Installation Visualizations
description: Visual flowcharts and diagrams for installing Newt across all platforms
---

# Newt Installation Visualizations

## 1. Claude Code Installation Flow

```mermaid
flowchart TD
    A[Start: Developer] --> B[Clone Newt: git clone + npm install]
    B --> C[Open Claude Code Command Palette]
    C --> D{Is plugin available?}
    D -->|No| E[Run /plugin marketplace add ./Newt]
    E --> F[/plugin install newt]
    F --> G{Reload plugin?}
    G -->|Yes| H[Reload Window]
    G -->|No| I[Start using /review]
    H --> I

    I --> J[Run /adversarial-review]
    J --> K[Output: Summary + Issues + Security + Architecture + Craftsmanship]
```

---

## 2. Devin AI Installation Flow (MCP)

```mermaid
flowchart TD
    A[Start: Devin Agent] --> B[Clone Newt to workspace: ~/newt + npm install]
    B --> C[Start MCP Server: npm run mcp:server]
    C --> D[MCP Server listens on stdio]
    D --> E[Devin connects via MCP client config]
    E --> F[Devin registers tools: newt_review, newt_pr_review, newt_brainstorm]
    
    F --> G[Developer: Devin, run security review on src/auth]
    G --> H[Newt MCP tool: newt_review returns runbook]
    H --> I[Devin executes review via Newt's agents]
    I --> J[Results returned to Devin]
    J --> K[Devin presents findings]

    K --> L[Developer: Devin, check for secrets before commit]
    L --> M[Newt MCP tool: newt_pr_review]
    M --> N[Devin executes security gate]
    N --> O{Critical found?}
    O -->|Yes| P[Block/Flag for developer]
    O -->|No| Q[Proceed]
```

---

## 3. Codex Installation Flow (CLI)

```mermaid
flowchart TD
    A[Start: OpenAI Codex] --> B[Clone Newt: git clone + npm install]
    B --> C[Verify: node ~/.codex/tools/Newt/scripts/validate-plugin.js]
    C --> D{Validation Pass?}
    D -->|No| E[Fix errors before proceeding]
    D -->|Yes| F[Configure Codex Shell Tool]
    F --> G[Configure ~/.codex/tools/Newt/.newt/config.yml]
    
    G --> H[Developer: Codex, run security audit on auth module]
    H --> I[Codex invokes Newt CLI]
    I --> J[node ~/.codex/tools/Newt/lsp/server.js --help]
    J --> K[Newt analyzes]
    K --> L[Codex returns findings]

    L --> M[Developer: Codex, check for secrets]
    M --> N[Codex invokes security gate]
    N --> O{Secrets found?}
    O -->|Yes| P[Block commit]
    O -->|No| Q[Proceed]
```

---

## 4. Custom Software Factory / Loom Soulf Installation Flow (Enterprise)

```mermaid
flowchart TD
    A[Start: Enterprise Org] --> B[Clone Newt to /opt/newt]
    B --> C[npm install]
    C --> D[Configure tenants: /opt/newt/config/tenants/*.yml]
    D --> E[Deploy MCP Server as systemd service]
    E --> F[systemctl start newt-mcp]
    F --> G[Configure CI/CD: GitHub Actions workflow]
    G --> H[Install CI/CD Security Gate]
    H --> I[Register in Loom Soulf admin]
    I --> J[Configure tenants in Loom Soulf]

    J --> K[Developer runs: /adversarial-review on src]
    K --> L[Newt runs agents via MCP]
    L --> M[Newt logs to /opt/newt/logs/reviews/]
    M --> N[Results returned]

    N --> O[CI/CD runs enterprise-security-gate on PR]
    O --> P{Critical vulns?}
    P -->|Yes| Q[Block PR merge]
    P -->|No| R[Pass gate]

    R --> S[Enterprise compliance reports generated]
    S --> T[Audit trail updated]
```

---

## 5. Newt Agent Architecture (Visual)

```mermaid
flowchart LR
    subgraph Input
        IDE[IDE: VS Code / Windsurf / Cursor / Neo]
        CLI[CLI: Devin / Codex / Shell]
        CI[CI/CD: GitHub / GitLab / Azure]
    end

    subgraph Newt
        MCP[MCP Server<br/>newt_mcp]
        LSP[LSP Server<br/>port 9090]
        Agents[Multi-Agent Engine]
        
        subgraph Agents
            Security[Security Auditor<br/>Uncle Bob + OWASP]
            Arch[Architecture Analyst<br/>GoF Patterns]
            Perf[Performance Analyzer<br/>Clean Code]
            Brain[Brainstorming Agent<br/>Fowler Refactor]
            Comm[PR Communication<br/>Human Interface]
        end
        
        Orchestrator[Adversarial Orchestrator<br/>Fuses findings]
    end

    subgraph Output
        Findings[Findings: Security / Arch / Craftsmanship]
        Reports[Review Reports<br/>logs/reviews/]
        Gates[Security Gates<br/>enterprise-security-gate]
        Dashboards[Metrics<br/>observability]
    end

    IDE --> MCP
    IDE --> LSP
    CLI --> MCP
    CLI --> LSP
    CI --> Gates
    Agents --> Orchestrator
    Orchestrator --> Findings
    Findings --> Reports
    Findings --> Gates
    Agents --> Dashboards
```

---

## 6. Installation Decision Tree

```mermaid
flowchart TD
    A[Which Platform?] --> B{Devin?}
    B -->|Yes| C[MCP Server + Tools]
    B -->|No| D{Codex?}
    
    C --> E[Configure MCP client JSON]
    
    D -->|Yes| F[CLI Shell Tool]
    
    D -->|No| G{Loom Soulf / Custom Software Factory?}
    G -->|Yes| H[Enterprise: systemd + CI/CD + tenants]
    G -->|No| I[Claude Code / Windsurf / Cursor]
    
    E --> J[Run /adversarial-review]
    F --> J
    H --> J
    I --> J
    J --> K[Done: Review configured]
```

---

## ASCII Art Summary

```
┌─────────────────────────────────────────────────────────────────────┐
│                    NEWT INSTALLATION PIPELINE                        │
├─────────────────────────────────────────────────────────────────────┤
│  PLATFORM         │  METHOD              │  TIME  │  KEY STEPS   │
├───────────────────┼─────────────────────┼────────┼─────────────┤
│ Claude Code       │ Marketplace Install │  2min  │ /review     │
│                   │                     │        │ /adversarial│
├───────────────────┼─────────────────────┼────────┼─────────────┤
│ Devin             │ MCP Server           │  3min  │ newt_review │
│                   │                     │        │ newt_pr    │
├───────────────────┼─────────────────────┼────────┼─────────────┤
│ Codex            │ CLI Shell           │  3min  │ npm run     │
│                   │                     │        │ validate    │
├───────────────────┼─────────────────────┼────────┼─────────────┤
│ Loom Soulf / CSF  │ Enterprise Service   │ 30min  │ systemd     │
│                   │                     │        │ + CI/CD     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Visual Installation Checklist

### For Claude Code / Windsurf / Cursor
```
[ ] git clone && npm install
[ ] /plugin marketplace add ./Newt
[ ] /plugin install newt
[ ] /review --path . --depth quick
[ ] /adversarial-review --path . --lens all
```

### For Devin
```
[ ] git clone && npm install
[ ] npm run mcp:server
[ ] Add MCP config to Devin client
[ ] Verify newt_review tool registered
[ ] Run security review
```

### For Codex
```
[ ] git clone && npm install
[ ] node scripts/validate-plugin.js (PASS)
[ ] Configure Codex shell tool
[ ] Run Newt CLI review
[ ] Run security gate
```

### For Enterprise (Loom Soulf)
```
[ ] Clone to /opt/newt
[ ] npm install
[ ] Configure tenants/*.yml
[ ] Deploy systemd service
[ ] Install CI/CD gate
[ ] Register in Loom Soulf
[ ] Run /adversarial-review
[ ] Run enterprise-security-gate
```

---

## Next Steps

- [Installation Index](index.md)
- [Adversarial Review Guide](../adversarial-review.md)
- [Enterprise Security Guide](../enterprise/security.md)
- [Enterprise Rollout Strategy](../enterprise/rollout.md)

---

## Visual Style Guide

These diagrams use Mermaid syntax for GitHub render support and ASCII art for terminal display. Both are intentionally simple — no complex graph state needed.

### Mermaid Support

All diagrams use standard Mermaid flowchart syntax (`flowchart TD`, `flowchart LR`). GitHub renders these natively in Markdown files.

### ASCII Fallback

For terminals or documentation without Mermaid rendering, the ASCII art at the bottom provides a quick summary.

---

## Appendix: Installation Time Estimates

| Platform | Steps | Time | Complexity |
|----------|-------|------|------------|
| Claude Code | 4 | 2 min | Low |
| Devin | 3 | 3 min | Medium |
| Codex | 3 | 3 min | Medium |
| Enterprise | 7 | 30 min | High |

---

## Visual Verification Checklist

Before marking an installation complete, verify:

```
[✓] Plugin/CLI validates without error
[✓] First review runs without error
[✓] Adversarial review runs (if enabled)
[✓] Security gate blocks critical issues (if enterprise)
[✓] Logs written to expected locations
```

---

## Related

- [Installation Guides](index.md)
- [Adversarial Review](../adversarial-review.md)
- [Enterprise Security](../enterprise/security.md)
- [API Reference](../api-reference.md)