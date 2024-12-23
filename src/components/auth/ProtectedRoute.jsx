import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return <div>Loading...</div>; // Handle undefined currentUser state gracefully
  }

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
