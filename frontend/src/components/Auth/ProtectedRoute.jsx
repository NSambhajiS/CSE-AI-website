import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token'); // Check if the user is logged in
  return token ? children : <Navigate to="/faculty/login" />;
}

export default ProtectedRoute;