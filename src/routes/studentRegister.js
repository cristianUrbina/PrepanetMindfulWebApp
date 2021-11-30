var express = require("express");
var router = express.Router();

var student_register_controller = require("../controllers/studentRegister");

router.get("/", student_register_controller.show_student_regiter);

router.post("/", student_register_controller.register_student);

module.exports = router;
