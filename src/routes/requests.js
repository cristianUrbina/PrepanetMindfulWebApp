var express = require('express');
var router = express.Router();

// Require controller modules.
var requests_controller = require ("../controllers/requestsController");

// GET registro de fechas
router.get('/', requests_controller.show);

router.get("/descargar", requests_controller.downloadRequests);

module.exports = router;
