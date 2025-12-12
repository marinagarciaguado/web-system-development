// src/services/api.js
import axios from 'axios';

// Use the environment variable for the API base URL (Vite environment)
// NOTE: This MUST match your backend's port (3001)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// Set up a consistent Axios instance
const api = axios.create({
  baseURL: API_BASE_URL + '/api', // Base for all API calls: http://localhost:3001/api
});

// --- Product Endpoints ---
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export default api;