import pool from '../db/pool.js';
import jwt from 'jsonwebtoken';

// Generates a JWT (Required: JWT-based authentication system)
export const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET, // Reads from .env file
        { expiresIn: '1d' } // Token storage and management
    );
};

// Finds a user by username or email (Required: Parameterized queries)
export const findUserByCredentials = async (username, email) => {
    const query = `
        SELECT id, username, email, password_hash, role
        FROM users 
        WHERE username = $1 OR email = $2
    `;

    try {
        const result = await pool.query(query, [username, email]);
        return result.rows[0] || null; 
    } catch (error) {
        console.error('Error finding user by credentials:', error.message);
        throw error;
    }
};

// Creates a new user (Registration)
export const createUser = async (username, passwordHash, email, role = 'public') => {
    const query = `
        INSERT INTO users (username, password_hash, email, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, username, email, role, created_at
    `;

    try {
        const result = await pool.query(query, [username, passwordHash, email, role]);
        return result.rows[0];
    } catch (error) {
        // Proper error handling for authentication failures
        if (error.code === '23505') { 
            throw new Error('Username or email already in use.');
        }
        throw error;
    }
};