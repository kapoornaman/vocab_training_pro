const express = require("express");
const router = express.Router();
const generateWords = require("../utils/generateWords");

// In-memory storage for vocabulary words (replace with database later)
let vocabularyStore = [];

// GET /api/vocab/all - get all vocabulary words
router.get("/all", (req, res) => {
  res.json(vocabularyStore);
});

// POST /api/vocab/generate - generate and store new words
router.post("/generate", async (req, res) => {
  try {
    const words = await generateWords();
    
    // Add generated words to in-memory store
    const wordsWithId = words.map(word => ({
      id: Date.now() + Math.random(), // Simple ID generation
      ...word,
      created_at: new Date().toISOString()
    }));
    
    vocabularyStore = [...wordsWithId, ...vocabularyStore];
    
    res.json(words);
  } catch (error) {
    console.error("❌ Error generating words:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
