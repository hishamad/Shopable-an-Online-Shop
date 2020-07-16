const Product = require("../models/productModel");

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "Success",
      data: { products },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// GET A SPECIFIC PRODUCT BY GIVING AN ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: { product },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// CREATE A NEW PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      data: { shoe: newProduct },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid given data",
    });
  }
};

// DELETE A SPECIFIC PRODUCT BY GIVING AN ID
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Invalid given data",
    });
  }
};

// UPDATE A SPECIFIC PRODUCT BY GIVING AN ID AND THE UPDATED INFO
exports.UpdateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: { product },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
