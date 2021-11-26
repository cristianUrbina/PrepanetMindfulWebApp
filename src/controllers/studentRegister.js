const db = require("../database/database");

const populateDB = require("../database/populateDB/populateDB");

exports.show_student_regiter = function (req, res) {
  db.collection("estudiantes").get().then((snapshot) => {
    var data = null;
    if (!snapshot.empty) {
      data = {};
      snapshot.forEach(doc => {
        data[doc.id] = doc.data();
      });
    }
    res.render("studentRegister", { role: req.session.role,  students: data });
  });
};

exports.register_student = function (req, res) {
  if (req.files) {
    console.log(req.files)
    var file = req.files.csv;
    var filename = file.name;
    console.log(filename);
    file.mv("./src/database/populateDB/csv-files/" + filename, function (err) {
      if (err) {
        res.send(err);
      }
      else {
        console.log("Lets populate the database!!!");
        populateDB.addStudents(filename);
        res.redirect("/");
      }
    });
  }
};
