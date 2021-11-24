var express = require('express');
var router = express.Router();
 
// Require controller modules.
var date_register = require ("../controllers/dateRegister");

// GET registro de fechas
router.get('/', date_register.recordDate);

router.post("/", date_register.postDate);

module.exports = router;
