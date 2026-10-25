/**
 * New LSP Observability & Metrics Layer
 * OpenTelemetry-compatible metrics, structured logging, health checks
 */

const { performance } = require('perf_hooks');

class Observability {
  constructor(metricsSink = null) {
    this.metricsSink = metricsSink;
    this.metrics = new Map();
    this.logBuffer = [];
    this.startTime = performance.now();
  }

  recordMetric(name, value, attributes = {}) {
    const entry = { name, value, attributes, timestamp: Date.now() };
    if (this.metricsSink) {
      this.metricsSink.record(entry);
    }
    if (!this.metrics.has(name)) this.metrics.set(name, []);
    this.metrics.get(name).push(entry);

    // Keep bounded
    const arr = this.metrics.get(name);
    if (arr.length > 1000) this.metrics.set(name, arr.slice(-1000));
    return entry;
  }

  increment(name, attributes = {}) {
    return this.recordMetric(name, 1, attributes);
  }

  histogram(name, value, attributes = {}) {
    return this.recordMetric(name, value, attributes);
  }

  recordEvent(name, attributes = {}) {
    const entry = { name, attributes, timestamp: Date.now() };
    this.logBuffer.push(entry);
    if (this.logBuffer.length > 1000) this.logBuffer.shift();
    return entry;
  }

  getMetrics() {
    const totals = {};
    for (const [name, entries] of this.metrics) {
      const sum = entries.reduce((a, e) => a + e.value, 0);
      totals[name] = { count: entries.length, sum, avg: sum / Math.max(1, entries.length) };
    }
    return { totals, events: this.logBuffer, uptimeMs: performance.now() - this.startTime };
  }

  getHealth() {
    return {
      status: 'ok',
      version: '1.1.0',
      uptimeMs: performance.now() - this.startTime,
      metrics: this.getMetrics(),
      timestamp: Date.now(),
    };
  }
}

class MetricsRegistry {
  constructor() {
    this.counters = new Map();
    this.gauges = new Map();
    this.histograms = new Map();
  }

  counter(name, labels = {}) {
    const key = this._key(name, labels);
    if (!this.counters.has(key)) this.counters.set(key, 0);
    this.counters.set(key, this.counters.get(key) + 1);
    return this.counters.get(key);
  }

  gauge(name, value, labels = {}) {
    const key = this._key(name, labels);
    this.gauges.set(key, value);
    return value;
  }

  histogram(name, value, labels = {}) {
    const key = this._key(name, labels);
    if (!this.histograms.has(key)) this.histograms.set(key, []);
    const arr = this.histograms.get(key);
    arr.push(value);
    if (arr.length > 1000) arr.shift();
    return value;
  }

  _key(name, labels) {
    const labelStr = Object.entries(labels).sort().map(([k, v]) => `${k}="${v}"`).join(',');
    return labelStr ? `${name}{${labelStr}}` : name;
  }

  toPrometheus() {
    const lines = [];
    for (const [key, value] of this.counters) {
      lines.push(`# TYPE ${key.split('{')[0]} counter`);
      lines.push(`${key} ${value}`);
    }
    for (const [key, value] of this.gauges) {
      lines.push(`# TYPE ${key.split('{')[0]} gauge`);
      lines.push(`${key} ${value}`);
    }
    for (const [key, arr] of this.histograms) {
      const base = key.split('{')[0];
      lines.push(`# TYPE ${base} histogram`);
      const sum = arr.reduce((a, b) => a + b, 0);
      const count = arr.length;
      const avg = sum / count;
      lines.push(`${key}_sum ${sum}`);
      lines.push(`${key}_count ${count}`);
      lines.push(`${key}_avg ${avg}`);
    }
    return lines.join('\n') + '\n';
  }
}

const observability = new Observability();
const metricsRegistry = new MetricsRegistry();

function recordAiAdoption(event, labels = {}) {
  metricsRegistry.counter('newt_ai_adoption_total', { event, ...labels });
}

function recordSkillInvocation(skill, status, durationMs) {
  metricsRegistry.counter('newt_skill_invocations_total', { skill, status });
  metricsRegistry.histogram('newt_skill_duration_seconds', durationMs / 1000, { skill });
}

function recordMcpToolCall(tool, status) {
  metricsRegistry.counter('newt_mcp_tool_calls_total', { tool, status });
}

function recordAdversarialReview(lens, findingsCount, severity) {
  metricsRegistry.counter('newt_adversarial_reviews_total', { lens, severity });
  metricsRegistry.gauge('newt_adversarial_findings', findingsCount, { lens, severity });
}

function recordCommandExecution(command, status, durationMs) {
  metricsRegistry.counter('newt_commands_total', { command, status });
  metricsRegistry.histogram('newt_command_duration_seconds', durationMs / 1000, { command });
}

module.exports = { Observability, MetricsRegistry, observability, metricsRegistry, recordAiAdoption, recordSkillInvocation, recordMcpToolCall, recordAdversarialReview, recordCommandExecution };
module.exports.default = Observability;
