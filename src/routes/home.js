const express = require("express");
const router = express.Router();

// Require controller modules.
var home_controller = require("../controllers/homeController");

router.get("/", home_controller.show_home_page);

module.exports = router;
