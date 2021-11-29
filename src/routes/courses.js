var express = require("express");
var router = express.Router();

const db = require("../database/database");

router.get("/", async function(req, res, next) {
  const snapshot = await db.collection("talleres").get();
  var courses = [];
  snapshot.forEach((doc) =>{
    var course = doc.data() 
    course.id = doc.id;
    courses.push(course);
  });
  //console.log(courses);
  res.render("courses", {role: req.session.role, courses: courses});
});

router.get("/ofertar", async function (req, res, next) {
  const snapshot = await db.collection("talleres").get();
  var courses = [];
  snapshot.forEach((doc) =>{
    var course = doc.data() 
    course.id = doc.id;
    courses.push(course);
  });
  res.render("offer", { role: req.session.role, courses: courses } );
});

router.post("/ofertar", async function (req, res, next) {
  const course = await db.collection("talleres").doc(req.body.course).get();
  console.log(course.id);
  db.collection("ofertas").add({
    taller_id: course.id,
    periodo: req.body.period,
    fecha_inicio: req.body.begin,
    fecha_fin: req.body.end,
  });
  res.redirect("/talleres/ofertar");
});

router.get("/taller/:courseId", async function(req, res, next) {
  const snapshot = await db.collection("estudiantes").get();
  var students = {};
  snapshot.forEach((doc) => {
    students[doc.id] = doc.data();
  });
  res.render("course", { role: req.session.role, students: students });
  //res.send("Not implemented");
});
module.exports = router;
