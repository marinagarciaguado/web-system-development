const API_URL = 'http://localhost:3000/api/products';

export const getProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error loading products');
  return await response.json();
};

export const createProduct = async (productData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error('Error creating product');
  return await response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Delete error');
  return true;
};