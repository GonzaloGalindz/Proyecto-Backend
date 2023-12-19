export function roleIsAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === "administrator") {
    next();
  } else {
    res.status(400).json({
      error: "You do not have the permissions to perform this operation",
    });
  }
}

export function roleIsUser(req, res, next) {
  if (req.session.user && req.session.user.role === "user") {
    next();
  } else {
    res.status(400).json({
      error: "You do not have the permissions to perform this operation",
    });
  }
}
