var express = require("express");
var router = express.Router();
const db = require("../database/database");
const populateDB = require("../database/populateDB/populateDB");
const Role = require("../passport/_helpers/role");

//var account_register_controller = require("../controllers/accountRegister");

router.get("/", function (req, res, next) {
  res.render("report", { role: req.session.role} );
});

router.post("/", async function (req, res, next) {
  var data = [];
  var studentsSnapshot = null;
  if (req.session.role == Role.Superuser) {
    studentsSnapshot = await db.collection("estudiantes").get()
  } else {
    studentsSnapshot = await db.collection("estudiantes").where("id_campus", "==", req.session.user.id_campus).get();
  }
  studentsSnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  const filename = "src/database/populateDB/csv-files/reporte.csv";
  await populateDB.writeToReportCSVFile(filename, data);
  res.download(filename);
});

module.exports = router;
