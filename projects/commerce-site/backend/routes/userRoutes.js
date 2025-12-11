// backend/routes/userRoutes.js
import { Router } from 'express';
// UPDATE: Use the new function name
import { adminCreateClient } from '../controllers/userController.js'; 
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = Router();

// Only admin can create clients
// UPDATE: Route uses the new controller
router.post('/', protect, admin, adminCreateClient);

export default router;