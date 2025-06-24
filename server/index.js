const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// 👇 ADD THIS if missing
const vocabRoutes = require("./routes/vocab");
app.use("/api/vocab", vocabRoutes);

app.get("/", (req, res) => {
  res.send("It's running");
});
app.post("/test-post", (req, res) => {
  res.send("✅ POST request received!");
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
