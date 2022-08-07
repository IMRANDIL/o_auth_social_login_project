const router = require("express").Router();
const { loginController } = require("../controller/login");

router.route("/login").get(loginController);

module.exports = router;
