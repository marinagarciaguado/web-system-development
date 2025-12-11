// backend/controllers/orderController.js
import * as orderModel from '../models/orderModel.js';
import * as productModel from '../models/productModel.js';

export async function createOrder(req, res, next) {
  try {
    // req.user set by protect middleware
    const userId = req.user?.userId || null; // admin may create with userId provided
    const { items } = req.body; // items: [ { product_id, quantity } ]

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain items.' });
    }

    // Build items with unit prices and compute total
    let total = 0;
    const detailedItems = [];
    for (const it of items) {
      const product = await productModel.getProductById(it.product_id);
      if (!product) return res.status(400).json({ error: `Product ${it.product_id} not found` });
      const unit_price = parseFloat(product.price);
      const quantity = parseInt(it.quantity, 10);
      if (quantity <= 0) return res.status(400).json({ error: 'Invalid quantity' });
      total += unit_price * quantity;
      detailedItems.push({ product_id: it.product_id, quantity, unit_price });
    }

    const order = await orderModel.createOrder(userId, total, detailedItems);
    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
}

export async function getOrders(req, res, next) {
  try {
    // If admin, return all. If normal user, return their orders.
    if (req.user?.role === 'admin') {
      const orders = await orderModel.getAllOrders();
      res.json({ orders });
    } else {
      const userId = req.user?.userId;
      const resOrders = await orderModel.getAllOrders(); // simple: filter by user_id
      const filtered = resOrders.filter(o => o.user_id === userId);
      res.json({ orders: filtered });
    }
  } catch (err) {
    next(err);
  }
}

export async function getOrder(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const order = await orderModel.getOrderById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Authorization: admin or owner
    if (req.user.role !== 'admin' && order.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const items = await orderModel.getOrderItems(id);
    res.json({ order, items });
  } catch (err) {
    next(err);
  }
}
