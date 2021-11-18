const db = require("../database");

exports.show_student_regiter = function (req, res) {
  db.ref("students").once("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    res.render("studentRegister", { students: data });
  });
};

exports.register_student = function (req, res) {
  console.log(req.body);
  const newStudent = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  db.ref("students").push(newStudent);
  res.redirect("/");
};
