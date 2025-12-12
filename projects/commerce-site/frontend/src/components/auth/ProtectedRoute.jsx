// src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Ensures the user is logged in before rendering the child route (Outlet).
 * Redirects to /login if not authenticated.
 */
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirects to the login page if the user is not logged in
    return <Navigate to="/login" replace />; 
  }

  // If authenticated, render the nested component (e.g., /admin/dashboard)
  return <Outlet />;
};

export default ProtectedRoute;