const local_auth = require("../passport/local-auth");
const db = require("../database/database");
const Role = require("../passport/_helpers/role");

exports.show_home_page = function(req, res, next) {
  const coll = (req.session.role == Role.Superuser) ? "superusuarios" : "coordinadores";
  db.collection(coll).doc(req.session.passport.user).get().then( (doc) => {
    res.render("home", {role: req.session.role, user: doc.data(), id: doc.id});
  });
};
