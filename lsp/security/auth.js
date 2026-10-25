/**
 * Enterprise Security Layer
 * OAuth2/OIDC authentication + authorization for multi-tenant deployments
 */

class LSPAuthManager {
  constructor(config = {}) {
    this.config = {
      authEnabled: config.authEnabled ?? true,
      oidcIssuer: config.oidcIssuer,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      audience: config.audience,
      jwtSecret: config.jwtSecret || process.env.LSP_JWT_SECRET,
      tokenCache: new Map(),
      rolePermissions: config.rolePermissions || this.defaultRolePermissions(),
      tenantConfigs: config.tenantConfigs || new Map(),
      auditLogger: config.auditLogger || console,
    };
  }

  defaultRolePermissions() {
    return {
      admin: ['read', 'write', 'admin', 'audit', 'config'],
      security: ['read', 'write', 'audit', 'security'],
      developer: ['read', 'write'],
      auditor: ['read', 'audit'],
      viewer: ['read'],
    };
  }

  /**
   * Validate JWT token from OIDC provider or local secret
   */
  async validateToken(token) {
    if (!token) {
      throw new AuthError('Missing authentication token');
    }

    // Check cache first
    const cached = this.config.tokenCache.get(token);
    if (cached && cached.exp > Date.now() / 1000) {
      return cached;
    }

    let payload;
    if (this.config.oidcIssuer) {
      payload = await this.validateOIDCToken(token);
    } else if (this.config.jwtSecret) {
      payload = this.validateLocalJWT(token);
    } else {
      throw new AuthError('No authentication method configured');
    }

    // Enrich with tenant/role
    const enriched = {
      ...payload,
      tenantId: payload.tenant_id || payload.org_id || 'default',
      roles: payload.roles || ['viewer'],
      permissions: this.computePermissions(payload.roles || ['viewer']),
    };

    // Cache for 5 minutes
    this.config.tokenCache.set(token, enriched);
    setTimeout(() => this.config.tokenCache.delete(token), 5 * 60 * 1000);

    this.audit('token_validated', { tenantId: enriched.tenantId, roles: enriched.roles });
    return enriched;
  }

  async validateOIDCToken(_token) {
    // In production: fetch JWKS from issuer, verify signature, check aud/exp
    // Simplified for demo - use a real OIDC library in production
    throw new AuthError('OIDC validation not implemented - use production library');
  }

  validateLocalJWT(token) {
    const [headerB64, payloadB64, signature] = token.split('.');
    if (!headerB64 || !payloadB64 || !signature) {
      throw new AuthError('Invalid JWT format');
    }

    // Verify signature
    const expectedSig = crypto
      .createHmac('sha256', this.config.jwtSecret)
      .update(`${headerB64}.${payloadB64}`)
      .digest('base64url');

    if (signature !== expectedSig) {
      throw new AuthError('Invalid JWT signature');
    }

    let payload;
    try {
      payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());
    } catch {
      throw new AuthError('Invalid JWT payload encoding');
    }

    if (payload.exp && payload.exp < Date.now() / 1000) {
      throw new AuthError('Token expired');
    }

    return payload;
  }

  computePermissions(roles) {
    const perms = new Set();
    for (const role of roles) {
      const rolePerms = this.config.rolePermissions[role] || [];
      for (const p of rolePerms) perms.add(p);
    }
    return Array.from(perms);
  }

  authorize(action, resource, context) {
    const { permissions, tenantId, userId } = context;

    // Check permission
    if (!permissions.includes(action)) {
      this.audit('authorization_denied', { action, resource, userId, tenantId });
      throw new AuthError(`Insufficient permissions for ${action} on ${resource}`);
    }

    // Check tenant isolation
    if (resource.tenantId && resource.tenantId !== tenantId && !permissions.includes('admin')) {
      this.audit('tenant_isolation_violation', { action, resource, userId, tenantId });
      throw new AuthError('Cross-tenant access denied');
    }

    this.audit('authorization_granted', { action, resource, userId, tenantId });
    return true;
  }

  audit(event, details) {
    const entry = {
      timestamp: new Date().toISOString(),
      event,
      ...details,
      correlationId: crypto.randomUUID(),
    };
    this.config.auditLogger.info(JSON.stringify(entry));
    return entry.correlationId;
  }

  /**
   * Register tenant configuration
   */
  registerTenant(tenantId, config) {
    this.config.tenantConfigs.set(tenantId, {
      ...config,
      createdAt: new Date().toISOString(),
    });
  }

  getTenantConfig(tenantId) {
    return this.config.tenantConfigs.get(tenantId);
  }
}

class AuthError extends Error {
  constructor(message, code = 'AUTH_ERROR') {
    super(message);
    this.name = 'AuthError';
    this.code = code;
  }
}

module.exports = { LSPAuthManager, AuthError };