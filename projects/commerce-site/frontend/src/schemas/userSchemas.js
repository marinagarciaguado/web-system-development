// frontend/src/schemas/userSchemas.js
import { z } from 'zod';

// Esquema usado por el administrador para crear nuevos usuarios
export const AdminCreateUserSchema = z.object({
  // Validación de Email: Requerido y debe ser un formato de email válido.
  email: z.string().email("Invalid email address format."),
  
  // Validación de NIF: Requerido. No estamos haciendo una validación de formato estricta, solo que no esté vacío.
  nif: z.string().min(1, "NIF/CIF is required."),
  
  // Validación de Nombre Completo: Opcional.
  full_name: z.string().optional(),
  
  // Validación de Teléfono: Opcional.
  phone: z.string().optional(),
});