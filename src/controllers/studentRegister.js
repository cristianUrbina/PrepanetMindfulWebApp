const db = require("../database/database");
const fs = require("fs");
const csv = require("csv-parser");

const populateDB = require("../database/populateDB/populateDB");

exports.show_student_regiter = async function (req, res) {
  const offersSnapshot = await db.collection("ofertas").get();
  var offers = [];
  var ids = [];
  var finalOffers = {};
  var promises = [];

  offersSnapshot.forEach((doc) => {
    promises.push(db.collection("talleres").doc(doc.data().taller_id).get());
    offers.push(doc.data());
    ids.push(doc.id);
  });

  Promise.all(promises).then((snapshots) => {
    var cntr = 0;
    snapshots.forEach((doc) => {
      offers[cntr].nombre_taller = doc.data().name;
      finalOffers[ids[cntr]] = offers[cntr];
      cntr++;
    });
    res.render("studentRegister", { role: req.session.role, offers: finalOffers });
  });
};

exports.register_student = function (req, res) {
  if (req.files) {
    var file = req.files.csv;
    var filename = file.name;
    file.mv("./src/database/populateDB/csv-files/" + filename, function (err) {
      if (err) {
        res.send(err);
      } else {
        //populateDB.addStudents(filename);
        registerStudentsToOffer(filename, req.body.offer);
        res.redirect("/");
      }
    });
  }
};

function registerStudentsToOffer(filename, offerId) {
  fs.createReadStream("./src/database/populateDB/csv-files/" + filename)
    .pipe(csv())
    .on("data", async function (row) {
      db.collection("inscripciones").add({
        estudiante_id: row["MATRICULA"],
        oferta_id: offerId,
        estatus: "Pendiente",
      });
    })
    .on("end", function () {
      console.log("Students registered to offer" + offerId );
    });
}
