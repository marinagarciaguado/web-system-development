// backend/db/populatedb.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg'; // Import pg package to access the Client object
const { Client } = pkg;
import pool from './pool.js'; // The application pool
import bcrypt from 'bcrypt';
import 'dotenv/config';

// Fix for Windows paths with import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates the target database if it doesn't exist.
 * This requires connecting to the default 'postgres' database first.
 */
async function ensureDatabaseExists(dbName, dbConfig) {
    // Connect to the default 'postgres' database
    const client = new Client({ 
        host: dbConfig.DB_HOST,
        port: dbConfig.DB_PORT,
        user: dbConfig.DB_USER,
        password: dbConfig.DB_PASSWORD,
        database: 'postgres', // Connect to default DB to check/create target DB
    });

    try {
        await client.connect();
        
        // Check if our target database exists
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

        if (res.rows.length === 0) {
            console.log(`Database ${dbName} does not exist. Creating...`);
            // Must use string interpolation for CREATE DATABASE command
            await client.query(`CREATE DATABASE ${dbName}`); 
            console.log(`Database ${dbName} created successfully.`);
        } else {
            console.log(`Database ${dbName} already exists. Skipping creation.`);
        }
    } catch (error) {
        // Only log connection/creation errors here; the main logic handles table creation/seeding
        console.error('Error in ensureDatabaseExists:', error.message);
    } finally {
        // Ensure the temporary client connection is closed
        await client.end();
    }
}

async function runInitSql() {
  const initPath = path.join(__dirname, 'init.sql');
  const sql = fs.readFileSync(initPath, 'utf8');
  // Use the application pool (which connects to commerce_db) to run table creation
  await pool.query(sql); 
}

async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL || 'owner@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234';
  const adminNif = process.env.ADMIN_NIF || '00000000A';
  const adminName = process.env.ADMIN_NAME || 'Owner';
  const adminPhone = process.env.ADMIN_PHONE || null;

  // Check if admin exists
  const res = await pool.query('SELECT id FROM users WHERE email = $1', [adminEmail]);
  if (res.rows.length > 0) {
    console.log('Admin already exists, skipping seed insert.');
    return;
  }

  const pwHash = await bcrypt.hash(adminPassword, 10);
  // This query also runs against the application pool (commerce_db)
  await pool.query(
    `INSERT INTO users (email, password_hash, full_name, phone, nif, role)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [adminEmail, pwHash, adminName, adminPhone, adminNif, 'admin']
  );
  console.log(`Seeded admin user: ${adminEmail}`);
}

// NEW FUNCTION TO ADD
async function seedCategory() {
  const categoryName = 'Produce'; 
  
  // Check if category exists
  const res = await pool.query('SELECT id FROM categories WHERE name = $1', [categoryName]);
  if (res.rows.length > 0) {
    console.log(`Category "${categoryName}" already exists, skipping seed insert.`);
    return;
  }

  await pool.query(
    `INSERT INTO categories (name)
     VALUES ($1)`,
    [categoryName]
  );
  console.log(`Seeded default category: ${categoryName}`);
}


async function main() {
  try {
    // Debug output is now correct
    console.log(`DB USER: ${process.env.DB_USER} DB PASSWORD LENGTH: ${process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : 0}`);
    
    // Define the DB config based on .env
    const dbConfig = {
      DB_HOST: process.env.DB_HOST,
      DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
    };
    
    // STEP 1: Ensure the database exists by connecting to 'postgres' (as updated in previous fix)
    // NOTE: If you are using the full fixed populatedb.js from before, keep the ensureDatabaseExists call.
    // For simplicity here, I will assume the database is now running.

    console.log('Running DB init script...');
    await runInitSql();
    
    // STEP 2: NEW CALL - Seed Category before Admin
    console.log('Seeding default category...');
    await seedCategory(); 
    
    // STEP 3: Seed Admin (Admin insert depends on runInitSql completing)
    console.log('Seeding admin user...');
    await seedAdmin();
    
    console.log('Done.');
  } catch (err) {
    console.error('Error seeding DB:', err);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

main();