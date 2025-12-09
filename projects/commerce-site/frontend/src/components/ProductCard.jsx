import '../App.css';

function ProductCard({ product }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p className="desc">{product.description}</p>
      <div className="card-footer">
        <span className="price">${product.price}</span>
        <span className="category">{product.category || 'General'}</span>
      </div>
    </div>
  );
}

export default ProductCard;