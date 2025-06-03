const express = require('express');
const multer = require('multer');
const Product = require('../models/product.models');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Middleware to parse JSON bodies
router.use(express.json());

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// Create a new product
router.post('/', upload.single('image'), async (req, res) => {
  const { name, price, description } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;
  if (!name || !price || !description || !req.file) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const newProduct = new Product({ name, price, description, imageUrl });
  await newProduct.save();
  res.status(201).json(newProduct);
});

// Update a product by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  const { name, price, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
  if (!name || !price || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, price, description, ...(imageUrl && { imageUrl }) }, { new: true });
  res.json(updatedProduct);
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;