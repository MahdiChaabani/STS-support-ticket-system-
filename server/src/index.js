const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Temporary in-memory "user"
const dummyUser = {
  emailOrUsername: "test@example.com",
  password: "123456",
};

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Login route
app.post("/api/login", (req, res) => {
  const { emailOrUsername, password } = req.body;

  if (emailOrUsername === dummyUser.emailOrUsername && password === dummyUser.password) {
    return res.json({ message: "Login successful", user: { emailOrUsername } });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
