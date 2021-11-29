var express = require("express");
var router = express.Router();

// Require controller modules.
var account_register_controller = require("../controllers/accountRegister");

// GET registro de fechas
router.get("/", account_register_controller.show);

router.post("/", account_register_controller.post);

//router.post("/", student_register_controller.register_student);
module.exports = router;
