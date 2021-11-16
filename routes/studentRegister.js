var express = require('express');
var router = express.Router();
 
// Require controller modules.
var student_register_controller = require ("../controllers/studentRegister");

// GET registro de fechas
router.get('/', student_register_controller.show_student_regiter);

module.exports = router;
