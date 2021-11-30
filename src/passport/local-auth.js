const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../database/database");
const Role = require("../passport/_helpers/role");

function checkUser(username, password, userType) {
  return new Promise((resolve, reject) => {
    console.log("looking for " + username + " in " + userType);
    db.collection(userType).doc(username).get().then((doc) => {
        if (!doc.exists) {
          reject();
          return;
        }
        if (password === doc.data().password) {
          resolve(doc.data());
          return;
        }
        reject();
        return;
      });
  });
  //var snapshot = db.collection(userType).doc(username).get()
}

async function validate(username, password, done) {
  var user = await checkUser(username, password, "superusuarios").catch(() => null);
  exports.role = Role.Superuser;

  if (!user) {
    user = await checkUser(username, password, "coordinadores").catch(() => null);;
    exports.role = Role.Coordinator;
  }

  if (user) {
    done(null, { id: username, name: user.name });
  } else {
    done(null, false, { message: "El usuario y/o contraseña son incorrectos" });
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
