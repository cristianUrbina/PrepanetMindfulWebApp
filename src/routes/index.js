var express = require('express');
var router = express.Router();

// Require controller modules.
var index_controller = require("../controllers/indexController");

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}, index_controller.show_home_page);

module.exports = router;
