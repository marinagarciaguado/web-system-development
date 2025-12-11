// backend/models/userModel.js
import pool from '../db/pool.js';

/**
 * Find a user by email
 * @param {string} email
 * @returns user row or undefined
 */
export async function findByEmail(email) {
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
}

/**
 * Find a user by id
 */
export async function findById(id) {
  const res = await pool.query('SELECT id, email, full_name, phone, nif, role, created_at FROM users WHERE id = $1', [id]);
  return res.rows[0];
}

/**
 * Create a user
 * @param {Object} data - { email, password_hash, full_name, phone, nif, role }
 */
export async function createUser({ email, password_hash, full_name = null, phone = null, nif, role = 'customer' }) {
  const res = await pool.query(
    `INSERT INTO users (email, password_hash, full_name, phone, nif, role)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, email, full_name, phone, nif, role, created_at`,
    [email, password_hash, full_name, phone, nif, role]
  );
  return res.rows[0];
}

/**
 * Optional helper: basic credential lookup by email (for compatibility)
 */
export async function findUserByCredentials(email) {
  // returns full row including password_hash for auth comparisons
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
}
