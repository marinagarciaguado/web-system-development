// backend/controllers/orderController.js
import * as orderModel from '../models/orderModel.js';
import { CreateOrderSchema, UpdateOrderStatusSchema, IdSchema } from '../schemas/orderSchema.js';

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/**
 * GET /api/orders
 * Admin: Get all orders. Client: Get orders belonging to user.
 */
export const getOrders = asyncHandler(async (req, res) => {
    // The user object is attached by the protect middleware
    const { id: userId, role } = req.user; 
    let orders;

    if (role === 'admin') {
        // Admin gets all orders
        orders = await orderModel.findAllOrders();
    } else {
        // Client only gets their own orders
        orders = await orderModel.findOrdersByUserId(userId);
    }

    res.status(200).json(orders);
});

/**
 * GET /api/orders/:id
 * Admin: Get any order. Client: Get only their own order.
 */
export const getOrderById = asyncHandler(async (req, res) => {
    const idResult = IdSchema.safeParse(req.params);
    if (!idResult.success) {
        return res.status(400).json({ errors: idResult.error.issues });
    }
    const orderId = idResult.data.id;
    const { id: userId, role } = req.user;

    const order = await orderModel.findOrderById(orderId);

    if (!order) {
        return res.status(404).json({ error: 'Order not found.' });
    }
    
    // Security check: Admin can see any order, customer can only see their own
    if (role !== 'admin' && order.user_id !== userId) {
        return res.status(403).json({ error: 'Not authorized to view this order.' });
    }

    res.status(200).json(order);
});

/**
 * POST /api/orders
 * Client: Create a new order (Protected)
 */
export const createOrder = asyncHandler(async (req, res) => {
    // 1. Validate the items array
    const result = CreateOrderSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.issues });
    }
    const { items } = result.data;
    const userId = req.user.id; // Get client ID from the JWT token

    // 2. The model handles calculating totals and creating order items
    const newOrder = await orderModel.createOrder(userId, items);

    res.status(201).json(newOrder);
});

/**
 * PUT /api/orders/:id/status
 * Admin: Update the status of an order
 */
export const updateOrderStatus = asyncHandler(async (req, res) => {
    // 1. Validate order ID
    const idResult = IdSchema.safeParse(req.params);
    if (!idResult.success) {
        return res.status(400).json({ errors: idResult.error.issues });
    }
    const orderId = idResult.data.id;
    
    // 2. Validate new status
    const statusResult = UpdateOrderStatusSchema.safeParse(req.body);
    if (!statusResult.success) {
        return res.status(400).json({ errors: statusResult.error.issues });
    }
    const { status } = statusResult.data;

    // 3. Update in database
    const updatedOrder = await orderModel.updateStatus(orderId, status);

    if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found for status update.' });
    }

    res.status(200).json({ 
        message: 'Order status updated successfully.',
        order: updatedOrder
    });
});

// DELETE is usually not implemented for orders, as 'cancelled' status is preferred.