// backend/controllers/productController.js
import * as productModel from '../models/productModel.js';
import { ProductSchema, IdSchema } from '../schemas/productSchema.js'; 

// async wrapper for error handling
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/**
 * GET /api/products
 * Fetches all products (Public access)
 */
export const getProducts = asyncHandler(async (req, res) => {
  // FIX: Match model function name: findAll -> getAllProducts
  const products = await productModel.getAllProducts(); 
  res.status(200).json(products); 
});

/**
 * GET /api/products/:id
 * Fetches a single product by ID (Public access)
 */
export const getProductById = asyncHandler(async (req, res) => {
  const idResult = IdSchema.safeParse(req.params);
  if (!idResult.success) {
    return res.status(400).json({ errors: idResult.error.issues });
  }
  const id = idResult.data.id;

  // FIX: Match model function name: findById -> getProductById
  const product = await productModel.getProductById(id); 

  if (!product) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  res.status(200).json(product);
});

/**
 * POST /api/products
 * Creates a new product (Admin-only)
 */
export const createProduct = asyncHandler(async (req, res) => {
  const productResult = ProductSchema.safeParse(req.body);
  if (!productResult.success) {
    return res.status(400).json({ errors: productResult.error.issues });
  }

  const productData = productResult.data;
  
  // CRITICAL FIX: The protect middleware attached the user object (from the JWT) to req.
  // The model requires the user ID to record who created the product.
  const userId = req.user.id; 
  
  // Model function signature is (productData, userId)
  const newProduct = await productModel.createProduct(productData, userId);
  
  res.status(201).json(newProduct);
});


/**
 * PUT /api/products/:id
 * Updates an existing product (Admin-only)
 */
export const updateProduct = asyncHandler(async (req, res) => {
  // 1. Validate ID from URL
  const idResult = IdSchema.safeParse(req.params);
  if (!idResult.success) {
    return res.status(400).json({ errors: idResult.error.issues });
  }
  const id = idResult.data.id;

  // 2. Validate request body
  const productResult = ProductSchema.safeParse(req.body);
  if (!productResult.success) {
    return res.status(400).json({ errors: productResult.error.issues });
  }
  
  const productData = productResult.data;

  // FIX: Match model function name and argument order: update -> updateProduct(id, productData)
  const updatedProduct = await productModel.updateProduct(id, productData);

  if (!updatedProduct) {
    return res.status(404).json({ error: 'Product not found for update.' });
  }
  
  res.status(200).json(updatedProduct);
});

/**
 * DELETE /api/products/:id
 * Deletes a product (Admin-only)
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const idResult = IdSchema.safeParse(req.params);
  if (!idResult.success) {
    return res.status(400).json({ errors: idResult.error.issues });
  }
  const id = idResult.data.id;

  // FIX: Match model function name: remove -> deleteProduct
  const deletedCount = await productModel.deleteProduct(id);

  if (deletedCount === 0) {
    return res.status(404).json({ error: 'Product not found for deletion.' });
  }

  res.status(204).end(); 
});