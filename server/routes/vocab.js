const express = require("express");
const router = express.Router();
const pool = require("../db");

// Route to get all vocabulary for now (for testing)
router.get("/all", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM vocabulary");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
const generateWordsFromOllama = require("../utils/generateWords");

router.post("/generate", async (req, res) => {
  try {
    const words = await generateWordsFromOllama();
    const results = [];

    for (const { word, meaning, example } of words) {
      const result = await pool.query(
        "INSERT INTO vocabulary (word, meaning, example) VALUES ($1, $2, $3) ON CONFLICT (word) DO NOTHING RETURNING *",
        [word, meaning, example]
      );
      if (result.rows.length > 0) {
        results.push(result.rows[0]);
      }
    }

    res.json(results);
  } catch (err) {
    console.error("❌ Error generating words:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});
