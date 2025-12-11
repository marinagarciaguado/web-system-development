// backend/controllers/userController.js
import bcrypt from 'bcrypt';
import * as userModel from '../models/userModel.js';
import { CreateUserSchema } from '../schemas/authSchema.js';

// async wrapper
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/**
 * POST /api/users
 * Admin-only endpoint to create users
 * Body: { email, password, full_name?, phone?, nif, role? }
 */
export const createUser = asyncHandler(async (req, res) => {
  const parsed = CreateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.issues });
  }

  const { email, password, full_name = null, phone = null, nif, role = 'customer' } = parsed.data;

  // Check existing
  const existing = await userModel.findByEmail(email);
  if (existing) {
    return res.status(409).json({ error: 'User with that email already exists.' });
  }

  // Hash password
  const pwHash = await bcrypt.hash(password, 10);

  // Create user in DB
  const created = await userModel.createUser({
    email,
    password_hash: pwHash,
    full_name,
    phone,
    nif,
    role
  });

  // Return created user (without password hash)
  res.status(201).json({
    id: created.id,
    email: created.email,
    full_name: created.full_name,
    phone: created.phone,
    nif: created.nif,
    role: created.role,
    created_at: created.created_at
  });
});
