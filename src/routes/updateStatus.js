const express = require("express");
const router = express.Router();

var update_status_controller = require("../controllers/updateStatusController");

router.get("/", update_status_controller.show);

router.post("/", update_status_controller.update_status);

module.exports = router;
