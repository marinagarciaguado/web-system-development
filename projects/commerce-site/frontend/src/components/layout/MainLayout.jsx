// src/components/layout/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar'; // Assuming your Navbar.jsx is ready
import Footer from '../Footer'; // We'll create this next

const MainLayout = () => {
  return (
    <>
      {/* The Navbar will be visible on all pages using MainLayout */}
      <Navbar /> 
      
      {/* The Outlet renders the current page component (Home, Products, etc.) */}
      <main>
        <Outlet />
      </main>

      {/* Footer component */}
      <Footer />
    </>
  );
};

export default MainLayout;