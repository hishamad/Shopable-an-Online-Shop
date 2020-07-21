const express = require("express");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

router
  .route("/")
  .get(
    dashboardController.checkAuthenticated,
    dashboardController.getDashboard
  );

router
  .route("/create")
  .post(
    dashboardController.uploadProductImage,
    dashboardController.createProuct
  );

router.route("/remove-product/:id").get(dashboardController.removeProduct);

module.exports = router;
