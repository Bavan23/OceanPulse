import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'citizen' | 'admin';
  avatar?: string;
  organization?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: 'citizen' | 'admin') => Promise<void>;
  oauthLogin: (user: User) => void;
  signup: (email: string, password: string, name: string, role: 'citizen' | 'admin') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const storedUser = localStorage.getItem('oceanpulse_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('oceanpulse_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'citizen' | 'admin'): Promise<void> => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };

      setUser(mockUser);
      localStorage.setItem('oceanpulse_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const oauthLogin = (user: User): void => {
    setUser(user);
    localStorage.setItem('oceanpulse_user', JSON.stringify(user));
  };

  const signup = async (email: string, password: string, name: string, role: 'citizen' | 'admin'): Promise<void> => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };

      setUser(mockUser);
      localStorage.setItem('oceanpulse_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('oceanpulse_user');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    oauthLogin,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
