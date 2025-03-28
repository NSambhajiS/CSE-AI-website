import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token'); // Check if the user is logged in
  const location = useLocation(); // Get the current route

  if (!token) {
    // Check if the route is admin-related or faculty-related
    if (location.pathname.startsWith('/admin')) {
      return <Navigate to="/admin/login" />;
    }
    return <Navigate to="/faculty/login" />;
  }

  return children;
}

export default ProtectedRoute;