// backend/routes/userRoutes.js
import { Router } from 'express';
import { createUser } from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = Router();

// Only admin can create users
router.post('/', protect, admin, createUser);

export default router;
