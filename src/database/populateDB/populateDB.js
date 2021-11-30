const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const db = require("../database");
const getAuth = require("../auth");

let users = [];

exports.writeToCSVFile = function (filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, extractAsCSV(data), (err) => {
      if (err) {
        console.log("Error writing to csv file", err);
        reject();
      } else {
        console.log(`saved as ${filename}`);
        resolve();
      }
    });
  });
};

function extractAsCSV(requests) {
  const header = ["id_estudiante,id_oferta,taller,periodo,fecha_inicio,fecha_fin"];
  const rows = requests.map(
    (request) => `${request.id_estudiante},${request.id_oferta},${request.taller},${request.oferta.periodo},${request.oferta.fecha_inicio},${request.oferta.fecha_fin}`
  );
  return header.concat(rows).join("\n");
}

exports.addStudents = async function (filename) {
  fs.createReadStream("./src/database/populateDB/csv-files/" + filename)
    .pipe(csv())
    .on("data", async function (row) {
      var student = {
        nombre_completo: row["NOMBRE COMPLETO"],
        matricula: row["MATRICULA"],
        id_campus: row["CLAVE CAMPUS"],
        id_coordinador: row["NOMINA COORDINADOR PREPANET"],
      };
      var coordinator = {
        nombre_completo: row["NOMBRE COORDINADOR PREPANET"],
        email: row["CORREO COORDINADOR PREPANET"],
        nomina: row["NOMINA COORDINADOR PREPANET"],
        id_campus: row["CLAVE CAMPUS"],
      };
      users.push(student);
      addStudentUser(student, "estudiantes", student.matricula);
      addStudentUser(coordinator, "coordinadores", coordinator.nomina);
    })
    .on("end", function () {
      console.log("Users writen in database");
    });
};

exports.addSuperusers = async function () {
  var superuser = {
    name: "Ana María Loreto Zuñiga",
    email: "ana.zuniga@tec.mx",
    password: "anita",
    nomina: "L00836882",
  };
  addStudentUser(superuser, "superusuarios", superuser.nomina);

  superuser = {
    name: "María del Carmen Pámanes Fernández",
    email: "mpamanes@tec.mx",
    password: "mary",
    nomina: "L00192153",
  };
  addStudentUser(superuser, "superusuarios", superuser.nomina);
};

//exports.addCoordinators = async function () {
//await db.collection("coordinadores").doc("L00834883").set({
//name: "Cristian Omar Urbina Herrera",
//email: "urbina@tec.mx",
//password: "Cristony123",
//campus: "Monterrey",
//});
//};

exports.addInscriptions = async function () {
  const offersSnapshot = await db.collection("ofertas").get();
  const studentsSnapshot = await db.collection("estudiantes").get();
  offersSnapshot.forEach((offer) => {
    studentsSnapshot.forEach((student) => {
      db.collection("inscripciones").add({
        estatus: "I",
        id_estudiante: student.id,
        id_oferta: offer.id,
        id_taller: offer.data().id_taller,
        timestamp: Date.now(),
      });
    });
  });
};

exports.addCampus = async function () {
  await db.collection("Campus").doc("MTY").set({
    clave: "MTY",
    id: "1",
    nombre: "Monterrey",
  });
  await db.collection("Campus").doc("CSF").set({
    clave: "CSF",
    id: "2",
    nombre: "Santa Fe",
  });
  await db.collection("Campus").doc("GDA").set({
    clave: "GDA",
    id: "3",
    nombre: "Guadalajara",
  });
  await db.collection("Campus").doc("PUE").set({
    clave: "PUE",
    id: "4",
    nombre: "Puebla",
  });
};

async function addStudentUser(user, role, id) {
  //return new Promise((resolve, reject) => {
  getAuth()
    .createUser({
      email: id + "@tec.mx",
      emailVerified: false,
      password: "secretPassword",
      displayName: user.nombre_completo,
      disabled: false,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
      //resolve(userRecord.uid);
      user["uid"] = userRecord.uid;
      db.collection(role).doc(id).set(user);
    })
    .catch((error) => {
      //console.log("Error creating new user:", error);
      console.log("usuario creado previamante");
      //reject();
    });
  //});
}

async function getCampusId(acronym) {
  return new Promise((resolve, reject) => {
    db.collection("Campus")
      .doc(acronym)
      .get()
      .then((doc) => {
        resolve(doc.data().id);
      });
  });
}

async function deleteUsers() {
  var snapshot = await db.collection("estudiantes").get();
  deleteFromSnapshot(snapshot);
  snapshot = await db.collection("coordinadores").get();
  deleteFromSnapshot(snapshot);
}

function deleteFromSnapshot(snapshot) {
  if (snapshot.empty) {
    return;
  }
  snapshot.forEach((user) => {
    getAuth()
      .deleteUser(user.data().uid)
      .then(() => {
        console.log("Successfully deleted user");
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  });
}
// Uncomment this line to add superusers and coordinators
//exports.addSuperusers();
//exports.addCoordinators();
//exports.addCampus();
//exports.addInscriptions();
//deleteUsers();
