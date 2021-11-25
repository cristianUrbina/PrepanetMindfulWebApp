const local_auth = require("../passport/local-auth");

exports.show_home_page = function(req, res, next) {
  req.session.role = local_auth.role;
  console.log("user type: " + req.session.role);
  res.render("index", {title: "Prepanet home"});
};
