const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../database/database");
const Role = require("../passport/_helpers/role");

function checkUser(username, password, userType) {
  return new Promise((resolve, reject) => {
    db.ref(userType)
      .orderByKey()
      .equalTo(username)
      .once("value", (snapshot) => {
        console.log("user " + username + " in " + userType);
        console.log(snapshot.exists());
        if (!snapshot.exists()) {
          reject();
        }
        snapshot.forEach((user) => {
          if (password === user.val().password) {
            console.log("resolve");
            resolve(user.val());
          }
          reject();
        });
      });
  });
}

async function validate(username, password, done) {
  var user = await checkUser(username, password, "superusers").catch(() => null);
  exports.role = Role.Superuser;

  if (!user) {
    user = await checkUser(username, password, "coordinators").catch(() => null);;
    exports.role = Role.Coordinator;
  }

  if (user) {
    done(null, { id: username, name: user.name });
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
