const populateDB = require("../database/populateDB/populateDB");
const path = require("path");

exports.show = function (req, res, next) {
    const message = req.flash("file_error");
  res.render("accountRegister", { role: req.session.role, message: message});
};

exports.post = function (req, res, next) {
  if (req.files) {
    var file = req.files.csv;
    var filename = file.name;
    console.log("filename");
    console.log(path.extname(filename));
    if (path.extname(filename) != ".csv"){
      req.flash("file_error", "El archivo debe tener extensión .csv");
      res.redirect("/registrar-cuentas");
      return;
    };
    file.mv("./src/database/populateDB/csv-files/" + filename, function (err) {
      if (err) {
        res.send(err);
      } else {
        populateDB.addStudents(filename);
        res.redirect("/");
      }
    });
  }
};
