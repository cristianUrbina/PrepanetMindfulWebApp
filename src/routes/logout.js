var express = require ("express");
var router = express.Router();

// Require controller modules.
var logout_controller = require("../controllers/logoutController");

router.get("/", logout_controller.logout);

module.exports = router;
