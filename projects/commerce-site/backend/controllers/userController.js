// backend/controllers/userController.js
import bcrypt from 'bcrypt';
import * as userModel from '../models/userModel.js';

export async function createUser(req, res, next) {
  try {
    const { email, password, full_name, role = 'customer' } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    const existing = await userModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'User with that email already exists.' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const user = await userModel.createUser({ email, password_hash, full_name, role });

    // Do not return password_hash
    res.status(201).json({ id: user.id, email: user.email, full_name: user.full_name, role: user.role });
  } catch (err) {
    next(err);
  }
}
