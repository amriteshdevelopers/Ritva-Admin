import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../components/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state for initial authentication check

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user); // Log user for debugging
      setCurrentUser(user);
      setLoading(false); // Set loading to false after checking auth state
    });

    return unsubscribe; // Cleanup the subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children} {/* Render children only after auth state is resolved */}
    </AuthContext.Provider>
  );
};
