const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Server is running and connected to MongoDB!" });
});

// Example login route (dummy for now)
app.post("/api/login", (req, res) => {
  const { emailOrUsername, password } = req.body;

  // Example: Replace this with MongoDB user lookup later
  if (emailOrUsername === "test@example.com" && password === "123456") {
    return res.json({ message: "Login successful" });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
