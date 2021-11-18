const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const db = require("../database");

/*// Database*/
/*var admin = require("firebase-admin");*/
/*var serviceAccount = require("../prepanetmindfuldb-firebase-adminsdk-7iiyh-fb8ac1e56f.json");*/

/*admin.initializeApp({*/
  /*credential: admin.credential.cert(serviceAccount),*/
  /*databaseURL: "https://prepanetmindfuldb-default-rtdb.firebaseio.com/"*/
/*});*/

/*const db = admin.database();*/

let users = [] ;

function writeToCSVFile(users) {
  const filename = 'output.csv';
  fs.writeFile(filename, extractAsCSV(users), err => {
    if (err) {
      console.log('Error writing to csv file', err);
    } else {
      console.log(`saved as ${filename}`);
    }
  });
}

function extractAsCSV(users) {
  const header = ["Id, name, campus, coordinator_id"];
  const rows = users.map(user =>
     `${user.id}, ${user.name}, ${user.campus}, ${user.coordinator_id}`
  );
  return header.concat(rows).join("\n");
}

fs.createReadStream("./BD usuarios.csv")
  .pipe(csv())
  .on("data", function(row) {
    const user = {
      name: row.NOMBRECOMPLETO,
      campus: row.CAMPUS,
      campus_acronym: row.CLAVECAMPUS,
      coordinator: row.NOMBRECOORDINADORPREPANET,
      coordinator_email: row.CORREOCOORDINADORPREPANET,
      coordinator_id: row.NOMINACOORDINADORPREPANET
    }
    //console.log(user);
    users[row.MATRICULA] = user;
  })
  .on("end", function() {
    //console.table(users);
    //console.log(users);
    db.ref("students").set(users);
    // TODO: SAVE users data to another file
    writeToCSVFile(users);
    db.ref("super_users").set({
      L00836882: {
        name: "Ana María Loreto Zuñiga",
        email: "ana.zuniga@tec.mx",
        password: "anita",
      },
      L00192153: {
        name: "María del Carmen Pámanes Fernández",
        email: "mpamanes@tec.mx",
        password: "mary",
      }
    });
  });

