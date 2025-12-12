// src/components/ProductCard.jsx
import React from 'react'; 

function ProductCard({ product }) {
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
      
    </div>
  );
}

export default ProductCard;