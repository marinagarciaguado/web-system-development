// backend/routes/productRoutes.js
import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = Router();

// Public
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected — only admin can create/update/delete
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
