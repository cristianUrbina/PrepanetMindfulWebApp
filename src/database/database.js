// Database
const admin = require("./admin");

//const db = admin.database();
//const db = getFirestore();
const db = admin.firestore();


module.exports = db;

