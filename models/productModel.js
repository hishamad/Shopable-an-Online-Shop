const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: {
      values: ["T-shirt", "Jacket", "Hoodie"],
      message: "A type is either T-shirt, Jacket or a Hoodie",
    },
  },
  sizes: {
    type: [String],
    required: [true, "A product must have at least one size"],
  },
  colors: {
    type: [String],
    required: [true, "A product must have at least one color"],
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
  },
  image: {
    type: String,
    required: [true, "A product must have an image"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  description: {
    type: String,
    trim: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
