import React from 'react';

function ProductList({ products, onAddToCart }) {
  return (
    <section className="product-list card">
      <h2>Productos Disponibles</h2>
      <ul>
        {products.map((product, index) => (
          <li key={product.id}>
            <span>{product.name} - ${product.price}</span>
            
            <button 
              onClick={() => onAddToCart(product)} 
              data-testid={`add-${index}`}
            >
              Añadir al Carrito
            </button>
            
          </li> 
        ))}
      </ul>
    </section>
  );
}

export default ProductList;