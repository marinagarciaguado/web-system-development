// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductCatalogPage from './pages/ProductCatalogPage';
import ContactPage from './pages/ContactPage';
import Login from './pages/Login';
import SetPasswordPage from './pages/SetPasswordPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductCRUD from './pages/admin/AdminProductCRUD';
import AdminOrderManagement from './pages/admin/AdminOrderManagement';
import AdminUserManagement from './pages/admin/AdminUserManagement';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout'; // <-- Nuevo Import
import ProtectedRoute from './components/auth/ProtectedRoute'; // No usado en este ejemplo, pero lo dejamos
import AdminRoute from './components/auth/AdminRoute';

function App() {
    return (
        <Routes>
            {/* 1. Rutas Publicas (Usan Navbar/Footer) */}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<ProductCatalogPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="login" element={<Login />} />
                <Route path="set-password" element={<SetPasswordPage />} />
            </Route>

            {/* 2. Rutas de Administración (Usan AdminLayout y AdminRoute) */}
            <Route path="/admin" element={<AdminRoute />}> 
                <Route element={<AdminLayout />}> 
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProductCRUD />} />
                    <Route path="orders" element={<AdminOrderManagement />} />
                    <Route path="users" element={<AdminUserManagement />} /> {/* <-- NUEVA RUTA */}
                </Route>
            </Route>
            
            {/* 3. Catch-all for 404 */}
            <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
    );
}

export default App;