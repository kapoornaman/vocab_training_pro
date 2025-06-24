const express = require("express");
const router = express.Router();
const generateWords = require("../utils/generateWords");

// POST /api/vocab/generate
router.post("/generate", async (req, res) => {
  try {
    const words = await generateWords();
    res.json(words);
  } catch (error) {
    console.error("❌ Error generating words:", error.message);
    res.status(500).json({ error: error.message });
  }
  
});

module.exports = router;
