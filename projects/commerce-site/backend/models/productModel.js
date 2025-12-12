// backend/models/productModel.js
import pool from '../db/pool.js';

// GET: Fetch all products (Public endpoint)
export const getAllProducts = async () => {
    const query = `
        SELECT 
            p.id, p.name, p.description, p.price, p.image_url, p.stock,  -- ADDED p.stock
            c.name as category_name, 
            u.email as created_by_email,  -- FIXED: Changed u.username to u.email
            u.full_name as created_by_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN users u ON p.user_id = u.id
        ORDER BY p.id ASC
    `;

    const result = await pool.query(query);
    return result.rows;
};

// GET: Fetch a single product (Public/Private)
export const getProductById = async (id) => {
    const query = `
        SELECT 
            p.id, p.name, p.description, p.price, p.image_url, p.stock,  -- ADDED p.stock
            c.name as category_name, 
            u.email as created_by_email,  -- FIXED: Changed u.username to u.email
            u.full_name as created_by_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN users u ON p.user_id = u.id
        WHERE p.id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
};

// POST: Create new product (Protected endpoint)
export const createProduct = async (productData, userId) => {
    // FIXED: Destructure stock (which was added to Zod schema previously)
    const { name, description, price, category_id, image_url, stock } = productData;

    const query = `
        INSERT INTO products (name, description, price, category_id, image_url, user_id, stock)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, name, price, stock, image_url -- ADDED stock to return
    `;

    const result = await pool.query(
        query, 
        [name, description, price, category_id, image_url, userId, stock] // ADDED stock value
    );
    
    return result.rows[0];
};

// DELETE: Delete a product (Protected endpoint)
export const deleteProduct = async (id) => {
    const query = 'DELETE FROM products WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
};

// PUT/PATCH: Update a product (Protected endpoint)
export const updateProduct = async (id, productData) => {
    // FIXED: Destructure stock for update
    const { name, description, price, category_id, image_url, stock } = productData; 
    
    const query = `
        UPDATE products
        SET name = $1, description = $2, price = $3, category_id = $4, image_url = $5, stock = $6
        WHERE id = $7
        RETURNING id, name, price, stock -- ADDED stock to return
    `;

    const result = await pool.query(
        query, 
        [name, description, price, category_id, image_url, stock, id] // ADDED stock value
    );
    return result.rows[0];
};