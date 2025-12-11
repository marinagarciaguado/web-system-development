// backend/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

// Middleware: requires a valid token
export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            error: 'Authorization token not found. Please log in.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // makes user info available
        next();
    } catch (error) {
        return res.status(403).json({
            error: 'Invalid or expired token. Access denied.'
        });
    }
};

// Middleware: requires admin role
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({
        error: 'Not authorized as an admin.'
    });
};
