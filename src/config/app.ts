// Application configuration
export const APP_CONFIG = {
  // Application metadata
  name: 'Code Rev Minds',
  description: 'AI-powered code review automation tool',
  version: '1.0.0',
  
  // API configuration
  api: {
    baseUrl: (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api',
    wsUrl: (import.meta as any).env?.VITE_WS_URL || 'ws://localhost:3001',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
  },

  // Feature flags
  features: {
    enableWebSocket: true,
    enableAnalytics: true,
    enableTeamManagement: true,
    enableRepositoryIntegration: true,
  },

  // UI configuration
  ui: {
    theme: 'system', // 'light' | 'dark' | 'system'
    animations: true,
    compactMode: false,
    itemsPerPage: 10,
    enableThemeToggle: true,
  },

  // Brand colors
  colors: {
    // Core Brand Colors
    authorityNavy: '#02295b',
    achievementGold: '#fda700',
    strategicForest: '#2c5f41',
    steelInsight: '#4a5c6a',
    creativeDepth: '#6b4e71',
    executiveBronze: '#8b6914',
    
    // Supporting Palette
    executiveDepth: '#1b3448',
    refinedBronze: '#8b7355',
    successForest: '#4a6741',
    pureFoundation: '#f6f7f9',
    
    // Color Variations
    navy: {
      50: '#f0f4f8',
      100: '#d9e2ec',
      200: '#bcccdc',
      300: '#9fb3c8',
      400: '#829ab1',
      500: '#02295b',
      600: '#021f47',
      700: '#011a3a',
      800: '#01152e',
      900: '#001021',
    },
    gold: {
      50: '#fffdf0',
      100: '#fff9d9',
      200: '#fff2b3',
      300: '#ffeb8c',
      400: '#ffe466',
      500: '#fda700',
      600: '#e69500',
      700: '#cc8300',
      800: '#b37100',
      900: '#995f00',
    },
    forest: {
      50: '#f0f5f2',
      100: '#d9e6dd',
      200: '#b3cdbb',
      300: '#8db499',
      400: '#679b77',
      500: '#2c5f41',
      600: '#264f37',
      700: '#203f2d',
      800: '#1a2f23',
      900: '#141f19',
    },
    steel: {
      50: '#f4f6f7',
      100: '#e3e8ea',
      200: '#c7d1d6',
      300: '#a0b0b8',
      400: '#7a8d97',
      500: '#4a5c6a',
      600: '#3d4b56',
      700: '#333e47',
      800: '#2c343a',
      900: '#262c30',
    },
    creative: {
      50: '#f7f5f8',
      100: '#ede8ed',
      200: '#d9d0db',
      300: '#c1b2c4',
      400: '#a894ac',
      500: '#6b4e71',
      600: '#5a415e',
      700: '#4a354e',
      800: '#3d2c40',
      900: '#332636',
    },
    bronze: {
      50: '#fdf9f0',
      100: '#faf1d9',
      200: '#f4e2b3',
      300: '#ecd08c',
      400: '#e1bc66',
      500: '#8b6914',
      600: '#75570f',
      700: '#5f450c',
      800: '#4a3509',
      900: '#3d2c07',
    },
  },

  // Logging configuration
  logging: {
    level: (import.meta as any).env?.DEV ? 'debug' : 'info',
    enableConsole: true,
    enableLocalStorage: true,
    maxLogs: 100,
  },

  // Performance configuration
  performance: {
    enableLazyLoading: true,
    enableCodeSplitting: true,
    enableMemoization: true,
    bundleSizeWarning: 500000, // 500KB
  },

  // Security configuration
  security: {
    tokenRefreshThreshold: 5 * 60 * 1000, // 5 minutes
    maxLoginAttempts: 5,
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
  },

  // Company logos for testimonials
  companyLogos: [
    'TechFlow',
    'DataSync', 
    'CloudNative',
    'DevOps Pro',
    'CodeFirst'
  ],

  // Default values
  defaults: {
    teamSize: '10-50',
    organizationPlan: 'professional',
    userRole: 'developer',
    repositoryLanguage: 'typescript',
  },

  // Error messages
  messages: {
    errors: {
      networkError: 'Network error. Please check your connection and try again.',
      serverError: 'Server error. Please try again later.',
      unauthorized: 'You are not authorized to perform this action.',
      forbidden: 'Access denied. You don\'t have permission to perform this action.',
      validationError: 'Please check your input and try again.',
      genericError: 'An unexpected error occurred. Please try again.',
    },
    success: {
      loginSuccess: 'Successfully logged in!',
      signupSuccess: 'Account created successfully!',
      profileUpdated: 'Profile updated successfully!',
      repositoryConnected: 'Repository connected successfully!',
      teamMemberInvited: 'Team member invited successfully!',
    },
    info: {
      loading: 'Loading...',
      saving: 'Saving...',
      processing: 'Processing...',
    }
  },

  // API endpoints
  endpoints: {
    auth: {
      login: '/auth/login',
      signup: '/auth/signup',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      verify: '/auth/verify',
    },
    users: {
      profile: '/users/profile',
      invite: '/users/invite',
      list: '/users',
    },
    repositories: {
      list: '/repositories',
      connect: '/repositories/connect',
      scan: '/repositories/scan',
      disconnect: '/repositories/disconnect',
    },
    analytics: {
      dashboard: '/analytics/dashboard',
      trends: '/analytics/trends',
      performance: '/analytics/performance',
    },
    organizations: {
      details: '/organizations/details',
      update: '/organizations/update',
      billing: '/organizations/billing',
    }
  }
} as const;

// Type definitions for configuration
export type AppConfig = typeof APP_CONFIG;
export type FeatureFlags = typeof APP_CONFIG.features;
export type UIConfig = typeof APP_CONFIG.ui;
export type LoggingConfig = typeof APP_CONFIG.logging;
export type PerformanceConfig = typeof APP_CONFIG.performance;
export type SecurityConfig = typeof APP_CONFIG.security;
