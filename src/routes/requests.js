var express = require("express");
var router = express.Router();

var requests_controller = require("../controllers/requestsController");

router.get("/", requests_controller.show);

router.get("/descargar", requests_controller.downloadRequests);

module.exports = router;
