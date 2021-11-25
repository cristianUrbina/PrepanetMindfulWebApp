module.exports = authorize;

function authorize(roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }
  return [
    function (req, res, next) {
      if (roles.length && !roles.includes(req.session.role)) {
        // user's role is not authorized
        console.log(roles);
        console.log(req.session.role);
        return res.status(401).json({ message: "Unauthorized" });
      }

      // authentication and authorization successful
      next();
    },
  ];
}
