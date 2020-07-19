const express = require("express");
const overviewController = require("../controllers/overviewController");

const router = express.Router();

router.route("/").get(overviewController.getProducts);
router.route("/product/:id").get(overviewController.getProduct);
router.route("/add-to-cart/:id").get(overviewController.addToCart);
router.route("/remove-from-cart/:id").get(overviewController.removeFromCart);
router.route("/cart").get(overviewController.getCart);

module.exports = router;
