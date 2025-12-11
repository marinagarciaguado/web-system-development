// backend/routes/authRoutes.js
import { Router } from 'express';
// UPDATE: Import the correct function names from authController.js
import { loginUser, setInitialPassword } from '../controllers/authController.js';
// REMOVED: validateLogin as validation is now handled inside the controller

const router = Router();

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { token }
 */
// UPDATE: Using the loginUser function
router.post('/login', loginUser);

/**
 * POST /api/auth/set-password
 * NEW: Public endpoint for client to set initial password using the activation token.
 * Body: { token, password }
 * Returns: { message, token, user }
 */
router.post('/set-password', setInitialPassword);

export default router;