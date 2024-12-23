import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Navbar = () => {
  const [user, setUser] = useState(null); // User state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch admin data from Firestore
        const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
        if (adminDoc.exists()) {
          setUser({ name: adminDoc.data().name, email: currentUser.email });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-white text-xl font-bold">Logo</div>

      {/* Navigation Buttons */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-white">{user.name || user.email}</span>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => navigate('/add-item')}
            >
              Add Item
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              onClick={() => navigate('/update-item')}
            >
              Update Item
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
            onClick={handleLoginClick}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
