const express = require("express");
const overviewController = require("../controllers/overviewController");

const router = express.Router();

router.route("/").get(overviewController.getProducts);
router.route("/product/:id").get(overviewController.getProduct);

module.exports = router;
