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
    try {
      const response = await fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      const { user, organization, token } = data;

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

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Signup failed');
      }

      const data = await response.json();
      const { user, organization, token } = data;

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
