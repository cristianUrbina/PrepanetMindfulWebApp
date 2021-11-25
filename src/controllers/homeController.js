const local_auth = require("../passport/local-auth");

exports.show_home_page = function(req, res, next) {
  res.render("home", {role: req.session.role, title: "Prepanet home"});
};
