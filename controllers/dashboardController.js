// Dashboard page handlers
const multer = require("multer");
const passport = require("passport");
const path = require("path");
const Product = require("../models/productModel");

// Multer for uploading an image
const multerStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/img/products");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImage = upload.single("image");

// Rendering the login page
exports.login = (req, res) => {
  res.render('login');
};

// Redirecting to the login page when logging out
exports.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/dashboard/login');
};

// Authentication checking
exports.authenticate = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/dashboard/login',
    failureFlash: true,
    successFlash: true
  })(req, res, next);
};

exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Please Log in to view the dashboard');
  res.redirect('/dashboard/login');
};

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
