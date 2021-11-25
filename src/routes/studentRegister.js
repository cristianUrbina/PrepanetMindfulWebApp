var express = require('express');
var router = express.Router();
const authorize = require("../passport/_helpers/authorize");
const Role = require("../passport/_helpers/role");

// Require controller modules.
var student_register_controller = require ("../controllers/studentRegister");

// GET registro de fechas
router.get('/', authorize(Role.Superuser), student_register_controller.show_student_regiter);

router.post("/", authorize(Role.Superuser), student_register_controller.register_student);

//router.post("/", student_register_controller.register_student);
module.exports = router;
