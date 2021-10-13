function requireUser(req, res, next) {
  if (!req.user) {
    next({
      success: false,
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }

  next();
}

function requireAdmin(req, res, next) {
  const denied = !req.user || (req.user && !req.user.isadmin);
  if (denied) {
    next({
      success: false,
      message: "PERMISSION DENIED. YOU DIDN'T SAY THE MAGIC WORD!",
    });
  }
  next();
}

const createQuerySetString = (obj) =>
  Object.keys(obj)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

module.exports = {
  requireUser,
  requireAdmin,
  createQuerySetString,
};
