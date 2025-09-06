import { useAuth } from '@/contexts/AuthContext';

// API Configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api';
const WS_BASE_URL = (import.meta as any).env?.VITE_WS_URL || 'ws://localhost:3001';

// Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// API Client Class
export class ApiClient {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = localStorage.getItem('coderev4minds_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle token refresh if needed
      if (response.status === 401) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry the original request with new token
          headers.Authorization = `Bearer ${this.token}`;
          const retryResponse = await fetch(url, {
            ...options,
            headers,
          });
          
          if (!retryResponse.ok) {
            throw await this.handleError(retryResponse);
          }
          
          return retryResponse.json();
        } else {
          // Refresh failed, redirect to login
          this.handleAuthFailure();
          throw new Error('Authentication failed');
        }
      }

      if (!response.ok) {
        throw await this.handleError(response);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  private async handleError(response: Response): Promise<ApiError> {
    try {
      const errorData = await response.json();
      return {
        message: errorData.message || `HTTP ${response.status}`,
        code: errorData.code,
        details: errorData.details,
      };
    } catch {
      return {
        message: `HTTP ${response.status}: ${response.statusText}`,
        code: response.status.toString(),
      };
    }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.token = data.token;
        localStorage.setItem('coderev4minds_token', data.token);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  private handleAuthFailure(): void {
    localStorage.removeItem('coderev4minds_token');
    localStorage.removeItem('coderev4minds_user');
    localStorage.removeItem('coderev4minds_organization');
    window.location.href = '/login';
  }

  // Authentication Endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(userData: any) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async verifyToken() {
    return this.request('/auth/verify');
  }

  async refreshAuthToken() {
    return this.request('/auth/refresh', {
      method: 'POST',
    });
  }

  // User Management Endpoints
  async getProfile() {
    return this.request('/users/profile');
  }

  async updateProfile(userData: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async getTeamMembers() {
    return this.request('/users/team');
  }

  async inviteUser(email: string, role: string) {
    return this.request('/users/invite', {
      method: 'POST',
      body: JSON.stringify({ email, role }),
    });
  }

  async removeTeamMember(userId: string) {
    return this.request(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async updateUserRole(userId: string, role: string) {
    return this.request(`/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  // Repository Endpoints
  async getRepositories() {
    return this.request('/repositories');
  }

  async getRepository(id: string) {
    return this.request(`/repositories/${id}`);
  }

  async addRepository(repoData: any) {
    return this.request('/repositories', {
      method: 'POST',
      body: JSON.stringify(repoData),
    });
  }

  async updateRepository(id: string, updates: any) {
    return this.request(`/repositories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteRepository(id: string) {
    return this.request(`/repositories/${id}`, {
      method: 'DELETE',
    });
  }

  // Scanning Endpoints
  async scanRepository(repositoryId: string, options: any = {}) {
    return this.request(`/repositories/${repositoryId}/scan`, {
      method: 'POST',
      body: JSON.stringify(options),
    });
  }

  async getScanResults(repositoryId: string, limit = 10) {
    return this.request(`/repositories/${repositoryId}/scans?limit=${limit}`);
  }

  async getScanResult(scanId: string) {
    return this.request(`/scans/${scanId}`);
  }

  async cancelScan(scanId: string) {
    return this.request(`/scans/${scanId}/cancel`, {
      method: 'POST',
    });
  }

  // Issue Management Endpoints
  async getIssues(repositoryId: string, filters: any = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value as string);
    });
    
    const queryString = params.toString();
    const endpoint = `/repositories/${repositoryId}/issues${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint);
  }

  async updateIssueStatus(issueId: string, status: string) {
    return this.request(`/issues/${issueId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async bulkUpdateIssues(issueIds: string[], status: string) {
    return this.request('/issues/bulk-update', {
      method: 'PATCH',
      body: JSON.stringify({ issueIds, status }),
    });
  }

  // Integration Endpoints
  async connectProvider(provider: string, accessToken: string) {
    return this.request('/integrations/connect', {
      method: 'POST',
      body: JSON.stringify({ provider, accessToken }),
    });
  }

  async disconnectProvider(provider: string) {
    return this.request(`/integrations/${provider}/disconnect`, {
      method: 'DELETE',
    });
  }

  async getProviderRepositories(provider: string) {
    return this.request(`/integrations/${provider}/repositories`);
  }

  // Webhook Endpoints
  async getWebhooks(repositoryId: string) {
    return this.request(`/repositories/${repositoryId}/webhooks`);
  }

  async createWebhook(repositoryId: string, webhookData: any) {
    return this.request(`/repositories/${repositoryId}/webhooks`, {
      method: 'POST',
      body: JSON.stringify(webhookData),
    });
  }

  async updateWebhook(repositoryId: string, webhookId: string, updates: any) {
    return this.request(`/repositories/${repositoryId}/webhooks/${webhookId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteWebhook(repositoryId: string, webhookId: string) {
    return this.request(`/repositories/${repositoryId}/webhooks/${webhookId}`, {
      method: 'DELETE',
    });
  }

  // Analytics Endpoints
  async getDashboardStats() {
    return this.request('/analytics/dashboard');
  }

  async getRepositoryStats(repositoryId: string) {
    return this.request(`/analytics/repositories/${repositoryId}`);
  }

  async getTeamPerformance() {
    return this.request('/analytics/team-performance');
  }

  async getTrends(timeframe: string = '7d') {
    return this.request(`/analytics/trends?timeframe=${timeframe}`);
  }

  // WebSocket Connection
  connectWebSocket(endpoint: string, onMessage: (data: any) => void): WebSocket {
    const ws = new WebSocket(`${WS_BASE_URL}${endpoint}`);
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      if (this.token) {
        ws.send(JSON.stringify({ type: 'auth', token: this.token }));
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('WebSocket message parse error:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return ws;
  }

  // Utility Methods
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('coderev4minds_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('coderev4minds_token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Custom hook for API calls with error handling
export function useApi() {
  const { logout } = useAuth();

  const handleApiError = (error: any) => {
    console.error('API Error:', error);
    
    if (error.message?.includes('Authentication failed') || error.code === '401') {
      logout();
    }
    
    throw error;
  };

  const apiCall = async <T>(apiFunction: () => Promise<T>): Promise<T> => {
    try {
      return await apiFunction();
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };

  return { apiCall, apiClient };
}
