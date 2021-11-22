// Database
var admin = require("firebase-admin");
var serviceAccount = require("./prepanetmindfuldb-firebase-adminsdk-7iiyh-fb8ac1e56f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://prepanetmindfuldb-default-rtdb.firebaseio.com/"
});

const db = admin.database();

module.exports = db;

