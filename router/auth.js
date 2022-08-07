const router = require("express").Router();
const {
  loginController,
  googleLoginController,
} = require("../controller/login");

router.route("/login").get(loginController);
router.route("/google").get(googleLoginController);

module.exports = router;
