var admin = require("firebase-admin");

const serviceAccount = require("./prepanetmindfulbd-firebase-adminsdk-v8clo-75c91f67e7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://prepanetmindfulbd-default-rtdb.firebaseio.com/"
});

module.exports = admin;
