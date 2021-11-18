//const async = require("async");

exports.show_student_regiter = function(req, res) {
  const db = req.app.get("db");
  //async.parawlel({
  function myoperation(callback) {
    const users = [];
    db.ref("students").once("value", (snapshot) => {
      const data = snapshot.val();
      Object.entries(data).forEach((entry) => {
        const [key, value] = entry;
        users.push(value);
        console.log(users.length);
      });
    });
    callback(users)
  }
  myoperation(function(users) {
    res.render("studentRegister", {students: users});
  });
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
