var admin = require("firebase-admin");

const serviceAccount = require("./prepanetmindful-firebase-adminsdk-7n6t5-466288466e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://prepanetmindfuldb-default-rtdb.firebaseio.com/"
});

module.exports = admin;
