// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            // Reutilizamos la llamada a la API
            const { data } = await axios.get(`${API_BASE_URL}/api/products`);
            setProducts(data);
        } catch (err) {
            setError('Error al cargar datos del inventario.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // --- Renderizado ---
    if (loading) return <div className="admin-dashboard-content">Cargando datos del Dashboard...</div>;
    if (error) return <div className="admin-dashboard-content"><div className="alert alert-error">{error}</div></div>;

    return (
        <div className="admin-dashboard-content admin-crud-container">
            <h2 style={{ marginBottom: '30px', textAlign: 'left' }}>Resumen del Sistema</h2>
            
            {/* Tarjetas de Resumen (KPIs simples) */}
            <div className="dashboard-kpis">
                <div className="kpi-card">
                    <h4>Total de Productos</h4>
                    <p className="kpi-value">{products.length}</p>
                </div>
                <div className="kpi-card">
                    <h4>Inventario Total (Unidades)</h4>
                    <p className="kpi-value">
                        {products.reduce((sum, p) => sum + (p.stock || 0), 0)}
                    </p>
                </div>
                <div className="kpi-card">
                    <h4>Valor Estimado de Inventario</h4>
                    <p className="kpi-value">
                        {products.reduce((sum, p) => sum + (p.stock * p.price || 0), 0).toFixed(2)}€
                    </p>
                </div>
            </div>

            <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ccc' }} />

            {/* Listado de Productos (Solo Lectura) */}
            <div className="product-table-section">
                <h3>Inventario Actual (Solo Lectura)</h3>
                <p style={{marginBottom: '20px', color: 'var(--text-secondary)'}}>
                    Para editar o eliminar productos, ve a la sección "Gestion Productos".
                </p>
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Categoría</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
                                    {product.image_url ? (
                                        <img 
                                            src={product.image_url} 
                                            alt={product.name} 
                                            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} 
                                        />
                                    ) : (
                                        <span>N/A</span>
                                    )}
                                </td>
                                <td>{product.name}</td>
                                <td>{product.price}€</td>
                                <td>{product.stock}</td>
                                <td>{product.category_name}</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && <p>No hay productos en el catálogo.</p>}
            </div>
        </div>
    );
};

export default AdminDashboard;