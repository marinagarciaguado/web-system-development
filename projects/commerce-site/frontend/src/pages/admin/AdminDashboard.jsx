import { useEffect, useState } from 'react';
import { getProducts, createProduct, deleteProduct } from '../../services/api';

function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category_id: 1 });
  
  const refreshList = () => {
    getProducts().then(setProducts);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return alert("Fill in the required fields");

    try {
      await createProduct(form);
      setForm({ name: '', description: '', price: '', category_id: 1 });
      refreshList();
    } catch (error) {
      alert("Error saving");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      refreshList();
    }
  };

  return (
    <div className="admin-panel">
      <h2>Product Management Panel</h2>
      
      <form onSubmit={handleSubmit} className="product-form">
        <h3>Add New</h3>
        <input 
          type="text" 
          placeholder="Product name" 
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          required
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={form.description}
          onChange={e => setForm({...form, description: e.target.value})}
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={form.price}
          onChange={e => setForm({...form, price: e.target.value})}
          required
        />
        <button type="submit">Save Product</button>
      </form>

      <ul className="admin-list">
        {products.map(p => (
          <li key={p.id}>
            <span>{p.name} - <strong>${p.price}</strong></span>
            <button onClick={() => handleDelete(p.id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;