import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('gt-trading-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('gt-trading-user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - in real implementation, this would call an API
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (email && password.length >= 6) {
        const mockUser = {
          id: '1',
          email: email,
          name: email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          createdAt: new Date().toISOString()
        };
        
        setUser(mockUser);
        localStorage.setItem('gt-trading-user', JSON.stringify(mockUser));
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    // Mock registration
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (name && email && password.length >= 6) {
        const mockUser = {
          id: Math.random().toString(36).substr(2, 9),
          email: email,
          name: name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          createdAt: new Date().toISOString()
        };
        
        setUser(mockUser);
        localStorage.setItem('gt-trading-user', JSON.stringify(mockUser));
        return { success: true };
      } else {
        throw new Error('Please fill all fields correctly');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const forgotPassword = async (email) => {
    // Mock forgot password
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email) {
        // In real implementation, this would send a reset email
        return { success: true, message: 'Password reset link sent to your email' };
      } else {
        throw new Error('Please enter a valid email');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gt-trading-user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    forgotPassword,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};