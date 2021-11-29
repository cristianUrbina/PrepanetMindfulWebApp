const populateDB = require("../database/populateDB/populateDB");

exports.show = function (req, res, next) {
    res.render("accountRegister", { role: req.session.role });
};

exports.post = function (req, res, next) {
  if (req.files) {
    var file = req.files.csv;
    var filename = file.name;
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
