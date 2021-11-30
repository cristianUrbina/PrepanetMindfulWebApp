const db = require("../database/database");
const fs = require("fs");
const csv = require("csv-parser");

const populateDB = require("../database/populateDB/populateDB");

exports.show_student_regiter = async function (req, res) {
  res.render("studentRegister", { role: req.session.role });
};

exports.register_student = function (req, res) {
  if (req.files) {
    var file = req.files.csv;
    var filename = file.name;
    file.mv("./src/database/populateDB/csv-files/" + filename, function (err) {
      if (err) {
        res.send(err);
      } else {
        //populateDB.addStudents(filename);
        registerStudentsToGroup(filename, req.body.offer);
        res.redirect("/registrar-alumnos");
      }
    });
  }
};

var groups = [];

async function tmp(row) {
  const id_estudiante = row["id_estudiante"];
  const id_oferta = row["id_oferta"];
  //const student = await db.collection("estudiantes").doc(id_estudiante).get();
  //const id_campus = student.data().id_campus;
  db.collection("inscripciones")
    .where("id_oferta", "==", id_oferta)
    .where("id_estudiante", "==", id_estudiante)
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          db.collection("inscripciones").doc(doc.id).update({
            estatus: "C",
          });
        });
      }
    });
  const student = await db.collection("estudiantes").doc(id_estudiante).get();
  const offer = await db.collection("ofertas").doc(id_oferta).get();
  var statusList = student.data().estatus_cursos;
  console.log("oferta");
  console.log(id_oferta);
  console.log(offer.data());
  statusList[offer.data().id_taller - 1] = "C";
  db.collection("estudiantes").doc(id_estudiante).update({
    estatus_cursos: statusList,
  });
  //console.log("id_oferta " + id_oferta);
  //console.log("id_estudiante " + id_estudiante);
  //console.log("id_campus " + id_campus);
  //if (groups[id_oferta]) {
    //console.log("groups[id_oferta]");
    //if (groups[id_oferta][id_campus]) {
      //console.log("groups[id_oferta][id_campus]");
      //groups[id_oferta][id_campus].push(id_estudiante);
    //} else {
      //groups[id_oferta][id_campus] = [id_estudiante];
    //}
  //} else {
    //groups[id_oferta] = {
      //[id_campus]: [id_estudiante],
    //};
  //}
}


async function registerStudentsToGroup(filename) {
  fs.createReadStream("./src/database/populateDB/csv-files/" + filename)
    .pipe(csv())
    .on("data", tmp)
    .on("end", function () {
      //console.log("Students registered to their respective groups");
      console.log("groups");
      console.log(groups);
    });
}
