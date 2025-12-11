import bcrypt from 'bcrypt';
import { LoginSchema, SetPasswordSchema } from '../schemas/authSchema.js';
import * as userModel from '../models/userModel.js';

// Helper function to handle async operations, fulfilling error handling requirement
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
    const result = LoginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ errors: result.error.issues });
    }

    const { username, email, password } = result.data;

    // Use username if present, otherwise use email for lookup
    const user = await userModel.findUserByCredentials(username, email);

    // Check if user exists AND if password matches
    if (user && (await bcrypt.compare(password, user.password_hash))) {

        if (user.role === 'pending_setup') { 
            return res.status(403).json({ error: 'Account created, but password setup is pending. Please check your email for the setup link.' });
        }
        
        // Ensure user is an approved customer or admin
        if (user.role === 'public') {
            return res.status(403).json({ error: 'Account pending validation by administrator.' });
        }

        // 2. Generate a new token
        const token = userModel.generateToken(user);

        res.status(200).json({
            token,
            user: { id: user.id, username: user.username, role: user.role }
        });
    } else {
        // Fulfills "Proper error handling for authentication failures"
        res.status(401).json({ error: 'Invalid credentials or user not found.' });
    }
});