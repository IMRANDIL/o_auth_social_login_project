require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const cookie_session = require("cookie-session");
const mongoose = require("mongoose");
const passport = require("passport");
const passportConfig = require("./passport/passport");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookie_session({
    maxAge: 3 * 24 * 60 * 60 * 1000,
    keys: ["thisissupersecretkey"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

app.set("view engine", "ejs");

//routes...
app.get("/", isLoggedIn, (req, res) => {
  res.render("home");
});

app.use("/auth", require("./router/auth"));

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected to MongoDB 😆");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}😃`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
