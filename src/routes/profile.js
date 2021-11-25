var express = require("express");
var router = express.Router();
const db = require("../database/database");

router.get("/:studentId", function(req, res, next) {
  db.ref("students").orderByKey().equalTo(req.params.studentId).on('value', (snapshot) => {
    if(!snapshot.exists()) {
      console.log("Not found user: " + req.params.studentId);
      res.redirect("/");
    }
    else {
      snapshot.forEach((user) => {
        console.log("user:");
        console.log(user.val());
        res.render("profile", {role: req.session.role, id: user.key, student: user.val()});
      })
    }
  });
});

module.exports = router;
