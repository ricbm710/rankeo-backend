import { Pool } from "pg";

const pool = new Pool({
  //local
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.PORT),
});

export async function query<T>(
  text: string,
  params?: any[]
): Promise<{ rows: T[] }> {
  const result = await pool.query(text, params);
  return result;
}

// Test the connection on startup
pool
  .connect()
  .then(() => console.log(`✅ Connected to PostgreSQL`))
  .catch((err) => console.error("❌ Database connection error:", err));
