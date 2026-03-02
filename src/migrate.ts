import { Client } from 'pg';

async function migrate(): Promise<void> {
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  await client.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS greetings (
        id      INTEGER PRIMARY KEY,
        message TEXT    NOT NULL
      )
    `);

    await client.query(`
      INSERT INTO greetings (id, message)
      VALUES (1, 'Hello from Zerops!')
      ON CONFLICT (id) DO NOTHING
    `);

    console.log('Migration completed successfully');
  } finally {
    await client.end();
  }
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
