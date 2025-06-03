const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;  // Ensure this is being pulled from your .env file
    if (!uri) {
      console.error("MongoDB URI is not defined in .env file");
      process.exit(1);
    }

    // Remove the deprecated options
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
