const express = require('express');
const multer = require('multer');
const ProductRequest = require('../models/productRequest.modles');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Create a new product request
router.post('/', upload.single('image'), async (req, res) => {
  const { name, price, maker } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;

  if (!name || !price || !maker || !req.file) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newRequest = new ProductRequest({ name, price, maker, imageUrl });
  await newRequest.save();
  res.status(201).json(newRequest);
});

// Get all product requests
router.get('/', async (req, res) => {
  const requests = await ProductRequest.find();
  res.json(requests);
});

// Approve a product request
router.post('/:id/approve', async (req, res) => {
  const request = await ProductRequest.findById(req.params.id);
  if (!request) return res.status(404).json({ message: 'Request not found' });

  const Product = require('../models/product.models');
  const newProduct = new Product({
    name: request.name,
    price: request.price,
    description: request.maker,
    imageUrl: request.imageUrl,
  });

  await newProduct.save();
  await request.deleteOne(); // Corrected line
  res.status(200).json(newProduct);
});

module.exports = router;