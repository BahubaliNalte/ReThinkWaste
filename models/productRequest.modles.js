const mongoose = require('mongoose');

const productRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  maker: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

const ProductRequest = mongoose.model('ProductRequest', productRequestSchema);
module.exports = ProductRequest;