// pakages and port
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
let port = 3000;

// schema models
const user = require("./models/users.js");

// sessions
const sessionOptions = {
  secret: "mysecretsession",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOptions));
app.use(flash());

//authenticate
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//route modules
const userRoute = require("./routes/user.js");
const listingsRoute = require("./routes/listing.js");
const reviewsRoute = require("./routes/review.js");

// connection to mongoDB database

const MONGO_URL = "mongodb://127.0.0.1:27017/AdventureExpress";
const mongoose = require("mongoose");
async function database_connect() {
  await mongoose.connect(MONGO_URL);
}

database_connect()
  .then(() => {
    console.log("DataBase Connection Sccessful...");
  })
  .catch((err) => {
    console.log(err);
  });

// to understand data send by client
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

//paths for files and views
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.static(path.join(__dirname, "/images")));

// for setting ejs and path and ejs-mate
app.set("views", path.join(__dirname, "/views/listings"));
app.set("view engine", "ejs");

// FlashMessage middlewares
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curr_user = req.user;
  next();
}); 

// for listning all requests
app.listen(port, () => {
  console.log(`Server Running : port : ${port}`);
});

// Diffrent Routes

app.use("/", userRoute);
app.use("/listings", listingsRoute);
app.use("/listings/:id/review", reviewsRoute);

//error handling middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "Some Error" } = err;
  console.log(`Status Code : ${status}\nMessage : ${message}`);
  res.render("error.ejs", { err });
});
