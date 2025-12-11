import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// NEW IMPORTS
import { unknownEndpoint } from './middlewares/unknownEndpointMiddleware.js'; 
import authRoutes from './routes/authRoutes.js'; // Will be created soon
import { requestLogger } from './middlewares/loggerMiddleware.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js'; // Already existed

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Application-Level Middlewares (ORDER IS CRITICAL!)
app.use(cors()); // CORS must be first
app.use(express.json()); // Body parser must come before loggers/controllers
app.use(requestLogger); // Logger must come after body parser to see the body

// 2. Routes (ORDER: Auth should often come before other APIs for early processing)
app.use('/api/auth', authRoutes); // Auth routes (login/register)
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);   // admin-only user creation
app.use('/api/orders', orderRoutes); // create/get orders

// 3. 404 Handler / Unknown Endpoint (Must be placed before the final Error Handler)
app.use(unknownEndpoint); 

// 4. Global Error Handler (The final middleware)
app.use(errorHandler);

// 5. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});