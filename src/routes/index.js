var express = require('express');
var router = express.Router();
var createError = require("http-errors");
const authorize = require("../passport/_helpers/authorize");
const Role = require("../passport/_helpers/role");
 
// Import routers
var homeRouter = require("./home");
var loginRouter = require("./login");
var logoutRouter = require("./logout");
var coursesRouter = require("./courses");
var dateRegisterRouter = require("./dateRegister");
var studentRegisterRouter = require("./studentRegister");
var accountRegisterRouter = require("./accountRegister");
var profileRouter = require("./profile");

router.use("/login", loginRouter);

router.use("/", authorize([ Role.Superuser, Role.Coordinator ]), homeRouter);
router.use("/talleres", authorize([ Role.Superuser, Role.Coordinator ]), coursesRouter);
router.use("/registrar-fechas", authorize(Role.Superuser), dateRegisterRouter);
router.use("/registrar-alumnos", authorize(Role.Superuser), studentRegisterRouter);
router.use("/registrar-cuentas", authorize(Role.Superuser), accountRegisterRouter);
router.use("/alumno", authorize([ Role.Superuser, Role.Coordinator ]), profileRouter);
router.use("/logout", authorize([ Role.Superuser, Role.Coordinator ]), logoutRouter);

// catch 404 and forward to error handler
router.use(function (req, res, next) {
  next(createError(404));
});

// error handler
router.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {role: req.session.role});
});

module.exports = router;
