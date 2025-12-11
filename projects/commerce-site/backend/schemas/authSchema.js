import { z } from 'zod';

// Helper constant for secure password requirements
const passwordRequirements = z.string()
    .min(8, 'Password must be at least 8 characters long.') 
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character.');

// Schema for validating user registration (Required: Secure password requirements)
export const RegisterSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long.'),
    email: z.string().email('Invalid email address format.'),
    password: passwordRequirements,
}).strict();

// Schema for login 
export const LoginSchema = z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.string().min(1, 'Password is required.'),
}).refine(data => data.username || data.email, {
    message: 'Either username or email is required for login.'
});

// Schema for products (used by ProductController)
export const ProductSchema = z.object({
    name: z.string().min(3, 'Product name must be at least 3 characters long.'),
    description: z.string().min(10, 'Description must be at least 10 characters long.'),
    price: z.number().positive('Price must be a positive number.'),
    category_id: z.number().int().positive('Category ID must be a positive integer.'),
    image_url: z.string().url('Image URL must be a valid URL.').optional()
}).strict(); 

// Schema for validating ID parameter from URL
export const IdSchema = z.number().int().positive('ID must be a positive integer.');