import { lazy, ComponentType, memo } from 'react';
import { APP_CONFIG } from '@/config/app';

// Lazy loading utility
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) {
  const LazyComponent = lazy(importFunc);
  
  if (fallback) {
    LazyComponent.displayName = `Lazy(${LazyComponent.displayName || 'Component'})`;
    return LazyComponent;
  }

  // Default loading fallback
  const DefaultFallback = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );

  return LazyComponent;
}

// Memoization utility with custom comparison
export function createMemoizedComponent<T extends ComponentType<any>>(
  Component: T,
  areEqual?: (prevProps: any, nextProps: any) => boolean
): T {
  const MemoizedComponent = memo(Component, areEqual) as T;
  MemoizedComponent.displayName = `Memo(${Component.displayName || Component.name})`;
  return MemoizedComponent;
}

// Performance monitoring utility
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTiming(label: string): void {
    this.metrics.set(label, performance.now());
  }

  endTiming(label: string): number {
    const startTime = this.metrics.get(label);
    if (!startTime) {
      console.warn(`No start time found for label: ${label}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.metrics.delete(label);
    
    // Log slow operations
    if (duration > 100) { // 100ms threshold
      console.warn(`Slow operation detected: ${label} took ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  measureAsync<T>(
    label: string,
    asyncFn: () => Promise<T>
  ): Promise<T> {
    this.startTiming(label);
    return asyncFn().finally(() => {
      this.endTiming(label);
    });
  }

  measureSync<T>(
    label: string,
    syncFn: () => T
  ): T {
    this.startTiming(label);
    try {
      return syncFn();
    } finally {
      this.endTiming(label);
    }
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// Bundle size monitoring
export function checkBundleSize(): void {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      
      console.info('Performance Metrics:', {
        loadTime: `${loadTime.toFixed(2)}ms`,
        domContentLoaded: `${domContentLoaded.toFixed(2)}ms`,
        bundleSizeWarning: APP_CONFIG.performance.bundleSizeWarning
      });

      // Warn about slow loading
      if (loadTime > 3000) {
        console.warn('Slow page load detected. Consider optimizing bundle size.');
      }
    }
  }
}

// Memory usage monitoring
export function checkMemoryUsage(): void {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    const memory = (performance as any).memory;
    const usedMB = memory.usedJSHeapSize / 1024 / 1024;
    const totalMB = memory.totalJSHeapSize / 1024 / 1024;
    
    console.info('Memory Usage:', {
      used: `${usedMB.toFixed(2)}MB`,
      total: `${totalMB.toFixed(2)}MB`,
      limit: `${memory.jsHeapSizeLimit / 1024 / 1024}MB`
    });

    // Warn about high memory usage
    if (usedMB > 100) {
      console.warn('High memory usage detected. Consider optimizing components.');
    }
  }
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
