const passport = require("passport");
const User = require("../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },

    (accessToken, refreshToken, profile, next) => {
      //call back...
      console.log(`my profile:`, profile._json.email);

      User.findOne({ email: profile._json.email }).then((user) => {
        if (user) {
          console.log("user already exist in db", user);
          //cookie token...

          next(null, user);
        } else {
          User.create({
            email: profile._json.email,
            name: profile._json.name,
            googleId: profile.id,
          })
            .then((user) => {
              console.log("user created", user);
              next(null, user);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

      //   next();
    }
  )
);
