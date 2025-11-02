require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require('./routes/product.routes');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Pickup = require("./models/pickup.models");
const Contact = require("./models/contactus.models");
const session = require('express-session');
const { error } = require('console');
const Product = require('./models/product.models');
const File = require('./models/file.models');
const orderRoutes = require('./routes/order.routes');
const productRequestRoutes = require('./routes/productRequest.routes');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.urlencoded({ extended: true })); // To handle form data
app.use(express.json()); // For JSON handling
app.use(cookieParser());
app.use(bodyParser.json());
app.use(helmet()); // Add security headers
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/product-requests', productRequestRoutes);

// Home Route
app.get("/", (req, res) => {
  res.render("login", { error: null });
});

// Register page route
app.get("/register", (req, res) => {
  res.render("register", { error: null });
});

// Login page route
app.get("/login", (req, res) => {
  res.render("login", { error: null });
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
  res.render('adminDashboard');
});

// Route to render products page
app.get('/products', async (req, res) => {
  const files = await File.find();
  const products = await Product.find(); // Fetch products from the database
  res.render('products', { files, products }); // Pass products to the template
});

// Route to render pickup page
app.get('/pickup', (req, res) => {
  res.render('pickup');
});

// Route to render dataRender page
app.get('/dataRender', async (req, res) => {
  try {
    const pickups = await Pickup.find(); // Fetch pickup data from the database
    const feedbacks = await Contact.find(); // Fetch feedback data from the database
    res.render('dataRender', { pickups, feedbacks }); // Pass both data to the template
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Pickup Route
app.post('/api/pickup', async (req, res) => {
  try {
    const { name, email, phone, datePickup, timePickup, addressPickup, extraNotes, wasteType, quantity } = req.body;

    // Create a new Pickup entry
    const newPickup = new Pickup({
      name,
      email,
      phone,
      datePickup,
      timePickup,
      addressPickup,
      extraNotes,
      wasteType,
      quantity,
    });

    // Save to database
    await newPickup.save();
    res.status(201).json({ message: 'Pickup scheduled successfully', pickup: newPickup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Contact us Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new Contact entry
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Save to database
    await newContact.save();
    res.status(201).json({ message: 'Contact form submitted successfully', contact: newContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// File upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Save file information to the database
  const newFile = new File({
    filename: file.filename,
    url: `/uploads/${file.filename}`,
    type: file.mimetype,
  });

  await newFile.save();

  res.status(200).json({ file: { url: newFile.url, type: newFile.type } });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
