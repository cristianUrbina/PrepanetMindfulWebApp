const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../database/database");
const async = require("async");

function checkUser(username, password, userType) {
  return new Promise((resolve, reject) => {
    db.ref(userType)
      .orderByKey()
      .equalTo(username)
      .once("value", (snapshot) => {
        if (!snapshot.exists()) {
          reject();
        }
        snapshot.forEach((user) => {
          if (password === user.val().password) {
            resolve(true);
          }
          reject();
        });
      });
  });
}

async function validate(username, password, done) {
  var isSuperuser = await checkUser(username, password, "super_users").catch(() => false);
  var isCoordinator = false;
  if (!isSuperuser) {
    isCoordinator = await checkUser(username, password, "coordinators").catch(() => false);;
  }
  if (isSuperuser || isCoordinator) {
    done(null, { id: 1, name: username });
  } else {
    done(null, false);
  }
}

passport.use(new LocalStrategy(validate));

// Serializacion
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserializacion
passport.deserializeUser(function (id, done) {
  done(null, { id: 1, name: "Cody" });
});

exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
