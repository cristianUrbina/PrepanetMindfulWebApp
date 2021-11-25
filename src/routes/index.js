var express = require('express');
var router = express.Router();
var local_auth = require("../passport/local-auth"); 
 
// Import routers
var homeRouter = require("./home");
var loginRouter = require("./login");
var logoutRouter = require("./logout");
var coursesRouter = require("./courses");
var dateRegisterRouter = require("./dateRegister");
var studentRegisterRouter = require("./studentRegister");
var profileRouter = require("./profile");



/* GET home page. */
//router.get('/', (req, res, next) => {
  //if (req.isAuthenticated()) return next();
  //res.redirect("/login");
//}, index_controller.show_home_page);

router.use("/login", loginRouter);

router.use((req, res, next) => {
  local_auth.isAuthenticated(req, res, next);
  next();
});

router.use("/", homeRouter);
router.use("/cursos", coursesRouter);
router.use("/registrar-fechas", dateRegisterRouter);
router.use("/registrar-alumno", studentRegisterRouter);
router.use("/alumno", profileRouter);
router.use("/logout", logoutRouter);

module.exports = router;
