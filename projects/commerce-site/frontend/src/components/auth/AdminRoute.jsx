// src/components/auth/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Ensures the user is logged in AND has the 'admin' role.
 * Redirects to /login if unauthenticated, or / (home) if not an admin.
 */
const AdminRoute = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  // If not logged in, send them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; 
  }

  // If logged in but NOT an admin, send them to the home page (access denied)
  if (!isAdmin) {
    // You could also render a 403 Access Denied component here
    return <Navigate to="/" replace />; 
  }

  // If authenticated AND admin, render the nested component
  return <Outlet />;
};

export default AdminRoute;