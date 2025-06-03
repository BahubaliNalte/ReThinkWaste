const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({ username, password, role });
    await newUser.save();
    res.redirect("/login");  // Redirect to login page after successful registration
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).render("login", { error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).render("login", { error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    res.cookie("token", token, { httpOnly: true });
    if (user.role === "admin") {
      res.redirect("/admin");
    } else {
      res.redirect("/user");
    }
  } catch (err) {
    console.error(err);
    res.status(500).render("login", { error: "Server error" });
  }
});

//  Logout route
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});



module.exports = router;
