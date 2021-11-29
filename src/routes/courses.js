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
