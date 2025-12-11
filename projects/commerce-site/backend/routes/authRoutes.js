// backend/routes/authRoutes.js
import { Router } from 'express';
import { login } from '../controllers/authController.js';
import { validateLogin } from '../schemas/authSchema.js';

const router = Router();

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { token }
 */
router.post('/login', validateLogin, login);

// If you later want logout endpoint or refresh tokens, add here.

export default router;
