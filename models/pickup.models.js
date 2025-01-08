const mongoose = require("mongoose");


// Mongoose Schema and Model
const pickupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  datePickup: { type: Date, required: true },
  timePickup: { type: String, required: true },
  addressPickup: { type: String, required: true },
  extraNotes: { type: String },
  wasteType: { type: String, required: true },
  quantity: { type: String, required: true },
}, { timestamps: true });

const Pickup = mongoose.model('Pickup', pickupSchema);
module.exports = Pickup;