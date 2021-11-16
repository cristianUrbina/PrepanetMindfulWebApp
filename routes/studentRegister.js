var express = require('express');
var router = express.Router();
 
// Require controller modules.
var student_register_controller = require ("../controllers/studentRegister");

// GET registro de fechas
router.get('/', student_register_controller.show_student_regiter);

router.post("/", student_register_controller.register_student);

//router.post("/", student_register_controller.register_student);
module.exports = router;
