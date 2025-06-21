const pool = require("./db");

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Connected to DB! Current Time:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Database connection error:", err);
  } finally {
    await pool.end();
  }
})();
