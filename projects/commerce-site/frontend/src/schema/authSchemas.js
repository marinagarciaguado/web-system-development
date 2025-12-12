// src/schemas/authSchemas.js
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address format."),
  password: z.string().min(1, "Password is required."),
});