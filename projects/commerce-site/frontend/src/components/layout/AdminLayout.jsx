// src/components/layout/AdminLayout.jsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-layout-wrapper">
            <header className="admin-header-bar">
                <h1>Panel de Administracion</h1>
                <nav className="admin-nav-links">
                    <Link to="/admin">Dashboard</Link>
                    <Link to="/admin/products">Gestion Productos</Link>
                    <Link to="/admin/orders">Gestion Pedidos</Link>
                </nav>
                <div className="admin-controls">
                    <span>Hola, {user && user.email ? user.email.split('@')[0] : 'Admin'}</span>
                    <button 
                        onClick={handleLogout} 
                        className="btn btn-logout-admin" 
                    >
                        CERRAR SESION
                    </button>
                </div>
            </header>
            <main className="admin-main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;