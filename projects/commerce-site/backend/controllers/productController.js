import pool from '../db/pool.js';

// 1. GET ALL: Obtener todos los productos
export const getProducts = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT p.id, p.name, p.description, p.price, c.name as category 
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id DESC
    `);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// 2. GET ONE: Obtener un producto por ID
export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// 3. POST: Crear un producto
export const createProduct = async (req, res, next) => {
  const { name, description, price, category_id } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "The name and price are required" });
  }

  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, price, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, category_id || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// 4. PUT: Actualizar un producto
export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
      [name, price, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// 5. DELETE: Borrar un producto
export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};