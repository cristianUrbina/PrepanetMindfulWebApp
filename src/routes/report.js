var express = require("express");
var router = express.Router();
const db = require("../database/database");
const populateDB = require("../database/populateDB/populateDB");
//var account_register_controller = require("../controllers/accountRegister");

router.get("/", function (req, res, next) {
  res.render("report", { role: req.session.role} );
});

router.post("/", async function (req, res, next) {
  var data = [];
  const studentsSnapshot = await db.collection("estudiantes").get();
  studentsSnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  console.log("data");
  console.log(data);
  const filename = "src/database/populateDB/csv-files/reporte.csv";
  await populateDB.writeToReportCSVFile(filename, data);
  res.download(filename);
});

module.exports = router;
