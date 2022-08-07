const User = require("../models/user");

exports.homeController = async (req, res) => {
  res.render("home");
};
