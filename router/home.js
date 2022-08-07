const { homeController } = require("../controller/home");

const router = require("express").Router();

router.route("/home").get(homeController);

module.exports = router;
