// Database
var admin = require("firebase-admin");

//const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
//const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require("./prepanetmindful-firebase-adminsdk-7n6t5-466288466e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://prepanetmindfuldb-default-rtdb.firebaseio.com/"
});

//const db = admin.database();
//const db = getFirestore();
const db = admin.firestore();

module.exports = db;

