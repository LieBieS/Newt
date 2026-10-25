/**
 * Multi-Tenant Configuration Manager
 * Resolves per-tenant configuration with fallback chains for enterprise scale
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class TenantConfigManager {
  constructor(baseConfigPath, options = {}) {
    this.baseConfigPath = baseConfigPath;
    this.configCache = new Map();
    this.cacheTtlMs = options.cacheTtlMs || 60 * 1000;
    this.envOverrides = options.envOverrides || {};
    this.globalConfig = this.loadBaseConfig(baseConfigPath);
  }

  loadBaseConfig(baseConfigPath) {
    try {
      const raw = fs.readFileSync(baseConfigPath, 'utf8');
      return yaml.load(raw);
    } catch (err) {
      return { tenants: {}, defaults: {} };
    }
  }

  /**
   * Resolve tenant-aware configuration with override chain:
   * env vars → tenant config file → team config file → global defaults
   */
  resolve(tenantId, teamId, environment = 'production') {
    const cacheKey = `${tenantId}:${teamId}:${environment}`;
    const cached = this.configCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.config;
    }

    // Start with global defaults
    let config = this.clone(this.globalConfig.defaults || {});

    // Override with tenant-specific config
    const tenantConfig = this.globalConfig.tenants?.[tenantId];
    if (tenantConfig) {
      config = { ...config, ...this.clone(tenantConfig) };
    }

    // Override with team config file
    const teamConfigPath = path.resolve(this.baseConfigPath, `teams/${teamId}.yml`);
    if (fs.existsSync(teamConfigPath)) {
      const teamRaw = fs.readFileSync(teamConfigPath, 'utf8');
      const teamConfig = yaml.load(teamRaw);
      config = { ...config, ...teamConfig };
    }

    // Override with environment
    const envConfigPath = path.resolve(this.baseConfigPath, `environments/${environment}.yml`);
    if (fs.existsSync(envConfigPath)) {
      const envRaw = fs.readFileSync(envConfigPath, 'utf8');
      const envConfig = yaml.load(envRaw);
      config = { ...config, ...envConfig };
    }

    // Apply env var overrides (highest priority)
    config = this.applyEnvOverrides(config, tenantId, environment);

    this.configCache.set(cacheKey, { config, expiresAt: Date.now() + this.cacheTtlMs });
    return config;
  }

  applyEnvOverrides(config, tenantId, environment) {
    for (const [key, value] of Object.entries(this.envOverrides)) {
      if (key.includes(tenantId) || key.includes(environment) || key.startsWith('NEWT_')) {
        this.setNested(config, key.replace(/^NEWT_/, ''), value);
      }
    }
    return config;
  }

  setNested(obj, path, value) {
    const keys = path.toLowerCase().split('_');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  }

  clone(obj) {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch {
      return obj;
    }
  }

  /**
   * Register a new tenant (dynamic registration)
   */
  registerTenant(tenantId, config) {
    if (!this.globalConfig.tenants) this.globalConfig.tenants = {};
    this.globalConfig.tenants[tenantId] = config;
    this.configCache.clear();
  }

  /**
   * Resolve regional endpoint based on tenant config + user location
   */
  resolveRegion(tenantId, userLocation) {
    const tenantConfig = this.globalConfig.tenants?.[tenantId];
    return tenantConfig?.regions?.[userLocation] || tenantConfig?.defaultRegion || 'us-east-1';
  }
}

module.exports = { TenantConfigManager };