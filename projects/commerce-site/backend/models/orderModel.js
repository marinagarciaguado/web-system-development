// backend/models/orderModel.js
import pool from '../db/pool.js';

export async function createOrder(userId, total, items) {
  // items = [{ product_id, quantity, unit_price }, ...]
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const orderRes = await client.query(
      `INSERT INTO orders (user_id, status, total, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [userId, 'pending', total]
    );
    const order = orderRes.rows[0];

    const insertItemText = `INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4) RETURNING *`;
    for (const it of items) {
      await client.query(insertItemText, [order.id, it.product_id, it.quantity, it.unit_price]);
      // Optionally reduce product stock here
    }

    await client.query('COMMIT');
    return order;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function getAllOrders() {
  const res = await pool.query('SELECT * FROM orders ORDER BY id DESC');
  return res.rows;
}

export async function getOrderById(id) {
  const res = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
  return res.rows[0];
}

export async function getOrderItems(orderId) {
  const res = await pool.query('SELECT * FROM order_items WHERE order_id = $1', [orderId]);
  return res.rows;
}
