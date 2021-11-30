const admin = require("./admin");

const db = admin.firestore();

//db.collection("test").doc("testdoc").set({
  //testfield: 1,
//});

module.exports = db;

