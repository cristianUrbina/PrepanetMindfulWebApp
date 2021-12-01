const local_auth = require("../passport/local-auth");
const db = require("../database/database");
const Role = require("../passport/_helpers/role");

exports.show_home_page = function(req, res, next) {
  const coll = (req.session.role == Role.Superuser) ? "superusuarios" : "coordinadores";
  db.collection(coll).doc(req.session.passport.user).get().then(async (doc) => {
    req.session.user = doc.data();
    if (req.session.role != Role.Superuser) {
      const campus = await db.collection("Campus").doc(doc.data().id_campus).get();
      req.session.user.campus = campus.data().nombre;
    } else {
      req.session.user.campus = "Nacional";
      req.session.user.id_campus = "NAC";
    }
    //console.log("req.session.user");
    //console.log(req.session.user)
    //console.log(req.session.user.campus)
    res.render("home", {role: req.session.role, user: req.session.user, id: doc.id});
  });
};
