const db = require("../database/database");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

exports.show = function (req, res, next) {
  const message = req.flash("file_error");
  res.render("updateStatus", { role: req.session.role, message: message });
}

exports.update_status = function (req, res, next) {
  if (req.files) {
    var file = req.files.csv;
    var filename = file.name;
    console.log("filename");
    console.log(path.extname(filename));
    if (path.extname(filename) != ".csv"){
      req.flash("file_error", "El archivo debe tener extensión .csv");
      res.redirect("/actualizar-estatus");
      return;
    };
    file.mv("./src/database/populateDB/csv-files/" + filename, function (err) {
      if (err) {
        res.send(err);
      } else {
        updateStatus(filename, req.body.offer);
        res.redirect("/actualizar-estatus");
      }
    });
  }
}


async function updateStatus(filename) {
  const inscriptionsSnapshot = await db.collection("inscripciones").get();
  fs.createReadStream("./src/database/populateDB/csv-files/" + filename)
    .pipe(csv())
    .on("data", async (row) => {
      const newStatus = [ row["taller_1"], row["taller_2"], row["taller_3"], row["taller_4"], row["taller_5"], row["taller_6"] ];
      db.collection("estudiantes").doc(row["id_estudiante"]).update({
        estatus_cursos: newStatus,
      });
      inscriptionsSnapshot.forEach((doc) => {
        if(doc.data().id_estudiante == row["id_estudiante"]) {
          db.collection("inscripciones").doc(doc.id).update({
            estatus: row["taller_" + doc.data().id_taller],
          });
        }
      });
    })
    .on("end", function () {
      //console.log("Students registered to their respective groups");
      console.log("Estatus actualizado");
    });
}
