import { Routes, Route } from 'react-router-dom';
// Import or create placeholder components for all pages
import Home from './pages/Home';
import ProductCatalogPage from './pages/ProductCatalogPage';
import ContactPage from './pages/ContactPage';
import Login from './pages/Login';
import SetPasswordPage from './pages/SetPasswordPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductCRUD from './pages/admin/AdminProductCRUD';
import AdminOrderManagement from './pages/admin/AdminOrderManagement';

// Placeholder Layout/Wrapper components (will be created next)
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

function App() {
  return (
    <Routes>
      {/* 1. Public Routes that use the standard header/footer layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductCatalogPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<Login />} />
        <Route path="set-password" element={<SetPasswordPage />} />
      </Route>

      {/* 2. Protected Admin Routes - Uses AdminRoute */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProductCRUD />} />
        <Route path="orders" element={<AdminOrderManagement />} />
      </Route>
      
      {/* 3. Catch-all for 404 */}
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  );
}

export default App;