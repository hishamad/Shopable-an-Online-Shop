const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongo")(session);
const exphbs = require("express-handlebars");
const flash = require("connect-flash");
const passport = require("passport");
require("./config/passport")(passport);
const productRouter = require("./routes/productRoutes");
const overviewRouter = require("./routes/overviewRouter");
const dashboardRouter = require("./routes/dashboardRouter");

const app = express();
const mode = process.env.NODE_ENV;

// STATIC FILES
app.use(express.static("public/img/products"));

// EXPRESS HANDLEBARS
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// MORGAN
if (mode === "development") {
  app.use(morgan("dev"));
}

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

// Passport
app.use(passport.initialize());
app.use(passport.session());

// FLASH
app.use(flash());

// MIDDLEWARE FOR THE SESSION AND GLOBAL VARS
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  app.locals.totalQuantity = 0;
  if (req.session.cart) {
    app.locals.totalQuantity = req.session.cart.totalQuantity;
  }
  next();
});

// ROUTES
app.use("/api/v1/products", productRouter);
app.use("/", overviewRouter);
app.use("/dashboard", dashboardRouter);

module.exports = app;
