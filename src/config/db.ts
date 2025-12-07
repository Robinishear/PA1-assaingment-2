import { Pool } from "pg";
import config from "./index.js";

export const pool = new Pool({ connectionString: config.CONNECTION_STRING });

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL CHECK (email = LOWER(email)),
      password VARCHAR(200) NOT NULL CHECK (char_length(password) >= 6),
      phone VARCHAR(25) NOT NULL,
      role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'customer'))
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(100) NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
      registration_number VARCHAR(200) UNIQUE NOT NULL,
      daily_rent_price NUMERIC NOT NULL CHECK (daily_rent_price > 0),
       availability_status TEXT NOT NULL DEFAULT 'available' CHECK (availability_status IN ('available', 'booked'))
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
    rent_start_date TIMESTAMP NOT NULL,
    rent_end_date TIMESTAMP NOT NULL,
    total_price NUMERIC NOT NULL CHECK (total_price > 0),
    status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'returned')),
    CONSTRAINT rent_date_check CHECK (rent_end_date > rent_start_date)
  );
`);
};

export default initDB;
