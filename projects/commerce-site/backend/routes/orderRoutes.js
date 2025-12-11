// backend/routes/orderRoutes.js
import { Router } from 'express';
import { protect, admin } from '../middlewares/authMiddleware.js';
import { createOrder, getOrders, getOrder } from '../controllers/orderController.js';

const router = Router();

// Place an order (must be logged in)
router.post('/', protect, createOrder);

// Get orders (admin sees all, user sees their own)
router.get('/', protect, getOrders);

// Get a single order
router.get('/:id', protect, getOrder);

export default router;
