// src/pages/admin/AdminProductCRUD.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ProductSchema } from '../../schemas/productSchemas'; 

// Use the environment variable for the API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const AdminProductCRUD = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories dropdown
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial values for the form, including transforming numbers back to strings for Field input
  const initialValues = {
    name: editingProduct?.name || '',
    description: editingProduct?.description || '',
    // Ensure numbers are converted back to strings for form fields
    price: editingProduct?.price?.toString() || '',
    stock: editingProduct?.stock?.toString() || '',
    category_id: editingProduct?.category_id?.toString() || '',
    image_url: editingProduct?.image_url || '',
  };

  // --- API Calls ---

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // **FIXED API URL**
      const { data } = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products. Check network and backend status.');
    } finally {
      setLoading(false);
    }
  };

  // NOTE: CATEGORIES ENDPOINT IS MOCKED - You would implement a real one later
  const fetchCategories = async () => {
    try {
      // TEMPORARY MOCK DATA: For testing the dropdown functionality
      setCategories([
        { id: 1, name: 'Produce' },
        { id: 2, name: 'Packaged Goods' },
        { id: 3, name: 'Beverages' }
      ]);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // --- CRUD Handlers ---

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    setError(null);
    try {
      if (editingProduct) {
        // UPDATE Logic (PUT) - **FIXED API URL**
        await axios.put(`${API_BASE_URL}/api/products/${editingProduct.id}`, values);
      } else {
        // CREATE Logic (POST) - **FIXED API URL**
        await axios.post(`${API_BASE_URL}/api/products`, values);
      }
      
      resetForm();
      setEditingProduct(null);
      await fetchProducts(); // Refresh the list

    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || 'Operation failed. Check if all fields are valid.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      // DELETE Logic - **FIXED API URL**
      await axios.delete(`${API_BASE_URL}/api/products/${productId}`);
      await fetchProducts();
    } catch (err) {
      setError('Failed to delete product. Check network.');
    }
  };

  // --- Rendering ---
  
  if (loading) return <div className="admin-crud-container">Cargando productos...</div>;
  if (error && !products.length) return <div className="admin-crud-container"><div className="alert alert-error">{error}</div></div>;

  return (
    <div className="admin-crud-container">
      <h2>Administración de Productos</h2>
      
      {/* -------------------- Product Form -------------------- */}
      <div className="product-form-section">
        <h3>{editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}</h3>
        {error && <div className="alert alert-error">{error}</div>}

        <Formik
          key={editingProduct ? editingProduct.id : 'new'} 
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(ProductSchema)}
          onSubmit={handleFormSubmit}
          enableReinitialize={true} 
        >
          {({ isSubmitting, resetForm }) => (
            <Form>
              <div className="form-grid">
                
                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <Field name="name" type="text" />
                  <ErrorMessage name="name" component="div" className="error-message" />
                </div>
                
                {/* Price */}
                <div className="form-group">
                  <label htmlFor="price">Precio</label>
                  <Field name="price" type="number" step="0.01" />
                  <ErrorMessage name="price" component="div" className="error-message" />
                </div>
                
                {/* Stock */}
                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <Field name="stock" type="number" />
                  <ErrorMessage name="stock" component="div" className="error-message" />
                </div>

                {/* Category ID (Dropdown Select) */}
                <div className="form-group">
                  <label htmlFor="category_id">Categoría</label>
                  <Field as="select" name="category_id">
                    <option value="">Seleccionar Categoría</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="category_id" component="div" className="error-message" />
                </div>
                
                {/* Image URL */}
                <div className="form-group full-width">
                  <label htmlFor="image_url">URL de Imagen</label>
                  <Field name="image_url" type="text" />
                  <ErrorMessage name="image_url" component="div" className="error-message" />
                </div>

                {/* Description */}
                <div className="form-group full-width">
                  <label htmlFor="description">Descripción</label>
                  <Field name="description" as="textarea" rows="4" />
                  <ErrorMessage name="description" component="div" className="error-message" />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                  {isSubmitting ? 'Guardando...' : (editingProduct ? 'Guardar Cambios' : 'Crear Producto')}
                </button>
                
                {editingProduct && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setEditingProduct(null); 
                      resetForm();
                    }}
                    className="btn btn-secondary"
                  >
                    Cancelar Edición
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <hr />

      {/* -------------------- Products Table (READ) -------------------- */}
      <div className="product-table-section">
        <h3>Productos Existentes ({products.length})</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}€</td>
                <td>{product.stock}</td>
                {/* Using category_name returned by the backend model */}
                <td>{product.category_name}</td> 
                <td>
                  <button 
                    onClick={() => setEditingProduct(product)}
                    className="btn btn-edit"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-delete"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p>No hay productos en el catálogo.</p>}
      </div>
    </div>
  );
};

export default AdminProductCRUD;