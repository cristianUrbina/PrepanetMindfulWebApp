var express = require('express');
var router = express.Router();
 
// Require controller modules.
var record_date_controller = require ("../controllers/recordDateController");

// GET registro de fechas
router.get('/', record_date_controller.recordDate);

module.exports = router;
