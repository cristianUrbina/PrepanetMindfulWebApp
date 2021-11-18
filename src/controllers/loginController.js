var passport = require("passport");

exports.check_login = function (req, res) {
    //res.send('NOT IMPLEMENTED: login');
    res.render("login");
}

exports.login = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login-intruso"
});
