// frontend/src/schemas/productSchemas.js
import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(3, "Product name is required and must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  
  // CORRECCIÓN: Usar coerce.number() para simplificar la validación de precio
  price: z.coerce.number({invalid_type_error: "Price must be a valid number."})
    .min(0, "Price cannot be negative."),
    
  // CORRECCIÓN: Usar coerce.number() para simplificar la validación de stock
  stock: z.coerce.number({invalid_type_error: "Stock must be a valid integer."})
    .int("Stock must be an integer.")
    .min(0, "Stock must be a non-negative integer.").optional(),
    
  image_url: z.string().url("Image URL must be a valid URL.").optional().or(z.literal('')),
});