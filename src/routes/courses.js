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
  db.collection("ofertas").add({
    taller_id: req.body.course,
    periodo: req.body.period,
    fecha_inicio: req.body.begin,
    fecha_fin: req.body.end,
  });
  res.redirect("/talleres/ofertar");
});

router.get("/ofertas", async function (req, res, next) {
  const offersSnapshot = await db.collection("ofertas").get();
  var offers = [];
  var ids = [];
  var finalOffers = {};
  var promises = [];

  offersSnapshot.forEach((doc) => {
    promises.push(db.collection("talleres").doc(doc.data().taller_id).get());
    offers.push(doc.data());
    ids.push(doc.id);
  });

  Promise.all(promises).then((snapshots) => {
    var cntr = 0;
    snapshots.forEach((doc) => {
      offers[cntr].nombre_taller = doc.data().name;
      finalOffers[ids[cntr]] = offers[cntr];
      cntr++;
    });
    res.render("offers", { role: req.session.role, offers: finalOffers });
  });
});

router.get("/taller/:courseId", async function(req, res, next) {
  const snapshot = await db.collection("inscripciones").where("id_taller","==", req.params.courseId).get();
  var promises = [];
  var inscriptions = {};
  snapshot.forEach((doc) => {
    promises.push(db.collection("estudiantes").doc(doc.data().id_estudiante).get());
    inscriptions[doc.data().id_estudiante] = doc.data();
  });
  //console.log("first inscriptions");
  //console.log(inscriptions);
  Promise.all(promises).then((snapshots) => {
    snapshots.forEach((student) => {
      console.log(student.data());
      var tmp = inscriptions[student.data().matricula];
      tmp["estudiante"] =  student.data().nombre_completo;
      inscriptions[student.matricula] = tmp;
    });
    console.log("inscriptions");
    console.log(inscriptions);
    res.render("course", { role: req.session.role, inscriptions: inscriptions });
  });
});

module.exports = router;
