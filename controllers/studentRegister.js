
exports.show_student_regiter = function(req, res) {
  const db = req.app.get("db");
  db.ref("students").once("value", (snapshot) => {
    const data = snapshot.val();
    res.render("studentRegister", {students: data});
    //Object.entries(data).forEach((entry) => {
      //const [key, value] = entry;
      //users.push(value);
      //console.log(users.length);
    //});
  });
};

exports.register_student = function (req, res) {
  const db = req.app.get("db");
  console.log(req.body);
  const newStudent = {
    firstname: req.body.firstname,
    lastname: req.body.lastname
  };
  db.ref("students").push(newStudent);
  res.redirect("/");
};
