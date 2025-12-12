// backend/routes/contactRoutes.js
import { Router } from 'express';
import { sendContactEmail } from '../controllers/contactController.js';

const router = Router();

// POST /api/contact - Public route
router.post('/', sendContactEmail);

export default router;