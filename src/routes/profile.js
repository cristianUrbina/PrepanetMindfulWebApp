var express = require("express");
var router = express.Router();

const profile_controller = require("../controllers/profileController");

router.get("/:studentId", profile_controller.show_profile);

module.exports = router;
