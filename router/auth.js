const router = require("express").Router();
const {
  loginController,
  googleLoginController,
} = require("../controller/login");

const passport = require("passport");

router.route("/login").get(loginController);

router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  googleLoginController
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.send(req.user);
});

module.exports = router;
