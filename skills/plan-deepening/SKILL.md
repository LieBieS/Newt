## The Skill Set: Comprehensive but Consolidatable

### Current State
- **24+ skills** exist in the repository (24 core skills + 5 agents + 1 LSP server + 1 MCP server)
- **High overlap**: Many skills are redundant (e.g., multiple security checks, multiple hook-related skills)
- **Current structure**: Skills are organized by domain (security, architecture, performance) but lack unified execution framework

### The Problem with 24 Skills
- **Fragmentation**: Skills are scattered across directories with minimal standardization
- **Redundancy**: Multiple skills detect similar issues (e.g., 4 different security-related skills)
- **Poor discoverability**: Users must know exact skill names to find relevant functionality
- **Maintenance burden**: Each skill requires its own test suite and documentation

### The Better Approach: 12 Core Skills with Clear Purpose

| Skill | Purpose | Why It's Better Than Individual Skills |
|-------|---------|----------|
| **1. Adversarial Review** | Multi-agent code review (security + architecture + craftsmanship) | Combines security-auditor, architecture-analyst, performance-analyzer, brainstorming-agent, and pr-communication-agent into one unified workflow |
| **PR Reviewer** | PR diff analysis + commit planning + reviewer assignment | Replaces pr-review, pr-planning, and pr-communication agents |
| **Security Auditor** | OWASP-aligned security scanning with CVE integration | Consolidates security-auditor + secret-detection + dependency-security-check |
| **Architecture Analyst** | Pattern detection + architectural fitness assessment | Consolidates architecture-analyst + constraint-analysis-agent |
| **Performance Analyzer** | Runtime efficiency and bottleneck detection | Consolidates performance-analyzer + live-suggestions |
| **Design Quality** | UX, accessibility, responsive design, visual hierarchy | Consolidates frontend-design-agent, responsive-check, accessibility-audit, component-review |
| **PR Planner** | PR splitting, commit planning, dependency mapping | Merges pr-planning-agent, pr-review-agent, pr-splitting |
| **Security Auditor** | Security scanning, vulnerability detection, exploit scenarios | Consolidates security-auditor + secret-detection + dependency-security-check |
| **Architecture Analyst** | Pattern detection, layer violations, coupling analysis | Consolidates architecture-analyst + detect-circular-deps + detect-god-class |
| **Performance Analyzer** | Runtime efficiency, algorithmic complexity, resource usage | Consolidates performance-analyzer + live-suggestions |
| **PR Communication** | PR description, review comments, stakeholder messaging | Consolidates pr-communication-agent + review-orchestrator outputs |
| **Skill Container** | Executable skills framework with dependency injection and metrics | New infrastructure for all skills to be executable |

### Why 12 Skills Is Optimal

1. **Manageable Complexity**: 12 skills are easier to maintain, test, and document than 24
2. **Clear Boundaries**: Each skill has a single responsibility
3. **Better Integration**: Agents can be composed through the adversarial-review-orchestrator
4. **Better Documentation**: Each skill has a clear purpose and output contract
4. **Better UX**: Users can learn one skill at a time instead of 24

### Why This Makes Sense for Enterprise Scale

1. **Governance**: Clear ownership of each skill area
2. **Scalability**: New skills can be added as submodules without breaking existing architecture
3. **Observability**: Metrics and logging can be standardized across all skills
4. **Error Handling**: Consistent error handling across all skills
5. **Extensibility**: The skill-container.js architecture allows new skills to be added without disrupting existing ones

### Why Not Fewer Than 12?

- **Too few** would lose specialization (e.g., no dedicated security agent)
- **Too few** would force monolithic implementations that violate separation of concerns
- **12 is the sweet spot** where we maintain specialization while eliminating redundancy

### The 12-Skill Ecosystem

1. **adversarial-review** - Master coordinator (already exists)
2. **pr-reviewer** - PR planning, splitting, and review (new)
3. **support-triage** - Customer support → code task conversion (new)
3. **security-guard** - Security scanning + compliance (replaces security-auditor + secret-detection)
4. **architecture-analyst** - Pattern detection + architectural fitness (existing)
5. **performance-analyzer** - Runtime efficiency analysis (existing)
6. **design-quality** - UI/UX, accessibility, responsive behavior (merged from 5 skills)
7. **pr-planning** - PR splitting, commit planning, dependency mapping (merged from pr-planning + pr-review)
8. **security-auditor** - Security scanning and vulnerability detection (existing)
9. **performance-analyzer** - Runtime efficiency and resource analysis (existing)
9. **design-quality** - UX, accessibility, component quality (existing)
10. **dependency-audit** - Dependency security and version management (existing)
10. **skill-container** - Executable skills framework (new infrastructure)
11. **review-orchestrator** - Master coordinator (existing)
12. **pr-communication** - PR description and stakeholder messaging (existing)

---

## Final Recommendation

**Do consolidate to 12 skills** - it's the right balance of specialization and maintainability. The current 24+ skills are overly fragmented and would require significant engineering effort to maintain properly. The 12-skill framework provides:

- Clear ownership per skill
- Better integration with the existing LSP and agent architecture
- Better documentation and onboarding for new team members
- Better alignment with enterprise governance requirements

The current 24+ skills can be consolidated without losing functionality - in fact, the existing adversarial-review-orchestrator already provides the coordination layer needed for this consolidation.

**Recommendation**: Proceed with consolidating to 12 skills as outlined above, starting with the PR review and support-triage skills since those directly address the user's request.