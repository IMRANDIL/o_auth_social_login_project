const User = require("../models/user");

exports.loginController = async (req, res) => {
  res.render("login");
};

exports.googleLoginController = async (req, res) => {
  res.send("login with google");
};
