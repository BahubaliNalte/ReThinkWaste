const express = require('express');
const Order = require('../models/order.models');
const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  const { cart, name, address, phone, payment } = req.body;
  const newOrder = new Order({ cart, name, address, phone, payment });
  await newOrder.save();
  res.status(201).json(newOrder);
});

// Get all orders
router.get('/', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;