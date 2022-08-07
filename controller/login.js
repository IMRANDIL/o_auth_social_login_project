const User = require("../models/user");

exports.loginController = async (req, res) => {
  res.render("login");
};
