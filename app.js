var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var session = require("express-session");
var PassportLocal = require("passport-local").Strategy;

//Import routers
var loginRouter = require("./routes/login");
var indexRouter = require("./routes/index");
var coursesRouter = require("./routes/courses");
var dateRegisterRouter = require("./routes/dateRegister");
var studentRegisterRouter = require("./routes/studentRegister");
var profileRouter = require("./routes/profile");

var app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: "ultra secreto",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(function(username, password, done) {
  if (username === "usuario" && password === "1234") {
    return done (null, {id: 1, name: "Coddy"});
  }
  done(null, false);
}));

// Serializacion
passport.serializeUser(function(user, done){
   done(null, user.id);
});

// Deserializacion
passport.deserializeUser(function(id, done) {
  done(null, { id: 1, name: "Cody" });
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/cursos", coursesRouter);
app.use("/registrar-fechas", dateRegisterRouter);
app.use("/registrar-alumno", studentRegisterRouter);
app.use("/alumno", profileRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
