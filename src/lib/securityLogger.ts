// Security logging for audit trails and monitoring
interface SecurityLog {
  timestamp: string;
  event: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  details: Record<string, any>;
}

class SecurityLogger {
  private logs: SecurityLog[] = [];

  log(
    event: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    details: Record<string, any>,
    ipAddress?: string,
    userId?: string,
    userAgent?: string
  ) {
    const log: SecurityLog = {
      timestamp: new Date().toISOString(),
      event,
      severity,
      userId,
      ipAddress,
      userAgent,
      details,
    };

    this.logs.push(log);

    // In production, send critical logs to monitoring service
    if (severity === 'critical' || severity === 'high') {
      this.alertOnCritical(log);
    }
  }

  // Log authentication attempts
  logAuthAttempt(email: string, success: boolean, ipAddress: string, userAgent: string) {
    this.log(
      'AUTH_ATTEMPT',
      success ? 'low' : 'medium',
      { email, success },
      ipAddress,
      undefined,
      userAgent
    );
  }

  // Log access control violations
  logAccessDenied(userId: string, resource: string, reason: string, ipAddress: string) {
    this.log(
      'ACCESS_DENIED',
      'high',
      { userId, resource, reason },
      ipAddress,
      userId
    );
  }

  // Log suspicious activity
  logSuspiciousActivity(
    event: string,
    details: Record<string, any>,
    ipAddress: string,
    userId?: string
  ) {
    this.log('SUSPICIOUS_ACTIVITY', 'high', details, ipAddress, userId);
  }

  // Log data access
  logDataAccess(userId: string, dataType: string, ipAddress: string) {
    this.log(
      'DATA_ACCESS',
      'low',
      { userId, dataType },
      ipAddress,
      userId
    );
  }

  private alertOnCritical(log: SecurityLog) {
    // In production: send to security monitoring service
    // Example: send to Sentry, Datadog, or custom security dashboard
    console.error(`[SECURITY ALERT] ${log.severity.toUpperCase()}: ${log.event}`, log);
  }

  getLogs(filter?: { severity?: string; event?: string }): SecurityLog[] {
    if (!filter) return this.logs;

    return this.logs.filter(
      (log) =>
        (!filter.severity || log.severity === filter.severity) &&
        (!filter.event || log.event === filter.event)
    );
  }

  clearLogs() {
    this.logs = [];
  }
}

export const securityLogger = new SecurityLogger();