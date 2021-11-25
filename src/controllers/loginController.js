var passport = require("passport");

exports.check_login = function (req, res, next) {
    res.render("login", { error: req.flash("error")});
}

exports.login = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
});
