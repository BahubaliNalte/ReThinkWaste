require('dotenv').config();
const express = require("express");
const session = require('express-session');
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const jwt = require('jsonwebtoken');
const { error } = require('console');


const app = express();
// Middleware setup
app.use(cors());
app.use(express.urlencoded({ extended: true })); // To handle form data
app.use(express.json()); // For JSON handling
app.use(cookieParser());


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

connectDB();






// Routes
app.use("/api/auth", authRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Home Route
app.get("/", (req, res) => {
  res.render("login", { error: null });
});

// Register page route
app.get("/register", (req, res) => {
  res.render("register", { error: null });
});

//login page route
app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// Products page route
app.get('/products', async (req, res) => {
     res.render('products', { error:null }); 
 });

// Pickup page Route
app.get('/pickup', async (req, res) => {
  res.render('pickup', { error:null }); 
});

// User dashboard route
app.get("/user", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.redirect("/login");
    res.render("userDashboard", { user: decoded });
  });
});

// Admin dashboard route
app.get("/admin", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== "admin") return res.redirect("/login");
    res.render("adminDashboard", { user: decoded });
  });
});




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
