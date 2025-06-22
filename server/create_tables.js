const pool = require("./db");

async function create() {
  const query = `
  CREATE TABLE IF NOT EXISTS vocabulary (
    id SERIAL PRIMARY KEY,
    word TEXT UNIQUE NOT NULL,
    meaning TEXT NOT NULL,
    example TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;
  await pool.query(query);
  console.log("✅ vocabulary table ready");
  pool.end();
}

create().catch(err => console.error("❌ Table error:", err));
