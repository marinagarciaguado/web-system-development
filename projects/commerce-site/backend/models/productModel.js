// backend/models/productModel.js
import pool from '../db/pool.js';

// GET: Fetch all products (Public endpoint)
export const getAllProducts = async () => {
    const query = `
        SELECT 
            p.id, p.name, p.description, p.price, p.image_url, p.stock,
            u.email as created_by_email,
            u.full_name as created_by_name
        FROM products p
        LEFT JOIN users u ON p.user_id = u.id
        ORDER BY p.id ASC
    `;
    // [MODIFICADO] Se elimina LEFT JOIN categories c ON p.category_id = c.id
    // [MODIFICADO] Se elimina c.name as category_name del SELECT
    const result = await pool.query(query);
    return result.rows;
};

// GET: Fetch a single product (Public/Private)
export const getProductById = async (id) => {
    const query = `
        SELECT 
            p.id, p.name, p.description, p.price, p.image_url, p.stock,
            u.email as created_by_email,
            u.full_name as created_by_name
        FROM products p
        LEFT JOIN users u ON p.user_id = u.id
        WHERE p.id = $1
    `;
    // [MODIFICADO] Se elimina LEFT JOIN categories c ON p.category_id = c.id
    // [MODIFICADO] Se elimina c.name as category_name del SELECT
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
};

// POST: Create new product (Protected endpoint)
export const createProduct = async (productData, userId) => {
    // [MODIFICADO] Se elimina category_id de la desestructuracion
    const { name, description, price, image_url, stock } = productData;

    const query = `
        INSERT INTO products (name, description, price, image_url, user_id, stock)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, name, price, stock, image_url
    `;
    const result = await pool.query(
        query, 
        [name, description, price, image_url, userId, stock]
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
    // [MODIFICADO] Se elimina category_id de la desestructuracion
    const { name, description, price, image_url, stock } = productData; 
    
    const query = `
        UPDATE products
        SET name = $1, description = $2, price = $3, image_url = $4, stock = $5
        WHERE id = $6
        RETURNING id, name, price, stock
    `;
    // [MODIFICADO] Se elimina category_id y su placeholder $4
    const result = await pool.query(
        query, 
        [name, description, price, image_url, stock, id]
    );
    return result.rows[0];
};