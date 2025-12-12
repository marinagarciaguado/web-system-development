// backend/models/orderModel.js
import pool from '../db/pool.js';

// --- Read Operations ---

/**
 * Admin: Fetches all orders with user and item summary
 */
export async function findAllOrders() {
    const query = `
        SELECT 
            o.id, o.status, o.total, o.created_at, o.contact_email,
            u.full_name AS client_name, u.email AS client_email,
            COUNT(oi.id) AS total_items
        FROM orders o
        LEFT JOIN users u ON o.user_id = u.id
        LEFT JOIN order_items oi ON o.id = oi.order_id
        GROUP BY o.id, u.full_name, u.email
        ORDER BY o.created_at DESC;
    `;
    const res = await pool.query(query);
    return res.rows;
}

/**
 * Client: Fetches orders belonging to a specific user
 */
export async function findOrdersByUserId(userId) {
    const query = `
        SELECT 
            o.id, o.status, o.total, o.created_at, o.contact_email,
            COUNT(oi.id) AS total_items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE o.user_id = $1
        GROUP BY o.id
        ORDER BY o.created_at DESC;
    `;
    const res = await pool.query(query, [userId]);
    return res.rows;
}

/**
 * Fetches a single order including all its items
 */
export async function findOrderById(orderId) {
    const orderQuery = `
        SELECT 
            o.id, o.user_id, o.status, o.total, o.created_at, o.contact_email,
            u.full_name AS client_name, u.email AS client_email
        FROM orders o
        LEFT JOIN users u ON o.user_id = u.id
        WHERE o.id = $1;
    `;
    const orderRes = await pool.query(orderQuery, [orderId]);
    const order = orderRes.rows[0];

    if (!order) return null;

    const itemsQuery = `
        SELECT 
            oi.quantity, oi.unit_price,
            p.name AS product_name, p.id AS product_id
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = $1;
    `;
    const itemsRes = await pool.query(itemsQuery, [orderId]);
    
    order.items = itemsRes.rows;
    return order;
}

// --- Status Update Operation ---

/**
 * Admin: Updates the status of a specific order
 */
export async function updateStatus(orderId, status) {
    const query = `
        UPDATE orders
        SET status = $1
        WHERE id = $2
        RETURNING id, status, total, created_at, user_id;
    `;
    const res = await pool.query(query, [status, orderId]);
    return res.rows[0];
}

// --- Create Operation (Transaction) ---

/**
 * Client: Creates a new order and associated items in a single transaction.
 * Also updates product stock.
 */
export async function createOrder(userId, items) {
    // 1. Start a transaction using a client connection for atomicity
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 2. Fetch price and stock for all requested products
        const productIds = items.map(item => item.product_id);
        const productsRes = await client.query(
            // Fetches data for all products in one query
            `SELECT id, price, stock FROM products WHERE id = ANY($1::int[])`,
            [productIds]
        );
        const availableProducts = productsRes.rows.reduce((acc, p) => {
            acc[p.id] = { price: parseFloat(p.price), stock: p.stock };
            return acc;
        }, {});

        let orderTotal = 0;
        const orderItemsToInsert = [];
        const stockUpdates = [];

        // 3. Validate stock and calculate total (business logic)
        for (const item of items) {
            const product = availableProducts[item.product_id];
            
            if (!product) {
                throw new Error(`Product with ID ${item.product_id} not found.`);
            }
            if (item.quantity > product.stock) {
                // This error will trigger the transaction rollback
                throw new Error(`Insufficient stock for product ${item.product_id}. Available: ${product.stock}, Requested: ${item.quantity}`);
            }

            const itemPrice = product.price; 
            const itemTotal = itemPrice * item.quantity;
            orderTotal += itemTotal;

            orderItemsToInsert.push({
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: itemPrice 
            });

            stockUpdates.push({
                id: item.product_id,
                new_stock: product.stock - item.quantity
            });
        }

        // 4. Create the main order entry
        const orderRes = await client.query(
            `INSERT INTO orders (user_id, total, contact_email)
             VALUES ($1, $2, $3)
             RETURNING id, created_at, status`,
            [userId, orderTotal, null]
        );
        const orderId = orderRes.rows[0].id;
        const newOrder = { 
            id: orderId, 
            user_id: userId, 
            total: orderTotal, 
            items: [], 
            ...orderRes.rows[0] 
        };

        // 5. Insert order items
        for (const item of orderItemsToInsert) {
            await client.query(
                `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
                 VALUES ($1, $2, $3, $4)`,
                [orderId, item.product_id, item.quantity, item.unit_price]
            );
            newOrder.items.push(item);
        }

        // 6. Update product stock (decrement)
        for (const update of stockUpdates) {
            await client.query(
                // Use a safety check here to ensure stock doesn't go negative if another order slipped in (though the transaction helps prevent this)
                `UPDATE products SET stock = $1 WHERE id = $2 AND stock >= $1`, 
                [update.new_stock, update.id]
            );
        }

        // 7. Commit the transaction (all changes saved)
        await client.query('COMMIT');
        return newOrder;

    } catch (error) {
        // If an error (like insufficient stock) occurred, undo all changes
        await client.query('ROLLBACK');
        throw error;
    } finally {
        // Release the client connection back to the pool
        client.release();
    }
}