// Dashboard page handlers
const multer = require("multer");
const passport = require("passport");
const path = require("path");
const Product = require("../models/productModel");

// Get the dashboard page
exports.getDashboard = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("dashboard", { products: products });
  } catch (err) {
    res.status(404).send(err);
  }
};

// Create a product
exports.createProuct = async (req, res) => {
  try {
    req.body.image = req.file.filename;
    const newProduct = await Product.create(req.body);
    res.redirect("back");
  } catch (err) {
    res.status(400).send(err);
  }
};

// Remove a product by giving the product's id
exports.removeProduct = async (req, res) => {
  try {
    const newProduct = await Product.findByIdAndDelete(req.params.id);
    res.redirect("back");
  } catch (err) {
    res.status(400).send(err);
  }
};
