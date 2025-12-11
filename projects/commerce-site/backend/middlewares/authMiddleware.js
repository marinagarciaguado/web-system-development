// backend/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

// This is the core logic for checking if a user is authenticated (logged in)
export const protect = (req, res, next) => {
    // 1. Get token from the Authorization header (e.g., "Bearer <token>")
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]; // Extract token part
    }

    if (!token) {
        // Forbidden: No token provided
        return res.status(401).json({ 
            error: 'Authorization token not found. Please log in.' 
        });
    }

    try {
        // 2. Verify the token using the secret from your .env file
        // Throws an error if token is expired or invalid
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Attach the decoded user payload to the request object
        // This makes the user's ID, username, and role available in controllers (e.g., req.user.id)
        req.user = decoded; 
        
        // 4. Move to the next route handler/middleware
        next();

    } catch (error) {
        // Unauthorized: Invalid or expired token
        // Fulfills "Proper error handling for authentication failures"
        return res.status(403).json({ 
            error: 'Invalid or expired token. Access denied.' 
        });
    }
};

// Middleware to check if the authenticated user has the 'admin' role
export const admin = (req, res, next) => {
    // The previous 'protect' middleware ensures req.user exists
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ 
            error: 'Not authorized as an admin.' 
        });
    }
};