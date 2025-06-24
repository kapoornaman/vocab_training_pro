const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function generateWords() {
  const response = await fetch("http://127.0.0.1:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt: `
Give me 3 different random advanced English vocabulary words.

For each word, include:
- word
- meaning
- example usage

Reply only with a valid JSON array like this:
[
  { "word": "loquacious", "meaning": "tending to talk a lot", "example": "He was a loquacious dinner guest." },
  { "word": "abstruse", "meaning": "difficult to understand", "example": "The theory was too abstruse for most students." },
  { "word": "magnanimous", "meaning": "generous or forgiving", "example": "She was magnanimous in victory." }
]

Do not reuse previous words. Do not wrap in markdown. Do not explain anything.
`,
      stream: false,
    }),
  });

  const data = await response.json();
  const text = data.response?.trim();

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("❌ JSON Parse Failed. Response was:", text);
    throw new Error("Invalid JSON from Ollama.");
  }
}

module.exports = generateWords;
