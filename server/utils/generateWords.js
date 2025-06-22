const fetch = require("node-fetch");

async function generateWordsFromOllama() {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3", // or whatever you’ve got running
      prompt: `Give me 3 rare but useful English words. Reply in JSON like:
[
  { "word": "elucidate", "meaning": "to make something clear", "example": "She asked him to elucidate his point." },
  { "word": "ephemeral", "meaning": "lasting for a very short time", "example": "Youth is ephemeral." },
  ...
]`,
      stream: false
    })
  });

  const data = await response.json();
  try {
    const text = data.response.trim();
    const words = JSON.parse(text);
    return words;
  } catch (err) {
    console.error("❌ Failed to parse Ollama JSON:", err.message);
    console.log("Raw Ollama response:", data.response);
    return [];
  }
}

module.exports = generateWordsFromOllama;
