/**
 * Real Agent Registry for Newt LSP
 * Phase 2 integration: wires actual agent analysis functions into the LSP
 */

const securityAuditor = require('../../agents/security-auditor');
const architectureAnalyst = require('../../agents/architecture-analyst');
const performanceAnalyzer = require('../../agents/performance-analyzer');

class RealAgentRegistry {
  constructor(agents = {}) {
    this.agents = agents;
    this.securityAuditorFn = agents.securityAuditor || securityAuditor;
    this.architectureAnalystFn = agents.architectureAnalyst || architectureAnalyst;
    this.performanceAnalyzerFn = agents.performanceAnalyzer || performanceAnalyzer;
  }

  /**
   * Register real agent implementations
   */
  register(agents) {
    if (agents.securityAuditor) this.securityAuditorFn = agents.securityAuditor;
    if (agents.architectureAnalyst) this.architectureAnalystFn = agents.architectureAnalyst;
    if (agents.performanceAnalyzer) this.performanceAnalyzerFn = agents.performanceAnalyzer;
    this.agents = agents;
  }

  async analyzeSecurityAndArchitecture(uri, content, options) {
    // In Phase 2, we would call real agent methods
    // For now, return structured results ready for diagnostics
    const securityResults = await this.securityAuditorFn.analyze({ content, context: { uri } });
    const architectureResults = await this.architectureAnalystFn.analyze({ content, context: { uri } });
    const performance = depth === 'comprehensive'
      ? await this.performanceAnalyzerFn.analyze({ content, context: { uri } })
      : null;

    return {
      security: securityResults.findings || [],
      architecture: architectureResults.findings || [],
      performance: performance,
    };
  }

  async runFullReview(uri, content, depth) {
    const security = await this.securityAuditorFn.analyze({ content, context: { uri } });
    const architecture = await this.architectureAnalystFn.analyze({ content, context: { uri } });
    const performance = depth === 'comprehensive'
      ? await this.performanceAnalyzerFn.analyze({ content, context: { uri } })
      : null;

    return { security, architecture, performance };
  }

  async analyzeSecurityAndArchitecture(uri, content, options) {
    const security = await this.securityAuditorFn.analyze({ content, context: { uri } });
    const architecture = await this.architectureAnalystFn.analyze({ content, context: { uri } });
    const performance = depth === 'comprehensive'
      ? await this.performanceAnalyzerFn.analyze({ content, context: { uri } })
      : null;
    return { security, architecture, performance };
  }
}

class AgentError extends Error {
  constructor(message, agent, context) {
    super(`Agent ${agent} failed: ${message}`);
    this.agent = agent;
    this.context = context;
  }
}
module.exports = { RealAgentRegistry, AgentError };