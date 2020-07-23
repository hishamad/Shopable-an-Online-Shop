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
  .route("/login")
  .get(dashboardController.login)
  .post(dashboardController.authenticate);

router.route("/logout").get(dashboardController.logout);
router
  .route("/create")
  .post(
    dashboardController.uploadProductImage,
    dashboardController.createProuct
  );

router.route("/remove-product/:id").get(dashboardController.removeProduct);

module.exports = router;
