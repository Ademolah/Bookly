// server/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey";

// REGISTER
router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ fullName, email, password: hashed });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, user: { id: newUser._id, fullName, email } });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token, user: { id: user._id, fullName: user.fullName, email } });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
});

module.exports = router;
