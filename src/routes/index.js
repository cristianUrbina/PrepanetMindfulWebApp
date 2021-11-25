var express = require('express');
var router = express.Router();
const authorize = require("../passport/_helpers/authorize");
const Role = require("../passport/_helpers/role");
 
// Import routers
var homeRouter = require("./home");
var loginRouter = require("./login");
var logoutRouter = require("./logout");
var coursesRouter = require("./courses");
var dateRegisterRouter = require("./dateRegister");
var studentRegisterRouter = require("./studentRegister");
var profileRouter = require("./profile");



router.use("/login", loginRouter);

router.use("/", authorize([ Role.Superuser, Role.Coordinator ]), homeRouter);
router.use("/cursos", authorize([ Role.Superuser, Role.Coordinator ]), coursesRouter);
router.use("/registrar-fechas", authorize(Role.Superuser), dateRegisterRouter);
router.use("/registrar-alumno", authorize(Role.Superuser), studentRegisterRouter);
router.use("/alumno", authorize([ Role.Superuser, Role.Coordinator ]), profileRouter);
router.use("/logout", authorize([ Role.Superuser, Role.Coordinator ]), logoutRouter);

module.exports = router;
