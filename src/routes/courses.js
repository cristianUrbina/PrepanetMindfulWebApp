var express = require("express");
var router = express.Router();

const courses_controller = require("../controllers/coursesController");

router.get("/", courses_controller.show);

router.get("/ofertar", courses_controller.show_to_offer);

router.post("/ofertar", courses_controller.post_to_offer);

router.get("/ofertas", courses_controller.show_offers);

router.post("/taller/campus", courses_controller.redirect_course_campus);

router.get("/taller/:courseId", courses_controller.course);

router.get("/taller/:courseId/:campusId", courses_controller.course_campus);

module.exports = router;
