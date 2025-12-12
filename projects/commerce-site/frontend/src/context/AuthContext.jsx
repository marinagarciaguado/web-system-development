// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Custom hook for consuming the context
export const useAuth = () => useContext(AuthContext);

// 3. Context Provider Component
export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage to persist login across refreshes
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  // Set the default Authorization header for all API calls
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Login function
  const login = (userData, jwtToken) => {
    // Store user data and token
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', jwtToken);
    
    // Set token for all future API requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Remove token header
    delete axios.defaults.headers.common['Authorization'];
  };

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  const value = {
    user,
    token,
    login,
    logout,
    isAdmin,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};