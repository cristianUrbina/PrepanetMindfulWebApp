exports.show_student_regiter = function(req, res) {
  const db = req.app.get("db");
  console.log("data here");
  db.ref("students").once("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
  res.render("studentRegister");
}

exports.register_student = function (req, res) {
  const db = req.app.get("db");
  console.log(req.body);
  const newStudent = {
    firstname: req.body.firstname,
    lastname: req.body.lastname
  };
  db.ref("students").push(newStudent);
  res.redirect("/");
}
