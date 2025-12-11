// backend/schemas/authSchema.js
import { z } from 'zod';

export const LoginSchema = z.object({
  // Since you use email/password to login, this schema is fine. 
  email: z.string().email(),
  password: z.string().min(8)
});

/**
 * Schema for Admin creating a Client (B2B User)
 * Admin provides minimal info.
 */
export const CreateUserSchema = z.object({
  email: z.string().email("Invalid email address.").min(1, "Email is required."),
  full_name: z.string().min(3, "Full name must be at least 3 characters.").optional().nullable(),
  phone: z.string().optional().nullable(),
  // NIF is the required Spanish business ID (correct, it's the identification number)
  nif: z.string().min(9, "NIF/ID must be at least 9 characters long."),
  // The Admin sets the role, defaulting to 'customer'
  role: z.enum(['admin', 'customer']).optional().default('customer') 
});

/**
 * NEW: Schema for the client setting their initial password via a token link.
 */
export const SetPasswordSchema = z.object({
  // This is the secure token received via email
  token: z.string().min(1, "Activation token is required."), 
  // Recommended secure password requirements
  password: z.string().min(10, "Password must be at least 10 characters long.")
    .regex(/[a-z]/, "Password must contain a lowercase letter.")
    .regex(/[A-Z]/, "Password must contain an uppercase letter.")
    .regex(/[0-9]/, "Password must contain a number.")
    .regex(/[^a-zA-Z0-9]/, "Password must contain a special character."), 
});