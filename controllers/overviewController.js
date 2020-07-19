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

// ADD A PRODUCT TO THE CART
exports.addToCart = async (req, res) => {
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  try {
    const product = await Product.findById(req.params.id);
    cart.add(product, product.id);
    req.session.cart = cart;

    res.redirect("back");
  } catch (err) {
    res.redirect("back");
  }
};

// REMOVE A PRODUCT FROM THE CART
exports.removeFromCart = (req, res) => {
  const cart = req.session.cart;
  cart.totalProducts -= cart.products[req.params.id].quantity;
  cart.totalPrice -= cart.products[req.params.id].price;
  cart.totalPrice = (Math.round(cart.totalPrice * 100) / 100).toFixed(2) * 1;
  delete cart.products[req.params.id];
  req.session.cart = cart;
  res.redirect("back");
};

// GET THE PRODUCTS IN THE CART
exports.getCart = (req, res) => {
  if (!req.session.cart) {
    res.status(200).render("cart", { products: null });
  } else {
    const cart = new Cart(req.session.cart);
    res.status(200).render("cart", {
      products: cart.productsArray(),
      totalPrice: cart.totalPrice,
    });
  }
};
