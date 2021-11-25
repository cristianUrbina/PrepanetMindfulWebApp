var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.render("courses", {role: req.session.role});
});

module.exports = router;
