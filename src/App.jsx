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
import Orders from './components/admin/Orders';
import AdminProfileOrder from './components/admin/AdminProfileOrder';
import Iteminfo from './components/admin/Iteminfo';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/iteminfo/:id" element={<Iteminfo />} />
          <Route path="/orders" element={<Orders/>} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-details/:orderId"
            element={
              <ProtectedRoute>
                <AdminProfileOrder/>
              </ProtectedRoute>
            }
          />
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

