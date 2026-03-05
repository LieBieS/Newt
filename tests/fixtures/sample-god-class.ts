// Test fixture: God class example for skill validation
export class UserManagementService {
  private users: Map<string, User> = new Map();
  private sessions: Map<string, Session> = new Map();
  private permissions: Map<string, Permission[]> = new Map();
  private auditLogs: AuditLog[] = [];
  private emailQueue: Email[] = [];
  private notificationSettings: Map<string, NotificationPreference> = new Map();
  
  // User CRUD operations
  createUser(userData: UserData): User { /* ... */ }
  updateUser(userId: string, updates: Partial<UserData>): User { /* ... */ }
  deleteUser(userId: string): void { /* ... */ }
  getUser(userId: string): User | null { /* ... */ }
  listUsers(filters: UserFilter): User[] { /* ... */ }
  
  // Authentication
  login(username: string, password: string): Session { /* ... */ }
  logout(sessionId: string): void { /* ... */ }
  validateSession(sessionId: string): boolean { /* ... */ }
  refreshToken(sessionId: string): string { /* ... */ }
  
  // Authorization
  checkPermission(userId: string, resource: string, action: string): boolean { /* ... */ }
  grantPermission(userId: string, permission: Permission): void { /* ... */ }
  revokePermission(userId: string, permissionId: string): void { /* ... */ }
  
  // Audit logging
  logAction(userId: string, action: string, details: any): void { /* ... */ }
  getAuditLogs(userId: string, dateRange: DateRange): AuditLog[] { /* ... */ }
  
  // Email notifications
  sendWelcomeEmail(userId: string): void { /* ... */ }
  sendPasswordResetEmail(userId: string): void { /* ... */ }
  queueEmail(email: Email): void { /* ... */ }
  processEmailQueue(): void { /* ... */ }
  
  // Notification preferences
  updateNotificationSettings(userId: string, settings: NotificationPreference): void { /* ... */ }
  getNotificationSettings(userId: string): NotificationPreference { /* ... */ }
  
  // Password management
  hashPassword(password: string): string { /* ... */ }
  verifyPassword(password: string, hash: string): boolean { /* ... */ }
  generatePasswordResetToken(userId: string): string { /* ... */ }
  resetPassword(token: string, newPassword: string): void { /* ... */ }
  
  // Session cleanup
  cleanupExpiredSessions(): void { /* ... */ }
  
  // User statistics
  getUserStats(userId: string): UserStats { /* ... */ }
  getActiveUserCount(): number { /* ... */ }
}

// This class violates single responsibility principle by handling:
// - User management
// - Authentication
// - Authorization
// - Audit logging
// - Email notifications
// - Password management
// - Session management
// Total: 500+ lines, 30+ public methods
