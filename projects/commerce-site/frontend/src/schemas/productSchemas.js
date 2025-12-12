// src/schemas/productSchemas.js
import { z } from 'zod';

// Base schema for creating and updating a product
export const ProductSchema = z.object({
  name: z.string().min(3, "Product name is required and must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  // Price needs to be coerced from a string (form input) to a number (API expectation)
  price: z.string()
    .refine(val => !isNaN(parseFloat(val)), { message: "Price must be a valid number." })
    .transform(val => parseFloat(val))
    .refine(val => val >= 0, { message: "Price cannot be negative." }),
    
  // Stock needs to be coerced from a string to an integer
  stock: z.string()
    .refine(val => !isNaN(parseInt(val)), { message: "Stock must be a valid integer." })
    .transform(val => parseInt(val))
    .refine(val => val >= 0, { message: "Stock must be a non-negative integer." }),

  // Se elimina category_id del frontend (ya no se requiere)
    
  image_url: z.string().url("Image URL must be a valid URL.").optional().or(z.literal('')),
});

// Schema for updating a product (requires ID)
export const UpdateProductSchema = ProductSchema.extend({
  id: z.number().int().positive("Product ID must be provided for update."),
});