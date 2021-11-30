var express = require("express");
var router = express.Router();

const courses_controller = require("../controllers/coursesController");

router.get("/", courses_controller.show);

router.get("/ofertar", courses_controller.show_to_offer);

router.post("/ofertar", courses_controller.post_to_offer);

router.get("/ofertas", courses_controller.show_offers);

router.get("/taller/:courseId", courses_controller.course);

module.exports = router;
