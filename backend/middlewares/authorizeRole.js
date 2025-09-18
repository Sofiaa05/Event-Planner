// middleware for role-based authorization.
exports.authorizeRole = (role) => {
  return (req, res, next) => {
    if(!req.user){
      return res.status(401).json({ message: "Not authorized" });
    }

    //validating admin role to access a particular route
    if (req.user.role !== role) {
      return res.status(403).json({ message: `Access denied for ${req.user.role}` });
    }

    next(); // user has the required role
  };
};
