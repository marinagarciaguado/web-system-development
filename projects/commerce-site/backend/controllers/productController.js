// backend/controllers/productController.js

import pool from '../db/pool.js';
// We assume you have created schemas/authSchema.js with ProductSchema and IdSchema
import { ProductSchema, IdSchema } from '../schemas/productSchema.js'; 

// Utility function to wrap async controllers and automatically handle errors (Good Practice: Module 5/6)
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// --- Helper Query (Avoids repetition in GET endpoints) ---
const baseProductQuery = `
    SELECT 
        p.id, p.name, p.description, p.price, p.image_url, 
        c.name as category_name, 
        u.username as created_by,
        p.user_id
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN users u ON p.user_id = u.id
`;

// 1. GET ALL: Obtener todos los productos (Public Endpoint)
export const getProducts = asyncHandler(async (req, res) => {
    const result = await pool.query(`${baseProductQuery} ORDER BY p.id DESC`);
    res.json(result.rows);
});

// 2. GET ONE: Obtener un producto por ID (Public Endpoint)
export const getProductById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    // CRITICAL FIX: Validate ID format using Zod/IdSchema
    if (isNaN(id) || IdSchema.safeParse(id).error) {
        return res.status(400).json({ error: 'Invalid product ID format.' });
    }
    
    const result = await pool.query(`${baseProductQuery} WHERE p.id = $1`, [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.json(result.rows[0]);
});

// 3. POST: Crear un producto (Protected Endpoint - Requires 'admin' role)
export const createProduct = asyncHandler(async (req, res) => {
    // CRITICAL FIX: Use Zod validation for robust and complete input validation
    const result = ProductSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ errors: result.error.issues }); // 400 Bad Request
    }

    // CRITICAL FIX: Get user ID from authenticated token (req.user is set by 'protect' middleware)
    // Fulfills the requirement to link the product to the creating admin (user_id field)
    const userId = req.user.id; 
    
    const { name, description, price, category_id, image_url } = result.data;

    const resultDB = await pool.query(
        // Query updated to include user_id and image_url
        'INSERT INTO products (name, description, price, category_id, image_url, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, description, price, category_id, image_url || null, userId]
    );

    res.status(201).json(resultDB.rows[0]); // 201 Created
});

// 4. PUT: Actualizar un producto (Protected Endpoint - Requires 'admin' role)
export const updateProduct = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    // CRITICAL FIX: Validate ID format
    if (isNaN(id) || IdSchema.safeParse(id).error) {
        return res.status(400).json({ error: 'Invalid product ID format.' });
    }

    // Use partial() to allow updating only some fields, but use strict validation for provided fields
    const result = ProductSchema.partial().safeParse(req.body); 

    if (!result.success) {
        return res.status(400).json({ errors: result.error.issues });
    }
    
    const { name, description, price, category_id, image_url } = result.data;

    // Fetch existing product data to preserve fields not sent in the PUT request
    const existingProductResult = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (existingProductResult.rows.length === 0) {
        return res.status(404).json({ error: "Product not found" });
    }
    const existingProduct = existingProductResult.rows[0];

    // Build the query to only update fields present in the body (or use existing data)
    const updatedProduct = await pool.query(
        'UPDATE products SET name = $1, description = $2, price = $3, category_id = $4, image_url = $5 WHERE id = $6 RETURNING *',
        [
            name !== undefined ? name : existingProduct.name,
            description !== undefined ? description : existingProduct.description,
            price !== undefined ? price : existingProduct.price,
            category_id !== undefined ? category_id : existingProduct.category_id,
            image_url !== undefined ? image_url : existingProduct.image_url,
            id
        ]
    );
    
    res.json(updatedProduct.rows[0]);
});

// 5. DELETE: Borrar un producto (Protected Endpoint - Requires 'admin' role)
export const deleteProduct = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    
    // CRITICAL FIX: Validate ID format
    if (isNaN(id) || IdSchema.safeParse(id).error) {
        return res.status(400).json({ error: 'Invalid product ID format.' });
    }

    const resultDB = await pool.query('DELETE FROM products WHERE id = $1', [id]);
    
    if (resultDB.rowCount === 0) {
        return res.status(404).json({ error: "Product not found" });
    }
    
    res.status(204).end(); // 204 No Content for successful deletion
});