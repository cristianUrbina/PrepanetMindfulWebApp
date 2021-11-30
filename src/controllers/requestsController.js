const db = require("../database/database");
const populateDB = require("../database/populateDB/populateDB");

exports.show = async function (req, res, next) {
    res.render("requests", { role: req.session.role });
};

exports.downloadRequests = async function (req, res, next) {
  const inscripcionesSnapshot = await db.collection("inscripciones").where("estatus","==","I").get();
  var requests = [];
  inscripcionesSnapshot.forEach((doc) => {
    requests.push(doc.data());
  });
  const filename = "src/database/populateDB/csv-files/solicitudes_inscripcion.csv";
  await populateDB.writeToCSVFile(filename, requests);
  res.download(filename);
};
