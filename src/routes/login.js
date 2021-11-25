var express = require ("express");
var router = express.Router();

// Require controller modules.
var login_controller = require("../controllers/loginController");

router.get("/", (req, res, next) => {
  // If authenticated then can't access /login route
  if (req.isAuthenticated()) {
    res.redirect("/");
  }
  return next();
}, login_controller.check_login);

router.post("/", login_controller.login);

module.exports = router;
