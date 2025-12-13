import bcrypt from 'bcrypt';
import { LoginSchema, SetPasswordSchema } from '../schemas/authSchema.js'; 
import * as userModel from '../models/userModel.js';

// Helper function to handle async operations, fulfilling error handling requirement
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// POST /api/auth/set-password
export const setInitialPassword = asyncHandler(async (req, res) => {
    // 1. Validate the token and new password (using SetPasswordSchema)
    const result = SetPasswordSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ errors: result.error.issues });
    }

    const { token, password } = result.data;

    // 2. Find user by token and check expiration
    const user = await userModel.findUserByActivationToken(token);

    if (!user) {
        // Fulfills "Proper error handling" (Generic message for security)
        return res.status(400).json({ error: 'Invalid or expired activation link.' });
    }
    
    // Safety check: ensure only pending users use this
    if (user.role !== 'pending_setup') {
        return res.status(400).json({ error: 'This account has already been activated.' });
    }

    // 3. Hash the new password (fulfills secure password requirement)
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(password, saltRounds);

    // 4. Update password, set role to 'customer', and clear the token
    const updatedUser = await userModel.updatePasswordAndRole(user.id, newPasswordHash);

    // 5. Generate a JWT token to log the user in immediately (assuming userModel.generateToken exists)
    const jwtToken = userModel.generateToken(updatedUser); 

    res.status(200).json({
        message: 'Password set successfully. You are now logged in.',
        token: jwtToken,
        user: { id: updatedUser.id, email: updatedUser.email, role: updatedUser.role }
    });
});


// POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
    const result = LoginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ errors: result.error.issues });
    }

    const { email, password } = result.data; // LoginSchema should only expect email/password

    // Find user by email, retrieving full row including password_hash
    const user = await userModel.findByEmail(email); 

    // Check if user exists AND if password matches
    if (user && (await bcrypt.compare(password, user.password_hash))) {

        // Check for the new pending status - BLOCKS LOGIN
        if (user.role === 'pending_setup') {
            return res.status(403).json({ error: 'Account setup pending. Please check your email for the password setup link.' });
        }
        
        // Check for any other inactive status (like the old 'public' status)
        if (user.role === 'public') {
            return res.status(403).json({ error: 'Account pending validation by administrator.' });
        }


        // 2. Generate a new token (assuming userModel.generateToken exists)
        const token = userModel.generateToken(user);

        res.status(200).json({
            token,
            user: { id: user.id, email: user.email, role: user.role }
        });
    } else {
        // Fulfills "Proper error handling for authentication failures"
        res.status(401).json({ error: 'Invalid credentials or user not found.' });
    }
});