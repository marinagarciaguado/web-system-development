// backend/db/populatedb.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './pool.js';
import bcrypt from 'bcrypt';
import 'dotenv/config';

// Fix for Windows paths with import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runInitSql() {
  const initPath = path.join(__dirname, 'init.sql');
  const sql = fs.readFileSync(initPath, 'utf8');
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
  await pool.query(
    `INSERT INTO users (email, password_hash, full_name, phone, nif, role)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [adminEmail, pwHash, adminName, adminPhone, adminNif, 'admin']
  );
  console.log(`Seeded admin user: ${adminEmail}`);
}

async function main() {
  try {
    console.log('Running DB init script...');
    await runInitSql();
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
