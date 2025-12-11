import pool from './pool.js';

// Hashed passwords for 'Admin123!' and 'User456!'
const ADMIN_PASS_HASH = '$2b$10$Ew.7p/pPq1f2N6p.v5y/e.p.j9Fk.S1e.P'; 
const USER_PASS_HASH = '$2b$10$QjY8p/mSg2f3O7r.w6x/f.p.j9Gk.T2e.Q'; 

const SQL = `
-- Drop tables safely in reverse dependency order
DROP TABLE IF EXISTS order_products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Create USERS table (Mandatory for Auth & Roles)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL DEFAULT 'public', -- 'admin', 'validated', 'public'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create CATEGORIES table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- 3. Create PRODUCTS table (Now with image_url and FKs)
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255), -- New field for product picture
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL, 
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL, -- Admin who created it
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create ORDERS table (Mandatory for new feature)
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE RESTRICT, -- User who placed the order
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending'
);

-- SEED DATA

-- Seed Admin and Public User
INSERT INTO users (username, password_hash, email, role) VALUES 
  ('adminuser', '${ADMIN_PASS_HASH}', 'admin@commerce.com', 'admin'),
  ('publicuser', '${USER_PASS_HASH}', 'public@commerce.com', 'validated'); 

-- Seed Categories
INSERT INTO categories (name) VALUES ('Electronics'), ('Home'), ('Garden');

-- Seed Products (linking to the first user: adminuser, id=1)
INSERT INTO products (name, description, price, image_url, category_id, user_id) VALUES 
  ('Smart TV 50"', '4K TV with HDR and smart features.', 499.99, '/images/tv.jpg', 1, 1),
  ('3-seater sofa', 'Comfortable gray fabric sofa, perfect for living room.', 299.50, '/images/sofa.jpg', 2, 1),
  ('Lawnmower', '1200W Electric Lawnmower for small to medium gardens.', 89.90, '/images/mower.jpg', 3, 1);
`;

async function main() {
  console.log("Initializing database...");
  try {
    await pool.query(SQL);
    console.log("Tables created and data inserted correctly.");
  } catch (err) {
    console.error("Error filling in the database:", err);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

main();