import React from 'react'; 
import { useAuth } from '../context/AuthContext'; // Importamos el hook de autenticacion

function ProductCard({ product }) {
    // [PASO 2: VERIFICAR AUTENTICACION]
    const { isAuthenticated } = useAuth(); 

    return (
        <div className="card">
            {product.image_url ? (
                <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="product-image"
                />
            ) : (
                <div className="product-image" style={{backgroundColor: '#F3F4F6', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', borderRadius: '8px', marginBottom: '1rem'}}>
                    <span>Imagen no disponible</span>
                </div>
            )}

            <h3>{product.name}</h3>
            <p className="desc">{product.description}</p>
            <div className="card-footer">
                <span className="price">{product.price} EUR</span> 
                <span className="category">{product.category_name || 'General'}</span> 
            </div>
            
            {/* CONDITIONAL RENDERING: Solo se muestra el boton si esta autenticado */}
            {isAuthenticated ? (
                <button className="btn-primary add-to-cart-btn">
                    AÑADIR AL CARRITO
                </button>
            ) : (
                <p style={{marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-primary-red)'}}>
                    Inicia sesión para realizar un pedido.
                </p>
            )}
        </div>
    );
}

export default ProductCard;