const db = require("../database/database");

exports.show_profile = async function (req, res, next) {
  db.collection("estudiantes")
    .doc(req.params.studentId)
    .get()
    .then(function (doc) {
      if (!doc.exists) {
        console.log("Not found user: " + req.params.studentId);
        res.redirect("/");
      } else {
        db.collection("coordinadores").doc(doc.data().id_coordinador).get().then((coord) => {
          const user = doc.data();
          user.coordinador = coord.data().nombre_completo;
          res.render("profile", { role: req.session.role, student: user });
        });
      }
    });
};
