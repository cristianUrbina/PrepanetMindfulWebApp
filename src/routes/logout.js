var express = require("express");
var router = express.Router();

var logout_controller = require("../controllers/logoutController");

router.get("/", logout_controller.logout);

module.exports = router;
