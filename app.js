const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

const productRouter = require("./routes/productRoutes");
const overviewRouter = require("./routes/overviewRouter");

// Express
const app = express();

// MORGAN
const mode = process.env.NODE_ENV;
if (mode === "development") {
  app.use(morgan("dev"));
}

// STATIC FILES
app.use(express.static("public/img/products"));

// EXPRESS HANDLEBARS
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use("/api/v1/products", productRouter);
app.use("/", overviewRouter);

module.exports = app;
