const db = require("../database/database");
const Role = require("../passport/_helpers/role");

exports.show = async function (req, res, next) {
  const snapshot = await db.collection("talleres").get();
  var courses = [];
  snapshot.forEach((doc) => {
    var course = doc.data();
    course.id = doc.id;
    courses.push(course);
  });
  //console.log(courses);
  res.render("courses", { role: req.session.role, courses: courses });
};

exports.show_to_offer = async function (req, res, next) {
  const snapshot = await db.collection("talleres").get();
  var courses = [];
  snapshot.forEach((doc) => {
    var course = doc.data();
    course.id = doc.id;
    courses.push(course);
  });
  res.render("offer", { role: req.session.role, courses: courses, message: req.flash("myError") });
};

exports.post_to_offer = async function (req, res, next) {
  var beginArray = req.body.begin.split("-").map((line) => parseInt(line, 10));
  var endArray = req.body.end.split("-").map((line) => parseInt(line, 10));
  if (req.body.begin > req.body.end) {
    req.flash("myError", "La fecha de inicio no puede ser después de la fecha de fin");
    res.redirect("/talleres/ofertar");
    return;
  }
  db.collection("ofertas").add({
    id_taller: req.body.course,
    periodo: (beginArray[1] <= 6 ? "Feb-Jun" : "Ago-Dic") + " " + beginArray[0].toString(),
    fecha_inicio: req.body.begin,
    fecha_fin: req.body.end,
  });
  res.redirect("/talleres/ofertar");
};

exports.show_offers = async function (req, res, next) {
  const offersSnapshot = await db.collection("ofertas").get();
  var offers = [];
  var ids = [];
  var finalOffers = {};
  var promises = [];
  offersSnapshot.forEach((doc) => {
    promises.push(db.collection("talleres").doc(doc.data().id_taller).get());
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
};

exports.course = async function (req, res, next) {
  // A coordinator only can see information about his or her campus
  if (req.session.role == Role.Coordinator) {
    res.redirect("/talleres/taller/" + req.params.courseId + "/" + req.session.user.id_campus);
    return;
  }
  const snapshot = await db
    .collection("inscripciones")
    .where("id_taller", "==", req.params.courseId)
    .get();
  var promises = [];
  var inscriptions = {};
  snapshot.forEach((doc) => {
    promises.push(db.collection("estudiantes").doc(doc.data().id_estudiante).get());
    inscriptions[doc.data().id_estudiante] = doc.data();
  });
  Promise.all(promises).then(async (snapshots) => {
    snapshots.forEach((student) => {
      var tmp = inscriptions[student.data().matricula];
      tmp["estudiante"] = student.data().nombre_completo;
      inscriptions[student.data().matricula] = tmp;
    });
    var campus = {};
    const campusSnapshot = await db.collection("Campus").get();
    campusSnapshot.forEach((doc) => {
      campus[doc.id] = doc.data();
    });
    res.render("course", {
      role: req.session.role,
      inscriptions: inscriptions,
      campus: campus,
      courseId: req.params.courseId,
    });
  });
};

exports.course_campus = async function (req, res, next) {
  // A coordinator only can see information about his or her campus
  if (req.session.role == Role.Coordinator && req.params.campusId != req.session.user.id_campus) {
    res.redirect("/talleres/taller/" + req.params.courseId + "/" + req.session.user.id_campus);
    return;
  }
  const campusId = req.params.campusId;
  if (campusId == "Nacional") {
    res.redirect("/talleres/taller/" + req.params.courseId);
    return;
  }
  const snapshot = await db
    .collection("inscripciones")
    .where("id_taller", "==", req.params.courseId)
    .get();
  var promises = [];
  var inscriptions = {};
  var finalInscriptions = {};
  snapshot.forEach((doc) => {
    promises.push(db.collection("estudiantes").doc(doc.data().id_estudiante).get());
    inscriptions[doc.data().id_estudiante] = doc.data();
  });
  Promise.all(promises).then(async (snapshots) => {
    snapshots.forEach((student) => {
      var tmp = inscriptions[student.data().matricula];
      tmp["estudiante"] = student.data().nombre_completo;
      inscriptions[student.data().matricula] = tmp;
      if (student.data().id_campus == campusId) {
        finalInscriptions[student.data().matricula] = tmp;
      }
    });
    var campus = {};
    const campusSnapshot = await db.collection("Campus").get();
    campusSnapshot.forEach((doc) => {
      campus[doc.id] = doc.data();
    });
    res.render("course", {
      role: req.session.role,
      inscriptions: finalInscriptions,
      campus: campus,
      courseId: req.params.courseId,
      campusId: req.params.campusId,
    });
  });
};

exports.redirect_course_campus = function (req, res, next) {
  const campusId = req.body.campus;
  const courseId = req.body.courseId;
  res.redirect("/talleres/taller/" + courseId + "/" + campusId);
};
