import { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const initialProducts = [
  { id: 1, name: 'Product A', price: 50, img: '/src/assets/letterA.png' },
  { id: 2, name: 'Product B', price: 30, img: '/src/assets/letterB.png' },
  { id: 3, name: 'Product C', price: 75, img: '/src/assets/letterC.png' },
];

function App() {
  const [products] = useState(initialProducts);
  
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (productToAdd) => {
    setCartItems(prevItems => [...prevItems, productToAdd]);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems(prevItems => 
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <>
      <header>
        <h1>Shopping Cart by Marina & Rodrigo</h1>
      </header>
      
      <main className="app-main">
        <ProductList 
          products={products} 
          onAddToCart={handleAddToCart} 
        />
        
        <Cart 
          items={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          total={cartTotal}
        />
      </main>
      
      <footer>
        <p>Module 04 - Web System Development</p>
      </footer>
    </>
  );
}

export default App;