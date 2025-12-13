// backend/db/populatedb.js (Reemplaza este archivo completo)
import 'dotenv/config'; 
import pool from './pool.js'; 
import bcrypt from 'bcrypt';

// --- SQL Queries ---

// Query para crear las tablas
const initSql = `
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS orders;
    -- DROP TABLE IF EXISTS categories; -- No necesitamos esta tabla
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;

    -- CREATE TABLE categories (
    --     id SERIAL PRIMARY KEY,
    --     name VARCHAR(255) NOT NULL UNIQUE
    -- );

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL, /* <-- CRÍTICO */
        full_name VARCHAR(255),
        phone VARCHAR(30),           /* <-- DEBE EXISTIR */
        nif VARCHAR(30),             /* <-- DEBE EXISTIR */
        role VARCHAR(50) NOT NULL DEFAULT 'customer',
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
        activation_token VARCHAR(36) UNIQUE, 
        token_expires_at TIMESTAMP
    );

    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
        stock INTEGER NOT NULL DEFAULT 0,
        image_url TEXT,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
        -- REMOVIDO: category_id INTEGER REFERENCES categories(id),
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        total_amount NUMERIC(10, 2) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
    );

    CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE, -- Corregido a CASCADE
        quantity INTEGER NOT NULL,
        price_at_order NUMERIC(10, 2) NOT NULL
    );
`;

// --- Functions ---

async function runInitSql() {
    console.log('Running DB init script...');
    try {
        await pool.query(initSql);
        console.log('DB init script executed successfully.');
    } catch (error) {
        console.error('Error executing init SQL:', error);
        throw error;
    }
}

async function seedAdminUser() {
    console.log('Seeding admin user...');
    try {
        const email = 'admin@capondegalera.com';
        const passwordHash = await bcrypt.hash('adminpassword', 10); // Contraseña por defecto

        const result = await pool.query(
            `INSERT INTO users (email, password_hash, full_name, role)
             VALUES ($1, $2, $3, 'admin')
             ON CONFLICT (email) DO NOTHING
             RETURNING email`,
            [email, passwordHash, 'Admin User']
        );
        
        if (result.rows.length > 0) {
            console.log(`Seeded admin user: ${email}`);
        } else {
            console.log(`Admin user ${email} already exists, skipping seed insert.`);
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
        throw error;
    }
}

// --- Main Execution ---
async function main() {
    console.log(`DB USER: ${process.env.DB_USER} DB PASSWORD LENGTH: ${process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : 0}`);
    try {
        // 1. Inicializar Tablas (con el nuevo SQL sin categorías)
        await runInitSql();

        // 2. Insertar Usuario Administrador
        await seedAdminUser();
        
        console.log('Done.');
        console.log('\n--- PRUEBA EXITOSA ---');
        console.log('El backend ahora está configurado. Inicia el servidor con: npm run dev');
        console.log('Credenciales de Admin: admin@capondegalera.com / adminpassword');
        
    } catch (error) {
        console.error('Error seeding DB:', error);
    } finally {
        // Cierra el pool de conexiones al terminar
        await pool.end();
    }
}

main();