import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import productRoutes from './routes/productRoutes.js';
import { requestLogger } from './middlewares/loggerMiddleware.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middlewares de aplicación
app.use(cors()); // Habilita comunicación con el Frontend (Vite)
app.use(express.json()); // Permite leer JSON en las peticiones POST/PUT
app.use(requestLogger); // Loguea cada petición en consola

// 2. Rutas
app.use('/api/products', productRoutes);

// 3. Manejo de errores (Middleware final)
app.use(errorHandler);

// 4. Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});