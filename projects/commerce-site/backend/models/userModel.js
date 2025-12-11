// backend/models/userModel.js
import pool from '../db/pool.js';

/**
 * Find a user by email (used for login and existence checks)
 * @param {string} email
 * @returns user row or undefined (returns full row including password_hash)
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
 * Create a user (generic function, can be used for initial admin setup)
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
 * NEW: Create a user with a PENDING status and an activation token (Used by AdminCreateClient)
 * @param {Object} data - { email, password_hash, full_name, phone, nif, activation_token }
 */
export async function createUserWithToken({ email, password_hash, full_name = null, phone = null, nif, activation_token }) {
  const role = 'pending_setup'; // Client must set password before becoming 'customer'
  // Token expires in 1 hour (3600000 milliseconds)
  const token_expires_at = new Date(Date.now() + 3600000); 

  const res = await pool.query(
    `INSERT INTO users (email, password_hash, full_name, phone, nif, role, activation_token, token_expires_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, email, full_name, phone, nif, role, created_at`,
    [email, password_hash, full_name, phone, nif, role, activation_token, token_expires_at]
  );
  return res.rows[0];
}

/**
 * NEW: Find a user by activation token, ensuring it is not expired. (Used by SetInitialPassword)
 * @param {string} token
 * @returns user row or undefined
 */
export async function findUserByActivationToken(token) {
  const res = await pool.query(
    `SELECT * FROM users 
     WHERE activation_token = $1 AND token_expires_at > NOW()`,
    [token]
  );
  return res.rows[0];
}

/**
 * NEW: Update user's password, set role to 'customer', and clear the activation token. (Used by SetInitialPassword)
 * @param {number} userId
 * @param {string} newPasswordHash
 * @returns updated user row or undefined
 */
export async function updatePasswordAndRole(userId, newPasswordHash) {
  const newRole = 'customer'; // Final active role
  const res = await pool.query(
    `UPDATE users
     SET password_hash = $1, role = $2, activation_token = NULL, token_expires_at = NULL
     WHERE id = $3
     RETURNING id, email, full_name, phone, nif, role, created_at`,
    [newPasswordHash, newRole, userId]
  );
  return res.rows[0];
}

/**
 * Helper: basic credential lookup by email 
 * NOTE: Based on implementation, it looks up by email only.
 */
export async function findUserByCredentials(email) {
  // returns full row including password_hash for auth comparisons
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
}