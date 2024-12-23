import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Graceful loading state
  }

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
