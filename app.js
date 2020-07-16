const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const productRouter = require("./routes/productRoutes");

// Express
const app = express();

// MORGAN
const mode = process.env.NODE_ENV;
if (mode === "development") {
  app.use(morgan("dev"));
}

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use("/api/v1/products", productRouter);

module.exports = app;
