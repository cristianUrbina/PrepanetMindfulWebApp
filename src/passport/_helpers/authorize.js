var local_auth = require("../local-auth");

module.exports = authorize;

function authorize(roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }
  return [
    function (req, res, next) {
      req.session.role = local_auth.role;
      local_auth.isAuthenticated(req, res, next);
    },
    function (req, res, next) {
      console.log("inisde array");
      if (roles.length && !roles.includes(req.session.role)) {
        // user's role is not authorized
        console.log(roles);
        console.log(req.session.role);
        res.status(401);
        return res.render("unauthorized", {role: req.session.role});
      }

      // authentication and authorization successful
      next();
    },
  ];
}
