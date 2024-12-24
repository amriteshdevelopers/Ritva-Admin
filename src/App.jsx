import './App.css';
import AddItem from './components/admin/AddItem';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/NF/Navbar';
import Footer from './components/NF/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext'; // Ensure the correct path to AuthContext
import UpdateItem from './components/admin/UpdateItem';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/add-item"
            element={
              <ProtectedRoute>
                <AddItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-item"
            element={
              <ProtectedRoute>
                <UpdateItem/>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;

