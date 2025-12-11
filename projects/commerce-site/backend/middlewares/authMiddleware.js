// backend/controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userModel from '../models/userModel.js';
import { LoginSchema } from '../schemas/authSchema.js';

// Helper wrapper for async/await
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
export const login = asyncHandler(async (req, res) => {
  // Validate the incoming body using your Zod schema
  const result = LoginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  const { email, password } = result.data;

  // Look up user by email
  const user = await userModel.findByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  // Compare password with hashed password
  const validPass = await bcrypt.compare(password, user.password_hash);
  if (!validPass) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  // Generate JWT with the correct payload that your middleware expects
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
      nif: user.nif,     // optional - helpful for orders
      email: user.email  // optional
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      phone: user.phone,
      nif: user.nif,
      role: user.role
    }
  });
});
