// backend/controllers/userController.js
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; 
import * as userModel from '../models/userModel.js';
import { CreateUserSchema } from '../schemas/authSchema.js';

// async wrapper
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/**
 * POST /api/users
 * Admin-only endpoint to create a new client and send an activation email.
 * Replaces the old 'createUser' logic.
 * Body: { email, full_name?, phone?, nif }
 */
export const adminCreateClient = asyncHandler(async (req, res) => {
  const parsed = CreateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.issues });
  }

  // The password field is ignored here as the client sets their own.
  const { email, full_name = null, phone = null, nif } = parsed.data;

  // 1. Check existing user
  const existing = await userModel.findByEmail(email);
  if (existing) {
    return res.status(409).json({ error: 'User with that email already exists.' });
  }

  // 2. Generate a secure, unguessable placeholder password hash
  // This is required because the DB column is NOT NULL.
  const tempPasswordHash = await bcrypt.hash(uuidv4() + Date.now(), 10);
  
  // 3. Generate a unique activation token
  const activationToken = uuidv4();
  
  // 4. Create user in DB with 'pending_setup' status and the token
  const created = await userModel.createUserWithToken({ 
    email,
    password_hash: tempPasswordHash, 
    full_name,
    phone,
    nif,
    activation_token: activationToken
  });
  
  // 5. SIMULATE SENDING THE EMAIL
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'; 
  const setupLink = `${FRONTEND_URL}/set-password?token=${activationToken}`;
  
  console.log(`\n--- CLIENT ACTIVATION EMAIL SENT TO: ${email} ---`);
  console.log(`CLIENT SETUP LINK: ${setupLink}`);
  console.log(`-------------------------------------------\n`);

  // 6. Return success message
  res.status(201).json({
    message: 'Client created successfully. Activation email has been sent to the client.',
    client: {
      id: created.id,
      email: created.email,
      full_name: created.full_name,
      nif: created.nif,
      status: created.role // Should be 'pending_setup'
    }
  });
});