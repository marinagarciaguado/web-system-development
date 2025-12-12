// src/components/layout/AdminLayout.jsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// No dependemos de CSS externo para el layout basico

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 40px',
        // Usamos el color oscuro de tu paleta
        backgroundColor: '#263238', // var(--color-text-dark)
        color: '#FAF0E6', // var(--color-background-cream)
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 900,
    };

    const h1Style = {
        margin: 0,
        fontSize: '1.5rem',
        color: '#FFFFFF',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '700',
        textAlign: 'left',
    };

    const navStyle = {
        display: 'flex',
        gap: '25px',
    };

    const linkStyle = {
        color: '#FAF0E6',
        textDecoration: 'none',
        fontWeight: '500',
        fontSize: '0.95rem',
        padding: '5px',
        transition: 'color 0.2s',
    };

    const controlsStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    };

    // Estilos del Boton Logout (minimalista y funcional)
    const logoutBtnStyle = {
        backgroundColor: '#B71C1C', // Rojo Tomate
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        fontWeight: '600',
        textTransform: 'uppercase',
        fontSize: '0.9rem',
        borderRadius: '5px',
        cursor: 'pointer',
    };


    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF0E6' /* var(--color-background-cream) */ }}>
            <header style={headerStyle}>
                <h1 style={h1Style}>Panel de Administracion</h1>
                <nav style={navStyle}>
                    <Link to="/admin" style={linkStyle}>Dashboard</Link>
                    <Link to="/admin/products" style={linkStyle}>Gestion Productos</Link>
                    <Link to="/admin/orders" style={linkStyle}>Gestion Pedidos</Link>
                </nav>
                <div style={controlsStyle}>
                    <span>Hola, {user && user.email ? user.email.split('@')[0] : 'Admin'}</span>
                    <button 
                        onClick={handleLogout} 
                        style={logoutBtnStyle}
                    >
                        CERRAR SESION
                    </button>
                </div>
            </header>
            <main className="admin-main-content">
                {/* El contenido de AdminProductCRUD se renderiza aqui y tiene su propio padding */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;