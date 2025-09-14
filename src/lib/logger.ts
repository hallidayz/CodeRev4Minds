// Logger utility for structured logging
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  userId?: string;
  component?: string;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  metadata?: Record<string, any>;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;

  private formatLogEntry(entry: LogEntry): string {
    const baseEntry = {
      level: entry.level,
      message: entry.message,
      timestamp: entry.timestamp,
      ...(entry.userId && { userId: entry.userId }),
      ...(entry.component && { component: entry.component }),
      ...(entry.error && { error: entry.error }),
      ...(entry.metadata && { metadata: entry.metadata })
    };

    return JSON.stringify(baseEntry, null, this.isDevelopment ? 2 : 0);
  }

  private log(level: LogLevel, message: string, error?: Error, metadata?: Record<string, any>, component?: string, userId?: string) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(userId && { userId }),
      ...(component && { component }),
      ...(error && {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack
        }
      }),
      ...(metadata && { metadata })
    };

    const formattedEntry = this.formatLogEntry(entry);

    // In development, use console with colors
    if (this.isDevelopment) {
      switch (level) {
        case LogLevel.ERROR:
          console.error(`🔴 ${formattedEntry}`);
          break;
        case LogLevel.WARN:
          console.warn(`🟡 ${formattedEntry}`);
          break;
        case LogLevel.INFO:
          console.info(`🔵 ${formattedEntry}`);
          break;
        case LogLevel.DEBUG:
          console.debug(`🟢 ${formattedEntry}`);
          break;
      }
    } else {
      // In production, use appropriate console method
      switch (level) {
        case LogLevel.ERROR:
          console.error(formattedEntry);
          break;
        case LogLevel.WARN:
          console.warn(formattedEntry);
          break;
        case LogLevel.INFO:
          console.info(formattedEntry);
          break;
        case LogLevel.DEBUG:
          console.debug(formattedEntry);
          break;
      }
    }

    // In a real application, you would send this to a logging service
    // like Sentry, LogRocket, or your own logging API
    this.sendToLoggingService(entry);
  }

  private async sendToLoggingService(entry: LogEntry) {
    // In a real application, implement actual logging service integration
    // For now, we'll just store in localStorage for demo purposes
    try {
      const logs = JSON.parse(localStorage.getItem('app_logs') || '[]');
      logs.push(entry);
      
      // Keep only last 100 logs to prevent memory issues
      if (logs.length > 100) {
        logs.splice(0, logs.length - 100);
      }
      
      localStorage.setItem('app_logs', JSON.stringify(logs));
    } catch (error) {
      // Silently fail if localStorage is not available
    }
  }

  error(message: string, error?: Error, metadata?: Record<string, any>, component?: string, userId?: string) {
    this.log(LogLevel.ERROR, message, error, metadata, component, userId);
  }

  warn(message: string, metadata?: Record<string, any>, component?: string, userId?: string) {
    this.log(LogLevel.WARN, message, undefined, metadata, component, userId);
  }

  info(message: string, metadata?: Record<string, any>, component?: string, userId?: string) {
    this.log(LogLevel.INFO, message, undefined, metadata, component, userId);
  }

  debug(message: string, metadata?: Record<string, any>, component?: string, userId?: string) {
    this.log(LogLevel.DEBUG, message, undefined, metadata, component, userId);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export hook for React components
export function useLogger(component: string, userId?: string) {
  return {
    error: (message: string, error?: Error, metadata?: Record<string, any>) => 
      logger.error(message, error, metadata, component, userId),
    warn: (message: string, metadata?: Record<string, any>) => 
      logger.warn(message, metadata, component, userId),
    info: (message: string, metadata?: Record<string, any>) => 
      logger.info(message, metadata, component, userId),
    debug: (message: string, metadata?: Record<string, any>) => 
      logger.debug(message, metadata, component, userId)
  };
}
