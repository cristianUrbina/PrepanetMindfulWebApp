const db = require("../database/database");
const populateDB = require("../database/populateDB/populateDB");

var requests = [];

exports.show = async function (req, res, next) {
  requests = [];
  var promises = [];
  const inscriptionsSnapshot = await db
    .collection("inscripciones")
    .where("estatus", "==", "I")
    .get();
  if (!inscriptionsSnapshot.empty) {
    inscriptionsSnapshot.forEach(async (inscription) => {
      var tmp = inscription.data();
      promises.push(db.collection("talleres").doc(inscription.data().id_taller).get());
      promises.push(db.collection("ofertas").doc(inscription.data().id_oferta).get());
      requests.push(tmp);
    });
  }
  Promise.all(promises).then((snapshots) => {
    var cntr = 0;
    snapshots.forEach((doc) => {
      if (cntr % 2 == 0) {
        requests[Math.floor(cntr / 2)]["taller"] = doc.data().name;
      } else {
        requests[Math.floor(cntr / 2)]["oferta"] = {
          fecha_inicio: doc.data().fecha_inicio,
          fecha_fin: doc.data().fecha_fin,
          periodo: doc.data().periodo,
        };
      }
      cntr++;
    });
    res.render("requests", { role: req.session.role, requests: requests });
  });
};

exports.downloadRequests = async function (req, res, next) {
  const filename = "src/database/populateDB/csv-files/solicitudes_inscripcion.csv";
  await populateDB.writeToCSVFile(filename, requests);
  res.download(filename);
};
