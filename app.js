const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongo")(session);
const exphbs = require("express-handlebars");
const flash = require("connect-flash");

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

// SESSION
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

// FLASH
app.use(flash());

// MIDDLEWARE FOR THE SESSION AND GLOBAL VARS
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  app.locals.totalProducts = 0;
  if (req.session.cart) {
    app.locals.totalProducts = req.session.cart.totalProducts;
  }
  next();
});
// ROUTES
app.use("/api/v1/products", productRouter);
app.use("/", overviewRouter);

module.exports = app;
