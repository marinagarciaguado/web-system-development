// src/pages/ProductCatalogPage.jsx
import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api'; 
import ProductCard from '../components/ProductCard';

const ProductCatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">Cargando catálogo...</div>;
  if (error) return <div className="container"><p style={{color:'red'}}>Error al cargar productos: {error}</p></div>;

  return (
    <div className="container">
      <h1>NUESTROS PRODUCTOS</h1>
      
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} /> 
        ))}
      </div>
      
      {products.length === 0 && <p>No se encontraron productos.</p>}
    </div>
  );
};

export default ProductCatalogPage;