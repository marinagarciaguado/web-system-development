import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading catalog...</p>;
  if (error) return <p style={{color:'red'}}>Error: {error}</p>;

  return (
    <div className="container">
      <h1>Product Catalog</h1>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} /> 
        ))}
      </div>
    </div>
  );
}

export default Home;