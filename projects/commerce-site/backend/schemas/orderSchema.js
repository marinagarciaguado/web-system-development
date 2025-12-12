// backend/schemas/orderSchema.js
import { z } from 'zod';

/**
 * Schema for a single item within an order
 */
export const OrderItemSchema = z.object({
  product_id: z.number().int().positive("Product ID must be a positive integer."),
  quantity: z.number().int().min(1, "Quantity must be at least 1.")
});

/**
 * Schema for creating a new order (Client)
 * The client only sends the list of items they want to buy.
 */
export const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema)
    .min(1, "Order must contain at least one item.")
});

/**
 * Schema for Admin updating the status of an order
 */
export const UpdateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'], "Invalid order status.")
});

/**
 * Schema for order ID validation
 */
export const IdSchema = z.object({
  id: z.string().regex(/^[0-9]+$/, "Order ID must be a positive integer.").transform(Number)
});