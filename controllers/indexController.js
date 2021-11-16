exports.show_home_page = function(req, res, next) {
  //var logged = req.app.get("logged");
  res.render("index", {title: "Prepanet home"});
};
