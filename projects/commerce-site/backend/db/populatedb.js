import pool from './pool.js';

const SQL = `
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS categories;

  CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
  );

  CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
  );

  INSERT INTO categories (name) VALUES 
    ('Electronics'), 
    ('Home'), 
    ('Garden');

  INSERT INTO products (name, description, price, category_id) VALUES 
    ('Smart TV 50"', '4K TV with HDR', 499.99, 1),
    ('3-seater sofa', 'Comfortable gray fabric sofa', 299.50, 2),
    ('Lawnmower', '1200W Electric Lawnmower', 89.90, 3);
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