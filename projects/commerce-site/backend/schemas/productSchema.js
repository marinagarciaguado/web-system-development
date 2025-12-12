// backend/schemas/productSchema.js
import { z } from 'zod';

/**
 * Schema for product ID validation
 */
export const IdSchema = z.object({
  id: z.string().regex(/^[0-9]+$/, "ID must be a positive integer.").transform(Number)
});

/**
 * Schema for creating and updating a product
 */
export const ProductSchema = z.object({
  name: z.string().min(3, "Product name is required and must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  price: z.number().min(0, "Price cannot be negative."),
  stock: z.number().int().min(0, "Stock must be a non-negative integer.").optional().default(0),
  image_url: z.string().url("Image URL must be a valid URL.").optional().nullable(),
  // [REMOVIDO] Se quita category_id
});