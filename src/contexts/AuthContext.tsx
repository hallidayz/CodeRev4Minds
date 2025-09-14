import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'developer' | 'viewer';
  organizationId: string;
  organizationName: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface Organization {
  id: string;
  name: string;
  plan: 'free' | 'professional' | 'enterprise';
  maxUsers: number;
  maxRepositories: number;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  organization: Organization | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  inviteUser: (email: string, role: string) => Promise<void>;
  refreshToken: () => Promise<void>;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  organizationName: string;
  teamSize: string;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    organization: null,
    isAuthenticated: false,
    isLoading: true,
    token: null,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('coderev4minds_token');
        const userData = localStorage.getItem('coderev4minds_user');
        const orgData = localStorage.getItem('coderev4minds_organization');

        if (token && userData && orgData) {
          const user = JSON.parse(userData);
          const organization = JSON.parse(orgData);
          
          // Verify token is still valid
          const isValid = await verifyToken(token);
          if (isValid) {
            setAuthState({
              user,
              organization,
              isAuthenticated: true,
              isLoading: false,
              token,
            });
          } else {
            // Token expired, clear storage
            clearAuthData();
          }
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        clearAuthData();
      }
    };

    initializeAuth();
  }, []);

  const clearAuthData = () => {
    localStorage.removeItem('coderev4minds_token');
    localStorage.removeItem('coderev4minds_user');
    localStorage.removeItem('coderev4minds_organization');
    setAuthState({
      user: null,
      organization: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
    });
  };

  const verifyToken = async (token: string): Promise<boolean> => {
    // For demo purposes, always return true if token exists
    return !!token;
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Mock authentication with test accounts
      const testAccounts = {
        'admin@coderev.com': {
          password: 'admin123',
          user: {
            id: '1',
            email: 'admin@coderev.com',
            name: 'Admin User',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
            role: 'admin' as const,
            organizationId: 'org-1',
            organizationName: 'CodeRev Demo',
            createdAt: '2024-01-01T00:00:00Z',
            lastLoginAt: new Date().toISOString(),
          },
          organization: {
            id: 'org-1',
            name: 'CodeRev Demo',
            plan: 'enterprise' as const,
            maxUsers: 100,
            maxRepositories: 50,
            createdAt: '2024-01-01T00:00:00Z',
          }
        },
        'developer@coderev.com': {
          password: 'dev123',
          user: {
            id: '2',
            email: 'developer@coderev.com',
            name: 'Sarah Developer',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
            role: 'developer' as const,
            organizationId: 'org-1',
            organizationName: 'CodeRev Demo',
            createdAt: '2024-01-15T00:00:00Z',
            lastLoginAt: new Date().toISOString(),
          },
          organization: {
            id: 'org-1',
            name: 'CodeRev Demo',
            plan: 'enterprise' as const,
            maxUsers: 100,
            maxRepositories: 50,
            createdAt: '2024-01-01T00:00:00Z',
          }
        },
        'viewer@coderev.com': {
          password: 'view123',
          user: {
            id: '3',
            email: 'viewer@coderev.com',
            name: 'Mike Viewer',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
            role: 'viewer' as const,
            organizationId: 'org-1',
            organizationName: 'CodeRev Demo',
            createdAt: '2024-02-01T00:00:00Z',
            lastLoginAt: new Date().toISOString(),
          },
          organization: {
            id: 'org-1',
            name: 'CodeRev Demo',
            plan: 'enterprise' as const,
            maxUsers: 100,
            maxRepositories: 50,
            createdAt: '2024-01-01T00:00:00Z',
          }
        }
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const account = testAccounts[email as keyof typeof testAccounts];
      
      if (!account || account.password !== password) {
        throw new Error('Invalid email or password');
      }

      const token = `demo-token-${Date.now()}`;
      const { user, organization } = account;

      // Store in localStorage
      localStorage.setItem('coderev4minds_token', token);
      localStorage.setItem('coderev4minds_user', JSON.stringify(user));
      localStorage.setItem('coderev4minds_organization', JSON.stringify(organization));

      setAuthState({
        user,
        organization,
        isAuthenticated: true,
        isLoading: false,
        token,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const signup = async (userData: SignupData): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create mock user and organization
      const userId = `user-${Date.now()}`;
      const orgId = `org-${Date.now()}`;
      const token = `demo-token-${Date.now()}`;

      const user: User = {
        id: userId,
        email: userData.email,
        name: userData.name,
        avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000) + 1472099645785}?w=32&h=32&fit=crop&crop=face`,
        role: 'developer',
        organizationId: orgId,
        organizationName: userData.organizationName,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      const organization: Organization = {
        id: orgId,
        name: userData.organizationName,
        plan: userData.teamSize === '1-10' ? 'free' : userData.teamSize === '11-50' ? 'professional' : 'enterprise',
        maxUsers: userData.teamSize === '1-10' ? 10 : userData.teamSize === '11-50' ? 50 : 100,
        maxRepositories: userData.teamSize === '1-10' ? 5 : userData.teamSize === '11-50' ? 25 : 50,
        createdAt: new Date().toISOString(),
      };

      // Store in localStorage
      localStorage.setItem('coderev4minds_token', token);
      localStorage.setItem('coderev4minds_user', JSON.stringify(user));
      localStorage.setItem('coderev4minds_organization', JSON.stringify(organization));

      setAuthState({
        user,
        organization,
        isAuthenticated: true,
        isLoading: false,
        token,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    clearAuthData();
  };

  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    try {
      if (!authState.token) throw new Error('Not authenticated');

      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Profile update failed');
      }

      const updatedUser = await response.json();
      
      // Update localStorage and state
      localStorage.setItem('coderev4minds_user', JSON.stringify(updatedUser));
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    } catch (error) {
      throw error;
    }
  };

  const inviteUser = async (email: string, role: string): Promise<void> => {
    try {
      if (!authState.token) throw new Error('Not authenticated');

      const response = await fetch('/api/users/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.token}`,
        },
        body: JSON.stringify({ email, role }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'User invitation failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const refreshToken = async (): Promise<void> => {
    try {
      if (!authState.token) return;

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authState.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        
        localStorage.setItem('coderev4minds_token', token);
        setAuthState(prev => ({ ...prev, token }));
      } else {
        // Token refresh failed, logout user
        logout();
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    updateProfile,
    inviteUser,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
