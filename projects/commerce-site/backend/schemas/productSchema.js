// backend/schemas/productSchema.js
import { z } from 'zod';

/**
 * Schema for product ID validation
 * Used for GET /products/:id, PUT /products/:id, DELETE /products/:id
 */
export const IdSchema = z.object({
  id: z.string().regex(/^[0-9]+$/, "ID must be a positive integer.").transform(Number)
});

/**
 * Schema for creating a new product (POST /products)
 * and updating an existing product (PUT /products/:id)
 */
export const ProductSchema = z.object({
  name: z.string().min(3, "Product name is required and must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  // Price must be a number greater than or equal to 0
  price: z.number().min(0, "Price cannot be negative."),
  // Stock must be an integer greater than or equal to 0
  stock: z.number().int().min(0, "Stock must be a non-negative integer.").optional().default(0),
  // Image URL is optional, or can be a URL string
  image_url: z.string().url("Image URL must be a valid URL.").optional().nullable()
});