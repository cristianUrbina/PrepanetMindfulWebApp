var express = require("express");
var router = express.Router();

var date_register = require("../controllers/dateRegister");

router.get("/", date_register.recordDate);

router.post("/", date_register.postDate);

module.exports = router;
