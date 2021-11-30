var express = require("express");
var router = express.Router();

var account_register_controller = require("../controllers/accountRegister");

router.get("/", account_register_controller.show);

router.post("/", account_register_controller.post);

module.exports = router;
