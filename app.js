const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/markdown-editor", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Schema & Model
const ContentSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Content = mongoose.model("Content", ContentSchema);

// Routes
app.post("/save", async (req, res) => {
  const { content } = req.body;

  try {
    const newContent = new Content({ content });
    await newContent.save();
    console.log('content',newContent)
    res.json({ message: "Content saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save content", error });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
