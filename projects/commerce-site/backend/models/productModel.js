import pool from '../db/pool.js';

// GET: Fetch all products (Public endpoint)
export const getAllProducts = async () => {
    // Joins are used to enrich the data with the category name (as requested)
    const query = `
        SELECT 
            p.id, p.name, p.description, p.price, p.image_url, 
            c.name as category_name, 
            u.username as created_by 
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
            p.id, p.name, p.description, p.price, p.image_url, 
            c.name as category_name, 
            u.username as created_by 
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
    const { name, description, price, category_id, image_url } = productData;

    // Parameterized query prevents SQL injection
    const query = `
        INSERT INTO products (name, description, price, category_id, image_url, user_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, name, price, image_url
    `;

    const result = await pool.query(query, [name, description, price, category_id, image_url, userId]);
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
    const { name, description, price, category_id, image_url } = productData;
    const query = `
        UPDATE products
        SET name = $1, description = $2, price = $3, category_id = $4, image_url = $5
        WHERE id = $6
        RETURNING id, name, price
    `;

    const result = await pool.query(query, [name, description, price, category_id, image_url, id]);
    return result.rows[0];
};