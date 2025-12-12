import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
// La clase app-container se usa para asegurar que el footer este abajo del todo

const MainLayout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        {/* Outlet renderiza el contenido de la ruta actual (Home, Products, Contact...) */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;