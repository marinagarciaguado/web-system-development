import pool from './pool.js';
// Hashed password for 'Admin123!' - ensure you use a strong, unique secret for real apps
const ADMIN_PASSWORD_HASH = '$2b$10$Ew.7p/pPq1f2N6p.v5y/e.p.j9Fk.S1e.P'; 

const SQL = `
-- Drop tables safely to allow schema changes
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Create Users table (for Authentication)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- 2. Create Categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- 3. Create Products table with relations (Foreign Keys)
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL, 
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEED DATA

-- Seed Admin User
INSERT INTO users (username, password_hash, email)
VALUES ('adminuser', '${ADMIN_PASSWORD_HASH}', 'admin@commerce.com');

-- Seed Categories
INSERT INTO categories (name) VALUES 
  ('Electronics'), 
  ('Home'), 
  ('Garden');

-- Seed Products (linking to the first user with id=1)
INSERT INTO products (name, description, price, category_id, user_id) VALUES 
  ('Smart TV 50"', '4K TV with HDR', 499.99, 1, 1),
  ('3-seater sofa', 'Comfortable gray fabric sofa', 299.50, 2, 1),
  ('Lawnmower', '1200W Electric Lawnmower', 89.90, 3, 1);
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