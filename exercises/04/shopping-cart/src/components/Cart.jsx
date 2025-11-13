import React from 'react';

function Cart({ items, onRemoveFromCart, total }) {
  return (
    <section className="cart card">
      <h2>Carrito</h2>
      {items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {items.map((item, index) => (
              <li 
                key={index} 
                data-testid={`cart-item-${index}`} 
              >
                <span>{item.name} - ${item.price}</span>
                <button
                  onClick={() => onRemoveFromCart(index)}
                  data-testid={`remove-${index}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          
          <h3 className="cart-total" data-testid="cart-total">
            Total: ${total.toFixed(2)}
          </h3>
        </>
      )}
    </section>
  );
}

export default Cart;