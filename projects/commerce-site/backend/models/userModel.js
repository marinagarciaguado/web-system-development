import pool from '../db/pool.js';

// Generates a JWT using the user's non-sensitive data
// This JWT is what the frontend stores for session management (Token storage and management)
export const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET, // Use secret from .env (Required)
        { expiresIn: '1d' }
    );
};

// Finds a user by either username or email for login validation
export const findUserByCredentials = async (username, email) => {
    let query = 'SELECT * FROM users WHERE username = $1 OR email = $2';

    try {
        // Parameterized query prevents SQL injection
        const result = await pool.query(query, [username, email]);
        return result.rows[0] || null; 
    } catch (error) {
        console.error('Error finding user by credentials:', error.message);
        throw error;
    }
};

// Creates a new user in the database (Registration)
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
        // Error handling for "proper error handling for authentication failures"
        if (error.code === '23505') { 
            throw new Error('Username or email already in use.');
        }
        throw error;
    }
};