// backend/routes/orderRoutes.js
import { Router } from 'express';
import { 
  getOrders, 
  getOrderById, 
  createOrder, 
  updateOrderStatus 
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = Router();

// Routes for /api/orders

// Client/Admin Read & Client Create
router.route('/')
  .get(protect, getOrders)      // GET /api/orders (Client: Mine, Admin: All)
  .post(protect, createOrder);  // POST /api/orders (Client: Place new order)

// Client/Admin Read One
router.route('/:id')
  .get(protect, getOrderById);  // GET /api/orders/:id (Client: My order, Admin: Any order)

// Admin Update Status
router.route('/:id/status')
  .put(protect, admin, updateOrderStatus); // PUT /api/orders/:id/status (Admin: Update order status)

export default router;