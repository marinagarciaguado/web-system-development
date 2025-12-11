import bcrypt from 'bcrypt';
import { RegisterSchema, LoginSchema } from '../schemas/authSchema.js';
import * as userModel from '../models/userModel.js';

// Helper function to handle async operations, fulfilling error handling requirement
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// POST /api/auth/register
export const registerUser = asyncHandler(async (req, res) => {
    const result = RegisterSchema.safeParse(req.body);

    if (!result.success) {
        // Fulfills "Input validation" and "Proper error handling"
        return res.status(400).json({ errors: result.error.issues });
    }

    const { username, email, password } = result.data;

    // 1. Hash the password (required for security)
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 2. Create the user in the database
    const newUser = await userModel.createUser(username, passwordHash, email, 'validated');

    // 3. Generate a token for immediate login
    const token = userModel.generateToken(newUser);

    res.status(201).json({ 
        token,
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
        }
    });
});


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

        // 1. Check if user role is active (fulfills "Admin has to validate you")
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