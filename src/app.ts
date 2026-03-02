import express from 'express';
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const app = express();

app.get('/', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    const result = await pool.query(
      'SELECT message FROM greetings LIMIT 1',
    );
    const greeting = result.rows[0]?.message ?? 'No greeting found';

    res.status(200).json({
      type: 'nodejs',
      greeting,
      status: { database: 'OK' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(503).json({
      type: 'nodejs',
      greeting: null,
      status: { database: `ERROR: ${message}` },
    });
  }
});

export default app;
