// backend/schemas/authSchema.js
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

/**
 * Schema for admin creating a user
 * Admin will provide: email, password, phone (optional), nif, full_name (optional), role (optional)
 */
export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  nif: z.string().min(1),
  role: z.enum(['admin', 'customer']).optional()
});
