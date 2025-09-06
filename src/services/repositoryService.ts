import { useAuth } from '@/contexts/AuthContext';

// Types
export interface Repository {
  id: string;
  name: string;
  fullName: string;
  description?: string;
  language: string;
  private: boolean;
  url: string;
  cloneUrl: string;
  defaultBranch: string;
  lastScanAt?: string;
  scanStatus: 'idle' | 'scanning' | 'completed' | 'failed';
  issuesCount: number;
  criticalIssues: number;
  highIssues: number;
  mediumIssues: number;
  lowIssues: number;
  provider: 'github' | 'gitlab' | 'bitbucket';
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScanResult {
  id: string;
  repositoryId: string;
  branch: string;
  commit: string;
  status: 'running' | 'completed' | 'failed';
  issues: Issue[];
  summary: {
    totalIssues: number;
    criticalIssues: number;
    highIssues: number;
    mediumIssues: number;
    lowIssues: number;
    filesScanned: number;
    linesOfCode: number;
  };
  startedAt: string;
  completedAt?: string;
  duration?: number;
}

export interface Issue {
  id: string;
  type: 'security' | 'performance' | 'code-quality' | 'bug' | 'style';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  file: string;
  line: number;
  column?: number;
  rule: string;
  suggestion?: string;
  confidence: number;
  status: 'open' | 'resolved' | 'ignored';
  createdAt: string;
  updatedAt: string;
}

export interface WebhookConfig {
  id: string;
  repositoryId: string;
  url: string;
  events: string[];
  isActive: boolean;
  secret?: string;
  createdAt: string;
}

// Repository Service Class
export class RepositoryService {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || '/api';
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

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Repository Management
  async getRepositories(): Promise<Repository[]> {
    return this.request<Repository[]>('/repositories');
  }

  async getRepository(id: string): Promise<Repository> {
    return this.request<Repository>(`/repositories/${id}`);
  }

  async addRepository(repoData: {
    provider: 'github' | 'gitlab' | 'bitbucket';
    fullName: string;
    accessToken?: string;
  }): Promise<Repository> {
    return this.request<Repository>('/repositories', {
      method: 'POST',
      body: JSON.stringify(repoData),
    });
  }

  async removeRepository(id: string): Promise<void> {
    return this.request<void>(`/repositories/${id}`, {
      method: 'DELETE',
    });
  }

  async updateRepository(id: string, updates: Partial<Repository>): Promise<Repository> {
    return this.request<Repository>(`/repositories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Repository Scanning
  async scanRepository(
    repositoryId: string,
    options: {
      branch?: string;
      commit?: string;
      force?: boolean;
    } = {}
  ): Promise<ScanResult> {
    return this.request<ScanResult>(`/repositories/${repositoryId}/scan`, {
      method: 'POST',
      body: JSON.stringify(options),
    });
  }

  async getScanResults(repositoryId: string, limit = 10): Promise<ScanResult[]> {
    return this.request<ScanResult[]>(`/repositories/${repositoryId}/scans?limit=${limit}`);
  }

  async getScanResult(scanId: string): Promise<ScanResult> {
    return this.request<ScanResult>(`/scans/${scanId}`);
  }

  async cancelScan(scanId: string): Promise<void> {
    return this.request<void>(`/scans/${scanId}/cancel`, {
      method: 'POST',
    });
  }

  // Issue Management
  async getIssues(repositoryId: string, filters?: {
    severity?: string;
    type?: string;
    status?: string;
    file?: string;
  }): Promise<Issue[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    
    const queryString = params.toString();
    const endpoint = `/repositories/${repositoryId}/issues${queryString ? `?${queryString}` : ''}`;
    
    return this.request<Issue[]>(endpoint);
  }

  async updateIssueStatus(issueId: string, status: 'open' | 'resolved' | 'ignored'): Promise<Issue> {
    return this.request<Issue>(`/issues/${issueId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async bulkUpdateIssues(issueIds: string[], status: 'open' | 'resolved' | 'ignored'): Promise<void> {
    return this.request<void>('/issues/bulk-update', {
      method: 'PATCH',
      body: JSON.stringify({ issueIds, status }),
    });
  }

  // Webhook Management
  async getWebhooks(repositoryId: string): Promise<WebhookConfig[]> {
    return this.request<WebhookConfig[]>(`/repositories/${repositoryId}/webhooks`);
  }

  async createWebhook(
    repositoryId: string,
    webhookData: {
      url: string;
      events: string[];
      secret?: string;
    }
  ): Promise<WebhookConfig> {
    return this.request<WebhookConfig>(`/repositories/${repositoryId}/webhooks`, {
      method: 'POST',
      body: JSON.stringify(webhookData),
    });
  }

  async updateWebhook(
    repositoryId: string,
    webhookId: string,
    updates: Partial<WebhookConfig>
  ): Promise<WebhookConfig> {
    return this.request<WebhookConfig>(`/repositories/${repositoryId}/webhooks/${webhookId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteWebhook(repositoryId: string, webhookId: string): Promise<void> {
    return this.request<void>(`/repositories/${repositoryId}/webhooks/${webhookId}`, {
      method: 'DELETE',
    });
  }

  // Provider Integration
  async connectProvider(provider: 'github' | 'gitlab' | 'bitbucket', accessToken: string): Promise<void> {
    return this.request<void>('/integrations/connect', {
      method: 'POST',
      body: JSON.stringify({ provider, accessToken }),
    });
  }

  async disconnectProvider(provider: 'github' | 'gitlab' | 'bitbucket'): Promise<void> {
    return this.request<void>(`/integrations/${provider}/disconnect`, {
      method: 'DELETE',
    });
  }

  async getProviderRepositories(provider: 'github' | 'gitlab' | 'bitbucket'): Promise<Repository[]> {
    return this.request<Repository[]>(`/integrations/${provider}/repositories`);
  }

  // Real-time Updates
  subscribeToRepositoryUpdates(
    repositoryId: string,
    callback: (update: { type: string; data: any }) => void
  ): () => void {
    // WebSocket connection for real-time updates
    const ws = new WebSocket(`${process.env.REACT_APP_WS_URL || 'ws://localhost:8080'}/repositories/${repositoryId}`);
    
    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      callback(update);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }

  // Utility Methods
  async refreshRepositoryData(repositoryId: string): Promise<Repository> {
    return this.request<Repository>(`/repositories/${repositoryId}/refresh`, {
      method: 'POST',
    });
  }

  async getRepositoryStats(repositoryId: string): Promise<{
    totalScans: number;
    lastScanAt: string;
    averageScanDuration: number;
    totalIssues: number;
    resolvedIssues: number;
    openIssues: number;
  }> {
    return this.request(`/repositories/${repositoryId}/stats`);
  }
}

// Export singleton instance
export const repositoryService = new RepositoryService();
