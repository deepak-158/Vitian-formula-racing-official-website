import React, { createContext, useContext, useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

interface User {
  id: string;
  email: string;
  full_name?: string;
  user_metadata?: any;
  app_metadata?: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  signup: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  isAdmin: false,
});

// Netlify Identity implementation with invite-only access
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Initialize Netlify Identity
    netlifyIdentity.init({
      APIUrl: process.env.REACT_APP_NETLIFY_SITE_URL ? 
        `${process.env.REACT_APP_NETLIFY_SITE_URL}/.netlify/identity` : 
        `${window.location.origin}/.netlify/identity`
    });

    // Check if user is already logged in
    const currentUser = netlifyIdentity.currentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
      setIsAdmin(checkAdminAccess(currentUser));
    }

    // Listen for auth state changes
    netlifyIdentity.on('login', (user) => {
      console.log('User logged in:', user);
      setUser(user);
      setIsAuthenticated(true);
      setIsAdmin(checkAdminAccess(user));
      netlifyIdentity.close(); // Close the modal
    });

    netlifyIdentity.on('logout', () => {
      console.log('User logged out');
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    });

    netlifyIdentity.on('error', (error) => {
      console.error('Netlify Identity error:', error);
    });

    // Cleanup
    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
      netlifyIdentity.off('error');
    };
  }, []);

  // Check if user has admin access
  const checkAdminAccess = (user: any): boolean => {
    if (!user) return false;
    
    // Check app_metadata for admin role (set by Netlify admin)
    const roles = user.app_metadata?.roles || [];
    if (roles.includes('admin')) return true;
    
    // Check user_metadata for admin flag
    if (user.user_metadata?.admin === true) return true;
    
    // Check if user is in allowed admin emails list
    const adminEmails = process.env.REACT_APP_ADMIN_EMAILS?.split(',') || [];
    if (adminEmails.includes(user.email)) return true;
    
    return false;
  };

  const login = () => {
    netlifyIdentity.open('login');
  };

  const signup = () => {
    netlifyIdentity.open('signup');
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
