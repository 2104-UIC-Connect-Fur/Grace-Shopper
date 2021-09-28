function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: 'MissingUserError',
      message: 'You must be logged in to perform this action',
    });
  }

  next();
}

function requireAdmin(req, res, next) {
  const denied = !req.user || (req.user && !req.user.isadmin);
  if (denied) {
    next({
      name: 'NotAdminError',
      message: 'You do not have administrator access. Get lost.',
    });
  }

  next();
}

module.exports = {
  requireUser,
  requireAdmin,
};
