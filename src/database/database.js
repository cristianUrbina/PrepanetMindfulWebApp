// Database
var admin = require("firebase-admin");

//const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
//const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require("./prepanetmindfuldb-firebase-adminsdk-7iiyh-fb8ac1e56f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://prepanetmindfuldb-default-rtdb.firebaseio.com/"
});

//const db = admin.database();
//const db = getFirestore();
const db = admin.firestore();

module.exports = db;

