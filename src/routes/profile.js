var express = require("express");
var router = express.Router();
const db = require("../database/database");

router.get("/:studentId", async function(req, res, next) {
  db.collection("estudiantes").doc(req.params.studentId).get().then(async function(doc){
    if(!doc.exists) {
      console.log("Not found user: " + req.params.studentId);
      res.redirect("/");
    }
    else {
      const campusSnapshot = await db.collection("Campus").where("id", "==", doc.data().id_campus).get();
      const coord = await db.collection("coordinadores").doc(doc.data().id_coordinador).get();
      campusSnapshot.forEach((campus) => {
        const user = doc.data();
        user.campus = campus.data().nombre;
        user.coordinador = coord.data().nombre_completo;
        res.render("profile", { role: req.session.role, student: user });
      });
    }
  });
});

module.exports = router;
