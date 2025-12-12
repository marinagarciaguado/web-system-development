// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'; 
import logoImage from '../assets/logoCaponFondoBlanco.jpg'

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar-header">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logoImage} alt="Capon de Galera Logo" className="brand-logo-img" /> 
        </Link>
      </div>

      <nav className="navbar-links">
        <Link to="/">INICIO</Link>
        <Link to="/products">PRODUCTOS</Link> 
        <Link to="/contact">CONTACTO</Link>

        {isAdmin && (
          <Link to="/admin">ADMIN DASHBOARD</Link>
        )}
      </nav>

      <div className="navbar-auth">
        {isAuthenticated ? (
          <>
            <span className="user-greeting">
              Hola, {user && user.email ? user.email.split('@')[0] : 'Usuario'}
            </span>
            <button 
              onClick={handleLogout} 
              className="btn btn-logout"
            >
              CERRAR SESION
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">
            INICIA SESION
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;