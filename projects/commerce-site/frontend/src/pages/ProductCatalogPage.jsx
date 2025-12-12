import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api'; 
import ProductCard from '../components/ProductCard';
// Si el CSS de catalogos aun existe, puedes importarlo, sino, confia en App.css
// import './ProductCatalogPage.css'; 

const ProductCatalogPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // [PASO 1: FETCH DATA FROM API]
        // Se llama a la funcion que consulta la API del backend
        getProducts()
            .then(data => {
                setProducts(data);
            })
            .catch(err => {
                console.error("Error al obtener productos:", err);
                setError('Error al cargar productos. Por favor, verifica el estado del backend.');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="container">Cargando catálogo...</div>;
    if (error) return <div className="container"><p style={{color:'red'}}>{error}</p></div>;

    return (
        <div className="container">
            <h1>NUESTROS PRODUCTOS</h1>
            <p className="catalog-subtitle" style={{textAlign: 'center', marginBottom: '40px', color: 'var(--color-text-dark)'}}>
                Descubre nuestra selección fresca y natural, administrada por nuestro equipo de gestión de productos.
            </p>
            
            <div className="grid">
                {products.map((p) => (
                    // Mapeamos los productos obtenidos del backend a la tarjeta
                    <ProductCard key={p.id} product={p} /> 
                ))}
            </div>
            
            {products.length === 0 && <p style={{textAlign: 'center', marginTop: '40px'}}>No se encontraron productos en el catálogo.</p>}
        </div>
    );
};

export default ProductCatalogPage;