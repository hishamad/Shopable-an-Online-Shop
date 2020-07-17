const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

// GET THE PRODUCTS TO DISPLAY THEM ON THE HOME PAGE
exports.getProducts = async (req, res) => {
  try {
    let products = await Product.find();
    if (req.query.type) {
      products = await Product.find(req.query);
    }
    res.status(200).render("index", { products: products });
  } catch (err) {
    res.status(404).send(err);
  }
};

// GET ONE PRODUCT TO DISPLAY IT ON A SINGLE PAGE
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).render("product", product);
  } catch (err) {
    res.status(404).send(err);
  }
};
