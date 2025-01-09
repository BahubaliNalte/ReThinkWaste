const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  payment: { type: String, required: true },
  cart: { type: Array, required: true }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;