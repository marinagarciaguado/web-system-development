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
  // [REMOVIDO] categories ya no se usa
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial values: category_id ya no es necesario
  const initialValues = {
    name: editingProduct?.name || '',
    description: editingProduct?.description || '',
    price: editingProduct?.price?.toString() || '',
    stock: editingProduct?.stock?.toString() || '',
    image_url: editingProduct?.image_url || '',
  };

  // --- API Calls ---

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products. Check network and backend status.');
    } finally {
      setLoading(false);
    }
  };

  // [REMOVIDO] fetchCategories ya no es necesario
  
  useEffect(() => {
    fetchProducts();
    // [REMOVIDO] No se llama a fetchCategories
  }, []);

  // --- CRUD Handlers ---

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    setError(null);
    try {
      if (editingProduct) {
        await axios.put(`${API_BASE_URL}/api/products/${editingProduct.id}`, values);
      } else {
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
                
                {/* Price (CORREGIDO: type="text") */}
                <div className="form-group">
                  <label htmlFor="price">Precio</label>
                  <Field name="price" type="text" />
                  <ErrorMessage name="price" component="div" className="error-message" />
                </div>
                
                {/* Stock (CORREGIDO: type="text") */}
                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <Field name="stock" type="text" />
                  <ErrorMessage name="stock" component="div" className="error-message" />
                </div>

                {/* [REMOVIDO] Se quita el campo Category ID */}
                
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
              {/* [REMOVIDO] Categoría */}
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
                {/* [REMOVIDO] product.category_name */}
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