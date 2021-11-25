var express = require('express');
var router = express.Router();
const authorize = require("../passport/_helpers/authorize");
const Role = require("../passport/_helpers/role");

// Require controller modules.
var date_register = require ("../controllers/dateRegister");

// GET registro de fechas
router.get('/', authorize(Role.Superuser), date_register.recordDate);

router.post("/", authorize(Role.Superuser), date_register.postDate);

module.exports = router;
