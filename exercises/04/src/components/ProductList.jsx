import React from 'react';

function ProductList({ products, onAddToCart }) {
  return (
    <section className="product-list card">
      <h2>Available Products</h2>
      <ul>
        {products.map((product, index) => (
          <li key={product.id}>

            <img 
              src={product.img} 
              alt={product.name} 
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '0.5rem' }} 
            />
            
            <span>{product.name} - €{product.price}</span>
            
            <button 
              onClick={() => onAddToCart(product)} 
              data-testid={`add-${index}`}
            >
              Add to Cart
            </button>
            
          </li> 
        ))}
      </ul>
    </section>
  );
}

export default ProductList;