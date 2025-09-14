import { logger } from './logger';

// Enhanced error types
export interface ApiError extends Error {
  code?: string;
  status?: number;
  details?: any;
  timestamp?: string;
}

export interface ValidationError extends Error {
  field?: string;
  value?: any;
  constraint?: string;
}

export interface NetworkError extends Error {
  status?: number;
  url?: string;
  method?: string;
}

// Error factory functions
export function createApiError(
  message: string,
  code?: string,
  status?: number,
  details?: any
): ApiError {
  const error = new Error(message) as ApiError;
  error.name = 'ApiError';
  error.code = code;
  error.status = status;
  error.details = details;
  error.timestamp = new Date().toISOString();
  return error;
}

export function createValidationError(
  message: string,
  field?: string,
  value?: any,
  constraint?: string
): ValidationError {
  const error = new Error(message) as ValidationError;
  error.name = 'ValidationError';
  error.field = field;
  error.value = value;
  error.constraint = constraint;
  return error;
}

export function createNetworkError(
  message: string,
  status?: number,
  url?: string,
  method?: string
): NetworkError {
  const error = new Error(message) as NetworkError;
  error.name = 'NetworkError';
  error.status = status;
  error.url = url;
  error.method = method;
  return error;
}

// Error handler class
export class ErrorHandler {
  private static instance: ErrorHandler;
  private userId?: string;

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  handleError(
    error: Error | ApiError | ValidationError | NetworkError,
    context?: {
      component?: string;
      action?: string;
      metadata?: Record<string, any>;
    }
  ): void {
    const errorContext = {
      component: context?.component || 'Unknown',
      action: context?.action || 'Unknown',
      userId: this.userId,
      ...context?.metadata
    };

    // Log the error
    logger.error(
      error.message,
      error,
      errorContext,
      context?.component,
      this.userId
    );

    // Handle specific error types
    if (error.name === 'ApiError') {
      this.handleApiError(error as ApiError, errorContext);
    } else if (error.name === 'ValidationError') {
      this.handleValidationError(error as ValidationError, errorContext);
    } else if (error.name === 'NetworkError') {
      this.handleNetworkError(error as NetworkError, errorContext);
    } else {
      this.handleGenericError(error, errorContext);
    }
  }

  private handleApiError(error: ApiError, context: any): void {
    // Handle API-specific errors
    if (error.status === 401) {
      // Unauthorized - redirect to login
      this.redirectToLogin();
    } else if (error.status === 403) {
      // Forbidden - show access denied
      this.showAccessDenied();
    } else if (error.status >= 500) {
      // Server error - show generic error message
      this.showServerError();
    } else {
      // Client error - show specific message
      this.showErrorMessage(error.message);
    }
  }

  private handleValidationError(error: ValidationError, context: any): void {
    // Handle validation errors
    this.showValidationError(error.message, error.field);
  }

  private handleNetworkError(error: NetworkError, context: any): void {
    // Handle network errors
    this.showNetworkError();
  }

  private handleGenericError(error: Error, context: any): void {
    // Handle generic errors
    this.showErrorMessage('An unexpected error occurred. Please try again.');
  }

  private redirectToLogin(): void {
    // Clear auth data and redirect to login
    localStorage.removeItem('code_rev_minds_token');
    localStorage.removeItem('code_rev_minds_user');
    window.location.href = '/login';
  }

  private showAccessDenied(): void {
    // Show access denied message
    this.showNotification('Access denied. You don\'t have permission to perform this action.', 'error');
  }

  private showServerError(): void {
    // Show server error message
    this.showNotification('Server error. Please try again later.', 'error');
  }

  private showNetworkError(): void {
    // Show network error message
    this.showNotification('Network error. Please check your connection and try again.', 'error');
  }

  private showValidationError(message: string, field?: string): void {
    // Show validation error message
    const errorMessage = field ? `${field}: ${message}` : message;
    this.showNotification(errorMessage, 'error');
  }

  private showErrorMessage(message: string): void {
    // Show generic error message
    this.showNotification(message, 'error');
  }

  private showNotification(message: string, type: 'error' | 'warning' | 'info' | 'success'): void {
    // In a real application, you would use a proper notification system
    // For now, we'll use a simple alert
    if (type === 'error') {
      alert(`Error: ${message}`);
    } else {
      alert(message);
    }
  }
}

// Export singleton instance
export const errorHandler = ErrorHandler.getInstance();

// Export hook for React components
export function useErrorHandler(component: string) {
  return {
    handleError: (error: Error, action?: string, metadata?: Record<string, any>) => {
      errorHandler.handleError(error, { component, action, metadata });
    }
  };
}
